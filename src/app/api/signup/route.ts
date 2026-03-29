import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkRateLimit, incrementRateLimit } from "@/lib/rate-limit";
import { sendVerificationEmail } from "@/lib/email";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  phone: z.string().max(20).optional(),
  studentClass: z.string().max(50).optional(),
  stream: z.string().max(50).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const { allowed, retryAfterMs } = checkRateLimit(`signup:${ip}`);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
      );
    }
    incrementRateLimit(`signup:${ip}`);

    const body = await req.json();
    const data = signupSchema.parse(body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Unable to create account. Please try a different email." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const emailVerificationToken = randomUUID();

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        phone: data.phone,
        studentClass: data.studentClass,
        stream: data.stream,
        city: data.city,
        state: data.state,
        emailVerificationToken,
      },
    });

    // Send verification email (non-blocking)
    sendVerificationEmail(data.email, data.name, emailVerificationToken).catch(() => {});

    return NextResponse.json(
      { message: "Account created successfully. Please check your email to verify your account.", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodErr = error as z.ZodError;
      return NextResponse.json(
        { error: zodErr.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
