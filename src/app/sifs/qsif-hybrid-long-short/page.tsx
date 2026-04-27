import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Quant qSIF Hybrid Long Short Fund — NAV, Returns & Review",
  description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-hybrid-long-short" },
  openGraph: {
    title: "qSIF Hybrid by Quant — Hybrid Long Short SIF",
    description: "Review qSIF Hybrid Long Short by Quant MF. Hybrid long-short strategy blending equity & debt. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/qsif-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "qSIF Hybrid by Quant — Hybrid Long Short SIF",
    description: "Review qSIF Hybrid Long Short by Quant MF. Hybrid long-short SIF strategy. ₹10L min investment. Compare on SIFPrime.",
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
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "qSIF Hybrid Long-Short",
      shortName: "qSIF Hybrid",
      amc: "Quant Mutual Fund",
      category: "Hybrid Long Short",
      benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
      inceptionDate: "November 2025",
        })}
      />
      </>
  );
}
