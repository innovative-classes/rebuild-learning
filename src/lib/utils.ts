import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getInterpretation(score: number): {
  level: string;
  color: string;
  bgColor: string;
  message: string;
} {
  if (score >= 14) {
    return {
      level: "HIGH",
      color: "text-emerald-700",
      bgColor: "bg-emerald-50 border-emerald-200",
      message: "Strong Fit — Your interests align strongly with this career path. Proceed with confidence.",
    };
  } else if (score >= 9) {
    return {
      level: "MEDIUM",
      color: "text-amber-700",
      bgColor: "bg-amber-50 border-amber-200",
      message: "Possible Fit — You have potential but need to verify depth of interest. Complete the 30-Day Test first.",
    };
  } else {
    return {
      level: "LOW",
      color: "text-red-700",
      bgColor: "bg-red-50 border-red-200",
      message: "Explore Others — This career may not be your primary calling. Explore other modules for a better match.",
    };
  }
}

export function getModuleAccentColor(moduleNumber: number): string {
  const colors: Record<number, string> = {
    1: "#2563eb",  // Engineering - Blue
    2: "#dc2626",  // Medicine - Red
    3: "#7c3aed",  // Pure Sciences - Purple
    4: "#059669",  // Finance - Emerald
    5: "#d97706",  // CA/CS - Amber
    6: "#ea580c",  // Business - Orange
    7: "#4f46e5",  // Law - Indigo
    8: "#0d9488",  // Civil Services - Teal
    9: "#c026d3",  // Psychology - Fuchsia
    10: "#e11d48", // Design - Rose
    11: "#0891b2", // Media - Cyan
    12: "#16a34a", // Green Energy - Green
  };
  return colors[moduleNumber] || "#000000";
}
