#!/usr/bin/env node
/**
 * Inject FundFAQ component into each /sifs/<slug>/page.tsx.
 * Idempotent: skips files that already contain "FundFAQ".
 *
 * For each fund slug, we map to the metadata needed by buildFundFAQs:
 * fundName, shortName, amc, category, benchmark, terDirect, inceptionDate, status.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "src", "app", "sifs");

/** @typedef {{
 *   slug: string,
 *   fundName: string,
 *   shortName: string,
 *   amc: string,
 *   category: 'Equity Long Short'|'Hybrid Long Short'|'Equity Ex-Top 100'|'Active Asset Allocator',
 *   benchmark?: string,
 *   terDirect?: number,
 *   inceptionDate?: string,
 *   status?: 'live'|'nfo'
 * }} FundMeta
 */

/** @type {FundMeta[]} */
const FUNDS = [
  // Equity Long Short
  {
    slug: "qsif-equity-long-short",
    fundName: "qSIF Equity Long-Short",
    shortName: "qSIF Equity Long-Short",
    amc: "Quant Mutual Fund",
    category: "Equity Long Short",
    benchmark: "Nifty 500 TRI",
    terDirect: 2.15,
    inceptionDate: "October 8, 2025",
  },
  {
    slug: "diviniti-equity-long-short",
    fundName: "Diviniti Equity Long-Short",
    shortName: "Diviniti SIF",
    amc: "ITI Mutual Fund",
    category: "Equity Long Short",
    benchmark: "Nifty 500 TRI",
    inceptionDate: "December 2025",
  },
  {
    slug: "dyna-equity-long-short",
    fundName: "Dyna Equity Long-Short",
    shortName: "Dyna SIF",
    amc: "360 ONE Asset",
    category: "Equity Long Short",
    benchmark: "Nifty 500 TRI",
    inceptionDate: "November 2025",
  },
  {
    slug: "arudha-equity-long-short",
    fundName: "Arudha Equity Long-Short",
    shortName: "Arudha Equity SIF",
    amc: "Bandhan Mutual Fund",
    category: "Equity Long Short",
    benchmark: "Nifty 500 TRI",
    inceptionDate: "February 2026",
  },
  {
    slug: "sapphire-equity-long-short",
    fundName: "Sapphire Equity Long-Short",
    shortName: "Sapphire SIF",
    amc: "Franklin Templeton India",
    category: "Equity Long Short",
    benchmark: "Nifty 500 TRI",
    status: "nfo",
  },

  // Ex-Top 100
  {
    slug: "qsif-ex-top-100-long-short",
    fundName: "qSIF Ex-Top 100 Long-Short",
    shortName: "qSIF Ex-Top 100",
    amc: "Quant Mutual Fund",
    category: "Equity Ex-Top 100",
    benchmark: "Nifty Midsmallcap 400 TRI",
    inceptionDate: "November 13, 2025",
  },
  {
    slug: "wsif-ex-top-100-long-short",
    fundName: "WSIF Equity Ex-Top 100 Long-Short",
    shortName: "WSIF Ex-Top 100",
    amc: "The Wealth Company Mutual Fund",
    category: "Equity Ex-Top 100",
    benchmark: "Nifty 500 TRI",
    status: "nfo",
  },

  // Hybrid Long Short
  {
    slug: "altiva-hybrid-long-short",
    fundName: "Altiva Hybrid Long-Short",
    shortName: "Altiva SIF",
    amc: "Edelweiss Mutual Fund",
    category: "Hybrid Long Short",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "October 24, 2025",
  },
  {
    slug: "magnum-hybrid-long-short",
    fundName: "Magnum Hybrid Long-Short",
    shortName: "Magnum SIF",
    amc: "SBI Mutual Fund",
    category: "Hybrid Long Short",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "October 29, 2025",
  },
  {
    slug: "qsif-hybrid-long-short",
    fundName: "qSIF Hybrid Long-Short",
    shortName: "qSIF Hybrid",
    amc: "Quant Mutual Fund",
    category: "Hybrid Long Short",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "November 2025",
  },
  {
    slug: "titanium-hybrid-long-short",
    fundName: "Titanium Hybrid Long-Short",
    shortName: "Titanium SIF",
    amc: "Tata Mutual Fund",
    category: "Hybrid Long Short",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "December 17, 2025",
  },
  {
    slug: "arudha-hybrid-long-short",
    fundName: "Arudha Hybrid Long-Short",
    shortName: "Arudha SIF",
    amc: "Bandhan Mutual Fund",
    category: "Hybrid Long Short",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "February 4, 2026",
  },
  {
    slug: "apex-hybrid-long-short",
    fundName: "Apex Hybrid Long-Short",
    shortName: "Apex SIF",
    amc: "Aditya Birla Sun Life Mutual Fund",
    category: "Hybrid Long Short",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "January 2026",
  },

  // Active Asset Allocator
  {
    slug: "dyna-active-asset-allocator",
    fundName: "Dyna Active Asset Allocator",
    shortName: "Dyna AAA",
    amc: "360 ONE Asset",
    category: "Active Asset Allocator",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    inceptionDate: "November 2025",
  },
  {
    slug: "qsif-active-asset-allocator-long-short",
    fundName: "qSIF Active Asset Allocator Long-Short",
    shortName: "qSIF AAA",
    amc: "Quant Mutual Fund",
    category: "Active Asset Allocator",
    benchmark: "Nifty 50 Hybrid Composite Debt 50:50",
    status: "nfo",
  },

  // WSIF Equity (separate)
  {
    slug: "wsif-equity-long-short",
    fundName: "WSIF Equity Long-Short",
    shortName: "WSIF SIF",
    amc: "The Wealth Company Mutual Fund",
    category: "Equity Long Short",
    benchmark: "Nifty 500 TRI",
    status: "nfo",
  },
];

