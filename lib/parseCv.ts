export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Dynamic import prevents pdf-parse from reading test files on module init,
  // which would crash in serverless / Vercel environments.
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text;
}
