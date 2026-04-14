import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Derivatives Explained: Covered Calls, Shorts & More",
  description: "What derivative strategies do Indian SIFs use? Covered calls, naked shorts, straddles, pair trades, arbitrage — explained in plain English with fund-by-fund examples from all 14 SIFs.",
  alternates: { canonical: "https://sifprime.com/sif-derivatives-explained" },
  openGraph: {
    title: "SIF Derivatives Explained: Covered Calls, Shorts, Arbitrage & More",
    description: "What derivative strategies do Indian SIFs use? Covered calls, naked shorts, straddles, pair trades, arbitrage — explained in plain English with fund-by-fund examples from all 14 SIFs.",
    url: "https://sifprime.com/sif-derivatives-explained",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Derivatives Explained: Covered Calls, Shorts, Arbitrage & More",
    description: "What derivative strategies do Indian SIFs use? Covered calls, naked shorts, straddles, pair trades, arbitrage — explained in plain English with fund-by-fund examples from all 14 SIFs.",
  },
};

export default function Page() {
  return (
    <>
      <ArticleJsonLd
        headline="SIF Derivatives Explained: Covered Calls, Shorts & More"
        description="What derivative strategies do Indian SIFs use? Covered calls, naked shorts, straddles, pair trades, arbitrage — explained in plain English with fund-by-fund examples from all 14 SIFs."
        url="https://sifprime.com/sif-derivatives-explained"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF Derivatives Explained", url: "https://sifprime.com/sif-derivatives-explained" },
        ]}
      />
      <PageClient />
    </>
  );
}
