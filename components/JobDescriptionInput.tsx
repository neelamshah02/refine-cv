"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function JobDescriptionInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Job Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        placeholder="Paste the job description here (from customer email, job posting, etc.)…"
        className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-800 
                   resize-y focus:outline-none focus:ring-2 focus:ring-capgemini focus:border-transparent
                   placeholder:text-gray-400"
      />
    </div>
  );
}
