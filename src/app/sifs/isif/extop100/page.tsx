import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "ICICI Prudential iSIF Equity Ex-top 100 Long Short Fund — NAV & Review",
  description: "iSIF Equity Long-Short by ICICI Prudential — active long-short equity strategy. Live NAV, monthly returns vs Nifty and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/isif/extop100" },
  openGraph: {
    title: "iSIF Ex-Top 100 by ICICI — Small & Mid Cap SIF",
    description: "Review iSIF Ex-Top 100 Long Short by ICICI Prudential MF. Small & mid cap equity long-short SIF strategy. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/isif/extop100",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "iSIF Ex-Top 100 by ICICI — Small & Mid Cap SIF",
    description: "Review iSIF Ex-Top 100 by ICICI Prudential. Small & mid cap SIF strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="ICICI Prudential iSIF Ex-Top 100"
        description="iSIF Equity Long-Short by ICICI Prudential — active long-short equity strategy. Live NAV, monthly returns vs Nifty and independent fund review on SIFPrime with min investment of ₹10,00,000."
        provider="ICICI Prudential Mutual Fund"
        url="https://sifprime.com/sifs/isif/extop100"
        category="Equity Ex-Top 100 SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/isif/extop100" />
    </>
  );
}
