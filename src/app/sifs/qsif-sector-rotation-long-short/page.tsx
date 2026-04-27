import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "qSIF Sector Rotation Long-Short Fund by Quant — NFO Open",
  description:
    "qSIF Sector Rotation Long-Short Fund by Quant Mutual Fund. India's first Sector Rotation SIF. NFO open 27 April – 11 May 2026. ₹10L min, 80–100% equity in 4 high-potential sectors with limited short overlay, Nifty 500 TRI benchmark.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-sector-rotation-long-short" },
  openGraph: {
    title: "qSIF Sector Rotation Long-Short Fund by Quant Mutual Fund",
    description:
      "India's first Sector Rotation SIF — Quant MF's concentrated 4-sector long-short strategy. NFO 27 Apr – 11 May 2026. ₹10L min, Nifty 500 TRI benchmark.",
    url: "https://sifprime.com/sifs/qsif-sector-rotation-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "qSIF Sector Rotation Long-Short Fund by Quant MF",
    description: "India's first Sector Rotation SIF. NFO 27 Apr – 11 May 2026. ₹10L min. 4 sectors out of 12. Nifty 500 TRI.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="qSIF Sector Rotation Long-Short Fund"
        description="qSIF Sector Rotation Long-Short Fund by Quant Mutual Fund. India's first Sector Rotation SIF — open-ended strategy concentrating 80–100% equity in up to 4 high-potential sectors out of 12, with limited short overlay via derivatives. Benchmark Nifty 500 TRI."
        provider="Quant Mutual Fund"
        url="https://sifprime.com/sifs/qsif-sector-rotation-long-short"
        category="Sector Rotation Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/qsif-sector-rotation-long-short" />
      <FundFAQ
        faqs={buildFundFAQs({
          fundName: "qSIF Sector Rotation Long-Short",
          shortName: "qSIF Sector Rotation",
          amc: "Quant Mutual Fund",
          category: "Sector Rotation Long Short",
          benchmark: "Nifty 500 TRI",
          status: "nfo",
        })}
      />
    </>
  );
}
