"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Loader2, ShieldCheck, Tag, Check, Crown } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const benefits = [
  "All 12 assessments & career reports unlocked",
  "Personalised career roadmaps",
  "Priority counselling booking",
  "Early access to new modules",
  "Career trend intelligence reports",
];

export default function SubscribePage() {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [error, setError] = useState("");

  const basePrice = 999;
  const finalAmount = Math.max(0, basePrice - discount);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    setCouponMsg("");
    setCouponError(false);

    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode.trim(), amount: basePrice }),
    });

    const data = await res.json();
    if (res.ok) {
      setDiscount(data.discount);
      setCouponId(data.couponId);
      setCouponMsg(`Coupon applied! You save ₹${data.discount}`);
      setCouponError(false);
    } else {
      setDiscount(0);
      setCouponId(null);
      setCouponMsg(data.error || "Invalid coupon");
      setCouponError(true);
    }
    setApplyingCoupon(false);
  }

  async function handlePayment() {
    setProcessing(true);

    const res = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "PREMIUM",
        couponId,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      setError(errData.error || "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    const data = await res.json();

    if (data.mode === "free") {
      // 100% coupon discount — already completed server-side
      router.push("/dashboard?upgraded=true");
      return;
    }

    if (data.mode === "razorpay" && data.razorpayOrderId) {
      const options = {
        key: data.razorpayKeyId,
        amount: data.finalAmount * 100,
        currency: "INR",
        name: "Rebuild Learning",
        description: "Premium Plan — Lifetime Access",
        order_id: data.razorpayOrderId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            router.push("/dashboard?upgraded=true");
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

  return (
    <div className="max-w-md mx-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="mb-4">
        <Link href="/dashboard" className="text-sm text-green-600/60 hover:text-green-800 transition">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-green-200/50 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center">
            <Crown className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-900">Premium Plan</h1>
            <p className="text-sm text-green-600/60">One-time payment, lifetime access</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-green-50/50 rounded-xl p-4 mb-6">
          <ul className="space-y-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span className="text-green-800">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-green-700">Premium subscription</span>
            <span className="text-green-900 font-medium">₹{basePrice}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Coupon discount</span>
              <span className="text-green-600 font-medium">-₹{discount}</span>
            </div>
          )}
          <div className="border-t border-green-200/50 pt-3 flex justify-between">
            <span className="text-green-900 font-semibold">Total</span>
            <span className="text-green-900 font-bold text-lg">₹{finalAmount}</span>
          </div>
        </div>

        {/* Coupon */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-green-800 mb-2">
            <Tag className="w-4 h-4" />
            Have a coupon code?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="ENTER CODE"
              className="flex-1 px-3 py-2 border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono"
            />
            <button
              onClick={applyCoupon}
              disabled={applyingCoupon || !couponCode.trim()}
              className="px-4 py-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium rounded-lg hover:bg-green-100 disabled:opacity-50 transition"
            >
              {applyingCoupon ? "..." : "Apply"}
            </button>
          </div>
          {couponMsg && (
            <p className={`text-xs mt-1.5 ${couponError ? "text-red-500" : "text-green-600"}`}>
              {couponMsg}
            </p>
          )}
        </div>

        {/* Pay button */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}
        <button
          onClick={() => { setError(""); handlePayment(); }}
          disabled={processing}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition shadow-lg shadow-red-600/10"
        >
          {processing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              Pay ₹{finalAmount}
            </>
          )}
        </button>

        <p className="text-xs text-green-500/50 text-center mt-3">
          Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}
