import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "What is a Specialized Investment Fund (SIF)?",
  description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
  alternates: { canonical: "https://sifprime.com/sif-explained" },
  openGraph: {
    title: "What is a Specialized Investment Fund (SIF)?",
    description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
    url: "https://sifprime.com/sif-explained",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "What is a Specialized Investment Fund (SIF)?",
    description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
  },
};

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="What is a Specialized Investment Fund (SIF)?"
        description="SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS."
        url="https://sifprime.com/what-is-sif"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "What is a SIF", url: "https://sifprime.com/what-is-sif" },
        ]}
      />
      <PageClient />
    </>
  );
}
