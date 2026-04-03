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
  { name: "qSIF Equity L-S", short: "qSIF", amc: "Quant", inception: "08-Oct-25", inceptNav: 10.0054, endNav: 8.9276, m1: -8.23, m3: -11.68, sinceInception: -10.77, color: "#9b59b6" },
  { name: "Diviniti Equity L-S", short: "Diviniti", amc: "Edelweiss", inception: "03-Dec-25", inceptNav: 1000.953, endNav: 948.4589, m1: -2.24, m3: -5.61, sinceInception: -5.24, color: "#3498db", note: "₹1,000 face value" },
  { name: "Dyna Equity L-S", short: "Dyna", amc: "360 ONE", inception: "27-Feb-26", inceptNav: 10.0072, endNav: 9.568, m1: -4.42, m3: -4.39, sinceInception: -4.39, color: "#f39c12", note: "3M = Since Inception" },
  { name: "Arudha Equity L-S", short: "Arudha", amc: "Bandhan", inception: "30-Mar-26", inceptNav: 9.826, endNav: 9.826, m1: null, m3: null, sinceInception: null, color: "#64748b", note: "Just launched" },
];

const activeFunds = funds.filter(f => f.m1 !== null);
const marchData = activeFunds.map(f => ({ name: f.short, return: f.m1!, color: f.color, amc: f.amc })).sort((a, b) => b.return - a.return);
const siData = activeFunds.map(f => ({ name: f.short, return: f.sinceInception!, color: f.color, amc: f.amc })).sort((a, b) => b.return - a.return);

const chartConfig = { return: { label: "Return (%)", color: "#10b981" } };

