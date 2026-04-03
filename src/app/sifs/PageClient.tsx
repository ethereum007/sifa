"use client";

import Link from "next/link";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { ArrowRight, Building2, TrendingUp, Shield, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



const amcFunds = [
  {
    id: "isif",
    name: "iSIF",
    fullName: "ICICI Prudential Mutual Fund",
    description: "Specialized Investment Fund strategies by one of India's largest asset managers",
    fundsCount: 2,
    logo: "/placeholder.svg",
    accent: "from-blue-500 to-cyan-500",
    link: "/sifs/isif",
  },
  // Future AMCs will be added here
  // {
  //   id: "quant",
  //   name: "Quant SIF",
  //   fullName: "Quant Mutual Fund",
  //   description: "Coming soon...",
  //   fundsCount: 3,
  //   link: "/sifs/quant",
  // },
];

const SIFs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Specialized Investment Funds</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Explore SIF Funds
                <span className="block text-2xl md:text-3xl text-muted-foreground mt-3 font-medium">
                  by Asset Management Company
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Access sophisticated long-short strategies from India's leading mutual fund houses. 
                ₹10 Lakh minimum. MF governance.
              </p>
            </div>
          </div>
        </section>

        {/* AMC Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {amcFunds.map((amc) => (
                  <Link
                    key={amc.id}
                    href={amc.link}
                    className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${amc.accent} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                    
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
                          {amc.fundsCount} fund{amc.fundsCount > 1 ? "s" : ""} available
                        </span>
                        <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          View Funds
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* Coming Soon Placeholder */}
                <div className="p-6 rounded-2xl bg-muted/30 border border-dashed border-border/50">
                  <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center mb-4">
                    <Building2 className="w-7 h-7 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                    More AMCs Coming Soon
                  </h3>
                  <p className="text-sm text-muted-foreground/70">
                    We're adding SIF products from other leading mutual fund houses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-card/50 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">₹10L</p>
                <p className="text-sm text-muted-foreground">Min Investment</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">1</p>
                <p className="text-sm text-muted-foreground">AMC Partners</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">2</p>
                <p className="text-sm text-muted-foreground">Fund Strategies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">SEBI</p>
                <p className="text-sm text-muted-foreground">Regulated</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Not sure which fund to choose?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our experts can help you understand which SIF strategy aligns with your investment goals.
              </p>
              <Button 
                variant="gold" 
                size="xl"
                onClick={() => window.open(CONSULTATION_URL, "_blank")}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SIFs;
