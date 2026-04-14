import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF vs PMS vs AIF: Which One Should HNIs Choose in 2025?",
  description: "Confused between SIF, PMS, and AIF? This side-by-side comparison breaks down minimums, costs, liquidity, tax treatment, and which structure suits each HNI investor type.",
  alternates: { canonical: "https://sifprime.com/sif-vs-pms-vs-aif" },
  openGraph: {
    title: "SIF vs PMS vs AIF: Which One Should HNIs Choose in 2025?",
    description: "Side-by-side comparison of SIF, PMS, and AIF — minimums, costs, liquidity, and tax treatment for HNI investors.",
    url: "https://sifprime.com/sif-vs-pms-vs-aif",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF vs PMS vs AIF: Which One Should HNIs Choose in 2025?",
    description: "Side-by-side comparison of SIF, PMS, and AIF — minimums, costs, liquidity, and tax treatment for HNI investors.",
  },
};

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="SIF vs PMS vs AIF: Which One Should HNIs Choose in 2025?"
        description="Confused between SIF, PMS, and AIF? This side-by-side comparison breaks down minimums, costs, liquidity, tax treatment, and which structure suits each HNI investor type."
        url="https://sifprime.com/sif-vs-pms-vs-aif"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF vs PMS vs AIF", url: "https://sifprime.com/sif-vs-pms-vs-aif" },
        ]}
      />
      <PageClient />
    </>
  );
}
