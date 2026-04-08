"use client";

import dynamic from "next/dynamic";
import { sifFunds, SIFund } from "@/lib/sifData";
import { calculateAlphaShield, getAlphaShieldColor } from "@/lib/alphaShield";
import { niftyMonthlyReturns } from "@/lib/benchmarkData";
import AlphaShieldBadge from "@/components/AlphaShieldBadge";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Trophy,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const MONTHS: Record<string, { label: string; start: string; end: string; niftyReturn?: number; isLive?: boolean; context: string }> = {
  'october-2025': { label: 'October 2025', start: '2025-10-01', end: '2025-10-31', niftyReturn: -6.2, context: 'First month of SIF launches. Market correction with Nifty falling over 6%. Early test for newly launched SIF strategies.' },
  'november-2025': { label: 'November 2025', start: '2025-11-01', end: '2025-11-30', niftyReturn: -0.3, context: 'Relatively flat month for markets. SIFs started building positions and establishing track records.' },
  'december-2025': { label: 'December 2025', start: '2025-12-01', end: '2025-12-31', niftyReturn: -2.0, context: 'Year-end market weakness. More SIFs launched including Titanium and Diviniti.' },
  'january-2026': { label: 'January 2026', start: '2026-01-01', end: '2026-01-31', niftyReturn: -0.8, context: 'Mild market weakness. Budget anticipation kept volatility elevated.' },
  'february-2026': { label: 'February 2026', start: '2026-02-01', end: '2026-02-28', niftyReturn: -5.9, context: 'Significant market selloff. FII outflows accelerated. New SIF launches from ICICI and Bandhan.' },
  'march-2026': { label: 'March 2026', start: '2026-03-02', end: '2026-03-30', niftyReturn: -11.30, context: 'Broad market selloff driven by FII outflows and global risk-off. Nifty tested multi-month lows — the first real stress test for SIF strategies.' },
  'april-2026': { label: 'April 2026', start: '2026-04-01', end: 'present', isLive: true, context: 'Current month. Markets attempting recovery. New SIF launches from DSP.' },
};

const MONTH_SLUGS = Object.keys(MONTHS);

function getMonthLabel(slug: string): string {
  const m = MONTHS[slug];
  if (!m) return '';
  // Convert "October 2025" to "Oct 2025"
  const parts = m.label.split(' ');
  return parts[0].slice(0, 3) + ' ' + parts[1];
}

function formatReturn(value: number | null): { text: string; className: string } {
  if (value === null) return { text: 'N/A', className: 'text-muted-foreground' };
  const isPositive = value > 0;
  const isNegative = value < 0;
  return {
    text: `${isPositive ? '+' : ''}${value.toFixed(2)}%`,
    className: `font-semibold tabular-nums ${isPositive ? 'text-emerald-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'}`,
  };
}

interface Props {
  monthSlug: string;
}

