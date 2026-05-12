export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const { extractText } = await import("unpdf");
  const { text } = await extractText(new Uint8Array(buffer), { mergePages: true });
  return text;
}
