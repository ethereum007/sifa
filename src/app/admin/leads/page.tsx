import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Admin — Lead Management | SIFPrime",
  robots: "noindex, nofollow",
};

export default function AdminLeadsPage() {
  return <PageClient />;
}
