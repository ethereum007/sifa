"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingDown,
  BarChart3,
  Target,
  Activity,
  Calendar,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";



const funds = [
  { name: "iSIF Ex-Top 100 L-S", short: "iSIF", amc: "ICICI Prudential", inception: "05-Feb-26", inceptNav: 9.99, endNav: 9.02, m1: -7.30, m3: -9.71, sinceInception: -9.71, color: "#22c55e", note: "3M = Since Inception" },
  { name: "qSIF Ex-Top 100 L-S", short: "qSIF", amc: "Quant", inception: "13-Nov-25", inceptNav: 10.0111, endNav: 8.608, m1: -6.27, m3: -13.03, sinceInception: -14.02, color: "#9b59b6" },
];

const marchData = funds.map(f => ({ name: f.short, return: f.m1, color: f.color, amc: f.amc })).sort((a, b) => b.return - a.return);
const siData = funds.map(f => ({ name: f.short, return: f.sinceInception, color: f.color, amc: f.amc })).sort((a, b) => b.return - a.return);

const chartConfig = { return: { label: "Return (%)", color: "#10b981" } };

const keyInsights = [
  { icon: AlertTriangle, color: "text-red-600", title: "qSIF: -14.02% since inception", text: "The deepest drawdown across the ENTIRE SIF universe (all categories combined). Launched Nov-25, midcap/smallcap heavy exposure amplified market losses significantly." },
  { icon: TrendingDown, color: "text-red-600", title: "Hardest hit category", text: "Ex-Top 100 averaged -6.79% in March vs Hybrid L-S (-2.76%) and Equity L-S (-4.96%). No large-cap defensive buffer during the selloff." },
  { icon: BarChart3, color: "text-amber-600", title: "Both funds deep in red", text: "iSIF at -9.71% and qSIF at -14.02% since inception. No fund in this category has delivered positive returns since launch." },
  { icon: Info, color: "text-blue-600", title: "iSIF: Launched Feb 2026", text: "3M return equals Since Inception — insufficient history for full Jan–Mar window. Already down -9.71% in under 2 months." },
];

