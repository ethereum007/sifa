import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "qSIF Active Asset Allocator Long-Short Fund — NFO Open",
  description:
    "qsif Active Asset Allocator Long-Short Fund by quant Mutual Fund. NFO open 2–16 April 2026. ₹10L minimum, dynamic multi-asset strategy across equity, debt, commodities & InvITs.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-active-asset-allocator-long-short" },
  openGraph: {
    title: "qSIF Active Asset Allocator Long-Short Fund by quant MF",
    description:
      "Interval multi-asset long/short SIF from quant MF. Equity + Debt + Commodity derivatives + InvITs with up to 25% short. NFO 2–16 Apr 2026.",
    url: "https://sifprime.com/sifs/qsif-active-asset-allocator-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "qSIF Active Asset Allocator Long-Short — quant MF",
    description: "NFO open 2–16 Apr 2026. ₹10L min. Dynamic multi-asset SIF. Composite benchmark.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="qsif Active Asset Allocator Long-Short Fund"
        description="qsif Active Asset Allocator Long-Short Fund by quant Mutual Fund. Interval strategy dynamically investing across equity, debt, derivatives, InvITs and commodity derivatives with up to 25% short exposure."
        provider="quant Mutual Fund"
        url="https://sifprime.com/sifs/qsif-active-asset-allocator-long-short"
        category="Active Asset Allocator SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/qsif-active-asset-allocator-long-short" />
    </>
  );
}
