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
  RefreshCw,
  TrendingUpIcon,
  Activity
} from "lucide-react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

import bandhanLogo from "@/assets/logos/bandhan-mutual-fund.png";



const ArudhaSif = () => {
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
              <img 
                src={bandhanLogo as unknown as string} 
                alt="Bandhan Mutual Fund" 
                className="w-16 h-16 object-contain rounded-xl bg-white p-2 shadow-md"
              />
              <div className="text-left">
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
                  NOW OPEN
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Arudha SIF by Bandhan
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Arudha Hybrid Long-Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              A sophisticated hybrid long-short interval fund with balanced equity-debt allocation, 
              extensive derivative strategies, and up to 25% short exposure for market-neutral returns.
            </p>
            <p className="text-sm text-muted-foreground">
              by Bandhan AMC Limited
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
              <p className="text-2xl font-bold text-heading">Level 2</p>
              <p className="text-xs text-muted-foreground">Risk Band</p>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2x/Week</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-heading">2.00%</p>
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
                  <p className="font-semibold">January 09, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">January 22, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Price</p>
                  <p className="font-semibold">₹10 per unit</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Re-opening Date</p>
                  <p className="font-semibold">February 04, 2026</p>
                </div>
              </div>
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
                    <TableHead className="hidden sm:table-cell">Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">35%</TableCell>
                    <TableCell className="text-center">65%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Stability & accrual income</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Equity & Equity Related</TableCell>
                    <TableCell className="text-center">35%</TableCell>
                    <TableCell className="text-center">65%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Capital appreciation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">InvITs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Diversification & yield</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Short Exposure (Derivatives)</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Downside protection & alpha</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Overseas Securities</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">50%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Global diversification</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Note:</strong> No investment in unrated debt or commodity derivatives. Up to $25M in overseas securities and $25M in overseas ETFs.
              </p>
            </CardContent>
          </Card>

          {/* Derivative Strategies */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <Layers className="w-6 h-6 inline mr-2 text-primary" />
              Extensive Derivative Toolkit (23+ Strategies)
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
                    <li>• Synthetic Positions</li>
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
                    Well-Suited For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Investors seeking market-neutral returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Those with ₹10 lakh+ investable surplus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Investors comfortable with limited liquidity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Those seeking downside participation through shorts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Minimum 3-5 year investment horizon</span>
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
                      <span>Retail investors with &lt;₹10 lakh corpus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Those needing regular/daily liquidity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Investors uncomfortable with derivative complexity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Those seeking pure equity or debt exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Short-term investors (&lt;3 years)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

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
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Post-NFO (Continuous)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Additional Purchase</span>
                      <span className="font-medium text-foreground">₹10,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>SIP/SWP/STP</span>
                      <span className="font-medium text-foreground">₹10,000 (min 6 installments)</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 mb-1">₹10 Lakh Threshold Requirement</p>
                    <p className="text-amber-700">
                      Aggregate across all Arudha SIF strategies at PAN level (does NOT include Bandhan MF schemes).
                      Active breach leads to 30-day notice, then automatic redemption if not rebalanced.
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
                  <p className="text-xs text-muted-foreground">On business days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Redemption Days</p>
                  <p className="font-semibold text-lg">Mon & Thu</p>
                  <p className="text-xs text-muted-foreground">Twice weekly</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Notice Period</p>
                  <p className="font-semibold text-lg">Up to 15 days</p>
                  <p className="text-xs text-muted-foreground">Working days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payout</p>
                  <p className="font-semibold text-lg">T+3 Days</p>
                  <p className="text-xs text-muted-foreground">15% p.a. interest for delays</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Redemption Windows</h4>
                <div className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div>
                    <p><strong>Thursday 3 PM to Monday 3 PM</strong></p>
                    <p>→ Monday NAV applied</p>
                  </div>
                  <div>
                    <p><strong>Monday 3 PM to Thursday 3 PM</strong></p>
                    <p>→ Thursday NAV applied</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Load Structure */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Fee & Load Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-6 text-sm mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">NIL</p>
                  <p className="text-muted-foreground">Entry Load</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">NIL</p>
                  <p className="text-muted-foreground">Exit Load</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2.00%</p>
                  <p className="text-muted-foreground">Max TER</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p><strong>Brokerage:</strong> Cash Market up to 0.12% | Derivatives up to 0.05% (plus GST)</p>
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
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Kapil Kankonkar", role: "Fund Manager" },
                  { name: "Brijesh Shah", role: "Fund Manager" },
                  { name: "Debraj Lahiri", role: "Fund Manager" },
                  { name: "Nilesh Saha", role: "Fund Manager" }
                ].map((manager) => (
                  <div key={manager.name} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{manager.name}</p>
                      <p className="text-xs text-muted-foreground">{manager.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Four-person collaborative management team for comprehensive strategy execution.
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
                CRISIL Hybrid 85+15 Conservative Index
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                A conservative hybrid benchmark with 85% debt and 15% equity allocation.
              </p>
              <div className="flex gap-4 text-sm">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Fund Risk: Level 2
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Benchmark Risk: Level 3
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Fund has lower risk classification than its benchmark.
              </p>
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
                <AccordionTrigger>Equity Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Price Volatility:</strong> Market fluctuations affect equity values</li>
                    <li><strong>Liquidity Constraints:</strong> Smaller cap stocks may have limited liquidity</li>
                    <li><strong>Settlement Delays:</strong> Transfer and settlement issues possible</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="debt-risks">
                <AccordionTrigger>Debt & Fixed Income Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Interest Rate Risk:</strong> Price falls when interest rates rise</li>
                    <li><strong>Credit/Default Risk:</strong> Issuer may default on obligations</li>
                    <li><strong>Reinvestment Risk:</strong> Rates may differ at reinvestment time</li>
                    <li><strong>Zero Coupon Bond Risks:</strong> Higher price sensitivity to rate changes</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="derivative-risks">
                <AccordionTrigger>Derivative Strategy Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Counterparty Risk:</strong> Other party may fail to honor contract</li>
                    <li><strong>Basis Risk:</strong> Hedge may not perfectly track underlying</li>
                    <li><strong>Leverage Risk:</strong> Amplified gains and losses</li>
                    <li><strong>Complexity Risk:</strong> 23+ strategies require sophisticated management</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="short-risks">
                <AccordionTrigger>Short Exposure Risks (25%)</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Unlimited Loss Potential:</strong> Theoretically unlimited losses on shorts</li>
                    <li><strong>Wrong Direction:</strong> Markets moving against short positions</li>
                    <li><strong>Active Management Required:</strong> Continuous monitoring needed</li>
                    <li><strong>Margin Requirements:</strong> May require additional capital</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="overseas-risks">
                <AccordionTrigger>Overseas Investment Risks (50%)</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Currency Risk:</strong> Exchange rate fluctuations</li>
                    <li><strong>Regulatory Risk:</strong> Foreign government policy changes</li>
                    <li><strong>Liquidity Risk:</strong> May be harder to exit foreign positions</li>
                    <li><strong>Industry Limit:</strong> Subject to $7B industry-wide constraint</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Liquidity Comparison */}
          <Card className="max-w-4xl mx-auto mb-12 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <Clock className="w-5 h-5" />
                Liquidity Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead className="text-center">Arudha Hybrid L-S</TableHead>
                    <TableHead className="text-center">Open-Ended Hybrid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Subscription</TableCell>
                    <TableCell className="text-center">Daily</TableCell>
                    <TableCell className="text-center">Daily</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Redemption</TableCell>
                    <TableCell className="text-center text-amber-600">2x weekly</TableCell>
                    <TableCell className="text-center text-green-600">Daily</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Notice Period</TableCell>
                    <TableCell className="text-center text-amber-600">Up to 15 days</TableCell>
                    <TableCell className="text-center text-green-600">None</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payout</TableCell>
                    <TableCell className="text-center">T+3</TableCell>
                    <TableCell className="text-center">T+3</TableCell>
                  </TableRow>
                  <TableRow className="font-semibold">
                    <TableCell>Total Exit Time</TableCell>
                    <TableCell className="text-center text-amber-600">Up to 18 days</TableCell>
                    <TableCell className="text-center text-green-600">3 days</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-heading mb-4">Ready to Invest?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us to start investing in Arudha Hybrid Long-Short Fund
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

export default ArudhaSif;
