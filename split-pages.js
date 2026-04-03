#!/usr/bin/env node
/**
 * Splits each page.tsx into:
 * - page.tsx        → Server component (exports metadata, renders PageClient)
 * - PageClient.tsx  → "use client" component (all JSX/hooks)
 */

const fs = require("fs");
const path = require("path");

const APP_DIR = "/home/claude/sifprime-next/src/app";

function getPageDirs(dir, pages = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      getPageDirs(path.join(dir, entry.name), pages);
    } else if (entry.name === "page.tsx") {
      pages.push(path.join(dir, entry.name));
    }
  }
  return pages;
}

const pageFiles = getPageDirs(APP_DIR);
let processed = 0;

for (const pageFile of pageFiles) {
  const content = fs.readFileSync(pageFile, "utf8");
  
  // Only process files that have BOTH "use client" and metadata export
  if (!content.includes('"use client"') || !content.includes("export const metadata")) {
    continue;
  }

  const pageDir = path.dirname(pageFile);
  
  // Extract metadata block
  const metadataMatch = content.match(/export const metadata: Metadata = \{[\s\S]*?\};\n/);
  const metadataImport = content.includes("import type { Metadata }") 
    ? 'import type { Metadata } from "next";\n' 
    : "";
  
  const metadataBlock = metadataMatch ? metadataMatch[0] : "";
  
  // Derive component name from directory
  const dirName = path.basename(pageDir);
  const componentName = dirName
    .split(/[-\/]/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join("") + "Client";

  // Create PageClient.tsx — the full original content, just renamed
  let clientContent = content;
  // Remove metadata-related lines from client file
  clientContent = clientContent.replace(/import type \{ Metadata \} from "next";\n/, "");
  clientContent = clientContent.replace(/export const metadata: Metadata = \{[\s\S]*?\};\n/, "");
  // Ensure "use client" is at the very top
  clientContent = clientContent.replace(/^"use client";\n\n?/, "");
  clientContent = '"use client";\n\n' + clientContent.trimStart();
  
  // Rename the default export to ComponentName
  // Find the existing export default name
  const exportMatch = clientContent.match(/export default (\w+);?\s*$/m);
  const originalExportName = exportMatch ? exportMatch[1] : null;

  fs.writeFileSync(path.join(pageDir, "PageClient.tsx"), clientContent);

  // Create new server page.tsx — just metadata + import + render client
  const importPath = originalExportName 
    ? `import PageClient from "./PageClient";\n`
    : `import PageClient from "./PageClient";\n`;

  const serverContent = `import type { Metadata } from "next";
${importPath}
${metadataBlock}
export default function Page() {
  return <PageClient />;
}
`;

  fs.writeFileSync(pageFile, serverContent);
  console.log(`✅ Split: ${pageFile.replace(APP_DIR, "")}`);
  processed++;
}

console.log(`\nDone! Split ${processed} pages.`);
