import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy Ã¢â‚¬â€ Rebuild Learning",
  description: "Refund and Cancellation Policy for Rebuild Learning by N.B.V. Subba Rao",
};

export default function RefundPolicyPage() {
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
        <h1 className="text-3xl font-bold text-green-900 mb-2">Refund & Cancellation Policy</h1>
        <p className="text-sm text-green-600/60 mb-10">Last updated: March 2026</p>

        <div className="prose prose-green prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">1. Digital Products</h2>
            <p className="text-green-700 leading-relaxed">
              Rebuild Learning delivers digital career reports and assessment results. Since these are instantly accessible digital products, refunds are generally not available once an assessment has been taken.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">2. Refund Eligibility</h2>
            <p className="text-green-700 leading-relaxed">Refunds may be considered in the following cases:</p>
            <ul className="list-disc list-inside text-green-700 mt-2 space-y-1">
              <li>Technical error preventing access to a purchased report</li>
              <li>Duplicate payment for the same assessment</li>
              <li>Payment charged but service not delivered within 24 hours</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">3. How to Request a Refund</h2>
            <p className="text-green-700 leading-relaxed">
              Contact us within 7 days of purchase with your payment details and reason for the refund request. Approved refunds will be processed to the original payment method within 5Ã¢â‚¬â€œ7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">4. Counselling Bookings</h2>
            <p className="text-green-700 leading-relaxed">
              Counselling sessions are charged at Ã¢â€šÂ¹2,500 per session. Cancellations made at least 24 hours before the scheduled session are eligible for a full refund. No-shows or late cancellations are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">5. Premium Subscriptions</h2>
            <p className="text-green-700 leading-relaxed">
              Premium subscriptions (Ã¢â€šÂ¹999) provide access to all 12 career reports. Partial refunds are not available if some reports have been accessed. Full refunds may be considered if no reports have been accessed within 48 hours of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">6. Contact Information</h2>
            <p className="text-green-700 leading-relaxed">
              For refund requests or payment issues, please contact us at the email provided on our website with your registered email and payment transaction ID.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-green-200/50 py-8 bg-green-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-green-500/60">Ã‚Â© {new Date().getFullYear()} N.B.V. Subba Rao. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/terms" className="text-green-600/60 hover:text-green-900 transition">Terms of Service</Link>
            <Link href="/privacy" className="text-green-600/60 hover:text-green-900 transition">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
