import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "ITI Diviniti SIF Equity Long Short Fund — NAV & Review",
  description: "Diviniti SIF by ITI Mutual Fund — active equity long-short strategy. Live NAV, performance data, drawdown analysis and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/diviniti-equity-long-short" },
  openGraph: {
    title: "ITI Diviniti Equity Long Short SIF",
    description: "Diviniti SIF by ITI Mutual Fund — active equity long-short strategy. Live NAV, performance data, drawdown analysis and independent review on SIFPrime.",
    url: "https://sifprime.com/diviniti-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "ITI Diviniti Equity Long Short SIF",
    description: "Diviniti SIF by ITI Mutual Fund — active equity long-short strategy. Live NAV, performance data, drawdown analysis and independent review on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
