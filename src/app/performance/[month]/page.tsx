import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

const MONTHS: Record<string, { label: string; start: string; end: string; niftyReturn?: number; isLive?: boolean; context: string }> = {
  'october-2025': { label: 'October 2025', start: '2025-10-01', end: '2025-10-31', niftyReturn: -6.2, context: 'First month of SIF launches. Market correction with Nifty falling over 6%. Early test for newly launched SIF strategies.' },
  'november-2025': { label: 'November 2025', start: '2025-11-01', end: '2025-11-30', niftyReturn: -0.3, context: 'Relatively flat month for markets. SIFs started building positions and establishing track records.' },
  'december-2025': { label: 'December 2025', start: '2025-12-01', end: '2025-12-31', niftyReturn: -2.0, context: 'Year-end market weakness. More SIFs launched including Titanium and Diviniti.' },
  'january-2026': { label: 'January 2026', start: '2026-01-01', end: '2026-01-31', niftyReturn: -0.8, context: 'Mild market weakness. Budget anticipation kept volatility elevated.' },
  'february-2026': { label: 'February 2026', start: '2026-02-01', end: '2026-02-28', niftyReturn: -5.9, context: 'Significant market selloff. FII outflows accelerated. New SIF launches from ICICI and Bandhan.' },
  'march-2026': { label: 'March 2026', start: '2026-03-02', end: '2026-03-30', niftyReturn: -11.30, context: 'Broad market selloff driven by FII outflows and global risk-off. Nifty tested multi-month lows — the first real stress test for SIF strategies.' },
  'april-2026': { label: 'April 2026', start: '2026-04-01', end: 'present', isLive: true, context: 'Current month. Markets attempting recovery. New SIF launches from DSP.' },
};

type Params = { month: string };

export async function generateStaticParams() {
  return Object.keys(MONTHS).map(month => ({ month }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { month } = await params;
  const m = MONTHS[month];
  if (!m) return { title: 'Performance Report | SIFPrime' };
  return {
    title: `${m.label} SIF Performance Report — Returns & Analysis | SIFPrime`,
    description: `Complete SIF fund returns for ${m.label}. Nifty returned ${m.niftyReturn ?? 'N/A'}%. Full analysis of all active funds.`,
    alternates: { canonical: `https://sifprime.com/performance/${month}` },
    openGraph: { title: `${m.label} SIF Performance Report`, description: `SIF performance data for ${m.label}. Nifty: ${m.niftyReturn ?? 'N/A'}%.`, url: `https://sifprime.com/performance/${month}`, images: ['https://sifprime.com/og-image.png'], type: 'article' },
  };
}

export const revalidate = 86400;

export default async function Page({ params }: { params: Promise<Params> }) {
  const { month } = await params;
  return <PageClient monthSlug={month} />;
}
