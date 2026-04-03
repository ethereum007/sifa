/**
 * Updates all page.tsx server wrappers to import PageClient with ssr: false
 * This prevents localStorage errors during static generation
 */
const fs = require("fs");
const path = require("path");

const APP_DIR = "/home/claude/sifprime-next/src/app";

function getPageFiles(dir, pages = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      getPageFiles(path.join(dir, entry.name), pages);
    } else if (entry.name === "page.tsx") {
      pages.push(path.join(dir, entry.name));
    }
  }
  return pages;
}

const pageFiles = getPageFiles(APP_DIR);
let fixed = 0;

for (const pageFile of pageFiles) {
  const content = fs.readFileSync(pageFile, "utf8");
  
  // Only touch files that import PageClient statically
  if (!content.includes('import PageClient from "./PageClient"')) continue;

  const newContent = content
    .replace(
      'import type { Metadata } from "next";\nimport PageClient from "./PageClient";',
      'import type { Metadata } from "next";\nimport dynamic from "next/dynamic";\n\nconst PageClient = dynamic(() => import("./PageClient"), { ssr: false });'
    )
    .replace(
      'import PageClient from "./PageClient";\nimport type { Metadata } from "next";',
      'import type { Metadata } from "next";\nimport dynamic from "next/dynamic";\n\nconst PageClient = dynamic(() => import("./PageClient"), { ssr: false });'
    );

  if (newContent !== content) {
    fs.writeFileSync(pageFile, newContent);
    fixed++;
    console.log(`✅ ${pageFile.replace(APP_DIR, "")}`);
  }
}

// Also fix the root page.tsx which has a slightly different structure
const rootPage = path.join(APP_DIR, "page.tsx");
let rootContent = fs.readFileSync(rootPage, "utf8");
if (rootContent.includes('import PageClient from "./PageClient"') && !rootContent.includes("dynamic")) {
  rootContent = rootContent.replace(
    'import PageClient from "./PageClient";',
    'import dynamic from "next/dynamic";\n\nconst PageClient = dynamic(() => import("./PageClient"), { ssr: false });'
  );
  fs.writeFileSync(rootPage, rootContent);
  fixed++;
  console.log("✅ /page.tsx");
}

console.log(`\nFixed ${fixed} pages.`);
