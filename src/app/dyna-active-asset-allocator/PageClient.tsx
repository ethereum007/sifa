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



const DynaSifActiveAssetAllocator = () => {
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
                  NFO OPEN — MAR 6 to MAR 20, 2026
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  DynaSIF by 360 ONE Mutual Fund
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              DynaSIF Active Asset Allocator Long-Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              An interval investment strategy dynamically investing across equity, debt, 
              equity and debt derivatives, InVITs and commodity derivatives, including 
              limited short exposure through derivatives.
            </p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge className="bg-amber-100 text-amber-800 border-amber-300">Interval Fund</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-300">Risk Band Level 2</Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">Multi-Asset</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              by 360 ONE Asset Management Limited (formerly IIFL Asset Management)
            </p>
          </div>


          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
            <Card className="text-center p-4">
              <IndianRupee className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">₹10L</p>
              <p className="text-xs text-muted-foreground">Min Investment</p>
            </Card>
            <Card className="text-center p-4">
              <Percent className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">2.00%</p>
              <p className="text-xs text-muted-foreground">Max TER</p>
            </Card>
            <Card className="text-center p-4">
              <ArrowUpDown className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">0.50%</p>
              <p className="text-xs text-muted-foreground">Exit Load (≤3m)</p>
            </Card>
            <Card className="text-center p-4">
              <Target className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">Level 2</p>
              <p className="text-xs text-muted-foreground">Risk Band</p>
            </Card>
            <Card className="text-center p-4">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">T+3</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">Interval</p>
              <p className="text-xs text-muted-foreground">Fund Type</p>
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
                  <p className="font-semibold">March 6, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">March 20, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Re-opens</p>
                  <p className="font-semibold">March 30, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Price</p>
                  <p className="font-semibold">₹10 per unit</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-primary/10">
                <p className="text-xs text-muted-foreground">
                  <strong>Benchmark:</strong> 25% BSE SENSEX TRI + 60% CRISIL Short Term Bond Fund Index + 15% iCOMDEX Composite Index
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>SEBI Strategy Code:</strong> DYNA/I/H/AALS/25/12/0002/360O
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Multi-Asset Active Allocation Strategy
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-base text-blue-900">Equity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-800/80 mb-2">
                    Large & midcap bias, sector agnostic. Dynamic allocation based on macro conditions.
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">20–50%</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Banknote className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-base text-green-900">Debt & Money Market</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-green-800/80 mb-2">
                    T-bills, govt bonds, corporate bonds, CDs, CPs. Active duration calls.
                  </p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">20–65%</Badge>
                </CardContent>
              </Card>

              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <Layers className="w-5 h-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-base text-amber-900">Commodity Derivatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-800/80 mb-2">
                    Gold, silver, SEBI-permitted ETCDs. Options and futures strategies.
                  </p>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">0–25%</Badge>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardHeader className="pb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-base text-purple-900">InVITs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-800/80 mb-2">
                    Infrastructure Investment Trusts for dividend yield and asset growth.
                  </p>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">0–20%</Badge>
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
                    <TableHead className="hidden sm:table-cell">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Equity & Equity-Related</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="text-center">50%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Large & midcap bias; sector agnostic</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="text-center">65%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">T-bills, bonds, CDs, CPs. Active duration calls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-muted-foreground">— Short Exposure (Unhedged)</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Exchange-traded derivatives only; ~5% single stock</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Commodity Derivatives (ETCDs)</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Gold, silver, SEBI-permitted ETCDs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">InVITs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Operating assets, dividend yield</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hedging (Derivatives)</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">100%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Covered calls, protective puts, index hedges</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Overseas Securities / ETFs</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Up to USD 50M in overseas; USD 30M in ETFs</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Note:</strong> Cumulative gross exposure (equity + debt + derivatives + InVITs + commodities) must not exceed 100% of net assets. Securities Lending: up to 20% NAV; max 5% per single counterparty.
              </p>
            </CardContent>
          </Card>

          {/* Fund Managers */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Fund Management Team — Three-Specialist Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Equity Manager */}
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 mx-auto">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-center mb-1">Mr. Harsh Agarwal</h4>
                  <p className="text-xs text-primary text-center mb-3">Fund Manager — Equity</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                      <span>~20 years buy-side experience</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                      <span>Head of Alt Strategies at Tata AMC — peak AUM &gt;₹3,000 Cr</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                      <span>MBA (Symbiosis), CPM & CTM (ICFAI), NISM XIX-C</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Zap className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
                      <span>Long-short equity, Cat III AIF portfolio mgmt</span>
                    </li>
                  </ul>
                </div>

                {/* Debt Manager */}
                <div className="p-4 bg-green-50/50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 mx-auto">
                    <Banknote className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-center mb-1">Mr. Milan Mody</h4>
                  <p className="text-xs text-primary text-center mb-3">Fund Manager — Debt</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                      <span>20+ years fixed income experience</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                      <span>Previously at ITI AMC, Darashaw, Birla Sunlife</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                      <span>MBA Finance, B.Com</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Zap className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                      <span>Duration management, corporate bonds, money market</span>
                    </li>
                  </ul>
                </div>

                {/* Commodity Manager */}
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3 mx-auto">
                    <Layers className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-center mb-1">Mr. Rahul Khetawat</h4>
                  <p className="text-xs text-primary text-center mb-3">Fund Manager — Commodity</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                      <span>14+ years multi-asset experience</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                      <span>Previously at Edelweiss, Marwadi Share & Finance</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                      <span>PGDM, M.Com (Pre)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Zap className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
                      <span>ETCDs (gold, silver), forex, risk management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Derivative Strategies */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Short & Derivative Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Exchange-traded equity/debt derivatives only (SEBI circular Feb 27, 2025). Single stock short ~5% limit; sector ~20%.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Covered Calls</TableCell>
                    <TableCell className="text-muted-foreground">Yield enhancement on existing equity positions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Protective Puts</TableCell>
                    <TableCell className="text-muted-foreground">Downside protection for equity portfolio</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Index Hedges</TableCell>
                    <TableCell className="text-muted-foreground">Broad market risk reduction via Nifty/Bank Nifty</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sector Long-Short</TableCell>
                    <TableCell className="text-muted-foreground">Relative value trades across sectors</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pairs Trading</TableCell>
                    <TableCell className="text-muted-foreground">Market-neutral strategies on correlated stocks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Merger Arbitrage</TableCell>
                    <TableCell className="text-muted-foreground">Event-driven positioning in corporate actions</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <Shield className="w-6 h-6 inline mr-2 text-primary" />
              Risk Assessment Matrix
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="text-center p-4 border-amber-200">
                <p className="text-sm font-semibold text-amber-700">MEDIUM-HIGH</p>
                <p className="text-xs text-muted-foreground mt-1">Market Risk</p>
              </Card>
              <Card className="text-center p-4 border-red-200">
                <p className="text-sm font-semibold text-red-700">HIGH</p>
                <p className="text-xs text-muted-foreground mt-1">Derivatives Risk</p>
              </Card>
              <Card className="text-center p-4 border-amber-200">
                <p className="text-sm font-semibold text-amber-700">MEDIUM</p>
                <p className="text-xs text-muted-foreground mt-1">Liquidity Risk</p>
              </Card>
              <Card className="text-center p-4 border-amber-200">
                <p className="text-sm font-semibold text-amber-600">HIGH</p>
                <p className="text-xs text-muted-foreground mt-1">Commodity Risk</p>
              </Card>
              <Card className="text-center p-4 border-amber-200">
                <p className="text-sm font-semibold text-amber-700">MEDIUM</p>
                <p className="text-xs text-muted-foreground mt-1">Credit Risk</p>
              </Card>
              <Card className="text-center p-4 border-yellow-200">
                <p className="text-sm font-semibold text-yellow-700">LOW–MED</p>
                <p className="text-xs text-muted-foreground mt-1">Currency Risk</p>
              </Card>
            </div>
          </div>

          {/* Risk Factors Accordion */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <AlertTriangle className="w-6 h-6 inline mr-2 text-amber-500" />
              Key Risk Factors
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="market-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Market / Volatility Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Equity allocation (20–50%) means NAV fluctuates daily. The strategy is sector-agnostic and uses multi-asset allocation to reduce overall market sensitivity versus pure equity funds. Risk Band Level 2 reflects the hybrid/defensive orientation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="derivatives-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Derivatives / Leverage Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Futures, options, commodity derivatives, CDS, and IRS are used. Even a small market move can amplify gains OR losses disproportionately. Cumulative gross exposure is capped at 100% of net assets; unhedged shorts capped at 25%.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="commodity-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Commodity Derivatives Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  ETCD positions (gold, silver, other commodities) introduce higher volatility risks, liquidity/spread risks, and delivery risk if futures positions are held to maturity (physical settlement). The fund has specific disposal timelines for physical holdings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="liquidity-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Liquidity / Interval Structure Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  This is an <strong>INTERVAL fund</strong> — redemptions only on Mondays during Specified Transaction Periods. No daily liquidity unlike open-ended SIFs. Units are listed on NSE for secondary market exit but trading liquidity is not guaranteed. 7-day notice period required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credit-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Credit Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Debt and money market instruments (20–65% of portfolio) carry issuer default risk. AT1/AT2 bonds capped at 10% of debt portfolio. Structured Obligation / Credit Enhancement rated securities carry additional complexity and liquidity risks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="threshold-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">₹10 Lakh Minimum Threshold Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  If total DynaSIF investment across strategies falls below ₹10 lakh at PAN level (unless SEBI Accredited Investor), the full holding will be redeemed automatically. In a market crash, you could be force-liquidated at the worst possible time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="overseas-risk" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">Overseas / Currency Risk</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  Up to 20% of net assets can be invested overseas. Rupee depreciation benefits; appreciation hurts returns. Investment paused if SEBI/RBI overseas limits are exhausted at AMC or industry level.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Cost Structure */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                Cost Structure & Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2.00%</p>
                  <p className="text-muted-foreground">Max TER (Regular)</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">NIL</p>
                  <p className="text-muted-foreground">Entry Load</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">0.50%</p>
                  <p className="text-muted-foreground">Exit Load (≤3 months)</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">0.005%</p>
                  <p className="text-muted-foreground">Stamp Duty</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SIP (min)</TableCell>
                    <TableCell className="text-muted-foreground">₹20,000/month; min 6 months (monthly) or ₹50,000/quarter</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">STP (min)</TableCell>
                    <TableCell className="text-muted-foreground">₹20,000/month; min 6 months. Inter-DynaSIF strategy only.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">SWP</TableCell>
                    <TableCell className="text-muted-foreground">Not allowed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Redemption Payout</TableCell>
                    <TableCell className="text-muted-foreground">Within 3 working days from end of Notice Period</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IDCW Payout</TableCell>
                    <TableCell className="text-muted-foreground">Within 7 working days from record date</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Notice Period</TableCell>
                    <TableCell className="text-muted-foreground">7 working days before next Monday redemption</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Tax Treatment */}
          <Card className="max-w-4xl mx-auto mb-12 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <FileText className="w-5 h-5" />
                Tax Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                    <TableCell className="font-medium">&gt; 12 months (LTCG)</TableCell>
                    <TableCell className="text-center font-semibold">12.5%</TableCell>
                    <TableCell className="text-muted-foreground">Section 112A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">&lt; 12 months (STCG)</TableCell>
                    <TableCell className="text-center font-semibold">20%</TableCell>
                    <TableCell className="text-muted-foreground">Section 111A</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IDCW (Dividend)</TableCell>
                    <TableCell className="text-center font-semibold">Slab Rate</TableCell>
                    <TableCell className="text-muted-foreground">Taxable at income slab rates; 10% TDS above ₹5,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                Rates subject to surcharge and 4% health & education cess. Non-residents may be taxed at different rates. Consult your tax advisor.
              </p>
            </CardContent>
          </Card>

          {/* Redemption Mechanics */}
          <Card className="max-w-4xl mx-auto mb-12 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <RefreshCw className="w-5 h-5" />
                Redemption & Interval Mechanics — Key Constraint
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-1">Interval Fund — NOT Open-Ended</p>
                    <p className="text-red-700">
                      Redemptions are only allowed on Mondays during Specified Transaction Periods, 
                      with a mandatory 7-day advance notice. This is a significant constraint vs open-ended 
                      SIF peers. Units are listed on NSE for secondary market exit but trading liquidity is not guaranteed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Subscription</p>
                  <p className="font-semibold text-lg">Daily</p>
                  <p className="text-xs text-muted-foreground">Business days only</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Redemption</p>
                  <p className="font-semibold text-lg text-amber-600">Mondays Only</p>
                  <p className="text-xs text-muted-foreground">7-day notice required</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payout</p>
                  <p className="font-semibold text-lg">T+3 Days</p>
                  <p className="text-xs text-muted-foreground">From end of notice period</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Secondary Exit</p>
                  <p className="font-semibold text-lg">NSE Listed</p>
                  <p className="text-xs text-muted-foreground">Liquidity not guaranteed</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                      <span>HNI / UHNI investors with ₹10 lakh+ to deploy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Seeking multi-asset diversification (equity + debt + commodities) in one strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Comfortable with interval fund structure (weekly Monday redemption)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>3–5 year+ investment horizon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Want lower volatility than pure equity via active cross-asset allocation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>SEBI Accredited Investors eligible at ₹1 lakh minimum</span>
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
                      <span>You need daily liquidity — redemptions only on Mondays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>You need capital protection or guaranteed returns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Commodity derivative exposure makes you uncomfortable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Short investment horizon (less than 2–3 years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>US / Canadian residents (regulatory restrictions apply)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Cannot tolerate NAV drawdowns from derivative positions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Strengths & Concerns */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Investment Thesis
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700">Key Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Risk Band Level 2 — among the lowest risk SIFs; suitable for conservative HNI portfolios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>True multi-asset mandate: equity + debt + commodity derivatives — no comparable SIF peer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Specialist three-manager structure with complementary expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Mr. Agarwal's Cat III AIF pedigree from Tata AMC (₹3,000 Cr peak AUM)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>2.00% TER ceiling — slightly below pure equity long-short SIF peers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Accredited investor entry at ₹1 lakh broadens the addressable client base</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-700">Key Risks / Concerns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>No track record: brand-new strategy with zero performance history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>Interval fund structure — weekly Monday redemption with 7-day notice is a major constraint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>Commodity derivatives complexity adds new dimension of execution risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>Three-manager coordination risk: no DynaSIF platform track record exists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <span>₹10 lakh minimum threshold risk — forced redemption if value dips below</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>


          {/* FAQs */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="faq-1" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  How is this different from DynaSIF Equity Long-Short Fund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The Active Asset Allocator is a multi-asset strategy investing across equity (20-50%), debt (20-65%), 
                  commodity derivatives (0-25%), and InVITs (0-20%), whereas the Equity Long-Short Fund is predominantly 
                  equity-focused (80-100%). This fund has Risk Band Level 2 (lower risk) vs Level 5 for the equity strategy. 
                  It's also an interval fund (Monday redemptions) vs the open-ended equity fund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Why is this an interval fund and what does that mean?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Redemptions are only allowed on Mondays with a 7-working-day advance notice. This means you cannot 
                  exit on demand like a regular mutual fund. The interval structure exists because the fund invests in 
                  less liquid assets (commodity derivatives, InVITs) that need time to unwind. Units are listed on NSE 
                  for secondary market exit, but trading liquidity is not guaranteed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What commodities does this fund invest in?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The fund invests in Exchange Traded Commodity Derivatives (ETCDs) including gold, silver, and other 
                  SEBI-permitted commodities, up to 25% of NAV. It uses both options and futures strategies. Physical 
                  delivery disposal rules apply if positions are held to maturity. Max 10% of NAV in any single commodity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Can accredited investors invest at ₹1 lakh?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, SEBI Accredited Investors are eligible at ₹1,00,000 (₹1 lakh) minimum instead of the standard 
                  ₹10 lakh threshold. This provides an efficient pilot exposure route for qualified investors who want 
                  to test the strategy before committing larger amounts.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What happens if my investment falls below ₹10 lakh?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  If investor-initiated, the full holding is redeemed automatically. If due to NAV decline (passive breach), 
                  the investor may only redeem the full amount — no forced rebalancing is triggered. However, this is at PAN level 
                  across all DynaSIF strategies. The threshold doesn't apply to SEBI Accredited Investors who entered at ₹1 lakh.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Is SIP available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  SIP is available at ₹20,000/month (min 6 months) or ₹50,000/quarter — but only after crossing 
                  the ₹10 lakh threshold via lump-sum investment first. STP is only allowed between DynaSIF investment 
                  strategies — no STP from MF to SIF or vice versa. SWP is not allowed.
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
                <h3 className="text-2xl font-semibold mb-4">Interested in DynaSIF Active Asset Allocator?</h3>
                <p className="text-muted-foreground mb-6">
                  NFO closes March 20, 2026. Contact our team for detailed investment guidance and documentation.
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

export default DynaSifActiveAssetAllocator;
