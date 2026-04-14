import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "DynaSIF Equity Long-Short Fund — NAV, Returns & Review | 360 ONE",
  description:
    "DynaSIF Equity Long-Short by 360 ONE AMC — an active equity SIF (80–100% long equity, up to 25% short via derivatives). Live NAV, since-inception returns and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/dyna-equity-long-short" },
  openGraph: {
    title: "DynaSIF Equity Long-Short by 360 ONE AMC",
    description:
      "360 ONE DynaSIF Equity Long-Short SIF — 80–100% equity with up to 25% short via derivatives. BSE 500 TRI benchmark. ₹10L min investment. Review on SIFPrime.",
    url: "https://sifprime.com/sifs/dyna-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "DynaSIF Equity Long-Short by 360 ONE AMC",
    description:
      "360 ONE DynaSIF Equity L/S SIF. 80–100% long equity, up to 25% short. BSE 500 TRI benchmark. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="360 ONE DynaSIF Equity Long-Short Fund"
        description="DynaSIF Equity Long-Short by 360 ONE AMC — an open-ended Equity Long-Short SIF investing 80–100% in equity & equity-related instruments with up to 25% short exposure via unhedged equity derivatives."
        provider="360 ONE Mutual Fund"
        url="https://sifprime.com/sifs/dyna-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/dyna-equity-long-short" />
    </>
  );
}
