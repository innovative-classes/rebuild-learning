import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Rebuild Learning",
  description: "Contact Rebuild Learning by N.B.V. Subba Rao for support, queries, or feedback.",
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RL</span>
            </div>
            <span className="font-semibold text-green-900 text-sm">Rebuild Learning</span>
          </Link>
          <Link href="/login" className="text-sm font-medium text-green-700 hover:text-green-900 transition">
            Sign in
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl font-bold text-green-900 mb-2">Contact Us</h1>
        <p className="text-sm text-green-600/60 mb-10">We&#39;d love to hear from you. Reach out for support, questions, or feedback.</p>

        <div className="prose prose-green prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">Business Information</h2>
            <div className="text-green-700 leading-relaxed space-y-1">
              <p><strong>Business Name:</strong> Rebuild Learning</p>
              <p><strong>Operated by:</strong> N.B.V. Subba Rao</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">Email</h2>
            <p className="text-green-700 leading-relaxed">
              For general enquiries, support, or feedback, write to us at:
            </p>
            <p className="text-green-900 font-medium mt-1">
              <a href="mailto:subbarao@innovativeclasses.com" className="text-green-800 underline hover:text-green-950 transition">
                subbarao@innovativeclasses.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">Phone</h2>
            <p className="text-green-700 leading-relaxed">
              You can reach us by phone during business hours (10 AM – 6 PM IST, Monday to Saturday):
            </p>
            <p className="text-green-900 font-medium mt-1">
              <a href="tel:+919876543210" className="text-green-800 underline hover:text-green-950 transition">
                +91 98765 43210
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">Address</h2>
            <p className="text-green-700 leading-relaxed">
              Innovative Classes<br />
              Visakhapatnam, Andhra Pradesh, India
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">Response Time</h2>
            <p className="text-green-700 leading-relaxed">
              We typically respond to all queries within 24–48 business hours. For urgent payment-related issues, please mention your order/transaction ID in your email for faster resolution.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-green-200/50 py-8 bg-green-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-green-500/60">&copy; {new Date().getFullYear()} N.B.V. Subba Rao. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/terms" className="text-green-600/60 hover:text-green-900 transition">Terms</Link>
            <Link href="/privacy" className="text-green-600/60 hover:text-green-900 transition">Privacy Policy</Link>
            <Link href="/refund-policy" className="text-green-600/60 hover:text-green-900 transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
