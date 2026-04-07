import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Compare SIFs Side by Side — All 14 Specialized Investment Funds | SIFPrime",
  description: "Compare all 14 Specialized Investment Funds (SIFs) in India side by side. View fund names, AMCs, categories, minimum investment and launch details in one comprehensive table.",
  alternates: { canonical: "https://sifprime.com/compare-sifs" },
  openGraph: {
    title: "Compare All 14 SIFs Side by Side | SIFPrime",
    description: "Compare all 14 Specialized Investment Funds (SIFs) in India side by side. View fund names, AMCs, categories, minimum investment and launch details in one comprehensive table.",
    url: "https://sifprime.com/compare-sifs",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Compare All 14 SIFs Side by Side | SIFPrime",
    description: "Compare all 14 Specialized Investment Funds (SIFs) in India side by side. View fund names, AMCs, categories, minimum investment and launch details in one comprehensive table.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
