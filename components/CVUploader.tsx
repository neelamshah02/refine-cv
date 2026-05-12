"use client";

import { useCallback, useState } from "react";

interface Props {
  onParsed: (text: string) => void;
}

export function CVUploader({ onParsed }: Props) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".pdf")) {
        setError("Please upload a PDF file.");
        return;
      }
      setLoading(true);
      setError(null);
      setFileName(file.name);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setLoading(false);

      if (!res.ok) {
        setError(data.error ?? "Failed to parse PDF");
        return;
      }
      onParsed(data.text);
    },
    [onParsed],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer
        ${dragging ? "border-capgemini bg-blue-50" : "border-gray-300 hover:border-capgemini"}`}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {loading ? (
        <p className="text-capgemini font-medium animate-pulse">Parsing PDF…</p>
      ) : fileName ? (
        <div>
          <p className="text-green-600 font-semibold">✓ {fileName}</p>
          <p className="text-sm text-gray-500 mt-1">
            Drop a new file to replace
          </p>
        </div>
      ) : (
        <div>
          <p className="text-4xl mb-3">📄</p>
          <p className="font-semibold text-gray-700">Drag & drop CV PDF here</p>
          <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        </div>
      )}
      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </div>
  );
}
