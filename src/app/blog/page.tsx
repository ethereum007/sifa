import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

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
  return <PageClient />;
}
