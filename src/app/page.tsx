import Link from "next/link";
import {
  Cpu, Heart, Atom, TrendingUp, Calculator, Briefcase, Scale, Shield,
  Brain, Palette, Radio, Leaf, ArrowRight, CheckCircle2, Star
} from "lucide-react";
import { Logo, LogoMark } from "@/components/ui/logo";

const modules = [
  { num: 1, title: "Engineering, Technology & AI", stream: "PCM", icon: Cpu, color: "#2563eb", demand: 5 },
  { num: 2, title: "Medicine, Healthcare & Biotech", stream: "PCB", icon: Heart, color: "#dc2626", demand: 5 },
  { num: 3, title: "Pure Sciences, Research & Space", stream: "PCM/PCB", icon: Atom, color: "#7c3aed", demand: 4 },
  { num: 4, title: "Finance, Stock Market & IB", stream: "Commerce+Maths", icon: TrendingUp, color: "#059669", demand: 5 },
  { num: 5, title: "CA, CS & Corporate Finance", stream: "Commerce", icon: Calculator, color: "#d97706", demand: 5 },
  { num: 6, title: "Business, Marketing & Startup", stream: "Any", icon: Briefcase, color: "#ea580c", demand: 4 },
  { num: 7, title: "Law, Legal Services & Policy", stream: "Any", icon: Scale, color: "#4f46e5", demand: 4 },
  { num: 8, title: "Civil Services & Defence", stream: "Any", icon: Shield, color: "#0d9488", demand: 4 },
  { num: 9, title: "Psychology & Mental Health", stream: "Any", icon: Brain, color: "#c026d3", demand: 5 },
  { num: 10, title: "Design, Animation & Gaming", stream: "Any", icon: Palette, color: "#e11d48", demand: 5 },
  { num: 11, title: "Media, Journalism & Content", stream: "Any", icon: Radio, color: "#0891b2", demand: 4 },
  { num: 12, title: "Green Energy & Sustainability", stream: "Any", icon: Leaf, color: "#16a34a", demand: 5 },
];

const steps = [
  { step: "01", title: "Explore Modules", desc: "Browse 12 career domains and find what sparks your curiosity" },
  { step: "02", title: "Unlock the Assessment", desc: "Pay ₹99 per module (or ₹999 for all 12) to access the full quiz" },
  { step: "03", title: "Take the Quiz", desc: "Answer 8 scientifically designed questions honestly" },
  { step: "04", title: "Get Your Report", desc: "Score, career paths, top colleges, roadmap & trend intelligence — included" },
  { step: "05", title: "Book Counselling", desc: "Schedule a 30-min session with N.B.V. Subba Rao (₹2,500)" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo showSubtext={false} />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition px-3 py-2">
              Sign in
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-600 mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              2025–2030 Career Intelligence for AP & TS Students
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Discover Your{" "}
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                Career Path
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-2xl">
              Take scientifically scored assessments across 12 career domains. Get personalised reports with top colleges, roadmaps & trend intelligence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-red-700 transition">
                Start Your Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#modules" className="inline-flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-neutral-50 transition">
                Explore 12 Modules
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 text-lg">12</span> Career Modules
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 text-lg">96</span> Scored Questions
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 text-lg">48+</span> Career Paths
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-neutral-900">How It Works</h2>
            <p className="text-neutral-600 mt-3 max-w-xl mx-auto">
              A structured, scientific approach to career discovery — not opinion-based guesswork.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative bg-white rounded-xl p-6 border border-neutral-200">
                <span className="text-3xl font-bold text-neutral-100">{s.step}</span>
                <h3 className="font-semibold text-neutral-900 mt-2">{s.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-neutral-900">12 Career Modules</h2>
            <p className="text-neutral-600 mt-3 max-w-xl mx-auto">
              Each module includes an 8-question scientific assessment, personalised report, and complete career intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.num}
                  className="group relative bg-white rounded-xl p-6 border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${m.color}10` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: m.color }} />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Module {String(m.num).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900">{m.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {m.stream}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < m.demand
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-neutral-900">Simple Pricing</h2>
            <p className="text-neutral-600 mt-3">Explore for free. Pay only when you&apos;re ready to take an assessment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900">Browse</h3>
              <p className="text-3xl font-bold text-neutral-900 mt-3">₹0</p>
              <p className="text-sm text-neutral-500 mt-1">free forever</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Explore all 12 modules
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Read career overviews
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Book counselling (₹2,500)
                </li>
              </ul>
              <Link href="/signup" className="mt-8 block w-full text-center py-2.5 px-4 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition">
                Get Started
              </Link>
            </div>

            {/* Per Assessment */}
            <div className="bg-white rounded-2xl p-8 border border-neutral-200">
              <h3 className="font-semibold text-neutral-900">Per Assessment</h3>
              <p className="text-3xl font-bold text-neutral-900 mt-3">₹99</p>
              <p className="text-sm text-neutral-500 mt-1">per module</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Full 8-question scientific quiz
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Detailed career paths & salaries
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Top colleges (AP & TS specific)
                </li>
                <li className="flex items-center gap-2 text-sm text-neutral-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  30-Day Interest Test plan
                </li>
              </ul>
              <Link href="/signup" className="mt-8 block w-full text-center py-2.5 px-4 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition">
                Take Assessment
              </Link>
            </div>

            {/* Premium */}
            <div className="relative bg-red-600 text-white rounded-2xl p-8 border border-red-700">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="font-semibold">Premium</h3>
              <p className="text-3xl font-bold mt-3">₹999</p>
              <p className="text-sm text-red-200 mt-1">one-time, forever</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-red-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  All 12 assessments unlocked
                </li>
                <li className="flex items-center gap-2 text-sm text-red-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  All 12 reports included
                </li>
                <li className="flex items-center gap-2 text-sm text-red-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  Trend intelligence 2030
                </li>
                <li className="flex items-center gap-2 text-sm text-red-100">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  Priority counselling booking
                </li>
              </ul>
              <Link href="/signup" className="mt-8 block w-full text-center py-2.5 px-4 bg-white text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition">
                Subscribe — ₹999
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900">
            Ready to discover your career path?
          </h2>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto">
            Join thousands of AP & TS students who are making informed career decisions backed by science, not pressure.
          </p>
          <div className="mt-8">
            <Link href="/signup" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-red-700 transition">
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <nav className="flex items-center gap-4 text-xs text-neutral-500">
              <Link href="/terms" className="hover:text-neutral-900 transition">Terms</Link>
              <Link href="/privacy" className="hover:text-neutral-900 transition">Privacy</Link>
              <Link href="/refund-policy" className="hover:text-neutral-900 transition">Refund Policy</Link>
            </nav>
          </div>
          <p className="text-xs text-neutral-400 text-center mt-6">
            © 2025 N.B.V. Subba Rao. Rebuild Learning — Career Guidance for AP & TS Students. Edition 2025–2030.
          </p>
          <p className="text-xs text-neutral-400 text-center mt-2">
            Powered by{" "}
            <a
              href="https://innovativeclasses.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 font-medium transition"
            >
              Subbu Innovative Classes
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
