import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "qSIF Equity Long-Short by Quant MF — NAV, Returns & Review",
  description:
    "qSIF Equity Long-Short by Quant Mutual Fund — quant-driven equity long-short SIF benchmarked to NIFTY 500 TRI. Live NAV, since-inception returns and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-equity-long-short" },
  openGraph: {
    title: "qSIF Equity Long-Short by Quant MF — SIFPrime",
    description:
      "Review qSIF Equity Long-Short by Quant MF. Quant-driven equity SIF with ≤25% unhedged short. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/qsif-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "qSIF Equity Long-Short by Quant MF — SIFPrime",
    description:
      "Review qSIF Equity Long-Short by Quant MF. Quant-driven equity SIF. ₹10L min. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Quant qSIF Equity Long-Short Fund"
        description="qSIF Equity Long-Short by Quant Mutual Fund — open-ended equity SIF investing in listed equity and equity-related instruments with limited short exposure (up to 25%) through derivatives."
        provider="Quant Mutual Fund"
        url="https://sifprime.com/sifs/qsif-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/qsif-equity-long-short" />
    </>
  );
}
