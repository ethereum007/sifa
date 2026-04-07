import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Performance March 2026 – Hybrid Long Short Returns",
  description: "March 2026 SIF performance analysis for Hybrid Long-Short funds. Monthly & since-inception returns for Altiva, Arudha, Magnum, qSIF, Titanium, iSIF.",
  alternates: { canonical: "https://sifprime.com/performance/march-2026" },
  openGraph: {
    title: "SIF Performance March 2026 – Hybrid Long Short",
    description: "March 2026 SIF Hybrid Long-Short performance. Arudha only fund in the green at +0.07%.",
    url: "https://sifprime.com/performance/march-2026",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Performance March 2026 – Hybrid Long Short",
    description: "March 2026 SIF Hybrid Long-Short performance. Arudha only fund in the green at +0.07%.",
  },
};

export default function Page() {
  return <PageClient />;
}
