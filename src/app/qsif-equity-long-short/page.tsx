import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Quant qSIF Equity Long Short Fund — NAV & Review",
  description: "qSIF Equity by Quant Mutual Fund — high-alpha equity long-short strategy. Live NAV, performance vs Nifty 50 and independent analysis on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/qsif-equity-long-short" },
  openGraph: {
    title: "Quant qSIF Equity Long Short",
    description: "qSIF Equity by Quant Mutual Fund — high-alpha equity long-short strategy. Live NAV, performance vs Nifty 50 and independent analysis on SIFPrime.",
    url: "https://sifprime.com/qsif-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Quant qSIF Equity Long Short",
    description: "qSIF Equity by Quant Mutual Fund — high-alpha equity long-short strategy. Live NAV, performance vs Nifty 50 and independent analysis on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
