import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getInterpretation } from "@/lib/utils";
import { ArrowRight, Lock } from "lucide-react";

export default async function ResultsPage({
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

  const score = attempt.totalScore || 0;
  const interp = getInterpretation(score);

  // Check if report is unlocked
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  const isPremium = user?.isPremium || false;

  const hasPaidForReport = await prisma.payment.findFirst({
    where: {
      userId: session.user.id,
      assessmentId: assessment.id,
      type: "ASSESSMENT",
      status: "COMPLETED",
    },
  });

  const reportUnlocked = isPremium || !!hasPaidForReport;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <Link href="/assessments" className="text-sm text-green-600/60 hover:text-green-900 transition">
          ← Back to Assessments
        </Link>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-2xl border border-green-200/50 p-8 text-center mb-6">
        <p className="text-sm text-green-600/60 mb-4">
          Module {String(assessment.moduleNumber).padStart(2, "0")}: {assessment.title}
        </p>

        {/* Score gauge */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#f5f5f5"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={
                interp.level === "HIGH"
                  ? "#059669"
                  : interp.level === "MEDIUM"
                  ? "#d97706"
                  : "#dc2626"
              }
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 16) * 327} 327`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-green-900">{score}</span>
            <span className="text-xs text-green-500/60">out of 16</span>
          </div>
        </div>

        {/* Interpretation */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${interp.bgColor}`}>
          <span className={`text-sm font-semibold ${interp.color}`}>
            {interp.level} — {interp.level === "HIGH" ? "Strong" : interp.level === "MEDIUM" ? "Possible" : "Explore Others"} Fit
          </span>
        </div>

        <p className="text-sm text-green-700 mt-4 max-w-md mx-auto leading-relaxed">
          {interp.message}
        </p>
      </div>

      {/* Report CTA */}
      {reportUnlocked ? (
        <Link
          href={`/assessments/${slug}/report`}
          className="block bg-white rounded-2xl border border-green-200/50 p-6 hover:border-green-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-900">View Full Career Report</h3>
              <p className="text-sm text-green-600/60 mt-1">
                Career paths, top colleges, 30-day test, roadmap & trend intelligence
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-green-500/60 shrink-0" />
          </div>
        </Link>
      ) : (
        <div className="bg-white rounded-2xl border border-green-200/50 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100/50 rounded-lg flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-green-600/60" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900">Unlock Full Career Report</h3>
              <p className="text-sm text-green-600/60 mt-1 mb-4">
                Get detailed career paths with salaries, top AP/TS colleges, your personalised 30-day interest test,
                critical mistakes to avoid, and 2030 trend intelligence.
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/payment/${assessment.id}`}
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                  Unlock Report — ₹{assessment.price}
                </Link>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900 transition"
                >
                  or get Premium for ₹999
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Counselling */}
      <div className="mt-6 bg-green-50/50 rounded-2xl border border-green-200/50 p-6 text-center">
        <p className="text-sm text-green-700 mb-3">
          Want personalised guidance? Talk to an expert.
        </p>
        <Link
          href="/book-counselling"
          className="inline-flex items-center gap-2 border border-green-200 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition"
        >
          Book Counselling Session
        </Link>
      </div>
    </div>
  );
}
