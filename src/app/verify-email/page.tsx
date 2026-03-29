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
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-block mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Rebuild Learning</h1>
          <p className="text-sm text-neutral-500 mt-1">by N.B.V. Subba Rao</p>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          {status === "loading" && (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-neutral-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Verifying your email...</h2>
              <p className="text-sm text-neutral-500">Please wait a moment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Email Verified!</h2>
              <p className="text-sm text-neutral-500 mb-6">{message}</p>
              <Link
                href="/login"
                className="inline-block bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Sign in to your account
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">Verification Failed</h2>
              <p className="text-sm text-neutral-500 mb-6">{message}</p>
              <Link
                href="/login"
                className="inline-block bg-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
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
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
