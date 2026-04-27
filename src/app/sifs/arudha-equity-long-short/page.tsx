import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import FundFAQ from "@/components/FundFAQ";
import { buildFundFAQs } from "@/lib/fundFAQs";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Bandhan Arudha SIF Equity Long-Short Fund — NAV & Review",
  description: "Arudha Equity Long-Short SIF by Bandhan Mutual Fund — open-ended equity strategy with limited short exposure via derivatives. Live NAV, strategy review and manager profiles on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/arudha-equity-long-short" },
  openGraph: {
    title: "Arudha Equity Long-Short by Bandhan — SIF Fund Review",
    description: "Review Arudha Equity Long-Short SIF by Bandhan MF. 80–100% equity with up to 25% unhedged short via derivatives. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/sifs/arudha-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Arudha Equity Long-Short by Bandhan — SIF Fund Review",
    description: "Arudha Equity Long-Short SIF by Bandhan MF. 80–100% equity + 25% unhedged short. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="Bandhan Arudha SIF Equity Long-Short"
        description="Arudha Equity Long-Short SIF by Bandhan Mutual Fund — open-ended equity investment strategy investing 80–100% in listed equity and equity-related instruments with up to 25% unhedged short exposure through exchange-traded derivatives. Min investment ₹10,00,000."
        provider="Bandhan Mutual Fund"
        url="https://sifprime.com/sifs/arudha-equity-long-short"
        category="Equity Long Short SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/sifs/arudha-equity-long-short" />
    <FundFAQ
        faqs={buildFundFAQs({
      fundName: "Arudha Equity Long-Short",
      shortName: "Arudha Equity SIF",
      amc: "Bandhan Mutual Fund",
      category: "Equity Long Short",
      benchmark: "Nifty 500 TRI",
      inceptionDate: "February 2026",
        })}
      />
      </>
  );
}
