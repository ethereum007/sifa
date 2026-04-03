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

// Equity Long Short Fund Data
const equityLongShortData = [
  { date: "02-Feb", diviniti: 988.0553, qsif: 9.6863 },
  { date: "03-Feb", diviniti: 991.8750, qsif: 9.8305 },
  { date: "04-Feb", diviniti: 995.2829, qsif: 9.8575 },
  { date: "05-Feb", diviniti: 992.0587, qsif: 9.8633 },
  { date: "06-Feb", diviniti: 992.3122, qsif: 9.8602 },
  { date: "09-Feb", diviniti: 994.3212, qsif: 9.9241 },
  { date: "10-Feb", diviniti: 993.5065, qsif: 9.9122 },
  { date: "11-Feb", diviniti: 994.5118, qsif: 9.9441 },
  { date: "12-Feb", diviniti: 994.8071, qsif: 9.919 },
  { date: "13-Feb", diviniti: 987.2548, qsif: 9.8041 },
  { date: "16-Feb", diviniti: 990.9132, qsif: 9.8584 },
  { date: "20-Feb", diviniti: 987.1805, qsif: 9.8215 },
  { date: "23-Feb", diviniti: 991.1304, qsif: 9.8499 },
  { date: "24-Feb", diviniti: 984.6694, qsif: 9.8367 },
];

// Equity Ex-Top 100 Long Short Fund Data
const equityExTop100Data = [
  { date: "02-Feb", qsifExTop100: 9.3212, isifExTop100: null },
  { date: "03-Feb", qsifExTop100: 9.5232, isifExTop100: null },
  { date: "04-Feb", qsifExTop100: 9.5587, isifExTop100: null },
  { date: "05-Feb", qsifExTop100: 9.5456, isifExTop100: 9.99 },
  { date: "06-Feb", qsifExTop100: 9.5179, isifExTop100: 9.99 },
  { date: "09-Feb", qsifExTop100: 9.6474, isifExTop100: 10.05 },
  { date: "10-Feb", qsifExTop100: 9.6913, isifExTop100: 10.06 },
  { date: "11-Feb", qsifExTop100: 9.671, isifExTop100: 10.07 },
  { date: "12-Feb", qsifExTop100: 9.6285, isifExTop100: 10.02 },
  { date: "13-Feb", qsifExTop100: 9.4891, isifExTop100: 9.96 },
  { date: "16-Feb", qsifExTop100: 9.4801, isifExTop100: 9.97 },
  { date: "20-Feb", qsifExTop100: 9.4294, isifExTop100: 9.96 },
  { date: "23-Feb", qsifExTop100: 9.3741, isifExTop100: 9.98 },
  { date: "24-Feb", qsifExTop100: 9.3365, isifExTop100: 10.04 },
];

// Hybrid Long-Short Fund Data
const hybridLongShortData = [
  { date: "02-Feb", altiva: 10.3083, magnum: 10.1210, qsif: 9.8797, titanium: 9.9359, arudha: null, isif: null },
  { date: "03-Feb", altiva: 10.3340, magnum: 10.1898, qsif: 9.9642, titanium: 10.0602, arudha: null, isif: null },
  { date: "04-Feb", altiva: 10.3363, magnum: 10.1921, qsif: 9.9564, titanium: 10.1022, arudha: 10.034, isif: null },
  { date: "05-Feb", altiva: 10.3301, magnum: 10.1899, qsif: 9.9612, titanium: 10.1022, arudha: 10.042, isif: 10.0175 },
  { date: "06-Feb", altiva: 10.3377, magnum: 10.2036, qsif: 9.9318, titanium: 10.0961, arudha: 10.04, isif: 10.0054 },
  { date: "09-Feb", altiva: 10.3565, magnum: 10.2212, qsif: 9.9723, titanium: 10.1285, arudha: 10.037, isif: 10.069 },
  { date: "10-Feb", altiva: 10.3574, magnum: 10.2299, qsif: 9.9783, titanium: 10.1576, arudha: 10.039, isif: 10.1151 },
  { date: "11-Feb", altiva: 10.3585, magnum: 10.2349, qsif: 9.9753, titanium: 10.1667, arudha: 10.044, isif: 10.1375 },
  { date: "12-Feb", altiva: 10.3535, magnum: 10.2235, qsif: 9.9506, titanium: 10.1469, arudha: 10.052, isif: 10.1232 },
  { date: "13-Feb", altiva: 10.3523, magnum: 10.202, qsif: 9.91, titanium: 10.076, arudha: 10.06, isif: 10.0653 },
  { date: "16-Feb", altiva: 10.3715, magnum: 10.2218, qsif: 9.9107, titanium: 10.1173, arudha: 10.06, isif: 10.0738 },
  { date: "20-Feb", altiva: 10.3917, magnum: 10.2396, qsif: 9.8872, titanium: 10.1285, arudha: 10.064, isif: 10.0226 },
  { date: "23-Feb", altiva: 10.3824, magnum: 10.2566, qsif: 9.9088, titanium: 10.1625, arudha: 10.071, isif: 10.0442 },
  { date: "24-Feb", altiva: 10.3699, magnum: 10.2357, qsif: 9.8886, titanium: 10.1419, arudha: 10.07, isif: 9.9775 },
];

