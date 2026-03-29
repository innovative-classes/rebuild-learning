import { CalendarDays } from "lucide-react";

const examCalendar = [
  { month: "January", exams: [{ name: "JEE Main (Session 1)", dates: "Jan 22–31", category: "Engineering" }, { name: "CLAT", dates: "2nd week Jan", category: "Law" }] },
  { month: "February", exams: [{ name: "VITEEE", dates: "Feb 1 onwards", category: "Engineering" }, { name: "BITSAT", dates: "Late Feb – Mar", category: "Engineering" }] },
  { month: "March", exams: [{ name: "CUET UG (Registrations)", dates: "March", category: "General" }, { name: "NDA (I)", dates: "April (Apply by Mar)", category: "Defence" }] },
  { month: "April", exams: [{ name: "JEE Main (Session 2)", dates: "Apr 1–15", category: "Engineering" }, { name: "JEE Advanced", dates: "Late Apr / May", category: "Engineering" }] },
  { month: "May", exams: [{ name: "NEET UG", dates: "1st Sunday of May", category: "Medicine" }, { name: "TS EAMCET", dates: "May", category: "Engineering / Medicine" }, { name: "AP EAMCET", dates: "May", category: "Engineering / Medicine" }] },
  { month: "June", exams: [{ name: "CLAT (PG)", dates: "June", category: "Law" }, { name: "NIFT", dates: "Jan (Result: June)", category: "Design" }] },
  { month: "July", exams: [{ name: "CUET UG (Exam)", dates: "May–July", category: "General" }, { name: "ICAR AIEEA", dates: "July", category: "Agriculture" }] },
  { month: "August", exams: [{ name: "CAT (Registrations)", dates: "August", category: "Management" }, { name: "NDA (II)", dates: "Sep (Apply by Aug)", category: "Defence" }] },
  { month: "September", exams: [{ name: "UPSC CSE (Mains)", dates: "September", category: "Govt Services" }, { name: "CDS (II)", dates: "September", category: "Defence" }] },
  { month: "October", exams: [{ name: "SSC CGL (Tier I)", dates: "Oct–Nov", category: "Govt Services" }] },
  { month: "November", exams: [{ name: "CAT", dates: "Last Sunday of Nov", category: "Management" }, { name: "CTET", dates: "November", category: "Education" }] },
  { month: "December", exams: [{ name: "NID DAT", dates: "December", category: "Design" }, { name: "UCEED", dates: "December", category: "Design" }] },
];

const categoryColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700",
  Medicine: "bg-red-100 text-red-700",
  Law: "bg-violet-100 text-violet-700",
  Management: "bg-emerald-100 text-emerald-700",
  Design: "bg-pink-100 text-pink-700",
  "Govt Services": "bg-amber-100 text-amber-700",
  Defence: "bg-slate-100 text-slate-700",
  General: "bg-neutral-100 text-neutral-700",
  Education: "bg-indigo-100 text-indigo-700",
  Agriculture: "bg-lime-100 text-lime-700",
  "Engineering / Medicine": "bg-purple-100 text-purple-700",
};

export default function ExamCalendarPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Exam Calendar 2025</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Key competitive exam dates across all career streams. Plan your preparation timeline.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examCalendar.map((month) => (
          <div key={month.month} className="bg-white rounded-2xl border border-neutral-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-4 h-4 text-neutral-400" />
              <h3 className="font-bold text-neutral-900">{month.month}</h3>
            </div>
            <div className="space-y-2.5">
              {month.exams.map((exam, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-neutral-900">{exam.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-neutral-500">{exam.dates}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${categoryColors[exam.category] || "bg-neutral-100 text-neutral-600"}`}>
                      {exam.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
