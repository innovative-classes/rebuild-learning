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
        <h1 className="text-lg font-bold text-neutral-900">Manage Assessments</h1>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left px-5 py-3 font-medium text-neutral-500">#</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Module</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Stream</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Questions</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Attempts</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Price</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Status</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3 font-mono text-neutral-400">
                    {String(a.moduleNumber).padStart(2, "0")}
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-neutral-900">{a.title}</p>
                    <p className="text-xs text-neutral-400">{a.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{a.stream}</td>
                  <td className="px-5 py-3">
                    <span className={`${a._count.questions > 0 ? "text-neutral-900" : "text-neutral-400"}`}>
                      {a._count.questions}/8
                    </span>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{a._count.attempts}</td>
                  <td className="px-5 py-3 text-neutral-600">₹{a.price}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.isActive && a._count.questions > 0
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {a.isActive && a._count.questions > 0 ? "Active" : "Coming Soon"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/assessments/${a.id}`}
                      className="text-xs font-medium text-neutral-600 hover:text-neutral-900 transition"
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
