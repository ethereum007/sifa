import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF vs AIF vs PMS vs Mutual Funds – Complete Comparison",
  description: "Compare SIF with AIF, PMS & Mutual Funds. Understand minimum investment, taxation, liquidity & strategy differences to choose the right investment vehicle.",
  alternates: { canonical: "https://sifprime.com/sif-compare" },
  openGraph: {
    title: "SIF vs AIF vs PMS vs Mutual Funds",
    description: "Complete comparison of Specialized Investment Funds with AIF, PMS and Mutual Funds.",
    url: "https://sifprime.com/sif-compare",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF vs AIF vs PMS vs Mutual Funds",
    description: "Complete comparison of Specialized Investment Funds with AIF, PMS and Mutual Funds.",
  },
};

export default function Page() {
  return <PageClient />;
}
