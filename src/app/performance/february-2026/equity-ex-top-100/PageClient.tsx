"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {


  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Tab 1: Performance Summary
const performanceSummary = [
  {
    name: "iSIF Ex-Top 100", amc: "ICICI Prudential", color: "#22c55e",
    inception: "05 Feb 2026", startNav: 9.99, endNav: 9.87,
    monthReturn: -1.20, tradingDays: 17, positiveDays: 10, negativeDays: 5,
    hitRate: 62.5, peakNav: 10.07, troughNav: 9.87, navRange: 0.20,
    maxDrawdown: -1.99, avgDailyReturn: -0.074, dailyVol: 0.499,
    bestDay: 0.60, worstDay: -1.00,
  },
  {
    name: "qSIF Ex-Top 100", amc: "Quant", color: "#9b59b6",
    inception: "02 Feb 2026", startNav: 9.3212, endNav: 9.3161,
    monthReturn: -0.05, tradingDays: 20, positiveDays: 8, negativeDays: 11,
    hitRate: 42.1, peakNav: 9.6913, troughNav: 9.3161, navRange: 0.3752,
    maxDrawdown: -3.87, avgDailyReturn: 0.000, dailyVol: 0.822,
    bestDay: 2.17, worstDay: -1.45,
  },
];

// Tab 2: Daily NAV data
const dailyNavData = [
  { date: "02-Feb", isif: null, qsif: 9.3212 },
  { date: "03-Feb", isif: null, qsif: 9.5232 },
  { date: "04-Feb", isif: null, qsif: 9.5587 },
  { date: "05-Feb", isif: 9.99, qsif: 9.5456 },
  { date: "06-Feb", isif: 9.99, qsif: 9.5179 },
  { date: "09-Feb", isif: 10.05, qsif: 9.6474 },
  { date: "10-Feb", isif: 10.06, qsif: 9.6913 },
  { date: "11-Feb", isif: 10.07, qsif: 9.6710 },
  { date: "12-Feb", isif: 10.02, qsif: 9.6285 },
  { date: "13-Feb", isif: 9.96, qsif: 9.4891 },
  { date: "16-Feb", isif: 9.97, qsif: 9.4801 },
  { date: "17-Feb", isif: 10.01, qsif: 9.5183 },
  { date: "18-Feb", isif: 10.02, qsif: 9.5307 },
  { date: "19-Feb", isif: 9.94, qsif: 9.4375 },
  { date: "20-Feb", isif: 9.96, qsif: 9.4294 },
  { date: "23-Feb", isif: 9.98, qsif: 9.3741 },
  { date: "24-Feb", isif: 9.90, qsif: 9.3365 },
  { date: "25-Feb", isif: 9.95, qsif: 9.3818 },
  { date: "26-Feb", isif: 9.97, qsif: 9.4049 },
  { date: "27-Feb", isif: 9.87, qsif: 9.3161 },
];

// Tab 3: Normalized (base 100)
const normalizedData = [
  { date: "02-Feb", isif: null, qsif: 100 },
  { date: "03-Feb", isif: null, qsif: 102.167 },
  { date: "04-Feb", isif: null, qsif: 102.548 },
  { date: "05-Feb", isif: 100, qsif: 102.407 },
  { date: "06-Feb", isif: 100, qsif: 102.11 },
  { date: "09-Feb", isif: 100.601, qsif: 103.5 },
  { date: "10-Feb", isif: 100.701, qsif: 103.971 },
  { date: "11-Feb", isif: 100.801, qsif: 103.753 },
  { date: "12-Feb", isif: 100.3, qsif: 103.297 },
  { date: "13-Feb", isif: 99.7, qsif: 101.801 },
  { date: "16-Feb", isif: 99.8, qsif: 101.705 },
  { date: "17-Feb", isif: 100.2, qsif: 102.115 },
  { date: "18-Feb", isif: 100.3, qsif: 102.248 },
  { date: "19-Feb", isif: 99.499, qsif: 101.248 },
  { date: "20-Feb", isif: 99.7, qsif: 101.161 },
  { date: "23-Feb", isif: 99.9, qsif: 100.568 },
  { date: "24-Feb", isif: 99.099, qsif: 100.164 },
  { date: "25-Feb", isif: 99.6, qsif: 100.65 },
  { date: "26-Feb", isif: 99.8, qsif: 100.898 },
  { date: "27-Feb", isif: 98.799, qsif: 99.945 },
];

