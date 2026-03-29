import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    isPremium?: boolean;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      isPremium: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    isPremium: boolean;
  }
}
