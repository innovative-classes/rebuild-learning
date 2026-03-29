import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { attemptId, questionId, selectedOption } = body;

  if (!attemptId || !questionId || !selectedOption) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!["A", "B", "C"].includes(selectedOption)) {
    return NextResponse.json({ error: "Invalid option" }, { status: 400 });
  }

  // Verify attempt belongs to user and is not completed
  const attempt = await prisma.assessmentAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      completedAt: null,
    },
  });

  if (!attempt) {
    return NextResponse.json({ error: "Invalid attempt" }, { status: 400 });
  }

  // Get question to calculate score
  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question || question.assessmentId !== attempt.assessmentId) {
    return NextResponse.json({ error: "Invalid question" }, { status: 400 });
  }

  const score =
    selectedOption === "A"
      ? question.optionAScore
      : selectedOption === "B"
      ? question.optionBScore
      : question.optionCScore;

  // Upsert answer
  await prisma.attemptAnswer.upsert({
    where: {
      attemptId_questionId: {
        attemptId,
        questionId,
      },
    },
    create: {
      attemptId,
      questionId,
      selectedOption,
      score,
    },
    update: {
      selectedOption,
      score,
    },
  });

  return NextResponse.json({ success: true });
}
