import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "ICICI Prudential iSIF Hybrid Long Short Fund — NAV & Review",
  description: "iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/isif/hybrid" },
  openGraph: {
    title: "iSIF Hybrid Long Short by ICICI Prudential",
    description: "iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime.",
    url: "https://sifprime.com/sifs/isif/hybrid",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "iSIF Hybrid Long Short by ICICI Prudential",
    description: "iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="ICICI Prudential iSIF Hybrid Long Short"
        description="iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime with min investment of ₹10,00,000."
        provider="ICICI Prudential Mutual Fund"
        url="https://sifprime.com/sifs/isif/hybrid"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/isif/hybrid" />
    </>
  );
}
