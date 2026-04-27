import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Apex SIF Hybrid Long Short Fund — Aditya Birla Sun Life | NAV & Review",
  description: "Apex SIF by Aditya Birla Sun Life Mutual Fund — arbitrage + fixed income + derivatives hybrid long-short strategy. NFO dates, live NAV, min investment and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/apex-hybrid-long-short" },
  openGraph: {
    title: "Apex SIF by Aditya Birla Sun Life — Hybrid Long Short Fund",
    description: "Review Apex Hybrid Long Short SIF by ABSL Mutual Fund. Interval hybrid long-short with ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/apex-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Apex SIF by Aditya Birla Sun Life — Hybrid Long Short Fund",
    description: "Apex Hybrid Long Short SIF by ABSL. Arbitrage + derivatives + debt. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Aditya Birla Sun Life Apex Hybrid Long-Short SIF"
        description="Apex SIF by Aditya Birla Sun Life Mutual Fund — interval hybrid long-short investment strategy combining arbitrage, fixed income, derivatives and special situations with min investment of ₹10,00,000."
        provider="Aditya Birla Sun Life Mutual Fund"
        url="https://sifprime.com/sifs/apex-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/apex-hybrid-long-short" />
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "Apex Hybrid Long-Short",
      shortName: "Apex SIF",
      amc: "Aditya Birla Sun Life Mutual Fund",
      category: "Hybrid Long Short",
      benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
      inceptionDate: "January 2026",
        })}
      />
      </>
  );
}
