"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";



const strategyByFund = [
  { fund: "Altiva (Edelweiss)", strategies: "Arbitrage, covered calls, straddles, strangles, pair trades, special situations" },
  { fund: "Apex (ABSLMF)", strategies: "Arbitrage, hedging, options strategies, short exposure, special situations" },
  { fund: "Arudha Equity (Bandhan)", strategies: "Tactical shorts, index and stock futures" },
  { fund: "Arudha Hybrid (Bandhan)", strategies: "Arbitrage only" },
  { fund: "DynaSIF AAF (360 ONE)", strategies: "Covered calls, volatility trades, arbitrage, commodity derivatives" },
  { fund: "DynaSIF Equity (360 ONE)", strategies: "Tactical shorts, index and stock futures for hedging" },
  { fund: "iSIF Hybrid (ICICI Pru)", strategies: "Covered calls, stock puts, arbitrage" },
  { fund: "iSIF Ex-Top 100 (ICICI Pru)", strategies: "Covered calls, straddles, strangles, pair trades" },
  { fund: "Magnum (SBI)", strategies: "Collars, covered calls, protective puts, arbitrage" },
  { fund: "Titanium (Tata)", strategies: "Long/short futures, options, paired trades, arbitrage" },
  { fund: "QSIF Hybrid (Quant)", strategies: "Arbitrage, covered calls, pair trading, shorts (MARCOV-driven)" },
  { fund: "QSIF Equity (Quant)", strategies: "Covered calls, straddles, spreads, arbitrage" },
];

const SifDerivativesExplained = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="text-xs font-medium mb-4">Strategy Education</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF Derivatives Explained: Covered Calls, Shorts, Straddles, and Pair Trades in Plain English
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              The derivative strategies inside your SIF — what they are, why fund managers use them, and which funds use which strategies across all 19 SIFs.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              One of the most intimidating aspects of Specialized Investment Funds for new investors is the derivatives language. Covered calls. Naked shorts. Straddles. Strangles. Pair trades. Cash-futures arbitrage. If you are coming from a mutual fund background, these terms may seem foreign. But understanding them is essential — because derivatives are not a side note in SIFs. They are the core mechanism that differentiates SIF strategies from everything that came before.
            </p>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">1. Cash-Futures Arbitrage</h2>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">What it is:</span> Simultaneously buying a stock in the cash market and selling the same stock's futures contract at a higher price, locking in the spread as a near risk-free return.</p>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">Why SIFs use it:</span> Arbitrage provides a stable 6–8% annualised return component without directional equity exposure. Used heavily in conservative SIFs as the core return engine.</p>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">Who uses it most:</span> Altiva (Edelweiss) — 20–40% of portfolio. Arudha Hybrid (Bandhan) — minimum 35% of portfolio.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">2. Covered Calls</h2>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">What it is:</span> Selling a call option on a stock you already own. You receive a premium upfront in exchange for capping your upside beyond the strike price.</p>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">Why SIFs use it:</span> Covered calls generate additional income on existing long positions — enhancing yield in sideways or mildly bullish markets.</p>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">Who uses it most:</span> Altiva (Edelweiss), iSIF Hybrid (ICICI Pru), Apex (ABSLMF), Magnum (SBI).</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">3. Unhedged Short Positions</h2>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">What it is:</span> Selling a stock or futures contract you do not own, betting the price will fall. If it does, you buy back cheaper and pocket the difference.</p>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">Why SIFs use it:</span> This is the defining capability of SIFs that conventional mutual funds cannot replicate. Short positions allow managers to profit in falling markets and hedge long positions. SEBI caps unhedged shorts at 25% of net assets.</p>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">Who uses it:</span> All Equity Long-Short SIFs. Maximum short exposure varies — iSIF Hybrid caps at 10% (conservative), most others go to 25%.</p>
            </CardContent></Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">Important — The 25% Cap:</span> The 25% unhedged short limit is a SEBI regulatory cap, not an AMC choice. No SIF can hold more than 25% in unhedged shorts. This distinguishes SIF from AIF Category III which has no such restriction.</p>
              </CardContent>
            </Card>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">4. Straddles and Strangles</h2>
              <p className="text-muted-foreground">Options strategies that profit from large price moves in either direction. A straddle buys both call and put at the same strike. A strangle buys at different strikes — cheaper but needs a bigger move.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">5. Pair Trades</h2>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">What it is:</span> Going long on one stock and simultaneously short on a related stock in the same sector. You profit from relative performance — not from the sector's overall direction.</p>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">Example:</span> Long HDFC Bank, Short Axis Bank. If HDFC outperforms Axis regardless of banking sector direction, the trade profits.</p>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">Why SIFs use it:</span> Pair trades are market-neutral — they reduce systematic market risk and generate alpha purely from relative stock performance. Classic hedge fund strategy, now available in the SIF format.</p>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">Who uses it:</span> iSIF Ex-Top 100 (ICICI Pru), QSIF Hybrid (Quant), Altiva (Edelweiss).</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">6. Protective Puts and Collars</h2>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">What they are:</span> A protective put buys a put option on a stock you own — insurance against a price fall. A collar combines a protective put with a covered call, capping both downside and upside within a defined range.</p>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">Why SIFs use them:</span> Collars are used in conservative strategies to tightly manage net equity exposure. Magnum (SBI) explicitly uses collars to maintain net equity below 10–15%.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-2">7. Special Situations</h2>
              <p className="text-muted-foreground mb-2"><span className="font-semibold text-foreground">What it is:</span> Investing around corporate events — IPOs, QIPs, buybacks, open offers, mergers, demergers — where pricing inefficiencies exist around the event date.</p>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">Who uses it:</span> Altiva (Edelweiss), Apex (ABSLMF), iSIF Hybrid (ICICI Pru).</p>
            </CardContent></Card>

            <h2 className="text-2xl font-bold text-foreground">Derivatives Strategy by Fund — Full Summary</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fund</TableHead>
                    <TableHead className="font-semibold">Key Derivative Strategies Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strategyByFund.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                      <TableCell>{row.strategies}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">Bottom Line:</span> Derivatives in SIFs are not speculative additions — they are the structural mechanism allowing these funds to manage risk and generate returns in ways impossible for conventional mutual funds. Knowing which strategies your SIF uses helps you predict how it will behave across different market conditions.</p>
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

export default SifDerivativesExplained;
