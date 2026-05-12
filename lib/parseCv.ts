export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Dynamic import prevents pdf-parse from reading test files on module init,
  // which would crash in serverless / Vercel environments.
  const mod = await import("pdf-parse");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfParse = ((mod as any).default ?? mod) as (
    buf: Buffer,
  ) => Promise<{ text: string }>;
  const data = await pdfParse(buffer);
  return data.text;
}
