import { sifFunds, getSifsByCategory } from '@/lib/sifData';
import { calculateAlphaShield } from '@/lib/alphaShield';
import type { FundRecommendation } from './types';

export function matchSifCategory(
  risk: string,
  priorities: string[],
  currentInvestments: string[],
  surplus: string
): string {
  const wantsCrashProtection = priorities.includes('Protection from market crashes');
  const wantsGrowth = priorities.includes('Better returns than mutual funds');
  const wantsHedgeFund = priorities.includes('Access to hedge fund-style strategies');
  const wantsLowerMin = priorities.includes('Lower minimum than PMS (₹50L)');
  const hasPMS = currentInvestments.includes('PMS');
  const highSurplus = surplus === '₹50L–1Cr' || surplus === '₹1Cr+';

  // Active Asset Allocator for PMS holders / high surplus / multiple priorities
  if ((hasPMS && highSurplus) || (priorities.length >= 2 && highSurplus)) {
    return 'Active Asset Allocator';
  }

  // Conservative + crash protection → Hybrid Long-Short
  if (risk === 'Conservative' || wantsCrashProtection) {
    return 'Hybrid Long-Short';
  }

  // Aggressive + growth → Equity Long-Short
  if (risk === 'Aggressive' || wantsGrowth || wantsHedgeFund) {
    return 'Equity Long-Short';
  }

  // Moderate + currently in MF → Ex-Top 100
  if (risk === 'Moderate' && currentInvestments.includes('Mutual Funds')) {
    return 'Ex-Top 100 Long-Short';
  }

  // Default: Hybrid Long-Short (safest recommendation for new SIF investors)
  return 'Hybrid Long-Short';
}

export function getTopFundsForCategory(categoryMatch: string): FundRecommendation[] {
  // Map category names to slugs
  const categorySlugMap: Record<string, string> = {
    'Hybrid Long-Short': 'hybrid-long-short',
    'Equity Long-Short': 'equity-long-short',
    'Ex-Top 100 Long-Short': 'equity-ex-top-100',
    'Active Asset Allocator': 'active-asset-allocator',
  };

  const slug = categorySlugMap[categoryMatch] || 'hybrid-long-short';
  let categoryFunds = getSifsByCategory(slug);

  // If no funds in category (e.g., Active Asset Allocator), fall back to all funds
  if (categoryFunds.length === 0) {
    categoryFunds = sifFunds.filter(f =>
      f.category.toLowerCase().includes(categoryMatch.toLowerCase().split(' ')[0])
    );
  }
  if (categoryFunds.length === 0) {
    categoryFunds = getSifsByCategory('hybrid-long-short');
  }

  // Sort by Alpha Shield Score (highest first)
  const scored = categoryFunds
    .filter(f => f.marchCrashData.fundReturn !== null)
    .map(f => ({
      fund: f,
      score: calculateAlphaShield(
        f.marchCrashData.fundReturn,
        f.marchCrashData.benchmarkReturn
      ),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return scored.slice(0, 3).map((item, idx): FundRecommendation => ({
    fundName: item.fund.name,
    amc: item.fund.amc,
    alphaShieldScore: item.score,
    marchReturn: item.fund.marchCrashData.fundReturn,
    category: item.fund.category,
    verdict: idx === 0 ? 'best_match' : idx === 1 ? 'strong_fit' : 'consider',
  }));
}

export function getBrandingCompleteness(partner: {
  firm_name: string | null;
  logo_url: string | null;
  profile_photo_url: string | null;
  brand_color: string;
  tagline: string | null;
  phone: string | null;
  email: string;
  cta_text: string;
  signature_url: string | null;
}): number {
  let pct = 0;
  if (partner.firm_name) pct += 15;
  if (partner.logo_url) pct += 20;
  if (partner.profile_photo_url) pct += 15;
  if (partner.brand_color && partner.brand_color !== '#1B4B8A') pct += 10;
  if (partner.tagline) pct += 10;
  if (partner.phone && partner.email) pct += 15;
  if (partner.cta_text && partner.cta_text !== 'Schedule a SIF Consultation') pct += 10;
  if (partner.signature_url) pct += 5;
  return pct;
}
