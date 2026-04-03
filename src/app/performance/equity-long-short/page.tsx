import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Performance – Equity Long Short January 2026",
  description: "January 2026 performance analysis of Equity Long Short SIF funds. NAV charts, returns comparison & risk metrics.",
  alternates: { canonical: "https://sifprime.com/performance/equity-long-short" },
  openGraph: {
    title: "Equity Long Short SIF Performance Jan 2026",
    description: "January 2026 performance analysis of Equity Long Short SIF funds. NAV charts, returns comparison & risk metrics.",
    url: "https://sifprime.com/performance/equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Equity Long Short SIF Performance Jan 2026",
    description: "January 2026 performance analysis of Equity Long Short SIF funds. NAV charts, returns comparison & risk metrics.",
  },
};

export default function Page() {
  return <PageClient />;
}
