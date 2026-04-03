"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info, User, Shield, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";



const exitLoadData = [
  { fund: "Altiva (Edelweiss)", exitLoad: "0.50% within 180 days; Nil after" },
  { fund: "Apex (ABSLMF)", exitLoad: "0.5% within 3 months; Nil after" },
  { fund: "Arudha Equity (Bandhan)", exitLoad: "0.5% within 1 month; Nil after" },
  { fund: "Arudha Hybrid (Bandhan)", exitLoad: "Nil" },
  { fund: "Diviniti (ITI MF)", exitLoad: "10% of units free within 6M; 0.5% on balance within 6M" },
  { fund: "DynaSIF AAF (360 ONE)", exitLoad: "0.5% within 3 months; Nil after" },
  { fund: "DynaSIF Equity (360 ONE)", exitLoad: "0.5% within 3 months; Nil after" },
  { fund: "iSIF Ex-Top 100 (ICICI Pru)", exitLoad: "1% within 1 year; Nil after" },
  { fund: "iSIF Hybrid (ICICI Pru)", exitLoad: "1% within 1 year; Nil after" },
  { fund: "Magnum (SBI)", exitLoad: "0.5% ≤15 days; 0.25% ≤1 month; Nil after" },
  { fund: "Titanium (Tata)", exitLoad: "1% within 1 year; Nil after" },
  { fund: "QSIF Equity (Quant)", exitLoad: "1% within 15 days; Nil after" },
  { fund: "QSIF Hybrid (Quant)", exitLoad: "1% within 15 days; Nil after" },
  { fund: "QSIF Ex-Top 100 (Quant)", exitLoad: "1% within 15 days; Nil after" },
];

const WhichSifToInvest = () => {
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
              Which SIF Should You Invest In? A Profile-Based Matching Guide (2025)
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
              Conservative preservers, hybrid seekers, alpha hunters, and SMID believers — find the exact SIF built for your investment profile.
            </p>
            <p className="text-sm text-muted-foreground">SIFPrime.com | Investor Education</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              With 14 Specialized Investment Funds now available from leading Indian AMCs, the most common question from HNI investors and advisors is: which one do I choose? The ₹10 Lakh minimum means this is not a casual allocation — it requires deliberate matching between investor profile and fund mandate.
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mt-4">
              This guide breaks the SIF universe into four investor personas and maps each to the most suitable funds currently available.
            </p>
          </div>
        </section>

        {/* Personas */}
        <section className="py-4 lg:py-8">
          <div className="container mx-auto px-4 max-w-4xl space-y-10">

            {/* Persona 1 */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">Persona 1: The Conservative Capital Preserver</h2>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground space-y-1">
                  <p>HNI with ₹5 Cr+ liquid networth. Priority is capital protection and steady income.</p>
                  <p>Currently in FDs, arbitrage funds, or conservative hybrid MFs. Willing to lock up capital for 1–2 years.</p>
                  <p>Return expectation: 7–10% p.a. pre-tax. Volatility tolerance: Very Low.</p>
                </div>
                <h3 className="font-semibold text-foreground mb-3">Best SIF Matches</h3>
                <ul className="space-y-3">
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Arudha Hybrid Long-Short (Bandhan)</span> — Zero net equity, pure arbitrage and fixed income. Target 6.5–7%. Risk Level 2. Perfect FD replacement with tax efficiency after 1 year.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Magnum Hybrid Long-Short (SBI)</span> — Net equity under 15%, collars and covered calls, SBI brand backing. Target 8–10%. Risk Level 1.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Altiva Hybrid Long-Short (Edelweiss)</span> — Income-oriented with arbitrage core. Target 9–10%. Risk Level 1.
                  </li>
                </ul>
                <Card className="mt-4 border-primary/20 bg-primary/5">
                  <CardContent className="p-4 flex gap-3">
                    <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Key Consideration:</span> For this persona, check redemption schedules carefully. Arudha Hybrid redeems Mon/Thu, Magnum Mon/Thu, Altiva Mon/Wed. Plan liquidity needs around these windows.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Persona 2 */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">Persona 2: The Return-Seeking Hybrid Investor</h2>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground space-y-1">
                  <p>Currently in BAF or aggressive hybrid mutual funds. Wants better risk-adjusted returns with downside protection.</p>
                  <p>2–3 year horizon. Ticket size ₹25–50 Lakhs.</p>
                  <p>Return expectation: 10–12% p.a. Volatility tolerance: Moderate.</p>
                </div>
                <h3 className="font-semibold text-foreground mb-3">Best SIF Matches</h3>
                <ul className="space-y-3">
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Apex Hybrid Long-Short (ABSLMF)</span> — ESF+ strategy, diversified long-short, 35–65% equity-debt split. Target 8–9%. Mon/Wed redemption.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">iSIF Hybrid Long-Short (ICICI Pru)</span> — BAF+ with -7.5% to 75% dynamic equity range. Target 11–12%. Daily redemption.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Titanium Hybrid Long-Short (Tata)</span> — Multi-asset with REITs and InvITs. Target 8–10%. Monthly redemption.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">DynaSIF Active Asset Allocator (360 ONE)</span> — True multi-asset including commodities. Target ~10%. Monday-only redemption.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Persona 3 */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">Persona 3: The Alpha Hunter — Equity-Oriented</h2>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground space-y-1">
                  <p>PMS or AIF experience. Comfortable with equity-level volatility. 3+ year horizon.</p>
                  <p>Understands derivatives and long-short mechanics.</p>
                  <p>Return expectation: 12–16% p.a. Volatility tolerance: High.</p>
                </div>
                <h3 className="font-semibold text-foreground mb-3">Best SIF Matches</h3>
                <ul className="space-y-3">
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">DynaSIF Equity Long-Short (360 ONE)</span> — Highest target return in category at 14–16%. Flexicap with aggressive short positioning. Daily redemption.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Arudha Equity Long-Short (Bandhan)</span> — 12–14% target. Half the volatility of pure equity.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Diviniti Equity Long-Short (ITI MF)</span> — 10–11% target. Flexicap with tactical shorts. Daily redemption.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">QSIF Long-Short Equity (Quant)</span> — Data-driven VLRT framework. 10–12% target.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Persona 4 */}
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">Persona 4: The SMID Believer</h2>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm text-muted-foreground space-y-1">
                  <p>Believes in India's mid and small-cap growth story but wants managed risk.</p>
                  <p>Return expectation: 12–15% p.a. Volatility tolerance: High but wants managed drawdowns.</p>
                </div>
                <h3 className="font-semibold text-foreground mb-3">Best SIF Matches</h3>
                <ul className="space-y-3">
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">iSIF Ex-Top 100 Equity Long-Short (ICICI Pru)</span> — Core SMID with pair trades, covered calls, shorts. 12–15% target. Daily redemption. 1% exit load within 1 year.
                  </li>
                  <li className="text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">QSIF Equity Ex-Top 100 Long-Short (Quant)</span> — SMID focus with Quant's systematic VLRT approach. Daily redemption.
                  </li>
                </ul>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Exit Load Table */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">Exit Load Comparison — Know Before You Redeem</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fund</TableHead>
                    <TableHead className="font-semibold">Exit Load Structure</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exitLoadData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                      <TableCell>{row.exitLoad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Bottom Line */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 lg:p-8 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Bottom Line:</span> There is no universally best SIF — only the right SIF for your specific profile. Match on four axes: risk tolerance, return expectation, liquidity window, and investment horizon. When in doubt, compare side-by-side on SIFPrime.com.
                </p>
              </CardContent>
            </Card>
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

export default WhichSifToInvest;
