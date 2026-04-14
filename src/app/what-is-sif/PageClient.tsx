"use client";

import { useEffect } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinkHub from "@/components/InternalLinkHub";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Shield, BarChart3, Wallet, Layers, RefreshCw, Scale, Target, Users, FileText, Clock, DollarSign, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {


  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WhatIsSif = () => {
  const faqs = [
    {
      question: "What is the full form of SIF?",
      answer: "SIF stands for Specialized Investment Fund. It is a new category of mutual fund schemes introduced by SEBI in April 2025 that offers strategy-based investing with greater portfolio flexibility than traditional mutual funds."
    },
    {
      question: "What is the minimum investment required for SIF?",
      answer: "The minimum investment in SIF is ₹10 lakh, aggregated at the PAN level across all SIF schemes offered by the same Asset Management Company. This means if you invest in multiple SIF schemes from the same AMC, the total across all schemes must be at least ₹10 lakh. Accredited investors are exempt from this minimum."
    },
    {
      question: "How is SIF different from regular mutual funds?",
      answer: "SIFs differ from regular mutual funds in several ways: (1) Higher minimum investment of ₹10 lakh vs ₹100-500 for mutual funds, (2) Ability to take long and short positions with up to 25% unhedged derivative exposure, (3) More flexible investment strategies including sector rotation and market neutral approaches, (4) Generally higher expense ratios, and (5) Targeted at more sophisticated investors rather than retail participants."
    },
    {
      question: "How is SIF different from PMS?",
      answer: "While SIFs share some characteristics with Portfolio Management Services (PMS), key differences include: (1) Lower minimum investment (₹10 lakh for SIF vs ₹50 lakh for PMS), (2) SIFs are pooled investments like mutual funds while PMS offers customized portfolios, (3) SIFs operate under SEBI mutual fund regulations while PMS has more flexible regulations, (4) SIFs have standard strategies while PMS can be fully personalized, and (5) Lower fee structure for SIFs compared to PMS which charges management fees plus performance fees."
    },
    {
      question: "Are SIFs SEBI regulated?",
      answer: "Yes, SIFs are regulated by SEBI under the SEBI (Mutual Funds) Regulations, 1996, with additional specific provisions for this category. Only AMCs meeting strict eligibility criteria can launch SIFs, and all schemes must follow mandatory disclosure norms, investment restrictions, and governance standards prescribed by SEBI."
    },
    {
      question: "Can I invest in SIF through SIP?",
      answer: "Yes, AMCs can offer Systematic Investment Plans (SIP) for SIF schemes. However, you must ensure that your cumulative commitment across all installments meets the ₹10 lakh minimum investment requirement at the PAN level. For example, you could start with a ₹5 lakh lumpsum and continue with ₹50,000 monthly SIPs to meet the threshold."
    },
    {
      question: "What is the taxation on SIF investments?",
      answer: "SIFs follow the same taxation rules as mutual funds based on their asset allocation. Equity-oriented SIFs (65%+ equity) are taxed like equity mutual funds, while debt-oriented SIFs follow debt mutual fund taxation. Long-term capital gains (holding over 12 months for equity-oriented) are taxed at 12.5% beyond ₹1.25 lakh exemption, while short-term gains are taxed at 20% for equity-oriented funds."
    },
    {
      question: "What happens if my SIF investment value falls below ₹10 lakh?",
      answer: "If your investment value falls below ₹10 lakh due to market fluctuations (passive breach), no action is required. However, if it falls below ₹10 lakh due to active redemptions or systematic withdrawals, the AMC may require you to exit the SIF scheme to ensure compliance with minimum investment norms."
    },
    {
      question: "How liquid are SIF investments?",
      answer: "Liquidity depends on the SIF scheme structure. Open-ended SIF schemes typically offer daily liquidity similar to mutual funds, though exit loads may apply. Interval SIF schemes allow redemptions only at specified intervals (weekly, monthly, or quarterly) and may require up to 15 working days' advance notice."
    },
    {
      question: "Which AMCs have launched SIF schemes?",
      answer: "As of February 2026, leading AMCs including ICICI Prudential, SBI, Quant, Edelweiss, ITI, Tata, and Bandhan have launched SIF schemes. Several other major AMCs have received SEBI approval and are expected to launch their SIF offerings soon."
    },
    {
      question: "What is long-short strategy in SIF?",
      answer: "A long-short strategy involves simultaneously holding long positions (buying securities expected to appreciate) and short positions (betting on securities expected to decline). In SIFs, fund managers can take up to 25% unhedged short exposure through derivatives. This strategy aims to generate returns regardless of overall market direction."
    },
    {
      question: "Are SIF returns guaranteed?",
      answer: "No, SIF returns are not guaranteed. SIFs are market-linked investment products subject to various risks including market risk, strategy risk, liquidity risk, and derivative-related risks. Returns can be positive or negative and may fluctuate significantly. The use of short positions and derivatives can amplify both gains and losses."
    },
    {
      question: "How can I track SIF performance?",
      answer: "You can track SIF performance through: (1) AMC websites and mobile apps showing daily NAV and returns, (2) Account statements sent periodically, (3) AMFI website for NAV data, and (4) Dedicated SIF comparison platforms like SIFPrime which aggregate performance data across all SIF schemes."
    },
    {
      question: "Who should invest in SIF?",
      answer: "SIFs are suitable for: (1) Emerging high-net-worth individuals with ₹10 lakh+ investable surplus, (2) Investors with good understanding of financial markets and investment strategies, (3) Those comfortable with moderate to high risk for potentially higher returns, (4) Investors seeking portfolio diversification beyond traditional mutual funds, and (5) Those with medium to long-term investment horizon (3-5+ years). SIFs are NOT suitable for first-time investors or those with low risk appetite."
    },
    {
      question: "What is the expense ratio for SIF schemes?",
      answer: "SIF expense ratios are expected to be in the range of 1.5% to 3%, higher than traditional mutual funds due to the complexity of strategy implementation, active management intensity, research requirements, and use of derivatives. Always check the scheme's ISID for detailed fee structure including management fees, other expenses, and any exit loads."
    },
  ];

  useEffect(() => {
    document.title = "Specialized Investment Fund (SIF) India — Complete Guide | SIFPrime";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const descContent = "Comprehensive guide to Specialized Investment Funds (SIF) in India — what they are, how they work, strategies, regulations, minimum investment, risks, and investor suitability.";
    if (metaDescription) {
      metaDescription.setAttribute("content", descContent);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = descContent;
      document.head.appendChild(meta);
    }

    // Add FAQPage schema - managed via useEffect to ensure single instance
    const existingSchema = document.querySelector('script[data-schema="faq-page"]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.setAttribute('data-schema', 'faq-page');
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
    document.head.appendChild(faqSchema);

    // Cleanup on unmount
    return () => {
      const schemaToRemove = document.querySelector('script[data-schema="faq-page"]');
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, []);


  const comparisonData = [
    { feature: "Minimum Investment", sif: "₹10 Lakh (PAN level per AMC)", mf: "₹100-500 (SIP)", pms: "₹50 Lakh" },
    { feature: "Target Investors", sif: "Emerging HNIs, experienced investors", mf: "Retail investors, all income levels", pms: "Ultra HNIs, institutional investors" },
    { feature: "Investment Strategies", sif: "Strategy-specific, long-short capability", mf: "Pre-defined, long-only, category-restricted", pms: "Fully customized, unrestricted" },
    { feature: "Regulatory Framework", sif: "SEBI MF Regulations with additions", mf: "SEBI Mutual Fund Regulations (strict)", pms: "SEBI PMS Regulations (flexible)" },
    { feature: "Portfolio Customization", sif: "Limited - strategy selection", mf: "None - pooled investments", pms: "High - personalized portfolio" },
    { feature: "Short Selling / Derivatives", sif: "Up to 25% unhedged short exposure", mf: "Very limited (hedging only)", pms: "Unrestricted based on mandate" },
    { feature: "Liquidity", sif: "Daily or periodic based on structure", mf: "Daily (open-ended)", pms: "Depends on portfolio holdings" },
    { feature: "Fee Structure", sif: "TER: 1.5% - 3% expected", mf: "TER: 0.5% - 2.5% typically", pms: "2-3% + 10-20% performance fees" },
    { feature: "Transparency", sif: "Monthly disclosure as per SEBI", mf: "Monthly portfolio disclosure", pms: "Direct access, real-time" },
    { feature: "Taxation", sif: "Follows MF taxation based on strategy", mf: "Equity/Debt fund taxation rules", pms: "Individual securities taxation" },
    { feature: "Risk Level", sif: "Medium to High (strategy dependent)", mf: "Low to Medium (category dependent)", pms: "High (strategy dependent)" },
    { feature: "Systematic Options", sif: "SIP/SWP/STP (must meet ₹10L threshold)", mf: "SIP, SWP, STP widely available", pms: "Generally not available" },
  ];

  const equityStrategies = [
    {
      name: "Market Neutral Long-Short Fund",
      risk: "Medium-High",
      mandate: "Minimum 65% in equity and equity-related instruments",
      shortExposure: "Up to 25% unhedged derivative positions",
      focus: "Aims to generate returns regardless of market direction by taking simultaneous long and short positions",
      suitableFor: "Investors seeking equity exposure with lower correlation to overall market movements",
    },
    {
      name: "Sectoral Long-Short Fund",
      risk: "High",
      mandate: "Minimum 80% in equity across maximum 4 sectors",
      shortExposure: "Up to 25% unhedged derivative positions",
      focus: "Concentrated sector exposure with ability to short underperforming stocks within sectors",
      suitableFor: "Investors with strong sector-specific views and high risk tolerance",
    },
    {
      name: "Sector Rotation Long-Short Fund",
      risk: "Medium-High",
      mandate: "Minimum 80% in equity across maximum 4 sectors with rotation flexibility",
      shortExposure: "Up to 25% unhedged derivative positions",
      focus: "Dynamic allocation across sectors based on business cycles and economic indicators",
      suitableFor: "Investors comfortable with tactical sectoral shifts and market timing",
    },
    {
      name: "Ex-Top 100 Long-Short Fund",
      risk: "High",
      mandate: "Minimum 65% in stocks excluding top 100 by market cap (midcap/smallcap focus)",
      shortExposure: "Up to 25% unhedged derivative positions in non-large cap stocks",
      focus: "Alpha generation from mid and small-cap stocks with short positions for hedging",
      suitableFor: "Aggressive investors seeking higher returns with higher volatility tolerance",
    },
  ];

  const debtStrategies = [
    {
      name: "Debt Long-Short Fund",
      risk: "Medium",
      mandate: "Investment in debt instruments across duration spectrum",
      shortExposure: "Up to 25% unhedged short exposure through exchange-traded debt derivatives",
      focus: "Active duration management and yield curve positioning with hedging capability",
      suitableFor: "Fixed-income investors seeking enhanced returns through active duration strategies",
    },
    {
      name: "Sectoral Debt Long-Short Fund",
      risk: "Medium",
      mandate: "Debt instruments across at least 2 sectors, maximum 75% in single sector",
      shortExposure: "Up to 25% unhedged derivative positions",
      focus: "Credit spread trading and sector-specific credit opportunities",
      suitableFor: "Debt investors with sectoral credit views and moderate risk appetite",
    },
  ];

  const hybridStrategies = [
    {
      name: "Hybrid/Balanced Long-Short Fund",
      risk: "Medium",
      mandate: "Dynamic allocation between equity and debt instruments",
      shortExposure: "Up to 25% unhedged derivative positions across asset classes",
      focus: "Flexible asset allocation based on market conditions with hedging tools",
      suitableFor: "Investors seeking balanced exposure with active tactical allocation",
    },
    {
      name: "Active Asset Allocator Fund",
      risk: "Medium-High",
      mandate: "Unrestricted allocation across equity, debt, and other permissible instruments",
      shortExposure: "Up to 25% unhedged derivative positions",
      focus: "Maximum flexibility for dynamic asset allocation across market cycles",
      suitableFor: "Investors trusting fund manager's discretionary allocation decisions",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Advanced Investment Strategies",
      description: "Access to sophisticated techniques like long-short equity, sector rotation, and tactical asset allocation that are typically unavailable in traditional mutual funds.",
    },
    {
      icon: DollarSign,
      title: "Lower Entry Barrier than PMS",
      description: "₹10 lakh minimum investment makes advanced strategies accessible to emerging HNIs, compared to ₹50 lakh required for PMS.",
    },
    {
      icon: Shield,
      title: "Active Risk Management",
      description: "Ability to take short positions (up to 25% unhedged) allows fund managers to hedge portfolio risk and potentially profit from declining stocks.",
    },
    {
      icon: Layers,
      title: "Portfolio Diversification",
      description: "Adds a distinct asset class with strategies that may have low correlation with traditional equity and debt mutual funds.",
    },
    {
      icon: FileText,
      title: "SEBI Regulated Framework",
      description: "Unlike unregulated products, SIFs operate under SEBI's mutual fund regulations with mandatory disclosures and investor protection.",
    },
    {
      icon: Users,
      title: "Professional Management",
      description: "Managed by experienced fund managers meeting strict eligibility criteria (10+ years experience with significant AUM).",
    },
  ];

  const risks = [
    {
      icon: AlertTriangle,
      title: "Market Risk",
      description: "SIF returns are subject to market volatility. Long-short strategies don't eliminate market risk, and both positions can incur losses simultaneously.",
    },
    {
      icon: Target,
      title: "Strategy Risk",
      description: "Complex strategies require precise execution. Poor timing or incorrect sector bets can lead to underperformance relative to simple long-only strategies.",
    },
    {
      icon: Clock,
      title: "Liquidity Risk",
      description: "Interval SIFs may have limited redemption windows. Open-ended SIFs investing in less liquid securities might face challenges during redemption pressure.",
    },
    {
      icon: DollarSign,
      title: "Higher Cost Structure",
      description: "SIFs have higher expense ratios (1.5%-3%) compared to traditional mutual funds due to complex strategy implementation and active management.",
    },
    {
      icon: TrendingDown,
      title: "Short Position Risks",
      description: "Short positions have theoretically unlimited loss potential if the security price rises. Derivative exposures can amplify losses.",
    },
    {
      icon: BarChart3,
      title: "Limited Track Record",
      description: "As a new category launched in April 2025, SIFs lack long-term performance history. Investors must rely on strategy backtests.",
    },
  ];

  const investorProfile = [
    "Emerging HNIs with ₹10 lakh+ investable surplus seeking portfolio diversification",
    "Experienced investors comfortable with moderate to high-risk investment strategies",
    "Investors seeking alpha generation through active management and alternative strategies",
    "Those wanting PMS-like flexibility without the ₹50 lakh entry barrier",
    "Investors with medium to long-term horizons (3-5+ years) who can handle potential volatility",
  ];

  const investmentSteps = [
    {
      step: 1,
      title: "Research and Strategy Selection",
      description: "Compare available SIF schemes based on investment strategies, historical performance, fund manager track record, and expense ratios. Use platforms like SIFPrime for comprehensive comparison.",
    },
    {
      step: 2,
      title: "Review Investment Strategy Information Document (ISID)",
      description: "Each SIF scheme must provide an ISID outlining the investment strategy, risk parameters, fee structure, liquidity terms, and redemption conditions.",
    },
    {
      step: 3,
      title: "Complete KYC Requirements",
      description: "Ensure your KYC is current with the AMC or their registered distributors. This is a one-time process if already KYC-compliant for mutual funds.",
    },
    {
      step: 4,
      title: "Choose Investment Mode",
      description: "Options include: Lumpsum (₹10 lakh or more), SIP (periodic investments must reach ₹10 lakh minimum cumulatively), or a combination approach.",
    },
    {
      step: 5,
      title: "Submit Application",
      description: "Apply through the AMC's website, mobile app, or authorized distributors. Provide PAN details as minimum investment is tracked at PAN level.",
    },
    {
      step: 6,
      title: "Fund Transfer & Confirmation",
      description: "Complete payment through net banking, UPI, or other accepted modes. Receive confirmation of unit allotment at applicable NAV.",
    },
  ];

  const RiskBadge = ({ risk }: { risk: string }) => {
    const variant = risk === "High" ? "destructive" : risk === "Medium" ? "secondary" : "default";
    const bgClass = risk === "High" 
      ? "bg-destructive/10 text-destructive border-destructive/20" 
      : risk === "Medium-High" 
        ? "bg-warning/10 text-warning border-warning/20"
        : "bg-primary/10 text-primary border-primary/20";
    
    return (
      <Badge variant="outline" className={`${bgClass} text-xs font-medium`}>
        {risk} Risk
      </Badge>
    );
  };

  const StrategyCard = ({ strategy }: { strategy: typeof equityStrategies[0] }) => (
    <div className="glass-card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-bold text-foreground pr-2">{strategy.name}</h4>
        <RiskBadge risk={strategy.risk} />
      </div>
      <div className="space-y-3 text-base">
        <div>
          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">Investment Mandate</p>
          <p className="text-foreground/90">{strategy.mandate}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">Short Exposure</p>
          <p className="text-foreground/90">{strategy.shortExposure}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">Strategy Focus</p>
          <p className="text-foreground/75">{strategy.focus}</p>
        </div>
        <div className="pt-3 border-t border-border">
          <p className="text-sm font-semibold text-primary">Suitable For: <span className="font-normal text-foreground/75">{strategy.suitableFor}</span></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-10 lg:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Quick Navigation */}
              <div className="glass-card p-4 mb-8">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quick Navigation</p>
                <div className="flex flex-wrap gap-2">
                  {["What is SIF?", "Investment Strategies", "SIF vs MF vs PMS", "How to Invest", "Benefits & Risks", "FAQs"].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-sm text-foreground/70 mb-4">Last Updated: February 2026</p>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Specialized Investment Fund (SIF) India — Complete Guide
              </h1>
              
              <p className="text-xl lg:text-2xl text-foreground/80 mb-8 leading-relaxed">
                India's first comprehensive platform to discover, compare, and track SEBI-regulated Specialized Investment Funds with live NAV updates and performance analytics
              </p>

              <Link href="/sifnav">
                <Button variant="gold" size="lg" className="gap-2">
                  Compare SIF Funds Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* What is SIF Section */}
        <section id="what-is-sif-" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                What is a Specialized Investment Fund (SIF)?
              </h2>
              
              <div className="prose prose-lg max-w-none space-y-5">
                <p className="text-base lg:text-lg text-foreground/85 leading-relaxed">
                  A Specialized Investment Fund (SIF) is a new category of investment product introduced by the Securities and Exchange Board of India (SEBI) on April 1, 2025, designed to bridge the gap between traditional mutual funds and Portfolio Management Services (PMS). SIFs offer sophisticated investors access to advanced investment strategies with greater portfolio flexibility than conventional mutual funds, while maintaining regulatory oversight and transparency.
                </p>
                <p className="text-base lg:text-lg text-foreground/85 leading-relaxed">
                  Unlike traditional mutual funds that primarily follow long-only strategies with strict investment mandates, SIFs can employ complex investment techniques including long-short equity positions, sector rotation strategies, tactical asset allocation, and derivatives exposure up to 25% for unhedged positions. This flexibility allows fund managers to potentially generate returns across different market conditions while managing downside risk more actively.
                </p>
              </div>

              {/* Key Differentiator Highlight */}
              <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                <p className="text-foreground font-medium">
                  <strong>Key Differentiator:</strong> SIFs require a minimum investment of ₹10 lakh (aggregated at PAN level across all SIF schemes under a single AMC), positioning them between the low entry barrier of mutual funds and the high ₹50 lakh minimum required for PMS. This makes sophisticated investment strategies accessible to emerging high-net-worth individuals and experienced investors.
                </p>
              </div>

              {/* Who Should Consider */}
              <div className="mt-10">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                  Who Should Consider SIF Investments?
                </h3>
                <p className="text-base lg:text-lg text-foreground/80 mb-5 leading-relaxed">
                  SIFs are designed for investors who possess market knowledge and risk appetite beyond retail mutual fund investors. The ideal SIF investor profile includes:
                </p>
                <ul className="space-y-3">
                  {investorProfile.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-base lg:text-lg text-foreground/80">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Regulatory Framework */}
              <div className="mt-10">
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4">
                  Regulatory Framework and Oversight
                </h3>
                <div className="prose prose-lg max-w-none space-y-5">
                  <p className="text-base lg:text-lg text-foreground/85 leading-relaxed">
                    SIFs operate under SEBI's Mutual Fund Regulations with additional provisions specific to this category. Only Asset Management Companies (AMCs) meeting strict eligibility criteria can launch SIFs, ensuring professional management and investor protection. SEBI has established two routes for AMC eligibility:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 not-prose">
                    <div className="glass-card p-5">
                      <h4 className="font-bold text-foreground mb-2">Route 1 - Sound Track Record</h4>
                      <p className="text-base text-foreground/75 leading-relaxed">
                        AMCs must have at least 3 years of operational history with an average AUM of ₹10,000 crore over the preceding three years, with no regulatory actions under SEBI Act.
                      </p>
                    </div>
                    <div className="glass-card p-5">
                      <h4 className="font-bold text-foreground mb-2">Route 2 - Alternate Route</h4>
                      <p className="text-base text-foreground/75 leading-relaxed">
                        Newer AMCs must appoint a CIO with 10+ years of fund management experience managing at least ₹5,000 crore average AUM, plus an additional fund manager with 3+ years experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Strategies Section */}
        <section id="investment-strategies" className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  SIF Investment Strategies and Risk Levels
                </h2>
                <p className="text-base lg:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                  SEBI has approved multiple investment strategies under the SIF framework, categorized into equity-oriented, debt-oriented, and hybrid approaches.
                </p>
              </div>

              {/* Equity Strategies */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Equity-Oriented Strategies</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {equityStrategies.map((strategy, index) => (
                    <StrategyCard key={index} strategy={strategy} />
                  ))}
                </div>
              </div>

              {/* Debt Strategies */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Debt-Oriented Strategies</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {debtStrategies.map((strategy, index) => (
                    <StrategyCard key={index} strategy={strategy} />
                  ))}
                </div>
              </div>

              {/* Hybrid Strategies */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Hybrid Strategies</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {hybridStrategies.map((strategy, index) => (
                    <StrategyCard key={index} strategy={strategy} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section id="sif-vs-mf-vs-pms" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  SIF vs Mutual Funds vs PMS: Detailed Comparison
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Understanding how SIFs compare to traditional investment options helps investors make informed decisions about portfolio allocation and strategy selection.
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-bold min-w-[180px]">Parameter</TableHead>
                      <TableHead className="font-bold text-primary min-w-[200px]">SIF</TableHead>
                      <TableHead className="font-bold min-w-[200px]">Mutual Funds</TableHead>
                      <TableHead className="font-bold min-w-[200px]">PMS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((row, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-foreground">{row.feature}</TableCell>
                        <TableCell className="text-primary font-medium bg-primary/5">{row.sif}</TableCell>
                        <TableCell className="text-muted-foreground">{row.mf}</TableCell>
                        <TableCell className="text-muted-foreground">{row.pms}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Key Takeaway */}
              <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                <p className="text-base lg:text-lg text-foreground/85 leading-relaxed">
                  <strong>Key Takeaway:</strong> SIFs occupy the middle ground, offering more sophisticated strategies than mutual funds while being more accessible than PMS. They're ideal for investors who have outgrown traditional mutual funds but aren't ready for the ₹50 lakh PMS commitment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Invest Section */}
        <section id="how-to-invest" className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
                How to Invest in Specialized Investment Funds
              </h2>

              {/* Eligibility Checklist */}
              <div className="glass-card p-6 mb-8">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Investor Eligibility Checklist
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {[
                    "Minimum ₹10 lakh investment capacity (aggregated per AMC)",
                    "KYC compliance through SEBI-registered intermediary",
                    "Understanding of advanced investment strategies",
                    "Medium to long-term investment horizon (3-5+ years)",
                    "Risk appetite aligned with chosen SIF strategy",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-base text-foreground/80">
                      <span className="text-primary mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment Steps */}
              <h3 className="text-xl font-bold text-foreground mb-6">Investment Process: Step-by-Step</h3>
              <div className="space-y-4">
                {investmentSteps.map((step) => (
                  <div key={step.step} className="glass-card p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                      <p className="text-base text-foreground/75 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAN Level Aggregation */}
              <div className="mt-8 p-6 bg-warning/10 border-l-4 border-warning rounded-r-lg">
                <h4 className="font-bold text-foreground mb-2">PAN-Level Aggregation Rule</h4>
                <p className="text-base text-foreground/75 leading-relaxed">
                  The ₹10 lakh minimum investment is calculated by aggregating all investments across different SIF schemes offered by the same AMC under your PAN number. For example, ₹6 lakh in AMC-A's Market Neutral SIF + ₹4 lakh in their Sector Rotation SIF meets the threshold. However, investments across different AMCs are tracked separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits & Risks Section */}
        <section id="benefits---risks" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-10 text-center">
                Benefits and Risks of SIF Investments
              </h2>

              {/* Benefits */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Key Benefits
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="glass-card p-5">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <benefit.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">{benefit.title}</h4>
                      <p className="text-base text-foreground/75 leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Key Risks and Considerations
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {risks.map((risk, index) => (
                    <div key={index} className="glass-card p-5 border-destructive/10">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-3">
                        <risk.icon className="w-5 h-5 text-destructive" />
                      </div>
                      <h4 className="font-bold text-foreground mb-2">{risk.title}</h4>
                      <p className="text-base text-foreground/75 leading-relaxed">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Disclosure */}
              <div className="mt-10 p-6 bg-destructive/5 border border-destructive/20 rounded-lg">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Risk Disclosure
                </h4>
                <p className="text-base text-foreground/75 leading-relaxed">
                  <strong>Important:</strong> Investments in Specialized Investment Funds are subject to market risks. Past performance is not indicative of future returns. SIFs involve relatively higher risk compared to traditional mutual funds, including potential loss of capital, liquidity constraints, and market volatility. Investors should carefully read the Investment Strategy Information Document (ISID) and consult with financial advisors before investing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Comparison Tool CTA */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Live SIF NAV & Performance Comparison
              </h2>
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                Use our comprehensive comparison tool to evaluate SIF schemes across multiple parameters including real-time NAV updates, returns, expense ratios, and risk-adjusted metrics.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["Real-time NAV updates", "Daily/weekly/monthly returns", "Strategy-wise filtering", "Expense ratio comparison", "Risk-adjusted metrics"].map((feature) => (
                  <span key={feature} className="text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                    ✓ {feature}
                  </span>
                ))}
              </div>
              <Link href="/sifnav">
                <Button variant="gold" size="lg" className="gap-2">
                  Launch SIF Comparison Tool <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions (FAQs)
              </h2>
              
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="glass-card px-6 border-none"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5 text-base lg:text-lg">
                      {index + 1}. {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-foreground/80 pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Explore All SIFs & Guides Hub */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">Explore All SIFs & Guides</h2>
                <p className="text-base text-foreground/75 max-w-2xl mx-auto">
                  Browse every Specialized Investment Fund launched in India, alongside in-depth guides on strategy, taxation, rules, and performance.
                </p>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold text-foreground mb-5">SIF Funds by Strategy</h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Equity Long Short</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/qsif-equity-long-short" className="text-foreground/80 hover:text-primary hover:underline">QSIF Equity Long-Short</a></li>
                      <li><a href="/diviniti-equity-long-short" className="text-foreground/80 hover:text-primary hover:underline">Diviniti Equity Long-Short</a></li>
                      <li><a href="/dyna-equity-long-short" className="text-foreground/80 hover:text-primary hover:underline">DynaSIF Equity Long-Short</a></li>
                      <li><a href="/arudha-equity-long-short" className="text-foreground/80 hover:text-primary hover:underline">Arudha Equity Long-Short</a></li>
                      <li><a href="/sifs/sapphire-equity-long-short" className="text-foreground/80 hover:text-primary hover:underline">Sapphire Equity Long-Short</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Ex-Top 100</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/qsif-ex-top-100-long-short" className="text-foreground/80 hover:text-primary hover:underline">QSIF Ex-Top 100 Long-Short</a></li>
                      <li><a href="/sifs/isif/extop100" className="text-foreground/80 hover:text-primary hover:underline">iSIF Ex-Top 100</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Hybrid Long Short</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/sifs/qsif-hybrid-long-short" className="text-foreground/80 hover:text-primary hover:underline">QSIF Hybrid Long-Short</a></li>
                      <li><a href="/sifs/isif/hybrid" className="text-foreground/80 hover:text-primary hover:underline">iSIF Hybrid</a></li>
                      <li><a href="/sifs/magnum-hybrid-long-short" className="text-foreground/80 hover:text-primary hover:underline">Magnum Hybrid (SBI)</a></li>
                      <li><a href="/sifs/titanium-hybrid-long-short" className="text-foreground/80 hover:text-primary hover:underline">Titanium Hybrid (Tata)</a></li>
                      <li><a href="/sifs/altiva-hybrid-long-short" className="text-foreground/80 hover:text-primary hover:underline">Altiva Hybrid (Edelweiss)</a></li>
                      <li><a href="/sifs/arudha-hybrid-long-short" className="text-foreground/80 hover:text-primary hover:underline">Arudha Hybrid</a></li>
                      <li><a href="/apex-hybrid-long-short" className="text-foreground/80 hover:text-primary hover:underline">Apex Hybrid (ABSL)</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Active Asset Allocator</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/dyna-active-asset-allocator" className="text-foreground/80 hover:text-primary hover:underline">DynaSIF Active Asset Allocator</a></li>
                      <li><a href="/sifs/qsif-active-asset-allocator-long-short" className="text-foreground/80 hover:text-primary hover:underline">QSIF Active Asset Allocator</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-5">Guides & Resources</h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">SIF Basics</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/what-is-sif" className="text-foreground/80 hover:text-primary hover:underline">What is a SIF?</a></li>
                      <li><a href="/all-sifs-india-ranked-explained" className="text-foreground/80 hover:text-primary hover:underline">All SIFs in India Ranked</a></li>
                      <li><a href="/which-sif-should-you-invest-in" className="text-foreground/80 hover:text-primary hover:underline">Which SIF Should You Invest In?</a></li>
                      <li><a href="/blog/best-sif-to-invest-2026" className="text-foreground/80 hover:text-primary hover:underline">Best SIF to Invest in 2026</a></li>
                      <li><a href="/sif-compare" className="text-foreground/80 hover:text-primary hover:underline">SIF Comparison Tool</a></li>
                      <li><a href="/best-hybrid-sif" className="text-foreground/80 hover:text-primary hover:underline">Best Hybrid SIF</a></li>
                      <li><a href="/ex-top-100-sif-explained" className="text-foreground/80 hover:text-primary hover:underline">Ex-Top 100 SIF Explained</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Comparisons</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/sif-vs-pms-vs-aif" className="text-foreground/80 hover:text-primary hover:underline">SIF vs PMS vs AIF</a></li>
                      <li><a href="/sif-vs-mf" className="text-foreground/80 hover:text-primary hover:underline">SIF vs Mutual Fund</a></li>
                      <li><a href="/blog/sif-vs-pms-detailed-comparison" className="text-foreground/80 hover:text-primary hover:underline">SIF vs PMS — Detailed</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Rules & Tax</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/sif-tax-guide" className="text-foreground/80 hover:text-primary hover:underline">SIF Tax Guide</a></li>
                      <li><a href="/sif-redemption-rules" className="text-foreground/80 hover:text-primary hover:underline">SIF Redemption Rules</a></li>
                      <li><a href="/sif-liquidity-guide" className="text-foreground/80 hover:text-primary hover:underline">SIF Liquidity Guide</a></li>
                      <li><a href="/sif-derivatives-explained" className="text-foreground/80 hover:text-primary hover:underline">SIF Derivatives Explained</a></li>
                      <li><a href="/sif-sip-swp-guide" className="text-foreground/80 hover:text-primary hover:underline">SIF SIP & SWP Guide</a></li>
                      <li><a href="/blog/sif-sip-minimum-amount" className="text-foreground/80 hover:text-primary hover:underline">SIF SIP Minimum Amount</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">NRI & Advisors</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/nri-sif-guide" className="text-foreground/80 hover:text-primary hover:underline">NRI SIF Guide</a></li>
                      <li><a href="/blog/sif-for-nri-complete-guide" className="text-foreground/80 hover:text-primary hover:underline">Complete NRI SIF Guide</a></li>
                      <li><a href="/sif-for-mfd" className="text-foreground/80 hover:text-primary hover:underline">SIF for MFDs</a></li>
                    </ul>
                  </div>
                  <div className="glass-card p-5 rounded-lg">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Performance & Data</h4>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/sif-performance" className="text-foreground/80 hover:text-primary hover:underline">SIF Performance</a></li>
                      <li><a href="/sifnav" className="text-foreground/80 hover:text-primary hover:underline">SIF NAV Tracker</a></li>
                      <li><a href="/upcoming-sifs" className="text-foreground/80 hover:text-primary hover:underline">Upcoming SIFs</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Start Your SIF Investment Journey
              </h2>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Specialized Investment Funds represent an evolution in India's investment landscape, offering sophisticated strategies with regulatory protection. Access India's most comprehensive SIF comparison platform with live NAV updates and expert insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sifnav">
                  <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                    Start Comparing SIF Funds <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                    Schedule a Consultation
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <InternalLinkHub />

        {/* Disclaimers */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-bold text-foreground mb-4">Important Disclaimers</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <p>
                  <strong>Investment Risk:</strong> Investments in Specialized Investment Funds are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not indicative of future returns. The NAV of the scheme may go up or down depending upon the factors and forces affecting securities markets. Returns are not guaranteed.
                </p>
                <p>
                  <strong>Suitability:</strong> SIFs are not suitable for all investors. These products involve higher risk compared to traditional mutual funds and are designed for informed investors with adequate financial knowledge and risk-bearing capacity.
                </p>
                <p>
                  <strong>Financial Advice:</strong> This page provides educational information about Specialized Investment Funds and should not be construed as investment advice, recommendation, or solicitation to buy or sell any securities. Investors should consult with SEBI-registered financial advisors.
                </p>
                <p>
                  <strong>Data Sources:</strong> SEBI Circulars, AMC Disclosures, AMFI, Official Scheme Documents
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                Last Updated: February 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WhatIsSif;
