import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(coupons);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { code, discountType, discountValue, maxUses, validTo } = body;

  if (!code || !discountType || discountValue == null || !validTo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (typeof discountValue !== "number" || discountValue <= 0) {
    return NextResponse.json({ error: "Invalid discount value" }, { status: 400 });
  }
  if (!["PERCENTAGE", "FIXED"].includes(discountType)) {
    return NextResponse.json({ error: "Invalid discount type" }, { status: 400 });
  }

  const existing = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  if (existing) {
    return NextResponse.json({ error: "Coupon code already exists" }, { status: 400 });
  }

  const coupon = await prisma.coupon.create({
    data: {
      code: code.toUpperCase(),
      discountType,
      discountValue,
      maxUses: maxUses || 100,
      validTo: new Date(validTo),
    },
  });

  return NextResponse.json(coupon, { status: 201 });
}
