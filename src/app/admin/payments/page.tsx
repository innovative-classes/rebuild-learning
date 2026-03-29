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
        <h1 className="text-lg font-bold text-neutral-900">Payments</h1>
        <div className="text-right">
          <p className="text-sm font-bold text-neutral-900">₹{stats._sum.finalAmount || 0}</p>
          <p className="text-xs text-neutral-500">{stats._count} completed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left px-5 py-3 font-medium text-neutral-500">User</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Type</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Assessment</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Amount</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Coupon</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Final</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Status</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-neutral-900">{p.user.name}</p>
                    <p className="text-xs text-neutral-400">{p.user.email}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.type === "PREMIUM" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                    }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">
                    {p.assessment?.title || "—"}
                  </td>
                  <td className="px-5 py-3 text-neutral-600">₹{p.amount}</td>
                  <td className="px-5 py-3">
                    {p.coupon ? (
                      <span className="text-xs font-mono bg-neutral-100 px-1.5 py-0.5 rounded">
                        {p.coupon.code}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-5 py-3 font-semibold text-neutral-900">₹{p.finalAmount}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "COMPLETED"
                        ? "bg-emerald-50 text-emerald-700"
                        : p.status === "PENDING"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-neutral-400 text-xs">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-neutral-400">
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
