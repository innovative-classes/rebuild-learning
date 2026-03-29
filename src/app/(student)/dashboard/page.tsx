import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, ClipboardList, Crown, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const [user, totalAssessments, completedAttempts, recentAttempts] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, isPremium: true },
    }),
    prisma.assessment.count({ where: { isActive: true } }),
    prisma.assessmentAttempt.count({
      where: { userId: session.user.id, completedAt: { not: null } },
    }),
    prisma.assessmentAttempt.findMany({
      where: { userId: session.user.id },
      include: { assessment: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-neutral-500 mt-1">
          Track your career exploration progress and discover new paths.
        </p>
      </div>

      {/* Premium banner */}
      {!user?.isPremium && (
        <Link href="/subscribe" className="block mb-6">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 rounded-2xl p-6 text-white hover:from-neutral-800 hover:to-neutral-600 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">Premium</span>
                </div>
                <h3 className="text-lg font-semibold">Unlock all 12 career reports for ₹999</h3>
                <p className="text-sm text-neutral-300 mt-1">One-time payment. Access everything forever.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-neutral-400 shrink-0" />
            </div>
          </div>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{completedAttempts}</p>
              <p className="text-sm text-neutral-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{totalAssessments}</p>
              <p className="text-sm text-neutral-500">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {user?.isPremium ? "Active" : "Free"}
              </p>
              <p className="text-sm text-neutral-500">Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900">Recent Activity</h2>
          <Link href="/assessments" className="text-sm text-neutral-500 hover:text-neutral-900 transition">
            View all →
          </Link>
        </div>
        {recentAttempts.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 text-sm">No assessments taken yet</p>
            <Link href="/assessments" className="text-sm font-medium text-neutral-900 hover:underline mt-2 inline-block">
              Start your first assessment →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Module {String(attempt.assessment.moduleNumber).padStart(2, "0")}: {attempt.assessment.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {attempt.completedAt
                      ? `Score: ${attempt.totalScore}/16 — ${attempt.interpretation}`
                      : "In Progress"}
                  </p>
                </div>
                <Link
                  href={
                    attempt.completedAt
                      ? `/assessments/${attempt.assessment.slug}/results`
                      : `/assessments/${attempt.assessment.slug}/attempt`
                  }
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900 px-3 py-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
                >
                  {attempt.completedAt ? "View Results" : "Continue"}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
