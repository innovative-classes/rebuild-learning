import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminAssessmentsPage() {
  const assessments = await prisma.assessment.findMany({
    orderBy: { moduleNumber: "asc" },
    include: {
      _count: { select: { questions: true, attempts: true } },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-green-900">Manage Assessments</h1>
      </div>

      <div className="bg-white rounded-xl border border-green-200/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-200/50 bg-green-50/50">
                <th className="text-left px-5 py-3 font-medium text-green-600/70">#</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Module</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Stream</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Questions</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Attempts</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Price</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Status</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100/50">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-green-500/50">
                    {String(a.moduleNumber).padStart(2, "0")}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-green-900">{a.title}</p>
                    <p className="text-xs text-green-500/50">{a.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-green-700">{a.stream}</td>
                  <td className="px-5 py-3">
                    <span className={`${a._count.questions > 0 ? "text-green-900" : "text-green-500/50"}`}>
                      {a._count.questions}/8
                    </span>
                  </td>
                  <td className="px-5 py-3 text-green-700">{a._count.attempts}</td>
                  <td className="px-5 py-3 text-green-700">₹{a.price}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.isActive && a._count.questions > 0
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}>
                      {a.isActive && a._count.questions > 0 ? "Active" : "Coming Soon"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/assessments/${a.id}`}
                      className="text-xs font-medium text-green-700 hover:text-green-900 transition"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
