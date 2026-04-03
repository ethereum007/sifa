import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Distribution Partner Program — For RIAs & MFDs",
  description: "Partner with SIFPrime as an RIA or MFD to offer Specialized Investment Funds to your HNI clients. Revenue sharing, co-branded support, and dedicated tools.",
  alternates: { canonical: "https://sifprime.com/distributors" },
  openGraph: {
    title: "SIF Distribution Partner Program — For RIAs & MFDs",
    description: "Partner with SIFPrime as an RIA or MFD to offer Specialized Investment Funds to your HNI clients. Revenue sharing, co-branded support, and dedicated tools.",
    url: "https://sifprime.com/distributors",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Distribution Partner Program — For RIAs & MFDs",
    description: "Partner with SIFPrime as an RIA or MFD to offer Specialized Investment Funds to your HNI clients. Revenue sharing, co-branded support, and dedicated tools.",
  },
};

export default function Page() {
  return <PageClient />;
}
