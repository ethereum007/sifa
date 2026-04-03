import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Performance – Hybrid Long Short February 2026",
  description: "February 2026 Hybrid Long Short SIF performance. NAV charts, monthly returns & fund comparison for all hybrid SIF schemes.",
  alternates: { canonical: "https://sifprime.com/performance/february-2026/hybrid-long-short" },
  openGraph: {
    title: "Hybrid Long Short SIF Performance Feb 2026",
    description: "February 2026 Hybrid Long Short SIF performance. NAV charts, monthly returns & fund comparison for all hybrid SIF schemes.",
    url: "https://sifprime.com/performance/february-2026/hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Hybrid Long Short SIF Performance Feb 2026",
    description: "February 2026 Hybrid Long Short SIF performance. NAV charts, monthly returns & fund comparison for all hybrid SIF schemes.",
  },
};

export default function Page() {
  return <PageClient />;
}
