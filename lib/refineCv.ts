import OpenAI from "openai";
import type { RefinementResult } from "@/types/cv";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are an expert CV consultant specializing in IT consulting profiles for the energy and tech sectors in Norway. Your job is to refine consultant CVs for Capgemini Norway before they are sent to clients.

You will receive:
1. A CV in structured text format
2. A job description

You must return a JSON object with these keys:
- profile_summary: refined profile text (2-3 paragraphs, professional tone)
- key_qualifications: { roles: [], technology: [], tools: [], methods: [] }
- projects: array of refined project objects, each with fields: client, industry, dateRange, projectName, roles (array), description, bulletPoints (array), methodAndTechnology (array)
- gaps: array of skills in JD that candidate clearly lacks
- suggestions: array of skills candidate likely has based on experience but hasn't listed
- pitch_note: 3-5 sentence consultant pitch for the customer email
- data_issues: array of data quality problems found (empty fields, inconsistencies, duplicates, placeholder text)

Rules:
- Never invent experience the candidate does not have
- Suggestions must be grounded in their actual experience
- Use strong action verbs and quantify impact where evidence exists
- Match the language of the CV (EN or NO)
- Remove joke entries (e.g. MS Paint as a serious tool)
- Fix casual language to professional consultancy standard (e.g. "Helt OK" → "Professional working proficiency")
- Fix mixed-language issues (unify to CV's primary language)
- Return ONLY valid JSON, no markdown, no code blocks`;

export async function refineCv(
  cvText: string,
  jobDescription: string,
): Promise<RefinementResult> {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `CV TEXT:\n${cvText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
      },
    ],
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from Grok API");

  // Strip any accidental markdown wrapping
  const cleaned = content
    .replace(/^```(?:json)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();
  return JSON.parse(cleaned) as RefinementResult;
}
