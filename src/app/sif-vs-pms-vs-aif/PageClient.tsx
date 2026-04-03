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
  { param: "Minimum Investment", sif: "₹10 Lakhs", pms: "₹50 Lakhs", aif: "₹1 Crore+" },
  { param: "Structure", sif: "Pooled (like MF)", pms: "Separately Managed", aif: "Pooled (closed/open)" },
  { param: "SEBI Regulation", sif: "MF Regulations", pms: "PMS Regulations", aif: "AIF Regulations" },
  { param: "Short Selling", sif: "Yes (up to 25%)", pms: "Limited", aif: "Yes (unrestricted)" },
  { param: "Derivatives Usage", sif: "Yes (SEBI-governed)", pms: "Limited", aif: "Yes (full range)" },
  { param: "Liquidity", sif: "Daily / Interval", pms: "Negotiated", aif: "Limited / Locked" },
  { param: "Tax Treatment", sif: "MF taxation", pms: "Pass-through", aif: "Pass-through" },
  { param: "LTCG Rate", sif: "12.5% after 12M", pms: "12.5% after 12M", aif: "12.5% after 12M" },
  { param: "Transparency", sif: "Daily NAV", pms: "Monthly report", aif: "Quarterly report" },
  { param: "Approx Cost", sif: "1–2% TER", pms: "2–3% + profit share", aif: "2% mgmt + 20% carry" },
  { param: "Investor Protection", sif: "SEBI MF framework", pms: "SEBI PMS framework", aif: "SEBI AIF framework" },
];

const SifVsPmsVsAif = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium">Investor Education</Badge>
              <span className="text-sm text-muted-foreground">March 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF vs PMS vs AIF: Which One Should HNIs Choose in 2025?
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              A no-nonsense comparison of India's three premium investment structures — minimums, costs, liquidity, and when each one makes sense.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-6">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              If you are an HNI investor with ₹25 Lakhs to ₹5 Crore to deploy in a sophisticated strategy, you now have three SEBI-regulated categories: Specialized Investment Funds (SIF), Portfolio Management Services (PMS), and Alternative Investment Funds (AIF Category III). Each has a distinct regulatory framework, cost structure, liquidity profile, and risk-return character. This guide cuts through the jargon.
            </p>

            <h2 className="text-2xl font-bold text-foreground">The Structural Difference</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li><span className="font-semibold text-foreground">SIFs</span> are a new SEBI category (2024), pooled vehicles like mutual funds but with a ₹10 Lakh minimum, short-selling capability, and aggressive derivatives usage unavailable in conventional MFs.</li>
              <li><span className="font-semibold text-foreground">PMS</span> is a separately managed account where you directly own the securities in your own demat. Minimum ₹50 Lakhs.</li>
              <li><span className="font-semibold text-foreground">AIF Category III</span> includes hedge funds and complex derivative strategies targeting high absolute returns. Minimum typically ₹1 Crore. Almost exclusively for ultra-HNIs and family offices.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Parameter</TableHead>
                    <TableHead className="font-semibold">SIF</TableHead>
                    <TableHead className="font-semibold">PMS</TableHead>
                    <TableHead className="font-semibold">AIF Cat III</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.param}</TableCell>
                      <TableCell>{row.sif}</TableCell>
                      <TableCell>{row.pms}</TableCell>
                      <TableCell>{row.aif}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card className="mt-8">
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">When to Choose SIF Over PMS</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>You have ₹10–50 Lakhs to invest and want institutional-grade strategies without the PMS minimum.</li>
                  <li>You want daily NAV transparency and the safety of a SEBI mutual fund framework.</li>
                  <li>You prefer pooled diversification over concentrated single-portfolio management.</li>
                  <li>Tax efficiency matters — SIF taxation mirrors mutual fund rules.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">When to Choose PMS Over SIF</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>You have ₹50 Lakhs+ and want a customised portfolio tailored to your specific tax and allocation needs.</li>
                  <li>You want direct ownership of securities — important for estate planning or pledging.</li>
                  <li>You are looking for concentrated high-conviction strategies with 15–25 stock portfolios.</li>
                  <li>You want to exclude specific stocks (promoter holdings, sectoral conflicts).</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 lg:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">When to Choose AIF Over Both</h2>
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                  <li>You have ₹1 Crore+ and want true hedge fund strategies with unconstrained short selling and leverage.</li>
                  <li>You are comfortable with locked-in capital for 3–5 years.</li>
                  <li>You want access to pre-IPO, private credit, real assets, or distressed debt.</li>
                </ul>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-foreground mt-8">The Cost Advantage of SIF</h2>
            <p className="text-muted-foreground leading-relaxed">
              PMS typically charges 2–3% annual management fees plus profit sharing. SIFs operate under SEBI-capped TER structures. For a ₹10–25 Lakh investor, this can be a meaningful cost advantage over a multi-year horizon — directly improving net returns without any change in strategy.
            </p>

            <Card className="border-primary/20 bg-primary/5 mt-6">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">SIFPrime View:</span> For the ₹10–50 Lakh HNI segment, SIF is the most accessible entry point to institutional-grade strategies. It democratises what was previously available only via PMS or AIF — at a fraction of the minimum ticket size and with full SEBI mutual fund framework protection.
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

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">Disclaimer: This article is for educational purposes only and does not constitute investment advice. SIF investments are subject to market risk. Minimum investment of ₹10 Lakhs per PAN applies. Please read all Scheme Information Documents carefully before investing.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifVsPmsVsAif;
