"use client";

import Header from "@/components/Header";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 


  TrendingUp, 
  Shield, 
  Target, 
  BarChart3, 
  Users, 
  Calendar, 
  Wallet, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Building2,
  GraduationCap,
  Briefcase,
  Clock,
  Percent,
  Scale,
  LineChart,
  PieChart,
  Layers
} from "lucide-react";

const MagnumSif = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              NFO: October 1-15, 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4">
              Magnum Hybrid Long Short Fund
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              by SBI Mutual Fund
            </p>
            <p className="text-lg text-foreground/80 mb-8 max-w-3xl mx-auto">
              India's first professionally managed hybrid long-short fund that generates income while protecting your downside—designed for sophisticated investors seeking superior risk-adjusted returns.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">₹10L</div>
                <div className="text-sm text-muted-foreground">Min Investment</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">Level 2</div>
                <div className="text-sm text-muted-foreground">Moderate Risk</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">2x/Week</div>
                <div className="text-sm text-muted-foreground">Redemption</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">NSE/BSE</div>
                <div className="text-sm text-muted-foreground">Exchange Listed</div>
              </div>
            </div>

            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Triple Pillar Strategy */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Triple-Pillar Investment Strategy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A unique combination of income generation, growth, and downside protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Pillar 1: Income Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Cash-Futures Arbitrage</h4>
                  <p className="text-sm text-muted-foreground">
                    Simultaneously buy in spot market and sell in futures to lock in spreads
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Covered Call Strategy</h4>
                  <p className="text-sm text-muted-foreground">
                    Write call options against holdings to earn premium income
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Event-Based Arbitrage</h4>
                  <p className="text-sm text-muted-foreground">
                    Dividend, merger, buyback, and special situation opportunities
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pillar 2 */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Pillar 2: Long Equity Exposure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Bottom-Up Selection</h4>
                  <p className="text-sm text-muted-foreground">
                    Fundamental analysis for stock selection across market caps
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Thematic Views</h4>
                  <p className="text-sm text-muted-foreground">
                    Top-down sector allocation based on growth outlook
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Allocation Range</h4>
                  <p className="text-sm text-muted-foreground">
                    35-75% in equity and equity-related instruments
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pillar 3 */}
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Pillar 3: Short Positions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Downside Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Up to 25% in short futures, puts, and spreads
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Alpha Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Returns from expected price declines in specific sectors
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Portfolio Hedge</h4>
                  <p className="text-sm text-muted-foreground">
                    Tactical positioning based on market outlook
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Asset Allocation */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Asset Allocation Matrix</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic allocation across asset classes for optimal risk-adjusted returns
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Asset Class</th>
                    <th className="text-center p-4 font-semibold text-foreground">Min %</th>
                    <th className="text-center p-4 font-semibold text-foreground">Max %</th>
                    <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-4 text-foreground">Hedged Equity (Arbitrage, Covered Calls)</td>
                    <td className="p-4 text-center text-muted-foreground">0%</td>
                    <td className="p-4 text-center text-primary font-semibold">75%</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">Income generation with low risk</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground">Short Derivatives</td>
                    <td className="p-4 text-center text-muted-foreground">0%</td>
                    <td className="p-4 text-center text-primary font-semibold">25%</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">Downside protection/alpha</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground">Debt & Money Market</td>
                    <td className="p-4 text-center text-muted-foreground">25%</td>
                    <td className="p-4 text-center text-primary font-semibold">35%</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">Stability, liquidity, income</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground">REITs/InvITs</td>
                    <td className="p-4 text-center text-muted-foreground">0%</td>
                    <td className="p-4 text-center text-primary font-semibold">10%</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">Diversification, yield</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-foreground">Overseas Securities</td>
                    <td className="p-4 text-center text-muted-foreground">0%</td>
                    <td className="p-4 text-center text-primary font-semibold">35%</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">Global diversification</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Scenarios */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Performance Scenarios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              How the fund is designed to perform across different market conditions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Sideways Market */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium text-muted-foreground">Sideways Market</span>
                </div>
                <CardTitle className="text-lg">Nifty Flat (6 months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pure Equity Fund</span>
                    <span className="text-sm font-medium text-foreground">0-2%</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary/10 rounded-lg p-2">
                    <span className="text-sm font-medium text-primary">Magnum Hybrid</span>
                    <span className="text-sm font-bold text-primary">7-10%</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Arbitrage + covered calls + debt interest generate returns even when markets don't move
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bull Market */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-muted-foreground">Bull Market</span>
                </div>
                <CardTitle className="text-lg">Nifty Up 15%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pure Equity Fund</span>
                    <span className="text-sm font-medium text-foreground">14-16%</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary/10 rounded-lg p-2">
                    <span className="text-sm font-medium text-primary">Magnum Hybrid</span>
                    <span className="text-sm font-bold text-primary">9-12%</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Participates in upside while covered calls and shorts slightly cap gains
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bear Market */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-muted-foreground">Bear Market</span>
                </div>
                <CardTitle className="text-lg">Nifty Down 15%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pure Equity Fund</span>
                    <span className="text-sm font-medium text-red-500">-13% to -15%</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary/10 rounded-lg p-2">
                    <span className="text-sm font-medium text-primary">Magnum Hybrid</span>
                    <span className="text-sm font-bold text-primary">+4% to +5%</span>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Short positions + arbitrage + debt cushion the fall and generate positive returns
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Should Invest */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Who Should Invest?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This fund is designed for sophisticated investors with specific investment profiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Suitable */}
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                  Suitable For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">HNIs seeking balanced growth with income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Investors comfortable with hybrid strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Those seeking professional active management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Investors wanting equity exposure with downside cushion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Sophisticated investors understanding derivatives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Not Suitable */}
            <Card className="border-red-500/30 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="w-5 h-5" />
                  Not Suitable For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Conservative investors seeking guaranteed returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Those uncomfortable with derivatives strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Short-term investors (less than 3 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Investors needing daily liquidity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                    <span className="text-foreground/80">Those below ₹10 lakh investment threshold</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Ideal Profile */}
          <div className="mt-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Ideal Investor Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Horizon</div>
                      <div className="text-sm text-muted-foreground">3-5+ years</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Risk Appetite</div>
                      <div className="text-sm text-muted-foreground">Moderate</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Min Corpus</div>
                      <div className="text-sm text-muted-foreground">₹10 Lakhs+</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Goal</div>
                      <div className="text-sm text-muted-foreground">Income + Growth</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fund Manager */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card border-border overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-heading text-center">Mr. Gaurav Mehta</h3>
                  <p className="text-sm text-muted-foreground text-center">Head - SIF Equity</p>
                  <p className="text-sm text-muted-foreground text-center">SBI Funds Management Limited</p>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-xl font-bold text-heading mb-4">Fund Manager Profile</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-foreground">Education</div>
                        <div className="text-sm text-muted-foreground">PGDM (IIM Lucknow), B.Tech (IIT Bombay), CFA Charterholder</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-foreground">Experience</div>
                        <div className="text-sm text-muted-foreground">19+ years in Indian financial markets</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-foreground">Career Highlights</div>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          <li>CIO - Alternatives Equity at SBIFML (Oct 2021)</li>
                          <li>Managed SBI Optimal Equity Fund (Cat III AIF)</li>
                          <li>Former Portfolio Manager at Ambit Investment Advisors</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <div className="font-medium text-foreground">Expertise</div>
                        <div className="text-sm text-muted-foreground">Long-short strategies, Derivatives, Arbitrage, Hedge fund strategies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Fees & Liquidity */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Fees & Liquidity</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Fees */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-primary" />
                  Expense Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Regular Plan TER</span>
                  <span className="font-semibold text-foreground">Up to 2.25% + GST</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Direct Plan TER</span>
                  <span className="font-semibold text-foreground">Lower (No commission)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Entry Load</span>
                  <span className="font-semibold text-primary">Nil</span>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="text-sm font-medium text-foreground">Exit Load (Regular):</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">0-15 days</span>
                    <span className="text-foreground">0.50%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">15 days - 1 month</span>
                    <span className="text-foreground">0.25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">After 1 month</span>
                    <span className="text-primary font-semibold">Nil</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liquidity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Liquidity Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Subscription</span>
                  <span className="font-semibold text-foreground">Daily</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Redemption</span>
                  <span className="font-semibold text-foreground">Twice Weekly (Mon & Thu)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Cut-off Time</span>
                  <span className="font-semibold text-foreground">3:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Payout</span>
                  <span className="font-semibold text-foreground">Within 3 working days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-foreground">Exchange Listing</span>
                  <span className="font-semibold text-foreground">NSE / BSE</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Exchange Settlement</span>
                  <span className="font-semibold text-foreground">T+2 basis</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Why Choose Magnum Hybrid Long Short?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <Layers className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Unique Strategy Combination</h3>
              <p className="text-sm text-muted-foreground">Only hybrid fund combining arbitrage, covered calls, and tactical shorts</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Downside Protection</h3>
              <p className="text-sm text-muted-foreground">Up to 25% short positions cushion market falls with premium income buffer</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <LineChart className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Income + Growth</h3>
              <p className="text-sm text-muted-foreground">Regular income from arbitrage and covered calls plus capital appreciation</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Expert Management</h3>
              <p className="text-sm text-muted-foreground">Fund manager with hedge fund background and 19+ years experience</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <Building2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">SBI Legacy</h3>
              <p className="text-sm text-muted-foreground">Backed by India's largest mutual fund house with 30+ years legacy</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <PieChart className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Flexible Liquidity</h3>
              <p className="text-sm text-muted-foreground">Twice-weekly redemptions plus exchange listing for intraday trading</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-heading mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What is a Hybrid Long Short Fund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A Hybrid Long Short Fund combines long positions (buying stocks expected to rise) with short positions (betting against stocks expected to fall), along with arbitrage and covered call strategies. This approach aims to generate returns in various market conditions while providing downside protection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What is the minimum investment amount?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The minimum investment is ₹10 lakhs. This threshold is applicable across all Specialized Investment Fund strategies at the PAN level, as per SEBI regulations for SIF products.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How does the covered call strategy work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  In a covered call strategy, the fund holds stocks and sells call options against them. This generates premium income while capping the upside potential. For example, if the fund buys stocks at ₹1000 and sells call options at ₹1050 strike, it collects premium income. This provides additional returns in sideways markets and offers a cushion during downturns.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  How often can I redeem my investment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Redemptions are processed twice weekly - on Monday and Thursday. Requests received after Thursday 3 PM until Monday 3 PM get Monday's NAV, while requests after Monday 3 PM until Thursday 3 PM get Thursday's NAV. Payout is within 3 working days. Additionally, units can be traded on NSE/BSE for intraday liquidity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What are the tax implications?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  For resident investors: Long-term capital gains (held more than 12 months) are taxed at 12.50% on gains exceeding ₹1.25 lakhs/year. Short-term gains are taxed at 20%. Dividend income (IDCW) is taxable at your income tax slab rate. Please consult your tax advisor for personalized advice.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left font-medium">
                  What is the risk level of this fund?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The fund is classified as Risk Level 2 (Moderate Risk). While it employs sophisticated strategies to manage risk, investments in SIFs involve potential loss of capital, liquidity risk, and market volatility. The short positions and hedging strategies are designed to reduce, but not eliminate, downside risk.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-8 bg-amber-500/10 border-y border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-2">Important Risk Disclosure</p>
              <p>
                Investments in Specialized Investment Fund involves relatively higher risk including potential loss of capital, liquidity risk and market volatility. Past performance may or may not be sustained in the future. There is no assurance that the investment objective will be achieved. Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-heading mb-4">Ready to Invest?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start your investment journey with Magnum Hybrid Long Short Fund. Contact us for personalized assistance.
          </p>
          <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="lg" className="gap-2">
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MagnumSif;
