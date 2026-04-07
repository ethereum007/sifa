import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIFPrime — India's #1 Platform for Specialized Investment Funds",
  description: "Compare, track and invest in SEBI-regulated Specialized Investment Funds (SIFs). NAV, returns, strategy breakdown. Min ₹10L investment.",
  alternates: { canonical: "https://sifprime.com/" },
  openGraph: {
    title: "SIFPrime — India's #1 Platform for Specialized Investment Funds",
    description: "Compare, track and invest in SEBI-regulated Specialized Investment Funds (SIFs). NAV, returns, strategy breakdown. Min ₹10L investment.",
    url: "https://sifprime.com/",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIFPrime — India's #1 Platform for Specialized Investment Funds",
    description: "Compare, track and invest in SEBI-regulated Specialized Investment Funds (SIFs). NAV, returns, strategy breakdown. Min ₹10L investment.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
