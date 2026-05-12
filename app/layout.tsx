import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV Refinement Tool — Capgemini Norway",
  description:
    "Internal tool for refining consultant CVs before customer submission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
