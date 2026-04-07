import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Altiva SIF Hybrid Long Short Fund — NAV, Returns & Review",
  description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/altiva-hybrid-long-short" },
  openGraph: {
    title: "Edelweiss Altiva Hybrid Long Short SIF",
    description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
    url: "https://sifprime.com/sifs/altiva-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Edelweiss Altiva Hybrid Long Short SIF",
    description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
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
    </>
  );
}
