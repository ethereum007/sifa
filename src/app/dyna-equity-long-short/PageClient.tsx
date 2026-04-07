"use client";
import dynamic from "next/dynamic";

import { Suspense } from "react";
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
  RefreshCw,
  Activity,
  Eye,
  Info
} from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



const DynaSif = () => {
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
              <AmcLogo amc="360 ONE Mutual Fund" size="md" />
              <div className="text-left">
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
                  NFO OPEN — FEB 6 to FEB 20, 2026
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Dyna SIF by 360 ONE Asset
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              DynaSIF Equity Long-Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              India's hedge fund equivalent for retail investors — an open-ended equity long-short 
              strategy with up to 25% unhedged short exposure through derivatives for alpha 
              generation and downside protection.
            </p>
            <p className="text-sm text-muted-foreground">
              by 360 ONE Asset Management Limited (formerly IIFL Asset Management)
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
              <p className="text-2xl font-bold text-heading">Level 5</p>
              <p className="text-xs text-muted-foreground">Risk Band (Highest)</p>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">Daily</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2.25%</p>
              <p className="text-xs text-muted-foreground">Max TER</p>
            </Card>
          </div>

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
                  <p className="font-semibold">February 6, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">February 20, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Price</p>
                  <p className="font-semibold">₹1,000 per unit</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Benchmark</p>
                  <p className="font-semibold">BSE 500 TRI</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Equity Long-Short Strategy
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">Long Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800/80 mb-3">
                    Core long positions using multi-factor stock selection — qualitative 
                    (macro, moats, thematic trends) + quantitative (valuation, momentum, regime analysis).
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">80-100% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg text-red-900">Short Derivatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-800/80 mb-3">
                    Unhedged short positions through derivatives to profit from declining stocks, 
                    reduce portfolio beta, and create market-neutral strategies.
                  </p>
                  <Badge className="bg-red-100 text-red-700 border-red-200">Up to 25%</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <Banknote className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-900">Debt & Liquidity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800/80 mb-3">
                    Debt and money market instruments for liquidity management and tactical 
                    cash positioning during defensive periods.
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">0-20% Allocation</Badge>
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
                    <TableHead>Component</TableHead>
                    <TableHead className="text-center">Min %</TableHead>
                    <TableHead className="text-center">Max %</TableHead>
                    <TableHead className="hidden sm:table-cell">Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Equity / Equity-related</TableCell>
                    <TableCell className="text-center">80%</TableCell>
                    <TableCell className="text-center">100%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Core long positions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-muted-foreground">— Unhedged Short Exposure</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Hedging + directional shorts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Liquidity management</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">InvITs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Alternative exposure</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Note:</strong> Total gross exposure capped at 100% of NAV. Options bought counted at premium paid; options sold at market value of underlying.
              </p>
            </CardContent>
          </Card>

          {/* Short Strategy Deep Dive */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Short Derivative Strategies — The Differentiator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Shorts are initiated on stocks exhibiting business weakness, end market deterioration, 
                market share loss, excessive valuation, or value migration in the business chain.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Strategy Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-center">Position Limit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Equity Long-Short</TableCell>
                      <TableCell>Single stock shorts, sector pairs, merger arbitrage</TableCell>
                      <TableCell className="text-center">~5% per stock</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sector Long-Short</TableCell>
                      <TableCell>Net sector exposure through relative value trades</TableCell>
                      <TableCell className="text-center">~20% net sector</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Index Trading</TableCell>
                      <TableCell>Directional bets via Nifty/Bank Nifty, index pairs</TableCell>
                      <TableCell className="text-center">~5% exposure</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Options Trading</TableCell>
                      <TableCell>Covered calls for yield, straddles/strangles for volatility</TableCell>
                      <TableCell className="text-center">~5% per position</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Portfolio Hedging</TableCell>
                      <TableCell>Stock arbitrage through options/futures, index derivatives</TableCell>
                      <TableCell className="text-center">Tactical</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Investment Approach */}
          <Card className="max-w-4xl mx-auto mb-12 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Target className="w-5 h-5" />
                Investment Approach — Multi-Factor Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Qualitative Factors</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Macro environment assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Industry dynamics evaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Thematic identification (transformational trends)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Business moat analysis</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Quantitative Factors</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Valuation metrics (P/E, P/B, EV/EBITDA)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Factor participation (quality, momentum, value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Market regime analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Technical price trends</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Scenarios */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-2">
              <BarChart3 className="w-6 h-6 inline mr-2 text-primary" />
              Performance Scenario Analysis
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              How the fund's NAV may behave under different market conditions with varying alpha scenarios
            </p>
            <div className="overflow-x-auto mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scenario</TableHead>
                    <TableHead className="text-center">Nifty Move</TableHead>
                    <TableHead className="text-center">Fund Return</TableHead>
                    <TableHead className="text-center">vs. Long-Only</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">No alpha, no shorts</TableCell>
                    <TableCell className="text-center text-green-600">+10%</TableCell>
                    <TableCell className="text-center">+9.5%</TableCell>
                    <TableCell className="text-center text-muted-foreground">Baseline</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">25% short, zero alpha</TableCell>
                    <TableCell className="text-center text-green-600">+10%</TableCell>
                    <TableCell className="text-center">+4.5%</TableCell>
                    <TableCell className="text-center text-red-600">-5.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">25% short, +5% alpha</TableCell>
                    <TableCell className="text-center text-green-600">+10%</TableCell>
                    <TableCell className="text-center text-green-600">+9.25%</TableCell>
                    <TableCell className="text-center text-muted-foreground">-0.25%</TableCell>
                  </TableRow>
                  <TableRow className="bg-red-50/50">
                    <TableCell className="font-medium">25% short, -3% alpha</TableCell>
                    <TableCell className="text-center text-green-600">+10%</TableCell>
                    <TableCell className="text-center text-red-600">+1.65%</TableCell>
                    <TableCell className="text-center text-red-600 font-semibold">-7.85%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-green-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-green-600" />
                    <CardTitle className="text-lg text-green-800">Market Correction (-20%)</CardTitle>
                  </div>
                  <p className="text-xs text-green-700">Where long-short shines</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long (70%)</span>
                      <span className="text-red-600 font-medium">-14%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short (25%)</span>
                      <span className="text-green-600 font-medium">+5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Net impact: <strong className="text-green-700">-9%</strong> vs long-only -19%
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-lg text-red-800">Short Squeeze</CardTitle>
                  </div>
                  <p className="text-xs text-red-700">Shorted stocks rally 25%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long (70%)</span>
                      <span className="text-green-600 font-medium">+7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short (25%)</span>
                      <span className="text-red-600 font-medium">-6.25%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Net impact: <strong className="text-red-700">+0.75%</strong> vs long-only +9.5%
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-amber-600" />
                    <CardTitle className="text-lg text-amber-800">Steady Bull (+15%)</CardTitle>
                  </div>
                  <p className="text-xs text-amber-700">Low volatility grind-up</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long (70%)</span>
                      <span className="text-green-600 font-medium">+10.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short + Options</span>
                      <span className="text-red-600 font-medium">-3.25%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    After costs: <strong className="text-amber-700">+4.75%</strong> vs long-only +13.5%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Fund Manager */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Fund Manager
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-heading mb-1">Harsh Aggarwal</h4>
                  <p className="text-sm text-primary mb-4">Head of Alternative Strategies</p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>18 years buy-side experience</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>5+ years as Head of Alt Strategies at Tata AMC</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Managed long-short AIFs with ₹3,000+ Cr AUM</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Certifications: CPM, CTM, NISM</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Diverse exposure: equity, derivatives, fixed income</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span className="text-amber-700">Solo fund manager — no co-manager disclosed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Structure */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Cost Structure & TER
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>AUM Range</TableHead>
                      <TableHead className="text-center">Max TER</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">First ₹500 Cr</TableCell>
                      <TableCell className="text-center font-semibold">2.25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Next ₹250 Cr</TableCell>
                      <TableCell className="text-center">2.00%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Next ₹1,250 Cr</TableCell>
                      <TableCell className="text-center">1.75%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Next ₹3,000 Cr</TableCell>
                      <TableCell className="text-center">1.60%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Next ₹5,000 Cr</TableCell>
                      <TableCell className="text-center">1.50%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Beyond ₹10,000 Cr</TableCell>
                      <TableCell className="text-center">Progressive reduction</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">NIL</p>
                  <p className="text-muted-foreground">Entry Load</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">0.50%</p>
                  <p className="text-muted-foreground">Exit Load (&lt;3 months)</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">~2.50%</p>
                  <p className="text-muted-foreground">All-in Cost (est.)</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 mb-1">Cost Impact Analysis</p>
                    <p className="text-amber-700">
                      On ₹10L investment: ~₹25,000/year all-in costs (TER + GST + transaction). 
                      Fund must beat BSE 500 by <strong>2.5%+ annually</strong> just to justify costs.
                      Brokerage: Cash market up to 12 bps | Derivatives up to 5 bps (plus GST).
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Requirements */}
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
                  <h4 className="font-semibold mb-3">During NFO</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Minimum Investment</span>
                      <span className="font-medium text-foreground">₹10,00,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Accredited Investors</span>
                      <span className="font-medium text-foreground">₹1,00,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>NFO Price</span>
                      <span className="font-medium text-foreground">₹1,000/unit</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Post-NFO (Continuous)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex justify-between">
                      <span>SIP</span>
                      <span className="font-medium text-foreground">Available after ₹10L</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Redemption</span>
                      <span className="font-medium text-foreground">Daily (T+3 payout)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Multiple Channels</span>
                      <span className="font-medium text-foreground">Physical, Online, MFU</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 mb-1">₹10 Lakh Threshold (PAN Level)</p>
                    <p className="text-amber-700">
                      If NAV decline causes investment to fall below ₹10L, you get 30-day notice to top up. 
                      Forced redemption if not complied — in a market crash, you could be force-liquidated at the bottom.
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
                  <p className="text-xs text-muted-foreground">Business days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Redemption</p>
                  <p className="font-semibold text-lg text-green-600">Daily</p>
                  <p className="text-xs text-muted-foreground">Open-ended structure</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payout</p>
                  <p className="font-semibold text-lg">T+3 Days</p>
                  <p className="text-xs text-muted-foreground">Working days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Exit Load</p>
                  <p className="font-semibold text-lg text-amber-600">0.5%</p>
                  <p className="text-xs text-muted-foreground">&lt;3 months only</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm text-blue-800">Segregated Portfolio Provision</h4>
                <p className="text-xs text-blue-700">
                  Fund can isolate credit events via segregated portfolios, protecting remaining investors 
                  from concentrated credit risks in the debt portion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Analysis */}
          <Card className="max-w-4xl mx-auto mb-12 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <FileText className="w-5 h-5" />
                Tax Treatment — Critical Consideration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto mb-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Holding Period</TableHead>
                      <TableHead className="text-center">Tax Rate</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">&lt; 12 months (STCG)</TableCell>
                      <TableCell className="text-center font-semibold">20%</TableCell>
                      <TableCell className="text-muted-foreground">Plus STT on equity transactions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">&gt; 12 months (LTCG)</TableCell>
                      <TableCell className="text-center font-semibold">12.5%</TableCell>
                      <TableCell className="text-muted-foreground">On gains exceeding ₹1.25 lakh</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-1">⚠️ Equity Status Risk</p>
                    <p className="text-red-700">
                      If debt allocation exceeds thresholds, the fund COULD lose equity-oriented status 
                      and be reclassified as a debt fund — resulting in STCG at slab rate (up to 42.74%) 
                      instead of 20%. This is a material risk for HNI investors in high tax brackets.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <AlertTriangle className="w-6 h-6 inline mr-2 text-amber-500" />
              Key Risk Factors
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="short-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Short Selling Risks — Theoretically Unlimited Losses</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>If a shorted stock rises from ₹100 to ₹500, the fund loses 400% on that position. No cap on losses.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Mitigation: 5% single-stock limit on shorts, diversification across positions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>Gap: No specific stop-loss policy disclosed for losing short positions.</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="derivatives-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Derivatives Complexity</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>The fund can simultaneously use equity futures, index futures, call/put options (bought & sold), covered calls, and straddles/strangles.</li>
                    <li>Small misjudgments in strike price selection, expiry timing, volatility assessment, or delta management can compound into significant losses.</li>
                    <li>Monthly F&O position rollovers add friction costs, especially during volatile markets.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="regulatory-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Regulatory & Structural Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>New SIF Framework:</strong> SEBI's SIF regulations (Feb 2025 circular) are less than 1 year old, untested in market stress, and subject to change.</li>
                    <li><strong>360 ONE's First SIF:</strong> Learning curve risks exist at the organizational level — this is their first specialized investment fund.</li>
                    <li><strong>Forced Liquidation:</strong> If investment falls below ₹10L threshold due to NAV decline, 30-day notice followed by forced redemption at potentially unfavorable prices.</li>
                    <li><strong>NFO Deployment:</strong> Funds must be deployed in 30-60 days. For a derivatives-heavy strategy, rushed deployment = suboptimal positions.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="liquidity-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Liquidity & Operational Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Short Squeeze:</strong> If heavily shorted stocks rally sharply, forced buy-backs can cascade.</li>
                    <li><strong>Large Redemptions:</strong> ₹10L minimum means HNI-heavy investor base. One large redemption could force portfolio liquidation at bad prices.</li>
                    <li><strong>High Turnover:</strong> Strategy explicitly expected to experience high churn due to derivatives — impacting transaction costs and tax efficiency.</li>
                    <li><strong>No SIP Initially:</strong> Must invest lump sum ₹10L first. SIP only after crossing threshold.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
                      <span>Sophisticated investors who understand derivatives & short-selling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>HNI/UHNIs with ₹50L+ portfolios (₹10L = 20% or less)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Market timers wanting tactical downside protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Multi-strategy portfolio builders (10-15% allocation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Risk-seeking allocators comfortable with Risk Band 5</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    NOT Suitable For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>First-time investors — complexity is overwhelming</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Long-term buy-and-hold investors — costs erode compounding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Risk-averse investors — Level 5 is maximum risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Tax-sensitive investors — equity status can be lost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Those seeking passive income — no consistent IDCW policy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Competitive Positioning */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-primary" />
                Competitive Positioning — DynaSIF vs Alternatives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Factor</TableHead>
                      <TableHead>DynaSIF L/S</TableHead>
                      <TableHead>Flexi-Cap MF</TableHead>
                      <TableHead>Cat III AIF</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Min Investment</TableCell>
                      <TableCell>₹10 Lakh</TableCell>
                      <TableCell className="text-green-600">₹100</TableCell>
                      <TableCell>₹1 Crore</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Downside Protection</TableCell>
                      <TableCell className="text-green-600 font-medium">Via shorts ✓</TableCell>
                      <TableCell>Market-linked</TableCell>
                      <TableCell className="text-green-600">Higher leverage</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cost</TableCell>
                      <TableCell>2.25%</TableCell>
                      <TableCell className="text-green-600 font-medium">0.75%</TableCell>
                      <TableCell>2% + 20% carry</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Complexity</TableCell>
                      <TableCell className="text-amber-600">Very High</TableCell>
                      <TableCell className="text-green-600">Low</TableCell>
                      <TableCell className="text-red-600">Highest</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liquidity</TableCell>
                      <TableCell className="text-green-600">Daily (T+3)</TableCell>
                      <TableCell className="text-green-600">Daily (T+3)</TableCell>
                      <TableCell>3-year lock-in</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Upside Capture</TableCell>
                      <TableCell>Lower (due to shorts)</TableCell>
                      <TableCell className="text-green-600 font-medium">Full</TableCell>
                      <TableCell>Variable</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                DynaSIF sits between mutual funds and AIFs — more sophisticated than MFs, more accessible than AIFs. 
                Best suited as a 10-15% tactical allocation within a diversified portfolio.
              </p>
            </CardContent>
          </Card>

          {/* SIF Prime Verdict */}
          <Card className="max-w-4xl mx-auto mb-12 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Eye className="w-5 h-5" />
                SIF Prime Verdict — 6.5/10
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criterion</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Strategy Innovation</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">8/10</TableCell>
                      <TableCell className="text-center">20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fund Manager Credentials</TableCell>
                      <TableCell className="text-center text-amber-600 font-semibold">6/10</TableCell>
                      <TableCell className="text-center">25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cost Competitiveness</TableCell>
                      <TableCell className="text-center text-amber-600 font-semibold">5/10</TableCell>
                      <TableCell className="text-center">15%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Risk Management</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">7/10</TableCell>
                      <TableCell className="text-center">20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Transparency</TableCell>
                      <TableCell className="text-center text-amber-600 font-semibold">5/10</TableCell>
                      <TableCell className="text-center">10%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Structural Features</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">7/10</TableCell>
                      <TableCell className="text-center">10%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2 text-sm">Why It Could Work</h4>
                  <ul className="space-y-1 text-xs text-green-700">
                    <li>• Strong in choppy/bearish markets (2026-27 scenario)</li>
                    <li>• Proven manager with long-short AIF experience</li>
                    <li>• Valuable portfolio diversification if beta &lt;0.6</li>
                    <li>• SIF framework matures, tax clarity improves</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2 text-sm">Key Concerns</h4>
                  <ul className="space-y-1 text-xs text-red-700">
                    <li>• Zero verified track record for this specific fund</li>
                    <li>• High cost hurdle (2.5%+ alpha needed annually)</li>
                    <li>• 7+ sub-strategies = murky performance attribution</li>
                    <li>• Tax reclassification risk for HNI investors</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="faq-1" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What makes DynaSIF different from a regular equity mutual fund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Unlike traditional mutual funds that can only go "long" (buy stocks), DynaSIF can also take "short" positions (profit when stock prices fall) via derivatives — up to 25% of the portfolio. This allows the fund to generate alpha in falling markets and reduce overall portfolio risk. However, this added complexity comes with higher costs (2.25% vs ~0.75% for flexi-cap funds) and requires a ₹10 lakh minimum investment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Is there a lock-in period?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No mandatory lock-in. As an open-ended fund, you can redeem on any business day with T+3 payout. However, a 0.5% exit load applies if you redeem within 3 months — so a short holding period is penalized. There's no SIP option until you've crossed the ₹10 lakh threshold via lump-sum investment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What happens if my investment value falls below ₹10 lakhs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  If your investment drops below ₹10 lakhs due to NAV decline, you'll receive a 30-day notice to top up your investment to the minimum threshold. If you don't comply, your units will be force-redeemed. This is a critical risk factor — in a market crash, you could be liquidated at the worst possible time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Who is the fund manager and what's his track record?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Harsh Aggarwal, with 18 years of buy-side experience and 5+ years as Head of Alternative Strategies at Tata AMC, where he managed long-short AIFs with ₹3,000+ crore AUM. However, specific performance numbers from his Tata AMC stint are not disclosed in the fund documents — a notable transparency gap for a ₹10 lakh minimum product.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Can the fund lose its equity-oriented tax status?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes — if the fund's debt allocation exceeds certain thresholds for extended periods during defensive positioning, it could be reclassified as a debt fund for tax purposes. This would mean STCG at your income tax slab rate (up to 42.74%) instead of the flat 20% equity STCG rate. The fund's own documents acknowledge this risk.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  How does DynaSIF compare to a PMS or AIF?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  DynaSIF sits between traditional MFs and AIFs. Compared to PMS (₹50L min): lower minimum, no customization, fund-level taxation vs investor-level. Compared to AIFs (₹1Cr min, 3-year lock): much more accessible with daily liquidity, but lower leverage allowed. It's best suited as a 10-15% tactical allocation in an HNI portfolio, not a core holding.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-secondary/50 border border-border rounded-lg p-6">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Important Disclaimer
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This analysis is for informational purposes only and does not constitute investment advice or a recommendation 
                to buy, sell, or hold any investment. SIF Prime is an AMFI Registered distributor and does not provide 
                personalized financial advice. Past performance is not indicative of future results. Mutual fund investments 
                are subject to market risks. Read all scheme-related documents carefully before investing. The SIF framework 
                is new and subject to regulatory changes. Short-selling involves theoretically unlimited risk. Please consult 
                your financial advisor before making investment decisions. The rating and analysis represent SIF Prime's 
                independent assessment based on publicly available information.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-semibold mb-4">Interested in DynaSIF Equity Long-Short Fund?</h3>
                <p className="text-muted-foreground mb-6">
                  NFO closes February 20, 2026. Contact our team for detailed investment guidance and documentation.
                </p>
                <a 
                  href={CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DynaSif;