export default function PageClient({ monthSlug }: Props) {
  const monthConfig = MONTHS[monthSlug];

  if (!monthConfig) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Performance Report Not Found</h1>
            <p className="text-muted-foreground mb-6">The month you requested does not have a performance report yet.</p>
            <Link href="/sifreturns" className="text-primary underline hover:no-underline">
              Back to SIF Returns
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const monthLabel = getMonthLabel(monthSlug);
  const monthStartDate = new Date(monthConfig.start);

  // Filter funds active during this month
  const activeFunds = sifFunds.filter((fund) => {
    const inception = new Date(fund.inceptionDate);
    return inception <= monthStartDate;
  });

  // Get monthly return for each fund
  const fundData = activeFunds.map((fund) => {
    const monthlyReturn = fund.monthlyReturns[monthLabel] ?? null;
    return { fund, monthlyReturn };
  });

  // Sort by monthly return (best first, nulls last)
  fundData.sort((a, b) => {
    if (a.monthlyReturn === null && b.monthlyReturn === null) return 0;
    if (a.monthlyReturn === null) return 1;
    if (b.monthlyReturn === null) return -1;
    return b.monthlyReturn - a.monthlyReturn;
  });

  const niftyReturn = monthConfig.niftyReturn ?? niftyMonthlyReturns[monthLabel] ?? null;

  // Stats
  const validReturns = fundData.filter((d) => d.monthlyReturn !== null).map((d) => d.monthlyReturn as number);
  const bestPerformer = fundData.length > 0 && fundData[0].monthlyReturn !== null ? fundData[0] : null;
  const worstPerformer = validReturns.length > 0 ? fundData.filter((d) => d.monthlyReturn !== null).slice(-1)[0] : null;
  const avgReturn = validReturns.length > 0 ? validReturns.reduce((a, b) => a + b, 0) / validReturns.length : null;
  const positiveCount = validReturns.filter((r) => r > 0).length;
  const negativeCount = validReturns.filter((r) => r < 0).length;

  // Navigation
  const currentIdx = MONTH_SLUGS.indexOf(monthSlug);
  const prevSlug = currentIdx > 0 ? MONTH_SLUGS[currentIdx - 1] : null;
  const nextSlug = currentIdx < MONTH_SLUGS.length - 1 ? MONTH_SLUGS[currentIdx + 1] : null;

  // Auto-generated insights
  const insights: { icon: typeof Trophy; color: string; title: string; text: string }[] = [];

  if (bestPerformer) {
    insights.push({
      icon: Trophy,
      color: 'text-emerald-600',
      title: `Best Performer: ${bestPerformer.fund.shortName}`,
      text: `${bestPerformer.fund.shortName} (${bestPerformer.fund.amc}) led the pack with ${bestPerformer.monthlyReturn! >= 0 ? '+' : ''}${bestPerformer.monthlyReturn!.toFixed(2)}% in ${monthLabel}.`,
    });
  }

  if (worstPerformer && worstPerformer !== bestPerformer) {
    insights.push({
      icon: AlertTriangle,
      color: 'text-red-600',
      title: `Worst Performer: ${worstPerformer.fund.shortName}`,
      text: `${worstPerformer.fund.shortName} (${worstPerformer.fund.amc}) returned ${worstPerformer.monthlyReturn! >= 0 ? '+' : ''}${worstPerformer.monthlyReturn!.toFixed(2)}% — the weakest in the month.`,
    });
  }

  if (avgReturn !== null) {
    insights.push({
      icon: BarChart3,
      color: 'text-blue-600',
      title: `Category Average: ${avgReturn >= 0 ? '+' : ''}${avgReturn.toFixed(2)}%`,
      text: `Out of ${validReturns.length} active funds, ${positiveCount} posted positive returns and ${negativeCount} were in the red.`,
    });
  }

  if (niftyReturn !== null && avgReturn !== null) {
    const alpha = avgReturn - niftyReturn;
    insights.push({
      icon: alpha >= 0 ? TrendingUp : TrendingDown,
      color: alpha >= 0 ? 'text-emerald-600' : 'text-amber-600',
      title: `vs Nifty: ${alpha >= 0 ? '+' : ''}${alpha.toFixed(2)}% Alpha`,
      text: `Nifty returned ${niftyReturn >= 0 ? '+' : ''}${niftyReturn.toFixed(2)}% in ${monthLabel}. SIF average ${alpha >= 0 ? 'outperformed' : 'underperformed'} by ${Math.abs(alpha).toFixed(2)} percentage points.`,
    });
  }

  // Date range display
  const dateRange = monthConfig.isLive
    ? `${monthConfig.start} to present`
    : `${monthConfig.start} to ${monthConfig.end}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-10 lg:py-14 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            {monthConfig.isLive && (
              <Badge variant="outline" className="mb-4 text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                LIVE
              </Badge>
            )}
            {!monthConfig.isLive && (
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Calendar className="w-3 h-3 mr-1" />
                {monthConfig.label} Analysis
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {monthConfig.label} SIF Performance Report
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-2">
              {activeFunds.length} Funds Analysed &bull; {dateRange}
            </p>
            <div className="mt-4 inline-flex items-start gap-2 px-4 py-3 rounded-xl bg-muted/40 border border-border/40 text-left max-w-xl">
              <BarChart3 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">
                {monthConfig.context}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  {bestPerformer ? (
                    <>
                      <p className={`text-2xl md:text-3xl font-bold ${bestPerformer.monthlyReturn! >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {bestPerformer.monthlyReturn! >= 0 ? '+' : ''}{bestPerformer.monthlyReturn!.toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Best Performer</p>
                      <p className="text-xs font-medium mt-0.5">{bestPerformer.fund.shortName}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No data</p>
                  )}
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  {worstPerformer ? (
                    <>
                      <p className={`text-2xl md:text-3xl font-bold ${worstPerformer.monthlyReturn! >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {worstPerformer.monthlyReturn! >= 0 ? '+' : ''}{worstPerformer.monthlyReturn!.toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Worst Performer</p>
                      <p className="text-xs font-medium mt-0.5">{worstPerformer.fund.shortName}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No data</p>
                  )}
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  {avgReturn !== null ? (
                    <>
                      <p className={`text-2xl md:text-3xl font-bold ${avgReturn >= 0 ? 'text-emerald-600' : avgReturn < 0 ? 'text-red-600' : 'text-foreground'}`}>
                        {avgReturn >= 0 ? '+' : ''}{avgReturn.toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Average Return</p>
                      <p className="text-xs font-medium mt-0.5">{positiveCount} positive, {negativeCount} negative</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No data</p>
                  )}
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-5 pb-4">
                  {niftyReturn !== null ? (
                    <>
                      <p className={`text-2xl md:text-3xl font-bold ${niftyReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {niftyReturn >= 0 ? '+' : ''}{niftyReturn.toFixed(2)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Nifty 50</p>
                      <p className="text-xs font-medium mt-0.5">Benchmark</p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl md:text-3xl font-bold text-muted-foreground">--</p>
                      <p className="text-xs text-muted-foreground mt-1">Nifty 50</p>
                      <p className="text-xs font-medium mt-0.5">Month in progress</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Returns Table */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold">{monthConfig.label} — Returns Summary</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                All active SIF funds sorted by monthly return. Direct Plan — Growth Option.
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Fund</th>
                      <th className="text-left px-3 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">AMC</th>
                      <th className="text-center px-3 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Inception</th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground">Monthly<br /><span className="text-[10px]">({monthLabel})</span></th>
                      <th className="text-right px-3 py-3 text-xs font-medium text-muted-foreground">Since<br />Inception</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {fundData.map(({ fund, monthlyReturn }) => {
                      const mr = formatReturn(monthlyReturn);
                      const si = formatReturn(fund.returns.sinceInception);
                      return (
                        <tr key={fund.id} className="hover:bg-muted/10 transition-colors">
                          <td className="px-4 py-3">
                            <Link href={`/${fund.slug}`} className="font-semibold text-sm text-foreground hover:text-primary transition-colors">
                              {fund.name}
                            </Link>
                            <p className="text-[11px] text-muted-foreground sm:hidden">{fund.amc}</p>
                          </td>
                          <td className="text-left px-3 py-3 text-sm text-muted-foreground hidden sm:table-cell">{fund.amc}</td>
                          <td className="text-center px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">{fund.inceptionDate}</td>
                          <td className="text-right px-3 py-3">
                            <span className={mr.className}>{mr.text}</span>
                          </td>
                          <td className="text-right px-3 py-3">
                            <span className={si.className}>{si.text}</span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Nifty benchmark row */}
                    {niftyReturn !== null && (
                      <tr className="bg-muted/20 border-t-2 border-border">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-sm text-muted-foreground">Nifty 50 (Benchmark)</p>
                        </td>
                        <td className="text-left px-3 py-3 text-sm text-muted-foreground hidden sm:table-cell">--</td>
                        <td className="text-center px-3 py-3 text-xs text-muted-foreground hidden md:table-cell">--</td>
                        <td className="text-right px-3 py-3">
                          <span className={`font-semibold tabular-nums ${niftyReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {niftyReturn >= 0 ? '+' : ''}{niftyReturn.toFixed(2)}%
                          </span>
                        </td>
                        <td className="text-right px-3 py-3">
                          <span className="text-muted-foreground text-sm">--</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {sifFunds.length > activeFunds.length && (
              <div className="mt-3 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/40 inline-block">
                <p className="text-[11px] text-muted-foreground">
                  {sifFunds.length - activeFunds.length} fund(s) not yet launched during {monthLabel} are excluded.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Alpha Shield Section (March 2026 only) */}
        {monthSlug === 'march-2026' && (
          <section className="py-10 lg:py-14 bg-secondary/20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Alpha Shield Leaderboard</h2>
              <p className="text-muted-foreground text-sm mb-6">
                How well did each fund protect capital when Nifty fell 11.30% in March 2026?
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {fundData
                  .filter((d) => d.monthlyReturn !== null)
                  .map(({ fund, monthlyReturn }) => {
                    const score = calculateAlphaShield(monthlyReturn, 11.30);
                    return (
                      <Card key={fund.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-semibold text-sm">{fund.shortName}</p>
                              <p className="text-[11px] text-muted-foreground">{fund.amc}</p>
                            </div>
                            <AlphaShieldBadge score={score} size="sm" showTooltip={true} />
                          </div>
                          <p className={`text-lg font-bold tabular-nums ${monthlyReturn! >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {monthlyReturn! >= 0 ? '+' : ''}{monthlyReturn!.toFixed(2)}%
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* Key Insights */}
        {insights.length > 0 && (
          <section className={`py-10 lg:py-14 ${monthSlug !== 'march-2026' ? 'bg-secondary/20' : ''}`}>
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">Key Insights</h2>
              <div className="grid gap-3">
                {insights.map((insight, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
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
        )}

        {/* Month Navigation */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Prev / Next */}
            <div className="flex items-center justify-between mb-8">
              {prevSlug ? (
                <Link href={`/performance/${prevSlug}`} className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <ChevronLeft className="w-4 h-4" />
                  {MONTHS[prevSlug].label}
                </Link>
              ) : (
                <span />
              )}
              {nextSlug ? (
                <Link href={`/performance/${nextSlug}`} className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  {MONTHS[nextSlug].label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span />
              )}
            </div>

            {/* Archive Grid */}
            <h3 className="text-lg font-bold text-foreground mb-4 text-center">All Monthly Reports</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {MONTH_SLUGS.map((slug) => {
                const m = MONTHS[slug];
                const isCurrent = slug === monthSlug;
                const label = m.label.split(' ');
                const shortLabel = label[0].slice(0, 3) + ' ' + label[1];
                return (
                  <Link
                    key={slug}
                    href={`/performance/${slug}`}
                    className={`p-3 rounded-xl border text-center text-sm font-medium transition-colors ${
                      isCurrent
                        ? 'border-primary bg-primary/10 text-primary'
                        : m.isLive
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-border bg-card text-foreground hover:border-primary/50'
                    }`}
                  >
                    {shortLabel}
                    {m.isLive && !isCurrent ? ' \uD83D\uDD34' : ''}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-amber-600">Disclaimer:</strong> NAV data sourced from AMFI (amfiindia.com). Direct Plan — Growth Option.
                  Monthly returns calculated from first and last available NAV of the month. Since Inception returns from respective NFO launch date.
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
}
