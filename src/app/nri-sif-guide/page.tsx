import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "NRI Guide to SIF Investments in India 2025: Rules & Best Funds",
  description: "Can NRIs invest in Specialized Investment Funds in India? Yes. Here's the complete NRI guide — eligibility, NRE/NRO account rules, KYC, repatriation, taxation, and the best SIFs for NRI portfolios.",
  alternates: { canonical: "https://sifprime.com/nri-sif-guide" },
  openGraph: {
    title: "NRI Guide to SIF Investments in India 2025",
    description: "Can NRIs invest in Specialized Investment Funds in India? Yes. Here's the complete NRI guide — eligibility, NRE/NRO account rules, KYC, repatriation, taxation, and the best SIFs for NRI portfolios.",
    url: "https://sifprime.com/nri-sif-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "NRI Guide to SIF Investments in India 2025",
    description: "Can NRIs invest in Specialized Investment Funds in India? Yes. Here's the complete NRI guide — eligibility, NRE/NRO account rules, KYC, repatriation, taxation, and the best SIFs for NRI portfolios.",
  },
};

export default function Page() {
  return <PageClient />;
}
