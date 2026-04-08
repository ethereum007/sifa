"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Target,
  Activity,
  Calendar,
  Trophy,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {


  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const hybridFunds = [
  { name: "Arudha Hybrid L-S", short: "Arudha", amc: "Bandhan", inception: "04-Feb-26", inceptNav: 10.034, endNav: 10.09, m1: 0.07, m3: 0.56, sinceInception: 0.56, color: "#10b981" },
  { name: "qSIF Hybrid L-S", short: "qSIF", amc: "Quant", inception: "20-Oct-25", inceptNav: 10.0189, endNav: 9.846, m1: -0.86, m3: -1.70, sinceInception: -1.73, color: "#9b59b6" },
  { name: "Altiva Hybrid L-S", short: "Altiva", amc: "Edelweiss", inception: "24-Oct-25", inceptNav: 10.0102, endNav: 10.2206, m1: -1.42, m3: -0.80, sinceInception: 2.10, color: "#3498db" },
  { name: "Magnum Hybrid L-S", short: "Magnum", amc: "SBI", inception: "29-Oct-25", inceptNav: 10.0357, endNav: 9.9939, m1: -1.90, m3: -2.38, sinceInception: -0.42, color: "#f39c12" },
  { name: "Titanium Hybrid L-S", short: "Titanium", amc: "Tata", inception: "17-Dec-25", inceptNav: 10.0029, endNav: 9.41, m1: -6.16, m3: -6.50, sinceInception: -5.93, color: "#e74c3c" },
  { name: "iSIF Hybrid L-S", short: "iSIF", amc: "ICICI Prudential", inception: "05-Feb-26", inceptNav: 10.0179, endNav: 9.2301, m1: -6.29, m3: -7.86, sinceInception: -7.86, color: "#22c55e" },
];

const marchReturnData = hybridFunds
  .map(f => ({ name: f.short, return: f.m1, color: f.color, amc: f.amc }))
  .sort((a, b) => b.return - a.return);

const sinceInceptionData = hybridFunds
  .map(f => ({ name: f.short, return: f.sinceInception, color: f.color, amc: f.amc }))
  .sort((a, b) => b.return - a.return);

const chartConfig = {
  return: { label: "Return (%)", color: "#10b981" },
};

const keyInsights = [
  { icon: Trophy, color: "text-emerald-600", title: "Best in March", text: "Arudha at +0.07% — the only fund to close positive. Hedging strategy effectively cushioned against the selloff." },
  { icon: AlertTriangle, color: "text-red-600", title: "Worst in March", text: "iSIF at -6.29% — the steepest monthly decline, suggesting high net long exposure during the downturn." },
  { icon: TrendingDown, color: "text-amber-600", title: "Titanium -6.16%", text: "Second-worst performer. Long book hit hard by broad market weakness." },
  { icon: BarChart3, color: "text-blue-600", title: "5 of 6 funds in the red", text: "Category average return: -2.76% for March. Only Arudha stayed above water." },
  { icon: TrendingUp, color: "text-emerald-600", title: "Best Since Inception", text: "Altiva at +2.10% retains the best overall track record despite -1.42% in March." },
];

const ReturnCell = ({ value }: { value: number | null }) => {
  if (value === null) return <span className="text-muted-foreground text-sm">N/A</span>;
  const isPositive = value > 0;
  const isNegative = value < 0;
  return (
    <span className={`font-semibold tabular-nums ${isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`}>
      {isPositive ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
};

const PerformanceMar2026 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-10 lg:py-14 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <Calendar className="w-3 h-3 mr-1" />
              March 2026 Analysis
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Hybrid Long-Short SIF Returns
              <span className="text-primary block mt-2">March 2026</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-2">
              6 Funds Analyzed • NAV Data: 02-Mar-2026 to 30-Mar-2026
            </p>
            <div className="mt-4 inline-flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left max-w-xl">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-400">
                <strong>March Context:</strong> Broad market selloff driven by FII outflows & global risk-off. Nifty tested multi-month lows — long books across category faced headwinds.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">6 Funds</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">02–30 Mar 2026</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
                <Target className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">Direct Growth NAVs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stat Cards */}
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  <p className="text-2xl md:text-3xl font-bold text-emerald-600">+0.07%</p>
                  <p className="text-xs text-muted-foreground mt-1">Best March Return</p>
                  <p className="text-xs font-medium mt-0.5">Arudha</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  <p className="text-2xl md:text-3xl font-bold text-red-600">-6.29%</p>
                  <p className="text-xs text-muted-foreground mt-1">Worst March Return</p>
                  <p className="text-xs font-medium mt-0.5">iSIF</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  <p className="text-2xl md:text-3xl font-bold text-foreground">-2.76%</p>
                  <p className="text-xs text-muted-foreground mt-1">Category Avg (Mar)</p>
                  <p className="text-xs font-medium mt-0.5">5 of 6 negative</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  <p className="text-2xl md:text-3xl font-bold text-emerald-600">+2.10%</p>
                  <p className="text-xs text-muted-foreground mt-1">Best Since Inception</p>
                  <p className="text-xs font-medium mt-0.5">Altiva</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Returns Table */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Badge className="mb-2 bg-blue-500/10 text-blue-600 border-blue-500/30">Hybrid Long Short</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold">March 2026 — Returns Summary</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                1M: 02-Mar to 30-Mar-2026 • 3M: Jan–Mar 2026 • Since Inception: NFO launch to 30-Mar-2026
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Fund</th>
                      <th className="text-center px-3 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Inception</th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Incep. NAV</th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground">End NAV<br/><span className="text-[10px]">(30-Mar)</span></th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground">1M<br/><span className="text-[10px]">(Mar)</span></th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">3M<br/><span className="text-[10px]">(Jan–Mar)</span></th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground">Since<br/>Inception</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {hybridFunds.map((fund) => (
                      <tr key={fund.name} className="hover:bg-muted/10 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-sm text-foreground">{fund.name}</p>
                          <p className="text-[11px] text-muted-foreground">{fund.amc}</p>
                        </td>
                        <td className="text-center px-3 py-3 text-xs text-muted-foreground hidden sm:table-cell">{fund.inception}</td>
                        <td className="text-right px-3 py-3 text-xs tabular-nums text-muted-foreground hidden md:table-cell">
                          ₹{fund.inceptNav.toFixed(4)}
                        </td>
                        <td className="text-right px-3 py-3 text-sm font-medium tabular-nums">
                          ₹{fund.endNav.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                        </td>
                        <td className="text-right px-3 py-3"><ReturnCell value={fund.m1} /></td>
                        <td className="text-right px-3 py-3 hidden sm:table-cell"><ReturnCell value={fund.m3} /></td>
                        <td className="text-right px-3 py-3"><ReturnCell value={fund.sinceInception} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <div className="mt-3 flex gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-lg bg-muted/40 border border-border/40">
                <p className="text-[11px] text-muted-foreground">
                  <Info className="w-3 h-3 inline mr-1" />
                  Arudha & iSIF launched after Jan-2026 — 3M return = Since Inception
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-10 lg:py-14 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Key Insights</h2>
            <div className="grid gap-3">
              {keyInsights.map((insight, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center shrink-0`}>
                      <insight.icon className={`w-4 h-4 ${insight.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{insight.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{insight.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* March Returns */}
              <div>
                <h2 className="text-xl font-bold mb-1">March 2026 Returns</h2>
                <p className="text-sm text-muted-foreground mb-4">1-month returns ranked best to worst</p>
                <Card className="p-4">
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <BarChart data={marchReturnData} layout="vertical" margin={{ top: 5, right: 40, left: 70, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tickFormatter={(v) => `${v.toFixed(1)}%`} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={65} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload?.[0]) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-background border border-border p-2 rounded shadow-lg text-sm">
                                <p className="font-medium">{d.name}</p>
                                <p className="text-xs text-muted-foreground">{d.amc}</p>
                                <p className={`font-bold ${d.return >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {d.return >= 0 ? '+' : ''}{d.return.toFixed(2)}%
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                        {marchReturnData.map((entry, index) => (
                          <Cell key={index} fill={entry.return >= 0 ? '#10b981' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </Card>
              </div>

              {/* Since Inception */}
              <div>
                <h2 className="text-xl font-bold mb-1">Since Inception Leaderboard</h2>
                <p className="text-sm text-muted-foreground mb-4">Cumulative returns from NFO to 30-Mar-2026</p>
                <Card className="p-4">
                  <ChartContainer config={chartConfig} className="h-[260px] w-full">
                    <BarChart data={sinceInceptionData} layout="vertical" margin={{ top: 5, right: 40, left: 70, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tickFormatter={(v) => `${v.toFixed(1)}%`} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={65} />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload?.[0]) {
                            const d = payload[0].payload;
                            return (
                              <div className="bg-background border border-border p-2 rounded shadow-lg text-sm">
                                <p className="font-medium">{d.name}</p>
                                <p className="text-xs text-muted-foreground">{d.amc}</p>
                                <p className={`font-bold ${d.return >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                  {d.return >= 0 ? '+' : ''}{d.return.toFixed(2)}%
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                        {sinceInceptionData.map((entry, index) => (
                          <Cell key={index} fill={entry.return >= 0 ? '#10b981' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Individual Fund Scorecards */}
        <section className="py-10 lg:py-14 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Individual Fund Scorecards</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hybridFunds.map((fund) => (
                <Card key={fund.name} className="overflow-hidden">
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-8 rounded-full" style={{ backgroundColor: fund.color }} />
                      <div>
                        <CardTitle className="text-sm font-bold">{fund.short}</CardTitle>
                        <p className="text-[11px] text-muted-foreground">{fund.amc} • {fund.inception}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4">
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="rounded-lg bg-muted/40 p-2 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Incep. NAV</p>
                        <p className="text-sm font-semibold tabular-nums">₹{fund.inceptNav.toFixed(4)}</p>
                      </div>
                      <div className="rounded-lg bg-muted/40 p-2 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">End NAV</p>
                        <p className="text-sm font-semibold tabular-nums">₹{fund.endNav.toFixed(4)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground">1M</p>
                        <ReturnCell value={fund.m1} />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground">3M</p>
                        <ReturnCell value={fund.m3} />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-muted-foreground">Overall</p>
                        <ReturnCell value={fund.sinceInception} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Market Context */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">March 2026 Market Context</h2>
            <Card className="border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Broad Market Selloff</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      FII net outflows continued in March 2026, with the Nifty testing multi-month lows. 
                      Long books across the Hybrid Long-Short category faced significant headwinds. Nifty 50 fell -11.30% and the Hybrid 50:50 benchmark fell -6.35% in March.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Severe Drawdowns in 2 Funds</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      iSIF (-6.29%) and Titanium (-6.16%) were hit hardest, suggesting higher net long exposure 
                      during the downturn. Both have accumulated significant since-inception losses (-7.86% and -5.93% respectively).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Hedging Works</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Arudha's +0.07% in a month where its benchmark (Hybrid 50:50) fell -6.35% demonstrates effective hedging. 
                      Altiva retains the best since-inception at +2.10% despite -1.42% in March — showing 
                      compounding gains from better months can offset drawdowns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 space-y-3">
            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">Source:</span> AMFI (amfiindia.com) • Direct Plan — Growth Option • NAV as of 30-Mar-2026
            </p>
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-amber-600">Disclaimer:</strong> NAV data sourced from AMFI. 1M return: 02-Mar-2026 to 30-Mar-2026. 
                  3M return: first available NAV in Jan-2026 to 30-Mar-2026. Since Inception: from respective NFO launch date. 
                  For funds launched after Jan-2026 (Arudha, iSIF), 3M return equals Since Inception return. 
                  Investments in SIFs involve market risk including possible loss of principal. Past performance is not indicative 
                  of future returns. Please read all SIDs and KIMs carefully before investing. Consult a SEBI-registered Investment 
                  Advisor for personalized advice.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PerformanceMar2026;
