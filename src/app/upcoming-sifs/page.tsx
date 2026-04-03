import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Upcoming SIF Launches – New Specialized Investment Funds",
  description: "Stay updated on upcoming SIF fund launches from India's top AMCs. New Specialized Investment Fund schemes being launched soon.",
  alternates: { canonical: "https://sifprime.com/upcoming-sifs" },
  openGraph: {
    title: "Upcoming SIF Launches",
    description: "Stay updated on upcoming SIF fund launches from India's top AMCs. New Specialized Investment Fund schemes being launched soon.",
    url: "https://sifprime.com/upcoming-sifs",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Upcoming SIF Launches",
    description: "Stay updated on upcoming SIF fund launches from India's top AMCs. New Specialized Investment Fund schemes being launched soon.",
  },
};

export default function Page() {
  return <PageClient />;
}