// Calculate daily returns for bar chart (Feb 23 to Feb 24)
const equityReturns = [
  { 
    name: "Diviniti SIF", 
    return: ((984.6694 - 991.1304) / 991.1304) * 100,
    color: "#6366f1",
    amc: "ITI"
  },
  { 
    name: "qSIF Equity", 
    return: ((9.8367 - 9.8499) / 9.8499) * 100,
    color: "#9b59b6",
    amc: "Quant"
  },
];

const exTop100Returns = [
  { 
    name: "qSIF Ex-Top 100", 
    return: ((9.3365 - 9.3741) / 9.3741) * 100,
    color: "#f97316",
    amc: "Quant"
  },
  { 
    name: "iSIF Ex-Top 100", 
    return: ((10.04 - 9.98) / 9.98) * 100,
    color: "#22c55e",
    amc: "ICICI Prudential"
  },
];

const hybridReturns = [
  { 
    name: "Altiva SIF", 
    return: ((10.3699 - 10.3824) / 10.3824) * 100,
    color: "#3498db",
    amc: "Edelweiss"
  },
  { 
    name: "Magnum SIF", 
    return: ((10.2357 - 10.2566) / 10.2566) * 100,
    color: "#f39c12",
    amc: "SBI"
  },
  { 
    name: "qSIF Hybrid", 
    return: ((9.8886 - 9.9088) / 9.9088) * 100,
    color: "#9b59b6",
    amc: "Quant"
  },
  { 
    name: "Titanium SIF", 
    return: ((10.1419 - 10.1625) / 10.1625) * 100,
    color: "#e74c3c",
    amc: "Tata"
  },
  { 
    name: "Arudha SIF", 
    return: ((10.07 - 10.071) / 10.071) * 100,
    color: "#10b981",
    amc: "Bandhan"
  },
  { 
    name: "iSIF Hybrid", 
    return: ((9.9775 - 10.0442) / 10.0442) * 100,
    color: "#22c55e",
    amc: "ICICI Prudential"
  },
];

const equityChartConfig = {
  diviniti: { label: "Diviniti SIF (ITI)", color: "#6366f1" },
  qsif: { label: "qSIF Equity (Quant)", color: "#9b59b6" },
};

const exTop100ChartConfig = {
  qsifExTop100: { label: "qSIF Ex-Top 100 (Quant)", color: "#f97316" },
  isifExTop100: { label: "iSIF Ex-Top 100 (ICICI)", color: "#22c55e" },
};

const hybridChartConfig = {
  altiva: { label: "Altiva SIF (Edelweiss)", color: "#3498db" },
  magnum: { label: "Magnum SIF (SBI)", color: "#f39c12" },
  qsif: { label: "qSIF Hybrid (Quant)", color: "#9b59b6" },
  titanium: { label: "Titanium SIF (Tata)", color: "#e74c3c" },
  arudha: { label: "Arudha SIF (Bandhan)", color: "#10b981" },
  isif: { label: "iSIF Hybrid (ICICI)", color: "#22c55e" },
};

