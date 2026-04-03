import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      assessment: { select: { title: true } },
      coupon: { select: { code: true } },
    },
  });

  const stats = await prisma.payment.aggregate({
    where: { status: "COMPLETED" },
    _sum: { finalAmount: true },
    _count: true,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-green-900">Payments</h1>
        <div className="text-right">
          <p className="text-sm font-bold text-green-900">₹{stats._sum.finalAmount || 0}</p>
          <p className="text-xs text-green-600/60">{stats._count} completed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-green-200/50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-200/50 bg-green-50/50">
                <th className="text-left px-5 py-3 font-medium text-green-600/70">User</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Type</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Assessment</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Amount</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Coupon</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Final</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Status</th>
                <th className="text-left px-5 py-3 font-medium text-green-600/70">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-100/50">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-green-900">{p.user.name}</p>
                    <p className="text-xs text-green-500/50">{p.user.email}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.type === "PREMIUM" ? "bg-yellow-50 text-yellow-700" : "bg-blue-50 text-blue-700"
                    }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-green-700">
                    {p.assessment?.title || "—"}
                  </td>
                  <td className="px-5 py-3 text-green-700">₹{p.amount}</td>
                  <td className="px-5 py-3">
                    {p.coupon ? (
                      <span className="text-xs font-mono bg-green-50 px-1.5 py-0.5 rounded">
                        {p.coupon.code}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3 font-semibold text-green-900">₹{p.finalAmount}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "COMPLETED"
                        ? "bg-green-50 text-green-700"
                        : p.status === "PENDING"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-green-500/50 text-xs">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-green-500/50">
                    No payments yet
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
