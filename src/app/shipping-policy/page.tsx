import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy — Rebuild Learning",
  description: "Shipping and delivery policy for Rebuild Learning digital products and services.",
};

export default function ShippingPolicyPage() {
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
        <h1 className="text-3xl font-bold text-green-900 mb-2">Shipping &amp; Delivery Policy</h1>
        <p className="text-sm text-green-600/60 mb-10">Last updated: March 2026</p>

        <div className="prose prose-green prose-sm max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">1. Digital Products Only</h2>
            <p className="text-green-700 leading-relaxed">
              Rebuild Learning is a digital-only platform. All products and services offered — including career assessments, reports, counselling sessions, and subscriptions — are delivered electronically. We do not sell or ship any physical goods.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">2. Delivery of Assessments &amp; Reports</h2>
            <p className="text-green-700 leading-relaxed">
              Upon successful payment, your purchased assessment or report will be available instantly in your account dashboard. You can access your reports at any time by logging into your Rebuild Learning account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">3. Subscription Access</h2>
            <p className="text-green-700 leading-relaxed">
              Premium subscription benefits are activated immediately upon payment confirmation. You will have access to all premium features for the duration of your subscription period.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">4. Counselling Sessions</h2>
            <p className="text-green-700 leading-relaxed">
              Counselling bookings are confirmed via email after payment. Sessions are conducted online (video call) at the scheduled date and time. Appointment details will be shared via email and will also appear in your dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">5. Delivery Issues</h2>
            <p className="text-green-700 leading-relaxed">
              If you do not receive access to a purchased product within 15 minutes of payment, please check your email (including spam/junk folders) and your account dashboard. If the issue persists, contact us at{" "}
              <a href="mailto:subbarao@innovativeclasses.com" className="text-green-800 underline hover:text-green-950 transition">
                subbarao@innovativeclasses.com
              </a>{" "}
              with your transaction ID and we will resolve it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-green-900 mb-3">6. No Physical Shipping</h2>
            <p className="text-green-700 leading-relaxed">
              Since all our products are digital, there are no shipping charges, no delivery timelines for physical goods, and no return of physical items. For refund-related queries on digital purchases, please refer to our{" "}
              <Link href="/refund-policy" className="text-green-800 underline hover:text-green-950 transition">
                Refund Policy
              </Link>.
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
