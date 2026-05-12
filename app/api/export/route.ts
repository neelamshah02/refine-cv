import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { CapgeminiCVDocument } from "@/lib/generatePdf";
import type { CVData } from "@/types/cv";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const cv: CVData = await req.json();

  if (!cv || !cv.name) {
    return NextResponse.json({ error: "Invalid CV data" }, { status: 400 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(
    React.createElement(CapgeminiCVDocument, { cv }) as React.ReactElement,
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${cv.name.replace(/\s+/g, "_")}_CV.pdf"`,
    },
  });
}
