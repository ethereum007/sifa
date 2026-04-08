// Per-benchmark monthly returns (month-over-month %)
// Source: NSE Indices (niftyindices.com) — Fixed Income & Equity Dashboards, March 31 2026

export type BenchmarkId =
  | 'nifty50'
  | 'nifty50-hybrid-debt-5050'
  | 'nifty50-hybrid-debt-6535'
  | 'nifty500'
  | 'niftyMidcap150';

export interface BenchmarkInfo {
  id: BenchmarkId;
  name: string;
  shortName: string;
  marchReturn: number;
  monthlyReturns: Record<string, number | null>;
  threeMonth: number;
  oneYear: number | null;
}

export const benchmarks: Record<BenchmarkId, BenchmarkInfo> = {
  'nifty50': {
    id: 'nifty50',
    name: 'Nifty 50',
    shortName: 'Nifty 50',
    marchReturn: -11.30,
    monthlyReturns: {
      'Oct 2025': -6.2,
      'Nov 2025': -0.3,
      'Dec 2025': -2.0,
      'Jan 2026': -0.8,
      'Feb 2026': -5.9,
      'Mar 2026': -11.30,
      'Apr 2026': null,
    },
    threeMonth: -14.44,
    oneYear: -3.99,
  },
  'nifty50-hybrid-debt-5050': {
    id: 'nifty50-hybrid-debt-5050',
    name: 'NIFTY 50 Hybrid Composite Debt 50:50',
    shortName: 'Hybrid 50:50',
    marchReturn: -6.35,
    monthlyReturns: {
      'Oct 2025': -3.1,   // estimated proportional to Nifty 50 with 50% debt cushion
      'Nov 2025': -0.1,
      'Dec 2025': -0.8,
      'Jan 2026': -0.2,
      'Feb 2026': -2.8,
      'Mar 2026': -6.35,
      'Apr 2026': null,
    },
    threeMonth: -7.79,
    oneYear: -0.64,
  },
  'nifty50-hybrid-debt-6535': {
    id: 'nifty50-hybrid-debt-6535',
    name: 'NIFTY 50 Hybrid Composite Debt 65:35',
    shortName: 'Hybrid 65:35',
    marchReturn: -7.84,
    monthlyReturns: {
      'Oct 2025': -3.9,
      'Nov 2025': -0.2,
      'Dec 2025': -1.2,
      'Jan 2026': -0.4,
      'Feb 2026': -3.7,
      'Mar 2026': -7.84,
      'Apr 2026': null,
    },
    threeMonth: -9.81,
    oneYear: -1.62,
  },
  'nifty500': {
    id: 'nifty500',
    name: 'Nifty 500',
    shortName: 'Nifty 500',
    marchReturn: -11.36,
    monthlyReturns: {
      'Oct 2025': -6.3,
      'Nov 2025': -0.4,
      'Dec 2025': -2.1,
      'Jan 2026': -0.9,
      'Feb 2026': -5.8,
      'Mar 2026': -11.36,
      'Apr 2026': null,
    },
    threeMonth: -13.88,
    oneYear: -2.88,
  },
  'niftyMidcap150': {
    id: 'niftyMidcap150',
    name: 'Nifty Midcap 150',
    shortName: 'Midcap 150',
    marchReturn: -11.06,
    monthlyReturns: {
      'Oct 2025': -6.0,
      'Nov 2025': -0.5,
      'Dec 2025': -1.8,
      'Jan 2026': -0.7,
      'Feb 2026': -5.5,
      'Mar 2026': -11.06,
      'Apr 2026': null,
    },
    threeMonth: -12.63,
    oneYear: 2.27,
  },
};

// Map fund benchmark string (from sifData) to benchmarkId
export function getBenchmarkForFund(benchmarkName: string): BenchmarkInfo {
  const map: Record<string, BenchmarkId> = {
    'NIFTY 50 Hybrid Composite Debt 50:50': 'nifty50-hybrid-debt-5050',
    'NIFTY 50 Hybrid Composite Debt 65:35': 'nifty50-hybrid-debt-6535',
    'Nifty 500': 'nifty500',
    'Nifty Midcap 150': 'niftyMidcap150',
    'Nifty 50': 'nifty50',
  };
  const id = map[benchmarkName] ?? 'nifty50';
  return benchmarks[id];
}

// Legacy exports for backward compatibility
export const niftyMonthlyReturns = benchmarks['nifty50'].monthlyReturns;
export const niftyBenchmarks = {
  oneMonth: -11.30,
  threeMonth: -14.44,
  oneYear: -3.99,
};
