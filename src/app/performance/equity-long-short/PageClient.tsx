"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Trophy, 
  AlertTriangle, 
  Shield, 
  BarChart3,
  Target,
  Activity,
  ArrowDown,
  Scale,
  Lightbulb,
  Zap,
  Users,
  ArrowUpDown,
  Percent,
  Calendar
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

// Fund performance data for January 2026
const fundData = [
  {
    name: "Diviniti Equity Long Short",
    amc: "ITI Mutual Fund",
    monthlyReturn: -1.35,
    dailyVolatility: 0.18,
    annualizedVolatility: 2.80,
    maxDrawdown: -1.35,
    winRate: 31.6,
    color: "#3498db",
    isWinner: true,
    description: "Conservative approach with superior capital preservation",
  },
  {
    name: "QSIF Equity Ex-Top 100 Long-Short",
    amc: "Quant Mutual Fund",
    monthlyReturn: -5.02,
    dailyVolatility: 0.87,
    annualizedVolatility: 13.88,
    maxDrawdown: -7.14,
    winRate: 42.1,
    color: "#e74c3c",
    isHighestRisk: true,
    description: "Higher volatility with bigger swings both ways",
  },
];

// Weekly breakdown data
const weeklyData = [
  { week: "Week 1", qsif: 0.75, diviniti: 0.26 },
  { week: "Week 2", qsif: -3.03, diviniti: -0.57 },
  { week: "Week 3", qsif: -0.71, diviniti: -0.07 },
  { week: "Week 4", qsif: -3.08, diviniti: -0.93 },
  { week: "Week 5", qsif: 2.28, diviniti: 0.00 },
];

// Simulated daily NAV data (indexed to 100)
const navPerformanceData = [
  { date: "31-Dec", qsif: 100, diviniti: 100 },
  { date: "03-Jan", qsif: 100.75, diviniti: 100.26 },
  { date: "07-Jan", qsif: 100.5, diviniti: 100.1 },
  { date: "10-Jan", qsif: 97.47, diviniti: 99.53 },
  { date: "14-Jan", qsif: 97.2, diviniti: 99.45 },
  { date: "17-Jan", qsif: 96.76, diviniti: 99.46 },
  { date: "21-Jan", qsif: 96.49, diviniti: 99.38 },
  { date: "24-Jan", qsif: 93.68, diviniti: 98.53 },
  { date: "28-Jan", qsif: 94.5, diviniti: 98.6 },
  { date: "30-Jan", qsif: 94.98, diviniti: 98.65 },
];

// Key statistics for comparison
const comparisonStats = [
  { metric: "Monthly Return", qsif: "-5.02%", diviniti: "-1.35%", winner: "diviniti", insight: "Diviniti outperformed by 73%" },
  { metric: "Daily Volatility", qsif: "0.87%", diviniti: "0.18%", winner: "diviniti", insight: "5x difference in risk!" },
  { metric: "Annualized Volatility", qsif: "13.88%", diviniti: "2.80%", winner: "diviniti", insight: "Much calmer ride" },
  { metric: "Max Drawdown", qsif: "-7.14%", diviniti: "-1.35%", winner: "diviniti", insight: "Better capital protection" },
  { metric: "Win Rate", qsif: "42.1%", diviniti: "31.6%", winner: "qsif", insight: "But bigger losses offset wins" },
];

const chartConfig = {
  qsif: { label: "QSIF Ex-Top 100", color: "#e74c3c" },
  diviniti: { label: "Diviniti", color: "#3498db" },
};

