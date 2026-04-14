"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, AlertTriangle, Clock, RefreshCw, TrendingUp, Wallet, Calendar, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CONSULTATION_URL } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const sipDetailsByAmc = [
  { amc: "Quant Mutual Fund (qSIF)", minSip: "₹25,000/month", sipFrequency: "Monthly, Quarterly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "ICICI Prudential (iSIF)", minSip: "₹25,000/month", sipFrequency: "Daily, Weekly, Monthly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "Edelweiss (Altiva)", minSip: "₹25,000/month", sipFrequency: "Monthly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "ITI (Diviniti)", minSip: "₹25,000/month", sipFrequency: "Monthly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "360 ONE (Dyna)", minSip: "₹25,000/month", sipFrequency: "Monthly, Quarterly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "Tata (Titanium)", minSip: "₹25,000/month", sipFrequency: "Monthly, Quarterly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "Bandhan (Arudha)", minSip: "₹25,000/month", sipFrequency: "Monthly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "SBI (Magnum)", minSip: "₹25,000/month", sipFrequency: "Monthly", stpAvailable: "Yes", swpAvailable: "Yes" },
  { amc: "Aditya Birla Sun Life (Apex)", minSip: "₹25,000/month", sipFrequency: "Monthly", stpAvailable: "Yes", swpAvailable: "Yes" },
];

