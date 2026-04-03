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



const glanceData = [
  { fund: "Altiva", amc: "Edelweiss", risk: "L1", target: "9–10%", redemption: "Mon & Wed", horizon: "1.5Y+" },
  { fund: "Apex", amc: "ABSLMF", risk: "L2", target: "8–9%", redemption: "Mon & Wed", horizon: "1.5–2Y" },
  { fund: "Arudha Hybrid", amc: "Bandhan", risk: "L2", target: "6.5–7%", redemption: "Mon & Thu", horizon: "1Y+" },
  { fund: "Magnum", amc: "SBI", risk: "L1", target: "8–10%", redemption: "Mon & Thu", horizon: "2Y+" },
  { fund: "Titanium", amc: "Tata", risk: "L3", target: "8–10%", redemption: "1st of Month", horizon: "2Y+" },
  { fund: "iSIF Hybrid", amc: "ICICI Pru", risk: "L5", target: "11–12%", redemption: "Mon & Wed", horizon: "2Y+" },
  { fund: "QSIF Hybrid", amc: "Quant", risk: "L5", target: "9–10%", redemption: "Tue & Wed", horizon: "2–3Y" },
];

const verdictData = [
  { need: "FD replacement, near-zero equity risk", fund: "Arudha Hybrid (Bandhan)" },
  { need: "Conservative with largest AMC backing", fund: "Magnum (SBI)" },
  { need: "Balanced hybrid, diversified strategies", fund: "Apex (ABSLMF)" },
  { need: "Multi-asset including REITs/InvITs", fund: "Titanium (Tata)" },
  { need: "Maximum return in hybrid label", fund: "iSIF Hybrid (ICICI Pru)" },
  { need: "Quant/systematic model-driven approach", fund: "QSIF Hybrid (Quant)" },
  { need: "All-weather income with alpha kicker", fund: "Altiva (Edelweiss)" },
];

const BestHybridSif = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="text-xs font-medium mb-4">Investor Education</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Apex vs Magnum vs Titanium vs Altiva: Which Is India's Best Hybrid Long-Short SIF?
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              7 funds, 6 AMCs, one category — the most comprehensive head-to-head comparison of every Hybrid Long-Short SIF in India right now.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              The Hybrid Long-Short category is the most competitive segment of the current SIF universe, with 7 funds from 6 AMCs all targeting broadly similar investor profiles. Yet the strategies, risk profiles, and redemption structures are meaningfully different. This comparison helps you identify which hybrid SIF best matches your needs.
            </p>

            <h2 className="text-2xl font-bold text-foreground">The 7 Contenders at a Glance</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fund</TableHead>
                    <TableHead className="font-semibold">AMC</TableHead>
                    <TableHead className="font-semibold">Risk</TableHead>
                    <TableHead className="font-semibold">Target Return</TableHead>
                    <TableHead className="font-semibold">Redemption</TableHead>
                    <TableHead className="font-semibold">Min Horizon</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {glanceData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                      <TableCell>{row.amc}</TableCell>
                      <TableCell>{row.risk}</TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell>{row.redemption}</TableCell>
                      <TableCell>{row.horizon}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <h2 className="text-2xl font-bold text-foreground">Strategy Deep-Dives</h2>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">Most Conservative: Arudha Hybrid (Bandhan)</h3>
              <p className="text-muted-foreground">Zero net equity exposure. 100% fixed income and arbitrage. Closest substitute to a liquid debt fund — with LTCG tax advantage after 12 months. For HNIs in the 30% tax bracket, the post-tax FD replacement value is substantial.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">Most Institutionally Structured: Apex (ABSLMF)</h3>
              <p className="text-muted-foreground">Apex's ESF+ strategy combines arbitrage, directional equity, derivatives strategies, and special situations — IPOs, QIPs, buybacks — with tactical shorts up to 25%. The 35–65% equity-debt split gives it genuine flexibility. ABSLMF's institutional pedigree and research depth are a strong advantage.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">Most Conservative with Brand Assurance: Magnum (SBI)</h3>
              <p className="text-muted-foreground">SBI's brand brings institutional credibility and AUM stability. Magnum uses collars, covered calls, and arbitrage to tightly control net equity below 10–15%. Risk Level 1 with the backing of India's largest AMC makes this a default choice for conservative HNIs.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">Most Diversified: Titanium (Tata)</h3>
              <p className="text-muted-foreground">Titanium is the only hybrid SIF explicitly including REITs and InvITs alongside equity, debt, and derivatives. Genuine multi-asset with paired trades and unhedged shorts. The caveat: monthly-only redemption is the most restrictive in the hybrid category.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">Highest Return Target: iSIF Hybrid (ICICI Pru)</h3>
              <p className="text-muted-foreground">At 11–12% target return, the most aggressive hybrid SIF. BAF+ structure with net equity ranging -7.5% to 75% — enormous flexibility. Level 5 risk. Daily redemption. For investors wanting hybrid label with equity-class return potential, this is the standout.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">Most Systematic: QSIF Hybrid (Quant)</h3>
              <p className="text-muted-foreground">MARCOV framework + High Frequency Analytics drive buy-sell decisions systematically — not discretionarily. Only model-driven hybrid SIF in the category. Important: 24-month LTCG rule applies — unique penalty for short-horizon investors.</p>
            </CardContent></Card>

            <h2 className="text-2xl font-bold text-foreground">Verdict by Investor Type</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Your Need</TableHead>
                    <TableHead className="font-semibold">Best Hybrid SIF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verdictData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.need}</TableCell>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">SIFPrime Tip:</span> Risk Level 1 and Level 5 funds both carry the 'Hybrid Long-Short' label but are fundamentally different in risk-return character. Never compare by category label alone — always dig into net equity exposure, derivatives usage, and target return range.</p>
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

export default BestHybridSif;
