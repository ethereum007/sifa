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



const redemptionData = [
  { fund: "Altiva (Edelweiss)", purchase: "Daily", redemption: "Mon & Wed only", notice: "Standard T+1/2" },
  { fund: "Apex (ABSLMF)", purchase: "Daily", redemption: "Mon & Wed only", notice: "Standard" },
  { fund: "Arudha Equity (Bandhan)", purchase: "Daily", redemption: "Any business day", notice: "Standard" },
  { fund: "Arudha Hybrid (Bandhan)", purchase: "Daily", redemption: "Mon & Thu only", notice: "Standard" },
  { fund: "Diviniti (ITI MF)", purchase: "Daily", redemption: "Any business day", notice: "Standard" },
  { fund: "DynaSIF AAF (360 ONE)", purchase: "Daily", redemption: "Mondays only", notice: "7 working days" },
  { fund: "DynaSIF Equity (360 ONE)", purchase: "Daily", redemption: "Any business day", notice: "Standard" },
  { fund: "iSIF Ex-Top 100 (ICICI Pru)", purchase: "Daily", redemption: "Any business day", notice: "Standard" },
  { fund: "iSIF Hybrid (ICICI Pru)", purchase: "Daily", redemption: "Mon & Wed only", notice: "Standard" },
  { fund: "Magnum (SBI)", purchase: "Daily", redemption: "Mon & Thu only", notice: "Standard" },
  { fund: "Titanium (Tata)", purchase: "Daily", redemption: "First working day of month", notice: "Standard" },
  { fund: "QSIF Equity (Quant)", purchase: "Daily", redemption: "Any business day", notice: "Standard" },
  { fund: "QSIF Hybrid (Quant)", purchase: "Daily", redemption: "Tue & Wed only", notice: "Standard" },
  { fund: "QSIF Ex-Top 100 (Quant)", purchase: "Daily", redemption: "Any business day", notice: "Standard" },
];

const SifRedemptionRules = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="text-xs font-medium mb-4">Investor Education</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF Redemption Rules India: Can You Exit Whenever You Want?
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Daily exits, twice-a-week windows, monthly lock-ins — the complete liquidity guide for all 14 Specialized Investment Funds before you invest a single rupee.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Before you invest ₹10 Lakhs into a Specialized Investment Fund, you need to understand exactly how and when you can get your money back. Unlike a regular mutual fund where you can redeem any business day, SIFs have a more varied liquidity profile. This guide explains every redemption mechanic currently in operation across all 14 SIFs.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Open-Ended SIFs — Redeem Any Business Day</h2>
            <p className="text-muted-foreground leading-relaxed">
              Open-ended SIFs allow purchase and redemption on any business day, like a conventional mutual fund. These include: Arudha Equity Long-Short (Bandhan), Diviniti Equity Long-Short (ITI MF), DynaSIF Equity Long-Short (360 ONE), iSIF Ex-Top 100 (ICICI Pru), iSIF Hybrid (ICICI Pru), QSIF Equity (Quant), and QSIF Ex-Top 100 (Quant). If liquidity is your priority, these funds give you maximum flexibility.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Interval SIFs — Fixed Redemption Windows</h2>
            <p className="text-muted-foreground leading-relaxed">
              Interval SIFs restrict redemptions to specific pre-defined days each week or month. This allows fund managers to execute illiquid long-short and derivative strategies without being forced to liquidate positions at inopportune times. It requires planning from investors.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Complete Redemption Windows by Fund</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Fund</TableHead>
                    <TableHead className="font-semibold">Purchase</TableHead>
                    <TableHead className="font-semibold">Redemption Window</TableHead>
                    <TableHead className="font-semibold">Notice Period</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.fund}</TableCell>
                      <TableCell>{row.purchase}</TableCell>
                      <TableCell>{row.redemption}</TableCell>
                      <TableCell>{row.notice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">The DynaSIF AAF Special Case: 7 Working Days' Notice</h3>
                <p className="text-muted-foreground">DynaSIF Active Asset Allocator Fund (360 ONE) requires 7 working days' advance notice before the Monday redemption. This is the most restrictive liquidity structure in the current SIF universe. Missing the window means waiting for the following Monday after your full notice period.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">Titanium's Monthly Redemption: The Most Illiquid SIF</h3>
                <p className="text-muted-foreground">Tata's Titanium Hybrid Long-Short Fund allows redemptions only on the first working day of each month. Miss that window and you wait an entire month. Factor this into liquidity planning before investing.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">No Partial Withdrawals — The Critical Rule</h3>
                <p className="text-muted-foreground">Unlike mutual funds, SIFs do not allow partial withdrawals. When you redeem, you exit your full position in that strategy. This is a structural consequence of the ₹10 Lakh per PAN minimum and the nature of long-short fund management. Investors needing regular cash flows must plan liquidity entirely outside their SIF allocation.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">Bottom Line:</span> Match your investment horizon and liquidity needs to the right SIF before investing. If you need flexibility, choose daily redemption funds. If you can lock up capital, interval SIFs typically house the most sophisticated strategies.</p>
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

export default SifRedemptionRules;
