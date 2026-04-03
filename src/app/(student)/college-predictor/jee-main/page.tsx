"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft, Search, GraduationCap, TrendingUp, ChevronLeft, ChevronRight,
  Loader2, Filter, Building2, Award, X,
} from "lucide-react";
import SearchableMultiSelect from "@/components/ui/searchable-multi-select";

interface Meta {
  institutes: string[];
  programs: string[];
  quotas: string[];
  seatTypes: string[];
  genders: string[];
  rounds: number[];
}

interface JeeRow {
  institute: string;
  program: string;
  quota: string;
  seatType: string;
  gender: string;
  openingRank: number;
  closingRank: number;
  round: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const quotaLabels: Record<string, string> = {
  AI: "All India", OS: "Other State", HS: "Home State",
  GO: "Goa", JK: "Jammu & Kashmir", LA: "Ladakh",
};

const seatTypeColors: Record<string, string> = {
  OPEN: "bg-green-50 text-green-700",
  "OBC-NCL": "bg-blue-50 text-blue-700",
  SC: "bg-purple-50 text-purple-700",
  ST: "bg-orange-50 text-orange-700",
  EWS: "bg-yellow-50 text-yellow-700",
  "OPEN (PwD)": "bg-green-50 text-green-600",
  "OBC-NCL (PwD)": "bg-blue-50 text-blue-600",
  "SC (PwD)": "bg-purple-50 text-purple-600",
  "ST (PwD)": "bg-orange-50 text-orange-600",
  "EWS (PwD)": "bg-yellow-50 text-yellow-600",
};

export default function JeeMainPredictorPage() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [data, setData] = useState<JeeRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 25, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"college" | "rank">("college");

