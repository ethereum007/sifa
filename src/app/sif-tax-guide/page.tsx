import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule",
  description: "How are SIF gains taxed in India? LTCG at 12.5%, STCG at 20% or slab rate — learn the exact tax treatment for all 14 Specialized Investment Funds and how to plan your exit.",
  alternates: { canonical: "https://sifprime.com/sif-tax-guide" },
  openGraph: {
    title: "SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule",
    description: "How are SIF gains taxed in India? Complete tax guide for all 17 SIFs.",
    url: "https://sifprime.com/sif-tax-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule",
    description: "How are SIF gains taxed in India? Complete tax guide for all 17 SIFs.",
  },
};

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule"
        description="How are SIF gains taxed in India? LTCG at 12.5%, STCG at 20% or slab rate — learn the exact tax treatment for all 14 Specialized Investment Funds and how to plan your exit."
        url="https://sifprime.com/sif-tax-guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF Tax Guide", url: "https://sifprime.com/sif-tax-guide" },
        ]}
      />
      <PageClient />
    </>
  );
}
