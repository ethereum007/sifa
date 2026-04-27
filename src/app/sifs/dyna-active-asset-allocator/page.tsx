import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "DynaSIF Active Asset Allocator Long-Short — NAV, Allocation & Review | 360 ONE",
  description:
    "DynaSIF Active Asset Allocator Long-Short by 360 ONE AMC — an interval SIF dynamically allocating across equity (20–50%), debt (20–65%), InvITs, commodity derivatives and up to 25% unhedged shorts. Benchmark 25% BSE SENSEX TRI + 60% CRISIL ST Bond + 15% iCOMDEX. Review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/dyna-active-asset-allocator" },
  openGraph: {
    title: "DynaSIF Active Asset Allocator Long-Short by 360 ONE AMC",
    description:
      "360 ONE DynaSIF AAA L/S — interval multi-asset SIF. Equity 20–50%, Debt 20–65%, ETCDs 0–25%, InvITs 0–20%, short derivatives up to 25%. ₹10L min (₹1L accredited). Review on SIFPrime.",
    url: "https://sifprime.com/sifs/dyna-active-asset-allocator",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "DynaSIF Active Asset Allocator by 360 ONE",
    description:
      "360 ONE DynaSIF AAA — interval multi-asset SIF, 25% short cap, composite benchmark. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="360 ONE DynaSIF Active Asset Allocator Long-Short Fund"
        description="DynaSIF Active Asset Allocator Long-Short by 360 ONE AMC — an interval SIF dynamically investing across equity (20–50%), debt & money market (20–65%), InvITs (0–20%), commodity derivatives (0–25%) and up to 25% unhedged short exposure through derivatives."
        provider="360 ONE Mutual Fund"
        url="https://sifprime.com/sifs/dyna-active-asset-allocator"
        category="Active Asset Allocator Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/dyna-active-asset-allocator" />
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "Dyna Active Asset Allocator",
      shortName: "Dyna AAA",
      amc: "360 ONE Asset",
      category: "Active Asset Allocator",
      benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
      inceptionDate: "November 2025",
        })}
      />
      </>
  );
}
