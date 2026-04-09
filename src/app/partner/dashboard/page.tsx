import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Partner Dashboard — SIFPrime",
  description:
    "Manage your SIF distribution practice. Track prospects, send reports, and grow your AUM with SIFPrime's B2B Partner Platform.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PageClient />;
}
