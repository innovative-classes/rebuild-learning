import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendPaymentReceiptEmail, sendBookingConfirmationEmail, sendNewBookingAdminEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = body;

  if (!paymentId) {
    return NextResponse.json({ error: "Missing paymentId" }, { status: 400 });
  }

  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      userId: session.user.id,
      status: "PENDING",
    },
  });

  if (!payment) {
    return NextResponse.json({ error: "Invalid payment" }, { status: 400 });
  }

  // Verify Razorpay signature — REQUIRED for all paid transactions
  if (payment.finalAmount > 0) {
    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing payment verification data" }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_KEY_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "Payment verification unavailable" }, { status: 503 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: "COMPLETED",
        razorpayPaymentId,
      },
    });
  } else {
    // Free (100% coupon) — already completed in create route
    // Just ensure it was marked completed there
    if (payment.status !== "COMPLETED") {
      return NextResponse.json({ error: "Invalid payment state" }, { status: 400 });
    }
  }

  // Increment coupon usage
  if (payment.couponId) {
    await prisma.coupon.update({
      where: { id: payment.couponId },
      data: { usedCount: { increment: 1 } },
    });
  }

  // If premium, update user
  if (payment.type === "PREMIUM") {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        isPremium: true,
        premiumPurchasedAt: new Date(),
      },
    });
  }

  // If counselling, confirm the booking
  if (payment.type === "COUNSELLING" && payment.bookingId) {
    const booking = await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: "PENDING" },
    });

    // Send booking confirmation emails (non-blocking)
    sendBookingConfirmationEmail(
      booking.email,
      booking.name,
      booking.preferredDate,
      booking.preferredTime
    ).catch(() => {});

    sendNewBookingAdminEmail(
      booking.name,
      booking.email,
      booking.phone,
      booking.preferredDate,
      booking.preferredTime,
      booking.message || undefined
    ).catch(() => {});
  }

  // Return assessment slug for redirect if applicable
  let assessmentSlug: string | null = null;
  if (payment.assessmentId) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: payment.assessmentId },
    });
    assessmentSlug = assessment?.slug || null;
  }

  // Send receipt email (non-blocking)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, name: true },
  });
  if (user) {
    sendPaymentReceiptEmail(
      user.email,
      user.name,
      payment.finalAmount,
      payment.type === "PREMIUM" ? "Premium Subscription" : payment.type === "COUNSELLING" ? "Counselling Session Booking" : "Career Assessment Report",
      paymentId
    ).catch(() => {});
  }

  return NextResponse.json({ success: true, assessmentSlug });
}
