/**
 * Build category-aware FAQ sets for SIF fund pages.
 *
 * Goal: each fund page gets 6-8 FAQs that target real long-tail
 * Google queries (e.g., "is qSIF Equity Long-Short safe", "minimum
 * investment in Magnum SIF", "qSIF vs Altiva", "what is hybrid
 * long-short SIF") so the page is eligible for FAQ rich results.
 */

import type { FAQItem } from "@/components/FundFAQ";

export type SIFCategory =
  | "Equity Long Short"
  | "Hybrid Long Short"
  | "Equity Ex-Top 100"
  | "Active Asset Allocator";

interface FundFAQInput {
  /** e.g. "qSIF Equity Long-Short" */
  fundName: string;
  /** Short branded name (e.g., "qSIF") */
  shortName: string;
  /** Full AMC name (e.g., "Quant Mutual Fund") */
  amc: string;
  /** SIF category */
  category: SIFCategory;
  /** Benchmark index, e.g. "Nifty 500 TRI" */
  benchmark?: string;
  /** TER for Direct plan (number, e.g. 2.15) */
  terDirect?: number;
  /** Inception date in human form, e.g. "October 8, 2025" */
  inceptionDate?: string;
  /** Whether this fund is in NFO or live */
  status?: "nfo" | "live";
}

const CATEGORY_DESCRIPTIONS: Record<SIFCategory, string> = {
  "Equity Long Short":
    "an open-ended equity Specialized Investment Fund that takes long positions in equity and equity-related instruments and uses derivatives for limited short exposure (up to 25% unhedged)",
  "Hybrid Long Short":
    "an open-ended hybrid Specialized Investment Fund that combines equity, debt and equity-derivative positions, with limited unhedged short exposure (up to 25%) via derivatives",
  "Equity Ex-Top 100":
    "an equity Specialized Investment Fund that invests primarily in companies outside the top 100 by market capitalization (mid- and small-cap focused), with limited short exposure via derivatives",
  "Active Asset Allocator":
    "an open-ended Specialized Investment Fund that dynamically rotates allocation across equity, debt and arbitrage based on market conditions, with derivative-based hedging",
};

const CATEGORY_RISK: Record<SIFCategory, string> = {
  "Equity Long Short":
    "High equity-market risk plus derivative risk from short exposure. Volatility is typically lower than a pure long-only equity fund but higher than a debt or hybrid fund. Suited for investors with at least a 3-year horizon who are comfortable with mark-to-market drawdowns.",
  "Hybrid Long Short":
    "Moderate-to-high risk. The hybrid structure (equity + debt + arbitrage) softens drawdowns versus pure equity SIFs, but the derivatives-based short exposure introduces basis and roll risk. Suited for investors looking for equity-like upside with cushioned downside.",
  "Equity Ex-Top 100":
    "Higher risk than a top-100 equity SIF — mid- and small-caps are inherently more volatile, and the derivative-based short overlay does not fully neutralise that. Suited for investors with high risk tolerance and a 3+ year horizon.",
  "Active Asset Allocator":
    "Lower equity beta than a pure equity SIF because allocation rotates between debt and equity based on signals. Risk profile is moderate; drawdowns are typically smaller but upside in bull markets is also capped relative to long-only equity funds.",
};

export function buildFundFAQs({
  fundName,
  shortName,
  amc,
  category,
  benchmark,
  terDirect,
  inceptionDate,
  status = "live",
}: FundFAQInput): FAQItem[] {
  const isNFO = status === "nfo";
  const categoryDesc = CATEGORY_DESCRIPTIONS[category];
  const riskDesc = CATEGORY_RISK[category];

  const faqs: FAQItem[] = [
    {
      q: `What is ${fundName}?`,
      a: `${fundName} is ${categoryDesc}, managed by ${amc}. It is a SEBI-regulated Specialized Investment Fund (SIF) — a category introduced in April 2025 that sits between traditional mutual funds and PMS, with a ₹10 lakh minimum investment.${benchmark ? ` The fund is benchmarked to ${benchmark}.` : ""}${inceptionDate ? ` ${shortName} launched on ${inceptionDate}.` : ""}`,
    },
    {
      q: `What is the minimum investment in ${shortName}?`,
      a: `The minimum investment in ${fundName} is ₹10,00,000 (10 lakh rupees) — the SEBI-mandated floor for all Specialized Investment Funds in India. There is no upper limit. Subsequent investments through SIP or lumpsum follow the same minimum unit threshold per SEBI rules.`,
    },
    {
      q: `Is ${shortName} a safe investment?`,
      a: `${riskDesc} ${shortName} is regulated by SEBI under the SIF framework, has the same custodian, audit and disclosure standards as a mutual fund, and the AMC ${amc} is responsible for managing the fund within its stated mandate. However, "safe" is relative — past returns and crash-period performance are the better guide. See the live performance and Alpha Shield score for ${shortName} above.`,
    },
    {
      q: `How is ${shortName} different from a regular mutual fund?`,
      a: `Unlike a mutual fund, ${shortName} can take unhedged short positions (up to 25% of NAV) using derivatives. This allows the fund manager to profit when stocks fall, not just when they rise. The trade-off is a higher minimum investment (₹10 lakh vs ₹500 for an MF SIP) and slightly higher Total Expense Ratio. SIFs follow daily NAV publication, mutual-fund-level governance, and the same tax treatment as the underlying asset class.`,
    },
    {
      q: `How are ${shortName} returns taxed in India?`,
      a: `${shortName} is taxed based on its underlying portfolio composition, exactly like a mutual fund of the same category. Equity-oriented SIFs (>65% equity) qualify for equity taxation: 12.5% LTCG above ₹1.25 lakh after 12 months, 20% STCG before 12 months. Hybrid and debt-oriented SIFs are taxed at the investor's slab rate as per the post-April-2023 debt fund regime. See the SIFPrime tax guide for worked examples.`,
    },
    {
      q: `What is the expense ratio (TER) of ${shortName}?`,
      a: `${terDirect !== undefined ? `${shortName}'s Total Expense Ratio is ${terDirect.toFixed(2)}% on the Direct plan` : `${shortName}'s TER is published in the latest Scheme Information Document and on the AMC website`}. Direct plans are always cheaper than Regular plans (typically by 50–100 bps) because they do not include distributor commission. Direct plans are recommended for self-directed investors; Regular plans for investors using an MFD.`,
    },
    {
      q: `How can I invest in ${shortName}?`,
      a: `${isNFO ? `${shortName} is currently in its New Fund Offer (NFO) period. ` : ""}You can invest in ${shortName} directly through the ${amc} website (Direct plan), via a SEBI-registered Mutual Fund Distributor or RIA (Regular plan), or through online platforms that have onboarded SIFs. SIFPrime does not sell funds — we provide independent comparison and ratings. ${isNFO ? "The minimum NFO investment is ₹10 lakh." : ""}`,
    },
    {
      q: `Where can I compare ${shortName} with other SIFs?`,
      a: `Use the SIFPrime side-by-side comparison tool at /sif-compare to compare ${shortName} against any other live Specialized Investment Fund in India on Alpha Shield (capital protection), since-inception return, March 2026 crash-period alpha, TER, strategy and benchmark. The /all-sifs-india-ranked-explained page also ranks all 17 SIFs end-to-end.`,
    },
  ];

  return faqs;
}
