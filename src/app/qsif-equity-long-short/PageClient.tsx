"use client";

import { lazy, Suspense } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Shield, 
  Calendar, 
  Users, 
  Target, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Clock,
  Percent,
  BarChart3,
  Scale,
  Wallet
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

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



const QsifEquitySif = () => {
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
                  EQUITY LONG-SHORT FUND
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-heading">
                  qSIF Equity Long-Short Fund
                </h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              An open-ended equity investment strategy by Quant Mutual Fund investing in listed equity and equity-related instruments with limited short exposure through derivatives to enhance returns and manage risk efficiently.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                NFO: Sept 17 - Oct 1, 2025
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                ₹10 per unit
              </Badge>
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                Min Investment: ₹10 Lakh
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">80-100%</div>
              <div className="text-sm text-muted-foreground">Equity Allocation</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">0-20%</div>
              <div className="text-sm text-muted-foreground">Debt Allocation</div>
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
                  To generate <strong>long-term capital appreciation</strong> by investing in a diversified portfolio of equity and equity-related instruments while employing <strong>limited short exposure through derivatives</strong> to enhance returns and manage risk efficiently. The strategy aims to capture upside potential while mitigating downside risks.
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
                    <TableRow>
                      <TableCell className="font-medium">Equity & Equity-related instruments (including unhedged short)</TableCell>
                      <TableCell className="text-center">80%</TableCell>
                      <TableCell className="text-center">100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Debt & Money Market instruments</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">20%</TableCell>
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
                    <TableRow>
                      <TableCell className="font-medium">Hedged Positions</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">100%</TableCell>
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
                      33+ years in capital markets. Led proprietary trading at Quant Broking with $1B+ daily turnover. Extensive experience in long-short strategies including equity arbitrage, volatility arbitrage, and event-driven strategies. 10 years with no yearly or quarterly losses.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Lokesh Garg</h4>
                    <p className="text-sm text-primary mb-2">MBA - IIM Ahmedabad</p>
                    <p className="text-sm text-muted-foreground">
                      20 years in equity markets. Former Executive Director at UBS India Institutional Equities. Top analyst at Credit Suisse. Expertise in generating fundamental long-short investment ideas.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Ankit Pande</h4>
                    <p className="text-sm text-primary mb-2">CFA Charterholder, MBA - CUHK</p>
                    <p className="text-sm text-muted-foreground">
                      14+ years in equities. Thomson Reuters StarMine Award winner for best stock picker in IT sector. Expertise in covered calls and protective puts strategies.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Sameer Kate</h4>
                    <p className="text-sm text-primary mb-2">MBA, Derivatives Specialist</p>
                    <p className="text-sm text-muted-foreground">
                      20+ years in derivatives dealing. Former Sr. Sales Trader at Investec Capital. 16+ years at Kotak Securities Institutional Equities. Expert in equity and derivatives trading.
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
                  Short Derivative Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Strategy</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Risk Level</TableHead>
                        <TableHead>When Used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Short Futures</TableCell>
                        <TableCell>Shorting Index/Stock Futures to benefit from price decline</TableCell>
                        <TableCell className="text-center"><Badge variant="destructive">Very High</Badge></TableCell>
                        <TableCell>Strong bearish outlook</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Long Put</TableCell>
                        <TableCell>Buy put option to profit from price decline</TableCell>
                        <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">Low</Badge></TableCell>
                        <TableCell>Strong bearish outlook</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bear Put Spread</TableCell>
                        <TableCell>Buy higher strike put, sell lower strike put</TableCell>
                        <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">Low</Badge></TableCell>
                        <TableCell>Moderate bearish view</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bear Call Spread</TableCell>
                        <TableCell>Sell lower strike call, buy higher strike call</TableCell>
                        <TableCell className="text-center"><Badge className="bg-amber-100 text-amber-700">Moderate</Badge></TableCell>
                        <TableCell>Mild bearish/neutral</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Long Put Butterfly</TableCell>
                        <TableCell>Buy 1 put lower strike, sell 2 puts middle, buy 1 put higher strike</TableCell>
                        <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">Low</Badge></TableCell>
                        <TableCell>Limited bearish move</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Long Put Calendar</TableCell>
                        <TableCell>Sell near-term put, buy longer-term put at same strike</TableCell>
                        <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">Low</Badge></TableCell>
                        <TableCell>Gradual bearish move</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
                      <span className="text-sm"><strong>Open-Ended Structure:</strong> Daily subscription and redemption on all business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Pure Equity Focus:</strong> 80-100% in equity for maximum growth potential</span>
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
                      <span className="text-sm"><strong>Broad Benchmark:</strong> NIFTY 500 TRI covers 93% of market cap</span>
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
                      <span className="text-sm"><strong>Very High Risk:</strong> Rated Level 5 (highest risk category) by SEBI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Concentrated Equity:</strong> 80-100% equity = high volatility potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>High Minimum:</strong> ₹10 lakh threshold aggregated across all qSIF strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>25% Short Exposure:</strong> Theoretically unlimited loss potential on shorts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>New SIF Category:</strong> First equity long-short from qSIF, no track record</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comparison with Other Equity SIFs */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  qSIF Equity vs Hybrid Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>qSIF Equity L-S</TableHead>
                        <TableHead>qSIF Hybrid L-S</TableHead>
                        <TableHead>Diviniti (ITI)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Fund Type</TableCell>
                        <TableCell className="text-green-600 font-medium">Open-ended</TableCell>
                        <TableCell>Interval</TableCell>
                        <TableCell className="text-green-600">Open-ended</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Equity Allocation</TableCell>
                        <TableCell>80-100%</TableCell>
                        <TableCell>25-75%</TableCell>
                        <TableCell>80-100%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Debt Allocation</TableCell>
                        <TableCell>0-20%</TableCell>
                        <TableCell>25-75%</TableCell>
                        <TableCell>0-20%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Redemption</TableCell>
                        <TableCell className="text-green-600 font-medium">Daily</TableCell>
                        <TableCell>Tue & Wed only</TableCell>
                        <TableCell className="text-green-600">Daily</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Benchmark</TableCell>
                        <TableCell>NIFTY 500 TRI</TableCell>
                        <TableCell>NIFTY 50 Hybrid Debt 50:50</TableCell>
                        <TableCell>NIFTY 50 TRI</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exit Load Period</TableCell>
                        <TableCell>15 days</TableCell>
                        <TableCell>15 days</TableCell>
                        <TableCell>6 months</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Max TER</TableCell>
                        <TableCell>2.25%</TableCell>
                        <TableCell>2.25%</TableCell>
                        <TableCell>2.25%</TableCell>
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
                  What makes qSIF Equity different from qSIF Hybrid?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  qSIF Equity is an open-ended fund with 80-100% equity allocation, daily redemption, and benchmarked to NIFTY 500 TRI. qSIF Hybrid is an interval fund with 25-75% in both equity and debt, redemption only on Tuesdays/Wednesdays, and benchmarked to NIFTY 50 Hybrid Composite Debt 50:50 Index. Choose Equity for pure equity exposure with better liquidity; choose Hybrid for balanced risk.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  When can I redeem my investment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  As an open-ended fund, you can redeem on any business day. Redemption proceeds are dispatched within 3 working days. This is a key advantage over interval funds which restrict redemption to specific days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What is the minimum investment required?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The minimum investment is ₹10 lakh, aggregated across all qSIF strategies at PAN level. Accredited investors can invest with ₹1 lakh minimum. Existing qSIF investors can make additional investments of ₹10,000 minimum.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  Why is the benchmark NIFTY 500 TRI?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The NIFTY 500 TRI covers approximately 93% of India's listed equity market capitalization across large, mid, and small-cap stocks. This broad benchmark aligns with the fund's diverse investment universe and provides a comprehensive baseline to evaluate alpha generation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What portfolio strategies does the fund use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The fund uses multiple strategies: unhedged long-only, partially-hedged long, fully-hedged portfolio, and long-short with 25% naked shorts. It employs various derivative instruments including short futures, synthetic shorts, long puts, bear spreads, and put butterflies based on market conditions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-semibold mb-4">Interested in qSIF Equity Long-Short Fund?</h3>
                <p className="text-muted-foreground mb-6">
                  Contact our team for detailed investment guidance and documentation.
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

export default QsifEquitySif;
