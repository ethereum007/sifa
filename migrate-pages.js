#!/usr/bin/env node
/**
 * Migration script: converts Vite React pages to Next.js App Router pages
 * - Extracts <Helmet> metadata → export const metadata
 * - Replaces react-router Link → next/link
 * - Adds "use client" directive
 * - Creates proper folder/page.tsx structure
 */

const fs = require("fs");
const path = require("path");

const PAGES_DIR = "/home/claude/sifprime-next/src/pages_old";
const APP_DIR = "/home/claude/sifprime-next/src/app";

// Route map: component file → URL path
const ROUTE_MAP = {
  "Index.tsx": "/",
  "Nav.tsx": "/sifnav",
  "SIFs.tsx": "/sifs",
  "ISIFIndex.tsx": "/sifs/isif",
  "ISIF.tsx": "/sifs/isif/extop100",
  "ISIFHybrid.tsx": "/sifs/isif/hybrid",
  "SifVsAif.tsx": "/sif-vs-mf",
  "SifFundInsights.tsx": "/sif-fund-insights",
  "SifStrategies.tsx": "/sif-strategies",
  "WhatIsSif.tsx": "/what-is-sif",
  "SifMinimumInvestment.tsx": "/sif-minimum-investment",
  "PerformanceHybridLongShort.tsx": "/performance/hybrid-long-short",
  "PerformanceEquityLongShort.tsx": "/performance/equity-long-short",
  "SifPerformanceHub.tsx": "/sifperformance",
  "BecomeDistributor.tsx": "/become-distributor",
  "SifFundsLaunched.tsx": "/sif-funds-launched",
  "UpcomingSifs.tsx": "/upcoming-sifs",
  "MagnumSif.tsx": "/sifs/magnum-hybrid-long-short",
  "TitaniumSif.tsx": "/sifs/titanium-hybrid-long-short",
  "AltivaSif.tsx": "/sifs/altiva-hybrid-long-short",
  "AltivaSifJan2026.tsx": "/sifs/altiva-hybrid-long-short/january-2026",
  "ArudhaSif.tsx": "/sifs/arudha-hybrid-long-short",
  "DivinitiSif.tsx": "/diviniti-equity-long-short",
  "ArudhaEquityLongShort.tsx": "/arudha-equity-long-short",
  "QsifHybridSif.tsx": "/sifs/qsif-hybrid-long-short",
  "QsifEquitySif.tsx": "/qsif-equity-long-short",
  "QsifExTop100Sif.tsx": "/qsif-ex-top-100-long-short",
  "PerformanceFeb2026.tsx": "/performance/february-2026",
  "PerformanceMar2026.tsx": "/performance/march-2026",
  "PerformanceMar2026EquityLongShort.tsx": "/performance/march-2026/equity-long-short",
  "PerformanceMar2026ExTop100.tsx": "/performance/march-2026/equity-ex-top-100",
  "PerformanceFeb2026HybridLongShort.tsx": "/performance/february-2026/hybrid-long-short",
  "PerformanceFeb2026EquityExTop100.tsx": "/performance/february-2026/equity-ex-top-100",
  "PerformanceFeb2026EquityLongShort.tsx": "/performance/february-2026/equity-long-short",
  "DynaSif.tsx": "/dyna-equity-long-short",
  "DynaSifActiveAssetAllocator.tsx": "/dyna-active-asset-allocator",
  "ApexSif.tsx": "/apex-hybrid-long-short",
  "SifReturns.tsx": "/sifreturns",
  "SifVsMutualFund.tsx": "/sifvsmutualfund",
  "SifBillionDollarOpportunity.tsx": "/distributors/sif-billion-dollar-opportunity",
  "SifLiquidityGuide.tsx": "/sif-liquidity-guide",
  "SifSipSwpGuide.tsx": "/sif-sip-swp-guide",
  "PrivacyPolicy.tsx": "/privacy-policy",
  "TermsOfService.tsx": "/terms-of-service",
  "Disclaimer.tsx": "/disclaimer",
  "AllSifsRanked.tsx": "/all-sifs-india-ranked-explained",
  "WhichSifToInvest.tsx": "/which-sif-should-you-invest-in",
  "SifVsPmsVsAif.tsx": "/sif-vs-pms-vs-aif",
  "SifTaxGuide.tsx": "/sif-tax-guide",
  "SifRedemptionRules.tsx": "/sif-redemption-rules",
  "ExTop100SifExplained.tsx": "/ex-top-100-sif-explained",
  "BestHybridSif.tsx": "/best-hybrid-sif",
  "NriSifGuide.tsx": "/nri-sif-guide",
  "SifDerivativesExplained.tsx": "/sif-derivatives-explained",
  "Blog.tsx": "/blog",
  "Contact.tsx": "/contact",
  "Arudha.tsx": "/arudha",
  "NotFound.tsx": null, // handled separately
};

