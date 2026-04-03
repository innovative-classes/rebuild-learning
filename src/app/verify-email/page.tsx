"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    async function verify() {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Email verified successfully!");
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed.");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-block mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">Rebuild Learning</h1>
          <p className="text-sm text-green-300/60 mt-1">by N.B.V. Subba Rao</p>
        </Link>

        <div className="bg-green-800/30 backdrop-blur-xl rounded-2xl shadow-lg border border-green-700/30 p-8">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-green-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-white mb-2">Verifying your email...</h2>
              <p className="text-sm text-green-300/60">Please wait a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Email Verified!</h2>
              <p className="text-sm text-green-300/60 mb-6">{message}</p>
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-lg"
              >
                Sign in to your account
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">Verification Failed</h2>
              <p className="text-sm text-green-300/60 mb-6">{message}</p>
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-lg"
              >
                Go to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950">
          <Loader2 className="w-6 h-6 animate-spin text-green-400" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
