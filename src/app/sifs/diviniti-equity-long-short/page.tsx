import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Diviniti Equity Long-Short Fund (ITI) — NAV, Returns & Review",
  description:
    "Diviniti SIF by ITI Mutual Fund — an open-ended Equity Long-Short Specialized Investment Fund. Live NAV, since-inception returns, strategy & independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/diviniti-equity-long-short" },
  openGraph: {
    title: "Diviniti Equity Long-Short Fund by ITI Mutual Fund",
    description:
      "Review Diviniti Equity Long-Short SIF by ITI MF. Live NAV, strategy deep-dive and peer comparison on SIFPrime.",
    url: "https://sifprime.com/sifs/diviniti-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Diviniti Equity L/S — ITI Mutual Fund",
    description: "Diviniti SIF by ITI MF. Equity Long-Short strategy. Live NAV & peer comparison on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="ITI Diviniti Equity Long-Short SIF"
        description="Diviniti SIF by ITI Mutual Fund — an Equity Long-Short Specialized Investment Fund with minimum investment of ₹10,00,000."
        provider="ITI Mutual Fund"
        url="https://sifprime.com/sifs/diviniti-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/diviniti-equity-long-short" />
    </>
  );
}
