"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinkHub from "@/components/InternalLinkHub";
import { Badge } from "@/components/ui/badge";



const articles = [
  {
    title: "SIF vs PMS: Detailed Comparison for Indian Investors in 2026",
    description: "Comprehensive comparison of SIF vs PMS — minimum investment, taxation, liquidity, strategy flexibility, fee structures, and regulatory framework.",
    href: "/blog/sif-vs-pms-detailed-comparison",
    category: "Comparison",
    date: "2026-04-07",
  },
  {
    title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
    description: "Ranking of the best SIF funds across equity long-short, hybrid long-short, and ex-top 100 categories by strategy, AMC reputation, and early performance.",
    href: "/blog/best-sif-to-invest-2026",
    category: "Guide",
    date: "2026-04-07",
  },
  {
    title: "Can NRIs Invest in SIF? Complete Guide to SIF Investment for NRIs",
    description: "Everything NRIs need to know — eligibility, KYC, bank accounts, FEMA compliance, taxation, repatriation rules, and which SIFs accept NRI investors.",
    href: "/blog/sif-for-nri-complete-guide",
    category: "Guide",
    date: "2026-04-07",
  },
  {
    title: "SIF SIP: Minimum Amount, How to Start, and Everything You Need to Know",
    description: "Complete guide to SIF SIP — minimum amounts by AMC, how the ₹10L threshold works with SIP, STP/SWP options, and step-by-step setup guide.",
    href: "/blog/sif-sip-minimum-amount",
    category: "Education",
    date: "2026-04-07",
  },
  {
    title: "All 17 SIFs in India Ranked and Explained (2025–26)",
    description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
    href: "/all-sifs-india-ranked-explained",
    category: "Guide",
    date: "2026-03-08",
  },
  {
    title: "Which SIF Should You Invest In?",
    description: "A decision framework to help you pick the right Specialized Investment Fund based on your risk profile, horizon, and goals.",
    href: "/which-sif-should-you-invest-in",
    category: "Guide",
    date: "2026-03-05",
  },
  {
    title: "Ex-Top 100 SIF Explained",
    description: "How ICICI Pru and Quant are targeting India's mid and small-cap universe with long-short strategies.",
    href: "/ex-top-100-sif-explained",
    category: "Strategy",
    date: "2026-03-08",
  },
  {
    title: "Best Hybrid SIF Comparison",
    description: "Head-to-head comparison of the top Hybrid Long-Short SIFs — Altiva, Apex, Magnum, Titanium and more.",
    href: "/best-hybrid-sif",
    category: "Comparison",
    date: "2026-03-01",
  },
  {
    title: "SIF vs PMS vs AIF — What's the Difference?",
    description: "Understand the key structural, regulatory, and return differences between SIFs, PMS, and AIFs.",
    href: "/sif-vs-pms-vs-aif",
    category: "Education",
    date: "2026-02-28",
  },
  {
    title: "SIF Tax Guide",
    description: "Complete taxation guide for Specialized Investment Funds — LTCG, STCG, dividend treatment, and indexation benefits.",
    href: "/sif-tax-guide",
    category: "Tax",
    date: "2026-02-25",
  },
  {
    title: "SIF Redemption Rules",
    description: "Exit loads, lock-in periods, and redemption timelines for every SIF fund in India.",
    href: "/sif-redemption-rules",
    category: "Regulation",
    date: "2026-02-22",
  },
  {
    title: "SIF Liquidity Guide",
    description: "How liquid are SIFs? Daily redemption, settlement cycles, and what to expect when you exit.",
    href: "/sif-liquidity-guide",
    category: "Education",
    date: "2026-02-20",
  },
  {
    title: "SIF Derivatives Explained",
    description: "How SIF fund managers use derivatives — covered calls, straddles, pair trades, and short selling.",
    href: "/sif-derivatives-explained",
    category: "Strategy",
    date: "2026-02-18",
  },
  {
    title: "Is SWP Available in SIF?",
    description: "SIP and SWP availability across SIF funds — which AMCs support systematic plans and how they work.",
    href: "/sif-sip-swp-guide",
    category: "Education",
    date: "2026-02-15",
  },
  {
    title: "NRI Guide to SIF",
    description: "Can NRIs invest in SIFs? Eligibility, documentation, repatriation rules, and tax implications.",
    href: "/nri-sif-guide",
    category: "Guide",
    date: "2026-02-12",
  },
  {
    title: "What is a Specialized Investment Fund (SIF)?",
    description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
    href: "/specialized-investment-fund-sif",
    category: "Education",
    date: "2026-01-27",
  },
  {
    title: "SIF vs Mutual Fund",
    description: "Side-by-side comparison of SIFs and traditional mutual funds — fees, strategy, regulation, and returns.",
    href: "/sifvsmutualfund",
    category: "Comparison",
    date: "2026-02-10",
  },
  {
    title: "SIF: The Billion Dollar Opportunity for Distributors",
    description: "Why SIFs represent a massive revenue opportunity for RIAs and MFDs in India.",
    href: "/distributors/sif-billion-dollar-opportunity",
    category: "Distributors",
    date: "2026-02-08",
  },
];

const categoryColors: Record<string, string> = {
  Guide: "bg-primary/10 text-primary",
  Strategy: "bg-accent/10 text-accent-foreground",
  Comparison: "bg-secondary text-secondary-foreground",
  Education: "bg-muted text-muted-foreground",
  Tax: "bg-primary/10 text-primary",
  Regulation: "bg-secondary text-secondary-foreground",
  Distributors: "bg-accent/10 text-accent-foreground",
};

const Blog = () => {
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
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">SIF Blog</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Insights, Analysis & Education
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                In-depth articles on Specialized Investment Funds — performance, strategy, regulation, and market insights for serious investors.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid gap-6">
              {articles.map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary" className={categoryColors[article.category] || ""}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center self-end sm:self-center">
                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <InternalLinkHub heading="Explore SIF Funds" subheading="All 17 SIFs tracked on SIFPrime, organized by category." variant="funds" />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
