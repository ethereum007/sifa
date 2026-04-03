import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Ex-Top 100 Performance March 2026",
  description: "March 2026 performance analysis for Ex-Top 100 Long-Short SIFs. iSIF and qSIF monthly returns, since-inception drawdowns, and cross-category comparison.",
  alternates: { canonical: "https://sifprime.com/performance/march-2026/equity-ex-top-100" },
  openGraph: {
    title: "SIF Ex-Top 100 Performance March 2026",
    description: "March 2026 performance analysis for Ex-Top 100 Long-Short SIFs. iSIF and qSIF monthly returns, since-inception drawdowns, and cross-category comparison.",
    url: "https://sifprime.com/performance/march-2026/equity-ex-top-100",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Ex-Top 100 Performance March 2026",
    description: "March 2026 performance analysis for Ex-Top 100 Long-Short SIFs. iSIF and qSIF monthly returns, since-inception drawdowns, and cross-category comparison.",
  },
};

export default function Page() {
  return <PageClient />;
}
