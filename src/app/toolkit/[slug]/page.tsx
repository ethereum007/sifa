import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { TOOLKIT_MODULES } from "./modules";

const PageClient = dynamic(() => import("./PageClient"));

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const module = TOOLKIT_MODULES[slug];
  if (!module) {
    return { title: "Toolkit module — SIFPrime", description: "SIF distributor toolkit module." };
  }
  return {
    title: `${module.title} — SIFPrime Toolkit`,
    description: module.description,
    alternates: { canonical: `https://sifprime.com/toolkit/${slug}` },
    openGraph: {
      title: `${module.title} — SIFPrime Partner Toolkit`,
      description: module.description,
      url: `https://sifprime.com/toolkit/${slug}`,
      type: "article",
    },
  };
}

export const revalidate = 86400;

export function generateStaticParams() {
  return Object.keys(TOOLKIT_MODULES).map((slug) => ({ slug }));
}

export default async function Page({ params }: RouteProps) {
  const { slug } = await params;
  const module = TOOLKIT_MODULES[slug];
  if (!module) notFound();
  return <PageClient slug={slug} module={module} />;
}
