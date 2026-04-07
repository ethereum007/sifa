import { NextResponse } from "next/server";

const AMFI_SIF_URL = "https://www.amfiindia.com/api/sif-latest-nav?type=";

interface AmfiScheme {
  SIFName: string;
  sifId: string;
  type: string;
  category: string;
  Sd_Id: string;
  ISINPO: string;
  ISINRI: string;
  NavName: string;
  Date: string;
  NetAssetValue: number;
}

interface AmfiGroup {
  SIFName: string;
  schemes: AmfiScheme[];
}

interface AmfiCategory {
  type: string;
  category: string;
  groups: AmfiGroup[];
}

interface AmfiTypeGroup {
  type: string;
  categories: AmfiCategory[];
}

interface AmfiResponse {
  data: AmfiTypeGroup[];
}

interface FundEntry {
  amc: string;
  fund: string;
  nav: number;
  navRegular: number;
  date: string;
  category: string;
  type?: string;
}

// Map SIF Code (Direct Growth) -> display metadata + Regular Growth SIF code
const FUND_META: Record<string, { amc: string; fund: string; category: string; type?: string; regularSifId: string }> = {
  "SIF-9":  { amc: "Edelweiss", fund: "Altiva Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularSifId: "SIF-11" },
  "SIF-79": { amc: "DSP", fund: "Apex Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularSifId: "SIF-80" },
  "SIF-54": { amc: "Bandhan", fund: "Arudha Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularSifId: "SIF-40" },
  "SIF-36": { amc: "ICICI Prudential", fund: "iSIF Hybrid Long-Short", category: "Hybrid Long Short", regularSifId: "SIF-35" },
  "SIF-14": { amc: "SBI", fund: "Magnum Hybrid Long Short", category: "Hybrid Long Short", type: "Interval", regularSifId: "SIF-13" },
  "SIF-5":  { amc: "Quant", fund: "qSIF Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularSifId: "SIF-7" },
  "SIF-32": { amc: "Tata", fund: "Titanium Hybrid Long-Short", category: "Hybrid Long Short", type: "Interval", regularSifId: "SIF-29" },
  "SIF-61": { amc: "Bandhan", fund: "Arudha Equity Long-Short", category: "Equity Long Short", regularSifId: "SIF-62" },
  "SIF-19": { amc: "ITI", fund: "Diviniti Equity Long Short", category: "Equity Long Short", regularSifId: "SIF-21" },
  "SIF-57": { amc: "360 ONE", fund: "DynaSIF Equity Long-Short", category: "Equity Long Short", regularSifId: "SIF-55" },
  "SIF-1":  { amc: "Quant", fund: "qSIF Equity Long Short", category: "Equity Long Short", regularSifId: "SIF-3" },
  "SIF-33": { amc: "ICICI Prudential", fund: "iSIF Ex-Top 100 Long-Short", category: "Equity Ex-Top 100", regularSifId: "SIF-34" },
  "SIF-23": { amc: "Quant", fund: "qSIF Ex-Top 100 Long-Short", category: "Equity Ex-Top 100", regularSifId: "SIF-25" },
  "SIF-88": { amc: "360 ONE", fund: "DynaSIF Active Asset Allocator", category: "Active Asset Allocator", regularSifId: "SIF-87" },
};

function isDirectGrowth(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes("direct") && lower.includes("growth") && !lower.includes("idcw");
}

function isRegularGrowth(name: string): boolean {
  const lower = name.toLowerCase();
  return lower.includes("regular") && lower.includes("growth") && !lower.includes("idcw");
}

export const revalidate = 86400;

export async function GET() {
  try {
    const res = await fetch(AMFI_SIF_URL, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`AMFI SIF fetch failed: ${res.status}`);

    const json: AmfiResponse = await res.json();

    // Build lookup: SIF Code -> NAV for all Direct & Regular Growth schemes
    const navBySifId = new Map<string, { nav: number; date: string }>();

    for (const typeGroup of json.data) {
      for (const cat of typeGroup.categories) {
        for (const group of cat.groups) {
          for (const scheme of group.schemes) {
            const name = scheme.NavName;
            if (isDirectGrowth(name) || isRegularGrowth(name)) {
              navBySifId.set(scheme.Sd_Id, {
                nav: scheme.NetAssetValue,
                date: scheme.Date,
              });
            }
          }
        }
      }
    }

    // Build fund list with direct + regular NAVs
    const funds: FundEntry[] = Object.entries(FUND_META).map(([directSifId, meta]) => {
      const direct = navBySifId.get(directSifId);
      const regular = navBySifId.get(meta.regularSifId);

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
