import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Tata Titanium SIF Hybrid Long Short Fund — NAV & Review",
  description: "Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/titanium-hybrid-long-short" },
  openGraph: {
    title: "Tata Titanium Hybrid Long Short SIF",
    description: "Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime.",
    url: "https://sifprime.com/sifs/titanium-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Tata Titanium Hybrid Long Short SIF",
    description: "Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Tata Titanium SIF Hybrid Long Short"
        description="Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime with min investment of ₹10,00,000."
        provider="Tata Mutual Fund"
        url="https://sifprime.com/sifs/titanium-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/titanium-hybrid-long-short" />
    </>
  );
}
