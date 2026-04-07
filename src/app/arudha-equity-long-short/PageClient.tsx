"use client";

import { lazy, Suspense } from "react";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  Percent,
  IndianRupee,
  Clock,
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
  Activity,
  ExternalLink,
  BookOpen,
  UserCheck,
  Ban,
} from "lucide-react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



const ArudhaEquityLongShort = () => {
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
              <AmcLogo amc="Bandhan Mutual Fund" size="md" />
              <div className="text-left">
                <Badge variant="outline" className="mb-2 text-amber-600 border-amber-400/30 bg-amber-50">
                  NFO OPEN — Mar 5–18, 2026
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">
                  Arudha Equity Long-Short Fund
                </h1>
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
              An open-ended equity strategy investing in listed equities with limited short exposure through derivatives — the first pure equity long-short SIF from Bandhan AMC.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>by Bandhan AMC Limited</span>
              <span className="text-muted-foreground/40">|</span>
              <Badge variant="outline" className="text-xs">SEBI: ASIF/O/E/ELSF/25/12/0002/BNDN</Badge>
            </div>

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
              <p className="text-xl font-bold text-heading">2.25%</p>
              <p className="text-xs text-muted-foreground">Max TER</p>
            </Card>
            <Card className="text-center p-4">
              <Shield className="w-5 h-5 text-red-500 mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">Level 5</p>
              <p className="text-xs text-muted-foreground">Risk Band (High)</p>
            </Card>
            <Card className="text-center p-4">
              <Target className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading text-sm">NIFTY 500 TRI</p>
              <p className="text-xs text-muted-foreground">Benchmark</p>
            </Card>
            <Card className="text-center p-4">
              <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">T+3</p>
              <p className="text-xs text-muted-foreground">Redemption</p>
            </Card>
            <Card className="text-center p-4">
              <Banknote className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold text-heading">0.50%</p>
              <p className="text-xs text-muted-foreground">Exit Load (≤30d)</p>
            </Card>
          </div>

          {/* NFO Details */}
          <Card className="max-w-4xl mx-auto mb-12 border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Calendar className="w-5 h-5" />
                NFO Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">NFO Open Date</p>
                  <p className="font-semibold">March 5, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Close Date</p>
                  <p className="font-semibold">March 18, 2026</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NFO Price</p>
                  <p className="font-semibold">₹10 per unit</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Re-opening Date</p>
                  <p className="font-semibold">March 30, 2026</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Registrar (RTA): CAMS — NAV available at www.camsonline.com
              </p>
            </CardContent>
          </Card>

          {/* Section 1: Fund Snapshot */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              1. Fund Snapshot
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold w-1/3">Fund Objective</TableCell>
                      <TableCell>To generate long-term capital appreciation by investing in a diversified portfolio of equity and equity-related instruments, including limited short exposure through derivatives.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Strategy in Brief</TableCell>
                      <TableCell>Predominantly long equity book (80–100%) with capped short positions (≤25% of net assets) via exchange-traded derivatives. Captures upside in bull markets while offering partial downside mitigation in bear phases.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">What It Invests In</TableCell>
                      <TableCell>Indian listed equities, equity-related instruments (warrants, convertibles), derivatives (futures, options, CDS, IRS, FRA), debt & money market instruments, InvITs, and overseas securities (up to 50%). Will NOT invest in unrated debt or commodity derivatives.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Benchmark</TableCell>
                      <TableCell>NIFTY 500 Total Return Index (TRI) — covers ~93% of India's listed market cap across large, mid, and small caps.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Investment Horizon</TableCell>
                      <TableCell>3–5 years minimum recommended. Open-ended; daily subscription & redemption on business days.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Section 2: Fund Managers */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              2. Who Manages Your Money?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <Badge className="w-fit bg-blue-100 text-blue-700 border-blue-200 mb-2">Fund Manager 1</Badge>
                  <CardTitle className="text-lg">Mr. Nilesh Saha</CardTitle>
                  <p className="text-sm text-muted-foreground">11+ years experience</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Qualifications</p>
                      <p>BE (Hons) Mechanical Engineering; MBA – IIM Bangalore; CFA Charterholder</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Previous Roles</p>
                      <p>Julius Baer Wealth Advisors – Cat III AIF (2023–2025); Edelweiss AMC – Cat III AIF Portfolio Mgmt (2014–2023)</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Also Manages</p>
                      <p>Arudha Hybrid Long-Short Fund</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200">
                <CardHeader className="pb-3">
                  <Badge className="w-fit bg-emerald-100 text-emerald-700 border-emerald-200 mb-2">Fund Manager 2</Badge>
                  <CardTitle className="text-lg">Mr. Brijesh Shah, VP – Fixed Income</CardTitle>
                  <p className="text-sm text-muted-foreground">15+ years experience</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Qualifications</p>
                      <p>Post Graduate Diploma in Finance</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Previous Roles</p>
                      <p>Bandhan AMC (Aug 2015–present); IDBI AMC (2013–2015); India Bulls AMC (2011–2012)</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Also Manages</p>
                      <p>Arudha Hybrid Long-Short Fund; 10+ Bandhan MF schemes (Liquid, Overnight, Floater, BAF Debt, etc.)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 3: Suitability */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-primary" />
              3. Is This Right for You?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Ideal For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> HNI / UHNI investors with ₹10 lakh+ to deploy</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Investors comfortable with equity market volatility</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> 3–5 year+ investment horizon</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Seeking alpha beyond traditional mutual funds via long-short strategies</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> SEBI Accredited Investors (eligible at ₹1 lakh minimum)</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Portfolio diversification / satellite allocation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                    <Ban className="w-5 h-5 text-red-600" />
                    Not Suitable If
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> You need capital protection or guaranteed returns</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Investment horizon is less than 2–3 years</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> You are a US / Canadian resident (regulatory restrictions)</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> You cannot tolerate NAV drawdowns from derivative positions</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> You need immediate, unrestricted liquidity at all times</li>
                    <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> Total SIF investment across strategies is below ₹10 lakh</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section 4: Asset Allocation */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-primary" />
              4. Asset Allocation Framework
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Class</TableHead>
                      <TableHead className="text-center">Min %</TableHead>
                      <TableHead className="text-center">Max %</TableHead>
                      <TableHead className="text-center">Current %</TableHead>
                      <TableHead className="hidden md:table-cell">Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-blue-50/50">
                      <TableCell className="font-semibold">Equity & Equity-Related</TableCell>
                      <TableCell className="text-center">80%</TableCell>
                      <TableCell className="text-center">100%</TableCell>
                      <TableCell className="text-center text-muted-foreground">NFO — TBD</TableCell>
                      <TableHead className="hidden md:table-cell text-muted-foreground font-normal">Includes unhedged short via derivatives</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium pl-8 text-muted-foreground">↳ Unhedged Short (max)</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">25%</TableCell>
                      <TableCell className="text-center text-muted-foreground">—</TableCell>
                      <TableHead className="hidden md:table-cell text-muted-foreground font-normal">Exchange-traded derivatives only</TableHead>
                    </TableRow>
                    <TableRow className="bg-green-50/50">
                      <TableCell className="font-semibold">Debt & Money Market</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">20%</TableCell>
                      <TableCell className="text-center text-muted-foreground">NFO — TBD</TableCell>
                      <TableHead className="hidden md:table-cell text-muted-foreground font-normal">No unrated debt; corp bond repo up to 10%</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Derivatives — Hedging</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">100%</TableCell>
                      <TableCell className="text-center text-muted-foreground">—</TableCell>
                      <TableHead className="hidden md:table-cell text-muted-foreground font-normal">Full hedging permitted</TableHead>
                    </TableRow>
                    <TableRow className="bg-purple-50/50">
                      <TableCell className="font-semibold">InvITs</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">20%</TableCell>
                      <TableCell className="text-center text-muted-foreground">NFO — TBD</TableCell>
                      <TableHead className="hidden md:table-cell text-muted-foreground font-normal">Per SEBI MF Regulations 1996</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Overseas Securities</TableCell>
                      <TableCell className="text-center">0%</TableCell>
                      <TableCell className="text-center">50%</TableCell>
                      <TableCell className="text-center text-muted-foreground">—</TableCell>
                      <TableHead className="hidden md:table-cell text-muted-foreground font-normal">Up to USD 25mn; ETFs paused per SEBI</TableHead>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Section 5: Costs & Fees */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <Wallet className="w-6 h-6 text-primary" />
              5. Costs & Fees
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Min Investment (Regular)</span>
                      <span className="font-semibold">₹10,00,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Min Investment (Accredited)</span>
                      <span className="font-semibold">₹1,00,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Max TER (Regular)</span>
                      <span className="font-semibold">2.25% p.a.</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Max TER (Direct)</span>
                      <span className="font-semibold">Lower (no dist. commission)</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Entry Load</span>
                      <span className="font-semibold text-green-600">Nil</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Exit Load (≤30 days)</span>
                      <span className="font-semibold">0.50%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Exit Load (&gt;30 days)</span>
                      <span className="font-semibold text-green-600">Nil</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Stamp Duty</span>
                      <span className="font-semibold">0.005%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">Redemption Payout</span>
                      <span className="font-semibold">T+3 working days</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm text-muted-foreground">SIP (min)</span>
                      <span className="font-semibold">₹10,000 / 6 instalments</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-xs text-muted-foreground">LTCG (&gt;12 months)</p>
                    <p className="font-semibold text-sm">12.5% (Section 112A)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">STCG (&lt;12 months)</p>
                    <p className="font-semibold text-sm">20% (Section 111A)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 6: Risk Analysis */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              6. Key Risks
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Market / Volatility Risk", desc: "Equity prices can fall sharply. NAV will fluctuate daily. Strategy invests 80–100% in equities by design.", color: "red" },
                { title: "Derivatives / Leverage Risk", desc: "Uses futures, options, CDS and other derivatives. Even small market moves can amplify gains OR losses. Unhedged long exposure up to 50%; short exposure up to 25%.", color: "red" },
                { title: "Short-Selling Risk", desc: "If a shorted stock rises, losses can mount rapidly. SEBI caps short exposure at 25%. Single party lending exposure limited to 5%.", color: "amber" },
                { title: "Credit Risk", desc: "Debt instruments (up to 20%) carry issuer default risk. AT1/AT2 bonds capped at 10% of debt portfolio. No unrated debt permitted.", color: "amber" },
                { title: "Minimum Threshold Risk", desc: "If total SIF investment falls below ₹10 lakh at PAN level, AMC will notify you — must rebalance within 30 days.", color: "yellow" },
                { title: "Overseas / Currency Risk", desc: "Up to 50% of net assets can be invested overseas. Rupee depreciation benefits; appreciation hurts returns.", color: "yellow" },
              ].map((risk) => (
                <Card key={risk.title} className="border-l-4 border-l-amber-400">
                  <CardContent className="pt-4">
                    <p className="font-semibold text-heading mb-1">{risk.title}</p>
                    <p className="text-sm text-muted-foreground">{risk.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 7: Scenario Analysis */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              7. ISID Scenario Analysis
            </h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Mandatory scenario analysis (per AMFI/SEBI guidelines) showing how P&L is affected by a ±10% Nifty move under four portfolio configurations:
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Scenario</TableHead>
                      <TableHead className="text-center text-green-700">Nifty +10%</TableHead>
                      <TableHead className="text-center text-red-700">Nifty -10%</TableHead>
                      <TableHead className="hidden sm:table-cell">Implication</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-sm">1. No short derivatives (95% long Nifty50)</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">+9.50%</TableCell>
                      <TableCell className="text-center text-red-600 font-semibold">-9.50%</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">Pure long fund baseline</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/30">
                      <TableCell className="font-medium text-sm">2. 25% short IT sector (IT fell 15%)</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">+10.75%</TableCell>
                      <TableCell className="text-center text-red-600 font-semibold">-10.75%</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">Short amplifies gains & losses when sector diverges</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-sm">3. 25% short Banking (Banking +8.5%)</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">+4.88%</TableCell>
                      <TableCell className="text-center text-red-600 font-semibold">-4.88%</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">Short on outperforming sector reduces upside; hedges downside</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/30">
                      <TableCell className="font-medium text-sm">4. 15% short IT + 10% short Banking</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">+8.40%</TableCell>
                      <TableCell className="text-center text-red-600 font-semibold">-8.40%</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">Blended short book partially offsets drawdown</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground mt-4">
                  Scenarios are illustrative examples from the ISID (pages 65–66). Actual portfolio performance will vary.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Section 8: Peer Comparison */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary" />
              8. Arudha Equity vs Hybrid — Side by Side
            </h2>
            <Card>
              <CardContent className="pt-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-center">Arudha Equity L/S</TableHead>
                      <TableHead className="text-center">Arudha Hybrid L/S</TableHead>
                      <TableHead className="text-center hidden sm:table-cell">SIF Category Avg</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">AUM</TableCell>
                      <TableCell className="text-center">New — NFO</TableCell>
                      <TableCell className="text-center">New — NFO</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">Nascent category</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Min Investment</TableCell>
                      <TableCell className="text-center">₹10 Lakh</TableCell>
                      <TableCell className="text-center">₹10 Lakh</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">₹10 Lakh (std)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Max TER</TableCell>
                      <TableCell className="text-center">2.25%</TableCell>
                      <TableCell className="text-center">2.25%</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">~2.00–2.25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Exit Load</TableCell>
                      <TableCell className="text-center">0.50% (≤30d)</TableCell>
                      <TableCell className="text-center">Varies</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">0–1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Risk Band</TableCell>
                      <TableCell className="text-center"><Badge className="bg-red-100 text-red-700 border-red-200">Level 5</Badge></TableCell>
                      <TableCell className="text-center"><Badge className="bg-red-100 text-red-700 border-red-200">Level 5</Badge></TableCell>
                      <TableCell className="text-center hidden sm:table-cell">Level 4–5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Differentiation</TableCell>
                      <TableCell className="text-center text-sm">Pure equity L/S, open-ended, daily liquidity</TableCell>
                      <TableCell className="text-center text-sm">Hybrid (equity + debt), interval fund</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">—</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Section 9: Analyst Scorecard */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              9. Analyst Scorecard
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criterion</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead>Commentary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Investment Objective Clarity</TableCell>
                      <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">4/5</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">Clearly articulated long-term capital appreciation goal with well-defined long-short mechanism. First pure equity L/S SIF from Bandhan. Rich derivative toolkit (15+ strategies).</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fee Competitiveness</TableCell>
                      <TableCell className="text-center"><Badge className="bg-amber-100 text-amber-700">3/5</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">Direct plan cheaper. Fee in line with category but relatively high vs passive alternatives.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Liquidity & Redemption</TableCell>
                      <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">4/5</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">Daily subscription/redemption is a key advantage over interval SIFs. T+3 payout. No lock-in.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Risk Management Framework</TableCell>
                      <TableCell className="text-center"><Badge className="bg-green-100 text-green-700">4/5</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">SEBI-compliant exposure limits. 25% short cap, 5% single-party cap, no unrated debt, mandatory 30-day rebalancing.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Performance vs Benchmark</TableCell>
                      <TableCell className="text-center"><Badge className="bg-muted text-muted-foreground">N/A</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">New fund — no track record. To be assessed from March 2027 post first full year.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Section 10: Investment Thesis */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              10. Investment Thesis & Final Verdict
            </h2>

            <Card className="mb-6 border-blue-200 bg-blue-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> <strong>Daily liquidity advantage:</strong> Open-ended structure unlike most SIF long-short peers (interval funds)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> <strong>Rich derivative toolkit:</strong> 15+ documented strategies including spreads, condors, synthetics, pair trades</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> <strong>SEBI-compliant guardrails:</strong> 25% short cap, 5% single-counterparty cap, mandatory rebalancing</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> <strong>Investor-friendly structure:</strong> No entry load; 0.50% exit load only for first 30 days</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> <strong>Accredited investor pathway:</strong> ₹1 lakh entry (vs ₹10 lakh standard) broadens accessibility</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" /> <strong>Manager expertise:</strong> Nilesh Saha's IIM-B + CFA + 11 years Cat III AIF background is directly relevant</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-6 border-red-200 bg-red-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Key Risks / Concerns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <strong>No track record:</strong> Brand-new strategy with zero performance history — all thesis is forward-looking</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <strong>Derivatives complexity:</strong> Can amplify losses significantly in high-volatility or trending markets</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <strong>TER at 2.25% ceiling:</strong> Expensive; performance must justify premium over passive alternatives</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <strong>Limited public track record:</strong> Mr. Saha joined Bandhan AMC only Sept 2025 — private AIF differs from SIF execution</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <strong>₹10L threshold risk:</strong> Portfolio value dipping below threshold triggers forced rebalancing friction</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> <strong>Overseas ETF pause:</strong> SEBI (March 2024) limits global diversification angle for now</li>
                </ul>
              </CardContent>
            </Card>

          </div>

          {/* ISID Restrictions */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-heading mb-6 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary" />
              11. ISID Deep-Dive: Restrictions & Framework
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Restriction</TableHead>
                      <TableHead>Limit / Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Unhedged Short Derivative Exposure</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Max 25% of net assets in exchange-traded derivatives (SEBI circular Feb 27, 2025)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Single Issuer Debt Concentration</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Max 20% NAV per single issuer (AAA); 16% for AA; 12% for A and below. Govt securities excluded.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sector Concentration (Debt)</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Max 25% of NAV in any single sector</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Single Equity Exposure</TableCell>
                      <TableCell className="text-sm text-muted-foreground">No more than 10% of NAV in any single company. SIF collectively cannot own &gt;15% of voting capital.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gross Derivative Exposure</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Cumulative must not exceed 100% of net assets. Option premium paid capped at 20%. No written options.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Borrowing Limit</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Max 20% of net assets; for temporary liquidity needs only; max 6 months duration.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Short-Term Deposits</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Max 15% across all banks (20% with Trustee approval); max 10% per bank; max 91 days.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Operational Details Accordion */}
          <div className="max-w-4xl mx-auto mb-12">
            <Accordion type="multiple" className="space-y-3">
              <AccordionItem value="threshold" className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-semibold">Minimum Investment Threshold Breach</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Active breach (investor-initiated):</strong> Units frozen, 30-day notice to rebalance.</p>
                  <p><strong>Failure to rebalance:</strong> Triggers automatic redemption at NAV on business day after 30th day.</p>
                  <p><strong>Passive breaches (NAV decline):</strong> Do not trigger this; investor may only redeem full amount.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="disclosure" className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-semibold">Portfolio Disclosure</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>Monthly disclosure on arudhasif.com and amfiindia.com within 10 days of month-end.</p>
                  <p>Fortnightly disclosure for debt components. Half-yearly portfolio via email to registered unitholders.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="riskband" className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-semibold">Risk-Band Disclosure</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  5-level Risk-band (Level 1 = lowest to Level 5 = highest). Evaluated monthly; disclosed within 10 days of month-end. This fund: Risk Band Level 5.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delay" className="border rounded-lg px-4">
                <AccordionTrigger className="text-sm font-semibold">Delay in Redemption Payout</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  AMC liable to pay 15% p.a. interest for any delay beyond T+3. Exempt if delay caused by regulatory requirements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-xl font-bold text-heading mb-3">Interested in Arudha Equity Long-Short Fund?</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
                  NFO closes March 18, 2026. Speak with our team to understand if this strategy fits your portfolio.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" className="gap-2" asChild>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <ArrowRight className="w-4 h-4" />
                      Talk to an Advisor
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <a href="/sifs/arudha-hybrid-long-short">
                      View Arudha Hybrid L/S Fund
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] text-muted-foreground leading-relaxed text-center">
              <strong>Disclaimer:</strong> This analysis is prepared by SIFPrime Research for informational purposes only and does not constitute investment advice, a recommendation, or an offer to buy or sell any securities. Mutual fund investments are subject to market risks. Past performance is not indicative of future results. Please read all scheme-related documents carefully before investing. The information presented is based on publicly available data from the Arudha SIF Scheme Information Document (SID), ISID, and Key Information Memorandum (KIM). Report Date: March 6, 2026.
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

export default ArudhaEquityLongShort;
