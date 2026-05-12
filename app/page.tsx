"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CVUploader } from "@/components/CVUploader";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";

export default function HomePage() {
  const router = useRouter();
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = cvText.length > 0;

  const handleRefine = async () => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/refine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvText, jobDescription }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Refinement failed. Please try again.");
      return;
    }

    sessionStorage.setItem("refinementResult", JSON.stringify(data));
    sessionStorage.setItem("cvText", cvText);
    router.push("/review");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-[#0070AD] text-white py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              CV Refinement Tool
            </h1>
            <p className="text-blue-200 text-sm">
              Capgemini Norway — Internal Use
            </p>
          </div>
          <span className="text-blue-200 text-sm font-medium">
            Powered by Grok
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <StepBadge n={1} /> Upload Consultant CV
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Upload the PDF from the Capgemini CV builder.
          </p>
          <CVUploader onParsed={setCvText} />
          {cvText && (
            <details className="mt-4">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                Preview extracted text
              </summary>
              <pre className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg overflow-auto max-h-48 whitespace-pre-wrap">
                {cvText.slice(0, 1500)}
                {cvText.length > 1500 ? "…" : ""}
              </pre>
            </details>
          )}
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
            <StepBadge n={2} /> Paste Job Description{" "}
            <span className="text-xs font-normal text-gray-400">
              (optional)
            </span>
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Paste the job description to tailor the CV to a specific role, or
            leave blank for a general expert refinement.
          </p>
          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
          />
        </section>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleRefine}
          disabled={!canSubmit || loading}
          className="w-full bg-[#0070AD] text-white font-bold text-lg py-4 rounded-2xl shadow-md
                     hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Refining with Grok…
            </span>
          ) : (
            "✨ Refine CV"
          )}
        </button>
      </div>
    </main>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0070AD] text-white text-xs font-bold">
      {n}
    </span>
  );
}