/**
 * Inject FundFAQ into a page.tsx.
 * Pattern: find `<RelatedFunds ... />` and append `<FundFAQ ... />` after it.
 * If page has no <RelatedFunds, fall back to before final </main> or final fragment close.
 */
function inject(slug, meta) {
  const path = join(ROOT, slug, "page.tsx");
  let src;
  try {
    src = readFileSync(path, "utf8");
  } catch {
    console.warn(`SKIP ${slug}: page.tsx not found`);
    return false;
  }

  if (src.includes("FundFAQ")) {
    console.log(`SKIP ${slug}: already has FundFAQ`);
    return false;
  }

  // Inject the import after the FundPageJsonLd import (or after first import block)
  const fundPageJsonLdImport = /import\s+FundPageJsonLd\s+from\s+["']@\/components\/FundPageJsonLd["'];?/;
  if (fundPageJsonLdImport.test(src)) {
    src = src.replace(
      fundPageJsonLdImport,
      (m) =>
        `${m}\nimport FundFAQ from "@/components/FundFAQ";\nimport { buildFundFAQs } from "@/lib/fundFAQs";`,
    );
  } else {
    // Insert after the last `from "next"` import or first import line
    const lastImport = /(^import .+;\s*$)/m;
    src = src.replace(
      lastImport,
      `$1\nimport FundFAQ from "@/components/FundFAQ";\nimport { buildFundFAQs } from "@/lib/fundFAQs";`,
    );
  }

  // Build the metadata literal for buildFundFAQs
  const metaLines = [
    `  fundName: ${JSON.stringify(meta.fundName)},`,
    `  shortName: ${JSON.stringify(meta.shortName)},`,
    `  amc: ${JSON.stringify(meta.amc)},`,
    `  category: ${JSON.stringify(meta.category)},`,
  ];
  if (meta.benchmark) metaLines.push(`  benchmark: ${JSON.stringify(meta.benchmark)},`);
  if (meta.terDirect !== undefined) metaLines.push(`  terDirect: ${meta.terDirect},`);
  if (meta.inceptionDate) metaLines.push(`  inceptionDate: ${JSON.stringify(meta.inceptionDate)},`);
  if (meta.status) metaLines.push(`  status: ${JSON.stringify(meta.status)},`);

  const faqBlock =
    `\n      <FundFAQ\n        faqs={buildFundFAQs({\n${metaLines.map((l) => "    " + l).join("\n")}\n        })}\n      />\n    `;

  // Try after <RelatedFunds .../>
  const relatedFundsMatch = src.match(/<RelatedFunds[^>]*\/>\s*/);
  if (relatedFundsMatch) {
    const idx = relatedFundsMatch.index + relatedFundsMatch[0].length;
    src = src.slice(0, idx) + faqBlock.trim() + "\n      " + src.slice(idx);
  } else {
    // Append before final </>) or </main>
    src = src.replace(
      /(\s*)<\/>(\s*\);\s*\}?\s*)$/,
      `$1${faqBlock.trim()}\n    </>$2`,
    );
  }

  writeFileSync(path, src, "utf8");
  console.log(`OK   ${slug}`);
  return true;
}

let modified = 0;
for (const fund of FUNDS) {
  if (inject(fund.slug, fund)) modified++;
}
console.log(`\n${modified}/${FUNDS.length} fund pages updated.`);
