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
  LineChart,
  Wallet,
  Banknote,
  RefreshCw,
  Activity,
  Scale,
  ShieldCheck,
  Layers,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



const ApexSif = () => {
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
              <AmcLogo amc="Aditya Birla Sun Life Mutual Fund" size="md" />
              <div className="text-left">
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
                  NFO OPEN
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Apex SIF by Aditya Birla Sun Life
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Apex Hybrid Long-Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              An interval SIF using long equity, arbitrage, derivatives (long-short) and fixed income 
              to generate alpha with capped downside risk.
            </p>
            <p className="text-sm text-muted-foreground">
              by Aditya Birla Sun Life AMC Limited
            </p>
          </div>

          {/* Analyst Verdict */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="border-green-300 bg-gradient-to-r from-green-50 to-white">
              <CardContent className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Analyst Verdict</p>
                    <p className="text-2xl font-bold text-green-700">BUY</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  <p>Report Date: <strong>06 Mar 2026</strong></p>
                  <p>Analyst: SIFPrime Research Desk</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
            <Card className="text-center p-4">
              <IndianRupee className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">₹10L</p>
              <p className="text-xs text-muted-foreground">Min Investment</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2.25%</p>
              <p className="text-xs text-muted-foreground">Max TER</p>
            </Card>
            <Card className="text-center p-4">
              <ArrowUpDown className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">0.50%</p>
              <p className="text-xs text-muted-foreground">Exit Load (≤90d)</p>
            </Card>
            <Card className="text-center p-4">
              <LineChart className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-bold text-heading leading-tight">NIFTY 50 Hybrid Composite Debt 50:50</p>
              <p className="text-xs text-muted-foreground">Benchmark</p>
            </Card>
            <Card className="text-center p-4">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">T+3</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Target className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">Level 2</p>
              <p className="text-xs text-muted-foreground">Risk Band</p>
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
                  <p className="font-semibold">March 06, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">March 18, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Allotment</p>
                  <p className="font-semibold">Within 5 business days post-NFO</p>
                </div>
                <div>
                  <p className="text-muted-foreground">SEBI Strategy Code</p>
                  <p className="font-semibold text-xs">APEX/I/H/HLSF/26/02/0001/ABSL</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fund Snapshot */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Fund Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-1/3">Fund Objective</TableCell>
                    <TableCell className="text-muted-foreground">Generate long-term capital appreciation through arbitrage, long equity, debt, equity/debt derivatives, long-short and REITs/InVITs, including limited short exposure via derivatives.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Strategy</TableCell>
                    <TableCell className="text-muted-foreground">Hybrid Long-Short: Combines long equity, arbitrage, covered calls, straddles, fixed income, and limited short positions (max 25% net assets) for risk-adjusted returns.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">What It Invests In</TableCell>
                    <TableCell className="text-muted-foreground">Indian equities (35-65%), debt & money market (35-65%), derivatives up to 100%, InvITs up to 20%. Unhedged short max 25% of net assets.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Investment Horizon</TableCell>
                    <TableCell className="text-muted-foreground">3–5 years minimum</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Registrar (RTA)</TableCell>
                    <TableCell className="text-muted-foreground">KFin Technologies / CAMS</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Strategy Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Hybrid Long-Short Strategy
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">Equity Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800/80 mb-3">
                    Long positions in equity and equity-related instruments for capital appreciation.
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">35-65% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <Banknote className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-green-900">Debt & Money Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800/80 mb-3">
                    Fixed income instruments for stability, accrual income, and portfolio balance.
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">35-65% Allocation</Badge>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg text-red-900">Short Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-800/80 mb-3">
                    Naked short exposure through derivatives for downside protection and alpha generation.
                  </p>
                  <Badge className="bg-red-100 text-red-700 border-red-200">Up to 25%</Badge>
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
                    <TableHead className="hidden sm:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Equity & Equity-Related</TableCell>
                    <TableCell className="text-center">35%</TableCell>
                    <TableCell className="text-center">65%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Per SEBI SIF Regulations</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium pl-8">↳ Unhedged Short (max)</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">SEBI cap on naked short derivatives</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">65%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Including ETFs and MF units</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Derivatives — Hedging</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">100%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Hedging + yield enhancement strategies</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">InvITs / REITs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Max 10% per single issuer</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cash / Liquid / STD</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Short-term liquidity</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Mr. Lovelish Solanki</p>
                      <p className="text-xs text-muted-foreground">Fund Manager, Equity</p>
                    </div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 17+ years in trading and fund management</li>
                    <li>• MMS (Finance), BMS (Finance)</li>
                    <li>• Former Equity/Derivatives Trader at Union KBC AMC & Edelweiss AMC</li>
                  </ul>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Mr. Mohit Sharma</p>
                      <p className="text-xs text-muted-foreground">Fund Manager, Debt</p>
                    </div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 19+ years experience (11 years in financial markets)</li>
                    <li>• PGDCM – IIM Calcutta; B.Tech – IIT Madras</li>
                    <li>• Former Interest Rates Trader at Standard Chartered Bank, ICICI Bank</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Derivative Strategies */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <Layers className="w-6 h-6 inline mr-2 text-primary" />
              Derivative Toolkit
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Income Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Covered Calls</li>
                    <li>• Cash-Secured Puts</li>
                    <li>• Premium Capture</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    Protection Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Protective Puts</li>
                    <li>• Collars</li>
                    <li>• Hedging Positions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Directional Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Bull/Bear Spreads</li>
                    <li>• Long Calls/Puts</li>
                    <li>• Synthetic Positions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Volatility Strategies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Straddles & Strangles</li>
                    <li>• Butterflies</li>
                    <li>• Iron Condors</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Hedging & Pairs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pair Trades</li>
                    <li>• Market Neutral</li>
                    <li>• Arbitrage</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-primary" />
                    Fixed Income Derivatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Interest Rate Swaps</li>
                    <li>• Forward Rate Agreements</li>
                    <li>• Credit Default Swaps</li>
                  </ul>
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
                  <p className="text-sm text-green-700">Nifty +15%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long Equity (35-65%)</span>
                      <span className="text-green-600 font-medium">Gains</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions</span>
                      <span className="text-red-600 font-medium">Drag</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt (35-65%)</span>
                      <span className="text-green-600 font-medium">Accrual</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Participates in upside with balanced equity exposure
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
                      <span className="text-muted-foreground">Short Positions (25%)</span>
                      <span className="text-green-600 font-medium">Alpha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt (35-65%)</span>
                      <span className="text-green-600 font-medium">Cushion</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Short positions + debt allocation significantly reduce drawdown
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
                      <span className="text-muted-foreground">Derivatives</span>
                      <span className="text-green-600 font-medium">Premium income</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Covered Calls</span>
                      <span className="text-green-600 font-medium">Option income</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Debt (35-65%)</span>
                      <span className="text-green-600 font-medium">Accrual</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Market-neutral strategies generate returns in flat markets
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
                    Ideal For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>HNI / UHNI with ≥ ₹10 lakh to deploy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Comfortable with equity market volatility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>3–5 year+ investment horizon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Looking for alpha beyond traditional mutual funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Portfolio diversifier / satellite allocation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    NOT Suitable If
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>You need capital protection or guaranteed returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Investment horizon is less than 2–3 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>You are a US / Canadian resident</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>You cannot tolerate NAV drawdowns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>You need immediate liquidity at all times</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Costs & Fees */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Costs & Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6 text-sm mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Investment Amounts</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Min Investment (Regular)</span>
                      <span className="font-medium text-foreground">₹10,00,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Min Investment (Accredited)</span>
                      <span className="font-medium text-foreground">₹1,00,000</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Expense Ratio</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Max TER — Regular Plan</span>
                      <span className="font-medium text-foreground">2.25% p.a.</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Max TER — Direct Plan</span>
                      <span className="font-medium text-foreground">2.20% p.a.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="font-bold text-green-600">NIL</p>
                  <p className="text-xs text-muted-foreground">Entry Load</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <p className="font-bold text-amber-600">0.50%</p>
                  <p className="text-xs text-muted-foreground">Exit Load (≤90 days)</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="font-bold text-green-600">NIL</p>
                  <p className="text-xs text-muted-foreground">Exit Load (&gt;90 days)</p>
                </div>
                <div className="text-center p-3 bg-secondary/50 rounded-lg">
                  <p className="font-bold text-foreground">0.005%</p>
                  <p className="text-xs text-muted-foreground">Stamp Duty</p>
                </div>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Redemption</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>Redemption Payout: T + 3 working days</li>
                    <li>IDCW Payout: Within 7 working days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Taxation</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>LTCG (&gt;12 months): 12.5% (Sec 112A)</li>
                    <li>STCG (&lt;12 months): Slab rate (normal tax)</li>
                  </ul>
                </div>
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
              <AccordionItem value="market">
                <AccordionTrigger>Market / Volatility Risk</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Equity prices can fall sharply. Your NAV will fluctuate with market movements.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="derivatives">
                <AccordionTrigger>Derivatives / Leverage Risk</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    The fund uses futures and options. Small market moves can amplify gains or losses.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="short">
                <AccordionTrigger>Short-Selling Risk</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    If a shorted stock rises, losses can mount quickly. Capped at 25% of net assets per SEBI.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="liquidity">
                <AccordionTrigger>Liquidity Risk</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Some holdings may be hard to exit quickly; redemption takes up to 3 working days.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credit">
                <AccordionTrigger>Credit Risk</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Debt instruments carry issuer default risk. Fund invests only up to 20% in debt.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="threshold">
                <AccordionTrigger>Minimum Threshold Risk</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    If your total SIF investment falls below ₹10L, AMC will notify you to rebalance within 30 days.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Performance Tracker - NFO so all N/A */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Performance Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-center">Fund Return</TableHead>
                    <TableHead className="text-center">Benchmark</TableHead>
                    <TableHead className="text-center">Alpha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["1 Month", "3 Months", "6 Months", "1 Year", "Since Inception"].map((period) => (
                    <TableRow key={period}>
                      <TableCell className="font-medium">{period}</TableCell>
                      <TableCell className="text-center text-muted-foreground">N/A (NFO)</TableCell>
                      <TableCell className="text-center text-muted-foreground">N/A</TableCell>
                      <TableCell className="text-center text-muted-foreground">N/A</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                Benchmark: NIFTY 50 Hybrid Composite Debt 50:50 Index (Total Return) · First NAV within 5 business days of allotment · Data as of: 06 Mar 2026
              </p>
            </CardContent>
          </Card>

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
                NIFTY 50 Hybrid Composite Debt 50:50 Index (Total Return)
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                A hybrid benchmark with 50% equity and 50% debt allocation.
              </p>
              <div className="flex gap-4 text-sm">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Fund Risk: Level 2
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Interval Fund
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto mb-12 p-4 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              For Professional Advisory Use Only · Not an Investment Recommendation · Read ISID in full before investing · © SIFPrime.com · SoHo Wealth
            </p>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-heading mb-4">Ready to Invest?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us to start investing in Apex Hybrid Long-Short Fund
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

export default ApexSif;
