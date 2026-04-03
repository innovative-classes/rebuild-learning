"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const registered = searchParams.get("registered") === "true";

  // Redirect already-logged-in users
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const role = (session.user as { role?: string }).role;
      router.replace(role === "ADMIN" ? "/admin" : "/dashboard");
    }
  }, [status, session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error.includes("ACCOUNT_LOCKED")) {
          setError("Account temporarily locked due to too many failed attempts. Please try again in 15 minutes.");
        } else if (result.error.includes("EMAIL_NOT_VERIFIED")) {
          setError("Please verify your email before signing in. Check your inbox for the verification link.");
        } else {
          setError("Invalid email or password");
        }
      } else {
        // Session is updated automatically after signIn, use update to get fresh data
        const res = await fetch("/api/auth/session");
        const sess = await res.json();
        const role = sess?.user?.role;
        router.replace(role === "ADMIN" ? "/admin" : "/dashboard");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Rebuild Learning
            </h1>
            <p className="text-sm text-green-400/60 mt-1">by N.B.V. Subba Rao</p>
          </Link>
        </div>

        <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-green-700/30 p-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Welcome back
          </h2>

          {registered && !error && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300 text-sm">
              Account created! Please check your email and verify before signing in.
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-green-200/80">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-yellow-400/70 hover:text-yellow-400 transition"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-green-300/60 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-yellow-400 hover:text-yellow-300 transition"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
