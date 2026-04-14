import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

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
  return (
    <>
      <ArticleJsonLd
        headline="Is SWP Available in SIF? SIP & Partial Withdrawal Rules"
        description="Is SWP available in SIF? Can you do SIP? Learn about systematic transactions in Specialized Investment Funds — SIP rules, SWP restrictions, and partial withdrawal policies under SEBI."
        url="https://sifprime.com/sif-sip-swp-guide"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Guides", url: "https://sifprime.com/blog" },
          { name: "SIF SIP SWP Guide", url: "https://sifprime.com/sif-sip-swp-guide" },
        ]}
      />
      <PageClient />
    </>
  );
}
