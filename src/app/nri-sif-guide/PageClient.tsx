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



const accountData = [
  { feature: "Source of Funds", nre: "Foreign income / overseas remittance", nro: "Indian income (rent, dividends, etc.)" },
  { feature: "Repatriation", nre: "Fully repatriable", nro: "Up to USD 1 million/year" },
  { feature: "Currency", nre: "INR (backed by foreign currency)", nro: "INR only" },
  { feature: "TDS on Redemption", nre: "No TDS (subject to DTAA)", nro: "TDS applicable" },
  { feature: "Joint Holding", nre: "Only with NRI/PIO/OCI", nro: "Can be with resident Indian" },
];

const NriSifGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <Badge variant="secondary" className="text-xs font-medium mb-4">NRI Investment Guide</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              NRI Guide to SIF Investments in India 2025: Rules, Taxation, and Best Funds
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Everything a non-resident Indian needs to know before investing in Specialized Investment Funds — eligibility, KYC, repatriation, and which SIFs make most sense for NRI portfolios.
            </p>
          </div>
        </section>

        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              India's SIF category has quickly become one of the most talked-about products among NRIs seeking India market exposure with sophisticated risk management. But can NRIs actually invest in SIFs? What are the rules? And which SIFs make most sense for an NRI portfolio? Here is the complete guide.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Can NRIs Invest in SIFs? The Short Answer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Yes. NRIs are eligible to invest in Specialized Investment Funds, subject to the same SEBI regulations and the ₹10 Lakh per PAN minimum. Investment is made through an NRE (Non-Resident External) or NRO (Non-Resident Ordinary) account depending on whether the investor wants repatriable or non-repatriable exposure.
            </p>

            <h2 className="text-2xl font-bold text-foreground">NRE vs NRO Account — What's the Difference for SIF?</h2>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">NRE Account Route</TableHead>
                    <TableHead className="font-semibold">NRO Account Route</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accountData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.feature}</TableCell>
                      <TableCell>{row.nre}</TableCell>
                      <TableCell>{row.nro}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <h2 className="text-2xl font-bold text-foreground">KYC Requirements for NRI SIF Investment</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>Valid passport copy (self-attested)</li>
              <li>Overseas address proof (bank statement, utility bill — not older than 3 months)</li>
              <li>Indian PAN card (mandatory for ₹10 Lakh+ investment)</li>
              <li>NRE/NRO bank account details with IFSC code</li>
              <li>FATCA/CRS declaration</li>
              <li>In-person verification (IPV) — many AMCs now accept video KYC</li>
            </ul>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">US and Canada NRIs: Check Before You Invest</h3>
                <p className="text-muted-foreground">NRIs residing in the US or Canada face restrictions on direct mutual fund investments due to their local securities regulations (SEC for US, OSC for Canada). While SEBI does not restrict these investors, individual AMCs may restrict subscriptions from these geographies. Always verify directly with the specific AMC before investing.</p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold text-foreground">Which SIFs Are Best Suited for NRI Portfolios?</h2>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">For NRIs Seeking India Exposure with Capital Protection</h3>
              <p className="text-muted-foreground">Conservative NRIs wanting steady Indian market exposure without equity volatility should look at Level 1–2 hybrid SIFs. Magnum Hybrid Long-Short (SBI) and Altiva (Edelweiss) offer controlled equity exposure with income-oriented strategies. SBI's brand brings comfort for NRIs unfamiliar with the SIF category.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">For NRIs Seeking Long-Term Growth Alpha</h3>
              <p className="text-muted-foreground">NRIs with a 3–5 year horizon and high equity conviction should consider DynaSIF Equity Long-Short (360 ONE) or iSIF Ex-Top 100 (ICICI Pru). Both target 12–16% pre-tax with managed drawdowns — highly relevant for NRIs who cannot actively manage direct equity portfolios from abroad.</p>
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">For NRIs Seeking Tax-Efficient FD Replacement</h3>
              <p className="text-muted-foreground">NRIs keeping INR in NRO savings accounts at 3–4% should consider Arudha Hybrid (Bandhan). At 6.5–7% pre-tax with LTCG treatment after 12 months, the post-tax return advantage for HNIs in high-income countries is meaningful — especially with DTAA benefits applicable.</p>
            </CardContent></Card>

            <h2 className="text-2xl font-bold text-foreground">NRI Taxation on SIF Gains</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>SIF gains are subject to TDS at source for NRI investors on redemption.</li>
              <li>LTCG: 12.5% TDS for gains after 12 months (equity SIFs). STCG: 20% TDS within 12 months.</li>
              <li>DTAA benefits: NRIs from treaty countries (USA, UK, UAE, Singapore, etc.) may claim reduced TDS rates. Submit Form 10F and Tax Residency Certificate to the AMC.</li>
              <li>UAE NRIs have zero personal income tax domestically — SIF gains at 12.5% LTCG may be their final tax liability, making SIF investments particularly attractive.</li>
            </ul>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 flex gap-4">
                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-muted-foreground"><span className="font-semibold text-foreground">SIFPrime Tip for NRIs:</span> SIFs offer NRIs a uniquely India-specific alpha opportunity unavailable in global equity or bond markets. The ₹10 Lakh minimum is easily accessible for most NRIs in high-income countries. Consider a SIF as the 'active India allocation' within a broader global portfolio.</p>
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

export default NriSifGuide;
