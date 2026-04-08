"use client";
import dynamic from "next/dynamic";

import { Suspense, memo } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { ArrowRight, Shield, TrendingUp, Target, Zap, ChevronDown, PieChart, Briefcase, Globe, BarChart3, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// Lazy load below-fold components
const Footer = dynamic(() => import("@/components/Footer"));
import {


  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChart";
import MonthlyHeatmap from "@/components/MonthlyHeatmap";
import { getSifBySlug } from "@/lib/sifData";

const ISIFHybrid = () => {
  const fundData = getSifBySlug('isif-hybrid');
  const features = [
    {
      icon: PieChart,
      title: "Balanced Hybrid Approach",
      description: "65-75% equity for growth combined with 25-35% debt for stability - the best of both worlds",
    },
    {
      icon: Shield,
      title: "Dual Short Capability",
      description: "Up to 25% unhedged shorts in BOTH equity and debt to manage volatility across asset classes",
    },
    {
      icon: BarChart3,
      title: "Derivative Overlays",
      description: "Sophisticated derivative strategies for risk management, income generation, and alpha extraction",
    },
    {
      icon: Target,
      title: "Interval Structure",
      description: "Strategic twice-weekly redemptions (Mon & Wed) designed for committed capital allocation",
    },
  ];

  const keyDetails = [
    { label: "Minimum Investment", value: "₹10 Lakhs" },
    { label: "Strategy Type", value: "Hybrid Long-Short" },
    { label: "Benchmark", value: "CRISIL Hybrid 50+50" },
    { label: "Subscription", value: "Daily" },
    { label: "Redemption", value: "Mon & Wed (T+3)" },
    { label: "Exit Load", value: "1% (<12 months)" },
  ];

  const allocationData = [
    { category: "Equity & Equity Related", range: "65% - 75%", color: "bg-green-500" },
    { category: "Debt & Money Market", range: "25% - 35%", color: "bg-blue-500" },
    { category: "InvITs (Infrastructure)", range: "0% - 10%", color: "bg-amber-500" },
    { category: "Overseas Securities", range: "0% - 35%", color: "bg-purple-500" },
  ];

  const exposureLimits = [
    { label: "Unhedged Shorts (Equity + Debt)", value: "25%", description: "Tactical shorts across both asset classes" },
    { label: "Cumulative Gross Exposure", value: "100%", description: "Of NAV - strict exposure discipline" },
    { label: "TER (Total Expense Ratio)", value: "2.25%", description: "Plus statutory allowances" },
    { label: "Exit Load Period", value: "12mo", description: "1% if redeemed before 12 months" },
  ];

  const derivativeStrategies = [
    "Equity arbitrage",
    "Covered calls",
    "Index hedges",
    "Protective puts",
    "Bear call spreads",
    "Short straddles/strangles",
    "Interest rate derivatives",
    "Income via options",
  ];

  const marketBehavior = [
    { market: "Bull Market", equity: "70-75%", debt: "25-30%", derivatives: "Low shorts" },
    { market: "Sideways", equity: "65-70%", debt: "30-35%", derivatives: "Income via options" },
    { market: "Bear Market", equity: "65%", debt: "35%", derivatives: "Higher shorts (≤25%)" },
  ];

  const teamMembers = [
    { name: "Rajat Chandak", role: "Equity & Derivatives" },
    { name: "Ayush Shah", role: "Derivatives" },
    { name: "Manish Banthia", role: "CIO Fixed Income" },
    { name: "Akhil Kakkar", role: "Hybrid/Debt" },
  ];

  const comparisonData = [
    { feature: "Core Risk", exTop100: "SMID Equity", hybrid: "Equity + Debt" },
    { feature: "Shorts", exTop100: "Equity only", hybrid: "Equity + Debt" },
    { feature: "Objective", exTop100: "Alpha from SMID", hybrid: "Balanced risk-adjusted" },
    { feature: "Liquidity", exTop100: "MF-like", hybrid: "Interval (2x/week)" },
    { feature: "Use Case", exTop100: "Aggressive", hybrid: "Core portfolio" },
  ];

  const faqs = [
    {
      question: "What is the investment objective of iSIF Hybrid Long-Short Fund?",
      answer: "The fund aims for long-term capital appreciation through 65-75% equity exposure for growth plus 25-35% debt for stability, while using up to 25% unhedged derivative shorts in both equity and debt to manage volatility and exploit mispricing opportunities.",
    },
    {
      question: "How is this different from the Ex-Top 100 Long-Short Fund?",
      answer: "The Ex-Top 100 fund is equity-focused (65-100% in SMID stocks) with shorts only in equity. The Hybrid fund takes a balanced approach with 65-75% equity + 25-35% debt, and can short BOTH equity and debt. Ex-Top 100 is for aggressive growth; Hybrid is for core portfolio allocation.",
    },
    {
      question: "What is the liquidity structure?",
      answer: "Subscription is daily. However, redemption follows an interval structure - available only on Monday and Wednesday each week with T+3 payout timeline. This is not a daily-liquidity mutual fund; it's designed for strategic, committed capital.",
    },
    {
      question: "What derivative strategies are used?",
      answer: "The fund employs equity arbitrage, covered calls, index hedges, protective puts, bear call spreads, short straddles/strangles, and interest rate derivatives. These are used for risk management, income generation, and alpha extraction across both equity and debt.",
    },
    {
      question: "How does the fund adapt to different market conditions?",
      answer: "In Bull markets: 70-75% equity with low shorts. In Sideways markets: 65-70% equity with income via options. In Bear markets: minimum 65% equity, maximum 35% debt, with higher shorts up to the 25% cap for downside protection.",
    },
    {
      question: "What are the key risks?",
      answer: "Key risks include derivative leverage & gap risk, short squeeze potential, interest rate volatility, liquidity constraints due to interval structure, and overseas exposure FX risk. Guardrails: 25% cap on unhedged shorts, 30-day rebalancing rule, and MF governance with daily NAV disclosure.",
    },
    {
      question: "What are the costs involved?",
      answer: "Exit Load: 1% if redeemed before 12 months, nil after 12 months. TER: Up to 2.25% plus statutory allowances. Minimum investment: ₹10 Lakhs (₹10,000 for accredited investors).",
    },
    {
      question: "Who should invest in this fund?",
      answer: "Ideal for investors who want equity upside without pure MF volatility, debt stability with tactical alpha, PMS-style strategy at ₹10L ticket size, and have a 3-5 year investment horizon. Best suited as a core portfolio holding rather than an aggressive satellite allocation.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex flex-col items-center gap-1 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-primary">🔥 NFO LIVE</span>
                </div>
                <span className="text-sm text-muted-foreground">16 Jan - 30 Jan 2026</span>
              </div>
              
              {/* Fund Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                iSIF
                <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mt-2">
                  Hybrid Long-Short Fund
                </span>
                <span className="block text-lg md:text-xl text-primary/80 mt-2">
                  by ICICI Prudential Mutual Fund
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A balanced long-short strategy: 65-75% equity for growth, 25-35% debt for stability, 
                and up to 25% tactical shorts in both equity and debt.
              </p>
              
              {/* CTA Buttons */}
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
                  onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                  <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Details Bar */}
        <section className="border-y border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-8">
              {keyDetails.map((detail, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {detail.label}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Liquidity Notice */}
        <section className="py-8 bg-amber-500/10 border-b border-amber-500/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Interval Fund Structure</p>
                <p className="text-sm text-muted-foreground">
                  Redemptions available twice weekly (Monday & Wednesday) with T+3 payout. 
                  Not a daily-liquidity MF — designed for strategic, committed capital.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24" id="strategy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose iSIF Hybrid Long-Short?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The balanced approach: equity upside without pure MF volatility, debt stability with tactical alpha.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Asset Allocation */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Asset Allocation Strategy
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {allocationData.map((item, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-background border border-border/50">
                    <div className={`w-4 h-4 rounded-full ${item.color} mb-3`} />
                    <p className="text-sm text-muted-foreground mb-1">{item.category}</p>
                    <p className="text-xl font-bold text-foreground">{item.range}</p>
                  </div>
                ))}
              </div>

              {/* Exposure Limits */}
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Key Limits & Costs
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {exposureLimits.map((limit, index) => (
                  <div key={index} className="p-5 rounded-xl bg-background border border-border/50 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-primary">{limit.value}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{limit.label}</p>
                      <p className="text-sm text-muted-foreground">{limit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Derivative Strategies */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Derivative Playbook
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {derivativeStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 rounded-xl bg-card border border-border/50 text-center">
                    <p className="text-sm font-medium text-foreground">{strategy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Deep Dive */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                How Hybrid Long-Short Works
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Equity Sleeve */}
                <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Equity Sleeve</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Growth engine driving capital appreciation through quality equity selection.
                  </p>
                  <p className="text-sm font-medium text-green-600">65-75% allocation</p>
                </div>
                
                {/* Debt Sleeve */}
                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Debt Sleeve</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Stability anchor providing income and reducing portfolio volatility.
                  </p>
                  <p className="text-sm font-medium text-blue-600">25-35% allocation</p>
                </div>
                
                {/* Derivative Overlay */}
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Short Overlay</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    Tactical shorts in both equity AND debt for risk management & alpha.
                  </p>
                  <p className="text-sm font-medium text-red-600">Up to 25% unhedged</p>
                </div>
              </div>

              {/* Market Behavior Table */}
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Dynamic Market Adaptation
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-3 text-left text-sm font-semibold text-foreground">Market</th>
                      <th className="p-3 text-center text-sm font-semibold text-foreground">Equity</th>
                      <th className="p-3 text-center text-sm font-semibold text-foreground">Debt</th>
                      <th className="p-3 text-center text-sm font-semibold text-foreground">Derivatives</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketBehavior.map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 text-sm font-medium text-foreground">{row.market}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.equity}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.debt}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.derivatives}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison with Ex-Top 100 */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Hybrid vs Ex-Top 100: Which Is Right For You?
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-sm font-semibold text-foreground">Feature</th>
                      <th className="p-4 text-center text-sm font-semibold text-foreground">Ex-Top 100 Long-Short</th>
                      <th className="p-4 text-center text-sm font-semibold text-primary bg-primary/5">Hybrid Long-Short</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-4 text-sm font-medium text-foreground">{row.feature}</td>
                        <td className="p-4 text-center text-sm text-muted-foreground">{row.exTop100}</td>
                        <td className="p-4 text-center text-sm text-foreground bg-primary/5">{row.hybrid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 text-center">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Ex-Top 100</strong> = Aggressive SMID alpha play | 
                  <strong className="text-foreground"> Hybrid</strong> = Balanced core portfolio allocation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Investment Team
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="p-4 rounded-xl bg-background border border-border/50 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About AMC */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Managed by ICICI Prudential Mutual Fund
                  </h2>
                  <p className="text-muted-foreground">
                    ICICI Prudential Mutual Fund brings deep expertise across equity, fixed income, and hybrid strategies. 
                    The team combines rigorous fundamental analysis with sophisticated derivative overlays 
                    to deliver balanced risk-adjusted returns. With experienced professionals managing 
                    equity, derivatives, and fixed income sleeves, the fund benefits from specialized 
                    expertise across all asset classes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Components */}
        {fundData && (
          <div className="container mx-auto px-4 space-y-8 py-8">
            <CrashAnalysis fund={fundData} />
            <NavJourneyChart funds={[fundData]} showNifty={true} />
            <MonthlyHeatmap funds={[fundData]} showNifty={true} mode="single" />
          </div>
        )}

        {/* FAQs */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-card rounded-xl border border-border/50 px-6"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Invest in iSIF Hybrid?
              </h2>
              <p className="text-muted-foreground mb-8">
                A balanced long-short strategy for your core portfolio. 
                Get in touch with our team to start your investment journey.
              </p>
              <Button 
                variant="gold" 
                size="xl"
                onClick={() => window.open(CONSULTATION_URL, "_blank")}
              >
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-6">
                Min: ₹10 Lakhs | Daily subscription | Mon/Wed redemption (T+3) | Exit: 1% &lt;12mo
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default memo(ISIFHybrid);
