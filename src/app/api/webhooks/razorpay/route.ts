import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    if (eventType === "payment.captured") {
      const paymentEntity = event.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      const payment = await prisma.payment.findFirst({
        where: { razorpayOrderId: orderId, status: "PENDING" },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "COMPLETED",
            razorpayPaymentId,
          },
        });

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
            where: { id: payment.userId },
            data: {
              isPremium: true,
              premiumPurchasedAt: new Date(),
            },
          });
        }

        // If counselling, confirm the booking
        if (payment.type === "COUNSELLING" && payment.bookingId) {
          await prisma.booking.update({
            where: { id: payment.bookingId },
            data: { status: "PENDING" },
          });
        }
      }
    }

    if (eventType === "payment.failed") {
      const paymentEntity = event.payload.payment.entity;
      const orderId = paymentEntity.order_id;

      await prisma.payment.updateMany({
        where: { razorpayOrderId: orderId, status: "PENDING" },
        data: { status: "FAILED" },
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
