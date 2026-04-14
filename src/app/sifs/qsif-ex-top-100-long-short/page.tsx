import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "qSIF Equity Ex-Top 100 Long-Short Fund — NAV, Returns & Review",
  description:
    "qSIF Ex-Top 100 Long-Short by Quant Mutual Fund — mid & small cap focus (65-100% outside top 100) with up to 25% short exposure. Live NAV, returns, risk and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-ex-top-100-long-short" },
  openGraph: {
    title: "qSIF Ex-Top 100 Long-Short Fund by Quant Mutual Fund",
    description:
      "Review qSIF Equity Ex-Top 100 Long-Short Fund by Quant MF. Mid & small cap focus with up to 25% short exposure. Live NAV & returns. ₹10L min investment.",
    url: "https://sifprime.com/sifs/qsif-ex-top-100-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "qSIF Ex-Top 100 Long-Short Fund by Quant MF",
    description:
      "Review qSIF Ex-Top 100 Long-Short Fund. Mid & small cap focus with up to 25% short exposure. ₹10L min investment.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="qSIF Equity Ex-Top 100 Long-Short Fund"
        description="qSIF Equity Ex-Top 100 Long-Short Fund by Quant Mutual Fund — open-ended mid & small cap equity long-short SIF, 65-100% in stocks outside the top 100 by market cap with up to 25% unhedged short exposure."
        provider="Quant Mutual Fund"
        url="https://sifprime.com/sifs/qsif-ex-top-100-long-short"
        category="Equity Ex-Top 100 Long-Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/qsif-ex-top-100-long-short" />
    </>
  );
}
