"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinkHub from "@/components/InternalLinkHub";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";



const allSifsData = [
  { fund: "Altiva", amc: "Edelweiss", category: "Hybrid L-S", risk: "L1", target: "9–10%", horizon: "1.5Y+" },
  { fund: "Apex", amc: "ABSLMF", category: "Hybrid L-S", risk: "L2", target: "8–9%", horizon: "1.5–2Y" },
  { fund: "Arudha Equity", amc: "Bandhan", category: "Equity L-S", risk: "L5", target: "12–14%", horizon: "2–3Y+" },
  { fund: "Arudha Hybrid", amc: "Bandhan", category: "Hybrid L-S", risk: "L2", target: "6.5–7%", horizon: "1Y+" },
  { fund: "Diviniti", amc: "ITI MF", category: "Equity L-S", risk: "L2", target: "10–11%", horizon: "2–3Y+" },
  { fund: "DynaSIF AAF", amc: "360 ONE", category: "Multi-Asset", risk: "L3", target: "~10%", horizon: "1–1.5Y+" },
  { fund: "DynaSIF Equity", amc: "360 ONE", category: "Equity L-S", risk: "L5", target: "14–16%", horizon: "3–4Y+" },
  { fund: "iSIF Ex-Top 100", amc: "ICICI Pru", category: "Ex-Top 100 L-S", risk: "L5", target: "12–15%", horizon: "3–4Y+" },
  { fund: "iSIF Hybrid", amc: "ICICI Pru", category: "Hybrid L-S", risk: "L5", target: "11–12%", horizon: "2Y+" },
  { fund: "Magnum", amc: "SBI", category: "Hybrid L-S", risk: "L1", target: "8–10%", horizon: "2Y+" },
  { fund: "Titanium", amc: "Tata", category: "Hybrid L-S", risk: "L3", target: "8–10%", horizon: "2Y+" },
  { fund: "QSIF Equity", amc: "Quant", category: "Equity L-S", risk: "L5", target: "10–12%", horizon: "3Y+" },
  { fund: "QSIF Hybrid", amc: "Quant", category: "Hybrid L-S", risk: "L5", target: "9–10%", horizon: "2–3Y" },
  { fund: "QSIF Ex-Top 100", amc: "Quant", category: "Ex-Top 100 L-S", risk: "L5", target: "—", horizon: "3Y+" },
];

