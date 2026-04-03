import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Performance – Equity Ex-Top 100 February 2026",
  description: "February 2026 Equity Ex-Top 100 SIF performance. SMID-cap long-short fund NAV charts, returns & analysis.",
  alternates: { canonical: "https://sifprime.com/performance/february-2026/equity-ex-top-100" },
  openGraph: {
    title: "Equity Ex-Top 100 SIF Performance Feb 2026",
    description: "February 2026 Equity Ex-Top 100 SIF performance. SMID-cap long-short fund NAV charts, returns & analysis.",
    url: "https://sifprime.com/performance/february-2026/equity-ex-top-100",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Equity Ex-Top 100 SIF Performance Feb 2026",
    description: "February 2026 Equity Ex-Top 100 SIF performance. SMID-cap long-short fund NAV charts, returns & analysis.",
  },
};

export default function Page() {
  return <PageClient />;
}
