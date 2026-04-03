"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">Rebuild Learning</h1>
            <p className="text-sm text-green-300/60 mt-1">by N.B.V. Subba Rao</p>
          </Link>
          <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-green-700/30 p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Check your email</h2>
            <p className="text-sm text-green-300/60 mb-6">
              If an account exists with <strong className="text-green-200">{email}</strong>, we&apos;ve sent a password reset link that expires in 1 hour.
            </p>
            <Link href="/login" className="text-sm font-medium text-yellow-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold tracking-tight text-white">Rebuild Learning</h1>
            <p className="text-sm text-green-300/60 mt-1">by N.B.V. Subba Rao</p>
          </Link>
        </div>

        <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-green-700/30 p-8">
          <div className="w-12 h-12 bg-yellow-500/15 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Forgot your password?</h2>
          <p className="text-sm text-green-300/60 mb-6">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-green-700/50 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition placeholder:text-green-500/40"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-red-600/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-green-300/50 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="font-medium text-yellow-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
