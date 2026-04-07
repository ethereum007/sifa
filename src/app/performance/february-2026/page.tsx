import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Performance February 2026 – All Categories",
  description: "February 2026 SIF performance overview across Equity Long Short, Hybrid Long Short & Ex-Top 100 categories. Monthly returns & NAV analysis.",
  alternates: { canonical: "https://sifprime.com/performance/february-2026" },
  openGraph: {
    title: "SIF Performance February 2026",
    description: "February 2026 SIF performance overview across Equity Long Short, Hybrid Long Short & Ex-Top 100 categories. Monthly returns & NAV analysis.",
    url: "https://sifprime.com/performance/february-2026",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Performance February 2026",
    description: "February 2026 SIF performance overview across Equity Long Short, Hybrid Long Short & Ex-Top 100 categories. Monthly returns & NAV analysis.",
  },
};

export default function Page() {
  return <PageClient />;
}
