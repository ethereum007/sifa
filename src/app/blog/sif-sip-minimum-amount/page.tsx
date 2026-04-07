import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF SIP: Minimum Amount, How to Start, and Everything You Need to Know",
  description: "Complete guide to SIF SIP — minimum SIP amount, how the ₹10L threshold works, STP/SWP options, frequency choices, AMC-wise SIP details, and step-by-step guide to starting SIP in SIF.",
  alternates: { canonical: "https://sifprime.com/blog/sif-sip-minimum-amount" },
  openGraph: {
    title: "SIF SIP: Minimum Amount, How to Start, and Everything You Need to Know",
    description: "Complete guide to SIF SIP — minimum SIP amount, ₹10L threshold, STP/SWP options, and step-by-step guide to starting SIP in Specialized Investment Funds.",
    url: "https://sifprime.com/blog/sif-sip-minimum-amount",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF SIP: Minimum Amount, How to Start, and Everything You Need to Know",
    description: "Complete guide to SIF SIP — minimum SIP amount, ₹10L threshold, STP/SWP options, and step-by-step guide to starting SIP in Specialized Investment Funds.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
