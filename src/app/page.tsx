import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HomepageSeoContent from "@/components/HomepageSeoContent";
import HomepageJsonLd from "@/components/HomepageJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Comparison Platform India \u2014 Compare Specialized Investment Funds | SIFPrime",
  description:
    "Compare all SEBI-regulated Specialized Investment Funds (SIFs) in India. Live NAV, returns, strategy breakdown, SIF vs MF vs PMS comparison. Min \u20b910L investment. 19 SIFs tracked.",
  alternates: { canonical: "https://sifprime.com/" },
  openGraph: {
    title: "SIF Comparison Platform India \u2014 Compare Specialized Investment Funds | SIFPrime",
    description:
      "Compare all SEBI-regulated Specialized Investment Funds (SIFs) in India. Live NAV, returns, strategy breakdown, SIF vs MF vs PMS comparison.",
    url: "https://sifprime.com/",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "SIF Comparison Platform India \u2014 Compare Specialized Investment Funds | SIFPrime",
    description:
      "Compare all SEBI-regulated Specialized Investment Funds (SIFs) in India. Live NAV, returns, strategy breakdown.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <HomepageJsonLd />
      <PageClient />
      <HomepageSeoContent />
    </>
  );
}
