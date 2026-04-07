import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "ITI Diviniti SIF Equity Long Short Fund — NAV & Review",
  description: "Diviniti SIF by ITI Mutual Fund — active equity long-short strategy. Live NAV, performance data, drawdown analysis and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/diviniti-equity-long-short" },
  openGraph: {
    title: "Diviniti SIF by ITI — Equity Long Short Fund Review",
    description: "Review Diviniti Equity Long Short SIF by ITI MF. Active equity long-short strategy with live NAV & returns. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/diviniti-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Diviniti SIF by ITI — Equity Long Short Fund Review",
    description: "Review Diviniti Equity Long Short SIF by ITI MF. Active equity long-short strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="ITI Diviniti SIF Equity Long Short"
        description="Diviniti SIF by ITI Mutual Fund — active equity long-short strategy. Live NAV, performance data, drawdown analysis and independent review on SIFPrime with min investment of ₹10,00,000."
        provider="ITI Mutual Fund"
        url="https://sifprime.com/diviniti-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/diviniti-equity-long-short" />
    </>
  );
}
