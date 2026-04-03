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
        <h1 className="text-lg font-bold text-green-900">Manage Users</h1>
        <span className="text-sm text-green-600/60">{users.length} students</span>
      </div>

      <div className="bg-white rounded-xl border border-green-200/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-200/50 bg-green-50/50">
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Name</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Email</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Phone</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Class</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Attempts</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Plan</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100/50">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-green-900">{u.name}</td>
                  <td className="px-5 py-3 text-green-700">{u.email}</td>
                  <td className="px-5 py-3 text-green-700">{u.phone || "—"}</td>
                  <td className="px-5 py-3 text-green-700">
                    {u.studentClass || "—"} {u.stream ? `(${u.stream})` : ""}
                  </td>
                  <td className="px-5 py-3 text-green-700">{u._count.attempts}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.isPremium
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-green-50 text-green-600"
                    }`}>
                      {u.isPremium ? "Premium" : "Free"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-green-500/50 text-xs">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-green-500/50">
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
