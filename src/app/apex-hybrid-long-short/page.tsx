import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "DSP Apex SIF Hybrid Long Short Fund — NAV & Review",
  description: "Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/apex-hybrid-long-short" },
  openGraph: {
    title: "DSP Apex Hybrid Long Short SIF",
    description: "Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime.",
    url: "https://sifprime.com/apex-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "DSP Apex Hybrid Long Short SIF",
    description: "Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="ABSL Apex SIF Hybrid Long Short"
        description="Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime with min investment of ₹10,00,000."
        provider="Aditya Birla Sun Life Mutual Fund"
        url="https://sifprime.com/apex-hybrid-long-short"
        category="Hybrid Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/apex-hybrid-long-short" />
    </>
  );
}
