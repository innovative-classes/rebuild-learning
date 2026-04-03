"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CalendarDays, Search, X, ChevronLeft, ChevronRight,
  FileText, Download, Grid3X3, List, CalendarRange,
} from "lucide-react";
import calendarData from "@/data/exam-calendar.json";

type CalEvent = (typeof calendarData.events)[number];

/* ── helpers ─────────────────────────────────────────────── */

const EVENT_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Exam: { bg: "bg-red-100", text: "text-red-700" },
  Application: { bg: "bg-blue-100", text: "text-blue-700" },
  "Application - Last Date": { bg: "bg-blue-100", text: "text-blue-700" },
  "Application - Correction": { bg: "bg-blue-100", text: "text-blue-700" },
  Registration: { bg: "bg-indigo-100", text: "text-indigo-700" },
  "Registration - Last Date": { bg: "bg-indigo-100", text: "text-indigo-700" },
  Result: { bg: "bg-green-100", text: "text-green-700" },
  "Admit Card": { bg: "bg-amber-100", text: "text-amber-700" },
  "Slot Booking": { bg: "bg-purple-100", text: "text-purple-700" },
  Counselling: { bg: "bg-teal-100", text: "text-teal-700" },
  "Counselling - Registration": { bg: "bg-teal-100", text: "text-teal-700" },
  "Counselling - Choice Filling": { bg: "bg-teal-100", text: "text-teal-700" },
  "Counselling - Seat Allotment": { bg: "bg-teal-100", text: "text-teal-700" },
  "Seat Allotment": { bg: "bg-teal-100", text: "text-teal-700" },
  "Correction Window": { bg: "bg-orange-100", text: "text-orange-700" },
  "Fee Payment": { bg: "bg-pink-100", text: "text-pink-700" },
  "Answer Key": { bg: "bg-cyan-100", text: "text-cyan-700" },
  "Mock Test": { bg: "bg-violet-100", text: "text-violet-700" },
  Interview: { bg: "bg-rose-100", text: "text-rose-700" },
  "Admission/Reporting": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Document Upload": { bg: "bg-slate-100", text: "text-slate-700" },
  Other: { bg: "bg-gray-100", text: "text-gray-700" },
};

function getEventColor(type: string) {
  return EVENT_TYPE_COLORS[type] || EVENT_TYPE_COLORS.Other;
}

const CALENDAR_CHIP_COLORS: Record<string, string> = {
  Exam: "bg-red-500",
  Application: "bg-blue-500",
  Registration: "bg-indigo-500",
  Result: "bg-green-500",
  "Admit Card": "bg-amber-500",
  Counselling: "bg-teal-500",
  Other: "bg-gray-400",
};

function getChipColor(type: string): string {
  if (type.includes("Counselling") || type.includes("Seat Allotment")) return CALENDAR_CHIP_COLORS.Counselling;
  if (type.includes("Application") || type.includes("Correction")) return CALENDAR_CHIP_COLORS.Application;
  if (type.includes("Registration")) return CALENDAR_CHIP_COLORS.Registration;
  return CALENDAR_CHIP_COLORS[type] || CALENDAR_CHIP_COLORS.Other;
}

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const [d, m, y] = parts;
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

function formatDateRange(startDate: string, endDate: string): string {
  const s = parseDate(startDate);
  const e = parseDate(endDate);
  if (!s) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const sd = `${s.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
  if (!e || startDate === endDate) return sd;
  const ed = `${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}-${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
  }
  return `${sd} – ${ed}`;
}

