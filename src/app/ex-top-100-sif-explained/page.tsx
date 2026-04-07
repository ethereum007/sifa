import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Ex-Top 100 SIF India: The SMID Long-Short Strategy Explained",
  description: "What is an Ex-Top 100 SIF? How ICICI Pru and Quant are targeting India's mid and small-cap universe with long-short strategies — and whether this category is right for you.",
  alternates: { canonical: "https://sifprime.com/ex-top-100-sif-explained" },
  openGraph: {
    title: "Ex-Top 100 SIF India: SMID Long-Short Strategy Explained",
    description: "What is an Ex-Top 100 SIF? How ICICI Pru and Quant are targeting India's mid and small-cap universe with long-short strategies — and whether this category is right for you.",
    url: "https://sifprime.com/ex-top-100-sif-explained",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Ex-Top 100 SIF India: SMID Long-Short Strategy Explained",
    description: "What is an Ex-Top 100 SIF? How ICICI Pru and Quant are targeting India's mid and small-cap universe with long-short strategies — and whether this category is right for you.",
  },
};

export default function Page() {
  return <PageClient />;
}
