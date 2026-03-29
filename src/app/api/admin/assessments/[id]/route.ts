import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
  const { details, questions, reports } = body;

  try {
    // Update assessment details
    if (details) {
      await prisma.assessment.update({
        where: { id },
        data: {
          title: details.title,
          description: details.description,
          overview: details.overview,
          stream: details.stream,
          keyExams: details.keyExams,
          degree: details.degree,
          salaryRange: details.salaryRange,
          demandRating: details.demandRating,
          price: details.price,
          isActive: details.isActive,
        },
      });
    }

    // Update questions
    if (questions && Array.isArray(questions)) {
      for (const q of questions) {
        await prisma.question.update({
          where: { id: q.id },
          data: {
            questionText: q.questionText,
            optionAText: q.optionAText,
            optionBText: q.optionBText,
            optionCText: q.optionCText,
            optionAScore: q.optionAScore,
            optionBScore: q.optionBScore,
            optionCScore: q.optionCScore,
          },
        });
      }
    }

    // Update reports
    if (reports && Array.isArray(reports)) {
      for (const r of reports) {
        await prisma.report.update({
          where: { id: r.id },
          data: {
            title: r.title,
            description: r.description,
            careerPaths: r.careerPaths,
            topColleges: r.topColleges,
            thirtyDayTest: r.thirtyDayTest,
            entranceExamStrategy: r.entranceExamStrategy,
            nextSteps: r.nextSteps,
            mistakesToAvoid: r.mistakesToAvoid,
            trendIntelligence: r.trendIntelligence,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save changes" }, { status: 500 });
  }
}
