"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    studentClass: "",
    stream: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-950 via-green-900 to-green-950 px-4 py-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

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
          {success ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-2 ring-green-500/30">
                <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
              <p className="text-sm text-green-200/70 mb-4">
                We&apos;ve sent a verification link to <strong className="text-yellow-400">{formData.email}</strong>. Please click the link to verify your account before signing in.
              </p>
              <p className="text-xs text-green-400/50 mb-6">
                Didn&apos;t receive the email? Check your spam folder.
              </p>
              <Link
                href="/login"
                className="inline-block py-2.5 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-600/20"
              >
                Go to Sign in
              </Link>
            </div>
          ) : (
            <>
          <h2 className="text-xl font-semibold text-white mb-6">
            Create your account
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                  placeholder="you@example.com"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                  placeholder="Min 8 chars, uppercase, number, special char"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  Class
                </label>
                <select
                  value={formData.studentClass}
                  onChange={(e) => updateField("studentClass", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition"
                >
                  <option value="">Select</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="UG">Undergraduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  Stream
                </label>
                <select
                  value={formData.stream}
                  onChange={(e) => updateField("stream", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition"
                >
                  <option value="">Select</option>
                  <option value="PCM">PCM (Science - Maths)</option>
                  <option value="PCB">PCB (Science - Bio)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Undecided">Not decided</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-green-200/80 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-green-600/30 bg-green-900/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition placeholder:text-green-500/40"
                  placeholder="Hyderabad"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20 mt-2"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-green-300/60 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-yellow-400 hover:text-yellow-300 transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
