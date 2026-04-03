"use client";

import { lazy, Suspense, memo } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { ArrowRight, Shield, TrendingUp, Target, Zap, ChevronDown, PieChart, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

// Lazy load below-fold components
const Footer = lazy(() => import("@/components/Footer"));
import {


  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Arudha = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Hybrid Long-Short Strategy",
      description: "Combines long positions in equity & debt with strategic short exposure through derivatives for balanced returns",
    },
    {
      icon: Shield,
      title: "Downside Protection",
      description: "Up to 25% unhedged short exposure acts as a safety valve to manage volatility during market downturns",
    },
    {
      icon: PieChart,
      title: "Balanced Allocation",
      description: "35-65% in equities and 35-65% in debt instruments for optimal risk-adjusted returns",
    },
    {
      icon: Target,
      title: "Global Diversification",
      description: "Access to ADRs, GDRs, foreign equities, and overseas ETFs up to 50% of net assets",
    },
  ];

  const keyDetails = [
    { label: "Minimum Investment", value: "₹10 Lakhs" },
    { label: "Strategy Type", value: "Hybrid Long-Short" },
    { label: "Investment Horizon", value: "Short to Medium Term" },
    { label: "Subscription", value: "Daily" },
    { label: "Redemption", value: "Twice a Week" },
    { label: "Gross Exposure Cap", value: "100% of Net Assets" },
  ];

  const allocationData = [
    { category: "Equities & Equity-related", range: "35% - 65%", color: "bg-green-500" },
    { category: "Debt & Money Market", range: "35% - 65%", color: "bg-blue-500" },
    { category: "InvITs (Infrastructure)", range: "0% - 20%", color: "bg-amber-500" },
  ];

  const exposureLimits = [
    { label: "Max Unhedged Short Exposure", value: "25%", description: "Through derivative positions in equity and debt" },
    { label: "Max Unhedged Long Exposure", value: "50%", description: "Of net assets" },
    { label: "Foreign Securities Limit", value: "50%", description: "ADRs, GDRs, foreign equities, overseas ETFs" },
    { label: "Physical Short Selling", value: "20%", description: "With max 5% single party exposure" },
  ];

  const faqs = [
    {
      question: "What is the investment objective of Arudha SIF?",
      answer: "The primary investment objective of Arudha Hybrid Long-Short Fund is to generate optimal returns over the short to medium term by investing in a combination of equity and debt securities, while utilizing limited short exposure through derivatives. Note: There is no absolute assurance that these objectives will be realized.",
    },
    {
      question: "How does the Long-Short strategy work?",
      answer: "Think of it like a hybrid vehicle - the fund primarily uses 'long positions' (equity and debt) for forward momentum, but also has a 'braking system' (short exposure through derivatives) to manage volatility and protect capital when markets get difficult. All while staying within a strict 100% gross exposure cap.",
    },
    {
      question: "What is the asset allocation strategy?",
      answer: "The fund maintains a balanced portfolio with 35-65% in equities and equity-related instruments, 35-65% in debt and money market instruments, and 0-20% in Infrastructure Investment Trusts (InvITs).",
    },
    {
      question: "What are the short exposure limits?",
      answer: "The maximum unhedged short derivative exposure is 25% of net assets in both equity and debt. Physical short selling is capped at 20% of net assets with a maximum 5% exposure to any single party. There's no minimum short exposure requirement - the fund manager uses short positions judiciously based on market outlook.",
    },
    {
      question: "How often can I subscribe and redeem?",
      answer: "Arudha offers daily subscription facilities. Redemptions are available twice a week through restricted redemption windows to manage liquidity effectively.",
    },
    {
      question: "Can the fund invest in foreign securities?",
      answer: "Yes, the fund can invest in ADRs, GDRs, foreign equities, and overseas ETFs, provided these do not exceed 50% of the net assets.",
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
                  <span className="text-sm font-medium text-primary">NFO Open</span>
                </div>
                <span className="text-sm text-muted-foreground">Jan 9th - 22nd, 2026</span>
              </div>
              
              {/* Fund Name */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Arudha
                <span className="block text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mt-2">
                  Hybrid Long-Short Fund
                </span>
                <span className="block text-lg md:text-xl text-primary/80 mt-2">
                  by Bandhan Mutual Fund
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Generate optimal returns over short to medium term through a judicious mix of 
                equity, debt, and strategic derivative positions.
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

        {/* Features Grid */}
        <section className="py-16 lg:py-24" id="strategy">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Arudha?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A sophisticated hybrid strategy that balances growth potential with risk management.
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
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {allocationData.map((item, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-background border border-border/50">
                    <div className={`w-4 h-4 rounded-full ${item.color} mb-4`} />
                    <p className="text-sm text-muted-foreground mb-1">{item.category}</p>
                    <p className="text-2xl font-bold text-foreground">{item.range}</p>
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
                    The fund's primary "engine" for forward momentum - investing in undervalued 
                    equities and debt securities that are expected to appreciate.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Max Unhedged Long:</strong> 50% of net assets
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
                    The "braking system" - using derivatives to take short positions in overvalued 
                    securities or hedge market risk during volatile periods.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Max Unhedged Short:</strong> 25% of net assets
                  </p>
                </div>
              </div>
              
              {/* Net Result */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Market-Neutral & Directional Flexibility
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The fund manager employs a judicious mix of instruments, utilizing both market-neutral 
                  and directional strategies to balance risk and return based on prevailing market outlook. 
                  The 100% gross exposure cap ensures disciplined risk management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About AMC */}
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-2xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Managed by Bandhan Mutual Fund
                  </h2>
                  <p className="text-muted-foreground">
                    Bandhan Mutual Fund brings robust expertise in managing diversified portfolios 
                    across equity and debt markets. With Arudha, the team applies rigorous fundamental 
                    analysis and tactical derivative strategies to deliver risk-adjusted returns 
                    across market cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 lg:py-24">
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
        <section className="py-16 lg:py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Invest in Arudha?
              </h2>
              <p className="text-muted-foreground mb-8">
                Get in touch with our team to start your investment journey with 
                Bandhan's Hybrid Long-Short strategy.
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
                Minimum investment: ₹10 Lakhs | Daily subscription | Twice-weekly redemption
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

export default memo(Arudha);
