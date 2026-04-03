"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function StudentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Student section error:", error);
  }, [error]);

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h1 className="text-xl font-bold text-green-900 mb-2">Something went wrong</h1>
      <p className="text-sm text-green-600/60 mb-6">
        An error occurred while loading this page. Please try again.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-600/10"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="border border-green-200 text-green-800 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-50 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
