import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Titanium Equity Long-Short Fund by Tata — NFO Open",
  description:
    "Titanium Equity Long-Short Fund by Tata Mutual Fund. NFO open 27 April – 11 May 2026. ₹10L min, 80–100% equity with up to 25% unhedged short, Nifty 500 TRI benchmark.",
  alternates: { canonical: "https://sifprime.com/sifs/titanium-equity-long-short" },
  openGraph: {
    title: "Titanium Equity Long-Short Fund by Tata Mutual Fund",
    description:
      "Tata Mutual Fund's Equity Long-Short SIF — NFO 27 Apr – 11 May 2026. ₹10L min, 80–100% equity with up to 25% unhedged short. Nifty 500 TRI benchmark.",
    url: "https://sifprime.com/sifs/titanium-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Titanium Equity Long-Short Fund by Tata MF",
    description: "NFO 27 Apr – 11 May 2026. ₹10L min. 80–100% equity with up to 25% unhedged short. Nifty 500 TRI.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Tata Titanium Equity Long-Short Fund"
        description="Titanium Equity Long-Short Fund by Tata Mutual Fund. Open-ended equity long-short SIF investing 80–100% in listed equity with up to 25% unhedged short via derivatives. Benchmark Nifty 500 TRI."
        provider="Tata Mutual Fund"
        url="https://sifprime.com/sifs/titanium-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/titanium-equity-long-short" />
      <FundFAQ
        faqs={buildFundFAQs({
          fundName: "Titanium Equity Long-Short",
          shortName: "Titanium Equity SIF",
          amc: "Tata Mutual Fund",
          category: "Equity Long Short",
          benchmark: "Nifty 500 TRI",
          status: "nfo",
        })}
      />
    </>
  );
}
