import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

interface JeeData {
  meta: {
    institutes: string[];
    programs: string[];
    quotas: string[];
    seatTypes: string[];
    genders: string[];
    rounds: number[];
  };
  data: JeeRow[];
}

let cachedData: JeeData | null = null;

function loadData(): JeeData {
  if (cachedData) return cachedData;
  const filePath = path.join(process.cwd(), "public", "data", "jee-main-cutoff-2025.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  cachedData = JSON.parse(raw);
  return cachedData!;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const mode = searchParams.get("mode") || "college";
  const institute = searchParams.get("institute") || "";
  const program = searchParams.get("program") || "";
  const quota = searchParams.get("quota") || "";
  const seatType = searchParams.get("seatType") || "";
  const gender = searchParams.get("gender") || "";
  const round = searchParams.get("round") || "";
  const rank = searchParams.get("rank") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "25");
  const metaOnly = searchParams.get("metaOnly") === "true";

  const jeeData = loadData();

  if (metaOnly) {
    return NextResponse.json({ meta: jeeData.meta });
  }

  let filtered = jeeData.data;

  if (institute) {
    const list = institute.split("||");
    filtered = filtered.filter((r) => list.includes(r.institute));
  }
  if (program) {
    const list = program.split("||");
    filtered = filtered.filter((r) => list.includes(r.program));
  }
  if (quota) filtered = filtered.filter((r) => r.quota === quota);
  if (seatType) filtered = filtered.filter((r) => r.seatType === seatType);
  if (gender) filtered = filtered.filter((r) => r.gender === gender);
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
