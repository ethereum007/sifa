import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule",
  description: "How are SIF gains taxed in India? LTCG at 12.5%, STCG at 20% or slab rate — learn the exact tax treatment for all 14 Specialized Investment Funds and how to plan your exit.",
  alternates: { canonical: "https://sifprime.com/sif-tax-guide" },
  openGraph: {
    title: "SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule",
    description: "How are SIF gains taxed in India? Complete tax guide for all 14 SIFs.",
    url: "https://sifprime.com/sif-tax-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Tax Guide India 2025: LTCG, STCG & the 12-Month Rule",
    description: "How are SIF gains taxed in India? Complete tax guide for all 14 SIFs.",
  },
};

export default function Page() {
  return <PageClient />;
}
