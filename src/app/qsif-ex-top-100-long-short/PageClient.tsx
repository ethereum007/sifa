"use client";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Target, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Percent,
  BarChart3,
  Scale,
  Wallet,
  Zap
} from "lucide-react";
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

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChart";
import MonthlyHeatmap from "@/components/MonthlyHeatmap";
import { getSifBySlug } from "@/lib/sifData";



const QsifExTop100Sif = () => {
  const fundData = getSifBySlug('qsif-ex-top-100');
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>
      
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <AmcLogo amc="Quant Mutual Fund" size="md" />
              <div>
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
                  EQUITY EX-TOP 100 LONG-SHORT
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-heading">
                  qSIF Equity Ex-Top 100 Long-Short Fund
                </h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              An open-ended equity investment strategy by Quant Mutual Fund focusing on stocks <strong>outside the top 100 by market capitalization</strong> (mid & small caps) with limited short exposure through derivatives.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                NFO: Coming Soon
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                ₹10 per unit
              </Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                Min Investment: ₹10 Lakh
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                Mid & Small Cap Focus
              </Badge>
            </div>
          </div>

          {/* Key Differentiator */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">What Makes This Fund Unique?</h3>
                    <p className="text-muted-foreground">
                      Unlike the regular qSIF Equity Long-Short Fund that invests across all market caps, this fund <strong>mandates 65-100% allocation in stocks outside the top 100 companies</strong> by market capitalization. This provides focused exposure to mid-cap and small-cap growth opportunities with long-short strategies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">65-100%</div>
              <div className="text-sm text-muted-foreground">Ex-Top 100 Stocks</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">0-35%</div>
              <div className="text-sm text-muted-foreground">Top 100 Stocks</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">Up to 25%</div>
              <div className="text-sm text-muted-foreground">Short Exposure</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">2.25%</div>
              <div className="text-sm text-muted-foreground">Max TER</div>
            </Card>
          </div>

          {/* Fund Overview */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Fund Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Fund House</p>
                      <p className="font-medium">quant Mutual Fund</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">AMC</p>
                      <p className="font-medium">quant Money Managers Limited</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trustee</p>
                      <p className="font-medium">quant Capital Trustee Limited</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fund Type</p>
                      <p className="font-medium">Open-ended Equity Investment Strategy (SIF)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Benchmark</p>
                      <p className="font-medium">NIFTY 500 Total Return Index (TRI)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <p className="font-medium text-amber-600">Level 5 (Very High Risk)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NFO Price</p>
                      <p className="font-medium">₹10 per unit</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reopening</p>
                      <p className="font-medium">Within 5 business days from allotment</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Objective */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Investment Objective
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  To generate <strong>long-term capital appreciation</strong> by investing primarily in equity and equity-related instruments of <strong>stocks outside the top 100 by market capitalization</strong>, while utilizing <strong>limited short exposure through derivatives</strong> to enhance returns and manage risk.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Asset Allocation */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Asset Allocation Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instrument</TableHead>
                      <TableHead className="text-center">Minimum</TableHead>
                      <TableHead className="text-center">Maximum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-primary/5">
                      <TableCell className="font-medium">
                        Equity (Ex-Top 100 companies by market cap)
                        <span className="block text-xs text-muted-foreground">Mid-cap & Small-cap focus</span>
                      </TableCell>
                      <TableCell className="text-center font-semibold text-primary">65%</TableCell>
                      <TableCell className="text-center font-semibold text-primary">100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Equity (Top 100 companies by market cap)
                        <span className="block text-xs text-muted-foreground">Large-cap allowance</span>
                      </TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">35%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Debt & Money Market instruments</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">35%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">REITs / InvITs</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Unhedged Short Positions (Derivatives)</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Long Derivatives (Non-hedging)</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">50%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Fund Managers */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Fund Management Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Sandeep Tandon</h4>
                    <p className="text-sm text-primary mb-2">Founder & CIO (Primary)</p>
                    <p className="text-sm text-muted-foreground">
                      33+ years in capital markets. Led proprietary trading at Quant Broking with $1B+ daily turnover. 10 years with no yearly or quarterly losses at aggregate level.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Lokesh Garg</h4>
                    <p className="text-sm text-primary mb-2">MBA - IIM Ahmedabad</p>
                    <p className="text-sm text-muted-foreground">
                      20 years in equity markets. Former Executive Director at UBS India. Expertise in generating fundamental long-short ideas across market caps.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Ankit Pande</h4>
                    <p className="text-sm text-primary mb-2">CFA Charterholder, MBA - CUHK</p>
                    <p className="text-sm text-muted-foreground">
                      14+ years in equities. Thomson Reuters StarMine Award winner. Expertise in derivative strategies for enhanced returns.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Sameer Kate</h4>
                    <p className="text-sm text-primary mb-2">MBA, Derivatives Specialist</p>
                    <p className="text-sm text-muted-foreground">
                      20+ years in derivatives dealing. Former Sr. Sales Trader at Investec Capital. Expert in equity and derivatives execution.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Derivative Strategies */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Portfolio Construction Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The fund uses various strategies for portfolio construction and rebalancing:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Unhedged Long-Only</p>
                    <p className="text-xs text-muted-foreground">Pure long exposure to mid & small caps</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Partially-Hedged Long</p>
                    <p className="text-xs text-muted-foreground">Using index/stock futures or options</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Fully-Hedged Portfolio</p>
                    <p className="text-xs text-muted-foreground">Complete hedging using derivatives</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">Long-Short with 25% Naked Shorts</p>
                    <p className="text-xs text-muted-foreground">Using stock futures or options</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Details */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  Investment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Investment (NFO)</p>
                      <p className="font-medium">₹10,00,000 (₹10 Lakh)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accredited Investor Minimum</p>
                      <p className="font-medium">₹1,00,000 (₹1 Lakh)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Additional Purchase</p>
                      <p className="font-medium">₹10,000 minimum</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Minimum Redemption</p>
                      <p className="font-medium">₹1,000</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">SIP Minimum</p>
                      <p className="font-medium">₹10,000 (min 6 installments)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Subscription Frequency</p>
                      <p className="font-medium text-green-600">Daily (all business days)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Redemption Frequency</p>
                      <p className="font-medium text-green-600">Daily (all business days)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Redemption Payout</p>
                      <p className="font-medium">Within 3 working days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Load Structure */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  Load Structure & Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Exit Load</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-secondary rounded">
                        <span>Within 15 days</span>
                        <span className="font-medium text-red-600">1%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary rounded">
                        <span>After 15 days</span>
                        <span className="font-medium text-green-600">Nil</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Total Expense Ratio</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-secondary rounded">
                        <span>Maximum TER</span>
                        <span className="font-medium">2.25%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary rounded">
                        <span>Additional Expenses</span>
                        <span className="font-medium">Up to 0.05%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary rounded">
                        <span>B30 Cities Incentive</span>
                        <span className="font-medium">Up to 0.30%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Mid & Small Cap Focus:</strong> 65-100% in stocks outside top 100 for higher growth potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Open-Ended Structure:</strong> Daily subscription and redemption on all business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Short Exit Load:</strong> Only 15 days vs 6 months in many SIFs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Quant's Track Record:</strong> 10 years proprietary trading with no yearly losses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Unique Positioning:</strong> Only SIF focused specifically on mid & small caps</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Higher Volatility:</strong> Mid & small caps are more volatile than large caps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Liquidity Risk:</strong> Smaller stocks may have liquidity constraints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Very High Risk:</strong> Rated Level 5 (highest risk category) by SEBI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>25% Short Exposure:</strong> Theoretically unlimited loss potential on shorts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>New Category:</strong> First Ex-Top 100 long-short SIF, no track record</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comparison with Other qSIF Funds */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  qSIF Funds Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>qSIF Ex-Top 100</TableHead>
                        <TableHead>qSIF Equity L-S</TableHead>
                        <TableHead>qSIF Hybrid L-S</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Focus</TableCell>
                        <TableCell className="text-primary font-medium">Mid & Small Caps</TableCell>
                        <TableCell>All Market Caps</TableCell>
                        <TableCell>Balanced</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Ex-Top 100 Allocation</TableCell>
                        <TableCell className="text-primary font-medium">65-100%</TableCell>
                        <TableCell>No restriction</TableCell>
                        <TableCell>No restriction</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Top 100 Limit</TableCell>
                        <TableCell>Max 35%</TableCell>
                        <TableCell>No limit</TableCell>
                        <TableCell>No limit</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fund Type</TableCell>
                        <TableCell className="text-green-600">Open-ended</TableCell>
                        <TableCell className="text-green-600">Open-ended</TableCell>
                        <TableCell>Interval</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Debt Allocation</TableCell>
                        <TableCell>0-35%</TableCell>
                        <TableCell>0-20%</TableCell>
                        <TableCell>25-75%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Redemption</TableCell>
                        <TableCell className="text-green-600">Daily</TableCell>
                        <TableCell className="text-green-600">Daily</TableCell>
                        <TableCell>Tue & Wed only</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exit Load Period</TableCell>
                        <TableCell>15 days</TableCell>
                        <TableCell>15 days</TableCell>
                        <TableCell>15 days</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What does "Ex-Top 100" mean?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  "Ex-Top 100" means the fund focuses on stocks <strong>outside the top 100 companies by market capitalization</strong>. This means the fund primarily invests in mid-cap and small-cap stocks, which typically offer higher growth potential but also come with higher volatility compared to large-cap stocks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  How is this different from qSIF Equity Long-Short Fund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The regular qSIF Equity Long-Short Fund can invest across all market capitalizations without restrictions. This Ex-Top 100 fund <strong>mandates 65-100% in stocks outside the top 100</strong> and allows only up to 35% in top 100 stocks. Choose this fund if you specifically want mid & small cap exposure with long-short strategies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Is this fund riskier than regular equity SIFs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, mid-cap and small-cap stocks are generally more volatile than large-caps. Combined with the 25% short exposure, this fund carries higher risk. It's rated Level 5 (Very High Risk) by SEBI. This fund is suitable for investors with high risk appetite and a long investment horizon (5-7+ years).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  When will the NFO launch?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The NFO dates are yet to be announced. The fund document indicates dates will be published on the AMC SIF website (qsif.com). Contact us for updates on the launch date.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What is the minimum investment required?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The minimum investment is ₹10 lakh, aggregated across all qSIF strategies at PAN level. Accredited investors can invest with ₹1 lakh minimum. Once you're a qSIF investor, additional investments can be as low as ₹10,000.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

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
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-semibold mb-4">Interested in qSIF Equity Ex-Top 100 Long-Short Fund?</h3>
                <p className="text-muted-foreground mb-6">
                  Get notified when the NFO launches. Contact our team for details.
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

export default QsifExTop100Sif;
