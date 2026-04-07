import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

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

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Quant qSIF Equity Long Short"
        description="qSIF Equity by Quant Mutual Fund — high-alpha equity long-short strategy. Live NAV, performance vs Nifty 50 and independent analysis on SIFPrime with min investment of ₹10,00,000."
        provider="Quant Mutual Fund"
        url="https://sifprime.com/qsif-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/qsif-equity-long-short" />
    </>
  );
}
