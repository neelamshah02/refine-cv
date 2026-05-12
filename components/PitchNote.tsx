"use client";

import { useState } from "react";

interface Props {
  pitchNote: string;
  onChange: (v: string) => void;
}

export function PitchNote({ pitchNote, onChange }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(pitchNote);

  return (
    <div className="border border-capgemini bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-capgemini flex items-center gap-2">
          <span>✉️</span> Consultant Pitch Note
        </h3>
        <button
          onClick={() => setEditing((v) => !v)}
          className="text-xs text-capgemini border border-capgemini px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>
      {editing ? (
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            onChange(e.target.value);
          }}
          rows={5}
          className="w-full text-sm text-gray-800 border border-gray-300 rounded-lg p-3 resize-y
                     focus:outline-none focus:ring-2 focus:ring-capgemini"
        />
      ) : (
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      )}
      <p className="text-xs text-gray-400 mt-3">
        Copy this into your email to the customer.
      </p>
    </div>
  );
}