const PerformanceEquityLongShort = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-red-500/5 via-background to-blue-500/10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30 animate-pulse">
                🔥 January 2026 Battle
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Equity Long-Short Fund
                <span className="text-primary block mt-2">Head-to-Head Showdown</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Two SIFs, same strategy category, vastly different outcomes. 
                Discover why risk management made all the difference in January 2026.
              </p>
              
              {/* Quick Stats Banner */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <Trophy className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Diviniti: 73% less loss</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">5x Volatility Difference</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <ArrowUpDown className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">0.81 Correlation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Contenders Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              ⚔️ The Contenders
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Both funds employ Long-Short Equity strategies but with dramatically different risk profiles
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {fundData.map((fund) => (
                <Card 
                  key={fund.name}
                  className={`relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 ${
                    fund.isWinner ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10' : 
                    fund.isHighestRisk ? 'ring-2 ring-red-500/30 shadow-lg shadow-red-500/10' : ''
                  }`}
                >
                  {/* Top color bar */}
                  <div 
                    className="h-2 w-full"
                    style={{ backgroundColor: fund.color }}
                  />
                  
                  {fund.isWinner && (
                    <div className="absolute top-5 right-4">
                      <Badge className="bg-blue-500 text-white">
                        <Trophy className="w-3 h-3 mr-1" /> Winner
                      </Badge>
                    </div>
                  )}
                  {fund.isHighestRisk && (
                    <div className="absolute top-5 right-4">
                      <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Higher Risk
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{fund.amc}</p>
                    <CardTitle className="text-xl">{fund.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{fund.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Main Return */}
                    <div className="bg-secondary/30 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Monthly Return</p>
                      <p className={`text-3xl font-bold ${fund.monthlyReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {fund.monthlyReturn >= 0 ? '+' : ''}{fund.monthlyReturn.toFixed(2)}%
                      </p>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-secondary/20 rounded-lg">
                        <Activity className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Daily Vol</p>
                        <p className="font-semibold">{fund.dailyVolatility.toFixed(2)}%</p>
                      </div>
                      <div className="text-center p-3 bg-secondary/20 rounded-lg">
                        <BarChart3 className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Annual Vol</p>
                        <p className="font-semibold">{fund.annualizedVolatility.toFixed(2)}%</p>
                      </div>
                      <div className="text-center p-3 bg-secondary/20 rounded-lg">
                        <ArrowDown className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Max Drawdown</p>
                        <p className="font-semibold text-red-500">{fund.maxDrawdown.toFixed(2)}%</p>
                      </div>
                      <div className="text-center p-3 bg-secondary/20 rounded-lg">
                        <Target className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                        <p className="font-semibold">{fund.winRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* NAV Performance Chart */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              📈 NAV Journey Through January
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Indexed to 100 on December 31, 2025 — Watch how risk translates to real performance
            </p>
            <Card className="p-6">
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <LineChart data={navPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={[92, 102]}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(value) => value.toFixed(0)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="diviniti" 
                    name="Diviniti"
                    stroke="#3498db" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="qsif" 
                    name="QSIF Ex-Top 100"
                    stroke="#e74c3c" 
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Weekly Breakdown */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              📅 Week-by-Week Breakdown
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Tracking weekly returns reveals the consistency gap
            </p>
            
            <div className="max-w-4xl mx-auto">
              <Card className="p-6">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="qsif" name="QSIF Ex-Top 100" fill="#e74c3c" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="diviniti" name="Diviniti" fill="#3498db" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </Card>
              
              {/* Week 4 Callout */}
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-600">Week 4 was brutal for both funds!</p>
                    <p className="text-sm text-muted-foreground">
                      QSIF dropped -3.08% while Diviniti lost -0.93%. Even in the worst week, 
                      Diviniti's conservative approach limited damage by 70%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              📊 Side-by-Side Comparison
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Numbers don't lie — see who wins each metric
            </p>
            
            <Card className="max-w-4xl mx-auto overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-bold">Metric</TableHead>
                    <TableHead className="text-center font-bold text-red-500">QSIF Ex-Top 100</TableHead>
                    <TableHead className="text-center font-bold text-blue-500">Diviniti</TableHead>
                    <TableHead className="font-bold">Insight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonStats.map((stat) => (
                    <TableRow key={stat.metric} className="hover:bg-secondary/30">
                      <TableCell className="font-medium">{stat.metric}</TableCell>
                      <TableCell className={`text-center font-semibold ${stat.winner === 'qsif' ? 'bg-green-500/10 text-green-600' : ''}`}>
                        {stat.qsif}
                        {stat.winner === 'qsif' && <span className="ml-1">✓</span>}
                      </TableCell>
                      <TableCell className={`text-center font-semibold ${stat.winner === 'diviniti' ? 'bg-green-500/10 text-green-600' : ''}`}>
                        {stat.diviniti}
                        {stat.winner === 'diviniti' && <span className="ml-1">✓</span>}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{stat.insight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        {/* Key Insights Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">
              💡 Key Takeaways
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Insight Cards */}
              <Card className="border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    Capital Preservation Wins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Diviniti's conservative approach preserved <strong>73% more capital</strong> than QSIF. 
                    In volatile markets, controlling downside is more valuable than chasing upside.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-amber-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-500" />
                    5x Volatility Gap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    QSIF showed 0.87% daily volatility vs Diviniti's 0.18%. 
                    That's a <strong>5x difference in risk</strong> for funds in the same category!
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5 text-purple-500" />
                    High Correlation (0.81)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Both funds moved in the same direction <strong>75% of the time</strong>. 
                    Holding both offers limited diversification benefit.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-green-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    For Conservative Investors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Diviniti's lower volatility profile offers better <strong>downside protection</strong> 
                    and capital preservation. Ideal for risk-averse investors.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-red-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-red-500" />
                    For Aggressive Investors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    QSIF's higher volatility could translate to <strong>better upside in favorable markets</strong>, 
                    but comes with significant drawdown risk.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-primary hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    The Bottom Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    SIFs require sophisticated understanding — <strong>not all long-short strategies are equal</strong>. 
                    Implementation and risk controls make all the difference.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Correlation Insight */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 to-secondary/20">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur">
              <CardHeader className="text-center">
                <Badge variant="outline" className="w-fit mx-auto mb-2">Interesting Stat</Badge>
                <CardTitle className="text-2xl">Correlation Deep Dive</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="flex flex-col md:flex-row justify-center gap-8">
                  <div className="text-center p-6 bg-secondary/30 rounded-xl">
                    <p className="text-4xl font-bold text-primary">0.81</p>
                    <p className="text-sm text-muted-foreground mt-2">Correlation Coefficient</p>
                  </div>
                  <div className="text-center p-6 bg-secondary/30 rounded-xl">
                    <p className="text-4xl font-bold text-primary">75%</p>
                    <p className="text-sm text-muted-foreground mt-2">Same Direction Days</p>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Strong correlation suggests both funds are exposed to similar market factors. 
                  The difference lies in position sizing and risk management execution.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-amber-500/10 border-y border-amber-500/20">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-3 max-w-4xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-amber-600">Disclaimer:</strong> Past performance does not guarantee future returns. 
                Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. 
                The analysis is for educational purposes only and does not constitute investment advice.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PerformanceEquityLongShort;
