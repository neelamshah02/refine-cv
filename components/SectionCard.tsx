"use client";

import { useState } from "react";
import type { ApprovalStatus } from "@/types/cv";

interface Props {
  title: string;
  original: string;
  refined: string;
  status: ApprovalStatus;
  onStatusChange: (s: ApprovalStatus) => void;
  onTextChange: (t: string) => void;
}

export function SectionCard({
  title,
  original,
  refined,
  status,
  onStatusChange,
  onTextChange,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(refined);

  const activeText =
    status === "original"
      ? original
      : status === "refined"
        ? refined
        : editText;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Title bar */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex gap-2">
          <StatusButton
            label="Original"
            active={status === "original"}
            onClick={() => {
              onStatusChange("original");
              setEditing(false);
            }}
          />
          <StatusButton
            label="Refined"
            active={status === "refined"}
            onClick={() => {
              onStatusChange("refined");
              setEditing(false);
            }}
          />
          <StatusButton
            label="Edit"
            active={status === "edited"}
            onClick={() => {
              onStatusChange("edited");
              setEditing(true);
              setEditText(refined);
            }}
            variant="edit"
          />
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        {/* Original */}
        <div className="p-4">
          <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Original
          </p>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {original}
          </p>
        </div>

        {/* Refined / Editable */}
        <div className="p-4 bg-blue-50/30">
          <p className="text-xs font-medium text-capgemini mb-2 uppercase tracking-wide">
            {status === "edited" ? "Edited" : "Refined"}
          </p>
          {editing && status === "edited" ? (
            <textarea
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                onTextChange(e.target.value);
              }}
              rows={8}
              className="w-full text-sm text-gray-800 border border-capgemini rounded-lg p-2 resize-y
                         focus:outline-none focus:ring-2 focus:ring-capgemini bg-white"
            />
          ) : (
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {status === "edited" ? editText : refined}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusButton({
  label,
  active,
  onClick,
  variant = "default",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  variant?: "default" | "edit";
}) {
  const base =
    "text-xs font-medium px-3 py-1 rounded-full border transition-colors";
  if (active) {
    return (
      <button
        onClick={onClick}
        className={`${base} bg-capgemini text-white border-capgemini`}
      >
        {label}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`${base} border-gray-300 text-gray-600 hover:border-capgemini hover:text-capgemini bg-white`}
    >
      {label}
    </button>
  );
}
