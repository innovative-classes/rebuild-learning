import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-green-800/30 mb-4">404</p>
        <h1 className="text-xl font-bold text-white mb-2">Page not found</h1>
        <p className="text-sm text-green-300/60 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-600/20"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
