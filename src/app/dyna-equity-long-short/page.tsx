import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "360 ONE Dyna SIF Equity Long Short Fund — NAV & Review",
  description: "Dyna SIF by 360 ONE — macro-driven equity long-short strategy. Live NAV, since-inception returns, drawdown analysis and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/dyna-equity-long-short" },
  openGraph: {
    title: "Dyna SIF by 360 ONE — Equity Long Short Strategy",
    description: "Review Dyna Equity Long Short SIF by 360 ONE. Macro-driven equity long-short strategy with live NAV & returns. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/dyna-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Dyna SIF by 360 ONE — Equity Long Short Strategy",
    description: "Review Dyna Equity Long Short SIF by 360 ONE. Macro-driven strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="360 ONE Dyna SIF Equity Long Short"
        description="Dyna SIF by 360 ONE — macro-driven equity long-short strategy. Live NAV, since-inception returns, drawdown analysis and independent review on SIFPrime with min investment of ₹10,00,000."
        provider="360 ONE Mutual Fund"
        url="https://sifprime.com/dyna-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/dyna-equity-long-short" />
    </>
  );
}