const SifSipMinimumAmount = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium bg-muted text-muted-foreground">Education</Badge>
              <span className="text-sm text-muted-foreground">April 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF SIP: Minimum Amount, How to Start, and Everything You Need to Know
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Can you invest in SIF through SIP? What is the minimum SIP amount? How does the ₹10 Lakh threshold work with SIPs? This complete guide answers every question about Systematic Investment Plans in Specialized Investment Funds.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                One of the most frequently asked questions about <Link href="/what-is-sif" className="text-primary hover:underline">Specialized Investment Funds (SIF)</Link> is whether investors can use Systematic Investment Plans (SIP) to build their position over time. The answer is yes — but with important caveats that differentiate SIF SIPs from regular mutual fund SIPs.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Unlike traditional mutual funds where you can start a SIP with as little as ₹500 per month, SIF SIPs must work within the ₹10 Lakh minimum investment framework set by SEBI. This guide explains exactly how SIF SIPs work, the minimum amounts by AMC, and how to set up your SIP effectively. For SWP-related queries, also check our <Link href="/sif-sip-swp-guide" className="text-primary hover:underline">SIF SIP and SWP Guide</Link>.
              </p>
            </div>

            {/* The ₹10L Threshold Rule */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Target className="w-7 h-7 text-primary" />
                The ₹10 Lakh Threshold: How It Works with SIP
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                SEBI mandates a minimum investment of ₹10 Lakhs in SIF at the PAN level per AMC. This threshold is the most critical rule governing SIF SIPs. Here is how it works:
              </p>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    <p><strong className="text-foreground">Rule 1 — Cumulative threshold:</strong> Your total investment across all SIF schemes under a single AMC must reach ₹10 Lakhs. This is tracked at the PAN level.</p>
                    <p><strong className="text-foreground">Rule 2 — SIP commitment counts:</strong> Most AMCs allow you to start a SIF SIP if the total committed amount (lumpsum + total SIP installments) will reach ₹10 Lakhs within a defined period. For example, a ₹5 Lakh lumpsum + ₹50,000/month SIP for 10 months = ₹10 Lakhs.</p>
                    <p><strong className="text-foreground">Rule 3 — Some AMCs require upfront minimum:</strong> Certain AMCs require the ₹10 Lakh minimum to be met upfront before allowing SIP registration. In this case, you must invest ₹10 Lakhs first, then set up SIP for additional investments.</p>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-xl font-bold text-foreground">Three Ways to Meet the ₹10L Threshold</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Full Lumpsum</h4>
                    <p className="text-sm text-muted-foreground">Invest ₹10L or more as lumpsum, then set up SIP for additional monthly investments at ₹25,000+</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <RefreshCw className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Lumpsum + SIP</h4>
                    <p className="text-sm text-muted-foreground">Start with a partial lumpsum (e.g., ₹5L) and register SIP for the remaining amount to be invested over 6–12 months</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Multi-Scheme Split</h4>
                    <p className="text-sm text-muted-foreground">Split ₹10L across 2–3 SIF schemes from the same AMC (e.g., ₹4L in equity + ₹3L in hybrid + ₹3L via SIP)</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Minimum SIP Amounts by AMC */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-primary" />
                Minimum SIP Amounts by AMC
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Each AMC sets its own minimum SIP amount for SIF schemes. Here is a breakdown of SIP details across major SIF providers as of April 2026:
              </p>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">AMC (SIF Scheme)</TableHead>
                      <TableHead className="font-semibold">Min SIP Amount</TableHead>
                      <TableHead className="font-semibold">SIP Frequency</TableHead>
                      <TableHead className="font-semibold">STP</TableHead>
                      <TableHead className="font-semibold">SWP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sipDetailsByAmc.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground">{row.amc}</TableCell>
                        <TableCell className="text-muted-foreground">{row.minSip}</TableCell>
                        <TableCell className="text-muted-foreground">{row.sipFrequency}</TableCell>
                        <TableCell className="text-muted-foreground">{row.stpAvailable}</TableCell>
                        <TableCell className="text-muted-foreground">{row.swpAvailable}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Note: SIP details are subject to change. Please verify with the specific AMC before registering. Data as of April 2026.
              </p>
            </div>

            {/* SIP Frequency Options */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Calendar className="w-7 h-7 text-primary" />
                SIP Frequency Options in SIF
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Depending on the AMC, SIF SIPs are available in multiple frequency options:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { freq: "Daily SIP", desc: "Available with select AMCs like ICICI Prudential. Ideal for rupee cost averaging purists. Minimum ₹5,000/day typically.", available: "Limited" },
                  { freq: "Weekly SIP", desc: "Available with select AMCs. Invests on a fixed day every week. Good for salary-to-investment automation.", available: "Limited" },
                  { freq: "Monthly SIP", desc: "The most common and widely available frequency. All SIF AMCs support monthly SIP. Choose any date from 1st to 28th.", available: "All AMCs" },
                  { freq: "Quarterly SIP", desc: "Available with some AMCs for larger ticket sizes. Good for investors with irregular income or bonus-based investing.", available: "Select AMCs" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-foreground mb-1 text-sm">{item.freq}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
                      <Badge variant="outline" className="text-xs">{item.available}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* STP in SIF */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <RefreshCw className="w-7 h-7 text-primary" />
                STP (Systematic Transfer Plan) in SIF
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                A Systematic Transfer Plan (STP) allows you to invest a lumpsum in one SIF scheme (or a liquid/debt fund from the same AMC) and systematically transfer a fixed amount to another SIF scheme at regular intervals. This is an excellent strategy for investing in equity-oriented SIFs while managing timing risk.
              </p>
              <h3 className="text-xl font-bold text-foreground">How STP Works in SIF</h3>
              <div className="space-y-3">
                <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Invest ₹10 Lakhs (or more) in a liquid or debt SIF scheme from the AMC. This satisfies the ₹10L minimum requirement.</p>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Set up an STP from the liquid/debt SIF to an equity long-short or hybrid SIF from the same AMC.</p>
                </div>
                <div className="flex gap-4 p-4 rounded-lg bg-muted/50 border">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <p className="text-sm text-muted-foreground">The STP transfers a fixed amount (e.g., ₹1 Lakh/month) from the source to the target scheme, providing rupee cost averaging.</p>
                </div>
              </div>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">STP Tax Implication:</strong> Each STP transfer from the source scheme is treated as a redemption for tax purposes. If the source is a debt/liquid fund, gains will be taxed at your slab rate. Plan your STP tenure accordingly to manage tax liability. Refer to the <Link href="/sif-tax-guide" className="text-primary hover:underline">SIF Tax Guide</Link> for details.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* SWP in SIF */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Wallet className="w-7 h-7 text-primary" />
                SWP (Systematic Withdrawal Plan) in SIF
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount from your SIF investment at regular intervals. This is particularly useful for generating regular income from your SIF portfolio. Most SIF AMCs offer SWP facilities, but there is an important constraint:
              </p>
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Critical SWP Rule:</strong> Your SIF investment value must remain above ₹10 Lakhs (at PAN level per AMC) even after SWP withdrawals. If SWP withdrawals cause your total SIF investment to fall below ₹10 Lakhs through active redemption, the AMC may stop the SWP or require you to exit the scheme. Market-driven declines below ₹10L (passive breach) are permitted. Read more in our <Link href="/sif-redemption-rules" className="text-primary hover:underline">SIF Redemption Rules</Link> guide.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advantages of SIP in SIF */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />
                Advantages of SIP in SIF
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                While SIF SIPs have a higher entry bar than mutual fund SIPs, they offer compelling advantages for disciplined investors:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: RefreshCw, title: "Rupee Cost Averaging", desc: "Buy more units when NAV is low, fewer when high. Particularly valuable in volatile long-short strategies where NAV swings can be significant." },
                  { icon: Target, title: "Emotional Discipline", desc: "Automated SIP removes the temptation to time the market. This is especially important for SIFs where short-term volatility can be higher than traditional MFs." },
                  { icon: TrendingUp, title: "Compounding at Scale", desc: "Monthly SIPs of ₹25,000–₹1,00,000 in a high-alpha SIF strategy can compound significantly over 5–10 years. Even modest outperformance compounds dramatically at these ticket sizes." },
                  { icon: Clock, title: "Gradual Entry", desc: "For investors with ₹10L+ available but unsure about market timing, STP + SIP provides a structured entry that averages out over 6–12 months." },
                  { icon: BarChart3, title: "Portfolio Building", desc: "Use SIPs to gradually build allocation across multiple SIF strategies — e.g., monthly SIP in equity long-short while also building hybrid allocation." },
                  { icon: Wallet, title: "Cash Flow Management", desc: "SIP aligns SIF investment with monthly income, making it easier for salaried professionals and business owners to invest consistently." },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Step by Step Guide */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Clock className="w-7 h-7 text-primary" />
                Step-by-Step: How to Start SIP in SIF
              </h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Meet the ₹10 Lakh Minimum", desc: "Invest a lumpsum of ₹10 Lakhs (or more) in the SIF scheme of your choice. Alternatively, check if the AMC allows lumpsum + SIP commitment to meet the threshold. Visit our SIF Minimum Investment page for details." },
                  { step: 2, title: "Complete KYC and Account Setup", desc: "Ensure your KYC is up to date with the AMC. If you're a new investor, complete the KYC process through the AMC's website or an authorised distributor." },
                  { step: 3, title: "Choose Your SIF Scheme", desc: "Select the SIF scheme(s) where you want to set up SIP. Consider your risk profile and investment horizon. Use our SIF comparison tools to evaluate options." },
                  { step: 4, title: "Register SIP", desc: "Submit the SIP registration form — online through the AMC portal or through your distributor. Specify the amount (minimum ₹25,000/month for most AMCs), frequency (monthly/quarterly), SIP date, and tenure." },
                  { step: 5, title: "Set Up Auto-Debit", desc: "Register an OTM (One Time Mandate) or e-NACH with your bank to automate monthly SIP deductions. This ensures SIP installments are processed without manual intervention." },
                  { step: 6, title: "Monitor and Review", desc: "Track your SIF SIP performance through the AMC portal or SIFPrime's NAV tracker. Review quarterly and adjust SIP amount based on your evolving financial goals." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-5 rounded-lg bg-card border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Frequently Asked Questions About SIF SIP</h2>
              <div className="space-y-4">
                {[
                  { q: "Can I start a SIF SIP without investing ₹10 Lakhs first?", a: "It depends on the AMC. Some AMCs allow you to register a SIP with a committed total of ₹10 Lakhs (e.g., ₹5L lumpsum + ₹50K SIP for 10 months). Others require the ₹10L to be invested upfront before SIP registration. Check with the specific AMC." },
                  { q: "What happens if I miss a SIF SIP installment?", a: "Missing a SIP installment does not cancel the SIP. The next installment will be processed as scheduled. However, if 3 consecutive installments are missed (due to insufficient bank balance), some AMCs may cancel the SIP mandate." },
                  { q: "Can I increase or decrease my SIF SIP amount?", a: "Yes, most AMCs allow modification of SIP amount. You may need to cancel the existing SIP and register a new one with the revised amount. The minimum SIP amount constraint still applies." },
                  { q: "Is there a maximum SIP amount for SIF?", a: "There is no SEBI-mandated maximum SIP amount. You can set up SIP for any amount above the minimum (₹25,000–₹50,000 depending on AMC). Some investors run SIPs of ₹5–10 Lakhs per month in SIF." },
                  { q: "Can I run SIP in multiple SIF schemes from the same AMC?", a: "Yes. You can run parallel SIPs in different SIF schemes from the same AMC. The ₹10L minimum is aggregated across all schemes at the PAN level, so if your total across all schemes exceeds ₹10L, each individual SIP can be below ₹10L." },
                ].map((faq, i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* SIF SIP vs MF SIP */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">SIF SIP vs Mutual Fund SIP: Key Differences</h2>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Parameter</TableHead>
                      <TableHead className="font-semibold text-primary">SIF SIP</TableHead>
                      <TableHead className="font-semibold">Mutual Fund SIP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Minimum SIP Amount</TableCell><TableCell className="text-primary font-medium bg-primary/5">₹25,000–₹50,000/month</TableCell><TableCell>₹100–₹500/month</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Threshold Requirement</TableCell><TableCell className="text-primary font-medium bg-primary/5">₹10L per PAN per AMC</TableCell><TableCell>No threshold</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Strategy Complexity</TableCell><TableCell className="text-primary font-medium bg-primary/5">Long-short, derivatives, hedging</TableCell><TableCell>Long-only, traditional</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Target Investor</TableCell><TableCell className="text-primary font-medium bg-primary/5">HNI, experienced investors</TableCell><TableCell>Retail, all investor types</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">STP Availability</TableCell><TableCell className="text-primary font-medium bg-primary/5">Yes (within same AMC SIF schemes)</TableCell><TableCell>Yes (widely available)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">SWP Availability</TableCell><TableCell className="text-primary font-medium bg-primary/5">Yes (subject to ₹10L floor)</TableCell><TableCell>Yes (no minimum floor)</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Taxation</TableCell><TableCell className="text-primary font-medium bg-primary/5">Same as mutual funds</TableCell><TableCell>Standard MF taxation</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                For a broader comparison between SIF and mutual funds, see our <Link href="/sifvsmutualfund" className="text-primary hover:underline">SIF vs Mutual Fund</Link> comparison page.
              </p>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Ready to Start Your SIF SIP?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our SIF experts can help you choose the right scheme, determine the optimal SIP amount, and set up your systematic investment plan. Book a consultation to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/sifnav">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Compare SIF NAVs <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">
              Disclaimer: This article is for educational purposes only and does not constitute investment advice. SIF SIP details including minimum amounts, frequency options, and availability are subject to change at AMC discretion. SIF investments are subject to market risk. Minimum investment of ₹10 Lakhs per PAN per AMC applies. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifSipMinimumAmount;
