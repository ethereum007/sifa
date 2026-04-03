import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Redemption Rules India: Can You Exit Whenever You Want?",
  description: "Before investing ₹10 Lakhs in a SIF, know exactly when you can get your money back. Daily redemption, interval windows, monthly exits — the complete liquidity guide for all 14 SIFs.",
  alternates: { canonical: "https://sifprime.com/sif-redemption-rules" },
  openGraph: {
    title: "SIF Redemption Rules India: Can You Exit Whenever You Want?",
    description: "Complete liquidity guide for all 14 SIFs — daily, interval, and monthly redemption windows.",
    url: "https://sifprime.com/sif-redemption-rules",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Redemption Rules India: Can You Exit Whenever You Want?",
    description: "Complete liquidity guide for all 14 SIFs — daily, interval, and monthly redemption windows.",
  },
};

export default function Page() {
  return <PageClient />;
}
