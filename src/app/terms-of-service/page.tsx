import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "SIFPrime terms of service. Read our terms and conditions for using the platform.",
  alternates: { canonical: "https://sifprime.com/terms-of-service" },
  openGraph: {
    title: "Terms of Service",
    description: "SIFPrime terms of service. Read our terms and conditions for using the platform.",
    url: "https://sifprime.com/terms-of-service",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Terms of Service",
    description: "SIFPrime terms of service. Read our terms and conditions for using the platform.",
  },
};

export default function Page() {
  return <PageClient />;
}
