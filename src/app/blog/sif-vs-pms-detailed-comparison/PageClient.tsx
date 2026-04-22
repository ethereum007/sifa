"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, Scale, TrendingUp, Shield, DollarSign, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CONSULTATION_URL } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const comparisonData = [
  { param: "Minimum Investment", sif: "₹10 Lakhs (PAN level)", pms: "₹50 Lakhs" },
  { param: "Structure", sif: "Pooled vehicle (like mutual funds)", pms: "Separately managed account (your own demat)" },
  { param: "SEBI Regulation", sif: "Mutual Fund Regulations, 1996", pms: "PMS Regulations, 2020" },
  { param: "NAV Transparency", sif: "Daily NAV published", pms: "Monthly/quarterly portfolio reports" },
  { param: "Short Selling", sif: "Yes — up to 25% unhedged derivatives", pms: "Limited / manager-dependent" },
  { param: "Derivatives Usage", sif: "Yes — SEBI-governed limits", pms: "Limited and discretionary" },
  { param: "Liquidity", sif: "Daily / Interval redemption", pms: "Negotiated exit, often 30–90 days" },
  { param: "Taxation (Equity-Oriented)", sif: "LTCG 12.5% after 12M, STCG 20%", pms: "LTCG 12.5% after 12M, STCG 20%" },
  { param: "Taxation (Debt-Oriented)", sif: "Slab-rate taxation", pms: "Slab-rate taxation" },
  { param: "Fee Structure", sif: "SEBI-capped TER (1–2%)", pms: "2–3% mgmt fee + 10–20% profit share" },
  { param: "Portfolio Customisation", sif: "Standardised strategy for all investors", pms: "Fully customisable per client" },
  { param: "Ownership of Securities", sif: "Units (pooled ownership)", pms: "Direct ownership in your demat" },
  { param: "Exit Load", sif: "Varies by scheme (0–1%)", pms: "Varies, often 1–3% in first year" },
  { param: "Investor Protection", sif: "SEBI MF framework + custodian", pms: "SEBI PMS framework + custodian" },
  { param: "Number of Stocks", sif: "Diversified (30–80+ holdings typical)", pms: "Concentrated (15–25 stocks typical)" },
  { param: "SIP Availability", sif: "Yes (after ₹10L threshold met)", pms: "Rarely available" },
];

