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

const performanceSummary = [
  { name: "qSIF Equity", amc: "Quant", startNav: 9.6863, endNav: 9.8056, peakNav: 9.9441, troughNav: 9.6863, monthReturn: 1.23, hitRate: 63.2, maxDrawdown: -2.59, avgDailyReturn: 0.066, dailyVol: 0.595, bestDay: 1.49, worstDay: -1.16, positiveDays: 12, negativeDays: 7, color: "#9b59b6" },
  { name: "Diviniti", amc: "ITI", startNav: 988.0553, endNav: 977.6434, peakNav: 995.2829, troughNav: 977.6434, monthReturn: -1.05, hitRate: 68.4, maxDrawdown: -1.77, avgDailyReturn: -0.055, dailyVol: 0.450, bestDay: 0.40, worstDay: -1.03, positiveDays: 13, negativeDays: 6, color: "#e67e22" },
];

const dailyNavData = [
  { date: "02-Feb", qsif: 9.6863, diviniti: 988.0553 },
  { date: "03-Feb", qsif: 9.8305, diviniti: 991.8750 },
  { date: "04-Feb", qsif: 9.8575, diviniti: 995.2829 },
  { date: "05-Feb", qsif: 9.8633, diviniti: 992.0587 },
  { date: "06-Feb", qsif: 9.8602, diviniti: 992.3122 },
  { date: "09-Feb", qsif: 9.9241, diviniti: 994.3212 },
  { date: "10-Feb", qsif: 9.9122, diviniti: 993.5065 },
  { date: "11-Feb", qsif: 9.9441, diviniti: 994.5118 },
  { date: "12-Feb", qsif: 9.9190, diviniti: 994.8071 },
  { date: "13-Feb", qsif: 9.8041, diviniti: 987.2548 },
  { date: "16-Feb", qsif: 9.8584, diviniti: 990.9132 },
  { date: "17-Feb", qsif: 9.8804, diviniti: 991.2977 },
  { date: "18-Feb", qsif: 9.9063, diviniti: 993.9071 },
  { date: "19-Feb", qsif: 9.8179, diviniti: 983.6339 },
  { date: "20-Feb", qsif: 9.8215, diviniti: 987.1805 },
  { date: "23-Feb", qsif: 9.8499, diviniti: 991.1304 },
  { date: "24-Feb", qsif: 9.8367, diviniti: 984.6694 },
  { date: "25-Feb", qsif: 9.8703, diviniti: 984.8663 },
  { date: "26-Feb", qsif: 9.8908, diviniti: 985.8724 },
  { date: "27-Feb", qsif: 9.8056, diviniti: 977.6434 },
];

const normalizedData = [
  { date: "02-Feb", qsif: 100, diviniti: 100 },
  { date: "03-Feb", qsif: 101.489, diviniti: 100.387 },
  { date: "04-Feb", qsif: 101.767, diviniti: 100.731 },
  { date: "05-Feb", qsif: 101.827, diviniti: 100.405 },
  { date: "06-Feb", qsif: 101.795, diviniti: 100.431 },
  { date: "09-Feb", qsif: 102.455, diviniti: 100.634 },
  { date: "10-Feb", qsif: 102.332, diviniti: 100.552 },
  { date: "11-Feb", qsif: 102.661, diviniti: 100.653 },
  { date: "12-Feb", qsif: 102.402, diviniti: 100.683 },
  { date: "13-Feb", qsif: 101.216, diviniti: 99.919 },
  { date: "16-Feb", qsif: 101.777, diviniti: 100.289 },
  { date: "17-Feb", qsif: 102.004, diviniti: 100.328 },
  { date: "18-Feb", qsif: 102.271, diviniti: 100.592 },
  { date: "19-Feb", qsif: 101.359, diviniti: 99.553 },
  { date: "20-Feb", qsif: 101.396, diviniti: 99.911 },
  { date: "23-Feb", qsif: 101.689, diviniti: 100.311 },
  { date: "24-Feb", qsif: 101.553, diviniti: 99.657 },
  { date: "25-Feb", qsif: 101.9, diviniti: 99.677 },
  { date: "26-Feb", qsif: 102.111, diviniti: 99.779 },
  { date: "27-Feb", qsif: 101.232, diviniti: 98.946 },
];

const chartConfig = {
  qsif: { label: "qSIF Equity (Quant)", color: "#9b59b6" },
  diviniti: { label: "Diviniti (ITI)", color: "#e67e22" },
};

const headToHead = [
  { metric: "February Return", qsif: "+1.23%", diviniti: "-1.05%", winner: "qSIF" },
  { metric: "Hit Rate", qsif: "63.2%", diviniti: "68.4%", winner: "Diviniti" },
  { metric: "Max Drawdown", qsif: "-2.59%", diviniti: "-1.77%", winner: "Diviniti" },
  { metric: "Daily Volatility", qsif: "0.595%", diviniti: "0.450%", winner: "Diviniti" },
  { metric: "Best Single Day", qsif: "+1.49%", diviniti: "+0.40%", winner: "qSIF" },
  { metric: "Worst Single Day", qsif: "-1.16%", diviniti: "-1.03%", winner: "Diviniti" },
  { metric: "Avg Daily Return", qsif: "0.066%", diviniti: "-0.055%", winner: "qSIF" },
];

const monthlyReturns = performanceSummary.map(f => ({
  name: f.name,
  return: f.monthReturn,
  color: f.color,
  amc: f.amc,
}));

const PerformanceFeb2026EquityLongShort = () => {
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
              SIF Equity Long-Short
              <span className="text-primary block mt-2">Monthly Performance</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Head-to-head analysis of qSIF Equity Long-Short vs Diviniti Equity Long-Short for February 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">2 Funds Analyzed</span>
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
              <Card className="border-l-4 border-l-emerald-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Best Performer</span>
                  </div>
                  <p className="font-bold text-foreground">qSIF Equity</p>
                  <p className="text-emerald-600 font-bold text-lg">+1.23%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Under Pressure</span>
                  </div>
                  <p className="font-bold text-foreground">Diviniti</p>
                  <p className="text-red-500 font-bold text-lg">-1.05%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">qSIF Hit Rate</span>
                  </div>
                  <p className="font-bold text-foreground text-lg">63.2%</p>
                  <p className="text-xs text-muted-foreground">12 of 19 positive days</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Diviniti Hit Rate</span>
                  </div>
                  <p className="font-bold text-foreground text-lg">68.4%</p>
                  <p className="text-xs text-muted-foreground">13 of 19 positive days</p>
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
                    <TableHead className="text-right">qSIF Equity (Quant)</TableHead>
                    <TableHead className="text-right">Diviniti (ITI)</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Winner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Starting NAV</TableCell>
                    <TableCell className="text-right tabular-nums">₹9.6863</TableCell>
                    <TableCell className="text-right tabular-nums">₹988.0553</TableCell>
                    <TableCell className="text-right hidden sm:table-cell text-muted-foreground">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ending NAV</TableCell>
                    <TableCell className="text-right tabular-nums">₹9.8056</TableCell>
                    <TableCell className="text-right tabular-nums">₹977.6434</TableCell>
                    <TableCell className="text-right hidden sm:table-cell text-muted-foreground">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">February Return</TableCell>
                    <TableCell className="text-right tabular-nums font-bold text-emerald-600">+1.23%</TableCell>
                    <TableCell className="text-right tabular-nums font-bold text-red-600">-1.05%</TableCell>
                    <TableCell className="text-right hidden sm:table-cell font-semibold text-primary">qSIF ✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hit Rate</TableCell>
                    <TableCell className="text-right tabular-nums">63.2%</TableCell>
                    <TableCell className="text-right tabular-nums">68.4%</TableCell>
                    <TableCell className="text-right hidden sm:table-cell font-semibold text-primary">Diviniti ✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Peak NAV</TableCell>
                    <TableCell className="text-right tabular-nums">₹9.9441</TableCell>
                    <TableCell className="text-right tabular-nums">₹995.2829</TableCell>
                    <TableCell className="text-right hidden sm:table-cell text-muted-foreground">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Max Drawdown</TableCell>
                    <TableCell className="text-right tabular-nums text-red-600">-2.59%</TableCell>
                    <TableCell className="text-right tabular-nums text-red-600">-1.77%</TableCell>
                    <TableCell className="text-right hidden sm:table-cell font-semibold text-primary">Diviniti ✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Daily Volatility</TableCell>
                    <TableCell className="text-right tabular-nums">0.595%</TableCell>
                    <TableCell className="text-right tabular-nums">0.450%</TableCell>
                    <TableCell className="text-right hidden sm:table-cell font-semibold text-primary">Diviniti ✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Best Single Day</TableCell>
                    <TableCell className="text-right tabular-nums text-emerald-600">+1.49%</TableCell>
                    <TableCell className="text-right tabular-nums text-emerald-600">+0.40%</TableCell>
                    <TableCell className="text-right hidden sm:table-cell font-semibold text-primary">qSIF ✓</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Worst Single Day</TableCell>
                    <TableCell className="text-right tabular-nums text-red-600">-1.16%</TableCell>
                    <TableCell className="text-right tabular-nums text-red-600">-1.03%</TableCell>
                    <TableCell className="text-right hidden sm:table-cell font-semibold text-primary">Diviniti ✓</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* Normalized Performance Chart */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Normalized Performance (Base 100)</h2>
              <p className="text-muted-foreground mt-2">Equal-weighted comparison from Feb 2 inception</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[350px] sm:h-[420px] w-full">
                <LineChart data={normalizedData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} domain={[98, 103]} tickFormatter={(v) => v.toFixed(1)} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="qsif" name="qSIF Equity" stroke="#9b59b6" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="diviniti" name="Diviniti" stroke="#e67e22" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Head to Head Comparison */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Head-to-Head Comparison</h2>
              <p className="text-muted-foreground mt-2">Metric-by-metric winner analysis</p>
            </div>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Metric</TableHead>
                    <TableHead className="text-right">qSIF</TableHead>
                    <TableHead className="text-right">Diviniti</TableHead>
                    <TableHead className="text-right">Winner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {headToHead.map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-medium">{row.metric}</TableCell>
                      <TableCell className={`text-right tabular-nums ${row.winner === "qSIF" ? "font-bold text-primary" : ""}`}>{row.qsif}</TableCell>
                      <TableCell className={`text-right tabular-nums ${row.winner === "Diviniti" ? "font-bold text-primary" : ""}`}>{row.diviniti}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">{row.winner} ✓</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Diviniti wins 4 of 7 metrics • qSIF wins on absolute return & upside capture
            </p>
          </div>
        </section>

        {/* Fund Cards */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Fund Performance Cards</h2>
              <p className="text-muted-foreground mt-2">Detailed snapshot of each fund's February performance</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {performanceSummary.map(fund => (
                <Card key={fund.name} className="overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: fund.color }} />
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-lg text-foreground">{fund.name}</p>
                        <p className="text-xs text-muted-foreground">{fund.amc}</p>
                      </div>
                      <Badge variant={fund.monthReturn >= 0 ? "default" : "destructive"} className={fund.monthReturn >= 0 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                        {fund.monthReturn >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {fund.monthReturn >= 0 ? "+" : ""}{fund.monthReturn.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Starting NAV</span><span className="tabular-nums">₹{fund.startNav.toFixed(4)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Ending NAV</span><span className="font-semibold tabular-nums">₹{fund.endNav.toFixed(4)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Peak NAV</span><span className="tabular-nums text-emerald-600">₹{fund.peakNav.toFixed(4)}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Max Drawdown</span><span className="tabular-nums text-red-500">{fund.maxDrawdown}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Hit Rate</span><span className="tabular-nums">{fund.hitRate}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Daily Volatility</span><span className="tabular-nums">{fund.dailyVol}%</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Best / Worst Day</span><span className="tabular-nums">+{fund.bestDay}% / {fund.worstDay}%</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Return Comparison Bar Chart */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Return Comparison</h2>
              <p className="text-muted-foreground mt-2">February 2026 return side-by-side</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart data={monthlyReturns.sort((a, b) => b.return - a.return)} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tickFormatter={(v) => `${v.toFixed(1)}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background border border-border p-2 rounded shadow-lg">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-xs text-muted-foreground">{data.amc}</p>
                            <p className={`font-bold ${data.return >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {data.return >= 0 ? "+" : ""}{data.return.toFixed(2)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                    {monthlyReturns.sort((a, b) => b.return - a.return).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.return >= 0 ? entry.color : "#ef4444"} />
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
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-amber-600">Disclaimer:</strong> SIFs (Specialized Investment Funds) are regulated by SEBI and are suitable for sophisticated investors with higher risk tolerance. Minimum investment in SIFs is ₹10 lakhs per investor across all schemes of a fund. Past performance does not guarantee future returns. NAV may go up or down based on market conditions. This report is for informational purposes only and does not constitute investment advice. Please consult a SEBI-registered investment advisor before making any investment decisions.
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

export default PerformanceFeb2026EquityLongShort;
