import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Star, Lock, ShieldCheck } from "lucide-react";

export default async function AssessmentDetailPage({
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
      questions: { orderBy: { questionNumber: "asc" } },
      attempts: {
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!assessment) return notFound();

  const latestAttempt = assessment.attempts[0];
  const isCompleted = !!latestAttempt?.completedAt;
  const isInProgress = !!latestAttempt && !isCompleted;
  const hasQuestions = assessment.questions.length > 0;

  // Check if user has paid or is premium
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
  const canAccessQuiz = isPremium || !!hasPaid;

  return (
    <div className="max-w-3xl">
      <div className="mb-2">
        <Link href="/assessments" className="text-sm text-neutral-500 hover:text-neutral-900 transition">
          ← Back to Assessments
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono text-neutral-400">
            Module {String(assessment.moduleNumber).padStart(2, "0")}
          </span>
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: assessment.accentColor }}
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
          {assessment.title}
        </h1>
        <p className="text-neutral-600 leading-relaxed">{assessment.overview}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-100">
          <div>
            <p className="text-xs text-neutral-400 mb-1">Stream</p>
            <p className="text-sm font-medium text-neutral-900">{assessment.stream}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-1">Key Exams</p>
            <p className="text-sm font-medium text-neutral-900">{assessment.keyExams}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-1">Degree</p>
            <p className="text-sm font-medium text-neutral-900">{assessment.degree}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-400 mb-1">Salary Range</p>
            <p className="text-sm font-medium text-neutral-900">{assessment.salaryRange}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          <span className="text-xs text-neutral-400 mr-1">2030 Demand:</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < assessment.demandRating
                  ? "fill-amber-400 text-amber-400"
                  : "text-neutral-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
        {!hasQuestions ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-neutral-400" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              The assessment for this module is currently being prepared. Check back soon!
            </p>
          </div>
        ) : isCompleted ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-900 mb-1">Assessment Completed</h3>
            <p className="text-sm text-neutral-500 mb-4">
              Your score: <span className="font-semibold text-neutral-900">{latestAttempt.totalScore}/16</span>{" "}
              — <span className="font-medium">{latestAttempt.interpretation} Fit</span>
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href={`/assessments/${assessment.slug}/report`}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                View Full Report
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : !canAccessQuiz ? (
          /* Payment gate before quiz */
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Unlock This Assessment</h3>
            <p className="text-sm text-neutral-500 mb-2 max-w-md mx-auto">
              Pay once to access the 8-question quiz. Your detailed career report — including career paths, top colleges, 30-day interest test & roadmap — is included free after completing the assessment.
            </p>
            <p className="text-xs text-neutral-400 mb-6">
              8 scientifically designed questions · Takes about 5 minutes · Career report included
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href={`/payment/${assessment.id}`}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                Unlock for ₹{assessment.price}
              </Link>
              <Link
                href="/subscribe"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition"
              >
                or get Premium for ₹999 (all modules)
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <h3 className="font-semibold text-neutral-900 mb-2">
              {isInProgress ? "Continue Your Assessment" : "Self-Assessment Quiz"}
            </h3>
            <p className="text-sm text-neutral-500 mb-2 max-w-md mx-auto">
              8 scientifically designed questions · Takes about 5 minutes
            </p>
            <p className="text-xs text-neutral-400 mb-6">
              Answer honestly — your score reveals your genuine interest intensity, not what sounds impressive.
            </p>
            <Link
              href={`/assessments/${assessment.slug}/attempt`}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              {isInProgress ? "Continue Quiz" : "Start Quiz"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
