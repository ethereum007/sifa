import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Arudha Equity Long Short – Bandhan SIF Review",
  description: "Review Bandhan Arudha Equity Long Short SIF. Strategy, NAV, portfolio, returns & risk analysis from Bandhan Mutual Fund.",
  alternates: { canonical: "https://sifprime.com/arudha-equity-long-short" },
  openGraph: {
    title: "Arudha by Bandhan — Equity Long Short SIF",
    description: "Review Arudha Equity Long Short SIF by Bandhan MF. Active equity long-short strategy with live NAV & portfolio analysis. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/arudha-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Arudha by Bandhan — Equity Long Short SIF",
    description: "Review Arudha Equity Long Short SIF by Bandhan MF. Equity long-short strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Bandhan Arudha Equity Long Short SIF"
        description="Review Bandhan Arudha Equity Long Short SIF. Strategy, NAV, portfolio, returns & risk analysis from Bandhan Mutual Fund with min investment of ₹10,00,000."
        provider="Bandhan Mutual Fund"
        url="https://sifprime.com/arudha-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/arudha-equity-long-short" />
    </>
  );
}
