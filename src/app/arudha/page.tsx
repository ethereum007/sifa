import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Arudha SIF – Bandhan Hybrid Long Short Fund",
  description: "Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details.",
  alternates: { canonical: "https://sifprime.com/sifs/arudha-hybrid-long-short" },
  openGraph: {
    title: "Arudha SIF – Bandhan Hybrid Long Short Fund",
    description: "Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details.",
    url: "https://sifprime.com/sifs/arudha-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Arudha SIF – Bandhan Hybrid Long Short Fund",
    description: "Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Bandhan Arudha SIF"
        description="Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details with min investment of ₹10,00,000."
        provider="Bandhan Mutual Fund"
        url="https://sifprime.com/arudha"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/arudha" />
    </>
  );
}
