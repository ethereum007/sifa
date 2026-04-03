"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonTable from "@/components/ComparisonTable";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CONSULTATION_URL } from "@/lib/whatsapp";



const SifVsAif = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Investment Comparison
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                SIF vs AIF vs PMS vs Mutual Funds
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                Compare Specialized Investment Funds with Alternative Investment Funds, 
                Portfolio Management Services, and Mutual Funds to find the right investment vehicle for your goals.
              </p>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <ComparisonTable />

        {/* Key Differences Section */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12 px-2">
              Why Choose SIF Over Other Options?
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto">
              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Lower Entry Barrier</h3>
                <p className="text-muted-foreground">
                  Start with ₹10 Lakhs compared to ₹50 Lakhs for PMS and ₹1 Crore for AIF. 
                  Access sophisticated strategies without ultra-high net worth.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">MF-Like Taxation</h3>
                <p className="text-muted-foreground">
                  Enjoy mutual fund taxation benefits with 12.5% LTCG after 12 months for equity strategies, 
                  unlike PMS which is taxed per transaction.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Long-Short Strategies</h3>
                <p className="text-muted-foreground">
                  Unlike mutual funds, SIFs can take up to 25% unhedged short positions, 
                  enabling returns in both bull and bear markets.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">SEBI Regulated</h3>
                <p className="text-muted-foreground">
                  Full SEBI regulation provides transparency, daily NAV disclosure, 
                  and investor protection similar to mutual funds.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Daily Liquidity</h3>
                <p className="text-muted-foreground">
                  Most equity SIF strategies offer daily redemption frequency, 
                  providing better liquidity than PMS or AIF lock-in periods.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Professional Management</h3>
                <p className="text-muted-foreground">
                  Managed by experienced fund managers from top AMCs like Quant, ITI, Edelweiss, 
                  SBI, and Tata with proven track records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to Invest in SIF?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
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

export default SifVsAif;
