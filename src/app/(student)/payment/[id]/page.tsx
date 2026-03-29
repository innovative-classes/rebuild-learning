"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Loader2, ShieldCheck, Tag } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = params.id as string;

  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [couponError, setCouponError] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const basePrice = 99;
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
        type: "ASSESSMENT",
        assessmentId,
        couponId,
      }),
    });

    if (!res.ok) {
      setProcessing(false);
      return;
    }

    const data = await res.json();

    if (data.mode === "razorpay" && data.razorpayOrderId) {
      // Open Razorpay checkout
      const options = {
        key: data.razorpayKeyId,
        amount: data.finalAmount * 100,
        currency: "INR",
        name: "Rebuild Learning",
        description: "Career Assessment",
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
            const { assessmentSlug } = await confirmRes.json();
            router.push(`/assessments/${assessmentSlug}/attempt`);
          } else {
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
      // Simulation mode
      const confirmRes = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId: data.paymentId }),
      });

      if (confirmRes.ok) {
        const { assessmentSlug } = await confirmRes.json();
        router.push(`/assessments/${assessmentSlug}/attempt`);
        return;
      }
      setProcessing(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="mb-4">
        <Link href="/assessments" className="text-sm text-neutral-500 hover:text-neutral-900 transition">
          ← Back to Assessments
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
        <h1 className="text-xl font-bold text-neutral-900 mb-1">Unlock Assessment</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Pay once to access the full 8-question quiz and your detailed career report.
        </p>

        {/* Price breakdown */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Assessment fee</span>
            <span className="text-neutral-900 font-medium">₹{basePrice}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">Coupon discount</span>
              <span className="text-emerald-600 font-medium">-₹{discount}</span>
            </div>
          )}
          <div className="border-t border-neutral-200 pt-3 flex justify-between">
            <span className="text-neutral-900 font-semibold">Total</span>
            <span className="text-neutral-900 font-bold text-lg">₹{finalAmount}</span>
          </div>
        </div>

        {/* Coupon input */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-2">
            <Tag className="w-4 h-4" />
            Have a coupon code?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="ENTER CODE"
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent font-mono"
            />
            <button
              onClick={applyCoupon}
              disabled={applyingCoupon || !couponCode.trim()}
              className="px-4 py-2 bg-neutral-100 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition"
            >
              {applyingCoupon ? "..." : "Apply"}
            </button>
          </div>
          {couponMsg && (
            <p className={`text-xs mt-1.5 ${couponError ? "text-red-500" : "text-emerald-600"}`}>
              {couponMsg}
            </p>
          )}
        </div>

        {/* Pay button */}
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition"
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

        <p className="text-xs text-neutral-400 text-center mt-3">
          Secure payment powered by Razorpay.
        </p>
      </div>
    </div>
  );
}
