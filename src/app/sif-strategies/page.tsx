import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Investment Strategies Explained — Equity L-S, Hybrid, Debt & More",
  description: "Understand the 4 main SIF strategies — Equity Long-Short, Hybrid Long-Short, Debt Long-Short, and Active Asset Allocation. Which strategy suits you?",
  alternates: { canonical: "https://sifprime.com/sif-strategies" },
  openGraph: {
    title: "SIF Investment Strategies Explained — Equity L-S, Hybrid, Debt & More",
    description: "Understand the 4 main SIF strategies — Equity Long-Short, Hybrid Long-Short, Debt Long-Short, and Active Asset Allocation. Which strategy suits you?",
    url: "https://sifprime.com/sif-strategies",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Investment Strategies Explained — Equity L-S, Hybrid, Debt & More",
    description: "Understand the 4 main SIF strategies — Equity Long-Short, Hybrid Long-Short, Debt Long-Short, and Active Asset Allocation. Which strategy suits you?",
  },
};

export default function Page() {
  return <PageClient />;
}
