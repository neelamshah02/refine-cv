import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPdf } from "@/lib/parseCv";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let text: string;
  try {
    text = await extractTextFromPdf(buffer);
  } catch (err) {
    console.error("PDF parse error:", err);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }

  if (!text || text.trim().length < 50) {
    return NextResponse.json(
      { error: "Could not extract readable text from PDF" },
      { status: 422 },
    );
  }

  return NextResponse.json({ text: text.trim() });
}
