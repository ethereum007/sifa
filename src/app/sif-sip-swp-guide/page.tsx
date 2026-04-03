import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Is SWP Available in SIF? SIP & Partial Withdrawal Rules",
  description: "Is SWP available in SIF? Can you do SIP? Learn about systematic transactions in Specialized Investment Funds — SIP rules, SWP restrictions, and partial withdrawal policies under SEBI.",
  alternates: { canonical: "https://sifprime.com/sif-sip-swp-guide" },
  openGraph: {
    title: "Is SWP Available in SIF? SIP & Partial Withdrawal Rules",
    description: "Complete guide on SIP, SWP, and partial withdrawals in Specialized Investment Funds. Learn what's allowed under SEBI regulations.",
    url: "https://sifprime.com/sif-sip-swp-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Is SWP Available in SIF? SIP & Partial Withdrawal Rules",
    description: "Complete guide on SIP, SWP, and partial withdrawals in Specialized Investment Funds. Learn what's allowed under SEBI regulations.",
  },
};

export default function Page() {
  return <PageClient />;
}
