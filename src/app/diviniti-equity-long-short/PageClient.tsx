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
  TrendingUpIcon
} from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import AmcLogo from "@/components/AmcLogo";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChart";
import MonthlyHeatmap from "@/components/MonthlyHeatmap";
import { getSifBySlug } from "@/lib/sifData";



const DivinitiSif = () => {
  const fundData = getSifBySlug('diviniti-equity-long-short');
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
              <AmcLogo amc="ITI Mutual Fund" size="md" />
              <div className="text-left">
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
                  NOW OPEN
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Diviniti SIF by ITI
                </h1>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-4">
              Diviniti Equity Long Short Fund
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              A high-conviction equity long-short fund with 80-100% equity exposure, 
              up to 25% short derivatives, and daily liquidity for aggressive growth investors.
            </p>
            <p className="text-sm text-muted-foreground">
              by ITI Asset Management Limited
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
                  <p className="font-semibold">November 10, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">November 24, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Price</p>
                  <p className="font-semibold">₹1,000 per unit</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reopening</p>
                  <p className="font-semibold">Within 5 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Overview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              Pure Equity Long-Short Strategy
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
                    Core equity positions across market caps with bottom-up stock selection for capital appreciation.
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
                    Naked short exposure through derivatives for alpha generation and tactical positioning.
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
                    Minimal debt allocation for liquidity management and tactical cash positioning.
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
                    <TableHead>Asset Class</TableHead>
                    <TableHead className="text-center">Min %</TableHead>
                    <TableHead className="text-center">Max %</TableHead>
                    <TableHead className="hidden sm:table-cell">Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Equity & Equity Related</TableCell>
                    <TableCell className="text-center">80%</TableCell>
                    <TableCell className="text-center">100%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Capital appreciation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="pl-6 text-muted-foreground">— Unhedged Short Exposure</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">25%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Alpha & tactical shorts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Debt & Money Market</TableCell>
                    <TableCell className="text-center">0%</TableCell>
                    <TableCell className="text-center">20%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Liquidity management</TableCell>
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
                    <TableCell className="text-center">35%</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">Global diversification</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-xs text-muted-foreground mt-4">
                <strong>Note:</strong> Derivatives exposure up to 100% of net assets. NFO limit: US $50M (securities) + US $20M (ETFs) for overseas.
              </p>
            </CardContent>
          </Card>

          {/* Investment Limits */}
          <Card className="max-w-4xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Investment Limits & Exposures
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
                      <TableCell>Total Derivatives Exposure</TableCell>
                      <TableCell className="text-right">Up to 100% of net assets</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Naked Derivatives (Shorts)</TableCell>
                      <TableCell className="text-right">Up to 25% of net assets</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Securities Lending</TableCell>
                      <TableCell className="text-right">Up to 25% (max 5% to single intermediary)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Securitized Debt</TableCell>
                      <TableCell className="text-right">Up to 20% of debt portfolio</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AT1/AT2 Bonds</TableCell>
                      <TableCell className="text-right">Up to 10% of net assets</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Credit Default Swaps</TableCell>
                      <TableCell className="text-right">Up to 10% of AUM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Short-term Bank Deposits</TableCell>
                      <TableCell className="text-right">Up to 15% (20% with Trustee approval)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MF Units Investment</TableCell>
                      <TableCell className="text-right">Up to 5% of net assets</TableCell>
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
                Investment Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Stock Selection</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Bottom-up stock selection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>No market cap or sector bias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Robust business models focus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Sustainable competitive advantages</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Portfolio Construction</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Active management with dynamic allocation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>IPOs and primary market participation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Fundamental appreciation potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>Credit quality guided debt investments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Scenarios */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-semibold text-heading text-center mb-6">
              <BarChart3 className="w-6 h-6 inline mr-2 text-primary" />
              Performance Scenarios
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
                      <span className="text-muted-foreground">Long Equity (80-100%)</span>
                      <span className="text-green-600 font-medium">+18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions</span>
                      <span className="text-green-600 font-medium">+5% (closed early)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overseas</span>
                      <span className="text-green-600 font-medium">+3%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Potential: ~20-22% before TER
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
                      <span className="text-muted-foreground">Long Equity</span>
                      <span className="text-red-600 font-medium">-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Short Positions (25%)</span>
                      <span className="text-green-600 font-medium">+2.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overseas</span>
                      <span className="text-red-600 font-medium">-15%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Potential: -22% to -25% (high risk)
                  </p>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-transparent">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-amber-600" />
                    <CardTitle className="text-lg text-amber-800">Normal Market</CardTitle>
                  </div>
                  <p className="text-sm text-amber-700">Nifty +10%</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Long Equity</span>
                      <span className="text-green-600 font-medium">+10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shorts</span>
                      <span className="text-muted-foreground font-medium">0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overseas</span>
                      <span className="text-green-600 font-medium">+2%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                    Potential: ~10-11% before TER
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
                      <span>HNIs with ₹1Cr+ portfolios (5-10% allocation)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Aggressive equity investors with high risk tolerance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Sophisticated investors understanding derivatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>Those seeking Nifty 50+ returns potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                      <span>5-7 year+ investment horizon</span>
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
                      <span>Retail investors with &lt;₹25L portfolio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Risk-averse or conservative investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>First-time mutual fund investors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                      <span>Those needing capital preservation</span>
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
                      <span>Additional Purchase</span>
                      <span className="font-medium text-foreground">₹25,000</span>
                    </li>
                    <li className="flex justify-between">
                      <span>SIP Minimum</span>
                      <span className="font-medium text-foreground">₹5,000/installment</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Redemption Minimum</span>
                      <span className="font-medium text-foreground">₹25,000</span>
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
                      Aggregate across ALL Diviniti SIF strategies (does NOT include regular ITI MF schemes).
                      Active breach = units frozen for 30 days, then auto-redeemed if not rebalanced.
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
                  <p className="text-xs text-muted-foreground">Best-in-class liquidity</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Notice Period</p>
                  <p className="font-semibold text-lg text-green-600">None</p>
                  <p className="text-xs text-muted-foreground">No waiting</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payout</p>
                  <p className="font-semibold text-lg">T+3 Days</p>
                  <p className="text-xs text-muted-foreground">Working days</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm text-green-800">Superior Liquidity vs Interval Funds</h4>
                <p className="text-xs text-green-700">
                  Total exit time: <strong>3 days</strong> (vs 18 days for interval SIFs like Arudha). 
                  Daily redemption with no notice period provides maximum flexibility.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Load & Fee Structure */}
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
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">0.50%</p>
                  <p className="text-muted-foreground">Exit Load (&lt;6 months)</p>
                  <p className="text-xs text-amber-700 mt-1">10% units exempt</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">2.25%</p>
                  <p className="text-muted-foreground">Max TER</p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Exit Load Details:</strong> 10% of units can be redeemed without exit load in first 6 months. 0.50% on remaining units if redeemed within 6 months. NIL after 6 months. FIFO basis.</p>
                <p><strong>Brokerage:</strong> Cash market up to 12 bps | Derivatives up to 5 bps (plus GST)</p>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Vasav Sahgal</p>
                    <p className="text-sm text-muted-foreground">Primary Fund Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Rajesh Bhatia</p>
                    <p className="text-sm text-muted-foreground">Overseas Investment</p>
                  </div>
                </div>
              </div>
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
                Nifty 50 (TRI) Index
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Total Return Index of India's top 50 large-cap companies, reflecting capital appreciation plus dividend reinvestment.
              </p>
              <div className="flex gap-4 text-sm">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Fund Risk: Level 5
                </Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Benchmark Risk: Level 5
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Both fund and benchmark at highest risk level - suitable for aggressive investors only.
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
                <AccordionTrigger>Equity Risks (80-100% Exposure)</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Price Volatility:</strong> High exposure to market fluctuations from micro/macro factors</li>
                    <li><strong>Liquidity Constraints:</strong> Smaller cap stocks may have limited liquidity</li>
                    <li><strong>Settlement Delays:</strong> Transfer and settlement issues possible</li>
                    <li><strong>Concentration Risk:</strong> Potential overexposure to few securities/sectors</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="derivative-risks">
                <AccordionTrigger>Derivative Risks (Up to 100% Exposure)</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Leverage Risk:</strong> Disproportionate gains AND losses possible</li>
                    <li><strong>Execution Risk:</strong> Depends heavily on fund manager skill</li>
                    <li><strong>25% Naked Shorts:</strong> Theoretically unlimited loss potential</li>
                    <li><strong>Different/Greater Risks:</strong> Than direct securities investment</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="overseas-risks">
                <AccordionTrigger>Overseas Investment Risks (Up to 35%)</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Currency Fluctuations:</strong> Exchange rate impact on returns</li>
                    <li><strong>Foreign Market Volatility:</strong> Different market dynamics</li>
                    <li><strong>Repatriation Challenges:</strong> Potential delays in fund movement</li>
                    <li><strong>Regulatory Differences:</strong> Different rules in foreign markets</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="other-risks">
                <AccordionTrigger>Other Risks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Interest Rate Risk:</strong> Affects debt portion (0-20%)</li>
                    <li><strong>Credit/Default Risk:</strong> Issuer may default on obligations</li>
                    <li><strong>REITs/InvITs:</strong> Liquidity, reinvestment, price, interest rate risks</li>
                    <li><strong>Threshold Breach:</strong> Units frozen if below ₹10L, forced redemption possible</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Comparison Table */}
          <Card className="max-w-4xl mx-auto mb-12 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Scale className="w-5 h-5" />
                Diviniti vs Hybrid Funds Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead className="text-center">Diviniti Equity L-S</TableHead>
                    <TableHead className="text-center">Hybrid L-S Funds</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Equity Allocation</TableCell>
                    <TableCell className="text-center font-medium">80-100%</TableCell>
                    <TableCell className="text-center">35-75%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Debt Allocation</TableCell>
                    <TableCell className="text-center">0-20%</TableCell>
                    <TableCell className="text-center font-medium">25-65%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Risk Level</TableCell>
                    <TableCell className="text-center text-red-600 font-medium">Level 5 (Highest)</TableCell>
                    <TableCell className="text-center text-amber-600">Level 2-3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Redemption</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Daily</TableCell>
                    <TableCell className="text-center">2x weekly to Monthly</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Downside Cushion</TableCell>
                    <TableCell className="text-center text-red-600">Minimal</TableCell>
                    <TableCell className="text-center text-green-600 font-medium">Significant (debt)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Analysis Components */}
          {fundData && (
            <div className="max-w-4xl mx-auto space-y-8 mb-12">
              <CrashAnalysis fund={fundData} />
              <NavJourneyChart funds={[fundData]} showNifty={true} />
              <MonthlyHeatmap funds={[fundData]} showNifty={true} mode="single" />
            </div>
          )}

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-heading mb-4">Ready to Invest?</h3>
            <p className="text-muted-foreground mb-6">
              Contact us to start investing in Diviniti Equity Long Short Fund
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
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="diviniti-equity-long-short" fundName="Diviniti SIF by ITI" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DivinitiSif;
