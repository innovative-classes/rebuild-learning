import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service Ã¢â‚¬â€ Rebuild Learning",
  description: "Terms of Service for Rebuild Learning by N.B.V. Subba Rao",
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-green-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-green-600/60 mb-10">Last updated: March 2026</p>

        <div className="prose prose-green prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-green-700 leading-relaxed">
              By accessing or using Rebuild Learning (&quot;Service&quot;), operated by N.B.V. Subba Rao, you agree to be bound by these Terms of Service. If you do not agree, you may not use this Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">2. Description of Service</h2>
            <p className="text-green-700 leading-relaxed">
              Rebuild Learning provides post-10th career guidance assessments, reports, and counselling booking for students of Andhra Pradesh and Telangana. The Service includes paid assessments with career reports.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">3. User Accounts</h2>
            <p className="text-green-700 leading-relaxed">
              You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your password and all activity under your account. You must be at least 13 years old to use this Service, or have parental consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">4. Payments & Pricing</h2>
            <p className="text-green-700 leading-relaxed">
              Paid reports are available at Ã¢â€šÂ¹99 per assessment or Ã¢â€šÂ¹999 for premium (all reports). Payments are processed via Razorpay. Prices are inclusive of applicable taxes and may be updated with notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">5. Intellectual Property</h2>
            <p className="text-green-700 leading-relaxed">
              All content including assessments, reports, career guidance material, and branding is the intellectual property of N.B.V. Subba Rao. You may not reproduce, distribute, or commercially use any content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">6. Limitation of Liability</h2>
            <p className="text-green-700 leading-relaxed">
              Career guidance is advisory in nature. We provide information-based reports and do not guarantee specific career outcomes, job placements, or college admissions. Decisions based on our reports are your responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">7. Termination</h2>
            <p className="text-green-700 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">8. Contact</h2>
            <p className="text-green-700 leading-relaxed">
              For questions about these Terms, contact us at the email provided on our website.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-green-200/50 py-8 bg-green-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-green-500/60">Ã‚Â© {new Date().getFullYear()} N.B.V. Subba Rao. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="text-green-600/60 hover:text-green-900 transition">Privacy Policy</Link>
            <Link href="/refund-policy" className="text-green-600/60 hover:text-green-900 transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
