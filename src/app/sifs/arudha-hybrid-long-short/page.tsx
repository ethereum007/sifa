import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Bandhan Arudha SIF Hybrid Long Short Fund — NAV & Review",
  description: "Arudha SIF by Bandhan Mutual Fund — only SIF with positive March 2026 returns. Live NAV, since-inception performance and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/arudha-hybrid-long-short" },
  openGraph: {
    title: "Arudha Hybrid by Bandhan — SIF Fund Review",
    description: "Review Arudha Hybrid Long Short SIF by Bandhan MF. Hybrid long-short strategy with live NAV & performance data. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/arudha-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Arudha Hybrid by Bandhan — SIF Fund Review",
    description: "Review Arudha Hybrid Long Short SIF by Bandhan MF. Hybrid long-short strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Bandhan Arudha SIF Hybrid Long Short"
        description="Arudha SIF by Bandhan Mutual Fund — only SIF with positive March 2026 returns. Live NAV, since-inception performance and independent review on SIFPrime with min investment of ₹10,00,000."
        provider="Bandhan Mutual Fund"
        url="https://sifprime.com/sifs/arudha-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/arudha-hybrid-long-short" />
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "Arudha Hybrid Long-Short",
      shortName: "Arudha SIF",
      amc: "Bandhan Mutual Fund",
      category: "Hybrid Long Short",
      benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
      inceptionDate: "February 4, 2026",
        })}
      />
      </>
  );
}
