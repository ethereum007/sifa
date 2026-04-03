"use client";

import { lazy, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  TrendingUp,
  PieChart,
  Calendar,
  Users,
  Briefcase,
  BarChart3,
  FileText,
  Banknote,
  Building2,
  ArrowLeft,
  Shield,
  Target,
  Percent,
  IndianRupee,
  Clock,
  Layers,
} from "lucide-react";
import Link from "next/link";
import edelweissLogo from "@/assets/logos/edelweiss-mutual-fund.png";



const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// Strategy Allocation Data
const strategyAllocation = [
  { strategy: "Cash Future Arbitrage & Covered Call/Put", exposure: 33.45, color: "bg-blue-500" },
  { strategy: "Fixed Income", exposure: 37.61, color: "bg-green-500" },
  { strategy: "Special Situation", exposure: 5.15, color: "bg-amber-500" },
  { strategy: "Other Derivative Strategies", exposure: 12.39, color: "bg-purple-500" },
  { strategy: "REITs/InvITs", exposure: 3.02, color: "bg-rose-500" },
  { strategy: "Others (incl Cash/Receivables)", exposure: 8.38, color: "bg-slate-400" },
];

// Top Equity Holdings (top 20)
const topEquityHoldings = [
  { name: "Bharti Airtel Ltd.", weight: 2.09 },
  { name: "Polycab India Ltd.", weight: 1.95 },
  { name: "ICICI Bank Ltd.", weight: 1.71 },
  { name: "Eternal Ltd.", weight: 1.23 },
  { name: "RBL Bank Ltd.", weight: 1.15 },
  { name: "Vedanta Ltd.", weight: 1.12 },
  { name: "Indus Towers Ltd.", weight: 1.08 },
  { name: "Glenmark Pharmaceuticals Ltd.", weight: 1.07 },
  { name: "Vodafone Idea Ltd.", weight: 1.05 },
  { name: "Infosys Ltd.", weight: 0.98 },
  { name: "Bajaj Auto Ltd.", weight: 0.92 },
  { name: "Bharat Heavy Electricals Ltd.", weight: 0.88 },
  { name: "Dixon Technologies (India) Ltd.", weight: 0.85 },
  { name: "BSE Ltd.", weight: 0.77 },
  { name: "Manappuram Finance Ltd.", weight: 0.75 },
  { name: "Biocon Ltd.", weight: 0.73 },
  { name: "IDFC First Bank Ltd.", weight: 0.67 },
  { name: "Reliance Industries Ltd.", weight: 0.67 },
  { name: "Power Finance Corporation Ltd.", weight: 0.61 },
  { name: "The Federal Bank Ltd.", weight: 0.60 },
];

// Fixed Income Holdings
const fixedIncomeHoldings = [
  { name: "T-Bill (SOV)", weight: 8.53, rating: "Sovereign" },
  { name: "Nuvama Wealth Finance Ltd.", weight: 3.59, rating: "AA" },
  { name: "Torrent Pharmaceuticals Ltd.", weight: 3.58, rating: "AA+" },
  { name: "Piramal Finance Ltd.", weight: 3.35, rating: "AA" },
  { name: "360 One Prime Ltd.", weight: 3.34, rating: "AA" },
  { name: "JTPM Metal Traders Ltd.", weight: 2.71, rating: "AA" },
  { name: "Jubilant Beverages Ltd.", weight: 2.56, rating: "AA" },
  { name: "NABARD", weight: 2.40, rating: "AAA" },
  { name: "Credila Financial Services Ltd.", weight: 2.39, rating: "AA+" },
  { name: "REC Ltd.", weight: 2.37, rating: "AAA" },
  { name: "Nuvama Wealth & Investment Ltd.", weight: 1.20, rating: "AA" },
  { name: "Power Finance Corporation Ltd.", weight: 1.18, rating: "AAA" },
];

// REITs/InvITs
const reitHoldings = [
  { name: "IndiGrid Infrastructure Trust", weight: 1.73 },
  { name: "Capital Infra Trust", weight: 0.73 },
  { name: "Brookfield India Real Estate Trust", weight: 0.55 },
];

