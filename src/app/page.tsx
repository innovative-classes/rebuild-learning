"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu, Heart, Atom, TrendingUp, Calculator, Briefcase, Scale, Shield,
  Brain, Palette, Radio, Leaf, ArrowRight, CheckCircle2, Star, Sparkles, Zap
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

const modules = [
  { num: 1, title: "Engineering, Technology & AI", stream: "PCM", icon: Cpu, color: "#166534", demand: 5 },
  { num: 2, title: "Medicine, Healthcare & Biotech", stream: "PCB", icon: Heart, color: "#dc2626", demand: 5 },
  { num: 3, title: "Pure Sciences, Research & Space", stream: "PCM/PCB", icon: Atom, color: "#7c3aed", demand: 4 },
  { num: 4, title: "Finance, Stock Market & IB", stream: "Commerce+Maths", icon: TrendingUp, color: "#166534", demand: 5 },
  { num: 5, title: "CA, CS & Corporate Finance", stream: "Commerce", icon: Calculator, color: "#f59e0b", demand: 5 },
  { num: 6, title: "Business, Marketing & Startup", stream: "Any", icon: Briefcase, color: "#dc2626", demand: 4 },
  { num: 7, title: "Law, Legal Services & Policy", stream: "Any", icon: Scale, color: "#166534", demand: 4 },
  { num: 8, title: "Civil Services & Defence", stream: "Any", icon: Shield, color: "#0d9488", demand: 4 },
  { num: 9, title: "Psychology & Mental Health", stream: "Any", icon: Brain, color: "#7c3aed", demand: 5 },
  { num: 10, title: "Design, Animation & Gaming", stream: "Any", icon: Palette, color: "#dc2626", demand: 5 },
  { num: 11, title: "Media, Journalism & Content", stream: "Any", icon: Radio, color: "#f59e0b", demand: 4 },
  { num: 12, title: "Green Energy & Sustainability", stream: "Any", icon: Leaf, color: "#166534", demand: 5 },
];

