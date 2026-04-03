import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF vs Mutual Fund – Data-Driven Return Comparison",
  description: "Compare SIF strategies vs mutual funds with real return data across all 7 SEBI-approved strategy categories. See which delivers better risk-adjusted returns.",
  alternates: { canonical: "https://sifprime.com/sifvsmutualfund" },
  openGraph: {
    title: "SIF vs Mutual Fund – Data-Driven Return Comparison",
    description: "Compare SIF strategies vs mutual funds with real return data across all 7 SEBI-approved strategy categories.",
    url: "https://sifprime.com/sifvsmutualfund",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF vs Mutual Fund – Data-Driven Return Comparison",
    description: "Compare SIF strategies vs mutual funds with real return data across all 7 SEBI-approved strategy categories.",
  },
};

export default function Page() {
  return <PageClient />;
}
