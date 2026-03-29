import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { attempts: true, payments: true },
      },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-neutral-900">Manage Users</h1>
        <span className="text-sm text-neutral-500">{users.length} students</span>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Name</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Email</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Phone</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Class</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Attempts</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Plan</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-neutral-900">{u.name}</td>
                  <td className="px-5 py-3 text-neutral-600">{u.email}</td>
                  <td className="px-5 py-3 text-neutral-600">{u.phone || "—"}</td>
                  <td className="px-5 py-3 text-neutral-600">
                    {u.studentClass || "—"} {u.stream ? `(${u.stream})` : ""}
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{u._count.attempts}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.isPremium
                        ? "bg-amber-50 text-amber-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {u.isPremium ? "Premium" : "Free"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-neutral-400 text-xs">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-neutral-400">
                    No students registered yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
