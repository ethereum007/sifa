import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Which SIF is Right for Me? Free 2-Minute Quiz | SIFPrime",
  description:
    "Take our 5-question quiz and get your personalised SIF recommendation. Based on your risk profile, goals and investment horizon.",
  alternates: { canonical: "https://sifprime.com/sif-quiz" },
  openGraph: {
    title: "Find Your Ideal SIF — Free 2-Minute Quiz",
    description:
      "Answer 5 questions, get a personalised SIF fund recommendation. Match your risk profile with the right Specialized Investment Fund.",
    url: "https://sifprime.com/sif-quiz",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "Find Your Ideal SIF — Free Quiz",
    description:
      "5 questions to find your perfect Specialized Investment Fund match.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
