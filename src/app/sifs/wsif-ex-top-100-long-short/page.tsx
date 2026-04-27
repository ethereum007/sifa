import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "WSIF Equity Ex-Top 100 Long-Short Fund by The Wealth Company — NFO Open",
  description:
    "WSIF Equity Ex-Top 100 Long-Short Fund by The Wealth Company Mutual Fund. NFO open 15–29 April 2026. ₹10L minimum. Mid/small-cap focused long-short equity strategy (65-100% ex-top 100 companies), benchmarked to Nifty 500 TRI.",
  alternates: { canonical: "https://sifprime.com/sifs/wsif-ex-top-100-long-short" },
  openGraph: {
    title: "WSIF Equity Ex-Top 100 Long-Short Fund by The Wealth Company",
    description:
      "The Wealth Company's mid/small-cap SIF — 65-100% in companies outside top 100 by market cap, with up to 25% unhedged short via derivatives. NFO 15–29 Apr 2026.",
    url: "https://sifprime.com/sifs/wsif-ex-top-100-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "WSIF Equity Ex-Top 100 Long-Short Fund by The Wealth Company",
    description: "NFO open 15–29 Apr 2026. ₹10L min. Mid/small-cap alpha with up to 25% unhedged short. Nifty 500 TRI benchmark.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="The Wealth Company WSIF Equity Ex-Top 100 Long-Short Fund"
        description="WSIF Equity Ex-Top 100 Long-Short Fund by The Wealth Company Mutual Fund. Open-ended equity strategy investing primarily in companies outside the top 100 by market capitalization, with limited unhedged short exposure via derivatives."
        provider="The Wealth Company Mutual Fund"
        url="https://sifprime.com/sifs/wsif-ex-top-100-long-short"
        category="Equity Ex-Top 100 Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/wsif-ex-top-100-long-short" />
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "WSIF Equity Ex-Top 100 Long-Short",
      shortName: "WSIF Ex-Top 100",
      amc: "The Wealth Company Mutual Fund",
      category: "Equity Ex-Top 100",
      benchmark: "Nifty 500 TRI",
      status: "nfo",
        })}
      />
      </>
  );
}