const SifVsPmsDetailedComparison = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium bg-secondary text-secondary-foreground">Comparison</Badge>
              <span className="text-sm text-muted-foreground">April 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              SIF vs PMS: Detailed Comparison for Indian Investors in 2026
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Specialized Investment Funds and Portfolio Management Services both target HNI investors. But with vastly different minimum tickets, fee structures, and regulatory frameworks, choosing the right one matters. Here is the complete breakdown.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                If you are an Indian investor with ₹10 Lakhs to ₹1 Crore to deploy in a sophisticated investment strategy, two SEBI-regulated options stand out in 2026: <strong className="text-foreground">Specialized Investment Funds (SIF)</strong> and <strong className="text-foreground">Portfolio Management Services (PMS)</strong>. Both offer access to institutional-grade strategies beyond what traditional mutual funds provide, but the similarities end there.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                This guide provides a comprehensive, unbiased comparison across every dimension that matters — minimum investment, taxation, liquidity, strategy flexibility, fee structures, and regulatory safeguards. Whether you are a first-time HNI investor or looking to optimise your existing allocation, this comparison will help you make an informed decision.
              </p>
            </div>

            {/* What is SIF */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is a Specialized Investment Fund (SIF)?</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                A <Link href="/what-is-sif" className="text-primary hover:underline">Specialized Investment Fund (SIF)</Link> is a new category introduced by SEBI on April 1, 2025, under the Mutual Fund Regulations. SIFs are pooled investment vehicles — similar to mutual funds in structure — but with the ability to use advanced strategies like long-short equity, derivatives overlays, and sector rotation. The minimum investment is ₹10 Lakhs aggregated at the PAN level per AMC.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                SIFs are managed by SEBI-approved Asset Management Companies (AMCs) that meet strict eligibility criteria, including a minimum 3-year track record or highly experienced fund management teams. As of April 2026, over 17 SIF schemes are tracked by SIFPrime from leading AMCs including Quant, ICICI Prudential, Edelweiss, SBI, Tata, ITI, 360 ONE, Bandhan, Aditya Birla Sun Life, Franklin Templeton, and The Wealth Company.
              </p>
            </div>

            {/* What is PMS */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">What is Portfolio Management Services (PMS)?</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Portfolio Management Services (PMS) is a professionally managed investment service where a SEBI-registered portfolio manager creates a customised portfolio for each investor. Unlike SIFs, PMS is a separately managed account — you directly own the securities in your own demat account. The minimum investment threshold set by SEBI is ₹50 Lakhs.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                PMS has been available in India for over two decades and is offered by over 400 SEBI-registered managers. Strategies range from concentrated large-cap portfolios to multi-cap, thematic, and momentum-based approaches. PMS managers typically run high-conviction portfolios with 15 to 25 stocks.
              </p>
            </div>

            {/* Key Difference #1: Minimum Investment */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <DollarSign className="w-7 h-7 text-primary" />
                Minimum Investment: ₹10 Lakhs vs ₹50 Lakhs
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                This is the most significant difference and the primary reason SIFs were created. SEBI identified a gap in the market between retail mutual funds (minimum ₹100–₹500) and PMS (minimum ₹50 Lakhs). SIFs bridge this gap with a ₹10 Lakh minimum investment, making institutional-grade strategies accessible to a much wider pool of investors.
              </p>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">PAN-level aggregation:</strong> The ₹10 Lakh SIF minimum is aggregated across all SIF schemes under a single AMC at the PAN level. If you invest ₹6 Lakhs in one SIF and ₹4 Lakhs in another from the same AMC, the total meets the threshold. PMS has no such aggregation — each account requires ₹50 Lakhs independently.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Difference #2: Structure */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Scale className="w-7 h-7 text-primary" />
                Structure: Pooled vs Separately Managed
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">SIF</strong> operates as a pooled vehicle. All investors in a particular SIF scheme share the same portfolio, and you receive units (like mutual fund units) representing your proportional ownership. This means every investor gets the exact same returns.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">PMS</strong> operates as a separately managed account. You own the securities directly in your own demat account. While the portfolio manager follows a model portfolio, the actual holdings and timing can vary slightly between clients due to individual entry points, cash flows, and tax considerations.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3">SIF Pooled Structure Advantages</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Identical returns for all investors</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Better diversification with smaller tickets</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> No individual demat management required</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Daily NAV provides instant valuation</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3">PMS Separate Account Advantages</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Direct ownership of securities</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Portfolio customisation (exclude stocks)</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Useful for estate planning and pledging</li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> Tax-loss harvesting at individual level</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Key Difference #3: Taxation */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-primary" />
                Taxation: MF Treatment vs Pass-Through
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">SIFs</strong> are taxed exactly like mutual funds. For equity-oriented SIFs (65%+ equity allocation), long-term capital gains (holding period over 12 months) are taxed at 12.5% beyond the ₹1.25 Lakh annual exemption. Short-term capital gains are taxed at 20%. For a deeper understanding, read our <Link href="/sif-tax-guide" className="text-primary hover:underline">SIF Tax Guide</Link>.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">PMS</strong> taxation is pass-through — each buy/sell transaction in your demat triggers a separate capital gains event. This means your tax liability depends on the portfolio manager&apos;s trading frequency. High-turnover PMS strategies can generate significantly higher short-term capital gains tax compared to a SIF following a similar strategy.
              </p>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Tax efficiency advantage for SIF:</strong> In a long-short strategy, a SIF can execute frequent hedging trades within the pooled structure without triggering individual capital gains events for investors. In PMS, every trade in your demat is a taxable event. For active strategies with 100%+ annual turnover, this tax drag can reduce PMS net returns by 1–3% annually compared to the same strategy in a SIF structure.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Difference #4: Liquidity */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Clock className="w-7 h-7 text-primary" />
                Liquidity and Redemption
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">SIFs</strong> offer daily or interval-based redemption depending on the scheme type. Open-ended SIF schemes allow redemption at the prevailing NAV with settlement typically within T+3 working days. Some schemes may have exit loads for early redemption (usually 0–1% if redeemed within 3–12 months). See our <Link href="/sif-redemption-rules" className="text-primary hover:underline">SIF Redemption Rules</Link> guide for details.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">PMS</strong> liquidity is typically more restricted. Most PMS agreements include a lock-in period of 6 to 12 months, and even after the lock-in, exit can take 15 to 90 days as the portfolio manager needs to liquidate individual positions. Some PMS providers also charge punitive exit loads (2–3%) for early withdrawals.
              </p>
            </div>

            {/* Key Difference #5: Fee Structures */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-primary" />
                Fee Structure Comparison
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                The fee structure is one of the most impactful differences between SIF and PMS, directly affecting your net returns over time.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3">SIF Fee Structure</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li><strong className="text-foreground">TER:</strong> SEBI-capped at 1.5–2.25% depending on AUM slab</li>
                      <li><strong className="text-foreground">Performance Fee:</strong> Not charged (TER-only model)</li>
                      <li><strong className="text-foreground">Entry Load:</strong> None (abolished by SEBI)</li>
                      <li><strong className="text-foreground">Exit Load:</strong> 0–1% (varies by scheme)</li>
                      <li><strong className="text-foreground">Total Annual Cost:</strong> Typically 1.5–2.25%</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3">PMS Fee Structure</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li><strong className="text-foreground">Management Fee:</strong> 1.5–2.5% per annum</li>
                      <li><strong className="text-foreground">Performance Fee:</strong> 10–20% above hurdle rate (typically 10%)</li>
                      <li><strong className="text-foreground">Entry Load:</strong> Some charge 1–2%</li>
                      <li><strong className="text-foreground">Exit Load:</strong> 1–3% in first year</li>
                      <li><strong className="text-foreground">Total Annual Cost:</strong> 3–5% in good years</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Over a 5-year horizon, the fee differential can compound significantly. A SIF charging 2% TER vs a PMS charging 2% management + 15% performance fee on a strategy generating 18% gross returns would result in approximately 2.5–3% lower net returns for the PMS investor annually. Over 5 years on a ₹50 Lakh portfolio, this could amount to ₹8–12 Lakhs in additional costs.
              </p>
            </div>

            {/* Key Difference #6: Strategy Flexibility */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Shield className="w-7 h-7 text-primary" />
                Strategy Flexibility and Regulatory Framework
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Both SIF and PMS offer strategies beyond what traditional mutual funds provide, but the regulatory boundaries differ.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">SIF strategies</strong> include Equity Long-Short, Hybrid Long-Short, Ex-Top 100 Long-Short, Sector Rotation, and Active Asset Allocation. SEBI limits unhedged derivative exposure to 25% of the portfolio. All strategies must be pre-approved and disclosed in the Investment Strategy Information Document (ISID). Explore all available strategies on our <Link href="/sif-strategies" className="text-primary hover:underline">SIF Strategies</Link> page.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <strong className="text-foreground">PMS strategies</strong> have more flexibility. Portfolio managers can run concentrated portfolios, take larger cash positions, use leverage (within limits), and customise stock selection per client. There are fewer constraints on portfolio construction, which can be both an advantage and a risk.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Complete Side-by-Side Comparison Table</h2>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold min-w-[180px]">Parameter</TableHead>
                      <TableHead className="font-semibold text-primary min-w-[220px]">SIF</TableHead>
                      <TableHead className="font-semibold min-w-[220px]">PMS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((row, i) => (
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-foreground">{row.param}</TableCell>
                        <TableCell className="text-primary font-medium bg-primary/5">{row.sif}</TableCell>
                        <TableCell className="text-muted-foreground">{row.pms}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Who Should Choose SIF */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Who Should Choose SIF?</h2>
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Investors with ₹10–50 Lakhs who want institutional-grade long-short strategies without the PMS minimum</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Tax-conscious investors who prefer mutual fund taxation over pass-through PMS taxation</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Investors who value daily NAV transparency and SEBI MF framework protections</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Those who want liquidity — daily redemption without lock-in periods</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Cost-sensitive investors who want to avoid performance fees and keep total costs under 2.25%</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Investors comfortable with standardised strategies (same portfolio for all investors in the scheme)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Who Should Choose PMS */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Who Should Choose PMS?</h2>
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Investors with ₹50 Lakhs+ who want a fully customised portfolio tailored to their specific needs</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Those who want direct ownership of securities for estate planning, pledging, or promoter holding considerations</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Investors seeking concentrated high-conviction portfolios with 15–25 stocks</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Those who want the ability to exclude specific stocks (sectoral conflicts, existing holdings)</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Investors who can benefit from individual-level tax-loss harvesting</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> Ultra-HNIs who want a direct relationship with the portfolio manager</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Can You Invest in Both */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Can You Invest in Both SIF and PMS?</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Absolutely. Many sophisticated investors are building a complementary allocation between SIF and PMS. A common approach is to use SIF for strategy-specific exposure (e.g., a long-short equity SIF for hedged returns) while maintaining a PMS allocation for a concentrated, high-conviction long-only portfolio.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                For example, an investor with ₹1 Crore might allocate ₹30 Lakhs across 2–3 SIF schemes (covering equity long-short, hybrid, and ex-top 100 strategies) and ₹70 Lakhs in a PMS for a concentrated multi-cap portfolio. This provides strategy diversification while maintaining the benefits of both structures.
              </p>
            </div>

            {/* The Verdict */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">The Verdict: SIF vs PMS in 2026</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                SIF is the clear winner for investors in the ₹10–50 Lakh bracket who want access to advanced strategies at lower costs with better liquidity and tax efficiency. For investors above ₹50 Lakhs, the choice depends on whether you value customisation and direct ownership (choose PMS) or cost efficiency and daily liquidity (choose SIF).
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                The emergence of SIFs has fundamentally disrupted the PMS industry by democratising access to strategies that were previously exclusive to wealthy investors. As SIFs mature and build longer track records through 2026 and beyond, we expect significant capital to shift from small PMS accounts to SIF schemes.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Compare all available SIF schemes on our <Link href="/sif-funds-launched" className="text-primary hover:underline">SIF Funds Launched</Link> page, or use the <Link href="/sifnav" className="text-primary hover:underline">SIF NAV Comparison Tool</Link> for real-time performance data.
              </p>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Need Help Choosing Between SIF and PMS?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our SIF experts can help you evaluate both options based on your investment amount, risk profile, and financial goals. Book a personalised consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/sif-funds-launched">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Compare All SIFs <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">
              Disclaimer: This article is for educational purposes only and does not constitute investment advice. SIF and PMS investments are subject to market risk. Minimum investment of ₹10 Lakhs per PAN applies for SIF, ₹50 Lakhs for PMS. Please read all scheme-related documents and Investment Strategy Information Documents carefully before investing. Past performance is not indicative of future returns.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifVsPmsDetailedComparison;
