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

  // Free coupon — auto-complete if final amount is zero
  if (finalAmount === 0) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "COMPLETED", razorpayPaymentId: `free_${Date.now()}` },
    });

    // Handle post-payment grants for free coupon
    if (type === "PREMIUM") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { isPremium: true, premiumPurchasedAt: new Date() },
      });
    }
    if (couponId) {
      await prisma.coupon.update({
        where: { id: couponId },
        data: { usedCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ paymentId: payment.id, finalAmount, mode: "free" });
  }

  // Razorpay is REQUIRED for all paid transactions
  if (!isRazorpayConfigured()) {
    console.error("[Payment] Razorpay not configured! RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set.");
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
    return NextResponse.json(
      { error: "Payment gateway not configured. Please contact support." },
      { status: 503 }
    );
  }

  try {
    const razorpay = getRazorpay();
    console.log("[Razorpay] Creating order for amount:", finalAmount * 100, "receipt:", payment.id);
    console.log("[Razorpay] Key ID configured:", process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 10)}...` : "MISSING");
    
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

    console.log("[Razorpay] Order created successfully:", order.id);

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
  } catch (err: unknown) {
    console.error("[Razorpay] Order creation failed. Error type:", typeof err);
    console.error("[Razorpay] Error:", JSON.stringify(err, null, 2));
    console.error("[Razorpay] Error message:", err instanceof Error ? err.message : String(err));
    if (err && typeof err === "object" && "error" in err) {
      console.error("[Razorpay] API error:", JSON.stringify((err as Record<string, unknown>).error));
    }
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
    
    // Extract meaningful error message from various Razorpay error formats
    let message = "Payment gateway error";
    if (err instanceof Error) {
      message = err.message;
    } else if (err && typeof err === "object") {
      const e = err as Record<string, unknown>;
      if (e.error && typeof e.error === "object") {
        const razorErr = e.error as Record<string, unknown>;
        message = String(razorErr.description || razorErr.reason || "Gateway error");
      } else if (e.message) {
        message = String(e.message);
      } else if (e.description) {
        message = String(e.description);
      }
    }
    return NextResponse.json(
      { error: `Payment failed: ${message}. Please try again.` },
      { status: 502 }
    );
  }
}
