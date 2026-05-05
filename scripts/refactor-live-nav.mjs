// One-off: refactor each fund PageClient.tsx to fetch live NAV from /api/nav
// instead of using the hardcoded sifData.currentNav.
//
// Strategy (minimally invasive):
//  1. Add `import { useFundNav, formatNavDate } from "@/hooks/useSifNav";`
//  2. Inside the default export function, before the JSX return, inject:
//       const __live = useFundNav("API_NAME", FUND.currentNav);
//       const liveNav = __live.nav;
//       const liveDate = formatNavDate(__live.date) || "<old hard-coded date>";
//       const METRICS_LIVE = METRICS.map((m, i) =>
//         i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
//       );
//  3. Rename `METRICS.map` -> `METRICS_LIVE.map`, `METRICS.length` -> `METRICS_LIVE.length`
//  4. Replace remaining `FUND.currentNav.toFixed(4)` (inside JSX) with `liveNav.toFixed(4)`
//
// Idempotent: skips files that already contain `useFundNav`.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// fund slug -> exact `fund` field name as returned by /api/nav
const FUNDS = [
  { path: "src/app/sifs/altiva-hybrid-long-short/PageClient.tsx",       api: "Altiva Hybrid Long-Short" },
  { path: "src/app/sifs/apex-hybrid-long-short/PageClient.tsx",         api: "Apex Hybrid Long-Short" },
  { path: "src/app/sifs/arudha-hybrid-long-short/PageClient.tsx",       api: "Arudha Hybrid Long-Short" },
  { path: "src/app/sifs/magnum-hybrid-long-short/PageClient.tsx",       api: "Magnum Hybrid Long Short" },
  { path: "src/app/sifs/qsif-hybrid-long-short/PageClient.tsx",         api: "qSIF Hybrid Long-Short" },
  { path: "src/app/sifs/titanium-hybrid-long-short/PageClient.tsx",     api: "Titanium Hybrid Long-Short" },
  { path: "src/app/sifs/isif/hybrid/PageClient.tsx",                    api: "iSIF Hybrid Long-Short" },
  { path: "src/app/arudha-equity-long-short/PageClient.tsx",            api: "Arudha Equity Long-Short" },
  { path: "src/app/dyna-equity-long-short/PageClient.tsx",              api: "DynaSIF Equity Long-Short" },
  { path: "src/app/qsif-equity-long-short/PageClient.tsx",              api: "qSIF Equity Long Short" },
  { path: "src/app/diviniti-equity-long-short/PageClient.tsx",          api: "Diviniti Equity Long Short" },
  { path: "src/app/qsif-ex-top-100-long-short/PageClient.tsx",          api: "qSIF Ex-Top 100 Long-Short" },
  { path: "src/app/sifs/isif/extop100/PageClient.tsx",                  api: "iSIF Ex-Top 100 Long-Short" },
  { path: "src/app/dyna-active-asset-allocator/PageClient.tsx",         api: "DynaSIF Active Asset Allocator" },
  // Note: also worth handling these if they exist:
  { path: "src/app/sifs/arudha-equity-long-short/PageClient.tsx",       api: "Arudha Equity Long-Short" },
  { path: "src/app/sifs/dyna-equity-long-short/PageClient.tsx",         api: "DynaSIF Equity Long-Short" },
  { path: "src/app/sifs/qsif-equity-long-short/PageClient.tsx",         api: "qSIF Equity Long Short" },
  { path: "src/app/sifs/diviniti-equity-long-short/PageClient.tsx",     api: "Diviniti Equity Long Short" },
  { path: "src/app/sifs/qsif-ex-top-100-long-short/PageClient.tsx",     api: "qSIF Ex-Top 100 Long-Short" },
  { path: "src/app/sifs/dyna-active-asset-allocator/PageClient.tsx",    api: "DynaSIF Active Asset Allocator" },
  { path: "src/app/sifs/qsif-active-asset-allocator-long-short/PageClient.tsx", api: "qSIF Active Asset Allocator" },
];

const HOOK_IMPORT = `import { useFundNav, formatNavDate } from "@/hooks/useSifNav";`;

