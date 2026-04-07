import { NextResponse } from "next/server";

const AMFI_URL = "https://www.amfiindia.com/spages/NAVAll.txt";

// All 14 launched SIF scheme codes (Direct Growth plans)
const SIF_SCHEME_CODES = new Set([
  // Hybrid Long Short
  "151262", // Edelweiss Altiva Hybrid Long-Short
  "151786", // DSP Apex Hybrid Long-Short
  "151784", // Bandhan Arudha Hybrid Long-Short
  "151412", // ICICI Prudential iSIF Hybrid Long-Short
  "150963", // SBI Magnum Hybrid Long Short
  "151217", // Quant qSIF Hybrid Long-Short
  "151580", // Tata Titanium Hybrid Long-Short
  // Equity Long Short
  "151785", // Bandhan Arudha Equity Long-Short
  "151420", // ITI Diviniti Equity Long Short
  "151783", // 360 ONE DynaSIF Equity Long-Short
  "151218", // Quant qSIF Equity Long Short
  // Equity Ex-Top 100
  "151413", // ICICI Prudential iSIF Ex-Top 100 Long-Short
  "151527", // Quant qSIF Ex-Top 100 Long-Short
  // Active Asset Allocator
  "151788", // 360 ONE DynaSIF Active Asset Allocator
]);

// Also match Regular plan codes so we can pair them
const SIF_REGULAR_CODES = new Set([
  "151263", // Edelweiss Altiva Regular
  "151787", // DSP Apex Regular
  "151782", // Bandhan Arudha Hybrid Regular
  "151414", // ICICI iSIF Hybrid Regular
  "150964", // SBI Magnum Regular
  "151219", // Quant qSIF Hybrid Regular
  "151581", // Tata Titanium Regular
  "151781", // Bandhan Arudha Equity Regular
  "151421", // ITI Diviniti Regular
  "151780", // 360 ONE DynaSIF Equity Regular
  "151220", // Quant qSIF Equity Regular
  "151415", // ICICI iSIF Ex-Top 100 Regular
  "151528", // Quant qSIF Ex-Top 100 Regular
  "151789", // 360 ONE DynaSIF AAA Regular
]);

const ALL_CODES = new Set([...SIF_SCHEME_CODES, ...SIF_REGULAR_CODES]);

interface ParsedNav {
  schemeCode: string;
  schemeName: string;
  nav: number;
  date: string;
}

function parseAmfiData(text: string): ParsedNav[] {
  const lines = text.split("\n");
  const results: ParsedNav[] = [];

  for (const line of lines) {
    const parts = line.split(";");
    if (parts.length < 5) continue;

    const schemeCode = parts[0].trim();
    if (!ALL_CODES.has(schemeCode)) continue;

    const nav = parseFloat(parts[4]?.trim());
    if (isNaN(nav)) continue;

    results.push({
      schemeCode,
      schemeName: parts[3]?.trim() || "",
      nav,
      date: parts[5]?.trim() || "",
    });
  }

  return results;
}

// Map scheme codes to our fund display structure
const FUND_META: Record<string, { amc: string; fund: string; category: string; type?: string; regularCode: string }> = {
  "151262": { amc: "Edelweiss", fund: "Altiva Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularCode: "151263" },
  "151786": { amc: "DSP", fund: "Apex Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularCode: "151787" },
  "151784": { amc: "Bandhan", fund: "Arudha Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularCode: "151782" },
  "151412": { amc: "ICICI Prudential", fund: "iSIF Hybrid Long-Short", category: "Hybrid Long Short", regularCode: "151414" },
  "150963": { amc: "SBI", fund: "Magnum Hybrid Long Short", category: "Hybrid Long Short", type: "Interval", regularCode: "150964" },
  "151217": { amc: "Quant", fund: "qSIF Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularCode: "151219" },
  "151580": { amc: "Tata", fund: "Titanium Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularCode: "151581" },
  "151785": { amc: "Bandhan", fund: "Arudha Equity Long-Short", category: "Equity Long Short", regularCode: "151781" },
  "151420": { amc: "ITI", fund: "Diviniti Equity Long Short", category: "Equity Long Short", regularCode: "151421" },
  "151783": { amc: "360 ONE", fund: "DynaSIF Equity Long-Short", category: "Equity Long Short", regularCode: "151780" },
  "151218": { amc: "Quant", fund: "qSIF Equity Long Short", category: "Equity Long Short", regularCode: "151220" },
  "151413": { amc: "ICICI Prudential", fund: "iSIF Ex-Top 100 Long-Short", category: "Equity Ex-Top 100", regularCode: "151415" },
  "151527": { amc: "Quant", fund: "qSIF Ex-Top 100 Long-Short", category: "Equity Ex-Top 100", regularCode: "151528" },
  "151788": { amc: "360 ONE", fund: "DynaSIF Active Asset Allocator", category: "Active Asset Allocator", regularCode: "151789" },
};

export const revalidate = 86400; // ISR: revalidate once per day

export async function GET() {
  try {
    const res = await fetch(AMFI_URL, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`AMFI fetch failed: ${res.status}`);

    const text = await res.text();
    const parsed = parseAmfiData(text);

    // Build lookup by scheme code
    const navByCode = new Map<string, ParsedNav>();
    for (const p of parsed) {
      navByCode.set(p.schemeCode, p);
    }

    // Build fund list with direct + regular NAVs
    const funds = Object.entries(FUND_META).map(([directCode, meta]) => {
      const direct = navByCode.get(directCode);
      const regular = navByCode.get(meta.regularCode);

      return {
        amc: meta.amc,
        fund: meta.fund,
        nav: direct?.nav ?? 0,
        navRegular: regular?.nav ?? 0,
        date: direct?.date ?? "",
        category: meta.category,
        type: meta.type,
      };
    });

    return NextResponse.json({ funds, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch NAV data", funds: [] },
      { status: 500 }
    );
  }
}
