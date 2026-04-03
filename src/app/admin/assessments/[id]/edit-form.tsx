"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
  optionAText: string;
  optionBText: string;
  optionCText: string;
  optionAScore: number;
  optionBScore: number;
  optionCScore: number;
}

interface Report {
  id: string;
  tierLevel: string;
  title: string;
  description: string;
  careerPaths: string;
  topColleges: string;
  thirtyDayTest: string;
  entranceExamStrategy: string;
  nextSteps: string;
  mistakesToAvoid: string;
  trendIntelligence: string;
}

interface Assessment {
  id: string;
  moduleNumber: number;
  title: string;
  slug: string;
  description: string;
  overview: string;
  stream: string;
  keyExams: string;
  degree: string;
  salaryRange: string;
  demandRating: number;
  price: number;
  isActive: boolean;
  questions: Question[];
  reports: Report[];
}

export default function AssessmentEditForm({ assessment }: { assessment: Assessment }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"details" | "questions" | "reports">("details");

  const [details, setDetails] = useState({
    title: assessment.title,
    description: assessment.description,
    overview: assessment.overview,
    stream: assessment.stream,
    keyExams: assessment.keyExams,
    degree: assessment.degree,
    salaryRange: assessment.salaryRange,
    demandRating: assessment.demandRating,
    price: assessment.price,
    isActive: assessment.isActive,
  });

  const [questions, setQuestions] = useState<Question[]>(assessment.questions);
  const [reports, setReports] = useState<Report[]>(assessment.reports);

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/assessments/${assessment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details, questions, reports }),
    });

    if (res.ok) {
      setMessage("Saved successfully!");
    } else {
      const data = await res.json();
      setMessage(data.error || "Failed to save");
    }
    setSaving(false);
    setTimeout(() => setMessage(""), 3000);
  }

  function updateQuestion(index: number, field: keyof Question, value: string | number) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)));
  }

  function updateReport(index: number, field: keyof Report, value: string) {
    setReports((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  const tabs = [
    { key: "details" as const, label: "Details" },
    { key: "questions" as const, label: `Questions (${questions.length})` },
    { key: "reports" as const, label: `Reports (${reports.length})` },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/assessments" className="p-1.5 hover:bg-green-100/50 rounded-lg transition">
            <ArrowLeft className="w-4 h-4 text-green-700" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-green-900">
              Module {String(assessment.moduleNumber).padStart(2, "0")}: {assessment.title}
            </h1>
            <p className="text-xs text-green-600/60">{assessment.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message.includes("success") ? "text-emerald-600" : "text-red-500"}`}>
              {message}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-green-100/50 rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-white text-green-900 shadow-sm"
                : "text-green-600/60 hover:text-green-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="bg-white rounded-xl border border-green-200/50 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Title</label>
              <input type="text" value={details.title} onChange={(e) => setDetails({ ...details, title: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Stream</label>
              <input type="text" value={details.stream} onChange={(e) => setDetails({ ...details, stream: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Description</label>
            <textarea rows={2} value={details.description} onChange={(e) => setDetails({ ...details, description: e.target.value })}
              className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Overview</label>
            <textarea rows={3} value={details.overview} onChange={(e) => setDetails({ ...details, overview: e.target.value })}
              className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Key Exams</label>
              <input type="text" value={details.keyExams} onChange={(e) => setDetails({ ...details, keyExams: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Degree</label>
              <input type="text" value={details.degree} onChange={(e) => setDetails({ ...details, degree: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Salary Range</label>
              <input type="text" value={details.salaryRange} onChange={(e) => setDetails({ ...details, salaryRange: e.target.value })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Price (₹)</label>
              <input type="number" value={details.price} onChange={(e) => setDetails({ ...details, price: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Demand Rating (1-5)</label>
              <input type="number" min={1} max={5} value={details.demandRating} onChange={(e) => setDetails({ ...details, demandRating: parseInt(e.target.value) || 5 })}
                className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={details.isActive} onChange={(e) => setDetails({ ...details, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-green-200 text-green-900 focus:ring-green-800" />
                <span className="text-sm font-medium text-green-700">Active</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Questions Tab */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white rounded-xl border border-green-200/50 p-5">
              <p className="text-xs font-medium text-green-500/60 mb-3">Question {q.questionNumber}</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Question Text</label>
                  <textarea rows={2} value={q.questionText} onChange={(e) => updateQuestion(i, "questionText", e.target.value)}
                    className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 resize-none" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(["A", "B", "C"] as const).map((opt) => (
                    <div key={opt}>
                      <label className="block text-xs font-medium text-green-600/60 mb-1">
                        Option {opt} (Score: {q[`option${opt}Score` as keyof Question] as number})
                      </label>
                      <input type="text"
                        value={q[`option${opt}Text` as keyof Question] as string}
                        onChange={(e) => updateQuestion(i, `option${opt}Text` as keyof Question, e.target.value)}
                        className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {questions.length === 0 && (
            <p className="text-sm text-green-600/60 text-center py-8">No questions yet. Questions are created via the seed script.</p>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === "reports" && (
        <div className="space-y-6">
          {reports.map((r, i) => (
            <div key={r.id} className="bg-white rounded-xl border border-green-200/50 p-5">
              <p className="text-xs font-bold text-green-500/60 mb-4 uppercase tracking-wider">
                Tier: {r.tierLevel}
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Title</label>
                  <input type="text" value={r.title} onChange={(e) => updateReport(i, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">Description</label>
                  <textarea rows={2} value={r.description} onChange={(e) => updateReport(i, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 resize-none" />
                </div>
                {(["careerPaths", "topColleges", "entranceExamStrategy", "thirtyDayTest", "nextSteps", "mistakesToAvoid", "trendIntelligence"] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-green-700 mb-1 capitalize">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <textarea rows={3} value={r[field]} onChange={(e) => updateReport(i, field, e.target.value)}
                      className="w-full px-3 py-2 border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 resize-none font-mono text-xs" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <p className="text-sm text-green-600/60 text-center py-8">No reports yet. Reports are created via the seed script.</p>
          )}
        </div>
      )}
    </div>
  );
}
