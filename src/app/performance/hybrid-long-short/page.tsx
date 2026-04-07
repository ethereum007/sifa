import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Performance – Hybrid Long Short January 2026",
  description: "January 2026 performance analysis of Hybrid Long Short SIF funds. NAV charts, returns comparison & risk metrics for all hybrid SIF schemes.",
  alternates: { canonical: "https://sifprime.com/performance/hybrid-long-short" },
  openGraph: {
    title: "Hybrid Long Short SIF Performance Jan 2026",
    description: "January 2026 performance analysis of Hybrid Long Short SIF funds. NAV charts, returns comparison & risk metrics for all hybrid SIF schemes.",
    url: "https://sifprime.com/performance/hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Hybrid Long Short SIF Performance Jan 2026",
    description: "January 2026 performance analysis of Hybrid Long Short SIF funds. NAV charts, returns comparison & risk metrics for all hybrid SIF schemes.",
  },
};

export default function Page() {
  return <PageClient />;
}
