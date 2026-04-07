"use client";

import Link from "next/link";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { ArrowRight, ArrowLeft, TrendingUp, Shield, PieChart, Target, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import AmcLogo from "@/components/AmcLogo";



const isifFunds = [
  {
    id: "extop100",
    name: "Equity Ex-Top 100 Long-Short Fund",
    shortName: "Ex-Top 100",
    description: "Capture SMID alpha with institutional-grade risk management. Long quality mid & small caps, short overvalued names via F&O.",
    strategy: "Equity Long-Short",
    minInvestment: "₹10 Lakhs",
    benchmark: "Nifty 500 TRI",
    redemption: "T+3 Days",
    isNFO: true,
    nfoEndDate: "30 Jan 2026",
    link: "/sifs/isif/extop100",
    icon: TrendingUp,
    color: "green",
    highlights: [
      "65-100% Ex-Top-100 Equities",
      "Up to 25% unhedged shorts",
      "Global diversification (35%)",
    ],
  },
  {
    id: "hybrid",
    name: "Hybrid Long-Short Fund",
    shortName: "Hybrid",
    description: "A balanced long-short strategy: 65-75% equity for growth, 25-35% debt for stability, and tactical shorts in both.",
    strategy: "Hybrid Long-Short",
    minInvestment: "₹10 Lakhs",
    benchmark: "CRISIL Hybrid 50+50",
    redemption: "Mon & Wed (T+3)",
    isNFO: true,
    nfoEndDate: "30 Jan 2026",
    link: "/sifs/isif/hybrid",
    icon: PieChart,
    color: "blue",
    highlights: [
      "65-75% Equity + 25-35% Debt",
      "Shorts in both equity & debt",
      "Interval fund structure",
    ],
  },
];

const ISIFIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <section className="border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/sifs" className="text-muted-foreground hover:text-primary transition-colors">
                SIFs
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">iSIF</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link 
                href="/sifs" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to all SIFs</span>
              </Link>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <AmcLogo amc="ICICI Prudential Mutual Fund" size="md" />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    iSIF
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    by ICICI Prudential Mutual Fund
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
                Specialized Investment Fund strategies from one of India's largest and most trusted asset managers. 
                Access institutional-grade long-short strategies with MF governance and ₹10 Lakh minimum.
              </p>

              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  SEBI Regulated
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Long-Short Strategies
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  <Target className="w-4 h-4 mr-2" />
                  ₹10L Minimum
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Funds Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                Available Funds
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {isifFunds.map((fund) => (
                  <Link
                    key={fund.id}
                    href={fund.link}
                    className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                  >
                    {/* NFO Badge */}
                    {fund.isNFO && (
                      <div className="absolute -top-3 right-6">
                        <Badge className="bg-green-500 text-white border-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-2" />
                          NFO Live
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        fund.color === "green" ? "bg-green-500/10" : "bg-blue-500/10"
                      }`}>
                        <fund.icon className={`w-6 h-6 ${
                          fund.color === "green" ? "text-green-500" : "text-blue-500"
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {fund.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {fund.strategy}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {fund.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {fund.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Key Details */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Min Investment</p>
                        <p className="text-sm font-semibold text-foreground">{fund.minInvestment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Benchmark</p>
                        <p className="text-sm font-semibold text-foreground">{fund.benchmark}</p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-end mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to invest in iSIF?
              </h2>
              <p className="text-muted-foreground mb-8">
                Get started with ₹10 Lakhs minimum. Our team will guide you through the investment process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="gold" 
                  size="xl"
                  onClick={() => window.open(CONSULTATION_URL, "_blank")}
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  asChild
                >
                  <Link href="/sifs">
                    Explore Other SIFs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ISIFIndex;
