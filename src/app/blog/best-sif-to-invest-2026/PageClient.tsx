"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, TrendingUp, Shield, Star, AlertTriangle, BarChart3, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CONSULTATION_URL } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const equityLongShortFunds = [
  { name: "Quant SIF Equity Long Short (qSIF)", amc: "Quant Mutual Fund", strategy: "Quantitative long-short with momentum + mean reversion", riskBand: "Very High", highlight: "Quant's signature data-driven approach with aggressive derivatives overlay" },
  { name: "ITI Diviniti Equity Long Short", amc: "ITI Mutual Fund", strategy: "Fundamental equity selection with systematic hedging", riskBand: "Very High", highlight: "ITI's research-led approach with a focused long-short equity mandate" },
  { name: "360 ONE Dyna Equity Long Short", amc: "360 ONE Asset", strategy: "Dynamic equity allocation with tactical short positions", riskBand: "High", highlight: "360 ONE's institutional wealth-management pedigree with active risk management" },
  { name: "Bandhan Arudha Equity Long Short", amc: "Bandhan Mutual Fund", strategy: "Bottom-up stock selection with pair-trade hedging", riskBand: "Very High", highlight: "Bandhan's equity team with disciplined hedging framework" },
];

const hybridLongShortFunds = [
  { name: "Edelweiss Altiva Hybrid Long Short", amc: "Edelweiss Mutual Fund", strategy: "Equity-debt hybrid with long-short equity overlay", riskBand: "High", highlight: "India's first hybrid long-short SIF; pioneer in the category" },
  { name: "SBI Magnum Hybrid Long Short", amc: "SBI Mutual Fund", strategy: "Multi-asset hybrid with tactical equity hedging", riskBand: "High", highlight: "Backed by SBI MF's scale and institutional research depth" },
  { name: "Tata Titanium Hybrid Long Short", amc: "Tata Mutual Fund", strategy: "Conservative hybrid with systematic derivatives hedging", riskBand: "Moderate-High", highlight: "Designed for lower volatility with partial downside protection" },
  { name: "ICICI Pru iSIF Hybrid Long Short", amc: "ICICI Prudential AMC", strategy: "Balanced allocation with dynamic hedging framework", riskBand: "High", highlight: "India's largest AMC by AUM brings institutional risk management" },
];

const exTop100Funds = [
  { name: "Quant SIF Ex-Top 100 Long Short (qSIF)", amc: "Quant Mutual Fund", strategy: "Long-short in mid and small-cap universe (ex-Nifty 100)", riskBand: "Very High", highlight: "Quant's momentum-driven approach applied to high-growth mid/small caps" },
  { name: "ICICI Pru iSIF Ex-Top 100 Long Short", amc: "ICICI Prudential AMC", strategy: "Active long-short in stocks outside Nifty 100", riskBand: "Very High", highlight: "ICICI Pru's deep research in mid/small caps with disciplined hedging" },
];