function convertPage(content, routePath) {
  // 1. Remove Helmet import
  content = content.replace(/import \{ Helmet \} from ['"]react-helmet-async['"];\n?/g, "");
  content = content.replace(/import \{ Helmet, HelmetProvider \} from ['"]react-helmet-async['"];\n?/g, "");

  // 2. Replace react-router Link with next/link
  content = content.replace(/import \{ Link \} from ['"]react-router-dom['"];?\n?/g, 'import Link from "next/link";\n');
  content = content.replace(/from ['"]react-router-dom['"]/g, 'from "next/navigation"');
  // Fix: useNavigate → useRouter
  content = content.replace(/useNavigate/g, "useRouter");
  content = content.replace(/const navigate = useRouter\(\)/g, "const router = useRouter()");
  content = content.replace(/navigate\(/g, "router.push(");

  // 3. Replace @/ aliases (keep as-is, Next.js supports them)
  
  // 4. Extract Helmet metadata
  const helmetMatch = content.match(/<Helmet[^>]*>([\s\S]*?)<\/Helmet>/);
  let metadataExport = "";
  
  if (helmetMatch) {
    const helmetContent = helmetMatch[1];
    
    const titleMatch = helmetContent.match(/<title>(.*?)<\/title>/);
    const descMatch = helmetContent.match(/<meta name="description" content="(.*?)"\s*\/?>/);
    const canonicalMatch = helmetContent.match(/<link rel="canonical" href="(.*?)"\s*\/?>/);
    const ogTitleMatch = helmetContent.match(/<meta property="og:title" content="(.*?)"\s*\/?>/);
    const ogDescMatch = helmetContent.match(/<meta property="og:description" content="(.*?)"\s*\/?>/);
    const ogImageMatch = helmetContent.match(/<meta property="og:image" content="(.*?)"\s*\/?>/);
    const twitterTitleMatch = helmetContent.match(/<meta name="twitter:title" content="(.*?)"\s*\/?>/);
    const twitterDescMatch = helmetContent.match(/<meta name="twitter:description" content="(.*?)"\s*\/?>/);

    const title = titleMatch ? titleMatch[1].replace(/ \| SIFPrime$/, "") : "";
    const desc = descMatch ? descMatch[1] : "";
    const canonical = canonicalMatch ? canonicalMatch[1] : routePath ? `https://sifprime.com${routePath}` : "";
    const ogTitle = ogTitleMatch ? ogTitleMatch[1].replace(/ \| SIFPrime$/, "") : title;
    const ogDesc = ogDescMatch ? ogDescMatch[1] : desc;
    const ogImage = ogImageMatch ? ogImageMatch[1] : "/og-image.png";

    if (title || desc) {
      metadataExport = `
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "${title.replace(/"/g, '\\"')}",
  description: "${desc.replace(/"/g, '\\"')}",
  alternates: { canonical: "${canonical}" },
  openGraph: {
    title: "${ogTitle.replace(/"/g, '\\"')}",
    description: "${ogDesc.replace(/"/g, '\\"')}",
    url: "${canonical}",
    images: ["${ogImage}"],
    type: "article",
  },
  twitter: {
    title: "${ogTitle.replace(/"/g, '\\"')}",
    description: "${ogDesc.replace(/"/g, '\\"')}",
  },
};
`;
    }

    // Remove the Helmet JSX block from component
    content = content.replace(/<Helmet[^>]*>[\s\S]*?<\/Helmet>\s*/g, "");
  }

  // 5. Add "use client" at top (safe to add to all pages since they use hooks/interactivity)
  content = '"use client";\n\n' + content;

  // 6. Insert metadata export after imports (before component definition)
  if (metadataExport) {
    // Find the position after all imports
    const lastImportIndex = content.lastIndexOf("\nimport ");
    if (lastImportIndex !== -1) {
      const endOfImports = content.indexOf("\n", lastImportIndex + 1);
      content = content.slice(0, endOfImports + 1) + metadataExport + content.slice(endOfImports + 1);
    }
  }

  return content;
}

let converted = 0;
let skipped = 0;

for (const [file, routePath] of Object.entries(ROUTE_MAP)) {
  if (routePath === null) { skipped++; continue; }
  
  const srcFile = path.join(PAGES_DIR, file);
  if (!fs.existsSync(srcFile)) { 
    console.log(`⚠️  Missing: ${file}`);
    skipped++;
    continue; 
  }

  // Determine output folder
  let destDir;
  if (routePath === "/") {
    destDir = APP_DIR;
  } else {
    destDir = path.join(APP_DIR, routePath);
  }

  fs.mkdirSync(destDir, { recursive: true });
  
  const content = fs.readFileSync(srcFile, "utf8");
  const converted_content = convertPage(content, routePath);
  
  fs.writeFileSync(path.join(destDir, "page.tsx"), converted_content);
  console.log(`✅ ${file} → ${routePath}/page.tsx`);
  converted++;
}

console.log(`\nDone! Converted: ${converted}, Skipped: ${skipped}`);
