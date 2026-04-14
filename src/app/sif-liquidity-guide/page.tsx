import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Liquidity Guide – Redemption Rules & Lock-in Period",
  description: "Understand SIF liquidity rules including lock-in periods, redemption process, exit loads, and settlement timelines for Specialized Investment Funds in India.",
  alternates: { canonical: "https://sifprime.com/sif-liquidity-guide" },
  openGraph: {
    title: "SIF Liquidity Guide – Redemption Rules & Lock-in",
    description: "Complete guide to SIF liquidity – lock-in periods, redemption process, exit loads, and settlement timelines.",
    url: "https://sifprime.com/sif-liquidity-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Liquidity Guide – Redemption Rules & Lock-in",
    description: "Complete guide to SIF liquidity – lock-in periods, redemption process, exit loads, and settlement timelines.",
  },
};

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="SIF Liquidity Guide – Redemption Rules & Lock-in Period"
        description="Understand SIF liquidity rules including lock-in periods, redemption process, exit loads, and settlement timelines for Specialized Investment Funds in India."
        url="https://sifprime.com/sif-liquidity-guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF Liquidity Guide", url: "https://sifprime.com/sif-liquidity-guide" },
        ]}
      />
      <PageClient />
    </>
  );
}
