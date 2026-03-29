import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider, Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/auth-provider";
import { FloatingBadge } from "@/components/ui/floating-badge";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rebuild Learning — N.B.V. Subba Rao",
  description: "A Comprehensive Post-10th Career Guidance System for Students of Andhra Pradesh & Telangana",
  openGraph: {
    title: "Rebuild Learning — N.B.V. Subba Rao",
    description: "A Comprehensive Post-10th Career Guidance System for Students of AP & TS. 12 career modules, scientific assessments & personalised reports.",
    type: "website",
    locale: "en_IN",
    siteName: "Rebuild Learning",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <ToastProvider>
            {children}
            <Toaster />
            <FloatingBadge />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
