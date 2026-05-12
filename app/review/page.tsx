"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SectionCard } from "@/components/SectionCard";
import { GapReport } from "@/components/GapReport";
import { PitchNote } from "@/components/PitchNote";
import { ExportPanel } from "@/components/ExportPanel";
import type {
  RefinementResult,
  CVData,
  ApprovalStatus,
  KeyQualifications,
  ProjectEngagement,
} from "@/types/cv";

function kqToText(kq: KeyQualifications): string {
  return [
    `Roles: ${kq.roles.join(", ")}`,
    `Technology: ${kq.technology.join(", ")}`,
    `Tools: ${kq.tools.join(", ")}`,
    `Methods: ${kq.methods.join(", ")}`,
  ].join("\n");
}

function projectToText(p: ProjectEngagement): string {
  return [
    `Client: ${p.client}`,
    `Industry: ${p.industry}`,
    `Period: ${p.dateRange}`,
    `Project: ${p.projectName}`,
    `Roles: ${p.roles.join(", ")}`,
    ``,
    p.description,
    ``,
    p.bulletPoints.map((b) => `• ${b}`).join("\n"),
    ``,
    `Methods & Tech: ${p.methodAndTechnology.join(", ")}`,
  ].join("\n");
}

export default function ReviewPage() {
  const router = useRouter();
  const [result, setResult] = useState<RefinementResult | null>(null);
  const [originalCvText, setOriginalCvText] = useState("");

  // Approval states
  const [profileStatus, setProfileStatus] = useState<ApprovalStatus>("refined");
  const [profileText, setProfileText] = useState("");
  const [kqStatus, setKqStatus] = useState<ApprovalStatus>("refined");
  const [kqText, setKqText] = useState("");
  const [projectStatuses, setProjectStatuses] = useState<ApprovalStatus[]>([]);
  const [projectTexts, setProjectTexts] = useState<string[]>([]);
  const [pitchNote, setPitchNote] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("refinementResult");
    const cvText = sessionStorage.getItem("cvText") ?? "";
    if (!raw) {
      router.push("/");
      return;
    }
    const r: RefinementResult = JSON.parse(raw);
    setResult(r);
    setOriginalCvText(cvText);
    setProfileText(r.profile_summary);
    setKqText(kqToText(r.key_qualifications));
    setProjectStatuses(r.projects.map(() => "refined"));
    setProjectTexts(r.projects.map((p) => projectToText(p)));
    setPitchNote(r.pitch_note);
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  // Build approved CVData for export
  const approvedCv: CVData = {
    name: "Consultant", // Extracted from CV text (placeholder — enhance with structured parse)
    title: "IT Consultant",
    profileSummary:
      profileStatus === "original" ? originalCvText.slice(0, 600) : profileText,
    keyQualifications:
      profileStatus === "original"
        ? result.key_qualifications
        : parseKqFromText(kqText, result.key_qualifications),
    employments: [],
    education: [],
    certifications: [],
    courses: [],
    honorsAndAwards: [],
    languages: [],
    projects: result.projects.map((p, i) =>
      projectStatuses[i] === "original" ? p : result.projects[i],
    ),
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0070AD] text-white py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="text-blue-200 hover:text-white text-sm"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-lg font-bold">Review Refined CV</h1>
              <p className="text-blue-200 text-xs">
                Accept, edit, or reject each section
              </p>
            </div>
          </div>
          <span className="text-blue-200 text-sm">
            {result.projects.length} projects · {result.gaps.length} gaps
            flagged
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-3 gap-6">
        {/* Main content — 2/3 width */}
        <div className="col-span-2 space-y-6">
          {/* Profile Summary */}
          <SectionCard
            title="Profile Summary"
            original={originalCvText.slice(0, 1200)}
            refined={result.profile_summary}
            status={profileStatus}
            onStatusChange={setProfileStatus}
            onTextChange={setProfileText}
          />

          {/* Key Qualifications */}
          <SectionCard
            title="Key Qualifications"
            original={kqToText({
              roles: [],
              technology: [],
              tools: [],
              methods: [],
            })}
            refined={kqToText(result.key_qualifications)}
            status={kqStatus}
            onStatusChange={setKqStatus}
            onTextChange={setKqText}
          />

          {/* Projects */}
          {result.projects.map((project, i) => (
            <SectionCard
              key={i}
              title={`Project: ${project.client} — ${project.projectName || project.description.slice(0, 40)}`}
              original={originalCvText}
              refined={projectTexts[i] ?? projectToText(project)}
              status={projectStatuses[i]}
              onStatusChange={(s) => {
                const next = [...projectStatuses];
                next[i] = s;
                setProjectStatuses(next);
              }}
              onTextChange={(t) => {
                const next = [...projectTexts];
                next[i] = t;
                setProjectTexts(next);
              }}
            />
          ))}
        </div>

        {/* Sidebar — 1/3 width */}
        <div className="space-y-6">
          <PitchNote pitchNote={pitchNote} onChange={setPitchNote} />
          <GapReport
            gaps={result.gaps}
            suggestions={result.suggestions}
            dataIssues={result.data_issues}
          />
          <ExportPanel cvData={approvedCv} />
        </div>
      </div>
    </main>
  );
}

function parseKqFromText(
  text: string,
  fallback: KeyQualifications,
): KeyQualifications {
  try {
    const lines = text.split("\n");
    const extract = (prefix: string) => {
      const line = lines.find((l) => l.startsWith(prefix));
      return line
        ? line
            .replace(prefix, "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
    };
    return {
      roles: extract("Roles: "),
      technology: extract("Technology: "),
      tools: extract("Tools: "),
      methods: extract("Methods: "),
    };
  } catch {
    return fallback;
  }
}