const BestSifToInvest2026 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary">Guide</Badge>
              <span className="text-sm text-muted-foreground">April 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              A comprehensive ranking of the best SIF schemes across all categories — Equity Long Short, Hybrid Long Short, and Ex-Top 100. Strategy breakdown, AMC credentials, and what to watch for.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                With over 14 <Link href="/what-is-sif" className="text-primary hover:underline">Specialized Investment Fund (SIF)</Link> schemes now live in India, investors face a new challenge: which SIF should you invest in? Unlike traditional mutual funds where decades of performance data exist, SIFs are still in their infancy — most launched between late 2025 and early 2026. This means selection must be based on strategy quality, AMC reputation, fund manager experience, and structural advantages rather than historical NAV performance alone.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                In this guide, we rank the best SIF funds across three major categories and explain what makes each fund worth considering. For live NAV data and performance tracking, visit our <Link href="/sifnav" className="text-primary hover:underline">SIF NAV Comparison Tool</Link>.
              </p>
            </div>

            {/* How We Evaluate */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How We Evaluate SIF Funds</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Since SIFs are a new category with limited performance history, our evaluation framework focuses on five key parameters:
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Target, title: "Strategy Clarity", desc: "Is the investment strategy well-defined and differentiated?" },
                  { icon: Shield, title: "AMC Credentials", desc: "Track record of the AMC in managing sophisticated strategies" },
                  { icon: Star, title: "Fund Manager Experience", desc: "Years of experience in long-short / hedged strategies" },
                  { icon: BarChart3, title: "Early Performance", desc: "NAV trajectory since launch (where available)" },
                  { icon: TrendingUp, title: "Risk Management", desc: "Quality of hedging framework and drawdown controls" },
                  { icon: Layers, title: "Cost Efficiency", desc: "TER and overall cost relative to strategy complexity" },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
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

            {/* Category 1: Equity Long Short */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Best Equity Long Short SIFs</h2>
              </div>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Equity Long Short SIFs invest primarily in equities with the ability to take short positions using derivatives. These funds aim to generate alpha in both rising and falling markets. The category is the most popular among SIF investors due to its potential for superior risk-adjusted returns. Learn more about <Link href="/sif-derivatives-explained" className="text-primary hover:underline">how SIF derivatives work</Link>.
              </p>

              {equityLongShortFunds.map((fund, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-foreground">{fund.name}</h3>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">{fund.riskBand} Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">AMC:</strong> {fund.amc}</p>
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Strategy:</strong> {fund.strategy}</p>
                    <p className="text-sm text-primary mt-3 font-medium">{fund.highlight}</p>
                  </CardContent>
                </Card>
              ))}

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Equity Long Short SIF Analysis</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Quant SIF (qSIF) Equity Long Short</strong> is the standout in this category. Quant Mutual Fund has been India&apos;s most aggressive quantitative fund house, and their SIF extends this approach with dedicated long-short capabilities. Their data-driven momentum and mean-reversion models, combined with aggressive derivatives usage, make this the highest-conviction play in the equity long-short space. However, it also carries the highest volatility. Explore the <Link href="/sifs/qsif-equity-long-short" className="text-primary hover:underline">qSIF Equity Long Short</Link> fund page for details.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ITI Diviniti</strong> brings a research-led approach. ITI Mutual Fund has built a focused equity franchise, and Diviniti translates that into a SIF wrapper with fundamental stock picks paired with systematic hedging. See the <Link href="/sifs/diviniti-equity-long-short" className="text-primary hover:underline">Diviniti fund review</Link>.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">360 ONE Dyna</strong> offers a more moderate approach. 360 ONE Asset (formerly IIFL Wealth) brings institutional wealth-management discipline, and their equity long-short SIF reflects this with relatively conservative short positions. It is well-suited for investors who want long-short exposure without extreme volatility. Read more in our <Link href="/sifs/dyna-equity-long-short" className="text-primary hover:underline">Dyna Equity Long Short</Link> review.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Bandhan Arudha</strong> uses bottom-up stock selection with systematic pair trades, making it attractive for investors who value fundamental research over quantitative models. Visit the <Link href="/sifs/arudha-equity-long-short" className="text-primary hover:underline">Arudha Equity Long Short</Link> page.
                </p>
              </div>
            </div>

            {/* Category 2: Hybrid Long Short */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Best Hybrid Long Short SIFs</h2>
              </div>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Hybrid Long Short SIFs combine equity and debt allocations with the ability to take short positions on the equity side. These funds aim for more stable returns than pure equity long-short SIFs by using fixed-income as a ballast. They are ideal for investors who want some downside protection while still accessing long-short alpha. For a deeper comparison, see our <Link href="/best-hybrid-sif" className="text-primary hover:underline">Best Hybrid SIF</Link> comparison page.
              </p>

              {hybridLongShortFunds.map((fund, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-foreground">{fund.name}</h3>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">{fund.riskBand} Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">AMC:</strong> {fund.amc}</p>
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Strategy:</strong> {fund.strategy}</p>
                    <p className="text-sm text-primary mt-3 font-medium">{fund.highlight}</p>
                  </CardContent>
                </Card>
              ))}

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Hybrid Long Short SIF Analysis</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Edelweiss Altiva</strong> has the first-mover advantage as India&apos;s first hybrid long-short SIF. It combines equity long-short exposure with a fixed-income allocation to dampen volatility. Edelweiss&apos;s experience managing multi-asset strategies makes Altiva a well-rounded choice for moderate-risk investors. Check the <Link href="/sifs/altiva-hybrid-long-short" className="text-primary hover:underline">Altiva fund page</Link> for live NAV data.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">SBI Magnum</strong> benefits from the scale and institutional research depth of India&apos;s largest public-sector AMC. The fund takes a multi-asset approach with tactical equity hedging, making it suitable for investors who want hybrid exposure with a growth tilt.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Tata Titanium</strong> is positioned as the most conservative option in this category. With systematic derivatives hedging and a focus on capital preservation, Titanium is designed for investors who prioritise lower drawdowns over maximising upside.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ICICI Prudential iSIF Hybrid</strong> brings the weight of India&apos;s largest AMC. ICICI Pru&apos;s scale provides access to deep liquidity pools and institutional-grade risk management infrastructure. The balanced allocation framework is designed for consistent performance across market cycles.
                </p>
              </div>
            </div>

            {/* Category 3: Ex-Top 100 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Best Ex-Top 100 Long Short SIFs</h2>
              </div>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Ex-Top 100 SIFs focus on stocks outside the Nifty 100 index — essentially targeting the mid-cap and small-cap universe with long-short capabilities. This is the highest-risk, highest-potential-return SIF category. Read our detailed <Link href="/ex-top-100-sif-explained" className="text-primary hover:underline">Ex-Top 100 SIF guide</Link> for a deeper understanding.
              </p>

              {exTop100Funds.map((fund, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-foreground">{fund.name}</h3>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">{fund.riskBand} Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">AMC:</strong> {fund.amc}</p>
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-foreground">Strategy:</strong> {fund.strategy}</p>
                    <p className="text-sm text-primary mt-3 font-medium">{fund.highlight}</p>
                  </CardContent>
                </Card>
              ))}

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Ex-Top 100 SIF Analysis</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Quant SIF Ex-Top 100 (qSIF)</strong> applies Quant&apos;s aggressive quantitative models to the mid and small-cap space. This is the highest-volatility SIF available, but also has the greatest return potential for investors with a 3–5 year horizon and high risk tolerance. The fund uses momentum-based screening to identify high-growth mid-caps while hedging with derivatives on broader indices. See the <Link href="/sifs/qsif-ex-top-100-long-short" className="text-primary hover:underline">qSIF Ex-Top 100</Link> page.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ICICI Pru iSIF Ex-Top 100</strong> takes a more research-driven approach. ICICI Prudential&apos;s extensive analyst coverage of mid and small-cap stocks provides a structural advantage in identifying undervalued companies. The hedging framework is more conservative than Quant&apos;s, making it suitable for investors who want ex-top 100 exposure with somewhat lower volatility.
                </p>
              </div>
            </div>

            {/* How to Choose */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">How to Choose the Right SIF for You</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Choosing the best SIF depends on your individual profile. Use our <Link href="/which-sif-should-you-invest-in" className="text-primary hover:underline">SIF selection framework</Link> or consider these guidelines:
              </p>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Investor Profile</TableHead>
                      <TableHead className="font-semibold">Recommended Category</TableHead>
                      <TableHead className="font-semibold">Top Pick</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell className="font-medium">Aggressive, 5+ year horizon</TableCell><TableCell>Equity Long Short</TableCell><TableCell className="text-primary font-medium">qSIF Equity Long Short</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Moderate risk, wants stability</TableCell><TableCell>Hybrid Long Short</TableCell><TableCell className="text-primary font-medium">Altiva Hybrid Long Short</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">High risk, mid/small-cap believer</TableCell><TableCell>Ex-Top 100</TableCell><TableCell className="text-primary font-medium">qSIF Ex-Top 100</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Conservative, first SIF investor</TableCell><TableCell>Hybrid Long Short</TableCell><TableCell className="text-primary font-medium">Tata Titanium</TableCell></TableRow>
                    <TableRow><TableCell className="font-medium">Value-oriented, fundamental focus</TableCell><TableCell>Equity Long Short</TableCell><TableCell className="text-primary font-medium">Bandhan Arudha</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Important Disclaimers */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-6 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Important Disclaimers:</strong></p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>SIFs are a new category with limited performance history. Rankings are based on strategy quality, AMC reputation, and fund manager experience — not historical returns.</li>
                    <li>Past performance of the AMC in other categories does not guarantee SIF performance.</li>
                    <li>All SIF investments are subject to market risk. The NAV can go up or down.</li>
                    <li>This is not investment advice. Consult a SEBI-registered financial advisor before investing.</li>
                    <li>Minimum investment of ₹10 Lakhs per PAN per AMC applies.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Get Personalised SIF Recommendations</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Not sure which SIF is right for your portfolio? Our experts can help you select the best SIF based on your risk profile, investment horizon, and financial goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/sifnav">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Compare SIF NAVs Live <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">
              Disclaimer: This article is for educational purposes only and does not constitute investment advice or a recommendation to buy or sell any securities. SIF investments are subject to market risk. Please read all Scheme Information Documents and Investment Strategy Information Documents carefully before investing. Past performance is not indicative of future returns. Rankings are subjective and based on qualitative assessment as of April 2026.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BestSifToInvest2026;
