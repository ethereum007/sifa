import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Quant qSIF Hybrid Long Short Fund — NAV, Returns & Review",
  description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-hybrid-long-short" },
  openGraph: {
    title: "Quant qSIF Hybrid Long Short",
    description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
    url: "https://sifprime.com/sifs/qsif-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Quant qSIF Hybrid Long Short",
    description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Quant qSIF Hybrid Long Short"
        description="qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime with min investment of ₹10,00,000."
        provider="Quant Mutual Fund"
        url="https://sifprime.com/sifs/qsif-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/qsif-hybrid-long-short" />
    </>
  );
}
