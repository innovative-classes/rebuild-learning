"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CreditCard,
  Tag,
  Calendar,
  CalendarDays,
  Menu,
  X,
  LogOut,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/coupons", label: "Coupons", icon: Tag },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/exam-calendar", label: "Exam Calendar", icon: CalendarDays },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-50/30 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-900 to-green-950 z-50 flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-green-800/50">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-white text-sm">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-green-800/50 rounded text-green-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "text-green-300/70 hover:bg-green-800/40 hover:text-green-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-green-800/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs truncate">
              <p className="font-medium text-green-100">{session?.user?.name}</p>
              <p className="text-green-400/50">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-xs text-green-400/60 hover:text-red-400 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-green-200/50 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-green-50 rounded-lg mr-3"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-green-800" />
          </button>
          <h2 className="text-sm font-semibold text-green-900">
            {navItems.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label || "Admin"}
          </h2>
        </header>

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
