import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Cpu, Heart, Atom, TrendingUp, Calculator, Briefcase,
  Scale, Shield, Brain, Palette, Radio, Leaf, Lock, CheckCircle2
} from "lucide-react";

const moduleIcons: Record<number, React.ElementType> = {
  1: Cpu, 2: Heart, 3: Atom, 4: TrendingUp, 5: Calculator, 6: Briefcase,
  7: Scale, 8: Shield, 9: Brain, 10: Palette, 11: Radio, 12: Leaf,
};

export default async function AssessmentsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const assessments = await prisma.assessment.findMany({
    where: { isActive: true },
    orderBy: { moduleNumber: "asc" },
    include: {
      questions: { select: { id: true } },
      attempts: {
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Career Assessments</h1>
        <p className="text-neutral-500 mt-1">
          Take scientifically scored quizzes to discover your career fit across 12 domains.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessments.map((assessment) => {
          const Icon = moduleIcons[assessment.moduleNumber] || Cpu;
          const hasQuestions = assessment.questions.length > 0;
          const latestAttempt = assessment.attempts[0];
          const isCompleted = !!latestAttempt?.completedAt;
          const isInProgress = !!latestAttempt && !isCompleted;

          return (
            <Link
              key={assessment.id}
              href={hasQuestions ? `/assessments/${assessment.slug}` : "#"}
              className={`group relative bg-white rounded-xl p-5 border transition-all duration-200 ${
                hasQuestions
                  ? "border-neutral-200 hover:border-neutral-300 hover:shadow-md cursor-pointer"
                  : "border-neutral-100 opacity-60 cursor-not-allowed"
              }`}
            >
              {/* Status badge */}
              {isCompleted && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {latestAttempt.totalScore}/16
                  </div>
                </div>
              )}
              {isInProgress && (
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                    In Progress
                  </div>
                </div>
              )}
              {!hasQuestions && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-xs font-medium">
                    <Lock className="w-3 h-3" />
                    Coming Soon
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${assessment.accentColor}10` }}
                >
                  <Icon className="w-5 h-5" style={{ color: assessment.accentColor }} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    Module {String(assessment.moduleNumber).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-neutral-900 text-sm leading-snug mt-0.5">
                    {assessment.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-neutral-500 line-clamp-2 mb-3">
                {assessment.description}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {assessment.stream}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                  {assessment.salaryRange}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
