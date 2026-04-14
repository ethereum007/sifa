import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

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
  return (
    <>
      <ArticleJsonLd
        headline="SIF vs AIF vs PMS vs Mutual Funds – Complete Comparison"
        description="Compare SIF with AIF, PMS & Mutual Funds. Understand minimum investment, taxation, liquidity & strategy differences to choose the right investment vehicle."
        url="https://sifprime.com/sif-vs-mf"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF vs MF", url: "https://sifprime.com/sif-vs-mf" },
        ]}
      />
      <PageClient />
    </>
  );
}