const STATUS_FILTER_MAP: Record<string, string[]> = {
  All: [],
  Upcoming: ["Exam"],
  "Applications Open": ["Application", "Application - Last Date", "Registration", "Registration - Last Date", "Application - Correction", "Correction Window"],
  "Exam Dates": ["Exam", "Slot Booking", "Admit Card", "Mock Test"],
  Results: ["Result", "Answer Key"],
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SHORT_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ── group events by exam name ────────────────────────── */

interface ExamGroup {
  name: string;
  events: CalEvent[];
  eventTypes: string[];
}

function buildExamGroups(events: CalEvent[]): ExamGroup[] {
  const map = new Map<string, CalEvent[]>();
  events.forEach((ev) => {
    const list = map.get(ev.name) || [];
    list.push(ev);
    map.set(ev.name, list);
  });
  return Array.from(map.entries()).map(([name, evts]) => ({
    name,
    events: evts.sort((a, b) => {
      const da = parseDate(a.startDate);
      const db = parseDate(b.startDate);
      if (!da || !db) return 0;
      return da.getTime() - db.getTime();
    }),
    eventTypes: [...new Set(evts.map((e) => e.eventType))],
  }));
}

/* ── group events by month ───────────────────────────── */

interface MonthGroup {
  key: string;
  label: string;
  events: CalEvent[];
}

function groupByMonth(events: CalEvent[]): MonthGroup[] {
  const sorted = [...events].sort((a, b) => {
    const da = parseDate(a.startDate);
    const db = parseDate(b.startDate);
    if (!da || !db) return 0;
    return da.getTime() - db.getTime();
  });
  const map = new Map<string, CalEvent[]>();
  sorted.forEach((ev) => {
    const d = parseDate(ev.startDate);
    if (!d) return;
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    const list = map.get(key) || [];
    list.push(ev);
    map.set(key, list);
  });
  return Array.from(map.entries()).map(([key, evts]) => {
    const [y, m] = key.split("-").map(Number);
    return { key, label: `${MONTH_NAMES[m]} ${y}`, events: evts };
  });
}

/* ══════════════════════════════════════════════════════════ */

export default function ExamCalendarPage() {
  const [search, setSearch] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("All Event Types");
  const [statusFilter, setStatusFilter] = useState("All");
  const [view, setView] = useState<"grid" | "timeline" | "calendar">("grid");
  const [selectedExam, setSelectedExam] = useState<ExamGroup | null>(null);
  const [calendarEvent, setCalendarEvent] = useState<CalEvent | null>(null);

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [timelineMonthIdx, setTimelineMonthIdx] = useState(0);
  const [showExport, setShowExport] = useState(false);

  const allEvents = calendarData.events as CalEvent[];
  const eventTypes = useMemo(() => ["All Event Types", ...Array.from(new Set(allEvents.map((e) => e.eventType))).sort()], [allEvents]);

  /* ── filter events ────────────────────────────────── */
  const filteredEvents = useMemo(() => {
    return allEvents.filter((ev) => {
      if (search && !ev.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (eventTypeFilter !== "All Event Types" && ev.eventType !== eventTypeFilter) return false;
      if (statusFilter !== "All") {
        const allowedTypes = STATUS_FILTER_MAP[statusFilter] || [];
        if (allowedTypes.length > 0 && !allowedTypes.includes(ev.eventType)) return false;
      }
      return true;
    });
  }, [allEvents, search, eventTypeFilter, statusFilter]);

  const examGroups = useMemo(() => buildExamGroups(filteredEvents), [filteredEvents]);
  const monthGroups = useMemo(() => groupByMonth(filteredEvents), [filteredEvents]);
  const currentMonthGroup = monthGroups[timelineMonthIdx] || null;

  /* ── calendar helpers ─────────────────────────────── */
  const calendarEvents = useMemo(() => {
    return filteredEvents.filter((ev) => {
      const d = parseDate(ev.startDate);
      if (!d) return false;
      return d.getFullYear() === calYear && d.getMonth() === calMonth;
    });
  }, [filteredEvents, calYear, calMonth]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const rows: (number | null)[][] = [];
    let row: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) {
      row.push(d);
      if (row.length === 7) { rows.push(row); row = []; }
    }
    if (row.length > 0) {
      while (row.length < 7) row.push(null);
      rows.push(row);
    }
    return rows;
  }, [calYear, calMonth]);

  function eventsForDay(day: number): CalEvent[] {
    return calendarEvents.filter((ev) => {
      const d = parseDate(ev.startDate);
      return d && d.getDate() === day;
    });
  }

  function navigateCalendar(dir: -1 | 1) {
    let nm = calMonth + dir;
    let ny = calYear;
    if (nm < 0) { nm = 11; ny--; }
    if (nm > 11) { nm = 0; ny++; }
    setCalMonth(nm);
    setCalYear(ny);
  }

  /* ── export CSV ───────────────────────────────────── */
  const handleExportCSV = useCallback(() => {
    const header = "Exam Name,Start Date,End Date,Event Type,Phase/Session,Details\n";
    const rows = filteredEvents.map((ev) =>
      `"${ev.name}","${ev.startDate}","${ev.endDate}","${ev.eventType}","${ev.phase || ""}","${ev.details || ""}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "exam-calendar.csv"; a.click();
    URL.revokeObjectURL(url);
    setShowExport(false);
  }, [filteredEvents]);

  return (
    <div className="max-w-6xl relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center shadow-lg shadow-green-800/20">
            <CalendarDays className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-900">Exam Calendar</h1>
            <p className="text-xs text-green-600/60">Engineering Entrance Exams India 2025-26</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-2xl font-bold text-orange-500">{examGroups.length}</span>
            <p className="text-[10px] font-semibold text-green-600/60 uppercase tracking-wider">Exams</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-orange-500">{filteredEvents.length}</span>
            <p className="text-[10px] font-semibold text-green-600/60 uppercase tracking-wider">Events</p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-green-200/50 p-4 mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/60" />
            <input type="text" placeholder="Search exams..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-800 text-green-900 placeholder:text-green-500/60" />
          </div>
          <select value={eventTypeFilter} onChange={(e) => setEventTypeFilter(e.target.value)}
            className="px-3 py-2.5 bg-white border border-green-200 rounded-lg text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-800 min-w-[160px]">
            {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <div className="flex bg-green-50/50 rounded-lg p-0.5">
            <button onClick={() => setView("grid")} className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${view === "grid" ? "bg-green-800 text-white shadow-sm" : "text-green-600/60 hover:text-green-800"}`}>
              <Grid3X3 className="w-3.5 h-3.5" /> Grid
            </button>
            <button onClick={() => { setView("timeline"); setTimelineMonthIdx(0); }} className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${view === "timeline" ? "bg-green-800 text-white shadow-sm" : "text-green-600/60 hover:text-green-800"}`}>
              <List className="w-3.5 h-3.5" /> Timeline
            </button>
            <button onClick={() => setView("calendar")} className={`px-3 py-2 rounded-md text-xs font-medium transition flex items-center gap-1.5 ${view === "calendar" ? "bg-green-800 text-white shadow-sm" : "text-green-600/60 hover:text-green-800"}`}>
              <CalendarRange className="w-3.5 h-3.5" /> Calendar
            </button>
          </div>
        </div>

        {/* Status pills */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {Object.keys(STATUS_FILTER_MAP).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                statusFilter === s ? "bg-orange-500 text-white shadow-sm" : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Count + Export */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-green-600/60">
          Showing {view === "grid" ? `${examGroups.length} exams` : `${filteredEvents.length} events`}
        </p>
        <div className="relative">
          <button onClick={() => setShowExport(!showExport)}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-green-200 rounded-lg text-xs text-green-700 hover:bg-green-50 transition">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          {showExport && (
            <div className="absolute right-0 top-full mt-1 z-40 bg-white border border-green-200 rounded-lg shadow-xl py-1 w-40">
              <button onClick={handleExportCSV} className="w-full px-3 py-2 text-xs text-left hover:bg-green-50 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" /> <span>CSV</span> <span className="text-green-500/60 ml-auto">Spreadsheet</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ═══ GRID VIEW ═══ */}
      {view === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {examGroups.map((group) => (
            <button
              key={group.name}
              onClick={() => setSelectedExam(group)}
              className="bg-white rounded-2xl border border-green-200/50 p-5 shadow-sm hover:shadow-md hover:border-green-300 transition-all text-left group"
            >
              <h3 className="font-bold text-green-900 mb-4 group-hover:text-green-700 transition text-sm">
                {group.name}
              </h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold text-green-800">{group.events.length}</p>
                  <p className="text-[10px] font-semibold text-green-500/60 uppercase tracking-wider">Events</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-800">{group.eventTypes.length}</p>
                  <p className="text-[10px] font-semibold text-green-500/60 uppercase tracking-wider">Types</p>
                </div>
              </div>
            </button>
          ))}
          {examGroups.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <Search className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <p className="text-green-600/60 text-sm">No exams match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ TIMELINE VIEW ═══ */}
      {view === "timeline" && (
        <div>
          {monthGroups.length > 0 ? (
            <>
              <div className="flex items-center justify-between bg-white rounded-xl border border-green-200/50 p-3 mb-4">
                <button onClick={() => setTimelineMonthIdx(Math.max(0, timelineMonthIdx - 1))} disabled={timelineMonthIdx <= 0}
                  className="flex items-center gap-1 text-xs text-green-700 hover:text-green-900 disabled:opacity-30 transition px-2 py-1">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="text-center">
                  <h3 className="font-bold text-green-900 text-sm">{currentMonthGroup?.label || ""}</h3>
                  <p className="text-[10px] text-green-500/60">{timelineMonthIdx + 1} of {monthGroups.length} months</p>
                </div>
                <button onClick={() => setTimelineMonthIdx(Math.min(monthGroups.length - 1, timelineMonthIdx + 1))} disabled={timelineMonthIdx >= monthGroups.length - 1}
                  className="flex items-center gap-1 text-xs text-green-700 hover:text-green-900 disabled:opacity-30 transition px-2 py-1">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {currentMonthGroup && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-green-900">{currentMonthGroup.label}</h4>
                    <span className="text-xs font-medium text-orange-500">{currentMonthGroup.events.length} events</span>
                  </div>
                  <div className="space-y-3">
                    {currentMonthGroup.events.map((ev, i) => {
                      const d = parseDate(ev.startDate);
                      const color = getEventColor(ev.eventType);
                      return (
                        <div key={i} className="flex gap-4 items-start bg-white rounded-xl border border-green-200/50 p-4 shadow-sm hover:shadow-md transition">
                          <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-xl flex flex-col items-center justify-center border border-green-200/50">
                            <span className="text-lg font-bold text-green-800 leading-none">{d?.getDate()}</span>
                            <span className="text-[10px] font-semibold text-green-500/60 uppercase">{d ? SHORT_MONTHS[d.getMonth()] : ""}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-green-900 text-sm">{ev.name}</h4>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>{ev.eventType}</span>
                              {ev.phase && <span className="text-[10px] text-green-600/60">· {ev.phase}</span>}
                              {ev.details && <span className="text-[10px] text-green-600/60">· {ev.details}</span>}
                            </div>
                            {ev.startDate !== ev.endDate && (
                              <p className="text-[10px] text-green-500/60 mt-1">{formatDateRange(ev.startDate, ev.endDate)}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-green-200/50">
              <Search className="w-8 h-8 text-green-300 mx-auto mb-3" />
              <p className="text-green-600/60 text-sm">No events match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* ═══ CALENDAR VIEW ═══ */}
      {view === "calendar" && (
        <div className="bg-white rounded-2xl border border-green-200/50 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 bg-green-50/50 border-b border-green-100">
            <button onClick={() => navigateCalendar(-1)} className="p-1.5 hover:bg-green-100 rounded-lg transition">
              <ChevronLeft className="w-5 h-5 text-green-700" />
            </button>
            <h3 className="font-bold text-green-900">{MONTH_NAMES[calMonth]} {calYear}</h3>
            <button onClick={() => navigateCalendar(1)} className="p-1.5 hover:bg-green-100 rounded-lg transition">
              <ChevronRight className="w-5 h-5 text-green-700" />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-green-100">
            {WEEKDAYS.map((wd) => (
              <div key={wd} className="text-center py-2 text-[10px] font-semibold text-green-600/60 uppercase tracking-wider">{wd}</div>
            ))}
          </div>

          {calendarDays.map((row, ri) => (
            <div key={ri} className="grid grid-cols-7 border-b border-green-50 last:border-b-0">
              {row.map((day, ci) => {
                const dayEvents = day ? eventsForDay(day) : [];
                const isToday = day === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear();
                return (
                  <div key={ci} className={`min-h-[90px] p-1.5 border-r border-green-50 last:border-r-0 ${!day ? "bg-green-50/30" : "hover:bg-green-50/30"}`}>
                    {day && (
                      <>
                        <span className={`text-xs font-medium inline-flex w-6 h-6 items-center justify-center rounded-full ${
                          isToday ? "bg-orange-500 text-white" : "text-green-800"
                        }`}>{day}</span>
                        <div className="mt-0.5 space-y-0.5">
                          {dayEvents.slice(0, 3).map((ev, ei) => (
                            <button key={ei} onClick={() => setCalendarEvent(ev)}
                              className={`w-full text-left text-[9px] text-white font-medium px-1.5 py-0.5 rounded truncate ${getChipColor(ev.eventType)} hover:opacity-80 transition`}>
                              {ev.name}
                            </button>
                          ))}
                          {dayEvents.length > 3 && (
                            <p className="text-[9px] text-green-500/60 px-1">+{dayEvents.length - 3} more</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <div className="px-5 py-3 bg-green-50/30 border-t border-green-100 flex gap-4 flex-wrap">
            {Object.entries(CALENDAR_CHIP_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="text-[10px] text-green-600/60">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ EXAM DETAIL MODAL ═══ */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setSelectedExam(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-green-100">
              <h2 className="font-bold text-green-900 text-lg">{selectedExam.name}</h2>
              <button onClick={() => setSelectedExam(null)} className="p-1 hover:bg-green-50 rounded-lg transition">
                <X className="w-5 h-5 text-green-700" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-100">
                    <th className="text-left py-2 text-xs font-semibold text-green-600/60 uppercase tracking-wider">Date</th>
                    <th className="text-left py-2 text-xs font-semibold text-green-600/60 uppercase tracking-wider">Event Type</th>
                    <th className="text-left py-2 text-xs font-semibold text-green-600/60 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-50">
                  {selectedExam.events.map((ev, i) => {
                    const color = getEventColor(ev.eventType);
                    return (
                      <tr key={i}>
                        <td className="py-2.5 text-xs text-green-800 whitespace-nowrap pr-3">{formatDateRange(ev.startDate, ev.endDate)}</td>
                        <td className="py-2.5 pr-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>{ev.eventType}</span>
                        </td>
                        <td className="py-2.5 text-xs text-green-600/60">
                          {ev.phase && ev.details ? `${ev.phase} - ${ev.details}` : ev.phase || ev.details || "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t border-green-100">
              <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-2 border border-green-200 rounded-lg text-xs text-green-700 hover:bg-green-50 transition">
                <Download className="w-3.5 h-3.5" /> Export
              </button>
              <button onClick={() => setSelectedExam(null)} className="px-4 py-2 bg-green-800 text-white rounded-lg text-xs font-medium hover:bg-green-900 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ CALENDAR EVENT POPUP ═══ */}
      {calendarEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setCalendarEvent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-green-100">
              <h2 className="font-bold text-green-900">{calendarEvent.name}</h2>
              <button onClick={() => setCalendarEvent(null)} className="p-1 hover:bg-green-50 rounded-lg transition">
                <X className="w-5 h-5 text-green-700" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-green-600/60" />
                <span className="text-sm text-green-800">{formatDateRange(calendarEvent.startDate, calendarEvent.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getEventColor(calendarEvent.eventType).bg} ${getEventColor(calendarEvent.eventType).text}`}>
                  {calendarEvent.eventType}
                </span>
              </div>
              {calendarEvent.phase && (
                <div className="text-sm text-green-700"><span className="text-green-500/60">Phase:</span> {calendarEvent.phase}</div>
              )}
              {calendarEvent.details && (
                <div className="text-sm text-green-700"><span className="text-green-500/60">Details:</span> {calendarEvent.details}</div>
              )}
            </div>
            <div className="flex justify-end p-4 border-t border-green-100">
              <button onClick={() => setCalendarEvent(null)} className="px-4 py-2 bg-green-800 text-white rounded-lg text-xs font-medium hover:bg-green-900 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
