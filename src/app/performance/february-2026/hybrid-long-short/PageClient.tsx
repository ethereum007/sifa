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
  ResponsiveContainer,
} from "recharts";
import {


  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Performance summary data from PPTX
const performanceSummary = [
  { name: "Titanium", sifCode: "SIF-32", isin: "INF277K30047", firstNav: 9.9359, latestNav: 10.1701, high: 10.1701, low: 9.9359, monthReturn: 2.36, amc: "Tata", color: "#e74c3c" },
  { name: "Magnum", sifCode: "SIF-14", isin: "INF200K30049", firstNav: 10.121, latestNav: 10.2146, high: 10.2566, low: 10.121, monthReturn: 0.92, amc: "SBI", color: "#f39c12" },
  { name: "Altiva", sifCode: "SIF-9", isin: "INF754K30011", firstNav: 10.3083, latestNav: 10.3894, high: 10.395, low: 10.3083, monthReturn: 0.79, amc: "Edelweiss", color: "#3498db" },
  { name: "QSIF", sifCode: "SIF-5", isin: "INF966L30076", firstNav: 9.8797, latestNav: 9.9368, high: 9.9783, low: 9.8797, monthReturn: 0.58, amc: "Quant", color: "#9b59b6" },
  { name: "Arudha", sifCode: "SIF-54", isin: "INF194K30184", firstNav: 10.034, latestNav: 10.078, high: 10.078, low: 10.034, monthReturn: 0.44, amc: "Bandhan", color: "#10b981" },
  { name: "iSIF", sifCode: "SIF-36", isin: "INF109K30026", firstNav: 10.0179, latestNav: 9.9585, high: 10.1375, low: 9.9585, monthReturn: -0.59, amc: "ICICI Prudential", color: "#22c55e" },
];

// Daily NAV trend data
const dailyNavData = [
  { date: "02-Feb", altiva: 10.3083, magnum: 10.121, qsif: 9.8797, titanium: 9.9359, arudha: null, isif: null },
  { date: "03-Feb", altiva: 10.334, magnum: 10.1898, qsif: 9.9642, titanium: 10.0602, arudha: null, isif: null },
  { date: "04-Feb", altiva: 10.3363, magnum: 10.1921, qsif: 9.9564, titanium: 10.1022, arudha: 10.034, isif: null },
  { date: "05-Feb", altiva: 10.3301, magnum: 10.1899, qsif: 9.9612, titanium: 10.1022, arudha: 10.042, isif: 10.0175 },
  { date: "06-Feb", altiva: 10.3377, magnum: 10.2036, qsif: 9.9318, titanium: 10.0961, arudha: 10.04, isif: 10.0054 },
  { date: "09-Feb", altiva: 10.3565, magnum: 10.2212, qsif: 9.9723, titanium: 10.1285, arudha: 10.037, isif: 10.069 },
  { date: "10-Feb", altiva: 10.3574, magnum: 10.2299, qsif: 9.9783, titanium: 10.1576, arudha: 10.039, isif: 10.1151 },
  { date: "11-Feb", altiva: 10.3585, magnum: 10.2349, qsif: 9.9753, titanium: 10.1667, arudha: 10.044, isif: 10.1375 },
  { date: "12-Feb", altiva: 10.3535, magnum: 10.2235, qsif: 9.9506, titanium: 10.1469, arudha: 10.052, isif: 10.1232 },
  { date: "13-Feb", altiva: 10.3523, magnum: 10.202, qsif: 9.91, titanium: 10.076, arudha: 10.06, isif: 10.0653 },
  { date: "16-Feb", altiva: 10.3715, magnum: 10.2218, qsif: 9.9107, titanium: 10.1173, arudha: 10.06, isif: 10.0738 },
  { date: "17-Feb", altiva: null, magnum: null, qsif: null, titanium: null, arudha: null, isif: null },
  { date: "18-Feb", altiva: null, magnum: null, qsif: null, titanium: null, arudha: null, isif: null },
  { date: "19-Feb", altiva: null, magnum: null, qsif: null, titanium: null, arudha: null, isif: null },
  { date: "20-Feb", altiva: 10.3917, magnum: 10.2396, qsif: 9.8872, titanium: 10.1285, arudha: 10.064, isif: 10.0226 },
  { date: "23-Feb", altiva: 10.3824, magnum: 10.2566, qsif: 9.9088, titanium: 10.1625, arudha: 10.071, isif: 10.0442 },
  { date: "24-Feb", altiva: 10.3699, magnum: 10.2357, qsif: 9.8886, titanium: 10.1419, arudha: 10.07, isif: 9.9775 },
  { date: "25-Feb", altiva: 10.3804, magnum: 10.24, qsif: 9.9117, titanium: 10.1563, arudha: 10.073, isif: null },
  { date: "26-Feb", altiva: 10.395, magnum: 10.2281, qsif: 9.9213, titanium: 10.162, arudha: 10.075, isif: null },
  { date: "27-Feb", altiva: 10.3894, magnum: 10.2146, qsif: 9.9368, titanium: 10.1701, arudha: 10.078, isif: 9.9585 },
].filter(d => d.altiva !== null || d.arudha !== null); // filter out blank rows

const chartConfig = {
  altiva: { label: "Altiva (Edelweiss)", color: "#3498db" },
  magnum: { label: "Magnum (SBI)", color: "#f39c12" },
  qsif: { label: "QSIF (Quant)", color: "#9b59b6" },
  titanium: { label: "Titanium (Tata)", color: "#e74c3c" },
  arudha: { label: "Arudha (Bandhan)", color: "#10b981" },
  isif: { label: "iSIF (ICICI)", color: "#22c55e" },
};

const monthlyReturns = performanceSummary.map(f => ({
  name: f.name,
  return: f.monthReturn,
  color: f.color,
  amc: f.amc,
}));

const avgReturn = (performanceSummary.reduce((s, f) => s + f.monthReturn, 0) / performanceSummary.length);
const positiveFunds = performanceSummary.filter(f => f.monthReturn > 0).length;

const PerformanceFeb2026HybridLongShort = () => {
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
              SIF Hybrid Long-Short
              <span className="text-primary block mt-2">Monthly Performance</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              NAV performance analysis of all 6 Hybrid Long-Short SIF funds for February 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">6 Funds Analyzed</span>
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
                  <p className="font-bold text-foreground">Titanium</p>
                  <p className="text-emerald-600 font-bold text-lg">+2.36%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Under Pressure</span>
                  </div>
                  <p className="font-bold text-foreground">iSIF</p>
                  <p className="text-red-500 font-bold text-lg">-0.59%</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Average Return</span>
                  </div>
                  <p className="font-bold text-foreground text-lg">+{avgReturn.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">Across all 6 funds</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Positive Funds</span>
                  </div>
                  <p className="font-bold text-foreground text-lg">{positiveFunds} of 6</p>
                  <p className="text-xs text-muted-foreground">Funds in green</p>
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
                    <TableHead>Fund</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">SIF Code</TableHead>
                    <TableHead className="text-right">First NAV</TableHead>
                    <TableHead className="text-right">Latest NAV</TableHead>
                    <TableHead className="text-right hidden md:table-cell">High</TableHead>
                    <TableHead className="text-right hidden md:table-cell">Low</TableHead>
                    <TableHead className="text-right">Month Return</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceSummary.map(fund => (
                    <TableRow key={fund.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: fund.color }} />
                          <div>
                            <p className="font-semibold text-sm text-foreground">{fund.name}</p>
                            <p className="text-[11px] text-muted-foreground">{fund.amc}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground hidden sm:table-cell">{fund.sifCode}</TableCell>
                      <TableCell className="text-right tabular-nums text-sm">₹{fund.firstNav.toFixed(4)}</TableCell>
                      <TableCell className="text-right tabular-nums text-sm font-medium">₹{fund.latestNav.toFixed(4)}</TableCell>
                      <TableCell className="text-right tabular-nums text-sm text-muted-foreground hidden md:table-cell">₹{fund.high.toFixed(4)}</TableCell>
                      <TableCell className="text-right tabular-nums text-sm text-muted-foreground hidden md:table-cell">₹{fund.low.toFixed(4)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`tabular-nums font-bold text-sm ${fund.monthReturn >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                          {fund.monthReturn >= 0 ? "+" : ""}{fund.monthReturn.toFixed(2)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* NAV Trend Chart */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">NAV Trend — February 2026</h2>
              <p className="text-muted-foreground mt-2">Daily NAV movements for all 6 Hybrid Long-Short funds</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[350px] sm:h-[420px] w-full">
                <LineChart data={dailyNavData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} domain={[9.8, 10.5]} tickFormatter={(v) => `₹${v.toFixed(1)}`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="altiva" name="Altiva" stroke="#3498db" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="magnum" name="Magnum" stroke="#f39c12" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="qsif" name="QSIF" stroke="#9b59b6" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="titanium" name="Titanium" stroke="#e74c3c" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="arudha" name="Arudha" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                  <Line type="monotone" dataKey="isif" name="iSIF" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} connectNulls={false} />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Fund Performance Cards */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Fund Performance Cards</h2>
              <p className="text-muted-foreground mt-2">Detailed snapshot of each fund's February performance</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {performanceSummary.map(fund => (
                <Card key={fund.name} className="overflow-hidden">
                  <div className="h-1.5" style={{ backgroundColor: fund.color }} />
                  <CardContent className="pt-5 pb-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-lg text-foreground">{fund.name}</p>
                        <p className="text-xs text-muted-foreground">{fund.sifCode} • {fund.amc}</p>
                      </div>
                      <Badge variant={fund.monthReturn >= 0 ? "default" : "destructive"} className={fund.monthReturn >= 0 ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                        {fund.monthReturn >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {fund.monthReturn >= 0 ? "+" : ""}{fund.monthReturn.toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Latest NAV</span>
                        <span className="font-semibold tabular-nums">₹{fund.latestNav.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">First NAV (Feb)</span>
                        <span className="tabular-nums">₹{fund.firstNav.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">High</span>
                        <span className="tabular-nums text-emerald-600">₹{fund.high.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Low</span>
                        <span className="tabular-nums text-red-500">₹{fund.low.toFixed(4)}</span>
                      </div>
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-[11px] text-muted-foreground">ISIN: {fund.isin}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Monthly Return Comparison Bar Chart */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold">Return Comparison</h2>
              <p className="text-muted-foreground mt-2">Month-over-month return comparison across all hybrid funds</p>
            </div>
            <Card className="p-4 sm:p-6">
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <BarChart data={monthlyReturns.sort((a, b) => b.return - a.return)} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tickFormatter={(v) => `${v.toFixed(1)}%`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={70} />
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

export default PerformanceFeb2026HybridLongShort;
