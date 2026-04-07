import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SBI Magnum SIF Hybrid Long Short Fund — NAV & Review",
  description: "Magnum SIF by SBI Mutual Fund — disciplined hybrid long-short strategy. Live NAV, monthly returns, risk metrics and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/magnum-hybrid-long-short" },
  openGraph: {
    title: "SBI Magnum SIF — Hybrid Long Short Fund Review",
    description: "Review SBI Magnum Hybrid Long Short SIF by SBI MF. Disciplined hybrid long-short strategy with live NAV & returns. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/magnum-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SBI Magnum SIF — Hybrid Long Short Fund Review",
    description: "Review SBI Magnum Hybrid Long Short SIF. Disciplined hybrid long-short strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="SBI Magnum SIF Hybrid Long Short"
        description="Magnum SIF by SBI Mutual Fund — disciplined hybrid long-short strategy. Live NAV, monthly returns, risk metrics and independent fund review on SIFPrime with min investment of ₹10,00,000."
        provider="SBI Mutual Fund"
        url="https://sifprime.com/sifs/magnum-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/magnum-hybrid-long-short" />
    </>
  );
}
