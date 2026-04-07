"use client";

import { lazy, Suspense } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  PieChart,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Percent,
  IndianRupee,
  Clock,
  Building2,
  LineChart,
  Briefcase,
  Scale,
  Wallet,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  FileText,
  Banknote,
  RefreshCw
} from "lucide-react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



const AltivaSif = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>
      
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <AmcLogo amc="Edelweiss Mutual Fund" size="md" />
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Altiva SIF by Edelweiss
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Altiva Hybrid Long-Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              A multi-strategy hybrid long-short fund combining equity growth, special situations, 
              fixed income, and overseas investments for sophisticated investors seeking diversified returns.
            </p>
            <p className="text-sm text-muted-foreground">
              by Edelweiss Asset Management Limited
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <Card className="text-center p-4">
              <IndianRupee className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">₹10L</p>
              <p className="text-xs text-muted-foreground">Min Investment</p>
            </Card>
            <Card className="text-center p-4">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2x/Week</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">3 Days</p>
              <p className="text-xs text-muted-foreground">Settlement</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2.00%</p>
              <p className="text-xs text-muted-foreground">Max TER</p>
            </Card>
          </div>

          {/* Altiva Returns Scorecard */}
          <Card className="max-w-4xl mx-auto mb-12 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/10 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-primary text-lg">
                <TrendingUp className="w-5 h-5" />
                Altiva SIF Returns Scorecard
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">1 Month</p>
                  <p className="text-xl font-bold text-green-600">+1.46%</p>
                </div>
                <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">3 Months</p>
                  <p className="text-xl font-bold text-green-600">+2.53%</p>
                </div>
                <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Since Inception</p>
                  <p className="text-xl font-bold text-green-600">+5.31%</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Source: AMFI • NAV as of March 31, 2026
              </p>
            </CardContent>
          </Card>

          {/* NFO Details */}
          <Card className="max-w-4xl mx-auto mb-12 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calendar className="w-5 h-5" />
                NFO Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">NFO Open Date</p>
                  <p className="font-semibold">October 01, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">October 15, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Price</p>
                  <p className="font-semibold">₹10 per unit</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reopening Date</p>
                  <p className="font-semibold">On/Before Oct 31, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Strategy Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Multi-Strategy Investment Approach
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">Equity Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800/80 mb-3">
                    Long positions in equity and equity-related instruments for capital appreciation.
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">25-75% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg text-amber-900">Special Situations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-800/80 mb-3">
                    IPOs, FPOs, Rights Issues, Buybacks, Mergers, Demergers, QIPs, Delistings.
                  </p>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">Event-Driven</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <Banknote className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-900">Fixed Income</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800/80 mb-3">
                    Debt and money market instruments for accrual income and price appreciation.
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">25-75% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg text-purple-900">Overseas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-800/80 mb-3">
                    Global equity, debt, and thematic opportunities through direct securities or ETFs.
                  </p>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">Up to 30%</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Asset Allocation Table */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Asset Allocation Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Class</TableHead>
                    <TableHead className="text-center">Min %</TableHead>
                    <TableHead className="text-center">Max %</TableHead>
                    <TableHead className="hidden sm:table-cell">Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Equity & Equity-Related</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="text-center">75%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Capital appreciation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="text-center">75%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Accrual income & stability</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Short Unhedged Derivatives</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Downside protection & alpha</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REITs & InvITs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Diversification & yield</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Overseas Securities</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">30%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Global diversification</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Note:</strong> Cumulative Gross Exposure across all instruments should NOT exceed 100% of net assets.
              </p>
            </CardContent>
          </Card>

          {/* Derivative Strategies */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <Layers className="w-6 h-6 inline mr-2 text-primary" />
              Derivative Strategies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-primary" />
                    Cash-Futures Arbitrage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simultaneously buy in spot and sell in futures to lock in spreads during pricing inefficiencies.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-muted-foreground">Position: Cash + Short stocks</p>
                    <p className="text-primary font-medium">Risk: Basis risk, rollover cost</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Covered Call Writing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Write call options against existing equity holdings to enhance yield in range-bound markets.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-muted-foreground">Position: Cash/Future + Call written</p>
                    <p className="text-primary font-medium">Profit limited to option premium</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Protective Put
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Buy put options to limit downside in volatile markets while maintaining upside potential.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-muted-foreground">Position: Cash/Future + Long put</p>
                    <p className="text-primary font-medium">Risk: Premium cost, time decay</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Pair Trading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Capture relative value between two correlated securities/indices regardless of direction.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-muted-foreground">Position: Long & Short</p>
                    <p className="text-primary font-medium">Risk: Correlation breakdown</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Straddle/Strangle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Express view on market volatility with limited or undefined directional bias.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-muted-foreground">Position: Long or Short</p>
                    <p className="text-primary font-medium">Risk: Time decay, timing risk</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    Index/Stock Futures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Used for short-term risk reduction, rebalancing, or expressing directional bias.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs space-y-1">
                    <p className="text-muted-foreground">Position: Long/Short</p>
                    <p className="text-primary font-medium">Risk: Beta estimation, rollover</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Special Situations */}
          <Card className="max-w-4xl mx-auto mb-12 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <Zap className="w-5 h-5" />
                Special Situations Strategy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The fund capitalizes on event-driven opportunities for tactical short-term return generation:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  "IPOs (Initial Public Offerings)",
                  "FPOs (Follow-on Public Offers)", 
                  "Rights Issues",
                  "Buybacks",
                  "Open Offers",
                  "Demergers & Mergers",
                  "QIPs (Qualified Institutional Placements)",
                  "Index Rebalancing Events"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Investment Limits */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Investment Limits & Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instrument/Activity</TableHead>
                      <TableHead className="text-right">Limit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Securities Lending</TableCell>
                      <TableCell className="text-right">Max 20% of net assets; Max 5% to single intermediary</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Derivatives (Non-hedging)</TableCell>
                      <TableCell className="text-right">Max 25% short exposure; Options premium max 20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Securitized Debt</TableCell>
                      <TableCell className="text-right">Max 25% of debt portfolio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Overseas Securities</TableCell>
                      <TableCell className="text-right">Up to 30% (No overseas derivatives)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>REITs and InvITs</TableCell>
                      <TableCell className="text-right">Up to 20% of net assets</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AT1/AT2 Bonds</TableCell>
                      <TableCell className="text-right">Up to 10% of NAV of debt portfolio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Repo/Reverse Repo (Corporate Debt)</TableCell>
                      <TableCell className="text-right">Up to 10% of net assets</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Equity Derivatives (Hedging)</TableCell>
                      <TableCell className="text-right">Up to 100% of equity exposure</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Market Scenarios */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <BarChart3 className="w-6 h-6 inline mr-2 text-primary" />
              Performance Across Market Scenarios
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-green-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg text-green-800">Bull Market</CardTitle>
                  </div>
                  <p className="text-sm text-green-700">Nifty +15%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long Equity</span>
                      <span className="text-green-600 font-medium">Strong gains</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions</span>
                      <span className="text-red-600 font-medium">Slight drag</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fixed Income</span>
                      <span className="text-green-600 font-medium">Accrual</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Participates in upside while covered calls may cap extreme gains
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-lg text-red-800">Bear Market</CardTitle>
                  </div>
                  <p className="text-sm text-red-700">Nifty -15%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long Equity</span>
                      <span className="text-red-600 font-medium">Drawdown</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions</span>
                      <span className="text-green-600 font-medium">Alpha gains</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fixed Income</span>
                      <span className="text-green-600 font-medium">Cushion</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Short positions + arbitrage + debt cushion the fall significantly
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-amber-600" />
                    <CardTitle className="text-lg text-amber-800">Sideways Market</CardTitle>
                  </div>
                  <p className="text-sm text-amber-700">Nifty ±5%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arbitrage</span>
                      <span className="text-green-600 font-medium">Premium capture</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Covered Calls</span>
                      <span className="text-green-600 font-medium">Option income</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fixed Income</span>
                      <span className="text-green-600 font-medium">Accrual</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Generates returns even when markets don't move through income strategies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Who Should Invest */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Who Should Invest?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    Suitable For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>HNIs seeking diversified multi-strategy approach</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Investors comfortable with hybrid equity-debt strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Those seeking global diversification exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Investors wanting event-driven special situations exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Minimum 3+ year investment horizon</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    Not Suitable For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Investors seeking guaranteed returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Those requiring daily liquidity access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Investors who cannot meet ₹10 lakh minimum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Those uncomfortable with derivative strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Short-term traders looking for quick exits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Minimum Investment Threshold */}
          <Card className="max-w-4xl mx-auto mb-12 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Investment Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Regular Investors</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Minimum Investment (NFO)</span>
                      <span className="font-medium text-foreground">₹10,00,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Additional Purchase</span>
                      <span className="font-medium text-foreground">₹1,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>SIP Minimum</span>
                      <span className="font-medium text-foreground">₹1,000/month</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Accredited Investors</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Minimum Investment</span>
                      <span className="font-medium text-foreground">₹1,00,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Additional Purchase</span>
                      <span className="font-medium text-foreground">₹1,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>SIP Minimum</span>
                      <span className="font-medium text-foreground">₹1,000/month</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 mb-1">Threshold Compliance</p>
                    <p className="text-amber-700">
                      If investment value falls below ₹10L due to redemption (active breach), units are frozen. 
                      You get 30 days to rebalance or units are auto-redeemed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Redemption & Liquidity */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Redemption & Liquidity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Subscription</p>
                  <p className="font-semibold text-lg">Daily</p>
                  <p className="text-xs text-muted-foreground">After scheme reopens</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Redemption Days</p>
                  <p className="font-semibold text-lg">Mon & Wed</p>
                  <p className="text-xs text-muted-foreground">Every week</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Settlement</p>
                  <p className="font-semibold text-lg">T+3 Days</p>
                  <p className="text-xs text-muted-foreground">Working days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Exit Load</p>
                  <p className="font-semibold text-lg">0.50%</p>
                  <p className="text-xs text-muted-foreground">If redeemed within 90 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fund Management */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Fund Management Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Bhavesh Jain", role: "Fund Manager" },
                  { name: "Bharat Lahoti", role: "Fund Manager" },
                  { name: "Dhawal Dalal", role: "Fund Manager" },
                  { name: "Pranavi Kulkarni", role: "Fund Manager" },
                  { name: "Amit Vora", role: "Fund Manager" }
                ].map((manager) => (
                  <div key={manager.name} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{manager.name}</p>
                      <p className="text-xs text-muted-foreground">{manager.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors Accordion */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <AlertTriangle className="w-6 h-6 inline mr-2 text-amber-500" />
              Key Risk Factors
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="equity-risks">
                <AccordionTrigger>Equity & Market Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Liquidity Risk:</strong> Investments may become less liquid due to market developments</li>
                    <li><strong>Market Risk:</strong> Value affected by interest rates, currency, government policy changes</li>
                    <li><strong>Volatility Risk:</strong> Daily price fluctuations may affect redemption ability</li>
                    <li><strong>Settlement Risk:</strong> Inability to make intended purchases due to settlement problems</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="debt-risks">
                <AccordionTrigger>Debt & Fixed Income Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Interest Rate Risk:</strong> Price falls when interest rates rise</li>
                    <li><strong>Credit/Default Risk:</strong> Issuer may default on interest or principal</li>
                    <li><strong>Reinvestment Risk:</strong> Interest rates vary over time</li>
                    <li><strong>Prepayment Risk:</strong> May receive monthly cashflows earlier than scheduled</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="derivative-risks">
                <AccordionTrigger>Derivative Strategy Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Leverage Risk:</strong> Derivatives can provide disproportionate gains or losses</li>
                    <li><strong>Counterparty Risk:</strong> In OTC derivatives, counterparty may default</li>
                    <li><strong>Basis Risk:</strong> Cash-futures may not track perfectly</li>
                    <li><strong>Time Decay:</strong> Options lose value over time without significant movement</li>
                    <li><strong>Correlation Breakdown:</strong> Pair trades may diverge instead of converge</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="overseas-risks">
                <AccordionTrigger>Overseas Investment Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Currency Risk:</strong> Exchange rate changes can impact returns</li>
                    <li><strong>Regulatory Risk:</strong> Foreign government regulations may change</li>
                    <li><strong>Political Risk:</strong> Political and economic instability in foreign markets</li>
                    <li><strong>Industry Limit Risk:</strong> Investment subject to RBI/SEBI industry-wide limits</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Benchmark */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Benchmark Index
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-heading mb-2">
                NIFTY 50 Hybrid Composite Debt 50:50 Index
              </p>
              <p className="text-sm text-muted-foreground">
                This benchmark represents 50% allocation to equity (NIFTY 50) and 50% allocation to debt, 
                matching the fund's hybrid equity-debt allocation approach.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-heading mb-4">Ready to Invest?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us to start investing in Altiva Hybrid Long-Short Fund
            </p>
            <a 
              href={CONSULTATION_URL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="lg" className="gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AltivaSif;
