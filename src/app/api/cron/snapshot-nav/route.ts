import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Runs daily via Vercel Cron (see vercel.json).
// Pulls AMFI SIF NAV feed, extracts Direct + Regular Growth NAVs for our 14
// tracked SIFs, and upserts into public.nav_snapshots keyed by (sif_id, nav_date).

const AMFI_SIF_URL = "https://www.amfiindia.com/api/sif-latest-nav?type=";

// sifData.ts slug -> AMFI SIF codes
const SIF_CODE_MAP: Record<string, { direct: string; regular: string }> = {
  "altiva-hybrid-long-short":       { direct: "SIF-9",  regular: "SIF-11" },
  "apex-hybrid-long-short":         { direct: "SIF-79", regular: "SIF-80" },
  "arudha-hybrid-long-short":       { direct: "SIF-54", regular: "SIF-40" },
  "isif-hybrid-long-short":         { direct: "SIF-36", regular: "SIF-35" },
  "magnum-hybrid-long-short":       { direct: "SIF-14", regular: "SIF-13" },
  "qsif-hybrid-long-short":         { direct: "SIF-5",  regular: "SIF-7"  },
  "titanium-hybrid-long-short":     { direct: "SIF-32", regular: "SIF-29" },
  "arudha-equity-long-short":       { direct: "SIF-61", regular: "SIF-62" },
  "diviniti-equity-long-short":     { direct: "SIF-19", regular: "SIF-21" },
  "dyna-equity-long-short":         { direct: "SIF-57", regular: "SIF-55" },
  "qsif-equity-long-short":         { direct: "SIF-1",  regular: "SIF-3"  },
  "isif-ex-top-100-long-short":     { direct: "SIF-33", regular: "SIF-34" },
  "qsif-ex-top-100-long-short":     { direct: "SIF-23", regular: "SIF-25" },
  "dyna-active-asset-allocator":    { direct: "SIF-88", regular: "SIF-87" },
};

interface AmfiScheme {
  Sd_Id: string;
  NavName: string;
  Date: string;           // "DD-MMM-YYYY" from AMFI
  NetAssetValue: number;
}

interface AmfiResponse {
  data: Array<{
    categories: Array<{
      groups: Array<{ schemes: AmfiScheme[] }>;
    }>;
  }>;
}

function isDirectGrowth(name: string): boolean {
  const l = name.toLowerCase();
  return l.includes("direct") && l.includes("growth") && !l.includes("idcw");
}
function isRegularGrowth(name: string): boolean {
  const l = name.toLowerCase();
  return l.includes("regular") && l.includes("growth") && !l.includes("idcw");
}

// "06-Apr-2026" -> "2026-04-06"
function toIsoDate(amfiDate: string): string | null {
  const m = amfiDate.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
  if (!m) return null;
  const months: Record<string, string> = {
    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
  };
  const mm = months[m[2].toLowerCase()];
  if (!mm) return null;
  return `${m[3]}-${mm}-${m[1].padStart(2, "0")}`;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  // Guard: Vercel Cron sets this header automatically when you set CRON_SECRET.
  const auth = req.headers.get("authorization");
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  if (!process.env.CRON_SECRET || auth !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return NextResponse.json({ error: "missing supabase env" }, { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    const res = await fetch(AMFI_SIF_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`AMFI fetch ${res.status}`);
    const json: AmfiResponse = await res.json();

    // Index: SIF code -> { nav, dateIso }
    const byCode = new Map<string, { nav: number; dateIso: string }>();
    for (const typeGroup of json.data ?? []) {
      for (const cat of typeGroup.categories ?? []) {
        for (const group of cat.groups ?? []) {
          for (const s of group.schemes ?? []) {
            if (isDirectGrowth(s.NavName) || isRegularGrowth(s.NavName)) {
              const dateIso = toIsoDate(s.Date);
              if (!dateIso) continue;
              byCode.set(s.Sd_Id, { nav: s.NetAssetValue, dateIso });
            }
          }
        }
      }
    }

    const rows = Object.entries(SIF_CODE_MAP).flatMap(([sifId, codes]) => {
      const direct = byCode.get(codes.direct);
      const regular = byCode.get(codes.regular);
      const navDate = direct?.dateIso ?? regular?.dateIso;
      if (!navDate) return [];
      if (direct?.nav == null && regular?.nav == null) return [];
      return [{
        sif_id: sifId,
        amfi_direct_code: codes.direct,
        amfi_regular_code: codes.regular,
        nav_direct: direct?.nav ?? null,
        nav_regular: regular?.nav ?? null,
        nav_date: navDate,
      }];
    });

    if (rows.length === 0) {
      return NextResponse.json({ ok: true, inserted: 0, note: "no NAVs found in AMFI response" });
    }

    const { error } = await supabase
      .from("nav_snapshots")
      .upsert(rows, { onConflict: "sif_id,nav_date" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      upserted: rows.length,
      sample: rows[0],
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
