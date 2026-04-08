import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Compare SIF Funds — Alpha Shield Scores & Returns | SIFPrime",
  description:
    "Compare Hybrid Long-Short, Equity Long-Short and Ex-Top 100 SIFs side by side. Capital protection scores, returns, TER and strategy comparison.",
  alternates: { canonical: "https://sifprime.com/sif-compare" },
  openGraph: {
    title: "Compare SIF Funds Side by Side",
    description:
      "Interactive SIF comparison tool. Alpha Shield scores, returns, costs and strategy analysis.",
    url: "https://sifprime.com/sif-compare",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "Compare SIF Funds Side by Side",
    description: "Interactive SIF comparison tool on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
