import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Sapphire Equity Long-Short SIF by Franklin Templeton — NFO Open",
  description:
    "Sapphire Equity Long-Short SIF by Franklin Templeton Mutual Fund. NFO open 10–24 April 2026. ₹10L minimum, long/short equity quant strategy benchmarked to Nifty 500 TRI.",
  alternates: { canonical: "https://sifprime.com/sifs/sapphire-equity-long-short" },
  openGraph: {
    title: "Sapphire Equity Long-Short SIF by Franklin Templeton",
    description:
      "Franklin Templeton's first SIF — long/short equity strategy combining macro model + proprietary multi-factor quant stock selection. NFO 10–24 Apr 2026.",
    url: "https://sifprime.com/sifs/sapphire-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Sapphire Equity Long-Short SIF by Franklin Templeton",
    description: "NFO open 10–24 Apr 2026. ₹10L min. Long/short equity quant strategy. Nifty 500 TRI benchmark.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Franklin Templeton Sapphire Equity Long-Short SIF"
        description="Sapphire Equity Long-Short SIF by Franklin Templeton Mutual Fund. Open-ended long/short equity strategy blending macro-driven allocation with proprietary multi-factor quant stock selection."
        provider="Franklin Templeton Mutual Fund"
        url="https://sifprime.com/sifs/sapphire-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/sapphire-equity-long-short" />
    </>
  );
}
