import type { Metadata } from "next";
import Link from "next/link";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { ArrowRight, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "All SIF Funds – Browse Specialized Investment Funds by AMC",
  description:
    "Browse all Specialized Investment Fund schemes by AMC. Compare strategies, NAV and returns across India's top fund houses.",
  alternates: { canonical: "https://sifprime.com/sifs" },
  openGraph: {
    title: "All SIF Funds by AMC",
    description:
      "Browse all Specialized Investment Fund schemes by AMC. Compare strategies, NAV and returns across India's top fund houses.",
    url: "https://sifprime.com/sifs",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "All SIF Funds by AMC",
    description:
      "Browse all Specialized Investment Fund schemes by AMC. Compare strategies, NAV and returns across India's top fund houses.",
  },
};

export const revalidate = 86400;

const amcFunds = [
  {
    id: "isif",
    name: "iSIF",
    fullName: "ICICI Prudential Mutual Fund",
    description:
      "Specialized Investment Fund strategies by one of India's largest asset managers",
    fundsCount: 2,
    accent: "from-blue-500 to-cyan-500",
    link: "/sifs/isif",
  },
  {
    id: "qsif",
    name: "qSIF",
    fullName: "Quant Mutual Fund",
    description:
      "Quant-driven equity & hybrid long-short strategies with active asset allocation",
    fundsCount: 4,
    accent: "from-amber-500 to-orange-500",
    link: "/sifs/qsif-equity-long-short",
  },
  {
    id: "dyna",
    name: "Dyna SIF",
    fullName: "360 ONE Asset",
    description:
      "Equity long-short and active asset allocator strategies from 360 ONE",
    fundsCount: 2,
    accent: "from-emerald-500 to-teal-500",
    link: "/sifs/dyna-equity-long-short",
  },
  {
    id: "altiva",
    name: "Altiva SIF",
    fullName: "Edelweiss Mutual Fund",
    description: "Hybrid long-short strategy from Edelweiss Asset Management",
    fundsCount: 1,
    accent: "from-violet-500 to-purple-500",
    link: "/sifs/altiva-hybrid-long-short",
  },
  {
    id: "magnum",
    name: "Magnum SIF",
    fullName: "SBI Mutual Fund",
    description: "Hybrid long-short strategy from India's largest AMC",
    fundsCount: 1,
    accent: "from-rose-500 to-pink-500",
    link: "/sifs/magnum-hybrid-long-short",
  },
  {
    id: "titanium",
    name: "Titanium SIF",
    fullName: "Tata Mutual Fund",
    description: "Hybrid long-short strategy from Tata Asset Management",
    fundsCount: 1,
    accent: "from-sky-500 to-indigo-500",
    link: "/sifs/titanium-hybrid-long-short",
  },
  {
    id: "arudha",
    name: "Arudha SIF",
    fullName: "Bandhan Mutual Fund",
    description: "Equity and hybrid long-short strategies from Bandhan AMC",
    fundsCount: 2,
    accent: "from-yellow-500 to-amber-500",
    link: "/sifs/arudha-hybrid-long-short",
  },
  {
    id: "apex",
    name: "Apex SIF",
    fullName: "Aditya Birla Sun Life Mutual Fund",
    description: "Hybrid long-short strategy from ABSL Mutual Fund",
    fundsCount: 1,
    accent: "from-red-500 to-rose-500",
    link: "/sifs/apex-hybrid-long-short",
  },
  {
    id: "diviniti",
    name: "Diviniti SIF",
    fullName: "ITI Mutual Fund",
    description: "Equity long-short strategy from ITI Asset Management",
    fundsCount: 1,
    accent: "from-cyan-500 to-blue-500",
    link: "/sifs/diviniti-equity-long-short",
  },
  {
    id: "sapphire",
    name: "Sapphire SIF",
    fullName: "Franklin Templeton India",
    description:
      "Equity long-short strategy from Franklin Templeton (NFO open)",
    fundsCount: 1,
    accent: "from-lime-500 to-emerald-500",
    link: "/sifs/sapphire-equity-long-short",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Specialized Investment Funds
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                All SIF Funds in India
                <span className="block text-2xl md:text-3xl text-muted-foreground mt-3 font-medium">
                  by Asset Management Company
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every SEBI-registered Specialized Investment Fund in India,
                grouped by AMC. 19 SIF schemes across 11 fund houses, ₹10 Lakh
                minimum, mutual-fund governance.
              </p>
            </div>
          </div>
        </section>

        {/* AMC Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Browse SIFs by Fund House
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amcFunds.map((amc) => (
                  <Link
                    key={amc.id}
                    href={amc.link}
                    className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${amc.accent} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}
                    />

                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Briefcase className="w-7 h-7 text-primary" />
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {amc.name}
                      </h3>
                      <p className="text-sm text-primary/80 mb-3">
                        {amc.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {amc.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {amc.fundsCount} fund
                          {amc.fundsCount > 1 ? "s" : ""} available
                        </span>
                        <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          View Funds
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-card/50 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">₹10L</p>
                <p className="text-sm text-muted-foreground">Min Investment</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">10</p>
                <p className="text-sm text-muted-foreground">AMC Partners</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">14</p>
                <p className="text-sm text-muted-foreground">Live Schemes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">SEBI</p>
                <p className="text-sm text-muted-foreground">Regulated</p>
              </div>
            </div>
          </div>
        </section>

        {/* Intro prose — SEO body copy */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What are Specialized Investment Funds?
              </h2>
              <p>
                Specialized Investment Funds (SIFs) are SEBI&apos;s newest mutual-fund
                category, launched on 1 April 2025. They sit between traditional
                mutual funds and PMS — offering strategy-based portfolios
                (long-short equity, active asset allocation, ex-Top-100) with a
                ₹10 lakh minimum instead of PMS&apos;s ₹50 lakh, while retaining the
                governance, daily NAV and tax efficiency of the mutual-fund
                framework.
              </p>
              <p>
                SIFPrime tracks every live scheme from 10 Indian AMCs, updates
                NAVs daily, and ranks funds by our proprietary Alpha Shield
                Score. Use this directory to browse funds by AMC, or jump
                straight to the{" "}
                <Link href="/sif-compare" className="text-primary underline">
                  comparison tool
                </Link>
                ,{" "}
                <Link href="/sif-performance" className="text-primary underline">
                  performance tracker
                </Link>
                , or{" "}
                <Link
                  href="/all-sifs-india-ranked-explained"
                  className="text-primary underline"
                >
                  ranked list of all 19 SIFs
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Not sure which fund to choose?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our experts can help you understand which SIF strategy aligns
                with your investment goals.
              </p>
              <Button variant="gold" size="xl" asChild>
                <a
                  href={CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
