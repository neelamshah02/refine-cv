export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Dynamic import prevents pdf-parse from reading test files on module init,
  // which would crash in serverless / Vercel environments.
  const mod = await import("pdf-parse");
  const pdfParse = (mod.default ?? mod) as (buf: Buffer) => Promise<{ text: string }>;
  const data = await pdfParse(buffer);
  return data.text;
}
