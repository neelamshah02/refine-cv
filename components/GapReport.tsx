"use client";

interface Props {
  gaps: string[];
  suggestions: string[];
  dataIssues: string[];
}

export function GapReport({ gaps, suggestions, dataIssues }: Props) {
  return (
    <div className="space-y-4">
      {/* Skills Gaps */}
      <div className="border border-red-200 bg-red-50 rounded-xl p-4">
        <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
          <span>⚠️</span> Skills Gaps (in JD, not in CV)
        </h3>
        {gaps.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No significant gaps detected
          </p>
        ) : (
          <ul className="space-y-1">
            {gaps.map((g, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-red-800"
              >
                <span className="text-red-400 mt-0.5">•</span> {g}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Suggestions */}
      <div className="border border-green-200 bg-green-50 rounded-xl p-4">
        <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
          <span>💡</span> Suggested Additions (likely has, not listed)
        </h3>
        {suggestions.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No suggestions</p>
        ) : (
          <ul className="space-y-1">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-green-800"
              >
                <span className="text-green-400 mt-0.5">•</span> {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Data Issues */}
      {dataIssues.length > 0 && (
        <div className="border border-orange-200 bg-orange-50 rounded-xl p-4">
          <h3 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
            <span>🔧</span> Data Quality Issues
          </h3>
          <ul className="space-y-1">
            {dataIssues.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-orange-800"
              >
                <span className="text-orange-400 mt-0.5">•</span> {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
