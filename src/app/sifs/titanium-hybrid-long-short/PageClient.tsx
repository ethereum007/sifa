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
  Zap
} from "lucide-react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



const TitaniumSif = () => {
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
              <AmcLogo amc="Tata Mutual Fund" size="md" />
              <div className="text-left">
                <Badge variant="outline" className="mb-2 text-amber-600 border-amber-500/30 bg-amber-50">
                  NFO CLOSED
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Titanium SIF by Tata
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Titanium Hybrid Long-Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              India's innovative hybrid long-short strategy combining equity growth with 
              strategic short positions for downside protection and all-weather returns.
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
              <p className="text-xs text-muted-foreground">Risk Band</p>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">Monthly</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2.25%</p>
              <p className="text-xs text-muted-foreground">Max TER</p>
            </Card>
          </div>

          {/* Strategy Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Triple-Pillar Investment Strategy
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
                    Core portfolio of high-conviction equity positions for capital appreciation.
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">65-75% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg text-red-900">Short Positions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-800/80 mb-3">
                    Strategic short exposure through derivatives for profit in declining markets.
                  </p>
                  <Badge className="bg-red-100 text-red-700 border-red-200">0-25% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-900">Debt & Stability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800/80 mb-3">
                    Fixed income allocation for stability, liquidity, and consistent returns.
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">25-35% Allocation</Badge>
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
                    <TableCell className="text-center">65%</TableCell>
                    <TableCell className="text-center">75%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Growth & capital appreciation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-muted-foreground">— Hedged (futures, options, arbitrage)</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">75%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Income & risk mitigation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-muted-foreground">— Unhedged Short Derivatives</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Alpha from declining markets</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="text-center">35%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Stability & liquidity</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">REITs & InvITs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">10%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Diversification & yield</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Derivative Strategies */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <Layers className="w-6 h-6 inline mr-2 text-primary" />
              Derivative Strategies
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-primary" />
                    Cash-Futures Arbitrage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Buy in spot, sell in futures to lock in spreads regardless of market direction.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs font-mono">
                    <p>Buy Stock @ ₹1,000 (spot)</p>
                    <p>Sell Futures @ ₹1,100</p>
                    <p className="text-primary font-bold">Locked Gain: ₹100/share</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Long-Short Pair Trading
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Profit from relative performance between sectors/stocks, not market direction.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs font-mono">
                    <p className="text-green-600">Long: Bank Nifty futures</p>
                    <p className="text-red-600">Short: Nifty IT futures</p>
                    <p className="text-primary font-bold">Profit from relative outperformance</p>
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
                    Generate premium income by selling call options against long positions.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs font-mono">
                    <p>Hold 100 shares @ ₹1,500</p>
                    <p>Sell Call @ ₹1,550 strike</p>
                    <p className="text-primary font-bold">Premium Earned: ₹1,000</p>
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
                    Insurance against downside while maintaining upside potential.
                  </p>
                  <div className="bg-secondary/50 p-3 rounded-lg text-xs font-mono">
                    <p>Own Stock @ ₹1,500</p>
                    <p>Buy Put @ ₹1,450 strike</p>
                    <p className="text-primary font-bold">Max Loss Capped at ₹70/share</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

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
                  <p className="text-sm text-green-700">Nifty +20%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long Equity (70%)</span>
                      <span className="text-green-600 font-medium">+14%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions (10%)</span>
                      <span className="text-red-600 font-medium">-2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt (30%)</span>
                      <span className="text-green-600 font-medium">+1.5%</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Net Return</span>
                      <span className="text-green-600">+13.5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    vs Pure Equity: ~20% (trade-off for protection)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-red-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-lg text-red-800">Bear Market</CardTitle>
                  </div>
                  <p className="text-sm text-red-700">Nifty -20%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long Equity (70%)</span>
                      <span className="text-red-600 font-medium">-14%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions (10%)</span>
                      <span className="text-green-600 font-medium">+2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt (30%)</span>
                      <span className="text-green-600 font-medium">+1.5%</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Net Return</span>
                      <span className="text-red-600">-10.5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    vs Pure Equity: -20% (halved the downside!)
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
                      <span className="text-muted-foreground">Long/Short Equity</span>
                      <span className="text-muted-foreground font-medium">±0.25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt</span>
                      <span className="text-green-600 font-medium">+1.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Option Premium</span>
                      <span className="text-green-600 font-medium">+2%</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Net Return</span>
                      <span className="text-green-600">+2.5-3.5%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    vs Pure Equity: 0-2% (generates income in flat markets)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Fund Management Team */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Fund Management Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-heading">Suraj Nanda</h4>
                  <p className="text-sm text-primary font-medium mb-2">Head - Equity & Derivatives</p>
                  <p className="text-xs text-muted-foreground">
                    PGDM Finance, B.Tech Electronics<br/>
                    9 years at ICICI Prudential AMC (Long-Short)
                  </p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <LineChart className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-heading">Amit Somani</h4>
                  <p className="text-sm text-primary font-medium mb-2">Fixed Income Head</p>
                  <p className="text-xs text-muted-foreground">
                    B.Com, PGDBM, CFA<br/>
                    13+ years at Tata AMC
                  </p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-heading">Hasmukh Vishariya</h4>
                  <p className="text-sm text-primary font-medium mb-2">Sector Analyst</p>
                  <p className="text-xs text-muted-foreground">
                    Chartered Accountant<br/>
                    IT, Internet, Telecom & Media coverage
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features & Liquidity */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Liquidity & Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Subscription</span>
                  <span className="font-medium">Daily</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Redemption</span>
                  <span className="font-medium">Monthly (1st business day)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Cut-off Time</span>
                  <span className="font-medium">3:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Redemption Payout</span>
                  <span className="font-medium">Within 3 working days</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Exchange Listing</span>
                  <span className="font-medium">BSE</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  Fees & Charges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Entry Load</span>
                  <span className="font-medium text-green-600">Nil</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Exit Load (within 1 year)</span>
                  <span className="font-medium text-amber-600">1%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Exit Load (after 1 year)</span>
                  <span className="font-medium text-green-600">Nil</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Max TER (Regular)</span>
                  <span className="font-medium">Up to 2.25%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Direct Plan</span>
                  <span className="font-medium">Lower TER</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Factors */}
          <Card className="max-w-4xl mx-auto mb-12 border-amber-200">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-transparent">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Key Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-heading">Short Selling Risk</h4>
                    <p className="text-sm text-muted-foreground">Theoretically unlimited loss if prices rise sharply</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-heading">Leverage Risk</h4>
                    <p className="text-sm text-muted-foreground">Derivatives magnify both gains and losses</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-heading">Liquidity Risk</h4>
                    <p className="text-sm text-muted-foreground">Monthly redemption may limit access to funds</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-heading">Complexity Risk</h4>
                    <p className="text-sm text-muted-foreground">Sophisticated strategies require expert management</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suitability */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Suitable For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>HNIs seeking balanced growth with income</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Investors comfortable with derivatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>3-5 year investment horizon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Portfolio diversification seekers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>Risk-conscious with ₹10L+ investable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Not Suitable For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">✕</span>
                    <span>Conservative investors seeking guaranteed returns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">✕</span>
                    <span>First-time mutual fund investors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">✕</span>
                    <span>Short-term investors (less than 3 years)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">✕</span>
                    <span>Those needing daily liquidity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">✕</span>
                    <span>Investors below ₹10L threshold</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>What makes Titanium SIF different from regular hybrid funds?</AccordionTrigger>
                  <AccordionContent>
                    Titanium SIF can take short positions (up to 25% of assets) through derivatives, which can profit from falling markets and reduce overall volatility. Regular hybrid funds are long-only and fully exposed to market downturns.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                  <AccordionTrigger>What is the minimum investment required?</AccordionTrigger>
                  <AccordionContent>
                    ₹10 lakhs aggregate across all Titanium SIF strategies at PAN level. This is a regulatory requirement for Specialized Investment Funds.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                  <AccordionTrigger>How often can I redeem my investment?</AccordionTrigger>
                  <AccordionContent>
                    Redemptions are processed once a month on the first business day. You can also sell units on BSE after listing for intraday liquidity.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                  <AccordionTrigger>What happens if my investment falls below ₹10 lakhs?</AccordionTrigger>
                  <AccordionContent>
                    If it's a passive breach (NAV decline), there's no penalty, but you can only redeem your entire holding—partial redemption isn't allowed until you top up to ₹10L+.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-5">
                  <AccordionTrigger>How are returns taxed?</AccordionTrigger>
                  <AccordionContent>
                    Since equity allocation is 65-75%, it qualifies for equity taxation. Long-term (over 24 months): 12.5% on gains exceeding ₹1.25L. Short-term: 20%.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-6">
                  <AccordionTrigger>Is this fund suitable for first-time investors?</AccordionTrigger>
                  <AccordionContent>
                    No. This is a complex product requiring understanding of derivatives, short selling, and market dynamics. It's best suited for experienced, HNI investors with sophisticated understanding of markets.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-semibold text-heading mb-3">
                  Interested in Titanium SIF?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Connect with our experts to understand if this strategy aligns with your investment goals.
                </p>
                <a
                  href={CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="gold" size="lg" className="gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mt-12 p-4 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Disclaimer:</strong> Investments in Specialized Investment Fund involves relatively higher risk including potential loss of capital, liquidity risk and market volatility. Past performance may or may not be sustained in the future. Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing.
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

export default TitaniumSif;
