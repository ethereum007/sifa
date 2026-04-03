"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";



const comparisonData = [
  { feature: "Short Selling", sif: "Yes — up to 25%", mf: "No" },
  { feature: "Derivatives", sif: "Full range incl. shorts", mf: "Limited hedging only" },
  { feature: "Alpha Sources", sif: "Long + Short", mf: "Long only" },
  { feature: "Bear Market", sif: "Can profit from shorts", mf: "Typically falls with market" },
  { feature: "Minimum Investment", sif: "₹10 Lakhs", mf: "₹500+" },
  { feature: "Risk Level", sif: "Level 5 (Very High)", mf: "Level 6 (Very High)" },
  { feature: "Return Target", sif: "12–15% p.a.", mf: "Market-linked" },
  { feature: "Investment Horizon", sif: "3–4 years", mf: "5+ years recommended" },
];

const ExTop100SifExplained = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="text-xs font-medium mb-4">Investor Education</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Ex-Top 100 SIF India: The SMID Long-Short Strategy Every Serious Investor Should Understand
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Inside the niche SIF sub-category targeting India's most alpha-rich market segment — mid and small caps — with the added power of short selling.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Among the three SIF categories — Equity Long-Short, Hybrid Long-Short, and Equity Ex-Top 100 Long-Short — the Ex-Top 100 category is the most intriguing and least understood. Two funds have launched here: iSIF Ex-Top 100 Equity Long-Short from ICICI Prudential, and QSIF Equity Ex-Top 100 Long-Short from Quant. Here is a deep dive into what this category means and why it matters for sophisticated investors.
            </p>

            <h2 className="text-2xl font-bold text-foreground">What Does 'Ex-Top 100' Mean?</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Ex-Top 100 category invests in companies outside India's top 100 stocks by market capitalisation — the mid-cap (101st–250th) and small-cap (251st and beyond) universe, commonly called SMID. India's top 100 large-caps are heavily researched, institutionally owned, and efficiently priced. The SMID universe has more pricing inefficiencies, less analyst coverage, and far greater potential for alpha — but also higher volatility and liquidity risk.
            </p>

            <h2 className="text-2xl font-bold text-foreground">The Long-Short Advantage in SMID</h2>
            <p className="text-muted-foreground leading-relaxed">
              A conventional SMID mutual fund can only go long. When valuations stretch or specific stocks become over-valued, the manager just holds cash — a passive response. An Ex-Top 100 SIF can actively short overvalued SMID stocks, generating returns in both directions.
            </p>
            <p className="text-muted-foreground font-semibold">Two distinct alpha sources:</p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Long alpha — picking winners in the SMID universe</li>
              <li>Short alpha — identifying and profiting from SMID stocks likely to underperform or correct</li>
            </ul>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">iSIF Ex-Top 100 — ICICI Prudential</h3>
                <p className="text-muted-foreground">A value-conscious strategy. Core allocation: SMID equity and arbitrage (65–100%), large-cap up to 35%, fixed income buffer (0–35%). Uses covered calls, straddles, strangles, and pair trades. Target return 12–15% p.a. with 3–4 year horizon. Exit load 1% within 1 year. Daily redemption. LTCG 12.5% after 12 months.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">QSIF Equity Ex-Top 100 — Quant</h3>
                <p className="text-muted-foreground">Quant applies their VLRT (Valuation, Liquidity, Risk, Timing) framework to the SMID universe. SMID equity and arbitrage (65–100%), unhedged long derivatives (0–35%), shorts (0–25%). Decisions are model-driven. Daily redemption. Exit load 1% within 15 days — effectively nil for medium-term investors.</p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-foreground">Ex-Top 100 SIF vs. Midcap Mutual Fund</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">Ex-Top 100 SIF</TableHead>
                    <TableHead className="font-semibold">Midcap Mutual Fund</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell>{row.sif}</TableCell>
                      <TableCell>{row.mf}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <h2 className="text-2xl font-bold text-foreground">Is the Ex-Top 100 Category Right for You?</h2>
            <p className="text-muted-foreground leading-relaxed">
              This is not a beginner's SIF. The Ex-Top 100 category suits investors who have already experienced SMID volatility — through PMS, AIF, or direct equity — and now seek a more risk-managed, both-directional approach to the same universe. If you have never held a mid/small cap through a 30–40% drawdown and stayed invested, this is not your entry point.
            </p>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">SIFPrime View:</span> The Ex-Top 100 SIF category is the most alpha-rich segment of the SIF universe — and the highest risk. For the right investor with the right horizon, the combination of SMID alpha and active shorting is genuinely differentiated from anything in conventional mutual funds.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sif-funds-launched"><Button variant="gold" size="lg" className="gap-2">Compare SIFs <ArrowRight className="w-4 h-4" /></Button></Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="lg" className="gap-2">Talk to an Advisor <ArrowRight className="w-4 h-4" /></Button></a>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">Disclaimer: This article is for educational purposes only and does not constitute investment advice. SIF investments are subject to market risk. Minimum investment of ₹10 Lakhs per PAN applies.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExTop100SifExplained;
