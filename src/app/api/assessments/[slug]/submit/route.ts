import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { attemptId } = body;

  if (!attemptId) {
    return NextResponse.json({ error: "Missing attemptId" }, { status: 400 });
  }

  // Verify attempt
  const attempt = await prisma.assessmentAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      completedAt: null,
    },
    include: {
      assessment: {
        include: { questions: true },
      },
      answers: true,
    },
  });

  if (!attempt) {
    return NextResponse.json({ error: "Invalid attempt" }, { status: 400 });
  }

  // Ensure all questions are answered
  if (attempt.answers.length < attempt.assessment.questions.length) {
    return NextResponse.json(
      { error: "Please answer all questions before submitting" },
      { status: 400 }
    );
  }

  // Calculate total score
  const totalScore = attempt.answers.reduce((sum, a) => sum + a.score, 0);

  // Determine interpretation
  let interpretation: string;
  if (totalScore >= 14) {
    interpretation = "HIGH";
  } else if (totalScore >= 9) {
    interpretation = "MEDIUM";
  } else {
    interpretation = "LOW";
  }

  // Update attempt
  await prisma.assessmentAttempt.update({
    where: { id: attemptId },
    data: {
      totalScore,
      interpretation,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({
    success: true,
    totalScore,
    interpretation,
  });
}
