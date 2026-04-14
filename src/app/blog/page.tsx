import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ItemListJsonLd from "@/components/ItemListJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Blog — Insights, Analysis & Investor Education",
  description: "In-depth articles on Specialized Investment Funds, SIF performance, strategy explainers, and market insights for HNI investors.",
  alternates: { canonical: "https://sifprime.com/blog" },
  openGraph: {
    title: "SIF Blog — Insights, Analysis & Investor Education",
    description: "In-depth articles on Specialized Investment Funds, SIF performance, strategy explainers, and market insights for HNI investors.",
    url: "https://sifprime.com/blog",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Blog — Insights, Analysis & Investor Education",
    description: "In-depth articles on Specialized Investment Funds, SIF performance, strategy explainers, and market insights for HNI investors.",
  },
};

export default function Page() {
  return (
    <>
      <ItemListJsonLd
        name="SIFPrime Blog Posts"
        items={[
          { name: "Best SIF to Invest in 2026", url: "https://sifprime.com/blog/best-sif-to-invest-2026" },
          { name: "SIF vs PMS: Detailed Comparison", url: "https://sifprime.com/blog/sif-vs-pms-detailed-comparison" },
          { name: "SIF for NRI: Complete Guide", url: "https://sifprime.com/blog/sif-for-nri-complete-guide" },
          { name: "SIF SIP Minimum Amount", url: "https://sifprime.com/blog/sif-sip-minimum-amount" },
        ]}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Blog", url: "https://sifprime.com/blog" },
        ]}
      />
      <PageClient />
    </>
  );
}
