import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getInterpretation } from "@/lib/utils";
import ReportContent from "./report-content";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) return null;

  const assessment = await prisma.assessment.findUnique({
    where: { slug },
    include: {
      attempts: {
        where: { userId: session.user.id, completedAt: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!assessment) return notFound();
  const attempt = assessment.attempts[0];
  if (!attempt) redirect(`/assessments/${slug}`);

  // Check authorization — payment must be done before quiz
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  const isPremium = user?.isPremium || false;
  const hasPaid = await prisma.payment.findFirst({
    where: {
      userId: session.user.id,
      assessmentId: assessment.id,
      type: "ASSESSMENT",
      status: "COMPLETED",
    },
  });

  if (!isPremium && !hasPaid) {
    redirect(`/assessments/${slug}`);
  }

  // Get report data for this interpretation
  const report = await prisma.report.findUnique({
    where: {
      assessmentId_tierLevel: {
        assessmentId: assessment.id,
        tierLevel: attempt.interpretation || "HIGH",
      },
    },
  });

  const score = attempt.totalScore || 0;
  const interp = getInterpretation(score);

  const careerPaths = report ? JSON.parse(report.careerPaths) : [];
  const topColleges = report ? JSON.parse(report.topColleges) : [];
  const nextSteps = report ? JSON.parse(report.nextSteps) : [];
  const mistakesToAvoid = report ? JSON.parse(report.mistakesToAvoid) : [];
  const trendIntelligence = report ? JSON.parse(report.trendIntelligence) : [];
  const entranceExamStrategy = report?.entranceExamStrategy ? JSON.parse(report.entranceExamStrategy) : [];

  return (
    <ReportContent
      slug={slug}
      assessment={{
        moduleNumber: assessment.moduleNumber,
        title: assessment.title,
        accentColor: assessment.accentColor,
      }}
      score={score}
      interp={interp}
      reportDescription={report?.description || interp.message}
      thirtyDayTest={report?.thirtyDayTest || null}
      careerPaths={careerPaths}
      topColleges={topColleges}
      entranceExamStrategy={entranceExamStrategy}
      nextSteps={nextSteps}
      mistakesToAvoid={mistakesToAvoid}
      trendIntelligence={trendIntelligence}
      studentName={user?.name || "Student"}
    />
  );
}