const keyInsights = [
  { icon: AlertTriangle, color: "text-red-600", title: "Worst: qSIF -8.23%", text: "Deepest monthly drop in the Equity L-S category. Since inception at -10.77% — worst track record among all SIF categories." },
  { icon: BarChart3, color: "text-blue-600", title: "All 3 funds in the red", text: "Category average -4.96% for March. No fund managed a positive return." },
  { icon: TrendingDown, color: "text-amber-600", title: "Best: Diviniti -2.24%", text: "Most defensive of the three — but still negative. Operates on ₹1,000 face value (returns % are comparable)." },
  { icon: Info, color: "text-muted-foreground", title: "New entrant: Arudha ELS", text: "Launched 30-Mar-2026. No return data available yet — will appear with data from April." },
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

const PerformanceMar2026EquityLongShort = () => (
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
            Equity Long-Short SIF Returns
            <span className="text-primary block mt-2">March 2026</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-2">
            4 Funds Analyzed • NAV Data up to 30-Mar-2026
          </p>
          <div className="mt-4 inline-flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left max-w-xl">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-400">
              <strong>Note:</strong> Diviniti operates on ₹1,000 face value — NAV levels not comparable to ₹10-based funds but percentage returns are directly comparable.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm">
              <BarChart3 className="w-3.5 h-3.5 text-primary" /><span className="font-medium">4 Funds</span>
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
              <p className="text-2xl md:text-3xl font-bold text-red-600">-2.24%</p>
              <p className="text-xs text-muted-foreground mt-1">Best March Return</p>
              <p className="text-xs font-medium mt-0.5">Diviniti</p>
            </CardContent></Card>
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-red-600">-8.23%</p>
              <p className="text-xs text-muted-foreground mt-1">Worst March Return</p>
              <p className="text-xs font-medium mt-0.5">qSIF</p>
            </CardContent></Card>
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-foreground">-4.96%</p>
              <p className="text-xs text-muted-foreground mt-1">Category Avg (Mar)</p>
              <p className="text-xs font-medium mt-0.5">All 3 negative</p>
            </CardContent></Card>
            <Card className="text-center"><CardContent className="pt-5 pb-4">
              <p className="text-2xl md:text-3xl font-bold text-red-600">-10.77%</p>
              <p className="text-xs text-muted-foreground mt-1">Worst Since Inception</p>
              <p className="text-xs font-medium mt-0.5">qSIF</p>
            </CardContent></Card>
          </div>
        </div>
      </section>

      {/* Returns Table */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Badge className="mb-2 bg-amber-500/10 text-amber-600 border-amber-500/30">Equity Long Short</Badge>
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
                      <td className="text-right px-3 py-3 text-xs tabular-nums text-muted-foreground hidden md:table-cell">
                        ₹{fund.inceptNav < 100 ? fund.inceptNav.toFixed(4) : fund.inceptNav.toFixed(3)}
                      </td>
                      <td className="text-right px-3 py-3 text-sm font-medium tabular-nums">
                        ₹{fund.endNav < 100 ? fund.endNav.toFixed(4) : fund.endNav.toFixed(4)}
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
              <p className="text-sm text-muted-foreground mb-4">1-month returns (3 funds with data)</p>
              <Card className="p-4">
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <BarChart data={marchData} layout="vertical" margin={{ top: 5, right: 40, left: 70, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={v => `${v.toFixed(1)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={65} />
                    <ChartTooltip content={({ active, payload }) => {
                      if (active && payload?.[0]) { const d = payload[0].payload; return (
                        <div className="bg-background border border-border p-2 rounded shadow-lg text-sm">
                          <p className="font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.amc}</p>
                          <p className={`font-bold ${d.return >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{d.return >= 0 ? '+' : ''}{d.return.toFixed(2)}%</p>
                        </div>
                      ); } return null;
                    }} />
                    <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                      {marchData.map((e, i) => <Cell key={i} fill={e.return >= 0 ? '#10b981' : '#ef4444'} />)}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </Card>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Since Inception Leaderboard</h2>
              <p className="text-sm text-muted-foreground mb-4">Cumulative returns from NFO to 30-Mar-2026</p>
              <Card className="p-4">
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <BarChart data={siData} layout="vertical" margin={{ top: 5, right: 40, left: 70, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={v => `${v.toFixed(1)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={65} />
                    <ChartTooltip content={({ active, payload }) => {
                      if (active && payload?.[0]) { const d = payload[0].payload; return (
                        <div className="bg-background border border-border p-2 rounded shadow-lg text-sm">
                          <p className="font-medium">{d.name}</p><p className="text-xs text-muted-foreground">{d.amc}</p>
                          <p className={`font-bold ${d.return >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{d.return >= 0 ? '+' : ''}{d.return.toFixed(2)}%</p>
                        </div>
                      ); } return null;
                    }} />
                    <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                      {siData.map((e, i) => <Cell key={i} fill={e.return >= 0 ? '#10b981' : '#ef4444'} />)}
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
                      <CardTitle className="text-sm font-bold">{fund.short}</CardTitle>
                      <p className="text-[11px] text-muted-foreground">{fund.amc} • {fund.inception}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="rounded-lg bg-muted/40 p-2 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Incep. NAV</p>
                      <p className="text-sm font-semibold tabular-nums">₹{fund.inceptNav < 100 ? fund.inceptNav.toFixed(4) : fund.inceptNav.toFixed(3)}</p>
                    </div>
                    <div className="rounded-lg bg-muted/40 p-2 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">End NAV</p>
                      <p className="text-sm font-semibold tabular-nums">₹{fund.endNav < 100 ? fund.endNav.toFixed(4) : fund.endNav.toFixed(4)}</p>
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

      {/* Market Context */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">March 2026 Category Context</h2>
          <Card className="border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Pure Equity Exposure Amplified Losses</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Equity Long-Short SIFs took a harder hit than Hybrid peers this month. Pure equity exposure in long books 
                    amplified losses during the broad market selloff. Category average of -4.96% vs Hybrid average of -2.76%.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingDown className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">qSIF: Deepest Drawdown</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    qSIF (oldest fund, Oct-25) has accumulated a -10.77% drawdown since inception — one of the most 
                    concerning numbers across the entire SIF universe.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Diviniti Most Resilient</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Diviniti remains the most resilient at -2.24% in March despite operating on a non-standard ₹1,000 face value.
                    Two new entrants (Dyna, Arudha) join the category with limited data.
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
                <strong className="text-amber-600">Disclaimer:</strong> NAV data sourced from AMFI. Diviniti operates on ₹1,000 face value — 
                NAV levels not directly comparable to ₹10-based funds but percentage returns are. Dyna launched 27-Feb-2026 — 3M return equals 
                Since Inception. Arudha ELS launched 30-Mar-2026 — no return data yet. Past performance is not indicative of future returns. 
                Please consult a SEBI-registered Investment Advisor before investing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default PerformanceMar2026EquityLongShort;
