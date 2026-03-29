import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRazorpay, isRazorpayConfigured } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { type, assessmentId, bookingId, couponId } = body;

  if (!type || !["ASSESSMENT", "PREMIUM", "COUNSELLING"].includes(type)) {
    return NextResponse.json({ error: "Invalid payment type" }, { status: 400 });
  }

  let amount = type === "PREMIUM" ? 999 : type === "COUNSELLING" ? 2500 : 99;
  let discount = 0;

  // If assessment payment, get the assessment's price
  if (type === "ASSESSMENT" && assessmentId) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
    });
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }
    amount = assessment.price;

    // Check if already paid
    const existing = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        assessmentId,
        type: "ASSESSMENT",
        status: "COMPLETED",
      },
    });
    if (existing) {
      return NextResponse.json({ error: "Already purchased" }, { status: 400 });
    }
  }

  // Validate booking for counselling payment
  if (type === "COUNSELLING" && bookingId) {
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId: session.user.id, status: "PENDING_PAYMENT" },
    });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found or already paid" }, { status: 400 });
    }
  }

  // Check premium
  if (type === "PREMIUM") {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (user?.isPremium) {
      return NextResponse.json({ error: "Already a premium member" }, { status: 400 });
    }
  }

  // Apply coupon
  if (couponId) {
    const coupon = await prisma.coupon.findUnique({ where: { id: couponId } });
    if (coupon && coupon.isActive && coupon.usedCount < coupon.maxUses) {
      if (coupon.discountType === "PERCENTAGE") {
        discount = Math.round((amount * coupon.discountValue) / 100);
      } else {
        discount = coupon.discountValue;
      }
      discount = Math.min(discount, amount);
    }
  }

  const finalAmount = amount - discount;

  const payment = await prisma.payment.create({
    data: {
      userId: session.user.id,
      type,
      assessmentId: type === "ASSESSMENT" ? assessmentId : null,
      bookingId: type === "COUNSELLING" ? bookingId : null,
      amount,
      couponId,
      discount,
      finalAmount,
      status: "PENDING",
    },
  });

  // Create Razorpay order if configured, otherwise return for simulation
  if (isRazorpayConfigured() && finalAmount > 0) {
    try {
      const razorpay = getRazorpay();
      const order = await razorpay.orders.create({
        amount: finalAmount * 100, // Razorpay expects paise
        currency: "INR",
        receipt: payment.id,
        notes: {
          paymentId: payment.id,
          userId: session.user.id,
          type,
        },
      });

      await prisma.payment.update({
        where: { id: payment.id },
        data: { razorpayOrderId: order.id },
      });

      return NextResponse.json({
        paymentId: payment.id,
        finalAmount,
        razorpayOrderId: order.id,
        razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        mode: "razorpay",
      });
    } catch (err) {
      // Log the Razorpay error for debugging
      console.error("[Razorpay] Order creation failed:", err);
      // Fallback to simulation if Razorpay fails
      return NextResponse.json({ paymentId: payment.id, finalAmount, mode: "simulation" });
    }
  }

  return NextResponse.json({ paymentId: payment.id, finalAmount, mode: "simulation" });
}
