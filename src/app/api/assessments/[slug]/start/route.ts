import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  const assessment = await prisma.assessment.findUnique({
    where: { slug },
    include: {
      questions: { orderBy: { questionNumber: "asc" } },
    },
  });

  if (!assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  if (assessment.questions.length === 0) {
    return NextResponse.json({ error: "Assessment not available yet" }, { status: 400 });
  }

  // Payment gate: user must have paid or be premium
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.isPremium) {
    const hasPaid = await prisma.payment.findFirst({
      where: {
        userId: session.user.id,
        assessmentId: assessment.id,
        type: "ASSESSMENT",
        status: "COMPLETED",
      },
    });
    if (!hasPaid) {
      return NextResponse.json(
        { error: "Payment required to attempt this assessment" },
        { status: 403 }
      );
    }
  }

  // Check for an existing incomplete attempt
  let attempt = await prisma.assessmentAttempt.findFirst({
    where: {
      userId: session.user.id,
      assessmentId: assessment.id,
      completedAt: null,
    },
    include: {
      answers: true,
    },
  });

  if (!attempt) {
    attempt = await prisma.assessmentAttempt.create({
      data: {
        userId: session.user.id,
        assessmentId: assessment.id,
      },
      include: {
        answers: true,
      },
    });
  }

  // Build answers map
  const answersMap: Record<string, string> = {};
  for (const answer of attempt.answers) {
    answersMap[answer.questionId] = answer.selectedOption;
  }

  return NextResponse.json({
    attemptId: attempt.id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    questions: assessment.questions.map((q: any) => ({
      id: q.id,
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      optionAText: q.optionAText,
      optionBText: q.optionBText,
      optionCText: q.optionCText,
      optionAScore: q.optionAScore,
      optionBScore: q.optionBScore,
      optionCScore: q.optionCScore,
    })),
    answers: answersMap,
  });
}