// Top short positions (Index/Stock Options)
const topShortOptions = [
  { name: "Multi Commodity Exchange of India Ltd.", weight: -0.18 },
  { name: "Vodafone Idea Ltd.", weight: -0.16 },
  { name: "Ashok Leyland Ltd.", weight: -0.12 },
  { name: "BSE Ltd.", weight: -0.10 },
  { name: "Vedanta Ltd.", weight: -0.09 },
  { name: "Indus Towers Ltd.", weight: -0.07 },
  { name: "Manappuram Finance Ltd.", weight: -0.07 },
  { name: "Eternal Ltd.", weight: -0.07 },
];

// Top Futures positions
const futuresPositions = [
  { name: "Ashok Leyland Ltd.", weight: 1.12 },
  { name: "National Stock Exchange of India Ltd.", weight: 0.84 },
  { name: "Bharti Airtel Ltd.", weight: -1.59 },
  { name: "Polycab India Ltd.", weight: -0.87 },
  { name: "Cummins India Ltd.", weight: -0.59 },
  { name: "Adani Enterprises Ltd.", weight: -0.58 },
  { name: "Biocon Ltd.", weight: -0.38 },
  { name: "Interglobe Aviation Ltd.", weight: -0.33 },
];

const AltivaSifJan2026 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>

      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Link */}
          <Link
            href="/sifs/altiva-hybrid-long-short"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Altiva SIF
          </Link>

          {/* Hero */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <img
              src={edelweissLogo as unknown as string}
              alt="Edelweiss Mutual Fund"
              className="w-14 h-14 object-contain rounded-xl bg-white p-2 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                  Portfolio Update
                </Badge>
                <Badge variant="secondary">January 2026</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Altiva Hybrid Long-Short Fund
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Monthly Fund Update by Edelweiss Mutual Fund • Data as on 31st January 2026
              </p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <Card className="text-center p-4">
              <IndianRupee className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-lg font-bold text-foreground">₹2,093 Cr</p>
              <p className="text-xs text-muted-foreground">AUM (Month End)</p>
            </Card>
            <Card className="text-center p-4">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-lg font-bold text-foreground">₹10.3066</p>
              <p className="text-xs text-muted-foreground">NAV (Direct)</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-lg font-bold text-foreground">0.68%</p>
              <p className="text-xs text-muted-foreground">TER (Direct)</p>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <p className="text-lg font-bold text-foreground">Oct 20, 2025</p>
              <p className="text-xs text-muted-foreground">Inception Date</p>
            </Card>
          </div>

          {/* Portfolio Commentary */}
          <Card className="mb-8 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Portfolio Commentary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                In January, we continued to scale up deployment within the fund as our AUM scaled up rapidly.
                Our allocation to fixed-income remains concentrated in high-quality instruments and stood at
                29.1%. We have further deployed excess cash in T-Bills (8.5% of AUM) to manage liquidity and
                provide flexibility for equity and derivatives trades.
              </p>
              <p>
                Exposure to cash-future arbitrage and covered call/put strategies stood at 33.1%, continuing
                to offer attractive spreads of ~7% and 10–12%, respectively. Participation in special situation
                opportunities—including merger arbitrage, partly paid arbitrage, open offer and selective
                IPOs—was 5.2%. We have also participated in REITs and InvITs with exposure at 3.0% as we
                believe these instruments offer a better risk reward profile.
              </p>
              <p>
                Derivative strategy with strangle and other option-based positions stood at 12.4%, as we are
                in the midst of results season. In this environment, the focus remains on strategies designed
                to deliver superior risk-adjusted returns—particularly covered calls, straddles, and
                strangles—while maintaining the flexibility to capitalize on emerging special situations.
              </p>
            </CardContent>
          </Card>

          {/* Strategy Allocation */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Strategy Allocation
              </CardTitle>
              <p className="text-xs text-muted-foreground">Portfolio summary as on 31st January 2026</p>
            </CardHeader>
            <CardContent>
              {/* Visual bar */}
              <div className="flex h-8 rounded-lg overflow-hidden mb-4">
                {strategyAllocation.map((item) => (
                  <div
                    key={item.strategy}
                    className={`${item.color} relative group`}
                    style={{ width: `${item.exposure}%` }}
                    title={`${item.strategy}: ${item.exposure}%`}
                  />
                ))}
              </div>

              {/* Legend table */}
              <div className="space-y-2">
                {strategyAllocation.map((item) => (
                  <div key={item.strategy} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                      <span className="text-foreground">{item.strategy}</span>
                    </div>
                    <span className="font-semibold text-foreground tabular-nums">{item.exposure}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Holdings Accordion */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Portfolio Holdings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["equity"]} className="w-full">
                {/* Equity Holdings */}
                <AccordionItem value="equity">
                  <AccordionTrigger className="text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      Equity & Equity Related
                      <Badge variant="secondary" className="ml-1">33.43%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stock</TableHead>
                          <TableHead className="text-right w-20">Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topEquityHoldings.map((h) => (
                          <TableRow key={h.name}>
                            <TableCell className="text-sm py-2">{h.name}</TableCell>
                            <TableCell className="text-right font-medium tabular-nums text-sm py-2">
                              {h.weight.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/30">
                          <TableCell className="text-sm font-medium py-2">
                            + 37 more stocks
                          </TableCell>
                          <TableCell className="text-right text-sm py-2 text-muted-foreground">
                            Remaining holdings
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                {/* Fixed Income */}
                <AccordionItem value="fixed-income">
                  <AccordionTrigger className="text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-green-500" />
                      Fixed Income
                      <Badge variant="secondary" className="ml-1">37.20%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Issuer</TableHead>
                          <TableHead className="text-center w-16">Rating</TableHead>
                          <TableHead className="text-right w-20">Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fixedIncomeHoldings.map((h) => (
                          <TableRow key={h.name}>
                            <TableCell className="text-sm py-2">{h.name}</TableCell>
                            <TableCell className="text-center py-2">
                              <Badge
                                variant="outline"
                                className={`text-xs ${h.rating === "AAA" || h.rating === "Sovereign" ? "border-green-300 text-green-700 bg-green-50" : h.rating === "AA+" ? "border-blue-300 text-blue-700 bg-blue-50" : "border-amber-300 text-amber-700 bg-amber-50"}`}
                              >
                                {h.rating}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium tabular-nums text-sm py-2">
                              {h.weight.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {/* Debt Quants */}
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                      <h4 className="text-sm font-semibold mb-3 text-foreground">Debt Portfolio Quants</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">YTM</p>
                          <p className="font-semibold text-foreground">8.20%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Modified Duration</p>
                          <p className="font-semibold text-foreground">2.06 yr</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Avg Maturity</p>
                          <p className="font-semibold text-foreground">2.35 yr</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Macaulay Duration</p>
                          <p className="font-semibold text-foreground">2.22 yr</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Excluding T-Bills</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Derivatives */}
                <AccordionItem value="derivatives">
                  <AccordionTrigger className="text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-500" />
                      Index/Stock Options & Futures
                      <Badge variant="secondary" className="ml-1">-5.19%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-foreground">
                          Index/Stock Options <span className="text-red-500">(-1.97%)</span>
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Stock</TableHead>
                              <TableHead className="text-right w-20">Weight</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {topShortOptions.map((h) => (
                              <TableRow key={h.name}>
                                <TableCell className="text-sm py-2">{h.name}</TableCell>
                                <TableCell className="text-right font-medium tabular-nums text-sm py-2 text-red-500">
                                  {h.weight.toFixed(2)}%
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-foreground">
                          Index/Stock Futures <span className="text-red-500">(-3.22%)</span>
                        </h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Stock</TableHead>
                              <TableHead className="text-right w-20">Weight</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {futuresPositions.map((h) => (
                              <TableRow key={h.name}>
                                <TableCell className="text-sm py-2">{h.name}</TableCell>
                                <TableCell className={`text-right font-medium tabular-nums text-sm py-2 ${h.weight >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                                  {h.weight >= 0 ? "+" : ""}{h.weight.toFixed(2)}%
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* REITs/InvITs */}
                <AccordionItem value="reits">
                  <AccordionTrigger className="text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-rose-500" />
                      REITs / InvITs
                      <Badge variant="secondary" className="ml-1">3.02%</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Security</TableHead>
                          <TableHead className="text-right w-20">Weight</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reitHoldings.map((h) => (
                          <TableRow key={h.name}>
                            <TableCell className="text-sm py-2">{h.name}</TableCell>
                            <TableCell className="text-right font-medium tabular-nums text-sm py-2">
                              {h.weight.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Fund Managers */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Fund Managers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-center">Experience</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Managing Since</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell rowSpan={2} className="font-medium text-sm align-top">Equity</TableCell>
                    <TableCell className="text-sm py-2">Mr. Bhavesh Jain</TableCell>
                    <TableCell className="text-center text-sm py-2">17 Years</TableCell>
                    <TableCell className="text-right text-sm py-2 hidden sm:table-cell">20 Oct 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-sm py-2">Mr. Bharat Lahoti</TableCell>
                    <TableCell className="text-center text-sm py-2">18 Years</TableCell>
                    <TableCell className="text-right text-sm py-2 hidden sm:table-cell">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={2} className="font-medium text-sm align-top">Debt</TableCell>
                    <TableCell className="text-sm py-2">Mr. Dhawal Dalal</TableCell>
                    <TableCell className="text-center text-sm py-2">26 Years</TableCell>
                    <TableCell className="text-right text-sm py-2 hidden sm:table-cell">20 Oct 2025</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-sm py-2">Mr. Kedar Karnik</TableCell>
                    <TableCell className="text-center text-sm py-2">19 Years</TableCell>
                    <TableCell className="text-right text-sm py-2 hidden sm:table-cell">15 Jan 2026</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-sm">Overseas</TableCell>
                    <TableCell className="text-sm py-2">Mr. Amit Vora</TableCell>
                    <TableCell className="text-center text-sm py-2">16 Years</TableCell>
                    <TableCell className="text-right text-sm py-2 hidden sm:table-cell">20 Oct 2025</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Scheme Details */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Scheme Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">Hybrid Long-Short Fund</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-foreground">Interval</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Benchmark</span>
                  <span className="font-medium text-foreground text-right">NIFTY 50 Hybrid Composite Debt 50:50</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">NAV (Direct)</span>
                  <span className="font-medium text-foreground">₹10.3066</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">NAV (Regular)</span>
                  <span className="font-medium text-foreground">₹10.2773</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">TER (Direct)</span>
                  <span className="font-medium text-foreground">0.68%</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">TER (Regular)</span>
                  <span className="font-medium text-foreground">1.71%</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">AUM (Month End)</span>
                  <span className="font-medium text-foreground">₹2,093 Cr</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">AUM (Monthly Avg)</span>
                  <span className="font-medium text-foreground">₹1,680 Cr</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Min Investment</span>
                  <span className="font-medium text-foreground">₹10 Lakh</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Subscription</span>
                  <span className="font-medium text-foreground">Daily / Mon & Wed</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Exit Load</span>
                  <span className="font-medium text-foreground text-right">0.50% within 90 days, Nil after</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Plans & Options</span>
                  <span className="font-medium text-foreground">Direct, Regular, Growth, IDCW</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Features</span>
                  <span className="font-medium text-foreground">Lump sum, SIP, SWP, STP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Highlights */}
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Shield className="w-5 h-5" />
                Why Altiva?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {[
                  { title: "Consistent Income", desc: "Core allocation to arbitrage and fixed income ensures stable, fixed income like returns." },
                  { title: "All-Weather Strategy", desc: "Combination of multiple strategies aims for smoother outcomes regardless of market direction." },
                  { title: "Tax Efficiency", desc: "LTCG taxed at 12.5% over 12 months—competitive vs Cat III AIFs with similar strategies." },
                  { title: "Robust Risk Management", desc: "Active management and strict strategy-level risk controls help reduce portfolio volatility." },
                  { title: "Experienced Team", desc: "Managed by a highly specialized team with deep experience across derivatives and special situations." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-foreground">{item.title}: </span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="bg-muted/30 rounded-lg p-4 text-xs text-muted-foreground leading-relaxed space-y-2">
            <p>
              <strong>Disclaimer:</strong> This page is for information purposes only and is not an offer to sell
              or a solicitation to buy any SIF units/securities. All data as on 31st January 2026.
              NAVs shown are for Direct Plan Growth Option. Past performance may or may not be sustained in
              the future.
            </p>
            <p>
              Investments in Specialized Investment Fund involves relatively higher risk including potential
              loss of capital, liquidity risk and market volatility. Please read all investment strategy
              related documents carefully before making the investment decision.
            </p>
            <p className="text-muted-foreground/60">
              Source: Edelweiss Mutual Fund — Altiva Hybrid Long-Short Fund Portfolio Update, January 2026.
            </p>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AltivaSifJan2026;
