import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Equity Long-Short Performance March 2026",
  description: "March 2026 performance analysis for Equity Long-Short SIFs. qSIF, Diviniti, Dyna & Arudha monthly returns, since-inception data, and market context.",
  alternates: { canonical: "https://sifprime.com/performance/march-2026/equity-long-short" },
  openGraph: {
    title: "SIF Equity Long-Short Performance March 2026",
    description: "March 2026 performance analysis for Equity Long-Short SIFs. qSIF, Diviniti, Dyna & Arudha monthly returns, since-inception data, and market context.",
    url: "https://sifprime.com/performance/march-2026/equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Equity Long-Short Performance March 2026",
    description: "March 2026 performance analysis for Equity Long-Short SIFs. qSIF, Diviniti, Dyna & Arudha monthly returns, since-inception data, and market context.",
  },
};

export default function Page() {
  return <PageClient />;
}
