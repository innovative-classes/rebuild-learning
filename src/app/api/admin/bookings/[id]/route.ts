import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      status: body.status,
      adminNotes: body.adminNotes || undefined,
    },
  });

  // Send status update email to student (non-blocking)
  if (body.status && booking.email) {
    sendBookingConfirmationEmail(
      booking.email,
      booking.name,
      booking.preferredDate,
      booking.preferredTime,
      body.status
    ).catch(() => {});
  }

  return NextResponse.json(booking);
}
