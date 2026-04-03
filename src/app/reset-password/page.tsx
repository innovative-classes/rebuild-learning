"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle, Lock } from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to reset password");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-green-700/30 p-8">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">Invalid Link</h2>
            <p className="text-sm text-green-300/60 mb-6">This password reset link is invalid or missing a token.</p>
            <Link href="/forgot-password" className="text-sm font-medium text-yellow-400 hover:underline">
              Request a new reset link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">Rebuild Learning</h1>
          </Link>
          <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-green-700/30 p-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Password Reset!</h2>
            <p className="text-sm text-green-300/60 mb-6">Your password has been updated. You can now sign in with your new password.</p>
            <Link
              href="/login"
              className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-lg"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-green-700/30 p-8">
            <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-white mb-2">Reset Failed</h2>
            <p className="text-sm text-green-300/60 mb-6">{message}</p>
            <Link href="/forgot-password" className="text-sm font-medium text-yellow-400 hover:underline">
              Request a new reset link
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
            <Lock className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Set new password</h2>
          <p className="text-sm text-green-300/60 mb-6">
            Enter a new password for your account.
          </p>

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-200 mb-1.5">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3.5 py-2.5 rounded-lg border border-green-700/50 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition placeholder:text-green-500/40"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-green-200 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3.5 py-2.5 rounded-lg border border-green-700/50 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition placeholder:text-green-500/40"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition shadow-lg shadow-red-600/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950">
          <Loader2 className="w-6 h-6 animate-spin text-green-400" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
