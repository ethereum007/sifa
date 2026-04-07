import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Returns — Track Performance of All Specialized Investment Funds",
  description: "Live and historical returns of all SEBI-regulated SIFs in India. Compare fund performance across Equity L-S, Hybrid, Debt and Asset Allocation strategies.",
  alternates: { canonical: "https://sifprime.com/sif-returns" },
  openGraph: {
    title: "SIF Returns — Track Performance of All Specialized Investment Funds",
    description: "Live and historical returns of all SEBI-regulated SIFs in India. Compare fund performance across Equity L-S, Hybrid, Debt and Asset Allocation strategies.",
    url: "https://sifprime.com/sif-returns",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Returns — Track Performance of All Specialized Investment Funds",
    description: "Live and historical returns of all SEBI-regulated SIFs in India. Compare fund performance across Equity L-S, Hybrid, Debt and Asset Allocation strategies.",
  },
};

export default function Page() {
  return <PageClient />;
}
