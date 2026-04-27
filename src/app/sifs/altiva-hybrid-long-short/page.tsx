import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Altiva SIF Hybrid Long Short Fund — NAV, Returns & Review",
  description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/altiva-hybrid-long-short" },
  openGraph: {
    title: "Altiva SIF by Edelweiss — India's First Hybrid SIF",
    description: "Review Altiva Hybrid Long Short SIF by Edelweiss MF. India's first hybrid long-short SIF with live NAV & returns. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/altiva-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Altiva SIF by Edelweiss — India's First Hybrid SIF",
    description: "Review Altiva Hybrid Long Short SIF by Edelweiss. India's first hybrid SIF. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Edelweiss Altiva Hybrid Long Short SIF"
        description="Altiva SIF by Edelweiss — India's first Hybrid Long-Short Specialized Investment Fund with min investment of ₹10,00,000."
        provider="Edelweiss Mutual Fund"
        url="https://sifprime.com/sifs/altiva-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/altiva-hybrid-long-short" />
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "Altiva Hybrid Long-Short",
      shortName: "Altiva SIF",
      amc: "Edelweiss Mutual Fund",
      category: "Hybrid Long Short",
      benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
      inceptionDate: "October 24, 2025",
        })}
      />
      </>
  );
}
