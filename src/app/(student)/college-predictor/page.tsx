import Link from "next/link";
import { GraduationCap, Heart, ArrowRight, Building2, Award, TrendingUp } from "lucide-react";

const predictors = [
  {
    title: "JEE Advanced College Predictor",
    description: "Find which IITs you can get into based on your JEE Advanced rank. 23 IITs, 131 programs, Rounds 1–6 cutoff data.",
    icon: GraduationCap,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/college-predictor/jee",
    features: ["23 IITs", "131 Programs", "6 Rounds"],
    badge: "JoSAA 2025",
    badgeColor: "bg-blue-50 text-blue-700",
  },
  {
    title: "JEE Advanced Rank Predictor",
    description: "View opening & closing ranks for any IIT program. Check cutoff trends across categories, quotas, and counselling rounds.",
    icon: Award,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    href: "/college-predictor/jee",
    features: ["Category-wise Cutoffs", "Round-wise Data", "All Quotas"],
    badge: "2025 Data",
    badgeColor: "bg-green-50 text-green-700",
  },
  {
    title: "JEE Main College Predictor",
    description: "Find which NITs, IIITs & GFTIs you can get into based on your JEE Main rank. 105 institutes, 162 programs, Rounds 1–6 cutoff data.",
    icon: GraduationCap,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    href: "/college-predictor/jee-main",
    features: ["105 Institutes", "162 Programs", "6 Rounds"],
    badge: "JoSAA 2025",
    badgeColor: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "JEE Main Rank Predictor",
    description: "View opening & closing ranks for any NIT, IIIT or GFTI program. Check cutoffs across categories, quotas, and counselling rounds.",
    icon: Award,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    href: "/college-predictor/jee-main",
    features: ["Category-wise Cutoffs", "Round-wise Data", "All Quotas"],
    badge: "2025 Data",
    badgeColor: "bg-purple-50 text-purple-700",
  },
  {
    title: "NEET UG College Predictor",
    description: "Discover AIIMS, Government & Deemed medical colleges where you can get admission based on your NEET rank and category.",
    icon: Heart,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    href: "/college-predictor/neet",
    features: ["1000+ Colleges", "MBBS & BDS", "Round 1 & 2"],
    badge: "MCC 2025",
    badgeColor: "bg-red-50 text-red-700",
  },
  {
    title: "NEET UG Rank Predictor",
    description: "Check opening & closing ranks for any medical college. Filter by state, course, quota, and category for accurate predictions.",
    icon: TrendingUp,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    href: "/college-predictor/neet",
    features: ["State-wise Data", "Quota-wise", "Category-wise"],
    badge: "Counselling Data",
    badgeColor: "bg-yellow-50 text-yellow-700",
  },
];

export default function CollegePredictorPage() {
  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
          <Building2 className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-green-900">College & Rank Predictor</h1>
          <p className="text-sm text-green-600/60">Find your best-fit college based on real counselling cutoff data</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {predictors.map((p) => (
          <Link key={p.title} href={p.href} className="group bg-white rounded-2xl border border-green-200/50 p-6 shadow-sm hover:shadow-lg hover:border-green-300 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${p.iconBg} rounded-xl flex items-center justify-center`}>
                <p.icon className={`w-6 h-6 ${p.iconColor}`} />
              </div>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${p.badgeColor}`}>{p.badge}</span>
            </div>

            <h3 className="font-bold text-green-900 mb-2 group-hover:text-green-800 transition">{p.title}</h3>
            <p className="text-sm text-green-700 leading-relaxed mb-4">{p.description}</p>

            <div className="flex items-center gap-2 mb-4">
              {p.features.map((f) => (
                <span key={f} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-50/50 text-green-700 border border-green-100">
                  {f}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-sm font-medium text-red-600 group-hover:text-red-700 transition">
              Open Predictor <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
