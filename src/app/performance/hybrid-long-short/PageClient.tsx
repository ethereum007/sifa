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
  Users
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
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Fund performance data for January 2026
const fundData = [
  {
    name: "Altiva SIF",
    amc: "Edelweiss",
    monthlyReturn: 0.03,
    volatility: 0.15,
    maxDrawdown: -0.57,
    sharpeRatio: 0.18,
    finalNav: 10.3066,
    color: "#3498db",
    isWinner: true,
  },
  {
    name: "QSIF",
    amc: "Quant",
    monthlyReturn: -1.27,
    volatility: 0.34,
    maxDrawdown: -2.59,
    sharpeRatio: -3.15,
    finalNav: 9.889,
    color: "#9b59b6",
    isHighestRisk: true,
  },
  {
    name: "Magnum SIF",
    amc: "SBI",
    monthlyReturn: -0.99,
    volatility: 0.23,
    maxDrawdown: -1.55,
    sharpeRatio: -3.55,
    finalNav: 10.1368,
    color: "#f39c12",
  },
  {
    name: "Titanium SIF",
    amc: "ICICI Prudential",
    monthlyReturn: -1.0,
    volatility: 0.38,
    maxDrawdown: -2.56,
    sharpeRatio: -2.19,
    finalNav: 9.9637,
    color: "#e74c3c",
  },
];

// NAV performance data (indexed to 100)
const navPerformanceData = [
  { date: "31-Dec", altiva: 100, qsif: 100, magnum: 100, titanium: 100 },
  { date: "02-Jan", altiva: 100.1, qsif: 100.3, magnum: 100.35, titanium: 100.4 },
  { date: "06-Jan", altiva: 100.15, qsif: 100.25, magnum: 99.8, titanium: 100.4 },
  { date: "08-Jan", altiva: 100.1, qsif: 100.15, magnum: 100.1, titanium: 100.25 },
  { date: "10-Jan", altiva: 99.75, qsif: 99.55, magnum: 99.65, titanium: 99.45 },
  { date: "14-Jan", altiva: 100.1, qsif: 99.3, magnum: 99.7, titanium: 99.8 },
  { date: "16-Jan", altiva: 100.05, qsif: 99.15, magnum: 99.7, titanium: 99.8 },
  { date: "18-Jan", altiva: 100.15, qsif: 98.75, magnum: 99.75, titanium: 99.5 },
  { date: "20-Jan", altiva: 99.9, qsif: 98.5, magnum: 99.1, titanium: 98.8 },
  { date: "22-Jan", altiva: 99.65, qsif: 98.0, magnum: 99.25, titanium: 98.7 },
  { date: "24-Jan", altiva: 99.7, qsif: 98.05, magnum: 98.9, titanium: 98.0 },
  { date: "28-Jan", altiva: 99.85, qsif: 98.6, magnum: 98.75, titanium: 99.05 },
  { date: "30-Jan", altiva: 100.03, qsif: 98.73, magnum: 99.01, titanium: 99.0 },
];

// Correlation matrix data
const correlationData = [
  { fund1: "Altiva", fund2: "QSIF", correlation: 0.596 },
  { fund1: "Altiva", fund2: "Magnum", correlation: 0.743 },
  { fund1: "Altiva", fund2: "Titanium", correlation: 0.830 },
  { fund1: "QSIF", fund2: "Magnum", correlation: 0.616 },
  { fund1: "QSIF", fund2: "Titanium", correlation: 0.629 },
  { fund1: "Magnum", fund2: "Titanium", correlation: 0.761 },
];

// Leaderboard categories
const leaderboardCategories = [
  {
    title: "Best Returns",
    icon: TrendingUp,
    rankings: [
      { name: "Altiva", value: "+0.03%", rank: 1 },
      { name: "Magnum", value: "-0.99%", rank: 2 },
      { name: "Titanium", value: "-1.00%", rank: 3 },
    ],
  },
  {
    title: "Lowest Volatility",
    icon: Shield,
    rankings: [
      { name: "Altiva", value: "0.15%", rank: 1 },
      { name: "Magnum", value: "0.23%", rank: 2 },
      { name: "QSIF", value: "0.34%", rank: 3 },
    ],
  },
  {
    title: "Best Risk-Adjusted Returns",
    icon: Scale,
    rankings: [
      { name: "Altiva", value: "0.18", rank: 1 },
      { name: "Titanium", value: "-2.19", rank: 2 },
      { name: "QSIF", value: "-3.15", rank: 3 },
    ],
  },
  {
    title: "Smallest Drawdown",
    icon: ArrowDown,
    rankings: [
      { name: "Altiva", value: "-0.57%", rank: 1 },
      { name: "Magnum", value: "-1.55%", rank: 2 },
      { name: "Titanium", value: "-2.56%", rank: 3 },
    ],
  },
];

