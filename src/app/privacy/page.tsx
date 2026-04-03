import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Ã¢â‚¬â€ Rebuild Learning",
  description: "Privacy Policy for Rebuild Learning by N.B.V. Subba Rao",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-green-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-green-600/60 mb-10">Last updated: March 2026</p>

        <div className="prose prose-green prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">1. Information We Collect</h2>
            <p className="text-green-700 leading-relaxed">
              We collect information you provide directly: name, email address, phone number, class, stream, city, and state. We also collect assessment responses and payment information via Razorpay (we do not store card details).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-green-700 leading-relaxed">
              Your information is used to: create and manage your account, generate personalised career reports, process payments, facilitate counselling bookings, and send transactional emails (verification, receipts, booking confirmations).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">3. Data Storage & Security</h2>
            <p className="text-green-700 leading-relaxed">
              Your data is stored securely with encrypted passwords (bcrypt). We use HTTPS for data in transit and implement security headers (CSP, HSTS) to protect against common web attacks. Payment processing is handled by Razorpay, a PCI DSS compliant payment gateway.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">4. Data Sharing</h2>
            <p className="text-green-700 leading-relaxed">
              We do not sell your personal data. We share data only with: Razorpay (payment processing), email service providers (transactional emails), and as required by law or legal process.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">5. Cookies</h2>
            <p className="text-green-700 leading-relaxed">
              We use essential cookies for authentication and session management. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">6. Your Rights</h2>
            <p className="text-green-700 leading-relaxed">
              You can: access your profile data via the profile page, update your personal information, request deletion of your account by contacting us, and opt out of non-essential communications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">7. Children&apos;s Privacy</h2>
            <p className="text-green-700 leading-relaxed">
              Our Service is designed for students aged 13 and above. Users under 13 should use the Service with parental consent and supervision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-green-700 leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date. Continued use of the Service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">9. Contact</h2>
            <p className="text-green-700 leading-relaxed">
              For privacy-related inquiries, contact us at the email provided on our website.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-green-200/50 py-8 bg-green-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-green-500/60">Ã‚Â© {new Date().getFullYear()} N.B.V. Subba Rao. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/terms" className="text-green-600/60 hover:text-green-900 transition">Terms of Service</Link>
            <Link href="/refund-policy" className="text-green-600/60 hover:text-green-900 transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
