import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Quant qSIF Ex-Top 100 Long Short Fund — NAV & Review",
  description: "qSIF Ex-Top 100 by Quant Mutual Fund — high-conviction mid & small cap long-short SIF. Live NAV, performance and independent analysis on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/qsif-ex-top-100-long-short" },
  openGraph: {
    title: "qSIF Ex-Top 100 by Quant — Small & Mid Cap SIF Strategy",
    description: "Review qSIF Ex-Top 100 Long Short by Quant MF. Mid & small cap equity long-short SIF strategy. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/qsif-ex-top-100-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "qSIF Ex-Top 100 by Quant — Small & Mid Cap SIF Strategy",
    description: "Review qSIF Ex-Top 100 Long Short by Quant MF. Mid & small cap equity long-short SIF. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Quant qSIF Ex-Top 100 Long Short"
        description="qSIF Ex-Top 100 by Quant Mutual Fund — high-conviction mid & small cap long-short SIF. Live NAV, performance and independent analysis on SIFPrime with min investment of ₹10,00,000."
        provider="Quant Mutual Fund"
        url="https://sifprime.com/qsif-ex-top-100-long-short"
        category="Equity Ex-Top 100 SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/qsif-ex-top-100-long-short" />
    </>
  );
}