const chartConfig = {
  altiva: { label: "Altiva SIF", color: "#3498db" },
  qsif: { label: "QSIF", color: "#9b59b6" },
  magnum: { label: "Magnum SIF", color: "#f39c12" },
  titanium: { label: "Titanium SIF", color: "#e74c3c" },
};

const Performance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                January 2026 Analysis
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Hybrid Long-Short SIF Fund
                <span className="text-primary block mt-2">Performance Report</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive analysis of 4 Hybrid Long-Short Strategy Funds tracking 
                returns, volatility, risk-adjusted performance and correlations.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">4 Funds Analyzed</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Jan 1-30, 2026</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Daily NAV Data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fund Performance Cards */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">
              Fund Performance Snapshot
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fundData.map((fund) => (
                <Card 
                  key={fund.name}
                  className={`relative overflow-hidden transition-all hover:shadow-lg ${
                    fund.isWinner ? 'ring-2 ring-green-500/50' : 
                    fund.isHighestRisk ? 'ring-2 ring-red-500/30' : ''
                  }`}
                >
                  {fund.isWinner && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white">
                        <Trophy className="w-3 h-3 mr-1" /> Winner
                      </Badge>
                    </div>
                  )}
                  {fund.isHighestRisk && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="destructive">
                        <AlertTriangle className="w-3 h-3 mr-1" /> High Risk
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div 
                      className="w-2 h-12 rounded-full absolute left-0 top-0"
                      style={{ backgroundColor: fund.color }}
                    />
                    <p className="text-xs text-muted-foreground ml-4">{fund.amc}</p>
                    <CardTitle className="text-lg ml-4">{fund.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 ml-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly Return</span>
                      <span className={`font-semibold ${fund.monthlyReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {fund.monthlyReturn >= 0 ? '+' : ''}{fund.monthlyReturn.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Volatility</span>
                      <span className={`font-semibold ${fund.volatility <= 0.2 ? 'text-green-500' : fund.volatility <= 0.3 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {fund.volatility.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Max Drawdown</span>
                      <span className="font-semibold text-red-500">{fund.maxDrawdown.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                      <span className={`font-semibold ${fund.sharpeRatio >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {fund.sharpeRatio.toFixed(2)}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Final NAV</span>
                        <span className="font-bold text-foreground">₹{fund.finalNav.toFixed(4)}</span>
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
              Indexed NAV Performance
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              All funds indexed to 100 on December 31, 2025 for comparative analysis
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
                    domain={[97.5, 101]}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="altiva" 
                    name="Altiva SIF"
                    stroke="#3498db" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="qsif" 
                    name="QSIF"
                    stroke="#9b59b6" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="magnum" 
                    name="Magnum SIF"
                    stroke="#f39c12" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="titanium" 
                    name="Titanium SIF"
                    stroke="#e74c3c" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ChartContainer>
            </Card>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              🏆 January 2026 Leaderboard
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Performance Rankings Across Key Metrics
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {leaderboardCategories.map((category) => (
                <Card key={category.title} className="overflow-hidden">
                  <CardHeader className="pb-3 bg-secondary/30">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <category.icon className="w-5 h-5 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {category.rankings.map((item) => (
                        <div 
                          key={item.name}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            item.rank === 1 ? 'bg-primary/10 border border-primary/20' :
                            item.rank === 2 ? 'bg-secondary/50' : 'bg-secondary/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              item.rank === 1 ? 'bg-primary text-primary-foreground' :
                              item.rank === 2 ? 'bg-muted-foreground/30 text-foreground' : 
                              'bg-muted text-muted-foreground'
                            }`}>
                              {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉'}
                            </span>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className={`font-semibold ${
                            category.title === "Best Returns" && item.rank === 1 ? 'text-green-500' :
                            category.title === "Best Returns" ? 'text-red-500' : ''
                          }`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Insights Section */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">
              Key Insights
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Winner Card */}
              <Card className="border-l-4 border-l-green-500 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    WINNER: Altiva SIF
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Only fund with positive returns (+0.03%)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Lowest volatility at 0.15%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Most stable performance throughout the month
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      Best defensive positioning
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Highest Risk Card */}
              <Card className="border-l-4 border-l-red-500 bg-red-500/5">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    HIGHEST RISK: QSIF
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Largest drawdown at -2.59%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Highest volatility at 0.34%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Worst monthly return at -1.27%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      Sharpe ratio of -3.15 indicates poor risk-adjusted returns
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Market Environment */}
              <Card className="border-l-4 border-l-blue-500 bg-blue-500/5">
                <CardHeader>
                  <CardTitle className="text-blue-600 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    MARKET ENVIRONMENT
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      Challenging month for hybrid long-short funds
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      3 out of 4 funds delivered negative returns
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      High correlation between funds (0.60-0.83)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      Defensive strategies outperformed aggressive ones
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Investor Takeaways */}
              <Card className="border-l-4 border-l-purple-500 bg-purple-500/5">
                <CardHeader>
                  <CardTitle className="text-purple-600 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    INVESTOR TAKEAWAYS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      Altiva demonstrated superior risk management
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      Volatility ranged from 0.15% to 0.38%
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      Fund selection matters significantly
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      Consider volatility alongside returns
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Correlation Matrix */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
              Fund Returns Correlation
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              High correlation suggests systematic market pressures affecting all funds similarly
            </p>
            <Card className="max-w-3xl mx-auto p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-3 text-left font-medium"></th>
                      <th className="p-3 text-center font-medium">Altiva</th>
                      <th className="p-3 text-center font-medium">QSIF</th>
                      <th className="p-3 text-center font-medium">Magnum</th>
                      <th className="p-3 text-center font-medium">Titanium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-medium">Altiva</td>
                      <td className="p-3 text-center bg-green-600 text-white font-bold rounded">1.00</td>
                      <td className="p-3 text-center bg-green-500/60 text-white font-semibold rounded">0.60</td>
                      <td className="p-3 text-center bg-green-500/80 text-white font-semibold rounded">0.74</td>
                      <td className="p-3 text-center bg-green-500/90 text-white font-semibold rounded">0.83</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">QSIF</td>
                      <td className="p-3 text-center bg-green-500/60 text-white font-semibold rounded">0.60</td>
                      <td className="p-3 text-center bg-green-600 text-white font-bold rounded">1.00</td>
                      <td className="p-3 text-center bg-green-500/65 text-white font-semibold rounded">0.62</td>
                      <td className="p-3 text-center bg-green-500/65 text-white font-semibold rounded">0.63</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Magnum</td>
                      <td className="p-3 text-center bg-green-500/80 text-white font-semibold rounded">0.74</td>
                      <td className="p-3 text-center bg-green-500/65 text-white font-semibold rounded">0.62</td>
                      <td className="p-3 text-center bg-green-600 text-white font-bold rounded">1.00</td>
                      <td className="p-3 text-center bg-green-500/80 text-white font-semibold rounded">0.76</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Titanium</td>
                      <td className="p-3 text-center bg-green-500/90 text-white font-semibold rounded">0.83</td>
                      <td className="p-3 text-center bg-green-500/65 text-white font-semibold rounded">0.63</td>
                      <td className="p-3 text-center bg-green-500/80 text-white font-semibold rounded">0.76</td>
                      <td className="p-3 text-center bg-green-600 text-white font-bold rounded">1.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Correlation ranges from 0.60 to 0.83, indicating moderate to high interdependence
              </p>
            </Card>
          </div>
        </section>

        {/* Summary Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-card/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl lg:text-3xl flex items-center justify-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  Summary & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  In January 2026, <span className="text-primary font-semibold">Altiva SIF</span> emerged as the clear winner among hybrid long-short funds, being the only fund to deliver positive returns while maintaining the lowest volatility. The month proved challenging for most SIF funds, with high inter-fund correlation suggesting systematic market pressures. 
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                  Investors should prioritize <span className="font-semibold">risk management</span> and <span className="font-semibold">volatility metrics</span> when selecting SIF funds, as demonstrated by Altiva's defensive positioning.
                </p>
                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Data Source:</strong> NAV Historical Data | <strong>Analysis Period:</strong> Jan 1-30, 2026
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span><strong>Disclaimer:</strong> Past performance does not guarantee future returns. Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Performance;
