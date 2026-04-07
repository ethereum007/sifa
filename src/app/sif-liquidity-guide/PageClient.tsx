"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {


  Droplets,
  Calendar,
  ArrowRight,
  Users,
  CheckCircle,
  AlertTriangle,
  Building2,
  RefreshCw,
  Scale,
  Sparkles,
} from "lucide-react";

const SifLiquidityGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Sparkles className="w-3 h-3 mr-1" /> SIF Liquidity Guide
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Open-Ended vs. Interval{" "}
                <span className="text-primary">SIF Structures</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                A complete guide to SIF liquidity — subscription windows, redemption mechanics,
                exit loads, and exchange listing for all live funds as of March 2026.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Droplets className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">Liquidity Deep-Dive</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">NAV as of March 06, 2026</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">All Live Funds</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Prepared by SIFPrime.com — India's First SIF Comparison & Distribution Platform
              </p>
            </div>
          </div>
        </section>

        {/* Understanding SIF Structures */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Scale className="w-6 h-6 text-primary" />
                Understanding SIF Structures
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                SEBI's SIF framework (effective April 1, 2025) permits AMCs to launch investment strategies
                under two live structures today — <strong className="text-foreground">Open-Ended</strong> and{" "}
                <strong className="text-foreground">Interval</strong>. A third structure (Closed-Ended) is
                permitted under the regulations but has not yet been launched by any AMC as of March 2026.
              </p>

              {/* Open-Ended */}
              <Card className="mb-8 border-l-4 border-l-primary bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-primary" />
                    Open-Ended SIF Strategies
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Open-ended strategies function like traditional mutual funds — you can invest or redeem on
                    any business day at the applicable NAV. There is no lock-in and no restricted redemption window.
                    These are typically used for equity-oriented strategies (Equity Long-Short, Equity Ex-Top 100
                    Long-Short) where the underlying portfolio consists of liquid listed equities and derivatives.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Daily subscription and redemption on all business days",
                      "T+3 payout (proceeds credited within 3 working days)",
                      "No exchange listing required (direct AMC redemption)",
                      "Suitable for investors who may need periodic liquidity",
                      "Benchmarked to broad equity indices (Nifty 500 TRI, Nifty Midcap 150 TRI)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Interval */}
              <Card className="mb-8 border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Interval SIF Strategies
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Interval strategies are the dominant structure for Hybrid Long-Short SIFs. Subscriptions are
                    allowed daily, but redemptions are restricted to specific days each week — typically 2 days
                    per week. This structure gives fund managers the ability to manage derivative positions,
                    arbitrage books, and fixed income allocation without the pressure of daily redemption outflows.
                  </p>
                  <ul className="space-y-2 mb-4">
                    {[
                      "Daily subscriptions on all business days",
                      "Redemptions restricted to 1–2 specific days per week (varies by fund)",
                      "AMC may apply a notice period of up to 15 working days for redemptions",
                      "Units must be listed on NSE/BSE to provide an alternative exit route",
                      "Redemption payout within 3 working days from the applicable NAV date",
                      "Benchmarked to Nifty 50 Hybrid Composite Debt 50:50 Index",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-orange-100/50 dark:bg-orange-950/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-800/30">
                    <p className="text-xs text-muted-foreground flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Important nuance:</strong> Subscription and redemption
                        frequency can be different. A fund may allow daily inflows but only process outflows twice
                        a week. This asymmetry is by design — it protects the portfolio from forced selling while
                        still keeping the product accessible for new investors.
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Apex SIF Redemption Mechanics */}
        <section className="py-10 lg:py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Apex SIF Redemption Mechanics
              </h2>
              <p className="text-muted-foreground mb-6 text-sm">
                The Apex Hybrid Long-Short Fund (ABSLMF — Interval Fund, NFO: March 6–18, 2026) processes
                redemptions twice a week, every Monday and Wednesday. Here is how the cut-off works:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Redemption Request Window</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">NAV Applied</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Payout (T+3 working days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-background">
                      <td className="p-3 border border-border text-muted-foreground">Before Monday 3:00 PM</td>
                      <td className="p-3 border border-border text-foreground font-medium">Monday NAV</td>
                      <td className="p-3 border border-border text-muted-foreground">By Thursday</td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="p-3 border border-border text-muted-foreground">Monday 3:00 PM – Wednesday 3:00 PM</td>
                      <td className="p-3 border border-border text-foreground font-medium">Wednesday NAV</td>
                      <td className="p-3 border border-border text-muted-foreground">By Monday (next week)</td>
                    </tr>
                    <tr className="bg-background">
                      <td className="p-3 border border-border text-muted-foreground">After Wednesday 3:00 PM</td>
                      <td className="p-3 border border-border text-foreground font-medium">Next Monday NAV</td>
                      <td className="p-3 border border-border text-muted-foreground">By Thursday (next week)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Penal interest:</strong> SEBI mandates 15% p.a. penal
                  interest if redemption proceeds are not paid within 3 working days of the valid redemption request date.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Exchange exit:</strong> Since Apex Hybrid Long-Short Fund
                  is an interval strategy, its units will be listed on NSE and BSE post-NFO. Investors needing
                  liquidity outside the Monday/Wednesday window can sell on the exchange at the prevailing market
                  price (which may differ from NAV).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interval SIF Fund Table */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Interval SIF Strategies — Complete Fund Table
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                All Hybrid Long-Short interval strategies currently live or in NFO as of March 2026. NAV: Direct Plan – Growth.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="text-left p-3 border border-border font-semibold text-foreground">SIF Brand</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">AMC</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">NAV (Direct)</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Subscribe</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Redemption Days</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Notice Period</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Exit Load</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { brand: "Apex SIF", amc: "ABSLMF", nav: "₹10.0200", sub: "Daily", redeem: "Mon & Wed", notice: "Up to 15 days", exit: "Nil", remarks: "Launched; NAV live" },
                      { brand: "Altiva SIF", amc: "Edelweiss MF", nav: "₹10.3174", sub: "Daily", redeem: "Mon & Wed", notice: "Nil", exit: "0.5% (≤3 months)", remarks: "Launched; NAV live" },
                      { brand: "Arudha SIF", amc: "Bandhan AMC", nav: "₹10.0830", sub: "Daily", redeem: "—", notice: "—", exit: "—", remarks: "Launched; redemption days TBC" },
                      { brand: "Magnum SIF", amc: "SBI MF", nav: "₹10.0180", sub: "Daily", redeem: "Mon & Thu", notice: "Nil", exit: "0.5% (≤15d), 0.25% (15d–1m)", remarks: "Launched; NAV live" },
                      { brand: "QSIF", amc: "Quant MF", nav: "₹9.9607", sub: "Daily", redeem: "Tue & Wed", notice: "—", exit: "1% (≤15 days)", remarks: "Launched; NAV live" },
                      { brand: "Titanium SIF", amc: "Mirae Asset MF", nav: "₹9.5813", sub: "Daily", redeem: "—", notice: "—", exit: "1% (≤365 days)", remarks: "Launched; redemption days TBC" },
                    ].map((fund, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="p-3 border border-border font-medium text-foreground">{fund.brand}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.amc}</td>
                        <td className="p-3 border border-border text-foreground font-medium">{fund.nav}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.sub}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.redeem}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.notice}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.exit}</td>
                        <td className="p-3 border border-border text-muted-foreground text-xs">{fund.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                * Apex SIF NAV not yet available — in NFO period (March 6–18, 2026). | "—" = not yet publicly disclosed.
              </p>
            </div>
          </div>
        </section>

        {/* Open-Ended SIF Fund Table */}
        <section className="py-10 lg:py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Open-Ended SIF Strategies — Complete Fund Table
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                All equity-oriented and hybrid open-ended strategies live as of March 2026. NAV: Direct Plan – Growth.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="text-left p-3 border border-border font-semibold text-foreground">SIF Brand</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">AMC</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Strategy</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">NAV (Direct)</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Subscribe</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Exit Load</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { brand: "QSIF", amc: "Quant MF", strategy: "Equity Long-Short", nav: "₹9.1473", sub: "Daily / Daily", exit: "—", benchmark: "Nifty 500 TRI" },
                      { brand: "QSIF", amc: "Quant MF", strategy: "Equity Ex-Top 100 L-S", nav: "₹8.8418", sub: "Daily / Daily", exit: "—", benchmark: "Nifty Midcap 150 TRI" },
                      { brand: "Diviniti SIF", amc: "ITI Mutual Fund", strategy: "Equity Long-Short", nav: "₹948.8272", sub: "Daily / Daily", exit: "—", benchmark: "Nifty 500 TRI" },
                      { brand: "DynaSIF", amc: "360 ONE AMC", strategy: "Equity Long-Short", nav: "₹9.7180", sub: "Daily / Daily", exit: "—", benchmark: "Nifty 500 TRI" },
                      { brand: "iSIF", amc: "ICICI Prudential MF", strategy: "Equity Ex-Top 100 L-S", nav: "₹9.2800", sub: "Daily / Daily", exit: "—", benchmark: "Nifty Midcap 150 TRI" },
                      { brand: "iSIF", amc: "ICICI Prudential MF", strategy: "Hybrid Long-Short", nav: "₹9.4754", sub: "Daily / Daily", exit: "—", benchmark: "Nifty 50 Hybrid Comp. Debt 50:50" },
                    ].map((fund, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="p-3 border border-border font-medium text-foreground">{fund.brand}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.amc}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.strategy}</td>
                        <td className="p-3 border border-border text-foreground font-medium">{fund.nav}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.sub}</td>
                        <td className="p-3 border border-border text-muted-foreground">{fund.exit}</td>
                        <td className="p-3 border border-border text-muted-foreground text-xs">{fund.benchmark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Open-Ended vs. Interval: At a Glance
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Parameter</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Open-Ended SIF</th>
                      <th className="text-left p-3 border border-border font-semibold text-foreground">Interval SIF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { param: "Strategy Types", open: "Equity L-S, Equity Ex-Top 100 L-S, Hybrid L-S", interval: "Hybrid Long-Short (dominant)" },
                      { param: "Subscription", open: "Daily (all business days)", interval: "Daily (all business days)" },
                      { param: "Redemption", open: "Daily (any business day)", interval: "Specific days only (typically Mon/Wed or Mon/Thu)" },
                      { param: "Exchange Listing", open: "Not required", interval: "Mandatory (NSE + BSE)" },
                      { param: "Notice Period", open: "Not applicable", interval: "Up to 15 working days (varies)" },
                      { param: "Exit Route (off-window)", open: "Direct redemption any day", interval: "Exchange sale at market price" },
                      { param: "Liquidity Profile", open: "High — like a regular mutual fund", interval: "Semi-liquid — restricted redemption windows" },
                      { param: "Why This Structure?", open: "Underlying is liquid equity + derivatives", interval: "Holds arbitrage, derivatives, fixed income — needs time to unwind" },
                      { param: "Taxation", open: "Equity MF (STCG 20%, LTCG 12.5% > ₹1.25L)", interval: "Equity MF taxation if equity-oriented; else slab" },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="p-3 border border-border font-medium text-foreground">{row.param}</td>
                        <td className="p-3 border border-border text-muted-foreground">{row.open}</td>
                        <td className="p-3 border border-border text-muted-foreground">{row.interval}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Source: AMFI NAV data (March 06, 2026) | SEBI SIF Circular Feb 27, 2025 | Fund KIMs & ISIDs | Compiled by SIFPrime.com
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer & CTA */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                Need Help Choosing the Right SIF Structure?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Whether open-ended or interval, the right SIF depends on your client's liquidity needs
                and investment horizon. Let us help you navigate.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/become-distributor">
                  <Button variant="gold" size="lg" className="gap-2">
                    <Users className="w-4 h-4" />
                    Set Up a Consultation Call
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="/sif-funds-launched">
                  <Button variant="outline" size="lg" className="gap-2">
                    Explore SIF Funds
                  </Button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
                Disclaimer: This document is for informational and educational purposes only and does not
                constitute investment advice. Please read all fund documents carefully before investing.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifLiquidityGuide;
