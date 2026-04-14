// One-off: inject <LeadCaptureForm /> into each of the 16 fund PageClient.tsx files.
// Safe to re-run: detects existing import and skips.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const funds = [
  { path: "src/app/qsif-equity-long-short/PageClient.tsx", slug: "qsif-equity-long-short", name: "qSIF Equity Long Short by Quant" },
  { path: "src/app/diviniti-equity-long-short/PageClient.tsx", slug: "diviniti-equity-long-short", name: "Diviniti SIF by ITI" },
  { path: "src/app/dyna-equity-long-short/PageClient.tsx", slug: "dyna-equity-long-short", name: "Dyna SIF by 360 ONE" },
  { path: "src/app/arudha-equity-long-short/PageClient.tsx", slug: "arudha-equity-long-short", name: "Arudha Equity L/S by Bandhan" },
  { path: "src/app/sifs/sapphire-equity-long-short/PageClient.tsx", slug: "sapphire-equity-long-short", name: "Sapphire SIF by Franklin Templeton" },
  { path: "src/app/qsif-ex-top-100-long-short/PageClient.tsx", slug: "qsif-ex-top-100-long-short", name: "qSIF Ex-Top 100 by Quant" },
  { path: "src/app/sifs/isif/extop100/PageClient.tsx", slug: "isif-ex-top-100", name: "iSIF Ex-Top 100 by ICICI" },
  { path: "src/app/sifs/qsif-hybrid-long-short/PageClient.tsx", slug: "qsif-hybrid-long-short", name: "qSIF Hybrid by Quant" },
  { path: "src/app/sifs/isif/hybrid/PageClient.tsx", slug: "isif-hybrid", name: "iSIF Hybrid by ICICI" },
  { path: "src/app/sifs/magnum-hybrid-long-short/PageClient.tsx", slug: "magnum-hybrid-long-short", name: "Magnum SIF by SBI" },
  { path: "src/app/sifs/titanium-hybrid-long-short/PageClient.tsx", slug: "titanium-hybrid-long-short", name: "Titanium SIF by Tata" },
  { path: "src/app/sifs/altiva-hybrid-long-short/PageClient.tsx", slug: "altiva-hybrid-long-short", name: "Altiva SIF by Edelweiss" },
  { path: "src/app/sifs/arudha-hybrid-long-short/PageClient.tsx", slug: "arudha-hybrid-long-short", name: "Arudha SIF by Bandhan" },
  { path: "src/app/apex-hybrid-long-short/PageClient.tsx", slug: "apex-hybrid-long-short", name: "Apex SIF by ABSL" },
  { path: "src/app/dyna-active-asset-allocator/PageClient.tsx", slug: "dyna-active-asset-allocator", name: "Dyna AAA by 360 ONE" },
  { path: "src/app/sifs/qsif-active-asset-allocator-long-short/PageClient.tsx", slug: "qsif-active-asset-allocator", name: "qSIF AAA by Quant" },
];

const IMPORT_LINE = `import LeadCaptureForm from "@/components/LeadCaptureForm";`;
// Match static OR dynamic Footer import:
const FOOTER_IMPORT_RE = /^(import Footer from ["']@\/components\/Footer["'];?|const Footer = dynamic\(\(\) => import\(["']@\/components\/Footer["']\)\);?)\s*$/m;

let updated = 0;
let skipped = 0;

for (const fund of funds) {
  const file = resolve(fund.path);
  let src;
  try {
    src = readFileSync(file, "utf8");
  } catch (err) {
    console.error(`MISSING: ${fund.path}`);
    continue;
  }

  if (src.includes("LeadCaptureForm")) {
    skipped++;
    continue;
  }

  // Inject import after Footer import
  if (!FOOTER_IMPORT_RE.test(src)) {
    console.error(`NO FOOTER IMPORT: ${fund.path}`);
    continue;
  }
  src = src.replace(FOOTER_IMPORT_RE, (m) => `${m}\n${IMPORT_LINE}`);

  // Inject form before the last <Footer /> occurrence
  const idx = src.lastIndexOf("<Footer />");
  if (idx === -1) {
    console.error(`NO <Footer /> TAG: ${fund.path}`);
    continue;
  }

  // Find start of the line containing <Footer />
  const lineStart = src.lastIndexOf("\n", idx) + 1;
  const indent = src.slice(lineStart, idx);

  const formBlock =
    `${indent}<section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">\n` +
    `${indent}  <div className="container mx-auto px-4 max-w-3xl">\n` +
    `${indent}    <LeadCaptureForm fundSlug=${JSON.stringify(fund.slug)} fundName=${JSON.stringify(fund.name)} source="fund-page" />\n` +
    `${indent}  </div>\n` +
    `${indent}</section>\n`;

  src = src.slice(0, lineStart) + formBlock + src.slice(lineStart);

  writeFileSync(file, src, "utf8");
  updated++;
  console.log(`OK: ${fund.path}`);
}

console.log(`\nUpdated: ${updated}  Skipped (already had form): ${skipped}`);