let updated = 0, skipped = 0, missing = 0;

for (const { path, api } of FUNDS) {
  const abs = resolve(process.cwd(), path);
  let src;
  try {
    src = readFileSync(abs, "utf8");
  } catch {
    console.log(`MISSING ${path}`);
    missing++;
    continue;
  }

  if (src.includes("useFundNav")) {
    console.log(`SKIP    ${path}  (already refactored)`);
    skipped++;
    continue;
  }

  // 1. Add the import after the last existing import line (top of file)
  const importBlockEnd = src.lastIndexOf("\nimport ");
  if (importBlockEnd === -1) {
    console.log(`SKIP    ${path}  (no imports found)`);
    skipped++;
    continue;
  }
  const eolAfterImport = src.indexOf("\n", importBlockEnd + 1);
  src = src.slice(0, eolAfterImport + 1) + HOOK_IMPORT + "\n" + src.slice(eolAfterImport + 1);

  // 2. Find the existing date sub used in METRICS (e.g. "Apr 30, 2026", "Live", etc.)
  //    so we can preserve it as fallback.
  const subMatch = src.match(/value:\s*`₹\$\{FUND\.currentNav\.toFixed\(4\)\}`,\s*sub:\s*"([^"]+)"/);
  const fallbackDate = subMatch ? subMatch[1] : "Apr 30, 2026";

  // 3. Inject hook + METRICS_LIVE definition after the opening brace of the default-exported component.
  //    Component can be declared in any of:
  //      a. `export default function NAME(...) {`
  //      b. `function NAME(...) {`         + later `export default NAME;`
  //      c. `const NAME = (...) => {`      + later `export default NAME;`
  //      d. `const NAME = function (...) {` + later `export default NAME;`
  let fnMatch =
    src.match(/(export default function [A-Za-z0-9_]+\([^)]*\)\s*\{)/);
  if (!fnMatch) {
    // Find the default export name first
    const defaultName = src.match(/^export default ([A-Za-z0-9_]+);?\s*$/m);
    if (defaultName) {
      const name = defaultName[1];
      // Try arrow form: `const NAME = (...) => {`
      const re = new RegExp(`(const ${name} = \\([^)]*\\) => \\{)`);
      fnMatch = src.match(re);
      if (!fnMatch) {
        // Try function form: `function NAME(...) {`
        const re2 = new RegExp(`(function ${name}\\([^)]*\\)\\s*\\{)`);
        fnMatch = src.match(re2);
      }
    }
  }
  if (!fnMatch) {
    console.log(`SKIP    ${path}  (no default export function found)`);
    skipped++;
    continue;
  }
  const inject = `
  const __live = useFundNav(${JSON.stringify(api)}, FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || ${JSON.stringify(fallbackDate)};
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: \`₹\${liveNav.toFixed(4)}\`, sub: liveDate } : m
  );
`;
  // 3a. First rename METRICS.map / METRICS.length to METRICS_LIVE.* (in JSX usage).
  //     Do this BEFORE injecting (the injected line uses METRICS_LIVE = METRICS.map(...) — so the
  //     `METRICS.map` inside the inject string survives the rename intentionally).
  src = src.replace(/\bMETRICS\.map\b/g, "METRICS_LIVE.map");
  src = src.replace(/\bMETRICS\.length\b/g, "METRICS_LIVE.length");

  // 3b. Now inject the hook + METRICS_LIVE definition (which still references the original METRICS).
  src = src.replace(fnMatch[0], fnMatch[0] + inject);

  // 4. Replace inline FUND.currentNav.toFixed(4) in JSX with liveNav.toFixed(4).
  //    Use a negative lookbehind for `$` so we don't touch template literals like
  //    `${FUND.currentNav.toFixed(4)}` which also exist in the top-level METRICS const.
  src = src.replace(/(?<!\$)\{FUND\.currentNav\.toFixed\(4\)\}/g, "{liveNav.toFixed(4)}");

  writeFileSync(abs, src, "utf8");
  console.log(`OK      ${path}`);
  updated++;
}

console.log(`\nDone. updated=${updated} skipped=${skipped} missing=${missing}`);
