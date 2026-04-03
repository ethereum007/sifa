"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Shield, BarChart3, Target, Eye, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import Link from "next/link";



const SifVsMutualFund = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium">Research Report</Badge>
              <span className="text-sm text-muted-foreground">February 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF Strategies vs. Mutual Funds
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
              A Data-Driven Return Comparison Across All 7 Strategy Categories
            </p>
            <p className="text-sm text-muted-foreground">SIFPrime.com | Research Report</p>
          </div>
        </section>

        <article className="py-10 lg:py-16">
          <div className="container mx-auto px-4 max-w-4xl prose-container">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">The New Investment Landscape: SIFs Enter the Arena</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                India's investment ecosystem took a significant leap forward on April 1, 2025, when SEBI's framework for Specialized Investment Funds (SIFs) became effective. Positioned between traditional mutual funds and PMS/AIFs, SIFs democratize sophisticated investment strategies — such as long-short equity, sector rotation, and dynamic asset allocation — for investors with a minimum commitment of ₹10 lakh.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                But here's the question every investor is asking: <strong className="text-foreground">How do SIF strategies compare to the mutual fund categories they most closely resemble?</strong> If a Flexicap or Balanced Advantage fund has delivered solid returns over the years, what incremental benefit does a SIF's long-short strategy actually offer? This article maps each SEBI-approved SIF strategy to its most comparable mutual fund category, examines the historical returns of those MF categories, and explains the structural advantages SIFs bring to the table.
              </p>
            </section>

            {/* 7 SIF Strategies Primer */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">The 7 SIF Strategies: A Quick Primer</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SEBI has defined 7 distinct investment strategies for SIFs, spanning equity, hybrid, debt, and sectoral categories. Each strategy allows fund managers to take unhedged short derivative positions of up to 25% of the portfolio — a flexibility that conventional mutual funds simply do not have.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">SIF Strategy</TableHead>
                      <TableHead className="font-semibold text-foreground">Comparable MF Category</TableHead>
                      <TableHead className="font-semibold text-foreground">Key Differentiator</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Equity Long-Short", "Flexicap / Large Cap / Aggressive Hybrid / BAF", "Can short up to 25% via derivatives"],
                      ["Ex-Top 100 Long-Short", "Midcap / Smallcap / Multicap Funds", "Active hedging on ex-top 100 universe"],
                      ["Sector Rotation Long-Short", "Thematic & Business Cycle Funds", "Can go short on weak sectors dynamically"],
                      ["Asset Allocator Long-Short", "Multi Asset Funds", "Dynamic allocation + derivative hedging"],
                      ["Hybrid Long-Short", "Balanced Advantage / Equity Savings / Arbitrage", "Hybrid construction + active short positions"],
                      ["Debt Long-Short", "Short-Term / Corporate / Dynamic Debt Funds", "Can short rate futures to hedge duration risk"],
                      ["Sectoral Debt Long-Short", "Performing Credit / Direct Debt Offerings", "Targeted credit + hedged sector debt exposure"],
                    ].map(([strategy, comparable, diff], i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground">{strategy}</TableCell>
                        <TableCell className="text-muted-foreground">{comparable}</TableCell>
                        <TableCell className="text-muted-foreground">{diff}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Category-by-Category Return Analysis</h2>

            {/* 1. Equity Long-Short */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">1</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Equity Long-Short SIF vs. Flexicap / Large Cap / BAF</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Equity Long-Short SIF is the flagship strategy — and its MF comparables have been among the most popular categories for retail investors over the past decade.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Fund / Category</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">1-Year</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">3-Year CAGR</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">5-Year CAGR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Quant Flexi Cap Fund", "~8%", "19.6%", "30.5%"],
                      ["Parag Parikh Flexi Cap Fund", "~10%", "18.5%", "24.7%"],
                      ["JM Flexicap Fund", "~7%", "21.5%", "23.4%"],
                      ["Edelweiss Flexi Cap Fund", "~9%", "20.9%", "17.6%"],
                      ["HDFC Flexi Cap Fund", "~8%", "19.0%", "21.0%"],
                      ["Flexicap Category Average", "~7-10%", "~18-21%", "~18-27%"],
                    ].map(([fund, y1, y3, y5], i) => (
                      <TableRow key={i} className={i === 5 ? "bg-muted/30 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{fund}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y1}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y3}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y5}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>The key advantage:</strong> In 2025, equity markets were relatively flat to mildly negative. A long-short strategy could have reduced drawdown significantly, as fund managers could short overvalued sectors rather than simply waiting for recovery. Long-only flexicap funds delivered muted 1-year returns of 7-10%, while a well-executed long-short strategy could have delivered positive, consistent returns.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 2. Ex-Top 100 */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">2</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Ex-Top 100 Long-Short SIF vs. Midcap / Smallcap / Multicap Funds</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This strategy focuses on the universe beyond the top 100 stocks by market capitalisation — directly comparable to midcap, smallcap, and multicap mutual funds. This segment is notorious for its boom-bust cycles.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Fund / Category</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">1-Year</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">3-Year CAGR</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">5-Year CAGR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["HDFC Mid Cap Opportunities", "6.5%", "~18%", "~22%"],
                      ["Kotak Midcap Fund", "1.8%", "~17%", "~22%"],
                      ["Quant Small Cap Fund", "~10%", "~30%", "33%"],
                      ["SBI Small Cap Fund", "~5%", "~22%", "~27%"],
                      ["Nippon India Multicap Fund", "3.6%", "~23%", "~26%"],
                      ["Midcap Category Avg", "1.9%", "~17-20%", "~22-32%"],
                      ["Smallcap Category Avg (2025)", "-4.4%", "~20-30%", "~25-28%"],
                    ].map(([fund, y1, y3, y5], i) => (
                      <TableRow key={i} className={i >= 5 ? "bg-muted/30 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{fund}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y1}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y3}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y5}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>The case for SIF is strongest here:</strong> Smallcap funds delivered -4.4% on average in 2025. An Ex-Top 100 Long-Short SIF could have used short positions to hedge against this drawdown while still participating in pockets of strength like select mid-cap industrials or specialty chemicals.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 3. Sector Rotation */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">3</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Sector Rotation Long-Short SIF vs. Thematic & Business Cycle Funds</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Thematic and business cycle funds made headlines in 2022-2024 as manufacturing, capex, and defence themes dominated. But theme-based MFs are long-only — they cannot exit short when a sector turns.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Category / Fund</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">1-Year</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">3-Year CAGR</TableHead>
                      <TableHead className="font-semibold text-foreground">Key Risk</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Business Cycle Funds (Avg)", "~5-8%", "~18-22%", "Long-only; can't hedge when cycle turns"],
                      ["Thematic Funds (Defence/Infra)", "~12-18%", "~20-28%", "Concentrated; no hedging flexibility"],
                      ["SIF Sector Rotation L-S", "+Mkt-neutral", "Target: cycle-agnostic", "Execution risk on short calls"],
                    ].map(([cat, y1, y3, risk], i) => (
                      <TableRow key={i} className={i === 2 ? "bg-primary/5 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{cat}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y1}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y3}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{risk}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A Sector Rotation Long-Short SIF can go long on an emerging sector (e.g., renewables, defence) while simultaneously shorting an overvalued or weakening sector (e.g., legacy IT). This creates a return stream that is less correlated to overall market direction.
              </p>
            </section>

            {/* 4. Asset Allocator */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">4</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Asset Allocator Long-Short SIF vs. Multi Asset Funds</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Multi asset funds are among India's most popular allocation tools for conservative-aggressive investors. They are long-only by design.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Fund</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">1-Year</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">3-Year CAGR</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">5-Year CAGR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["HDFC Multi Asset Fund", "~8%", "~16%", "~18%"],
                      ["ICICI Pru Multi Asset Fund", "~10%", "~18%", "~20%"],
                      ["Quant Multi Asset Fund", "~6%", "~20%", "~24%"],
                      ["Multi Asset Category", "~7-10%", "~15-18%", "~16-22%"],
                    ].map(([fund, y1, y3, y5], i) => (
                      <TableRow key={i} className={i === 3 ? "bg-muted/30 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{fund}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y1}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y3}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y5}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>The structural edge:</strong> By shorting asset classes or indices during periods of overvaluation, an Asset Allocator SIF can deliver smoother returns with fewer drawdowns — the holy grail for wealth preservation-oriented investors.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 5. Hybrid Long-Short */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">5</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Hybrid Long-Short SIF vs. Balanced Advantage / Equity Savings / Arbitrage</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Balanced Advantage Funds (BAFs) dynamically allocate between equity and debt. They are the closest MF equivalent to a hybrid long-short strategy — but BAFs cannot take naked short derivative positions.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Fund / Category</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">1-Year</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">3-Year CAGR</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">5-Year CAGR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["HDFC Balanced Advantage Fund", "~10%", "~16%", "~19%"],
                      ["ICICI Pru Balanced Advantage Fund", "~11%", "~15%", "~17%"],
                      ["Equity Savings Funds", "~7-9%", "~10-12%", "~11-14%"],
                      ["Arbitrage Funds (Category Avg)", "~6-8%", "~6-7%", "~6.5-7%"],
                      ["SIF Hybrid Long-Short", "~8-13%", "Target: ~15-18%", "To be tracked"],
                    ].map(([fund, y1, y3, y5], i) => (
                      <TableRow key={i} className={i === 4 ? "bg-primary/5 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{fund}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y1}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y3}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y5}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The Hybrid Long-Short SIF bridges the gap between a BAF and an absolute return fund. Investors who want equity-oriented returns with significantly lower drawdown — and more upside than arbitrage — will find this category compelling.
              </p>
            </section>

            {/* 6. Debt Long-Short */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">6</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Debt Long-Short SIF vs. Short-Term / Corporate / Dynamic Debt Funds</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In debt markets, the ability to short rate futures or credit indices is a game-changer. Traditional debt funds can only reduce duration or go defensive.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Fund / Category</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">1-Year</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">3-Year CAGR</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">5-Year CAGR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Short-Term Debt Funds (Avg)", "~7.5-8.5%", "~6.5-7.5%", "~6.5-7%"],
                      ["Corporate Bond Funds (Avg)", "~7.5-8%", "~6.5-7%", "~7-8%"],
                      ["Dynamic Bond Funds (Avg)", "~7-9%", "~6-8%", "~6.5-8%"],
                      ["SIF Debt Long-Short", "~8-11%", "Target: ~8-10%", "To be tracked"],
                    ].map(([fund, y1, y3, y5], i) => (
                      <TableRow key={i} className={i === 3 ? "bg-primary/5 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{fund}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y1}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y3}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{y5}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                In rising rate or volatile rate environments — as seen in 2022-23 globally — debt funds suffered. A Debt Long-Short SIF could hedge this interest rate risk actively, protecting capital while still generating carry income.
              </p>
            </section>

            {/* 7. Sectoral Debt */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">7</span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">Sectoral Debt Long-Short SIF vs. Performing Credit / Direct Debt</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This is the most specialized category — targeting sector-specific credit opportunities with the ability to hedge sector-specific credit exposure.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Category</TableHead>
                      <TableHead className="font-semibold text-foreground text-right">Typical Yield</TableHead>
                      <TableHead className="font-semibold text-foreground">Risk Level</TableHead>
                      <TableHead className="font-semibold text-foreground">Liquidity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Credit Risk Funds (MF)", "8-9%", "Medium-High", "T+1 to T+3"],
                      ["High-Yield Debt / AIF", "11-14%", "High", "Locked 2-3 years"],
                      ["Direct NCDs / Bonds", "8.5-12%", "Medium-High", "Secondary market"],
                      ["SIF Sectoral Debt L-S", "Target 9-12%", "Medium-High", "Monthly/Quarterly"],
                    ].map(([cat, yield_, risk, liq], i) => (
                      <TableRow key={i} className={i === 3 ? "bg-primary/5 font-medium" : ""}>
                        <TableCell className="font-medium text-foreground">{cat}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{yield_}</TableCell>
                        <TableCell className="text-muted-foreground">{risk}</TableCell>
                        <TableCell className="text-muted-foreground">{liq}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* 5 Structural Edges */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">The SIF Advantage: 5 Structural Edges Over Mutual Funds</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">Feature</TableHead>
                      <TableHead className="font-semibold text-foreground">Traditional Mutual Fund</TableHead>
                      <TableHead className="font-semibold text-foreground">SIF</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Short Selling", "Not permitted (long-only)", "Up to 25% unhedged short via derivatives"],
                      ["Strategy Flexibility", "Category-restricted mandates", "Long-short, sector rotation, asset allocation"],
                      ["Taxation (Equity)", "LTCG at 12.5% after 12 months", "Same as equity MFs — LTCG at 12.5%"],
                      ["Minimum Investment", "₹500 – ₹5,000 (SIP)", "₹10 lakh per investor per AMC"],
                      ["Downside Protection", "Limited (cash/defensive allocation)", "Active hedging via derivative shorts"],
                      ["PMS Comparison", "N/A", "Same strategies at lower ticket than PMS (₹50L)"],
                      ["Transparency", "Daily NAV, monthly portfolio", "Daily NAV, bi-monthly portfolio disclosure"],
                      ["Regulatory Oversight", "SEBI (Mutual Fund Regulations)", "SEBI (same MF regulations — same protection)"],
                    ].map(([feature, mf, sif], i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground">{feature}</TableCell>
                        <TableCell className="text-muted-foreground">{mf}</TableCell>
                        <TableCell className="text-foreground font-medium">{sif}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Who Should Consider */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Who Should Consider SIFs?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SIFs are not for everyone — but for the right investor, they can be a powerful tool for alpha generation and portfolio protection:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: TrendingUp, title: "HNI & Mass Affluent Investors", desc: "Those who have maxed out conventional mutual fund allocations and seek higher risk-adjusted returns." },
                  { icon: BarChart3, title: "Portfolio Diversification Seekers", desc: "Investors looking for return streams uncorrelated to traditional long-only equity markets." },
                  { icon: Target, title: "PMS Investors at Lower Ticket", desc: "Those who want PMS-style sophistication but cannot commit ₹50 lakh; SIFs offer the same at ₹10 lakh." },
                  { icon: Shield, title: "Bear/Sideways Market Navigators", desc: "Investors who want to stay active during corrections rather than sitting out or suffering drawdowns." },
                ].map((item, i) => (
                  <Card key={i} className="border-border">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>Who should NOT invest yet:</strong> Those who need daily liquidity, have never invested in mutual funds, or cannot absorb potential capital losses — SIFs carry higher risk than vanilla MFs.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* What to Watch */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">The SIFPrime Perspective: What to Watch</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                As India's first SIF comparison platform, SIFPrime.com is tracking the real-world performance of SIF strategies as they launch and build track records.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold text-foreground">SIF Strategy</TableHead>
                      <TableHead className="font-semibold text-foreground">MF Benchmark to Beat</TableHead>
                      <TableHead className="font-semibold text-foreground">Key Metric to Watch</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Equity Long-Short", "Flexicap Category Avg (~18-21% CAGR)", "Alpha in flat/falling markets"],
                      ["Ex-Top 100 Long-Short", "Midcap/Smallcap Category Avg", "Drawdown reduction in bear phases"],
                      ["Sector Rotation L-S", "Business Cycle Fund Avg", "Sector timing accuracy over cycles"],
                      ["Asset Allocator L-S", "Multi Asset Fund Avg (~16-20%)", "Sharpe ratio vs. multi asset MFs"],
                      ["Hybrid Long-Short", "BAF Category Avg (~15-17%)", "Consistency across bull and bear markets"],
                      ["Debt Long-Short", "Short-Term / Dynamic Debt Avg", "Outperformance in rising rate environment"],
                      ["Sectoral Debt Long-Short", "Credit Risk / Direct Debt Yield", "Default rate and recovery management"],
                    ].map(([strategy, benchmark, metric], i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground">{strategy}</TableCell>
                        <TableCell className="text-muted-foreground">{benchmark}</TableCell>
                        <TableCell className="text-muted-foreground">{metric}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Conclusion: The Promise vs. The Track Record</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SIFs are a genuinely exciting new chapter in Indian investing — but one with an important caveat: <strong className="text-foreground">there is no live track record yet.</strong> The first SIF (Quant's QSIF Equity Long-Short Fund) launched in September 2025, and most others are in early stages. The comparable mutual fund categories, by contrast, have delivered 5 to 15 years of return data across multiple market cycles.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">The honest assessment:</strong> SIFs structurally should outperform their MF comparables during sideways and bear markets due to their long-short capability. In raging bull markets, long-only MFs may still hold the edge. Over a full market cycle, the best SIFs aim to deliver superior risk-adjusted returns — more return per unit of risk — rather than necessarily higher absolute returns in all market conditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For India's growing cohort of sophisticated investors — those who have experienced the pain of holding long-only midcap funds during the 2024-25 correction — SIFs offer a credible, SEBI-regulated path to smarter investing.
              </p>
            </section>

            {/* CTA */}
            <section className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 p-8 text-center mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">Compare All Active SIF Strategies</h3>
              <p className="text-muted-foreground mb-6">Track real-time data on India's first dedicated SIF comparison platform.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/sifs">
                  <Button variant="default" size="lg" className="gap-2">
                    Explore SIF Funds <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2">
                    Schedule Consultation <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </section>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-6">
              <strong>Disclaimer:</strong> Mutual fund returns shown are historical category averages and illustrative top-fund data sourced from publicly available fund factsheets and industry reports (as of December 2025–January 2026). SIF return projections are indicative and based on strategy design, not actual track record. Past performance is not a guarantee of future results. This article is for educational purposes only and does not constitute investment advice. Please consult a SEBI-registered financial advisor before investing.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default SifVsMutualFund;
