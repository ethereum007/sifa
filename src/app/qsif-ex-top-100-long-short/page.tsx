import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Quant qSIF Ex-Top 100 Long Short Fund — NAV & Review",
  description: "qSIF Ex-Top 100 by Quant Mutual Fund — high-conviction mid & small cap long-short SIF. Live NAV, performance and independent analysis on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/qsif-ex-top-100-long-short" },
  openGraph: {
    title: "Quant qSIF Ex-Top 100 Long Short",
    description: "qSIF Ex-Top 100 by Quant Mutual Fund — high-conviction mid & small cap long-short SIF. Live NAV, performance and independent analysis on SIFPrime.",
    url: "https://sifprime.com/qsif-ex-top-100-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Quant qSIF Ex-Top 100 Long Short",
    description: "qSIF Ex-Top 100 by Quant Mutual Fund — high-conviction mid & small cap long-short SIF. Live NAV, performance and independent analysis on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
