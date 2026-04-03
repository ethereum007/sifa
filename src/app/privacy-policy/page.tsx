import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "SIFPrime privacy policy. Learn how we collect, use and protect your personal information.",
  alternates: { canonical: "https://sifprime.com/privacy-policy" },
  openGraph: {
    title: "Privacy Policy",
    description: "SIFPrime privacy policy. Learn how we collect, use and protect your personal information.",
    url: "https://sifprime.com/privacy-policy",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Privacy Policy",
    description: "SIFPrime privacy policy. Learn how we collect, use and protect your personal information.",
  },
};

export default function Page() {
  return <PageClient />;
}
