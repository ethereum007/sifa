"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StrategyExplainer from "@/components/StrategyExplainer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Shield, TrendingUp } from "lucide-react";
import { CONSULTATION_URL } from "@/lib/whatsapp";



const SifInvestmentStrategies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                SEBI Approved Strategies
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                SIF Investment Strategies Explained
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                Understand the different types of Specialized Investment Fund strategies – 
                Equity Long-Short, Debt Long-Short, and Hybrid approaches for all market conditions.
              </p>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-8 sm:py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">Market Neutral</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Long-short strategies aim to generate returns regardless of market direction
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">Risk Managed</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Short positions provide downside protection during market corrections
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">Alpha Focused</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Professional managers seek alpha through stock selection and timing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Explainer Component */}
        <StrategyExplainer />

        {/* CTA Section */}
        <section className="py-8 sm:py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Which Strategy is Right for You?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Our experts can help you choose the right SIF strategy based on your risk appetite 
              and investment horizon.
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

export default SifInvestmentStrategies;
