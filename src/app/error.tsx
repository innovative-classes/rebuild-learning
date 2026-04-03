"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 ring-2 ring-red-500/20">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-sm text-green-300/60 mb-6">
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
