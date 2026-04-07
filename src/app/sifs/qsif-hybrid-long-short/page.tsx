import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Quant qSIF Hybrid Long Short Fund — NAV, Returns & Review",
  description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/qsif-hybrid-long-short" },
  openGraph: {
    title: "Quant qSIF Hybrid Long Short",
    description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
    url: "https://sifprime.com/sifs/qsif-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Quant qSIF Hybrid Long Short",
    description: "qSIF Hybrid by Quant Mutual Fund — hybrid long-short strategy blending equity & debt. Live NAV, performance vs Nifty 50, drawdown data and independent analysis on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
