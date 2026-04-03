"use client";

import Header from "@/components/Header";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, IndianRupee, CheckCircle2, Calculator, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



const SifMinimumInvestment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Investment Requirements
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                SIF Minimum Investment: ₹10 Lakhs
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                Access sophisticated long-short strategies with just ₹10 Lakhs – 
                the most accessible entry point to hedge fund-like investing in India.
              </p>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Investment Comparison */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12 px-2">
              How SIF Compares to Other Investment Options
            </h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto">
              <Card className="border-primary border-2">
                <CardHeader className="text-center pb-2 p-3 sm:p-6">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <IndianRupee className="w-5 h-5 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">SIF</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0">
                  <p className="text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">₹10L</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Minimum Investment</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] sm:text-xs font-medium">
                      Most Accessible
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center pb-2 p-3 sm:p-6">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <IndianRupee className="w-5 h-5 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">PMS</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0">
                  <p className="text-2xl sm:text-4xl font-bold text-foreground mb-1 sm:mb-2">₹50L</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Minimum Investment</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] sm:text-xs font-medium">
                      5x Higher
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center pb-2 p-3 sm:p-6">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <IndianRupee className="w-5 h-5 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl">AIF Cat III</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0">
                  <p className="text-2xl sm:text-4xl font-bold text-foreground mb-1 sm:mb-2">₹1Cr</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Minimum Investment</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-red-100 text-red-700 text-[10px] sm:text-xs font-medium">
                      10x Higher
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center pb-2 p-3 sm:p-6">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <IndianRupee className="w-5 h-5 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base sm:text-2xl">Mutual Funds</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 sm:p-6 pt-0">
                  <p className="text-2xl sm:text-4xl font-bold text-foreground mb-1 sm:mb-2">₹500</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Minimum Investment</p>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t">
                    <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] sm:text-xs font-medium">
                      No Long-Short
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why ₹10 Lakhs */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
                Why ₹10 Lakhs Minimum?
              </h2>
              
              <div className="space-y-6">
                <div className="glass-card p-6 flex gap-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">SEBI's Investor Protection</h3>
                    <p className="text-muted-foreground">
                      The ₹10 Lakh threshold ensures investors have sufficient risk appetite and 
                      financial capacity for sophisticated strategies involving derivatives and short positions.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 flex gap-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Access to Advanced Strategies</h3>
                    <p className="text-muted-foreground">
                      Unlike mutual funds, SIFs can take up to 25% unhedged short positions. This requires 
                      a higher minimum to ensure proper portfolio construction and risk management.
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 flex gap-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">PAN-Level Threshold</h3>
                    <p className="text-muted-foreground">
                      The ₹10 Lakh minimum is calculated at PAN level, not per fund. Once you invest 
                      ₹10L across any SIF, subsequent investments can be of any amount.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Invest */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
              Who Should Consider SIF?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">HNI Investors</h3>
                <p className="text-muted-foreground">
                  High Net Worth Individuals seeking sophisticated strategies but don't 
                  meet ₹50L PMS or ₹1Cr AIF thresholds.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Experienced Investors</h3>
                <p className="text-muted-foreground">
                  Those who understand derivatives, market cycles, and want 
                  downside protection during bear markets.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Portfolio Diversifiers</h3>
                <p className="text-muted-foreground">
                  Investors looking to add uncorrelated returns to their existing 
                  mutual fund and direct equity portfolios.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Long-term Wealth Builders</h3>
                <p className="text-muted-foreground">
                  Those with 3-5+ year horizons who can benefit from 
                  compounding through market cycles.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Tax-Conscious Investors</h3>
                <p className="text-muted-foreground">
                  Those who prefer mutual fund taxation (12.5% LTCG after 12 months) 
                  over PMS's per-transaction taxation.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Liquidity Seekers</h3>
                <p className="text-muted-foreground">
                  Investors who need daily redemption options unlike 
                  AIF lock-ins of 1-3 years.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Start Your SIF Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with our team to discuss your investment goals and find the right SIF strategy for you.
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

export default SifMinimumInvestment;
