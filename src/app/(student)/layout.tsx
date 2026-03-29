"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard, ClipboardList, BookOpen, BrainCircuit,
  CalendarDays, LogOut, Menu, X, Crown
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assessments", label: "Assessments", icon: ClipboardList },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/college-predictor", label: "College Predictor", icon: BrainCircuit },
  { href: "/exam-calendar", label: "Exam Calendar", icon: CalendarDays },
  { href: "/book-counselling", label: "Book Counselling", icon: CalendarDays },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-neutral-200 px-4 h-14 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-neutral-100 rounded-lg" aria-label="Open navigation menu">
          <Menu className="w-5 h-5 text-neutral-600" />
        </button>
        <Link href="/dashboard" className="font-semibold text-neutral-900 text-sm">Rebuild Learning</Link>
        <div className="w-8" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-neutral-200 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-neutral-900">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-neutral-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent pathname={pathname} isPremium={session?.user?.isPremium} onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-white border-r border-neutral-200">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 px-3">
          <SidebarContent pathname={pathname} isPremium={session?.user?.isPremium} />
        </div>
        <div className="p-4 border-t border-neutral-200">
          <Link href="/profile" className="flex items-center gap-3 mb-3 hover:bg-neutral-50 rounded-lg p-1 -m-1 transition">
            <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-neutral-600">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">{session?.user?.name}</p>
              <p className="text-xs text-neutral-500 truncate">{session?.user?.email}</p>
            </div>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarContent({
  pathname,
  isPremium,
  onNavigate,
}: {
  pathname: string;
  isPremium?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              active
                ? "bg-red-600 text-white"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            {item.label}
          </Link>
        );
      })}

      {!isPremium && (
        <Link
          href="/subscribe"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border border-amber-200 hover:from-amber-100 hover:to-orange-100 transition mt-4"
        >
          <Crown className="w-4.5 h-4.5" />
          Go Premium — ₹999
        </Link>
      )}
    </nav>
  );
}
