import { BookOpen } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-neutral-400" />
      </div>
      <h1 className="text-xl font-bold text-neutral-900 mb-2">Courses</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Curated courses for competitive exam preparation and skill development are coming soon.
        Stay tuned for our expertly designed learning pathways.
      </p>
      <span className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-500 rounded-full text-sm font-medium">
        Coming Soon
      </span>
    </div>
  );
}
