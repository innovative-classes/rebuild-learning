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
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h1 className="text-xl font-bold text-neutral-900 mb-2">Something went wrong</h1>
      <p className="text-sm text-neutral-500 mb-6">
        An error occurred while loading this page. Please try again.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="border border-neutral-300 text-neutral-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-50 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
