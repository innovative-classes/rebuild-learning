"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu, Heart, Atom, TrendingUp, Calculator, Briefcase, Scale, Shield,
  Brain, Palette, Radio, Leaf, ArrowRight, CheckCircle2, Star, Sparkles, Zap,
  GraduationCap, CalendarDays, Search, Building2, Award, FileText,
  MapPin, Target, Users, School, BookOpen, Clock,
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
              Don&apos;t Guess Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                Career Path
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg sm:text-xl text-green-200/80 leading-relaxed max-w-2xl"
            >
              India&apos;s first post-10th career discovery platform. Take scientifically scored assessments, predict your college, track exam dates, and plan your future — all in one place.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/assessments" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50">
                Start Free Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/college-predictor" className="inline-flex items-center justify-center gap-2 border border-green-600/50 text-green-100 px-7 py-3.5 rounded-full text-sm font-medium hover:bg-green-800/50 hover:border-green-500/50 transition-all backdrop-blur-sm">
                <Search className="w-4 h-4" />
                College Predictor — Free
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-12 flex flex-wrap items-center gap-8 text-sm text-green-300/70"
            >
              {[
                { num: "12", label: "Career Modules" },
                { num: "128", label: "Colleges Tracked" },
                { num: "250+", label: "Exams in Calendar" },
                { num: "71K+", label: "Cutoff Data Points" },
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

      {/* Free Tools Section */}
      <section className="py-24 bg-gradient-to-b from-green-950 to-green-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-medium text-yellow-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              100% Free — No Login Required
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Free Tools for Every Student</h2>
            <p className="text-green-300/70 mt-3 max-w-2xl mx-auto">
              College predictors and exam calendar — powered by real counselling data. Use them unlimited, no signup needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* College & Rank Predictor */}
      <section className="py-24 bg-gradient-to-b from-green-900 to-green-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">College & Rank Predictor</h2>
              <p className="text-green-300/70 text-sm mt-1">Enter your rank → See every college you can get into</p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { title: "JEE Advanced College Predictor", desc: "Find which IITs you qualify for based on your rank", stats: "23 IITs · 131 Programs", badge: "JoSAA 2025", href: "/college-predictor/jee", icon: Building2, iconBg: "bg-blue-500/10", iconColor: "text-blue-400" },
              { title: "JEE Advanced Rank Predictor", desc: "View opening & closing ranks for any IIT program", stats: "Category & Round-wise", badge: "2025 Data", href: "/college-predictor/jee", icon: Award, iconBg: "bg-green-500/10", iconColor: "text-green-400" },
              { title: "JEE Main College Predictor", desc: "Find which NITs, IIITs & GFTIs you qualify for", stats: "105 Institutes · 162 Programs", badge: "JoSAA 2025", href: "/college-predictor/jee-main", icon: Building2, iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400" },
              { title: "JEE Main Rank Predictor", desc: "View cutoffs for NITs, IIITs & GFTIs across rounds", stats: "All Quotas & Categories", badge: "2025 Data", href: "/college-predictor/jee-main", icon: Award, iconBg: "bg-purple-500/10", iconColor: "text-purple-400" },
              { title: "NEET UG College Predictor", desc: "Find medical colleges based on your NEET rank", stats: "1,000+ Medical Colleges", badge: "MCC 2025", href: "/college-predictor/neet", icon: Heart, iconBg: "bg-red-500/10", iconColor: "text-red-400" },
              { title: "NEET UG Rank Predictor", desc: "Check cutoffs for any medical college by state & quota", stats: "MBBS & BDS · All States", badge: "Counselling Data", href: "/college-predictor/neet", icon: TrendingUp, iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400" },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} variants={scaleIn}>
                  <Link href={p.href} className="group block bg-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 hover:border-yellow-500/40 transition-all duration-300 card-hover h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 ${p.iconBg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${p.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-green-700/40 text-green-200 border border-green-600/30">{p.badge}</span>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-yellow-300 transition-colors">{p.title}</h3>
                    <p className="text-sm text-green-300/60 mt-1">{p.desc}</p>
                    <p className="text-xs text-green-400/50 mt-3 font-medium">{p.stats}</p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-yellow-400 mt-4 group-hover:text-yellow-300 transition">
                      Try Free <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-green-500/50">71,000+ JEE cutoff entries · 1,500+ NEET cutoff entries · Official JoSAA & MCC 2025 data</p>
          </motion.div>
        </div>
      </section>

      {/* Exam Calendar */}
      <section className="py-24 bg-gradient-to-b from-green-950 to-green-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col lg:flex-row gap-10 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Exam Calendar</h2>
                  <p className="text-green-300/70 text-sm mt-1">Never miss an exam date again</p>
                </div>
              </div>

              <p className="text-green-200/70 leading-relaxed mt-4">
                Track 250+ competitive exams and 440+ events — application deadlines, admit cards, exam dates, results, counselling schedules — in one dashboard.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { icon: FileText, label: "Grid View", desc: "Cards grouped by exam" },
                  { icon: Clock, label: "Timeline", desc: "Month-by-month events" },
                  { icon: CalendarDays, label: "Calendar", desc: "Color-coded monthly view" },
                ].map((v) => {
                  const VIcon = v.icon;
                  return (
                    <div key={v.label} className="bg-green-800/20 rounded-xl p-4 border border-green-700/30 text-center">
                      <VIcon className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-white">{v.label}</p>
                      <p className="text-[10px] text-green-400/60 mt-0.5">{v.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {["JEE Main", "JEE Advanced", "NEET UG", "AP EAPCET", "TS EAMCET", "BITSAT", "CLAT", "CUET", "CAT", "NDA", "240+ more"].map((exam) => (
                  <span key={exam} className="text-[10px] px-2.5 py-1 rounded-full bg-green-800/40 text-green-300/70 border border-green-700/30">{exam}</span>
                ))}
              </div>

              <Link href="/exam-calendar" className="group inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-600/20">
                View Exam Calendar — Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex-1 max-w-md">
              <div className="bg-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-white">Upcoming Events</h4>
                  <span className="text-[10px] text-yellow-400 font-medium">Live Data</span>
                </div>
                <div className="space-y-3">
                  {[
                    { exam: "JEE Main 2026", event: "Application Open", color: "bg-blue-400" },
                    { exam: "NEET UG 2026", event: "Registration", color: "bg-red-400" },
                    { exam: "AP EAPCET", event: "Exam Dates", color: "bg-green-400" },
                    { exam: "TS EAMCET", event: "Admit Card", color: "bg-purple-400" },
                    { exam: "BITSAT 2026", event: "Slot Booking", color: "bg-yellow-400" },
                  ].map((e) => (
                    <div key={e.exam} className="flex items-center gap-3 bg-green-900/30 rounded-lg px-3 py-2.5">
                      <div className={`w-2 h-2 rounded-full ${e.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{e.exam}</p>
                        <p className="text-[10px] text-green-400/60">{e.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-green-500/40 text-center mt-4">440+ events tracked across 250+ exams</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Your Report Includes */}
      <section className="py-24 bg-gradient-to-b from-green-900 to-green-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">More Than a Score — A Complete Career Blueprint</h2>
            <p className="text-green-300/70 mt-3 max-w-xl mx-auto">Every assessment report includes 7 actionable sections to guide your child&apos;s next 5 years.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Target, title: "Score & Tier", desc: "Strong Fit, Possible Fit, or Explore Others — based on your 16-point score" },
              { icon: TrendingUp, title: "5 Career Paths", desc: "Specific roles with entry-level and senior salary ranges (₹6 LPA → ₹80 LPA)" },
              { icon: Building2, title: "Top Colleges (AP & TS)", desc: "State-specific colleges, entrance exams, and expected placement packages" },
              { icon: BookOpen, title: "Entrance Strategy", desc: "Which exams to target, preparation approach, and backup options" },
              { icon: CalendarDays, title: "30-Day Interest Test", desc: "Week-by-week activities to verify if the interest is real before committing" },
              { icon: MapPin, title: "Career Roadmap", desc: "Step-by-step plan: Class 10 → 11 → 12 → UG → Career entry" },
              { icon: Sparkles, title: "Trend Intelligence 2030", desc: "Which careers are growing globally, in India, and in AP & Telangana" },
              { icon: Shield, title: "Mistakes to Avoid", desc: "4 common pitfalls students make — and how to avoid them" },
            ].map((item, i) => {
              const RIcon = item.icon;
              return (
                <motion.div key={item.title} variants={scaleIn} className="bg-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 hover:border-green-600/50 transition-all card-hover">
                  <RIcon className="w-6 h-6 text-yellow-400 mb-3" />
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-green-300/60 mt-1 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-24 bg-gradient-to-b from-green-950 to-green-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Built for Everyone in the Student&apos;s Journey</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { icon: GraduationCap, emoji: "🎓", title: "For Students", desc: "Confused about what to do after 10th? Take a 10-minute assessment and get a personalised career report with salary data, college options, and a roadmap.", cta: "Start with a free module", color: "text-blue-400" },
              { icon: Users, emoji: "👨‍👩‍👧", title: "For Parents", desc: "Want data-backed career options for your child? See salary ranges, AP & TS colleges, entrance strategies — not neighbour's advice.", cta: "Explore all 12 modules together", color: "text-green-400" },
              { icon: BookOpen, emoji: "👩‍🏫", title: "For Teachers & Schools", desc: "Integrate career guidance into your school's program. 12 modules cover every major career path — from Engineering to Green Energy.", cta: "Contact for school pricing", color: "text-purple-400" },
              { icon: School, emoji: "🏫", title: "For Coaching Centres", desc: "Add career discovery to your coaching offering. Parents value a centre that helps students choose the right path — not just crack exams.", cta: "Contact for partnerships", color: "text-orange-400" },
            ].map((a) => {
              const AIcon = a.icon;
              return (
                <motion.div key={a.title} variants={scaleIn} className="bg-green-800/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 hover:border-green-600/50 transition-all card-hover">
                  <div className="flex items-center gap-3 mb-3">
                    <AIcon className={`w-6 h-6 ${a.color}`} />
                    <h3 className="font-semibold text-white">{a.title}</h3>
                  </div>
                  <p className="text-sm text-green-300/60 leading-relaxed">{a.desc}</p>
                  <p className="text-xs text-yellow-400/70 font-medium mt-3">{a.cta}</p>
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
                {["Explore all 12 modules", "Read career overviews", "College Predictor (JEE & NEET)", "Exam Calendar (250+ exams)", "Book counselling (₹2,500)"].map((item) => (
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-xs font-semibold text-green-200 uppercase tracking-wider mb-3">Product</h4>
              <div className="space-y-2">
                <Link href="/assessments" className="block text-xs text-green-400/60 hover:text-green-200 transition">Career Assessments</Link>
                <Link href="/college-predictor" className="block text-xs text-green-400/60 hover:text-green-200 transition">College Predictor</Link>
                <Link href="/exam-calendar" className="block text-xs text-green-400/60 hover:text-green-200 transition">Exam Calendar</Link>
                <Link href="/book-counselling" className="block text-xs text-green-400/60 hover:text-green-200 transition">Book Counselling</Link>
                <Link href="/subscribe" className="block text-xs text-green-400/60 hover:text-green-200 transition">Premium Plan</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-green-200 uppercase tracking-wider mb-3">Free Tools</h4>
              <div className="space-y-2">
                <Link href="/college-predictor/jee" className="block text-xs text-green-400/60 hover:text-green-200 transition">JEE Advanced Predictor</Link>
                <Link href="/college-predictor/jee-main" className="block text-xs text-green-400/60 hover:text-green-200 transition">JEE Main Predictor</Link>
                <Link href="/college-predictor/neet" className="block text-xs text-green-400/60 hover:text-green-200 transition">NEET Predictor</Link>
                <Link href="/exam-calendar" className="block text-xs text-green-400/60 hover:text-green-200 transition">Exam Calendar</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-green-200 uppercase tracking-wider mb-3">Company</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-xs text-green-400/60 hover:text-green-200 transition">Home</Link>
                <Link href="/contact-us" className="block text-xs text-green-400/60 hover:text-green-200 transition">Contact Us</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-green-200 uppercase tracking-wider mb-3">Legal</h4>
              <div className="space-y-2">
                <Link href="/terms" className="block text-xs text-green-400/60 hover:text-green-200 transition">Terms of Service</Link>
                <Link href="/privacy" className="block text-xs text-green-400/60 hover:text-green-200 transition">Privacy Policy</Link>
                <Link href="/refund-policy" className="block text-xs text-green-400/60 hover:text-green-200 transition">Refund Policy</Link>
                <Link href="/shipping-policy" className="block text-xs text-green-400/60 hover:text-green-200 transition">Shipping & Delivery</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo size="sm" />
          </div>
          <p className="text-xs text-green-500/40 text-center mt-6">
            © 2026 N.B.V. Subba Rao. Rebuild Learning — Career Guidance for AP & TS Students. Edition 2025–2030.
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