const AllSifsRanked = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium">Investor Education</Badge>
              <span className="text-sm text-muted-foreground">March 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              All 18 SIFs in India Ranked and Explained (2025–26)
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
              The only fund-by-fund breakdown of every Specialized Investment Fund launched in India — strategy, risk band, target returns, and who each fund is built for.
            </p>
            <p className="text-sm text-muted-foreground">SIFPrime.com | Investor Education</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                India's Specialized Investment Fund (SIF) category is one of the most significant regulatory developments in Indian wealth management in recent years. Positioned between Mutual Funds and Portfolio Management Services (PMS), SIFs allow qualified investors to access institutional-grade long-short strategies, derivatives-based hedging, and multi-asset portfolios — all within a SEBI-regulated framework. The minimum ticket is ₹10 Lakhs per PAN.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-4">
                As of April 2026, 18 SIF strategies are tracked on SIFPrime across leading AMCs. Here is a comprehensive breakdown of every fund currently available.
              </p>
            </div>
          </div>
        </section>

        {/* Fund Breakdowns */}
        <section className="py-4 lg:py-8">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* 1. Altiva */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">1. Altiva Hybrid Long-Short Fund — Edelweiss</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 1</Badge>
                  <Badge variant="secondary">Target: 9–10% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Altiva is an income-oriented strategy built around cash-future arbitrage (20–40%), fixed income (40–60%), and special situation derivatives including covered calls and straddles. Net equity exposure is capped at 0–15%, making it one of the most conservative SIF offerings. Minimum investment horizon is 1.5 years. Redemption twice a week — Mondays and Wednesdays. Exit load of 0.50% within 180 days.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Investors seeking FD-beating, low-volatility returns with equity-market participation capped at minimal levels.</p>
              </CardContent>
            </Card>

            {/* 2. Apex */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">2. Apex Hybrid Long-Short Fund — Aditya Birla Sun Life</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 2</Badge>
                  <Badge variant="secondary">Target: 8–9% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Apex is an ESF+ strategy combining arbitrage, directional equity, derivative strategies, and special situations. Equity and arbitrage ranges 35–65%, balanced by equal debt. Unhedged short positions permitted up to 25%. Redemption on Monday and Wednesday. Exit load 0.5% within 3 months.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Investors seeking stable returns through a diversified long-short mandate with limited downside.</p>
              </CardContent>
            </Card>

            {/* 3. Arudha Equity */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">3. Arudha Equity Long-Short Fund — Bandhan</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Equity Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                  <Badge variant="secondary">Target: 12–14% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Flexicap dynamic long-short strategy targeting equity-like returns at nearly half the volatility. All-cap equity and arbitrage (80–100%), fixed income up to 20%, unhedged short derivatives up to 25%. Daily purchase and redemption. Exit load 0.5% within 1 month.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Investors transitioning from aggressive hybrid funds wanting equity returns with significantly lower drawdowns.</p>
              </CardContent>
            </Card>

            {/* 4. Arudha Hybrid */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">4. Arudha Hybrid Long-Short Fund — Bandhan</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 2</Badge>
                  <Badge variant="secondary">Target: 6.5–7% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Zero net equity exposure — 100% fixed income and arbitrage. The SIF category's closest substitute for a fixed deposit with LTCG tax advantage after 12 months. Daily purchase; redemption Mon and Thu.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Fixed income investors seeking better post-tax returns than FDs with near-zero equity risk.</p>
              </CardContent>
            </Card>

            {/* 5. Diviniti */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">5. Diviniti Equity Long-Short Fund — ITI Mutual Fund</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Equity Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 2</Badge>
                  <Badge variant="secondary">Target: 10–11% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Flexicap dynamic long-short strategy from ITI Mutual Fund. All-cap equity and arbitrage (80–100%), fixed income up to 20%, unhedged short derivatives up to 25%. Daily purchase and redemption. Unique exit load: 10% of units free within 6 months; 0.50% on remaining within 6 months.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Equity-linked growth investors seeking managed drawdowns across market cycles.</p>
              </CardContent>
            </Card>

            {/* 6. DynaSIF AAF */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">6. DynaSIF Active Asset Allocator Fund — 360 ONE</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Asset Allocator</Badge>
                  <Badge variant="outline">Risk: Level 3</Badge>
                  <Badge variant="secondary">Target: ~10% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  True multi-asset long-short strategy dynamically allocating across debt (20–65%), equity and REITs (20–50%), and commodity derivatives (0–25%). Covered calls, arbitrage, volatility trades. Redemptions on Mondays only — 7 working days notice required. Exit load 0.5% within 3 months.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Investors seeking diversified multi-asset exposure with active risk management.</p>
              </CardContent>
            </Card>

            {/* 7. DynaSIF Equity */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">7. DynaSIF Equity Long-Short Fund — 360 ONE</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Equity Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                  <Badge variant="secondary">Target: 14–16% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The highest target-return SIF in the current universe. Flexicap long-short with all-cap equity and arbitrage (80–100%), tactical shorts up to 25%. Daily redemption. 3–4 year horizon. Exit load 0.5% within 3 months.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Sophisticated investors seeking aggressive Flexicap alpha with a smarter approach to India's growth story.</p>
              </CardContent>
            </Card>

            {/* 8. iSIF Ex-Top 100 */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">8. iSIF Ex-Top 100 Equity Long-Short Fund — ICICI Prudential</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Equity Ex-Top 100 Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                  <Badge variant="secondary">Target: 12–15% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Value-conscious long-short strategy focused on SMID stocks outside India's top 100. Uses covered calls, straddles, strangles, pair trades. Daily redemption. Exit load 1% within 1 year.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Mid and small-cap investors seeking alpha with active risk management.</p>
              </CardContent>
            </Card>

            {/* 9. iSIF Hybrid */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">9. iSIF Hybrid Long-Short Fund — ICICI Prudential</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                  <Badge variant="secondary">Target: 11–12% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  BAF+ strategy with dynamic net equity from -7.5% to 75%. Covered calls, stock puts, arbitrage. Unhedged shorts capped at 10%. Daily redemption. Exit load 1% within 1 year.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Equity-like returns with 50–70% lower drawdown than pure equity funds.</p>
              </CardContent>
            </Card>

            {/* 10. Magnum */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">10. Magnum Hybrid Long-Short Fund — SBI</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 1</Badge>
                  <Badge variant="secondary">Target: 8–10% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Conservative hybrid using collars, covered calls, arbitrage. Net equity typically below 10–15%. Redemption Mon and Thu. Exit load tiered: 0.5% ≤15 days, 0.25% ≤1 month, nil after.
                </p>
                <p className="text-sm font-medium text-primary">Best for: All-weather investors seeking consistent low-volatility returns backed by India's largest AMC.</p>
              </CardContent>
            </Card>

            {/* 11. Titanium */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">11. Titanium Hybrid Long-Short Fund — Tata</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 3</Badge>
                  <Badge variant="secondary">Target: 8–10% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Dynamic hybrid across equities, debt, REITs, InvITs with tactical long-short derivatives. Unhedged shorts up to 25%. Monthly redemption (first working day). Exit load 1% within 1 year.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Premium investors seeking BAF-type returns with Tata's institutional investment framework.</p>
              </CardContent>
            </Card>

            {/* 12. QSIF Equity */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">12. QSIF Long-Short Equity Fund — Quant</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Equity Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                  <Badge variant="secondary">Target: 10–12% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Quant's proprietary VLRT framework applied to long-short equity. All-cap equity and arbitrage (65–100%), longs up to 35%, shorts up to 25%. Daily redemption. Exit load 1% within 15 days.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Investors seeking Flexicap long-short with Quant's data-driven systematic approach.</p>
              </CardContent>
            </Card>

            {/* 13. QSIF Hybrid */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">13. QSIF Hybrid Long-Short Fund — Quant</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Hybrid Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                  <Badge variant="secondary">Target: 9–10% p.a.</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Systematic long-short hybrid using MARCOV framework and High Frequency Analytics. Redemption Tue and Wed. LTCG applies after 24 months — unique in the category.
                </p>
                <p className="text-sm font-medium text-primary">Best for: Systematic/quant investors seeking BAF-type returns with model-driven execution.</p>
              </CardContent>
            </Card>

            {/* 14. QSIF Ex-Top 100 */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">14. QSIF Equity Ex-Top 100 Long-Short Fund — Quant</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Equity Ex-Top 100 Long-Short</Badge>
                  <Badge variant="outline">Risk: Level 5</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  SMID-focused SIF with Quant's VLRT framework. SMID equity and arbitrage (65–100%), unhedged longs and shorts via derivatives. Daily redemption. Exit load 1% within 15 days.
                </p>
                <p className="text-sm font-medium text-primary">Best for: SMID investors seeking systematic, data-driven alpha generation outside India's top 100 stocks.</p>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Tip */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 lg:p-8 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">SIFPrime Tip:</span> With 18 funds across 11 AMCs and 3 strategy types, choosing the right SIF requires matching your risk appetite, return expectations, liquidity needs, and tax horizon. Use SIFPrime's comparison tool to filter by category, risk level, and target return.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Quick Reference: All 18 SIFs at a Glance</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fund</TableHead>
                    <TableHead className="font-semibold">AMC</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Risk</TableHead>
                    <TableHead className="font-semibold">Target Return</TableHead>
                    <TableHead className="font-semibold">Min Horizon</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allSifsData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                      <TableCell>{row.amc}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.risk}</TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell>{row.horizon}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Compare All SIFs Side by Side</h2>
            <p className="text-muted-foreground mb-6">Use SIFPrime's comparison tool to find the right SIF for your portfolio.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sif-funds-launched">
                <Button variant="gold" size="lg" className="gap-2">
                  Compare SIFs <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2">
                  Talk to an Advisor <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <InternalLinkHub />

        {/* About & Disclaimer */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-lg font-bold text-foreground mb-2">About SIFPrime</h3>
            <p className="text-sm text-muted-foreground mb-4">
              SIFPrime.com is India's first dedicated SIF comparison and distribution platform. For distributor partnerships or investor queries, visit <Link href="/" className="text-primary underline">www.sifprime.com</Link>.
            </p>
            <p className="text-xs text-muted-foreground">
              Disclaimer: This article is for educational purposes only and does not constitute investment advice. SIF investments are subject to market risk. Minimum investment of ₹10 Lakhs per PAN applies. Please read all Scheme Information Documents carefully before investing.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AllSifsRanked;
