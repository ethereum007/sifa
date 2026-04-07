import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "iSIF – ICICI Prudential Specialized Investment Funds",
  description: "Explore ICICI Prudential iSIF fund range – Ex-Top 100 and Hybrid Long Short strategies. Compare NAV, returns & invest from ₹10 Lakhs.",
  alternates: { canonical: "https://sifprime.com/sifs/isif" },
  openGraph: {
    title: "iSIF by ICICI Prudential — Equity Long Short SIF",
    description: "Review iSIF Equity Long Short by ICICI Prudential MF. Active equity long-short SIF strategy with live NAV & returns. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/isif",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "iSIF by ICICI Prudential — Equity Long Short SIF",
    description: "Review iSIF Equity Long Short by ICICI Prudential. Equity long-short SIF strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="ICICI Prudential iSIF Equity Long Short"
        description="Explore ICICI Prudential iSIF fund range – Ex-Top 100 and Hybrid Long Short strategies. Compare NAV, returns & invest from ₹10 Lakhs with min investment of ₹10,00,000."
        provider="ICICI Prudential Mutual Fund"
        url="https://sifprime.com/sifs/isif"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/isif" />
    </>
  );
}
