import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF NAV & Performance — Live Data for All Funds",
  description: "Track daily NAV and performance of all Specialized Investment Funds in India. Updated live from SEBI-registered AMCs.",
  alternates: { canonical: "https://sifprime.com/sif-nav-performance" },
  openGraph: {
    title: "SIF NAV & Performance — Live Data for All Funds",
    description: "Track daily NAV and performance of all Specialized Investment Funds in India. Updated live from SEBI-registered AMCs.",
    url: "https://sifprime.com/sif-nav-performance",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF NAV & Performance — Live Data for All Funds",
    description: "Track daily NAV and performance of all Specialized Investment Funds in India. Updated live from SEBI-registered AMCs.",
  },
};

export default function Page() {
  return <PageClient />;
}
