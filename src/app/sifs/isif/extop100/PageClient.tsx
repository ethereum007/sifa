"use client";
import dynamic from "next/dynamic";

import { Suspense, memo } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { ArrowRight, Shield, TrendingUp, Target, Zap, ChevronDown, PieChart, Briefcase, Globe, BarChart3, LineChart } from "lucide-react";
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

const ISIF = () => {
  const fundData = getSifBySlug('sifs/isif/extop100');
  const features = [
    {
      icon: TrendingUp,
      title: "Ex-Top 100 Focus",
      description: "Invest in quality mid & small caps beyond the top 100, capturing high-growth opportunities often overlooked by large-cap funds",
    },
    {
      icon: Shield,
      title: "Downside Protection",
      description: "Up to 25% unhedged short exposure via derivatives acts as a volatility buffer during market corrections",
    },
    {
      icon: BarChart3,
      title: "Long-Short Alpha",
      description: "Go long on quality SMID stocks while shorting overvalued names in the Ex-Top-100 universe for risk-adjusted returns",
    },
    {
      icon: Globe,
      title: "Global Diversification",
      description: "Up to 35% exposure in overseas securities including ADRs, GDRs, and foreign equities",
    },
  ];

  const keyDetails = [
    { label: "Minimum Investment", value: "₹10 Lakhs" },
    { label: "Strategy Type", value: "Equity Long-Short" },
    { label: "Benchmark", value: "Nifty 500 TRI" },
    { label: "Subscription", value: "Daily" },
    { label: "Redemption", value: "T+3 Days" },
    { label: "Taxation", value: "Equity LTCG 12.5%" },
  ];

  const allocationData = [
    { category: "Ex-Top-100 Equities", range: "65% - 100%", color: "bg-green-500" },
    { category: "Large Caps / Debt", range: "0% - 35%", color: "bg-blue-500" },
    { category: "InvITs (Infrastructure)", range: "0% - 20%", color: "bg-amber-500" },
    { category: "Overseas Securities", range: "0% - 35%", color: "bg-purple-500" },
  ];

  const exposureLimits = [
    { label: "Max Unhedged Short Exposure", value: "25%", description: "Through F&O derivative positions in equity" },
    { label: "Cumulative Gross Exposure", value: "100%", description: "Of NAV - strict exposure discipline" },
    { label: "Ex-Top-100 F&O Universe", value: "109", description: "Stocks with active derivatives for shorts" },
    { label: "SMID F&O Open Interest", value: "32-37%", description: "Enables institutional-grade short book" },
  ];

  const alphaStrategies = [
    "Equity arbitrage opportunities",
    "Covered call strategies for income",
    "Index hedging for downside protection",
    "Protective puts during volatility",
    "Bear call/put spreads",
    "Straddles & strangles",
    "IPO/QIP participation",
    "Carry from debt sleeve",
  ];

  const stockFilters = [
    { icon: Target, label: "Potential Market Leaders" },
    { icon: TrendingUp, label: "Strengthening Balance Sheet" },
    { icon: Shield, label: "Low-Cost Producer" },
    { icon: LineChart, label: "Earnings Visibility" },
    { icon: PieChart, label: "Valuation Comfort" },
  ];

  const marketBehavior = [
    { market: "Bull Market", smidLong: "Up to 100%", shorts: "Low", options: "Low", debt: "Tactical" },
    { market: "Bear Market", smidLong: "Min 65%", shorts: "Up to 35%", options: "High", debt: "Defensive" },
  ];

  const faqs = [
    {
      question: "What is the investment objective of iSIF Ex-Top 100 Long-Short Fund?",
      answer: "The fund aims to generate long-term capital appreciation by investing in equity of Ex-Top-100 companies with up to 25% unhedged short exposure via derivatives. It captures SMID alpha while managing volatility through strategic shorts.",
    },
    {
      question: "What regulatory framework governs SIFs?",
      answer: "SIFs operate under Chapter VI-C of SEBI Mutual Fund Regulations. They bridge the gap between regular Mutual Funds (limited derivative flexibility) and PMS/AIF (₹50L-₹1Cr ticket size). SIFs offer flexibility of sophisticated strategies with MF governance at ₹10L entry.",
    },
    {
      question: "How does the Long-Short strategy work in this fund?",
      answer: "The fund goes Long on quality mid/small caps with strong fundamentals, goes Short on overvalued Ex-Top-100 names using F&O, uses Options overlay for hedging & income, and maintains a Debt sleeve for stability. Target: risk-adjusted returns with lower volatility.",
    },
    {
      question: "What is the Ex-Top-100 universe?",
      answer: "Ex-Top-100 refers to stocks outside the top 100 companies by market cap but within the F&O universe. This comprises 109 stocks with active derivatives, contributing 32-37% of F&O open interest - enabling institutional-grade short positions.",
    },
    {
      question: "How does the fund behave across market cycles?",
      answer: "In Bull markets: Up to 100% SMID long exposure with low shorts and tactical debt. In Bear markets: Minimum 65% SMID longs with up to 35% shorts, high options usage, and defensive debt positioning. The fund adapts dynamically to market conditions.",
    },
    {
      question: "What are the key risks?",
      answer: "Key risks include equity volatility, derivative leverage risk, liquidity & settlement risk, short squeeze potential, overseas exposure currency risk, and counterparty risk in stock lending. Mitigated by: 25% cap on unhedged shorts, 30-day rebalancing rule, daily NAV disclosure, and MF governance.",
    },
    {
      question: "Who should invest in this fund?",
      answer: "Ideal for: HNIs seeking SMID alpha with guardrails, investors tired of large-cap MF drawdowns, PMS seekers looking for lower ticket entry, and those with 3-5 year investment horizon willing to accept equity volatility for superior risk-adjusted returns.",
    },
    {
      question: "What is the taxation on this fund?",
      answer: "The fund follows equity taxation: LTCG of 12.5% on gains above ₹1.25 lakh after 12 months holding period, and STCG of 20% for holdings less than 12 months.",
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
                  Equity Ex-Top 100 Long-Short Fund
                </span>
                <span className="block text-lg md:text-xl text-primary/80 mt-2">
                  by ICICI Prudential Mutual Fund
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Capture SMID alpha with institutional-grade risk management. 
                Long quality mid & small caps, short overvalued names via F&O.
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

        {/* Regulatory Context */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Why SIFs? The Regulatory Innovation
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <p className="font-semibold text-foreground mb-1">Mutual Funds</p>
                  <p className="text-sm text-muted-foreground">Transparency & liquidity but limited derivative flexibility</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border/50">
                  <p className="font-semibold text-foreground mb-1">PMS / AIF</p>
                  <p className="text-sm text-muted-foreground">Strategy freedom but ₹50L-₹1Cr ticket size</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <p className="font-semibold text-primary mb-1">SIF (Best of Both)</p>
                  <p className="text-sm text-muted-foreground">Flexibility + MF governance at ₹10L entry</p>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Operating under SEBI MF Regulations Chapter VI-C • Benchmarked to Nifty 500 TRI
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24" id="strategy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose iSIF Ex-Top 100?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                SMID stocks deliver alpha but with violent drawdowns. This fund captures the upside while managing the downside.
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
                Key Exposure Limits
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

        {/* Alpha Generation Engines */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Alpha Generation Engines
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {alphaStrategies.map((strategy, index) => (
                  <div key={index} className="p-4 rounded-xl bg-card border border-border/50 text-center">
                    <p className="text-sm font-medium text-foreground">{strategy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stock Selection Framework */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Stock Selection Framework
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Rigorous bottom-up filters to identify quality SMID opportunities
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                {stockFilters.map((filter, index) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50">
                    <filter.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{filter.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Deep Dive */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                How Long-Short Works
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Long Side */}
                <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Long Positions</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Quality mid/small caps with strong fundamentals - potential market leaders, 
                    strengthening balance sheets, and visible earnings growth.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Core Allocation:</strong> 65-100% in Ex-Top-100 equities
                  </p>
                </div>
                
                {/* Short Side */}
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Short Positions</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Overvalued Ex-Top-100 names via F&O derivatives. 109 stocks with active 
                    derivatives enable institutional-grade short book construction.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Max Unhedged Short:</strong> 25% of net assets
                  </p>
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
                      <th className="p-3 text-center text-sm font-semibold text-foreground">SMID Long</th>
                      <th className="p-3 text-center text-sm font-semibold text-foreground">Shorts</th>
                      <th className="p-3 text-center text-sm font-semibold text-foreground">Options</th>
                      <th className="p-3 text-center text-sm font-semibold text-foreground">Debt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketBehavior.map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3 text-sm font-medium text-foreground">{row.market}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.smidLong}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.shorts}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.options}</td>
                        <td className="p-3 text-center text-sm text-muted-foreground">{row.debt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Net Result */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 text-center mt-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Target: Risk-Adjusted Returns with Lower Volatility
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The fund manager adapts the long-short mix dynamically based on market conditions. 
                  30-day rebalancing rule and 100% gross exposure cap ensure disciplined risk management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Edge */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Team Edge
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-background border border-border/50 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">30+</p>
                  <p className="text-sm text-muted-foreground">Years CIO Experience</p>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border/50 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">655+</p>
                  <p className="text-sm text-muted-foreground">Companies / 24 Sectors Covered</p>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border/50 text-center">
                  <p className="text-3xl font-bold text-primary mb-2">₹1.49L Cr</p>
                  <p className="text-sm text-muted-foreground">SMID Exposure Managed</p>
                </div>
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
                    ICICI Prudential Mutual Fund brings deep expertise in SMID investing with a proven track record 
                    across market cycles. The team applies rigorous fundamental analysis combined with 
                    sophisticated derivative strategies to deliver alpha while managing drawdowns. 
                    With coverage across 655+ companies and 24 sectors, the fund leverages institutional-grade 
                    research for stock selection.
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
                Ready to Invest in iSIF?
              </h2>
              <p className="text-muted-foreground mb-8">
                Capture SMID alpha with institutional-grade risk management. 
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
                Minimum investment: ₹10 Lakhs | Daily subscription | T+3 redemption | Equity LTCG 12.5%
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

export default memo(ISIF);