const steps = [
  { step: "01", title: "Explore Modules", desc: "Browse 12 career domains and find what sparks your curiosity", emoji: "🔍" },
  { step: "02", title: "Unlock the Assessment", desc: "Pay ₹99 per module (or ₹999 for all 12) to access the full quiz", emoji: "🔓" },
  { step: "03", title: "Take the Quiz", desc: "Answer 8 scientifically designed questions honestly", emoji: "📝" },
  { step: "04", title: "Get Your Report", desc: "Score, career paths, top colleges, roadmap & trend intelligence — included", emoji: "📊" },
  { step: "05", title: "Book Counselling", desc: "Schedule a 30-min session with N.B.V. Subba Rao (₹2,500)", emoji: "🎯" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-950">
      {/* Header */}
      <header className="sticky top-0 z-50 glass bg-green-950/70 border-b border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo showSubtext={false} />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-green-200 hover:text-white transition px-3 py-2">
              Sign in
            </Link>
            <Link href="/signup" className="text-sm font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-950 px-5 py-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "10%", left: "5%" }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-red-500/10 blur-3xl"
            animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: "20%", right: "10%" }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-green-400/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: "10%", left: "40%" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-800/50 border border-green-600/30 text-xs font-medium text-yellow-400 mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              2025–2030 Career Intelligence for AP & TS Students
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Discover Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                Career Path
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg sm:text-xl text-green-200/80 leading-relaxed max-w-2xl"
            >
              Take scientifically scored assessments across 12 career domains. Get personalised reports with top colleges, roadmaps & trend intelligence.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/signup" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50">
                Start Your Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#modules" className="inline-flex items-center justify-center gap-2 border border-green-600/50 text-green-100 px-7 py-3.5 rounded-full text-sm font-medium hover:bg-green-800/50 hover:border-green-500/50 transition-all backdrop-blur-sm">
                Explore 12 Modules
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-12 flex flex-wrap items-center gap-8 text-sm text-green-300/70"
            >
              {[
                { num: "12", label: "Career Modules" },
                { num: "96", label: "Scored Questions" },
                { num: "48+", label: "Career Paths" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="font-bold text-yellow-400 text-2xl">{stat.num}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-green-950 to-green-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How It Works</h2>
            <p className="text-green-300/70 mt-3 max-w-xl mx-auto">
              A structured, scientific approach to career discovery — not opinion-based guesswork.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                custom={i}
                className="relative bg-green-800/30 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 hover:border-yellow-500/30 transition-all duration-300 card-hover group"
              >
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">{s.emoji}</span>
                <span className="text-xs font-mono text-yellow-500/60">{s.step}</span>
                <h3 className="font-semibold text-white mt-1">{s.title}</h3>
                <p className="text-sm text-green-300/60 mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="py-24 bg-gradient-to-b from-green-900 to-green-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">12 Career Modules</h2>
            <p className="text-green-300/70 mt-3 max-w-xl mx-auto">
              Each module includes an 8-question scientific assessment, personalised report, and complete career intelligence.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.num}
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  className="group relative bg-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 hover:border-yellow-500/40 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${m.color}20` }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6" style={{ color: m.color }} />
                    </motion.div>
                    <span className="text-xs font-mono text-green-500/50">
                      Module {String(m.num).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-yellow-300 transition-colors">{m.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-green-700/40 text-green-200 border border-green-600/30">
                      {m.stream}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3.5 h-3.5 ${
                            j < m.demand
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-green-700/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-gradient-to-b from-green-950 to-green-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Simple Pricing</h2>
            <p className="text-green-300/70 mt-3">Explore for free. Pay only when you&apos;re ready to take an assessment.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Free */}
            <motion.div variants={scaleIn} className="bg-green-800/30 backdrop-blur-sm rounded-2xl p-8 border border-green-700/30 hover:border-green-600/50 transition-all card-hover">
              <h3 className="font-semibold text-green-100">Browse</h3>
              <p className="text-3xl font-bold text-white mt-3">₹0</p>
              <p className="text-sm text-green-400/60 mt-1">free forever</p>
              <ul className="mt-6 space-y-3">
                {["Explore all 12 modules", "Read career overviews", "Book counselling (₹2,500)"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-green-200/70">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-8 block w-full text-center py-2.5 px-4 border border-green-600/50 text-green-100 text-sm font-medium rounded-full hover:bg-green-800/50 transition">
                Get Started
              </Link>
            </motion.div>

            {/* Per Assessment */}
            <motion.div variants={scaleIn} className="bg-green-800/30 backdrop-blur-sm rounded-2xl p-8 border border-green-700/30 hover:border-green-600/50 transition-all card-hover">
              <h3 className="font-semibold text-green-100">Per Assessment</h3>
              <p className="text-3xl font-bold text-white mt-3">₹99</p>
              <p className="text-sm text-green-400/60 mt-1">per module</p>
              <ul className="mt-6 space-y-3">
                {["Full 8-question scientific quiz", "Detailed career paths & salaries", "Top colleges (AP & TS specific)", "30-Day Interest Test plan"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-green-200/70">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-8 block w-full text-center py-2.5 px-4 border border-green-600/50 text-green-100 text-sm font-medium rounded-full hover:bg-green-800/50 transition">
                Take Assessment
              </Link>
            </motion.div>

            {/* Premium */}
            <motion.div
              variants={scaleIn}
              className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-green-950 rounded-2xl p-8 border border-yellow-300 shadow-2xl shadow-yellow-500/20 card-hover"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Zap className="w-3 h-3" />
                BEST VALUE
              </div>
              <h3 className="font-semibold">Premium</h3>
              <p className="text-3xl font-bold mt-3">₹999</p>
              <p className="text-sm text-green-800/70 mt-1">one-time, forever</p>
              <ul className="mt-6 space-y-3">
                {["All 12 assessments unlocked", "All 12 reports included", "Trend intelligence 2030", "Priority counselling booking"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-green-900/80">
                    <CheckCircle2 className="w-4 h-4 text-green-800 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-8 block w-full text-center py-2.5 px-4 bg-green-900 text-yellow-400 text-sm font-semibold rounded-full hover:bg-green-800 transition shadow-lg">
                Subscribe — ₹999
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-green-900" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            background: "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15), transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to discover your career path?
            </h2>
            <p className="mt-4 text-green-200/70 max-w-xl mx-auto">
              Join thousands of AP & TS students who are making informed career decisions backed by science, not pressure.
            </p>
            <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link href="/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-xl shadow-red-600/30">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-800/50 py-12 bg-green-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
            <nav className="flex items-center gap-4 text-xs text-green-400/60">
              <Link href="/terms" className="hover:text-green-200 transition">Terms</Link>
              <Link href="/privacy" className="hover:text-green-200 transition">Privacy</Link>
              <Link href="/refund-policy" className="hover:text-green-200 transition">Refund Policy</Link>
            </nav>
          </div>
          <p className="text-xs text-green-500/40 text-center mt-6">
            © 2025 N.B.V. Subba Rao. Rebuild Learning — Career Guidance for AP & TS Students. Edition 2025–2030.
          </p>
          <p className="text-xs text-green-500/40 text-center mt-2">
            Powered by{" "}
            <a
              href="https://innovativeclasses.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 font-medium transition"
            >
              Subbu Innovative Classes
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