const chartConfig = {
  isif: { label: "iSIF Ex-Top 100 (ICICI)", color: "#22c55e" },
  qsif: { label: "qSIF Ex-Top 100 (Quant)", color: "#9b59b6" },
};

const comparisonWinners = [
  { metric: "February Return", winner: "qSIF", detail: "-0.05% vs -1.20%" },
  { metric: "Hit Rate", winner: "iSIF", detail: "62.5% vs 42.1%" },
  { metric: "Max Drawdown", winner: "iSIF", detail: "-1.99% vs -3.87%" },
  { metric: "Daily Volatility", winner: "iSIF", detail: "0.499% vs 0.822%" },
  { metric: "Best Single Day", winner: "qSIF", detail: "+2.17% vs +0.60%" },
];

const PerformanceFeb2026EquityExTop100 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              <Calendar className="w-3 h-3 mr-1" />
              February 2026 Monthly Report
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              SIF Equity Ex-Top 100
              <span className="text-primary block mt-2">Monthly Performance</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Head-to-head NAV analysis of iSIF & qSIF Equity Ex-Top 100 Long-Short funds for February 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">2 Funds Compared</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Feb 02–27, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Direct Plan - Growth</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Lower Loss</span>
                  </div>
                  <p className="font-bold text-foreground">qSIF Ex-Top 100</p>
                  <p className="text-red-500 font-bold text-lg">-0.05%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Better Hit Rate</span>
                  </div>
                  <p className="font-bold text-foreground">iSIF Ex-Top 100</p>
                  <p className="text-emerald-600 font-bold text-lg">62.5%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Lower Drawdown</span>
                  </div>
                  <p className="font-bold text-foreground">iSIF Ex-Top 100</p>
                  <p className="text-red-500 font-bold text-lg">-1.99%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Lower Volatility</span>
                  </div>
                  <p className="font-bold text-foreground">iSIF Ex-Top 100</p>
                  <p className="text-foreground font-bold text-lg">0.499%</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Performance Summary Table */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Performance Summary</h2>
              <p className="text-muted-foreground mt-2">February 2026 • Direct Plan Growth Option</p>
            </div>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Metric</TableHead>
                    {performanceSummary.map(f => (
                      <TableHead key={f.name} className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                          <span>{f.name}</span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: "Inception Date", key: "inception", format: "text" },
                    { label: "Starting NAV", key: "startNav", format: "nav" },
                    { label: "Ending NAV", key: "endNav", format: "nav" },
                    { label: "February Return", key: "monthReturn", format: "pct" },
                    { label: "Trading Days", key: "tradingDays", format: "num" },
                    { label: "Positive Days", key: "positiveDays", format: "num" },
                    { label: "Negative Days", key: "negativeDays", format: "num" },
                    { label: "Hit Rate", key: "hitRate", format: "pctPlain" },
                    { label: "Peak NAV", key: "peakNav", format: "nav" },
                    { label: "Trough NAV", key: "troughNav", format: "nav" },
                    { label: "Max Drawdown", key: "maxDrawdown", format: "pct" },
                    { label: "Avg Daily Return", key: "avgDailyReturn", format: "pct3" },
                    { label: "Daily Volatility", key: "dailyVol", format: "pct3" },
                    { label: "Best Single Day", key: "bestDay", format: "pct" },
                    { label: "Worst Single Day", key: "worstDay", format: "pct" },
                  ].map(row => (
                    <TableRow key={row.label}>
                      <TableCell className="font-medium text-sm">{row.label}</TableCell>
                      {performanceSummary.map(f => {
                        const val = (f as any)[row.key];
                        let display: string;
                        if (row.format === "text") display = val;
                        else if (row.format === "nav") display = `₹${Number(val).toFixed(4)}`;
                        else if (row.format === "pct") display = `${val >= 0 ? "+" : ""}${Number(val).toFixed(2)}%`;
                        else if (row.format === "pct3") display = `${val >= 0 ? "+" : ""}${Number(val).toFixed(3)}%`;
                        else if (row.format === "pctPlain") display = `${Number(val).toFixed(1)}%`;
                        else display = String(val);
                        const isReturn = row.format === "pct" || row.format === "pct3";
                        return (
                          <TableCell key={f.name} className={`text-right tabular-nums text-sm ${isReturn ? (val >= 0 ? "text-emerald-600 font-semibold" : "text-red-600 font-semibold") : ""}`}>
                            {display}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* Daily NAV Trend Chart */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Daily NAV Trend — February 2026</h2>
              <p className="text-muted-foreground mt-2">Absolute NAV movements for both Equity Ex-Top 100 funds</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[350px] sm:h-[420px] w-full">
                <LineChart data={dailyNavData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} domain={[9.2, 10.2]} tickFormatter={(v) => `₹${v.toFixed(1)}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="isif" name="iSIF Ex-Top 100" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="qsif" name="qSIF Ex-Top 100" stroke="#9b59b6" strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Normalized Performance Chart */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Normalized Performance (Base: 100)</h2>
              <p className="text-muted-foreground mt-2">Indexed to inception NAV for a fair comparison</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[350px] sm:h-[420px] w-full">
                <LineChart data={normalizedData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} domain={[98, 105]} tickFormatter={(v) => v.toFixed(1)} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="isif" name="iSIF (Indexed)" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="qsif" name="qSIF (Indexed)" stroke="#9b59b6" strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Fund Cards */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Fund Performance Cards</h2>
              <p className="text-muted-foreground mt-2">Detailed snapshot of each fund's February performance</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {performanceSummary.map(fund => (
                <Card key={fund.name} className="overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: fund.color }} />
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-lg text-foreground">{fund.name}</p>
                        <p className="text-xs text-muted-foreground">{fund.amc}</p>
                      </div>
                      <Badge variant="destructive">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {fund.monthReturn.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ending NAV</span>
                        <span className="font-semibold tabular-nums">₹{fund.endNav.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Starting NAV</span>
                        <span className="tabular-nums">₹{fund.startNav.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peak NAV</span>
                        <span className="tabular-nums text-emerald-600">₹{fund.peakNav.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trough NAV</span>
                        <span className="tabular-nums text-red-500">₹{fund.troughNav.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Drawdown</span>
                        <span className="tabular-nums text-red-500 font-semibold">{fund.maxDrawdown.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hit Rate</span>
                        <span className="tabular-nums font-semibold">{fund.hitRate.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Daily Volatility</span>
                        <span className="tabular-nums">{fund.dailyVol.toFixed(3)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Winners */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Head-to-Head Comparison</h2>
              <p className="text-muted-foreground mt-2">Which fund wins on each metric?</p>
            </div>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">Winner</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonWinners.map(row => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-medium text-sm">{row.metric}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className={row.winner === "iSIF" ? "border-green-500 text-green-700" : "border-purple-500 text-purple-700"}>
                          {row.winner} ✓
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground hidden sm:table-cell">{row.detail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* Return Comparison Bar Chart */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Return Comparison</h2>
              <p className="text-muted-foreground mt-2">February 2026 monthly return side-by-side</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[220px] w-full">
                <BarChart
                  data={performanceSummary.map(f => ({ name: f.name, return: f.monthReturn, color: f.color, amc: f.amc }))}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 120, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tickFormatter={(v) => `${v.toFixed(1)}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={110} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border border-border p-2 rounded shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-xs text-muted-foreground">{data.amc}</p>
                            <p className="font-bold text-red-600">{data.return.toFixed(2)}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                    {performanceSummary.map((f, i) => (
                      <Cell key={i} fill={f.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">Source:</span> AMFI NAV data • Data period: 02-Feb-2026 to 27-Feb-2026 • Direct Plan - Growth Option
            </p>
            <p className="text-xs text-muted-foreground/70">
              Disclaimer: Past performance is not indicative of future results. NAV data sourced from AMFI. All returns are for Direct Plan - Growth option. The information presented is for educational purposes only and does not constitute investment advice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PerformanceFeb2026EquityExTop100;