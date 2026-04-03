import { CalendarDays } from "lucide-react";

export default function AdminExamCalendarPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-green-900">Exam Calendar</h1>
          <p className="text-sm text-green-600/60">Manage exam dates shown to students</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-green-200/50 p-8 text-center shadow-sm">
        <CalendarDays className="w-10 h-10 text-green-300 mx-auto mb-3" />
        <h3 className="font-semibold text-green-900 mb-1">Exam Calendar Management</h3>
        <p className="text-sm text-green-600/60 max-w-md mx-auto">
          CRUD interface for managing exam dates will be available here. Currently, exam data is configured in the source code.
        </p>
        <span className="inline-flex items-center px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium mt-4">
          Coming Soon
        </span>
      </div>
    </div>
  );
}
