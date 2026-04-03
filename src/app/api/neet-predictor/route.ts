import { NextRequest, NextResponse } from "next/server";
import neetData from "@/data/neet-cutoff-2025.json";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const institute = searchParams.get("institute") || "";
  const state = searchParams.get("state") || "";
  const course = searchParams.get("course") || "";
  const quota = searchParams.get("quota") || "";
  const category = searchParams.get("category") || "";
  const round = searchParams.get("round") || "";
  const rank = searchParams.get("rank") || "";
  const mode = searchParams.get("mode") || "college"; // "college" or "rank"
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "25");
  const metaOnly = searchParams.get("metaOnly") === "true";

  if (metaOnly) {
    return NextResponse.json({ meta: neetData.meta });
  }

  let filtered = neetData.data as Array<{
    institute: string;
    state?: string;
    course: string;
    quota: string;
    category: string;
    round: number;
    openingRank: number;
    closingRank: number;
    totalSeats: number;
  }>;

  if (institute) {
    const list = institute.split("||");
    filtered = filtered.filter((r) => list.includes(r.institute));
  }
  if (state) filtered = filtered.filter((r) => r.state === state);
  if (course) filtered = filtered.filter((r) => r.course === course);
  if (quota) filtered = filtered.filter((r) => r.quota === quota);
  if (category) filtered = filtered.filter((r) => r.category === category);
  if (round) filtered = filtered.filter((r) => r.round === parseInt(round));

  if (mode === "college" && rank) {
    const rankNum = parseInt(rank);
    filtered = filtered.filter((r) => r.closingRank >= rankNum);
    filtered.sort((a, b) => a.closingRank - b.closingRank);
  }

  if (mode === "rank") {
    filtered.sort((a, b) => a.openingRank - b.openingRank);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return NextResponse.json({
    data: paginated,
    pagination: { page, pageSize, total, totalPages },
  });
}
