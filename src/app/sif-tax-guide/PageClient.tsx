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



const taxData = [
  { fund: "Altiva (Edelweiss)", ltcg: "12.5%", stcg: "Slab Rate", type: "Hybrid <65%" },
  { fund: "Apex (ABSLMF)", ltcg: "12.5%", stcg: "Slab Rate", type: "Hybrid <65%" },
  { fund: "Arudha Equity (Bandhan)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "Arudha Hybrid (Bandhan)", ltcg: "12.5%", stcg: "Slab Rate", type: "Hybrid <65%" },
  { fund: "Diviniti (ITI MF)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "DynaSIF AAF (360 ONE)", ltcg: "12.5%", stcg: "Slab Rate", type: "Multi-Asset <65%" },
  { fund: "DynaSIF Equity (360 ONE)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "iSIF Ex-Top 100 (ICICI Pru)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "iSIF Hybrid (ICICI Pru)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "Magnum (SBI)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "Titanium (Tata)", ltcg: "12.5%", stcg: "Slab Rate", type: "Hybrid <65%" },
  { fund: "QSIF Equity (Quant)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
  { fund: "QSIF Hybrid (Quant)", ltcg: "12.5% after 24M", stcg: "Slab Rate (<24M)", type: "Special — 24M rule" },
  { fund: "QSIF Ex-Top 100 (Quant)", ltcg: "12.5%", stcg: "20%", type: "Equity ≥65%" },
];

const SifTaxGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium">Investor Education</Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF Tax Guide India 2026: LTCG, STCG, and the 12-Month Rule Explained
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Exactly how every Specialized Investment Fund is taxed — and the one fund with a 24-month rule that every investor must know about.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Tax efficiency is one of the most important but least discussed dimensions of SIF investing. Unlike PMS where each transaction in your portfolio triggers a taxable event personally, SIFs are taxed like mutual funds — taxes trigger only at redemption, not at the fund level on every trade. This is a significant structural advantage.
            </p>

            <h2 className="text-2xl font-bold text-foreground">The Basic Framework: Two Types of Gains</h2>
            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
              <li>Funds with equity exposure ≥65% of net assets (predominantly Equity Long-Short SIFs): LTCG at 12.5% after 12 months. STCG at 20% within 12 months.</li>
              <li>Funds with equity exposure &lt;65% (conservative Hybrid SIFs): LTCG at 12.5% after 12 months. Within 12 months: taxed at your income slab rate — potentially 30% for HNIs.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground">Fund-by-Fund Taxation Guide</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fund</TableHead>
                    <TableHead className="font-semibold">LTCG (&gt;12M)</TableHead>
                    <TableHead className="font-semibold">STCG (&lt;12M)</TableHead>
                    <TableHead className="font-semibold">Tax Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                      <TableCell>{row.ltcg}</TableCell>
                      <TableCell>{row.stcg}</TableCell>
                      <TableCell>{row.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">Warning — QSIF Hybrid:</span> QSIF Hybrid's 24-month LTCG threshold is unique among all current SIFs. Investors must hold for a full 2 years to access the 12.5% LTCG rate. Short-horizon investors should consider alternatives.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-foreground">The QSIF Hybrid Exception: The 24-Month Rule</h2>
            <p className="text-muted-foreground leading-relaxed">
              QSIF Hybrid Long-Short Fund from Quant is the only SIF where the LTCG benefit applies after 24 months — not 12. Gains before 24 months are taxed at your slab rate (up to 30% for most HNIs). This is a material difference. Model your exit carefully.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Tax Planning Strategies for SIF Investors</h2>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">1. The 12-Month Cliff — Stay Patient</h3>
                <p className="text-muted-foreground">For equity SIFs, the gap between STCG (20%) and LTCG (12.5%) is 7.5 percentage points. On ₹10 Lakhs with 15% returns, that is ₹11,250 in savings by simply waiting past 12 months.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">2. Exit Load + Tax = True Cost of Early Exit</h3>
                <p className="text-muted-foreground">Most SIFs carry 0.5%–1% exit loads within a defined period. Combine exit load with STCG rate and your true cost of early redemption is significantly higher than just the load.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">3. SIF vs FD — The Post-Tax Story</h3>
                <p className="text-muted-foreground">Arudha Hybrid (Bandhan) targets 6.5–7% pre-tax with debt-like taxation. Post-tax at 12.5%: ~6.1%. An FD at 7% for a 30% bracket HNI yields ~4.9% post-tax. The SIF advantage: over 120 basis points annually.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">4. Harvesting Losses in Interval SIFs</h3>
                <p className="text-muted-foreground">Interval SIFs with restricted redemption windows require advance planning. Since you cannot redeem any given day, plan tax-loss harvesting exits at least 7–30 days ahead depending on the fund.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">SIFPrime Tip:</span> Always model your post-tax return when comparing SIFs. A 14% pre-tax equity SIF return (12.5% LTCG after 12M) delivers 12.25% net — compare this to a 10% hybrid SIF held under 12 months at 30% slab, which delivers only 7% net.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Compare All SIFs Side by Side</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sif-funds-launched"><Button variant="gold" size="lg" className="gap-2">Compare SIFs <ArrowRight className="w-4 h-4" /></Button></Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="lg" className="gap-2">Talk to an Advisor <ArrowRight className="w-4 h-4" /></Button></a>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">Disclaimer: This article is for educational purposes only and does not constitute investment advice. SIF investments are subject to market risk. Minimum investment of ₹10 Lakhs per PAN applies. Please read all Scheme Information Documents carefully before investing.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifTaxGuide;