const ReturnCard = ({ name, returnPct, amc, color }: { name: string; returnPct: number; amc: string; color: string }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
    <div className="flex items-center gap-3">
      <div className="w-3 h-10 rounded-full" style={{ backgroundColor: color }} />
      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{amc}</p>
      </div>
    </div>
    <div className={`flex items-center gap-1 font-semibold ${returnPct >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {returnPct >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
      {returnPct >= 0 ? '+' : ''}{returnPct.toFixed(2)}%
    </div>
  </div>
);

const PerformanceFeb2026 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Calendar className="w-3 h-3 mr-1" />
                February 2026 Analysis
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                SIF Fund Daily
                <span className="text-primary block mt-2">Performance Dashboard</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track daily NAV movements across all SIF fund categories - 
                Equity Long Short, Equity Ex-Top 100, and Hybrid Long Short funds.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">10 Funds Tracked</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Feb 2-23, 2026</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Daily NAV Data</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Returns Overview */}
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Best Equity Long Short (Feb 23-24)</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="flex items-center justify-between">
                     <span className="font-semibold">Diviniti SIF</span>
                     <span className="text-red-500 font-bold">{((984.6694 - 991.1304) / 991.1304 * 100).toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Best Ex-Top 100 (Feb 23-24)</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="flex items-center justify-between">
                     <span className="font-semibold">iSIF Ex-Top 100</span>
                     <span className="text-green-500 font-bold">+{((10.04 - 9.98) / 9.98 * 100).toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Best Hybrid (Feb 23-24)</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="flex items-center justify-between">
                      <span className="font-semibold">iSIF Ex-Top 100</span>
                      <span className="text-green-500 font-bold">+{((10.04 - 9.98) / 9.98 * 100).toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Equity Long Short Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Badge className="mb-3 bg-indigo-500/10 text-indigo-600 border-indigo-500/30">Equity Long Short</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold">
                Equity Long Short Fund Performance
              </h2>
              <p className="text-muted-foreground mt-2">
                2 funds in this category: Diviniti SIF (ITI) and qSIF (Quant)
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* NAV Chart */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">Daily NAV Movement</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <ChartContainer config={equityChartConfig} className="h-[300px] w-full">
                    <LineChart data={equityLongShortData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        yAxisId="left"
                        orientation="left"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `₹${value}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="diviniti" 
                        name="Diviniti SIF (₹)"
                        stroke="#6366f1" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#6366f1" }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="qsif" 
                        name="qSIF (₹)"
                        stroke="#9b59b6" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#9b59b6" }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Returns Cards */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                   <CardTitle className="text-lg">Daily Returns (Feb 23-24)</CardTitle>
                 </CardHeader>
                 <CardContent className="px-0 pb-0 space-y-4">
                   {equityReturns.sort((a, b) => b.return - a.return).map((fund) => (
                     <ReturnCard 
                       key={fund.name} 
                       name={fund.name} 
                       returnPct={fund.return} 
                       amc={fund.amc}
                       color={fund.color}
                     />
                   ))}
                   <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <p className="text-sm text-red-600 font-medium flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Both equity funds declined on Feb 24 — Diviniti -0.65%, qSIF Equity -0.13%
                     </p>
                   </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Equity Ex-Top 100 Section */}
        <section className="py-12 lg:py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Badge className="mb-3 bg-orange-500/10 text-orange-600 border-orange-500/30">Equity Ex-Top 100</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold">
                Equity Ex-Top 100 Long Short Performance
              </h2>
              <p className="text-muted-foreground mt-2">
                2 funds in this category: qSIF Ex-Top 100 (Quant) and iSIF Ex-Top 100 (ICICI Prudential)
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* NAV Chart */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">Daily NAV Movement</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <ChartContainer config={exTop100ChartConfig} className="h-[300px] w-full">
                    <LineChart data={equityExTop100Data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        domain={['auto', 'auto']}
                        tickFormatter={(value) => `₹${value.toFixed(2)}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="qsifExTop100" 
                        name="qSIF Ex-Top 100 (₹)"
                        stroke="#f97316" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#f97316" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="isifExTop100" 
                        name="iSIF Ex-Top 100 (₹)"
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ r: 6, fill: "#22c55e" }}
                        connectNulls={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Returns Cards */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg">Daily Returns (Feb 23-24)</CardTitle>
                 </CardHeader>
                 <CardContent className="px-0 pb-0 space-y-4">
                   {exTop100Returns.map((fund) => (
                     <ReturnCard 
                       key={fund.name} 
                       name={fund.name} 
                       returnPct={fund.return} 
                       amc={fund.amc}
                       color={fund.color}
                     />
                   ))}
                   <div className="mt-4 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        Mixed day for Ex-Top 100 — iSIF +0.60%, qSIF -0.40%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Hybrid Long Short Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Badge className="mb-3 bg-red-500/10 text-red-600 border-red-500/30">Hybrid Long Short</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold">
                Hybrid Long Short Fund Performance
              </h2>
              <p className="text-muted-foreground mt-2">
                6 funds in this category: Altiva, Arudha, iSIF, Magnum, qSIF Hybrid, and Titanium
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* NAV Chart */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">Daily NAV Movement</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <ChartContainer config={hybridChartConfig} className="h-[350px] w-full">
                    <LineChart data={hybridLongShortData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        domain={[9.8, 10.4]}
                        tickFormatter={(value) => `₹${value.toFixed(1)}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="altiva" 
                        name="Altiva SIF"
                        stroke="#3498db" 
                        strokeWidth={2}
                        dot={{ r: 5, fill: "#3498db" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="magnum" 
                        name="Magnum SIF"
                        stroke="#f39c12" 
                        strokeWidth={2}
                        dot={{ r: 5, fill: "#f39c12" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="qsif" 
                        name="qSIF Hybrid"
                        stroke="#9b59b6" 
                        strokeWidth={2}
                        dot={{ r: 5, fill: "#9b59b6" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="titanium" 
                        name="Titanium SIF"
                        stroke="#e74c3c" 
                        strokeWidth={2}
                        dot={{ r: 5, fill: "#e74c3c" }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="arudha" 
                        name="Arudha SIF"
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ r: 5, fill: "#10b981" }}
                        connectNulls={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="isif" 
                        name="iSIF Hybrid"
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ r: 5, fill: "#22c55e" }}
                        connectNulls={false}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Returns Cards */}
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-lg">Daily Returns (Feb 23-24)</CardTitle>
                 </CardHeader>
                 <CardContent className="px-0 pb-0 space-y-3">
                  {hybridReturns.filter(f => !["Arudha SIF", "iSIF Hybrid"].includes(f.name) || f.return !== 0).sort((a, b) => b.return - a.return).map((fund) => (
                    <ReturnCard 
                      key={fund.name} 
                      name={fund.name} 
                      returnPct={fund.return} 
                      amc={fund.amc}
                      color={fund.color}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Comparative Bar Chart */}
            <Card className="mt-8 p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg">Hybrid Funds - Daily Return Comparison</CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <ChartContainer config={hybridChartConfig} className="h-[250px] w-full">
                  <BarChart data={hybridReturns.sort((a, b) => b.return - a.return)} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" tickFormatter={(value) => `${value.toFixed(2)}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={90} />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border p-2 rounded shadow-lg">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">{data.amc}</p>
                              <p className={`font-bold ${data.return >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {data.return >= 0 ? '+' : ''}{data.return.toFixed(4)}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="return" radius={[0, 4, 4, 0]}>
                      {hybridReturns.sort((a, b) => b.return - a.return).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Daily NAV Analysis CTA */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/10 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        February 2026 Daily NAV Analysis
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Interactive charts comparing daily NAV movements across all SIF funds. 
                        See which funds are outperforming with visual return comparisons.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <a href="/performance/february-2026/equity-long-short">
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">Equity Long Short</Badge>
                        </a>
                        <a href="/performance/february-2026/equity-ex-top-100">
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">Ex-Top 100</Badge>
                        </a>
                        <a href="/performance/february-2026/hybrid-long-short">
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-primary/10">Hybrid Long Short</Badge>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Note and Disclaimer Section */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">*</span> NAVs taken are for Direct Plan Growth Option
            </p>
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-amber-600">Disclaimer:</strong> Past performance is not indicative of future results. 
                  The NAV values and returns shown are based on publicly available data. Investment in SIFs involves market risks. 
                  Please read all scheme-related documents carefully before investing. The information provided is for educational 
                  purposes only and should not be construed as investment advice.
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

export default PerformanceFeb2026;
