import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
  description: "Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance.",
  alternates: { canonical: "https://sifprime.com/blog/best-sif-to-invest-2026" },
  openGraph: {
    title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
    description: "Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance.",
    url: "https://sifprime.com/blog/best-sif-to-invest-2026",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
    description: "Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds"
        description="Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance."
        url="https://sifprime.com/blog/best-sif-to-invest-2026"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Blog", url: "https://sifprime.com/blog" },
          { name: "Best SIF to Invest in 2026", url: "https://sifprime.com/blog/best-sif-to-invest-2026" },
        ]}
      />
      <PageClient />
    </>
  );
}
