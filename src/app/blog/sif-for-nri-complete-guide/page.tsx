import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Can NRIs Invest in SIF? Complete Guide to SIF Investment for NRIs",
  description: "Complete guide to NRI SIF investment — eligibility, KYC requirements, repatriation rules, FEMA compliance, taxation, and step-by-step process for NRIs investing in Specialized Investment Funds.",
  alternates: { canonical: "https://sifprime.com/blog/sif-for-nri-complete-guide" },
  openGraph: {
    title: "Can NRIs Invest in SIF? Complete Guide to SIF Investment for NRIs",
    description: "Complete guide to NRI SIF investment — eligibility, KYC, repatriation, taxation, and step-by-step process for NRIs investing in Specialized Investment Funds.",
    url: "https://sifprime.com/blog/sif-for-nri-complete-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Can NRIs Invest in SIF? Complete Guide to SIF Investment for NRIs",
    description: "Complete guide to NRI SIF investment — eligibility, KYC, repatriation, taxation, and step-by-step process for NRIs investing in Specialized Investment Funds.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="Can NRIs Invest in SIF? Complete Guide to SIF Investment for NRIs"
        description="Complete guide to NRI SIF investment — eligibility, KYC requirements, repatriation rules, FEMA compliance, taxation, and step-by-step process for NRIs investing in Specialized Investment Funds."
        url="https://sifprime.com/blog/sif-for-nri-complete-guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Blog", url: "https://sifprime.com/blog" },
          { name: "SIF for NRI Complete Guide", url: "https://sifprime.com/blog/sif-for-nri-complete-guide" },
        ]}
      />
      <PageClient />
    </>
  );
}
