import type { Metadata } from "next";
import dynamic from "next/dynamic";
import FundPageJsonLd from "@/components/FundPageJsonLd";
import RelatedFunds from "@/components/RelatedFunds";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "DynaSIF Active Asset Allocator – 360 ONE Review",
  description: "Review 360 ONE DynaSIF Active Asset Allocator. Dynamic allocation strategy, NAV, portfolio & risk analysis.",
  alternates: { canonical: "https://sifprime.com/dyna-active-asset-allocator" },
  openGraph: {
    title: "Dyna Active Asset Allocator by 360 ONE — SIF Review",
    description: "Review DynaSIF Active Asset Allocator by 360 ONE. Dynamic asset allocation SIF strategy with live NAV & returns. ₹10L min investment. Compare on SIFPrime.",
    url: "https://sifprime.com/dyna-active-asset-allocator",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Dyna Active Asset Allocator by 360 ONE — SIF Review",
    description: "Review DynaSIF Active Asset Allocator by 360 ONE. Dynamic allocation strategy. ₹10L min investment. Compare on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <FundPageJsonLd
        name="360 ONE Dyna SIF Active Asset Allocator"
        description="Review 360 ONE DynaSIF Active Asset Allocator. Dynamic allocation strategy, NAV, portfolio & risk analysis with min investment of ₹10,00,000."
        provider="360 ONE Mutual Fund"
        url="https://sifprime.com/dyna-active-asset-allocator"
        category="Active Asset Allocator SIF"
      />
      <PageClient />
      <RelatedFunds currentPath="/dyna-active-asset-allocator" />
    </>
  );
}
