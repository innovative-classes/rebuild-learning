import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { checkRateLimit, incrementRateLimit } from "@/lib/rate-limit";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        // Rate limit login attempts per email
        const email = (credentials.email as string).toLowerCase();
        const { allowed } = checkRateLimit(`login:${email}`);
        if (!allowed) {
          throw new Error("ACCOUNT_LOCKED");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          incrementRateLimit(`login:${email}`);
          return null;
        }

        // Check account lockout
        if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
          throw new Error("ACCOUNT_LOCKED");
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) {
          incrementRateLimit(`login:${email}`);
          // Increment failed attempts
          const failedAttempts = user.failedLoginAttempts + 1;
          const lockout = failedAttempts >= MAX_FAILED_ATTEMPTS
            ? new Date(Date.now() + LOCKOUT_DURATION_MS)
            : null;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: failedAttempts,
              accountLockedUntil: lockout,
            },
          });
          return null;
        }

        // Check email verification (skip for admin)
        if (!user.emailVerified && user.role !== "ADMIN") {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        // Reset failed attempts and update last login
        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            accountLockedUntil: null,
            lastLoginAt: new Date(),
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isPremium: user.isPremium,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
        token.isPremium = (user as { isPremium: boolean }).isPremium;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = session.user as any;
        user.id = token.id;
        user.role = token.role;
        user.isPremium = token.isPremium;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
