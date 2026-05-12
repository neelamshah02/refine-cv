"use client";

import { useState } from "react";
import type { CVData } from "@/types/cv";

interface Props {
  cvData: CVData;
}

export function ExportPanel({ cvData }: Props) {
  const [loadingEN, setLoadingEN] = useState(false);
  const [loadingNO, setLoadingNO] = useState(false);

  const exportPdf = async (lang: "EN" | "NO") => {
    const setter = lang === "EN" ? setLoadingEN : setLoadingNO;
    setter(true);

    const payload: CVData =
      lang === "NO"
        ? { ...cvData, title: cvData.title } // NO version uses same data (translation handled by Grok in a future enhancement)
        : cvData;

    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setter(false);

    if (!res.ok) {
      alert("Export failed. Please try again.");
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cvData.name.replace(/\s+/g, "_")}_CV_${lang}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <h3 className="font-semibold text-gray-800 mb-4">Export CV</h3>
      <div className="flex gap-3">
        <button
          onClick={() => exportPdf("EN")}
          disabled={loadingEN}
          className="flex-1 bg-capgemini text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loadingEN ? "Generating…" : "⬇ Download EN PDF"}
        </button>
        <button
          onClick={() => exportPdf("NO")}
          disabled={loadingNO}
          className="flex-1 border-2 border-capgemini text-capgemini font-semibold py-3 rounded-xl
                     hover:bg-blue-50 disabled:opacity-60 transition-colors"
        >
          {loadingNO ? "Generating…" : "⬇ Download NO PDF"}
        </button>
      </div>
    </div>
  );
}