  const [rank, setRank] = useState("");
  const [institutes, setInstitutes] = useState<string[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [quota, setQuota] = useState("");
  const [seatType, setSeatType] = useState("");
  const [gender, setGender] = useState("Gender-Neutral");
  const [round, setRound] = useState("6");
  const [searched, setSearched] = useState(false);

  const [colInstitute, setColInstitute] = useState("");
  const [colProgram, setColProgram] = useState("");
  const [colCategory, setColCategory] = useState("");
  const [colQuota, setColQuota] = useState("");

  useEffect(() => {
    fetch("/api/jee-main-predictor?metaOnly=true")
      .then((res) => res.json())
      .then((json) => setMeta(json.meta));
  }, []);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ mode, page: String(page), pageSize: "25" });
    if (rank) params.set("rank", rank);
    if (institutes.length > 0) params.set("institute", institutes.join("||"));
    if (programs.length > 0) params.set("program", programs.join("||"));
    if (quota) params.set("quota", quota);
    if (seatType) params.set("seatType", seatType);
    if (gender) params.set("gender", gender);
    if (round) params.set("round", round);

    const res = await fetch(`/api/jee-main-predictor?${params}`);
    const json = await res.json();
    setData(json.data);
    setPagination(json.pagination);
    setLoading(false);
    setSearched(true);
    setColInstitute(""); setColProgram(""); setColCategory(""); setColQuota("");
  }, [mode, rank, institutes, programs, quota, seatType, gender, round]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    fetchData(1);
  }

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      if (colInstitute && !row.institute.toLowerCase().includes(colInstitute.toLowerCase())) return false;
      if (colProgram && !row.program.toLowerCase().includes(colProgram.toLowerCase())) return false;
      if (colCategory && row.seatType !== colCategory) return false;
      if (colQuota && row.quota !== colQuota) return false;
      return true;
    });
  }, [data, colInstitute, colProgram, colCategory, colQuota]);

  const inlineCategories = useMemo(() => [...new Set(data.map((r) => r.seatType))].sort(), [data]);
  const inlineQuotas = useMemo(() => [...new Set(data.map((r) => r.quota))].sort(), [data]);
  const hasInlineFilters = colInstitute || colProgram || colCategory || colQuota;

  if (!meta) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-4">
        <Link href="/college-predictor" className="text-sm text-green-600/60 hover:text-green-900 transition">
          <span className="flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back to Predictors</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-green-900">JEE Main 2025 Predictor</h1>
          <p className="text-sm text-green-600/60">{meta.institutes.length} NITs, IIITs & GFTIs · {meta.programs.length} programs · Rounds 1–6</p>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-1 my-6 bg-green-50/50 rounded-lg p-1 w-fit">
        <button onClick={() => { setMode("college"); setSearched(false); setInstitutes([]); }} className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${mode === "college" ? "bg-white text-green-900 shadow-sm" : "text-green-600/60 hover:text-green-800"}`}>
          <Building2 className="w-4 h-4" /> College Predictor
        </button>
        <button onClick={() => { setMode("rank"); setSearched(false); setInstitutes([]); }} className={`px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2 ${mode === "rank" ? "bg-white text-green-900 shadow-sm" : "text-green-600/60 hover:text-green-800"}`}>
          <Award className="w-4 h-4" /> Rank Predictor
        </button>
      </div>

      {/* Filters */}
      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-green-200/50 p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mode === "college" && (
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-green-800 mb-1">Your JEE Main Rank (CRL)</label>
              <input type="number" value={rank} onChange={(e) => setRank(e.target.value)} placeholder="Enter your CRL rank (e.g. 15000)"
                className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 text-green-900 placeholder:text-green-500/60" />
            </div>
          )}
          {mode === "rank" && (
            <div className="sm:col-span-2 lg:col-span-3">
              <SearchableMultiSelect
                options={meta.institutes}
                selected={institutes}
                onChange={setInstitutes}
                placeholder="Search and select NITs, IIITs, GFTIs..."
                label="Select Institutes"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-green-800 mb-1">Quota</label>
            <select value={quota} onChange={(e) => setQuota(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-800">
              <option value="">All Quotas</option>
              {meta.quotas.map((q) => <option key={q} value={q}>{quotaLabels[q] || q}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-green-800 mb-1">Category</label>
            <select value={seatType} onChange={(e) => setSeatType(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-800">
              <option value="">All Categories</option>
              {meta.seatTypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-green-800 mb-1">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-800">
              {meta.genders.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-green-800 mb-1">Round</label>
            <select value={round} onChange={(e) => setRound(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-800">
              <option value="">All Rounds</option>
              {meta.rounds.map((r) => <option key={r} value={String(r)}>Round {r}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <SearchableMultiSelect
              options={meta.programs}
              selected={programs}
              onChange={setPrograms}
              placeholder="Search and select programs..."
              label="Programs (optional)"
            />
          </div>
        </div>
        <button type="submit" disabled={loading || (mode === "college" && !rank) || (mode === "rank" && institutes.length === 0)}
          className="mt-4 flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 disabled:opacity-40 transition shadow-lg shadow-red-500/25">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {mode === "college" ? "Find Colleges" : "Show Cutoffs"}
        </button>
      </form>

      {/* Results */}
      {searched && (
        <>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-green-600/60">
              {pagination.total} results from API{hasInlineFilters ? ` · ${filteredData.length} shown after column filters` : ""} · Page {pagination.page} of {pagination.totalPages}
            </p>
            {hasInlineFilters && (
              <button onClick={() => { setColInstitute(""); setColProgram(""); setColCategory(""); setColQuota(""); }}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 transition">
                <X className="w-3 h-3" /> Clear column filters
              </button>
            )}
          </div>

          {data.length > 0 ? (
            <div className="bg-white rounded-2xl border border-green-200/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-50/50 border-b border-green-100/50">
                      <th className="text-left py-3 px-4 font-semibold text-green-700 text-xs">Institute</th>
                      <th className="text-left py-3 px-4 font-semibold text-green-700 text-xs">Program</th>
                      <th className="text-left py-3 px-3 font-semibold text-green-700 text-xs">Category</th>
                      <th className="text-left py-3 px-3 font-semibold text-green-700 text-xs">Quota</th>
                      <th className="text-right py-3 px-3 font-semibold text-green-700 text-xs">Opening</th>
                      <th className="text-right py-3 px-3 font-semibold text-green-700 text-xs">Closing</th>
                      <th className="text-center py-3 px-3 font-semibold text-green-700 text-xs">Rd</th>
                    </tr>
                    <tr className="bg-green-50/30 border-b border-green-100/50">
                      <th className="px-4 py-1.5">
                        <input type="text" value={colInstitute} onChange={(e) => setColInstitute(e.target.value)} placeholder="Filter..."
                          className="w-full px-2 py-1 text-[11px] border border-green-200 rounded bg-white text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-800" />
                      </th>
                      <th className="px-4 py-1.5">
                        <input type="text" value={colProgram} onChange={(e) => setColProgram(e.target.value)} placeholder="Filter..."
                          className="w-full px-2 py-1 text-[11px] border border-green-200 rounded bg-white text-green-900 placeholder:text-green-400 focus:outline-none focus:ring-1 focus:ring-green-800" />
                      </th>
                      <th className="px-3 py-1.5">
                        <select value={colCategory} onChange={(e) => setColCategory(e.target.value)}
                          className="w-full px-1 py-1 text-[11px] border border-green-200 rounded bg-white text-green-900 focus:outline-none focus:ring-1 focus:ring-green-800">
                          <option value="">All</option>
                          {inlineCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </th>
                      <th className="px-3 py-1.5">
                        <select value={colQuota} onChange={(e) => setColQuota(e.target.value)}
                          className="w-full px-1 py-1 text-[11px] border border-green-200 rounded bg-white text-green-900 focus:outline-none focus:ring-1 focus:ring-green-800">
                          <option value="">All</option>
                          {inlineQuotas.map((q) => <option key={q} value={q}>{quotaLabels[q] || q}</option>)}
                        </select>
                      </th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-100/50">
                    {filteredData.map((row, i) => (
                      <tr key={i} className="hover:bg-green-50/50 transition">
                        <td className="py-2.5 px-4 text-xs text-green-900 font-medium max-w-[200px] truncate">{row.institute}</td>
                        <td className="py-2.5 px-4 text-xs text-green-800 max-w-[220px] truncate">{row.program}</td>
                        <td className="py-2.5 px-3">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${seatTypeColors[row.seatType] || "bg-green-50 text-green-700"}`}>
                            {row.seatType}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-xs text-green-700">{quotaLabels[row.quota] || row.quota}</td>
                        <td className="py-2.5 px-3 text-xs text-green-900 font-mono text-right">{row.openingRank.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-xs text-green-900 font-mono text-right font-semibold">{row.closingRank.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-xs text-center text-green-700">{row.round}</td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-xs text-green-500/60">No rows match column filters</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-green-100/50 bg-green-50/30">
                  <button onClick={() => fetchData(pagination.page - 1)} disabled={pagination.page <= 1}
                    className="flex items-center gap-1 text-xs text-green-700 hover:text-green-900 disabled:opacity-30 transition">
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const start = Math.max(1, pagination.page - 2);
                      const p = start + i;
                      if (p > pagination.totalPages) return null;
                      return (
                        <button key={p} onClick={() => fetchData(p)}
                          className={`w-8 h-8 rounded-md text-xs font-medium transition ${p === pagination.page ? "bg-green-800 text-white" : "text-green-700 hover:bg-green-100/50"}`}>
                          {p}
                        </button>
                      );
                    })}
                    {pagination.totalPages > 5 && pagination.page < pagination.totalPages - 2 && (
                      <>
                        <span className="text-green-500/60 text-xs">…</span>
                        <button onClick={() => fetchData(pagination.totalPages)}
                          className="w-8 h-8 rounded-md text-xs font-medium text-green-700 hover:bg-green-100/50 transition">
                          {pagination.totalPages}
                        </button>
                      </>
                    )}
                  </div>
                  <button onClick={() => fetchData(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages}
                    className="flex items-center gap-1 text-xs text-green-700 hover:text-green-900 disabled:opacity-30 transition">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-green-200/50">
              <Filter className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <p className="text-green-600/60 text-sm">No results found. Try adjusting your filters.</p>
            </div>
          )}
        </>
      )}

      {!searched && (
        <div className="text-center py-16 bg-white rounded-2xl border border-green-200/50">
          <TrendingUp className="w-10 h-10 text-green-300 mx-auto mb-3" />
          <h3 className="font-semibold text-green-900 mb-1">{mode === "college" ? "Enter your rank to find colleges" : "Select institutes to view cutoffs"}</h3>
          <p className="text-sm text-green-600/60 max-w-md mx-auto">
            {mode === "college"
              ? "We'll show you all NITs, IIITs & GFTIs where you can get admission based on JoSAA 2025 cutoff data."
              : "View opening and closing ranks for all programs across different categories and rounds."}
          </p>
        </div>
      )}
    </div>
  );
}
