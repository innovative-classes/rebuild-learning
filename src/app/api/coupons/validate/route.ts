import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { code, amount } = body;

  if (!code || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() },
  });

  if (!coupon) {
    return NextResponse.json({ error: "Invalid coupon code" }, { status: 400 });
  }

  if (!coupon.isActive) {
    return NextResponse.json({ error: "Coupon is no longer active" }, { status: 400 });
  }

  const now = new Date();
  if (now < coupon.validFrom || now > coupon.validTo) {
    return NextResponse.json({ error: "Coupon has expired" }, { status: 400 });
  }

  if (coupon.usedCount >= coupon.maxUses) {
    return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
  }

  // Per-user limit: max 3 uses per user
  const userUsageCount = await prisma.payment.count({
    where: {
      userId: session.user.id,
      couponId: coupon.id,
      status: "COMPLETED",
    },
  });
  if (userUsageCount >= 3) {
    return NextResponse.json({ error: "You have already used this coupon the maximum number of times" }, { status: 400 });
  }

  let discount = 0;
  if (coupon.discountType === "PERCENTAGE") {
    discount = Math.round((amount * coupon.discountValue) / 100);
  } else {
    discount = coupon.discountValue;
  }

  discount = Math.min(discount, amount);

  return NextResponse.json({
    couponId: coupon.id,
    discount,
    finalAmount: amount - discount,
  });
}
