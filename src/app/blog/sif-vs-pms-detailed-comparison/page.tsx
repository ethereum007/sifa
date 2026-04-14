import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF vs PMS: Detailed Comparison for Indian Investors in 2026",
  description: "Comprehensive comparison of SIF vs PMS — minimum investment, taxation, liquidity, strategy flexibility, fee structures, and regulatory framework. Find out which is right for you.",
  alternates: { canonical: "https://sifprime.com/blog/sif-vs-pms-detailed-comparison" },
  openGraph: {
    title: "SIF vs PMS: Detailed Comparison for Indian Investors in 2026",
    description: "Comprehensive comparison of SIF vs PMS — minimum investment, taxation, liquidity, strategy flexibility, fee structures, and regulatory framework.",
    url: "https://sifprime.com/blog/sif-vs-pms-detailed-comparison",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF vs PMS: Detailed Comparison for Indian Investors in 2026",
    description: "Comprehensive comparison of SIF vs PMS — minimum investment, taxation, liquidity, strategy flexibility, fee structures, and regulatory framework.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="SIF vs PMS: Detailed Comparison for Indian Investors in 2026"
        description="Comprehensive comparison of SIF vs PMS — minimum investment, taxation, liquidity, strategy flexibility, fee structures, and regulatory framework. Find out which is right for you."
        url="https://sifprime.com/blog/sif-vs-pms-detailed-comparison"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Blog", url: "https://sifprime.com/blog" },
          { name: "SIF vs PMS: Detailed Comparison", url: "https://sifprime.com/blog/sif-vs-pms-detailed-comparison" },
        ]}
      />
      <PageClient />
    </>
  );
}
