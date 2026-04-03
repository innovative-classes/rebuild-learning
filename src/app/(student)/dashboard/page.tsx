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
        <h1 className="text-2xl font-bold text-green-900">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-green-700/60 mt-1">
          Track your career exploration progress and discover new paths.
        </p>
      </div>

      {/* Premium banner */}
      {!user?.isPremium && (
        <Link href="/subscribe" className="block mb-6">
          <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-2xl p-6 text-white hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-900/20 border border-green-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Premium</span>
                </div>
                <h3 className="text-lg font-semibold">Unlock all 12 career reports for ₹999</h3>
                <p className="text-sm text-green-200/60 mt-1">One-time payment. Access everything forever.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-green-400 shrink-0" />
            </div>
          </div>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-green-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">{completedAttempts}</p>
              <p className="text-sm text-green-600/60">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-green-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">{totalAssessments}</p>
              <p className="text-sm text-green-600/60">Available</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-green-200/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">
                {user?.isPremium ? "Active" : "Free"}
              </p>
              <p className="text-sm text-green-600/60">Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-green-200/50 shadow-sm">
        <div className="px-6 py-4 border-b border-green-100 flex items-center justify-between">
          <h2 className="font-semibold text-green-900">Recent Activity</h2>
          <Link href="/assessments" className="text-sm text-green-600/60 hover:text-green-900 transition">
            View all →
          </Link>
        </div>
        {recentAttempts.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList className="w-10 h-10 text-green-300 mx-auto mb-3" />
            <p className="text-green-600/60 text-sm">No assessments taken yet</p>
            <Link href="/assessments" className="text-sm font-medium text-green-800 hover:underline mt-2 inline-block">
              Start your first assessment →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-green-50">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="px-6 py-4 flex items-center justify-between hover:bg-green-50/50 transition">
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Module {String(attempt.assessment.moduleNumber).padStart(2, "0")}: {attempt.assessment.title}
                  </p>
                  <p className="text-xs text-green-600/50 mt-0.5">
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
                  className="text-xs font-medium text-green-700 hover:text-green-900 px-3 py-1.5 border border-green-200 rounded-lg hover:bg-green-50 transition"
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
