"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Partner, FundRecommendation } from "@/lib/partner/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ReportData {
  partner: Partner;
  lead: {
    client_name: string;
    risk_profile: string;
    investable_surplus: string;
    sif_category_match: string;
    priorities: string[];
    current_investments: string[];
    top_fund_recommendations: FundRecommendation[];
  };
}

/* ------------------------------------------------------------------ */
/*  Category metadata used in the report                               */
/* ------------------------------------------------------------------ */

const CATEGORY_INFO: Record<string, { strategy: string; bestFor: string; leader: string }> = {
  "Hybrid Long-Short": {
    strategy: "Equity + Hedging via derivatives",
    bestFor: "Conservative investors wanting crash protection",
    leader: "ICICI Prudential",
  },
  "Equity Long-Short": {
    strategy: "Long equity + Short equity/derivatives",
    bestFor: "Aggressive investors wanting alpha",
    leader: "DSP",
  },
  "Ex-Top 100 Long-Short": {
    strategy: "Mid/Small-cap long + hedging",
    bestFor: "Moderate investors wanting beyond large-cap",
    leader: "Kotak",
  },
  "Active Asset Allocator": {
    strategy: "Dynamic allocation across asset classes",
    bestFor: "HNI investors wanting tactical allocation",
    leader: "WhiteOak",
  },
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Hybrid Long-Short":
    "Combines equity holdings with derivative hedging to reduce drawdowns. Ideal for investors who want equity participation with downside protection.",
  "Equity Long-Short":
    "Takes both long and short equity positions to generate alpha regardless of market direction. Best for investors comfortable with higher complexity.",
  "Ex-Top 100 Long-Short":
    "Focuses on stocks outside the top 100 by market cap, with hedging overlay. Targets mid/small-cap alpha with risk management.",
  "Active Asset Allocator":
    "Dynamically shifts between equity, debt, and derivatives based on market conditions. Suitable for investors wanting a fully managed tactical portfolio.",
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ReportPageClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const reportId = params.reportId as string;
  const isDemo = searchParams.get("demo") === "true";
  const key = searchParams.get("key");

  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      if (isDemo && key) {
        // Fetch partner from key, use dummy lead data
        const res = await fetch(`/api/partner/me?key=${key}`);
        if (!res.ok) throw new Error("Could not load partner data");
        const partner: Partner = await res.json();

        setData({
          partner,
          lead: {
            client_name: "Sample Investor",
            risk_profile: "Moderate",
            investable_surplus: "\u20B925L\u201350L",
            sif_category_match: "Hybrid Long-Short",
            priorities: [
              "Protection from market crashes",
              "Better returns than mutual funds",
            ],
            current_investments: ["Mutual Funds", "Fixed Deposits"],
            top_fund_recommendations: [], // will be filled from API or sifMatcher on server
          },
        });
      } else {
        // Real report
        const res = await fetch(`/api/partner/report/${reportId}`);
        if (!res.ok) throw new Error("Report not found");
        const json = await res.json();
        setData({
          partner: json.partner,
          lead: {
            client_name: json.lead.client_name,
            risk_profile: json.lead.risk_profile || "Moderate",
            investable_surplus: json.lead.investable_surplus || "Not specified",
            sif_category_match: json.lead.sif_category_match || "Hybrid Long-Short",
            priorities: json.lead.priorities || [],
            current_investments: json.lead.current_investments || [],
            top_fund_recommendations: json.lead.top_fund_recommendations || [],
          },
        });

        // Log view (fire and forget)
        fetch(`/api/partner/report/${reportId}/view`, { method: "POST" }).catch(
          () => {}
        );
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load report");
    } finally {
      setLoading(false);
    }
  }, [reportId, isDemo, key]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* ---- Loading / Error states ---- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600">
            {error || "This report link may be invalid or expired."}
          </p>
        </div>
      </div>
    );
  }

  const { partner, lead } = data;
  const brandColor = partner.brand_color || "#1B4B8A";
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const funds = lead.top_fund_recommendations.slice(0, 3);
  const category = lead.sif_category_match || "Hybrid Long-Short";

  return (
    <>
      {/* ---------- PRINT CSS ---------- */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-before: always; }
          .report-container { box-shadow: none !important; max-width: 100% !important; }
        }
      `}</style>

      {/* ---------- ACTION BUTTONS (top right, hidden on print) ---------- */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium shadow hover:bg-gray-50 transition"
        >
          🖨️ Print / PDF
        </button>
        <button
          onClick={() => {
            const text = encodeURIComponent(
              `Check out your personalised SIF Recommendation Report: ${window.location.href}`
            );
            window.open(`https://wa.me/?text=${text}`, "_blank");
          }}
          className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium shadow hover:bg-green-700 transition"
        >
          📱 Share on WhatsApp
        </button>
      </div>

      <div className="min-h-screen bg-gray-100 print:bg-white">
        <div className="report-container max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
          {/* ============================================================ */}
          {/*  DEMO BANNER                                                  */}
          {/* ============================================================ */}
          {isDemo && (
            <div className="bg-yellow-50 border-b border-yellow-300 px-6 py-3 text-center text-sm text-yellow-800 no-print">
              ⚠️ This is a demo report with sample data. Your investors will see
              their actual personalised recommendation.
            </div>
          )}

          {/* ============================================================ */}
          {/*  BRANDED HEADER                                               */}
          {/* ============================================================ */}
          <BrandedHeader partner={partner} clientName={lead.client_name} date={today} brandColor={brandColor} />

          {/* ============================================================ */}
          {/*  SECTION 0 — What is a SIF?                                   */}
          {/* ============================================================ */}
          <section className="px-8 py-10">
            <SectionHeading num={0} title="What is a SIF?" color={brandColor} />
            <p className="text-gray-700 mb-6 leading-relaxed">
              A Specialised Investment Fund (SIF) is SEBI&apos;s newest investment category,
              launched in 2025. It bridges the gap between Mutual Funds and Portfolio
              Management Services (PMS).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <ComparisonCard
                title="Mutual Fund"
                items={[
                  { label: "Min. Investment", value: "\u20B9500" },
                  { label: "Strategy", value: "Long-only" },
                  { label: "Regulation", value: "High (SEBI)" },
                ]}
                highlight={false}
              />
              <ComparisonCard
                title="SIF"
                items={[
                  { label: "Min. Investment", value: "\u20B910 Lakh" },
                  { label: "Strategy", value: "Long-Short / Hedged" },
                  { label: "Regulation", value: "High (SEBI)" },
                ]}
                highlight={true}
                accentColor={brandColor}
              />
              <ComparisonCard
                title="PMS"
                items={[
                  { label: "Min. Investment", value: "\u20B950 Lakh" },
                  { label: "Strategy", value: "Custom / Long-Short" },
                  { label: "Regulation", value: "Moderate (SEBI)" },
                ]}
                highlight={false}
              />
            </div>

            <p className="text-gray-600 text-sm italic text-center">
              SIFs give you PMS-level strategy at MF-level transparency and a fraction
              of the minimum investment.
            </p>
          </section>

          <Divider />

          {/* ============================================================ */}
          {/*  SECTION 1 — Your Investor Profile                            */}
          {/* ============================================================ */}
          <section className="px-8 py-10">
            <SectionHeading num={1} title="Your Investor Profile" color={brandColor} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <InfoPill label="Risk Profile" value={lead.risk_profile} />
              <InfoPill label="Investable Surplus" value={lead.investable_surplus} />
            </div>

            {lead.current_investments.length > 0 && (
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Currently investing in:</span>{" "}
                {lead.current_investments.join(", ")}
              </p>
            )}

            {lead.priorities.length > 0 && (
              <p className="text-gray-700 mb-6">
                <span className="font-semibold">Priority:</span>{" "}
                {lead.priorities.join(", ")}
              </p>
            )}

            <p className="text-gray-700 mb-4">
              Based on your profile, the most suitable SIF category for you is:
            </p>

            <div
              className="inline-block rounded-xl px-8 py-5 text-white text-center"
              style={{ backgroundColor: brandColor }}
            >
              <div className="text-2xl font-bold mb-1">{category}</div>
              <div className="text-sm opacity-90">
                {CATEGORY_DESCRIPTIONS[category] || ""}
              </div>
            </div>
          </section>

          <Divider />

          {/* ============================================================ */}
          {/*  SECTION 2 — Top Fund Recommendations                         */}
          {/* ============================================================ */}
          <section className="px-8 py-10">
            <SectionHeading
              num={2}
              title="Top Fund Recommendations"
              color={brandColor}
            />

            {funds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {funds.map((f, i) => (
                  <FundCard key={i} fund={f} brandColor={brandColor} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic mb-6">
                Fund recommendations will be available once your advisor completes the analysis.
              </p>
            )}

            <p className="text-xs text-gray-500">
              <strong>Note:</strong> Alpha Shield Score measures how well a fund
              protected investors during the March 2026 crash. Higher is better
              (scale 0-10).
            </p>
          </section>

          <Divider />
          <div className="page-break" />

          {/* ============================================================ */}
          {/*  SECTION 3 — All SIF Categories Explained                     */}
          {/* ============================================================ */}
          <section className="px-8 py-10">
            <SectionHeading
              num={3}
              title="All SIF Categories Explained"
              color={brandColor}
            />

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: brandColor }} className="text-white">
                    <th className="px-4 py-3 text-left rounded-tl-lg">Category</th>
                    <th className="px-4 py-3 text-left">Strategy</th>
                    <th className="px-4 py-3 text-left">Alpha Shield Leader</th>
                    <th className="px-4 py-3 text-left">Best For</th>
                    <th className="px-4 py-3 text-left rounded-tr-lg">Min</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(CATEGORY_INFO).map(([cat, info], i) => (
                    <tr
                      key={cat}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-4 py-3 font-medium">{cat}</td>
                      <td className="px-4 py-3">{info.strategy}</td>
                      <td className="px-4 py-3">{info.leader}</td>
                      <td className="px-4 py-3">{info.bestFor}</td>
                      <td className="px-4 py-3">{"\u20B9"}10L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              19 SIFs tracked as of April 2026 (14 live + 5 NFO).
            </p>
          </section>

          <Divider />

          {/* ============================================================ */}
          {/*  SECTION 4 — March 2026 Crash Analysis                        */}
          {/* ============================================================ */}
          <section className="px-8 py-10">
            <SectionHeading
              num={4}
              title="Why SIFs Now: The March 2026 Market Crash"
              color={brandColor}
            />

            <p className="text-gray-700 mb-6 leading-relaxed">
              The March 2026 market correction tested every investment vehicle. Here is
              how SIFs compared to broad market indices:
            </p>

            <CrashChart brandColor={brandColor} />

            <p className="text-xs text-gray-500 mt-4">
              The Alpha Shield Score is derived from how each SIF performed relative to
              its benchmark during this crash period. Funds that protected capital score
              highest.
            </p>
          </section>

          <Divider />
          <div className="page-break" />

          {/* ============================================================ */}
          {/*  SECTION 5 — How to Invest in a SIF                           */}
          {/* ============================================================ */}
          <section className="px-8 py-10">
            <SectionHeading
              num={5}
              title="How to Invest in a SIF"
              color={brandColor}
            />

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
              {[
                { step: 1, title: "KYC", desc: "Complete your KYC if not already done" },
                { step: 2, title: "Choose SIF + AMC", desc: "Select the right fund and AMC" },
                { step: 3, title: "Application", desc: "Submit application via your MFD" },
                {
                  step: 4,
                  title: "Min \u20B910L",
                  desc: "Transfer minimum \u20B910 Lakh investment",
                },
                {
                  step: 5,
                  title: "Liquidity",
                  desc: "Redemption as per fund terms (typically monthly)",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-gray-50 rounded-xl p-4 text-center border"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2"
                    style={{ backgroundColor: brandColor }}
                  >
                    {s.step}
                  </div>
                  <div className="font-semibold text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-gray-600">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <strong>Important:</strong> SIF investments can only be made through
              empanelled Mutual Fund Distributors (MFDs). Your advisor must be
              empanelled with the chosen AMC to process your investment.
            </div>
          </section>

          <Divider />

          {/* ============================================================ */}
          {/*  SECTION 6 — Next Step                                        */}
          {/* ============================================================ */}
          <section className="px-8 py-10 text-center">
            <SectionHeading num={6} title="Next Step" color={brandColor} />

            <p className="text-gray-700 text-lg mb-6">
              <strong>{partner.full_name}</strong> at{" "}
              <strong>{partner.firm_name || "the firm"}</strong> will walk you through
              fund selection and documentation.
            </p>

            {partner.cta_url && (
              <a
                href={partner.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl px-8 py-4 text-white font-bold text-lg shadow-lg hover:opacity-90 transition mb-6"
                style={{ backgroundColor: brandColor }}
              >
                {partner.cta_text || "Schedule a SIF Consultation"}
              </a>
            )}

            <p className="text-gray-600">
              Questions?{" "}
              {partner.phone && (
                <>
                  📞{" "}
                  <a href={`tel:${partner.phone}`} className="underline">
                    {partner.phone}
                  </a>{" "}
                  |{" "}
                </>
              )}
              📧{" "}
              <a href={`mailto:${partner.email}`} className="underline">
                {partner.email}
              </a>
            </p>
          </section>

          {/* ============================================================ */}
          {/*  REPORT FOOTER                                                */}
          {/* ============================================================ */}
          <footer className="border-t-2 border-gray-200 px-8 py-8 bg-gray-50">
            {partner.signature_url && (
              <div className="mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.signature_url}
                  alt="Signature"
                  className="h-16 object-contain"
                />
              </div>
            )}

            <div className="text-sm text-gray-700 mb-2">
              <strong>{partner.full_name}</strong>
              {partner.firm_name && <> | {partner.firm_name}</>} | ARN:{" "}
              {partner.arn_number} | {today}
            </div>

            {partner.custom_disclaimer && (
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {partner.custom_disclaimer}
              </p>
            )}

            <p className="text-xs text-gray-400 text-center mt-4">
              Research powered by{" "}
              <a
                href="https://sifprime.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                SIFPrime
              </a>{" "}
              — India&apos;s SIF Intelligence Platform — sifprime.com
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

/* ================================================================== */
/*  Sub-components                                                     */
/* ================================================================== */

function BrandedHeader({
  partner,
  clientName,
  date,
  brandColor,
}: {
  partner: Partner;
  clientName: string;
  date: string;
  brandColor: string;
}) {
  const style = partner.report_header_style || "professional";

  if (style === "bold") {
    return (
      <header className="px-8 py-12 text-center text-white" style={{ backgroundColor: brandColor }}>
        {partner.logo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logo_url}
            alt="Logo"
            className="h-16 mx-auto mb-4 object-contain"
          />
        )}
        <h1 className="text-3xl font-bold mb-1">{partner.firm_name || partner.full_name}</h1>
        {partner.tagline && <p className="opacity-90 mb-6">{partner.tagline}</p>}
        <div className="bg-white/20 rounded-lg inline-block px-6 py-3 mt-4">
          <div className="text-sm font-semibold uppercase tracking-wide">
            SIF Recommendation Report
          </div>
          <div className="text-sm mt-1">Prepared for: {clientName}</div>
          <div className="text-xs opacity-80 mt-1">{date} | Confidential</div>
        </div>
      </header>
    );
  }

  if (style === "clean") {
    return (
      <header className="border-b">
        <div className="h-1" style={{ backgroundColor: brandColor }} />
        <div className="px-8 py-8 text-center">
          {partner.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo_url}
              alt="Logo"
              className="h-14 mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            SIF Recommendation Report
          </h1>
          <p className="text-gray-600">Prepared for: {clientName}</p>
          <p className="text-sm text-gray-400 mt-1">{date} | Confidential</p>
        </div>
      </header>
    );
  }

  // Default: PROFESSIONAL
  return (
    <header className="px-8 pt-8 pb-6">
      {/* Top row: logo + profile photo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {partner.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo_url}
              alt="Logo"
              className="h-14 object-contain"
            />
          )}
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {partner.firm_name || partner.full_name}
            </h2>
            {partner.tagline && (
              <p className="text-sm text-gray-500">{partner.tagline}</p>
            )}
          </div>
        </div>
        {partner.profile_photo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.profile_photo_url}
            alt={partner.full_name}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
          />
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-3" />

      {/* Contact row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-1">
        {partner.phone && <span>{partner.phone}</span>}
        {partner.phone && partner.email && <span>|</span>}
        <span>{partner.email}</span>
        {partner.website && (
          <>
            <span>|</span>
            <span>{partner.website}</span>
          </>
        )}
      </div>

      <div className="text-xs text-gray-500 mb-4">
        ARN: {partner.arn_number}
        {partner.sebi_reg_number && <> | SEBI: {partner.sebi_reg_number}</>}
      </div>

      {/* Double divider */}
      <div className="border-t-2 border-b-2 py-4 text-center" style={{ borderColor: brandColor }}>
        <h1 className="text-lg font-bold tracking-wide uppercase" style={{ color: brandColor }}>
          SIF Recommendation Report
        </h1>
        <p className="text-gray-700 mt-1">Prepared for: {clientName}</p>
        <p className="text-sm text-gray-400 mt-1">{date} | Confidential</p>
      </div>
    </header>
  );
}

function SectionHeading({ num, title, color }: { num: number; title: string; color: string }) {
  return (
    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
      <span
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
        style={{ backgroundColor: color }}
      >
        {num}
      </span>
      {title}
    </h2>
  );
}

function Divider() {
  return <div className="mx-8 h-px bg-gray-200" />;
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg border px-4 py-3">
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function ComparisonCard({
  title,
  items,
  highlight,
  accentColor,
}: {
  title: string;
  items: { label: string; value: string }[];
  highlight: boolean;
  accentColor?: string;
}) {
  return (
    <div
      className={`rounded-xl border-2 p-5 ${
        highlight ? "shadow-lg" : "border-gray-200"
      }`}
      style={highlight ? { borderColor: accentColor } : undefined}
    >
      <h3
        className={`text-lg font-bold mb-3 ${highlight ? "" : "text-gray-700"}`}
        style={highlight ? { color: accentColor } : undefined}
      >
        {title}
      </h3>
      {items.map((item) => (
        <div key={item.label} className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">{item.label}</span>
          <span className="font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function FundCard({
  fund,
  brandColor,
}: {
  fund: FundRecommendation;
  brandColor: string;
}) {
  const score = fund.alphaShieldScore;
  const scoreColor =
    score !== null && score >= 8
      ? "#16a34a"
      : score !== null && score >= 5
        ? "#d97706"
        : "#dc2626";

  const verdictMap = {
    best_match: { label: "\u2B50 Best Match", bg: "bg-yellow-100 text-yellow-800" },
    strong_fit: { label: "\u2705 Strong Fit", bg: "bg-green-100 text-green-800" },
    consider: { label: "\uD83D\uDD35 Consider", bg: "bg-blue-100 text-blue-800" },
  };
  const verdict = verdictMap[fund.verdict] || verdictMap.consider;

  return (
    <div className="rounded-xl border-2 border-gray-200 p-5 flex flex-col">
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1">{fund.fundName}</h3>
        <p className="text-xs text-gray-500 mb-3">{fund.amc}</p>

        {/* Alpha Shield Score */}
        <div className="mb-3">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Alpha Shield Score
          </div>
          <div className="text-3xl font-bold" style={{ color: scoreColor }}>
            {score !== null ? score.toFixed(1) : "N/A"}
            <span className="text-sm font-normal text-gray-400"> / 10</span>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Strategy:</span> {fund.category}
        </div>
        {fund.marchReturn !== null && (
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">March 2026:</span>{" "}
            <span className={fund.marchReturn >= 0 ? "text-green-600" : "text-red-600"}>
              {fund.marchReturn >= 0 ? "+" : ""}
              {fund.marchReturn.toFixed(2)}%
            </span>{" "}
            vs benchmark
          </div>
        )}
        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Minimum:</span> {"\u20B9"}10L
        </div>
      </div>

      <span className={`text-xs font-semibold px-3 py-1 rounded-full self-start ${verdict.bg}`}>
        {verdict.label}
      </span>
    </div>
  );
}

function CrashChart({ brandColor }: { brandColor: string }) {
  const bars = [
    { label: "Nifty 50", value: -11.3, color: "#dc2626" },
    { label: "Midcap 150", value: -11.06, color: "#dc2626" },
    { label: "SIF Average", value: -2.76, color: "#d97706" },
    { label: "Best SIF (ICICI Pru)", value: 1.8, color: "#16a34a" },
    { label: "Best SIF (DSP)", value: 0.9, color: "#16a34a" },
  ];

  const maxAbs = Math.max(...bars.map((b) => Math.abs(b.value)));

  return (
    <div className="space-y-3">
      {bars.map((bar) => {
        const pct = Math.abs(bar.value) / maxAbs;
        const isPositive = bar.value >= 0;
        return (
          <div key={bar.label} className="flex items-center gap-3">
            <div className="w-32 text-sm text-gray-700 text-right shrink-0">
              {bar.label}
            </div>
            <div className="flex-1 relative h-7">
              {/* Center line at 50% for the zero point */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
              {isPositive ? (
                <div
                  className="absolute top-0 bottom-0 rounded-r"
                  style={{
                    left: "50%",
                    width: `${pct * 45}%`,
                    backgroundColor: bar.color,
                  }}
                />
              ) : (
                <div
                  className="absolute top-0 bottom-0 rounded-l"
                  style={{
                    right: "50%",
                    width: `${pct * 45}%`,
                    backgroundColor: bar.color,
                  }}
                />
              )}
            </div>
            <div
              className="w-16 text-sm font-semibold text-right shrink-0"
              style={{ color: bar.color }}
            >
              {bar.value >= 0 ? "+" : ""}
              {bar.value.toFixed(2)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
