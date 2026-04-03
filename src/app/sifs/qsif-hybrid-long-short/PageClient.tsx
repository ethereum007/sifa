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

import quantLogo from "@/assets/logos/quant-mutual-fund.png";



const QsifHybridSif = () => {
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
              <img 
                src={quantLogo as unknown as string} 
                alt="Quant Mutual Fund" 
                className="w-16 h-16 object-contain rounded-lg border border-border p-2"
              />
              <div>
                <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
                  HYBRID LONG-SHORT FUND
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-heading">
                  qSIF Hybrid Long-Short Fund
                </h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              An interval investment strategy by Quant Mutual Fund investing in equity and debt securities with limited short exposure through derivatives for balanced capital appreciation and income generation.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                NFO: Sept 25 - Oct 9, 2025
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
              <div className="text-2xl font-bold text-primary">25-75%</div>
              <div className="text-sm text-muted-foreground">Equity Allocation</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">25-75%</div>
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
                      <p className="font-medium">Interval Investment Strategy (SIF)</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Benchmark</p>
                      <p className="font-medium">NIFTY 50 Hybrid Composite Debt 50:50 Index (TRI)</p>
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
                  To achieve a blend of <strong>capital appreciation and income generation</strong> by maintaining a balanced exposure to equity and debt instruments, with a <strong>minimum of 25% in each</strong>, while utilizing <strong>up to 25% in short derivative positions</strong> to enhance returns and manage risk efficiently.
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
                      <TableCell className="font-medium">Equity & Equity-related instruments</TableCell>
                      <TableCell className="text-center">25%</TableCell>
                      <TableCell className="text-center">75%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Debt & Money Market instruments</TableCell>
                      <TableCell className="text-center">25%</TableCell>
                      <TableCell className="text-center">75%</TableCell>
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
                      33+ years in capital markets. Led proprietary trading at Quant Broking with $1B+ daily turnover. Extensive experience in long-short strategies including equity arbitrage, volatility arbitrage, and event-driven strategies.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Lokesh Garg</h4>
                    <p className="text-sm text-primary mb-2">MBA - IIM Ahmedabad</p>
                    <p className="text-sm text-muted-foreground">
                      20 years in equity markets. Former Executive Director at UBS India Institutional Equities. Expertise in generating fundamental long-short investment ideas.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Ankit Pande</h4>
                    <p className="text-sm text-primary mb-2">CFA Charterholder, MBA - CUHK</p>
                    <p className="text-sm text-muted-foreground">
                      14+ years in equities. Thomson Reuters StarMine Award winner for best stock picker. Expertise in covered calls and protective puts strategies.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-foreground">Sameer Kate</h4>
                    <p className="text-sm text-primary mb-2">MBA, 20+ years experience</p>
                    <p className="text-sm text-muted-foreground">
                      Two decades in derivatives dealing. Former Sr. Sales Trader at Investec Capital. 16+ years at Kotak Securities Institutional Equities.
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
                        <TableCell className="font-medium">Synthetic Short</TableCell>
                        <TableCell>Buy put + sell call at same strike to mimic short position</TableCell>
                        <TableCell className="text-center"><Badge variant="destructive">Very High</Badge></TableCell>
                        <TableCell>Strong bearish outlook</TableCell>
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
                      <p className="font-medium">Daily (business days)</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Redemption Frequency</p>
                      <p className="font-medium">Every Tuesday & Wednesday</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Redemption Payout</p>
                      <p className="font-medium">Within 3 business days</p>
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
                      <span className="text-sm"><strong>Balanced Hybrid Structure:</strong> 25-75% in both equity and debt provides flexibility and stability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Experienced Team:</strong> 5 fund managers with 100+ years combined experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Short Exit Load Period:</strong> Only 15 days vs 6 months in many SIFs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Quant's Track Record:</strong> Proven proprietary trading with no yearly losses over 10 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>Diversified Strategies:</strong> Multiple derivative strategies for various market conditions</span>
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
                      <span className="text-sm"><strong>Interval Structure:</strong> Redemption only on Tuesday/Wednesday (not daily)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                      <span className="text-sm"><strong>High Risk Level:</strong> Rated Level 5 (Very High Risk) by SEBI</span>
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
                      <span className="text-sm"><strong>New SIF Category:</strong> First interval strategy from qSIF, no track record</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Comparison with Other Hybrid SIFs */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  Comparison with Other Hybrid SIFs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feature</TableHead>
                        <TableHead>qSIF Hybrid</TableHead>
                        <TableHead>Altiva (Edelweiss)</TableHead>
                        <TableHead>Arudha (Bandhan)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">NFO Price</TableCell>
                        <TableCell>₹10</TableCell>
                        <TableCell>₹10</TableCell>
                        <TableCell>₹10</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Equity Allocation</TableCell>
                        <TableCell>25-75%</TableCell>
                        <TableCell>35-65%</TableCell>
                        <TableCell>35-65%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Debt Allocation</TableCell>
                        <TableCell>25-75%</TableCell>
                        <TableCell>35-65%</TableCell>
                        <TableCell>35-65%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Redemption</TableCell>
                        <TableCell>Tue & Wed only</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell>Mon & Thu only</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exit Load Period</TableCell>
                        <TableCell className="text-green-600 font-medium">15 days</TableCell>
                        <TableCell>6 months</TableCell>
                        <TableCell>Nil</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Exit Load %</TableCell>
                        <TableCell>1%</TableCell>
                        <TableCell>0.50%</TableCell>
                        <TableCell>Nil</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Max TER</TableCell>
                        <TableCell>2.25%</TableCell>
                        <TableCell>2.25%</TableCell>
                        <TableCell>2.00%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fund Managers</TableCell>
                        <TableCell>5 managers</TableCell>
                        <TableCell>3 managers</TableCell>
                        <TableCell>4 managers</TableCell>
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
                  What makes qSIF Hybrid different from other hybrid SIFs?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  qSIF Hybrid offers a wider allocation range (25-75% in both equity and debt) compared to most hybrid SIFs that have 35-65% ranges. It also features a very short exit load period of just 15 days, one of the shortest in the SIF category. The fund is backed by Quant's proven track record in proprietary trading with no yearly losses over a decade.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  When can I redeem my investment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  As an interval fund, redemption is only available on Tuesdays and Wednesdays of each week. If these fall on non-business days, redemption shifts to the next business day. For units held in demat form, you can also trade on NSE where the fund will be listed.
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
                  Who manages the fund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The fund is managed by a team of 5 experienced professionals led by Sandeep Tandon (Founder & CIO with 33+ years experience), along with Lokesh Garg (IIM-A, ex-UBS), Ankit Pande (CFA, Thomson Reuters award winner), Sameer Kate (20+ years derivatives experience), and Sanjeev Sharma (treasury specialist).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border rounded-lg px-4">
                <AccordionTrigger className="text-left">
                  What short strategies does the fund use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The fund employs various derivative strategies including Short Futures, Synthetic Shorts, Long Puts, Bear Put Spreads, Bear Call Spreads, and Put Butterflies. These are used tactically based on market conditions to generate alpha or hedge positions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-semibold mb-4">Interested in qSIF Hybrid Long-Short Fund?</h3>
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

export default QsifHybridSif;
