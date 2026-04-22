import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "WSIF Equity Long-Short Fund by The Wealth Company — NFO Open",
  description:
    "WSIF Equity Long-Short Fund by The Wealth Company Mutual Fund. NFO open 15–29 April 2026. ₹10L minimum, long/short equity strategy benchmarked to Nifty 500 TRI.",
  alternates: { canonical: "https://sifprime.com/sifs/wsif-equity-long-short" },
  openGraph: {
    title: "WSIF Equity Long-Short Fund by The Wealth Company",
    description:
      "The Wealth Company's first SIF — long-biased equity strategy with up to 25% unhedged short exposure via derivatives. NFO 15–29 Apr 2026.",
    url: "https://sifprime.com/sifs/wsif-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "WSIF Equity Long-Short Fund by The Wealth Company",
    description: "NFO open 15–29 Apr 2026. ₹10L min. Long-biased equity with up to 25% unhedged short. Nifty 500 TRI benchmark.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="The Wealth Company WSIF Equity Long-Short Fund"
        description="WSIF Equity Long-Short Fund by The Wealth Company Mutual Fund. Open-ended long-biased equity strategy with limited unhedged short exposure via derivatives."
        provider="The Wealth Company Mutual Fund"
        url="https://sifprime.com/sifs/wsif-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/wsif-equity-long-short" />
    </>
  );
}
