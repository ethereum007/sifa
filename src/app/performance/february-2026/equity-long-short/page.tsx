import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Performance – Equity Long Short February 2026",
  description: "February 2026 Equity Long Short SIF performance. NAV charts, monthly returns & fund comparison for equity SIF schemes.",
  alternates: { canonical: "https://sifprime.com/performance/february-2026/equity-long-short" },
  openGraph: {
    title: "Equity Long Short SIF Performance Feb 2026",
    description: "February 2026 Equity Long Short SIF performance. NAV charts, monthly returns & fund comparison for equity SIF schemes.",
    url: "https://sifprime.com/performance/february-2026/equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Equity Long Short SIF Performance Feb 2026",
    description: "February 2026 Equity Long Short SIF performance. NAV charts, monthly returns & fund comparison for equity SIF schemes.",
  },
};

export default function Page() {
  return <PageClient />;
}
