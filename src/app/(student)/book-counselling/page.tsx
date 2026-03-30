"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Calendar, Clock, Loader2, CheckCircle, CreditCard, IndianRupee } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const COUNSELLING_FEE = 2500;

export default function BookCounsellingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      setBookingId(data.bookingId);
      setStep("payment");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
    }
    setSubmitting(false);
  }

  async function handlePayment() {
    if (!bookingId) return;
    setProcessing(true);
    setError("");

    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "COUNSELLING",
        bookingId,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Payment creation failed.");
      setProcessing(false);
      return;
    }

    const data = await res.json();

    if (data.mode === "free") {
      setStep("success");
      return;
    }

    if (data.mode === "razorpay" && data.razorpayOrderId) {
      const options = {
        key: data.razorpayKeyId,
        amount: data.finalAmount * 100,
        currency: "INR",
        name: "Rebuild Learning",
        description: "Counselling Session Booking",
        order_id: data.razorpayOrderId,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        handler: async function (response: any) {
          const confirmRes = await fetch("/api/payments/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentId: data.paymentId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          if (confirmRes.ok) {
            setStep("success");
          } else {
            setError("Payment verification failed. Please contact support.");
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
          },
        },
        theme: { color: "#dc2626" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      setError("Payment gateway unavailable. Please try again later.");
      setProcessing(false);
    }
  }

  // ── Success Screen ──
  if (step === "success") {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
        </div>
        <h1 className="text-xl font-bold text-neutral-900 mb-2">Booking Confirmed!</h1>
        <p className="text-sm text-neutral-500 mb-2">
          Payment of ₹{COUNSELLING_FEE.toLocaleString("en-IN")} received successfully.
        </p>
        <p className="text-sm text-neutral-500 mb-6">
          We&apos;ll confirm your counselling session within 24 hours via email and phone.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="text-sm font-medium text-neutral-900 hover:underline"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // ── Payment Screen ──
  if (step === "payment") {
    return (
      <div className="max-w-md mx-auto">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

        <h1 className="text-xl font-bold text-neutral-900 mb-1">Complete Payment</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Pay ₹{COUNSELLING_FEE.toLocaleString("en-IN")} to confirm your counselling session.
        </p>

        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          {/* Booking Summary */}
          <div className="space-y-3 mb-6">
            <h2 className="text-sm font-semibold text-neutral-900">Booking Summary</h2>
            <div className="bg-neutral-50 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Session</span>
                <span className="text-neutral-900 font-medium">30-min Career Counselling</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Counsellor</span>
                <span className="text-neutral-900 font-medium">N.B.V. Subba Rao</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Date</span>
                <span className="text-neutral-900 font-medium">{form.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Time</span>
                <span className="text-neutral-900 font-medium">{form.preferredTime}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between py-4 border-t border-neutral-200 mb-6">
            <span className="text-sm font-semibold text-neutral-900">Total Amount</span>
            <span className="text-2xl font-bold text-neutral-900 flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />
              {COUNSELLING_FEE.toLocaleString("en-IN")}
            </span>
          </div>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Pay ₹{COUNSELLING_FEE.toLocaleString("en-IN")}
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-neutral-400">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="m7 11 0-4a5 5 0 0 1 10 0l0 4"></path>
            </svg>
            Secured by Razorpay
          </div>
        </div>

        <button
          onClick={() => setStep("form")}
          className="mt-4 text-sm text-neutral-500 hover:text-neutral-700 transition"
        >
          ← Edit booking details
        </button>
      </div>
    );
  }

  // ── Booking Form Screen ──
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-neutral-900 mb-1">Book Counselling Session</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Schedule a 30-minute one-on-one session with N.B.V. Subba Rao for personalised career guidance.
        <span className="block mt-1 font-medium text-neutral-700">Fee: ₹{COUNSELLING_FEE.toLocaleString("en-IN")}</span>
      </p>

      <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone Number</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 mb-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={form.preferredDate}
                onChange={(e) => updateField("preferredDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 mb-1.5">
                <Clock className="w-3.5 h-3.5" />
                Preferred Time
              </label>
              <select
                required
                value={form.preferredTime}
                onChange={(e) => updateField("preferredTime", e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white"
              >
                <option value="">Select time</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="05:00 PM">05:00 PM</option>
                <option value="06:00 PM">06:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message (optional)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Any specific questions or topics you'd like to discuss?"
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Proceed to Payment — ₹{COUNSELLING_FEE.toLocaleString("en-IN")}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
