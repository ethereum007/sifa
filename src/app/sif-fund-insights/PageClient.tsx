"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Scale, FileText } from "lucide-react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import Link from "next/link";



const insightCards = [
  {
    title: "SIF Compare",
    description: "Compare SIF with AIF, PMS, and Mutual Funds to find the right investment vehicle for your goals.",
    icon: Scale,
    href: "/sif-compare",
    cta: "View Comparison"
  },
  {
    title: "SIF NAVs",
    description: "Track daily Net Asset Values of all launched SIF funds from top AMCs.",
    icon: BarChart3,
    href: "/sifnav",
    cta: "View NAVs"
  },
  {
    title: "SIF Strategies",
    description: "Explore different SIF investment strategies including Long-Short, Hybrid, and Index funds.",
    icon: TrendingUp,
    href: "/sif-strategies",
    cta: "Explore Strategies"
  },
  {
    title: "What is SIF?",
    description: "Learn everything about Specialized Investment Funds - the new SEBI-regulated investment category.",
    icon: FileText,
    href: "/specialized-investment-fund-sif",
    cta: "Learn More"
  },
];

const SifFundInsights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                SIF Knowledge Hub
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                SIF NAV & Performance
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Your comprehensive resource for understanding Specialized Investment Funds. 
                Compare, analyze, and make informed investment decisions.
              </p>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Insight Cards Grid */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
              Explore SIF Resources
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {insightCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="glass-card p-8 group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    {card.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Need Personalized Guidance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with our experts to understand which SIF strategy suits your investment goals.
            </p>
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifFundInsights;
