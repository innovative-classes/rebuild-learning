import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-neutral-200 mb-4">404</p>
        <h1 className="text-xl font-bold text-neutral-900 mb-2">Page not found</h1>
        <p className="text-sm text-neutral-500 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-neutral-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