const ReturnCell = ({ value }: { value: number | null }) => {
  if (value === null) return <span className="text-muted-foreground text-sm">N/A</span>;
  const pos = value > 0;
  const neg = value < 0;
  return (
    <span className={`font-semibold tabular-nums ${pos ? 'text-emerald-600' : neg ? 'text-red-600' : 'text-muted-foreground'}`}>
      {pos ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
};

const PerformanceMar2026ExTop100 = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="py-10 lg:py-14 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            <Calendar className="w-3 h-3 mr-1" /> March 2026 Analysis
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Ex-Top 100 Long-Short SIF Returns
            <span className="text-primary block mt-2">March 2026</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-2">
            2 Funds Analyzed • NAV Data up to 30-Mar-2026
          </p>
          <div className="mt-4 inline-flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-left max-w-xl">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400">
              <strong>Alert:</strong> Ex-Top 100 category hit hardest across all SIF fund types in March 2026. qSIF -14.02% since inception is the worst drawdown in the entire SIF universe.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
              <BarChart3 className="w-3.5 h-3.5 text-primary" /><span className="font-medium">2 Funds</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
              <Activity className="w-3.5 h-3.5 text-primary" /><span className="font-medium">Up to 30 Mar 2026</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
              <Target className="w-3.5 h-3.5 text-primary" /><span className="font-medium">Direct Growth NAVs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-red-600">-6.27%</p>
              <p className="text-xs text-muted-foreground mt-1">Best March Return</p>
              <p className="text-xs font-medium mt-0.5">qSIF</p>
            </CardContent></Card>
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-red-600">-7.30%</p>
              <p className="text-xs text-muted-foreground mt-1">Worst March Return</p>
              <p className="text-xs font-medium mt-0.5">iSIF</p>
            </CardContent></Card>
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-foreground">-6.79%</p>
              <p className="text-xs text-muted-foreground mt-1">Category Avg (Mar)</p>
              <p className="text-xs font-medium mt-0.5">Both negative</p>
            </CardContent></Card>
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-red-600">-14.02%</p>
              <p className="text-xs text-muted-foreground mt-1">Worst Since Inception</p>
              <p className="text-xs font-medium mt-0.5">qSIF (worst in SIF universe)</p>
            </CardContent></Card>
          </div>
        </div>
      </section>

      {/* Returns Table */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Badge className="mb-2 bg-purple-500/10 text-purple-600 border-purple-500/30">Equity Ex-Top 100</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold">March 2026 — Returns Summary</h2>
            <p className="text-muted-foreground mt-1 text-sm">1M: up to 30-Mar-2026 • 3M: Jan–Mar 2026 • Since Inception: NFO launch to 30-Mar-2026</p>
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
                  {funds.map(fund => (
                    <tr key={fund.name} className="hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-sm text-foreground">{fund.name}</p>
                        <p className="text-[11px] text-muted-foreground">{fund.amc}{fund.note ? ` • ${fund.note}` : ''}</p>
                      </td>
                      <td className="text-center px-3 py-3 text-xs text-muted-foreground hidden sm:table-cell">{fund.inception}</td>
                      <td className="text-right px-3 py-3 text-xs tabular-nums text-muted-foreground hidden md:table-cell">₹{fund.inceptNav.toFixed(4)}</td>
                      <td className="text-right px-3 py-3 text-sm font-medium tabular-nums">₹{fund.endNav.toFixed(4)}</td>
                      <td className="text-right px-3 py-3"><ReturnCell value={fund.m1} /></td>
                      <td className="text-right px-3 py-3 hidden sm:table-cell"><ReturnCell value={fund.m3} /></td>
                      <td className="text-right px-3 py-3"><ReturnCell value={fund.sinceInception} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-10 lg:py-14 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">Key Insights</h2>
          <div className="grid gap-3">
            {keyInsights.map((insight, i) => (
              <Card key={i}><CardContent className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{insight.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{insight.text}</p>
                </div>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-1">March 2026 Returns</h2>
              <p className="text-sm text-muted-foreground mb-4">1-month returns comparison</p>
              <Card className="p-4">
                <ChartContainer config={chartConfig} className="h-[160px] w-full">
                  <BarChart data={marchData} layout="vertical" margin={{ top: 5, right: 40, left: 50, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={v => `${v.toFixed(1)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={45} />
                    <ChartTooltip content={({ active, payload }) => {
                      if (active && payload?.[0]) { const d = payload[0].payload; return (
                        <div className="bg-background border border-border p-2 rounded shadow-lg text-sm">
                          <p className="font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.amc}</p>
                          <p className="font-bold text-red-600">{d.return.toFixed(2)}%</p>
                        </div>
                      ); } return null;
                    }} />
                    <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                      {marchData.map((_, i) => <Cell key={i} fill="#ef4444" />)}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </Card>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Since Inception</h2>
              <p className="text-sm text-muted-foreground mb-4">Cumulative returns from NFO to 30-Mar-2026</p>
              <Card className="p-4">
                <ChartContainer config={chartConfig} className="h-[160px] w-full">
                  <BarChart data={siData} layout="vertical" margin={{ top: 5, right: 40, left: 50, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={v => `${v.toFixed(1)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={45} />
                    <ChartTooltip content={({ active, payload }) => {
                      if (active && payload?.[0]) { const d = payload[0].payload; return (
                        <div className="bg-background border border-border p-2 rounded shadow-lg text-sm">
                          <p className="font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.amc}</p>
                          <p className="font-bold text-red-600">{d.return.toFixed(2)}%</p>
                        </div>
                      ); } return null;
                    }} />
                    <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                      {siData.map((_, i) => <Cell key={i} fill="#ef4444" />)}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Scorecards */}
      <section className="py-10 lg:py-14 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">Individual Fund Scorecards</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {funds.map(fund => (
              <Card key={fund.name} className="overflow-hidden">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: fund.color }} />
                    <div>
                      <CardTitle className="text-sm font-bold">{fund.name}</CardTitle>
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
                    <div className="text-center"><p className="text-[10px] text-muted-foreground">1M</p><ReturnCell value={fund.m1} /></div>
                    <div className="text-center"><p className="text-[10px] text-muted-foreground">3M</p><ReturnCell value={fund.m3} /></div>
                    <div className="text-center"><p className="text-[10px] text-muted-foreground">Overall</p><ReturnCell value={fund.sinceInception} /></div>
                  </div>
                  {fund.note && <p className="text-[10px] text-muted-foreground mt-2 italic">{fund.note}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Category Context */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">Cross-Category Comparison (March 2026)</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Category</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Avg 1M Return</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Impact Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr className="hover:bg-muted/10"><td className="px-4 py-3 text-sm font-medium">Hybrid Long-Short</td><td className="text-right px-4 py-3"><ReturnCell value={-2.76} /></td><td className="text-right px-4 py-3 text-xs text-amber-600 font-medium">Moderate</td></tr>
                  <tr className="hover:bg-muted/10"><td className="px-4 py-3 text-sm font-medium">Equity Long-Short</td><td className="text-right px-4 py-3"><ReturnCell value={-4.96} /></td><td className="text-right px-4 py-3 text-xs text-red-500 font-medium">High</td></tr>
                  <tr className="bg-red-50/50 dark:bg-red-950/20"><td className="px-4 py-3 text-sm font-bold">Ex-Top 100 Long-Short</td><td className="text-right px-4 py-3"><ReturnCell value={-6.79} /></td><td className="text-right px-4 py-3 text-xs text-red-600 font-bold">Severe</td></tr>
                </tbody>
              </table>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground mt-3">
            The midcap/smallcap mandate of Ex-Top 100 funds meant no large-cap defensive buffer during the broad selloff.
          </p>
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
                <strong className="text-amber-600">Disclaimer:</strong> NAV data sourced from AMFI. iSIF Ex-Top 100 launched 05-Feb-2026 — 
                3M return equals Since Inception. Ex-Top 100 funds invest primarily in stocks outside the Nifty 100 index, carrying higher 
                volatility and risk. Past performance is not indicative of future returns. Please consult a SEBI-registered Investment Advisor before investing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PerformanceMar2026ExTop100;
