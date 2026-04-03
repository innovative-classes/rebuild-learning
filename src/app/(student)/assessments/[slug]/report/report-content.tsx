"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Download,
  Briefcase,
  GraduationCap,
  Calendar,
  Map,
  AlertTriangle,
  TrendingUp,
  ArrowLeft,
  Target,
} from "lucide-react";

interface ReportContentProps {
  slug: string;
  assessment: {
    moduleNumber: number;
    title: string;
    accentColor: string;
  };
  score: number;
  interp: {
    level: string;
    color: string;
    bgColor: string;
    message: string;
  };
  reportDescription: string;
  thirtyDayTest: string | null;
  careerPaths: { role: string; entrySalary: string; seniorSalary: string; qualification: string }[];
  topColleges: { name: string; location: string; entrance: string; package: string }[];
  entranceExamStrategy: { exam: string; details: string }[];
  nextSteps: { phase: string; actions: string }[];
  mistakesToAvoid: { title: string; description: string }[];
  trendIntelligence: { code: string; title: string; description: string }[];
  studentName: string;
}

export default function ReportContent({
  slug,
  assessment,
  score,
  interp,
  reportDescription,
  thirtyDayTest,
  careerPaths,
  topColleges,
  entranceExamStrategy,
  nextSteps,
  mistakesToAvoid,
  trendIntelligence,
  studentName,
}: ReportContentProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  function handleDownloadPDF() {
    window.print();
  }

  const accent = assessment.accentColor;
  const scoreColor =
    interp.level === "HIGH"
      ? "#059669"
      : interp.level === "MEDIUM"
      ? "#d97706"
      : "#dc2626";

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #report-printable, #report-printable * { visibility: visible; }
          #report-printable { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {/* Nav bar */}
        <div className="flex items-center justify-between mb-4 no-print">
          <Link
            href={`/assessments/${slug}`}
            className="flex items-center gap-1 text-sm text-green-600/60 hover:text-green-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div id="report-printable" ref={reportRef}>
          {/* ─── Report Header with Score Gauge ─── */}
          <div
            className="rounded-2xl p-6 sm:p-8 mb-6 text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-white -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Score gauge */}
                <div className="relative w-32 h-32 shrink-0 mx-auto sm:mx-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(score / 16) * 327} 327`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{score}</span>
                    <span className="text-xs opacity-80">out of 16</span>
                  </div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="text-xs font-mono opacity-80">
                    Full Career Report — Module {String(assessment.moduleNumber).padStart(2, "0")}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold mt-1">{assessment.title}</h1>
                  <p className="text-sm opacity-90 mt-1">Prepared for {studentName}</p>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
                    {interp.level} — {interp.level === "HIGH" ? "Strong" : interp.level === "MEDIUM" ? "Possible" : "Explore Others"} Fit
                  </div>
                </div>
              </div>
              <p className="text-sm opacity-90 mt-4 leading-relaxed">{reportDescription}</p>
            </div>
          </div>

          {/* ─── Career Paths ─── */}
          {careerPaths.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-blue-900">Career Paths & Salaries</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-3 pr-4 font-semibold text-blue-800">Career Role</th>
                      <th className="text-left py-3 pr-4 font-semibold text-blue-800">Entry Salary</th>
                      <th className="text-left py-3 pr-4 font-semibold text-blue-800">Senior Salary</th>
                      <th className="text-left py-3 font-semibold text-blue-800">Qualification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {careerPaths.map((cp, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white/50" : ""}>
                        <td className="py-3 pr-4 font-medium text-blue-900">{cp.role}</td>
                        <td className="py-3 pr-4 text-blue-700">{cp.entrySalary}</td>
                        <td className="py-3 pr-4 text-blue-700">{cp.seniorSalary}</td>
                        <td className="py-3 text-blue-700">{cp.qualification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Top Colleges ─── */}
          {topColleges.length > 0 && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-emerald-900">Top Colleges — AP & Telangana</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-emerald-200">
                      <th className="text-left py-3 pr-4 font-semibold text-emerald-800">College</th>
                      <th className="text-left py-3 pr-4 font-semibold text-emerald-800">Location</th>
                      <th className="text-left py-3 pr-4 font-semibold text-emerald-800">Entrance</th>
                      <th className="text-left py-3 font-semibold text-emerald-800">Avg Package</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {topColleges.map((c, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white/50" : ""}>
                        <td className="py-3 pr-4 font-medium text-emerald-900">{c.name}</td>
                        <td className="py-3 pr-4 text-emerald-700">{c.location}</td>
                        <td className="py-3 pr-4 text-emerald-700">{c.entrance}</td>
                        <td className="py-3 text-emerald-700">{c.package}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ─── Entrance Exam Strategy ─── */}
          {entranceExamStrategy.length > 0 && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-orange-900">Entrance Exam Strategy</h2>
              </div>
              <div className="space-y-4">
                {entranceExamStrategy.map((e, i) => (
                  <div key={i} className="bg-white/60 rounded-xl p-4 border border-orange-100">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-orange-900 text-sm">{e.exam}</p>
                        <p className="text-sm text-orange-700 mt-1 leading-relaxed">{e.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── 30-Day Interest Test ─── */}
          {thirtyDayTest && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-100 p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-amber-900">30-Day Interest Test</h2>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-line">{thirtyDayTest}</p>
            </div>
          )}

          {/* ─── Year-by-Year Roadmap ─── */}
          {nextSteps.length > 0 && (
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 p-6 sm:p-8 mb-6 print-break">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <Map className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="text-lg font-bold text-violet-900">Year-by-Year Roadmap</h2>
              </div>
              <div className="space-y-4">
                {nextSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="shrink-0">
                      <span className="inline-block text-xs font-bold text-white px-3 py-1 rounded-full bg-violet-500">
                        {step.phase}
                      </span>
                    </div>
                    <p className="text-sm text-violet-800 leading-relaxed">{step.actions}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Mistakes to Avoid ─── */}
          {mistakesToAvoid.length > 0 && (
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100 p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-red-900">Critical Mistakes to Avoid</h2>
              </div>
              <div className="space-y-4">
                {mistakesToAvoid.map((m, i) => (
                  <div key={i} className="bg-white/60 rounded-xl p-4 border border-red-100">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-red-900 text-sm">{m.title}</p>
                        <p className="text-sm text-red-700 mt-1">{m.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Trend Intelligence ─── */}
          {trendIntelligence.length > 0 && (
            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-2xl border border-cyan-100 p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cyan-600" />
                </div>
                <h2 className="text-lg font-bold text-cyan-900">2025–2030 Trend Intelligence</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {trendIntelligence.map((t, i) => (
                  <div key={i} className="bg-white/60 rounded-xl p-4 border border-cyan-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-600 text-white">
                        {t.code}
                      </span>
                      <span className="text-sm font-semibold text-cyan-900">{t.title}</span>
                    </div>
                    <p className="text-sm text-cyan-700 leading-relaxed">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Book Counselling CTA ─── */}
          <div
            className="rounded-2xl p-6 sm:p-8 text-white text-center no-print"
            style={{
              background: `linear-gradient(135deg, ${accent}, #1e293b)`,
            }}
          >
            <Calendar className="w-8 h-8 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-semibold mb-2">Need Personalised Guidance?</h3>
            <p className="text-sm opacity-80 mb-4 max-w-md mx-auto">
              Book a 30-minute counselling session with N.B.V. Subba Rao for tailored career advice (₹2,500).
            </p>
            <Link
              href="/book-counselling"
              className="inline-flex items-center gap-2 bg-white text-green-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-100/50 transition"
            >
              Book Free Session
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
