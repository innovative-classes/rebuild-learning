import { prisma } from "@/lib/prisma";
import { Users, CreditCard, ClipboardList, Calendar } from "lucide-react";

export default async function AdminDashboardPage() {
  const [userCount, paymentStats, assessmentCount, bookingCount] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.payment.aggregate({
      where: { status: "COMPLETED" },
      _sum: { finalAmount: true },
      _count: true,
    }),
    prisma.assessment.count(),
    prisma.booking.count({ where: { status: "PENDING" } }),
  ]);

  const recentPayments = await prisma.payment.findMany({
    where: { status: "COMPLETED" },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const recentBookings = await prisma.booking.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Total Students", value: userCount, icon: Users },
    { label: "Revenue", value: `₹${paymentStats._sum.finalAmount || 0}`, icon: CreditCard },
    { label: "Assessments", value: assessmentCount, icon: ClipboardList },
    { label: "Pending Bookings", value: bookingCount, icon: Calendar },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-green-200/50 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-green-700" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-900">{stat.value}</p>
            <p className="text-xs text-green-600/60 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-xl border border-green-200/50 shadow-sm">
          <div className="px-5 py-4 border-b border-green-200/50">
            <h3 className="text-sm font-semibold text-green-900">Recent Payments</h3>
          </div>
          <div className="divide-y divide-green-100/50">
            {recentPayments.length === 0 && (
              <p className="text-sm text-green-500/50 p-5">No payments yet</p>
            )}
            {recentPayments.map((p) => (
              <div key={p.id} className="px-5 py-3 flex items-center justify-between hover:bg-green-50/50 transition">
                <div>
                  <p className="text-sm font-medium text-green-900">{p.user.name}</p>
                  <p className="text-xs text-green-500/60">{p.type} • {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="text-sm font-semibold text-green-900">₹{p.finalAmount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white rounded-xl border border-green-200/50 shadow-sm">
          <div className="px-5 py-4 border-b border-green-200/50">
            <h3 className="text-sm font-semibold text-green-900">Pending Bookings</h3>
          </div>
          <div className="divide-y divide-green-100/50">
            {recentBookings.length === 0 && (
              <p className="text-sm text-green-500/50 p-5">No pending bookings</p>
            )}
            {recentBookings.map((b) => (
              <div key={b.id} className="px-5 py-3 hover:bg-green-50/50 transition">
                <p className="text-sm font-medium text-green-900">{b.name}</p>
                <p className="text-xs text-green-500/60">
                  {b.preferredDate} at {b.preferredTime} • {b.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
