import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Redemption Rules India: Can You Exit Whenever You Want?",
  description: "Before investing ₹10 Lakhs in a SIF, know exactly when you can get your money back. Daily redemption, interval windows, monthly exits — the complete liquidity guide for all 19 SIFs.",
  alternates: { canonical: "https://sifprime.com/sif-redemption-rules" },
  openGraph: {
    title: "SIF Redemption Rules India: Can You Exit Whenever You Want?",
    description: "Complete liquidity guide for all 19 SIFs — daily, interval, and monthly redemption windows.",
    url: "https://sifprime.com/sif-redemption-rules",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Redemption Rules India: Can You Exit Whenever You Want?",
    description: "Complete liquidity guide for all 19 SIFs — daily, interval, and monthly redemption windows.",
  },
};

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="SIF Redemption Rules India: Can You Exit Whenever You Want?"
        description="Before investing ₹10 Lakhs in a SIF, know exactly when you can get your money back. Daily redemption, interval windows, monthly exits — the complete liquidity guide for all 19 SIFs."
        url="https://sifprime.com/sif-redemption-rules"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF Redemption Rules", url: "https://sifprime.com/sif-redemption-rules" },
        ]}
      />
      <PageClient />
    </>
  );
}
