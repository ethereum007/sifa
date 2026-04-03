import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "SIFPrime investment disclaimer. Important information about investment risks and mutual fund regulations.",
  alternates: { canonical: "https://sifprime.com/disclaimer" },
  openGraph: {
    title: "Disclaimer",
    description: "SIFPrime investment disclaimer. Important information about investment risks and mutual fund regulations.",
    url: "https://sifprime.com/disclaimer",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Disclaimer",
    description: "SIFPrime investment disclaimer. Important information about investment risks and mutual fund regulations.",
  },
};

export default function Page() {
  return <PageClient />;
}
