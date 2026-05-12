import { NextRequest, NextResponse } from "next/server";
import { refineCv } from "@/lib/refineCv";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { cvText, jobDescription } = await req.json();

  if (!cvText || typeof cvText !== "string") {
    return NextResponse.json({ error: "cvText is required" }, { status: 400 });
  }
  if (!jobDescription || typeof jobDescription !== "string") {
    return NextResponse.json(
      { error: "jobDescription is required" },
      { status: 400 },
    );
  }

  let result;
  try {
    result = await refineCv(cvText, jobDescription);
  } catch (err) {
    console.error("Refine error:", err);
    return NextResponse.json({ error: "Failed to refine CV" }, { status: 500 });
  }
  return NextResponse.json(result);
}
