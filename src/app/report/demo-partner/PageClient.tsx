"use client";

import { sifFunds } from "@/lib/sifData";
import { calculateAlphaShield, getAlphaShieldLabel } from "@/lib/alphaShield";
import type { Partner, FundRecommendation } from "@/lib/partner/types";

/* ------------------------------------------------------------------ */
/*  Demo Partner + Lead data                                            */
/* ------------------------------------------------------------------ */

const DEMO_PARTNER: Partner = {
  id: "demo-partner",
  full_name: "Demo Advisor",
  firm_name: "SIFPrime Demo Advisory",
  arn_number: "ARN-DEMO-0001",
  email: "demo@sifprime.com",
  phone: "+91 98765 43210",
  website: "sifprime.com",
  address: null,
  city: "Mumbai",
  linkedin_url: null,
  whatsapp_number: null,
  sebi_reg_number: null,
  tagline: "India's SIF Intelligence Platform",
  about_text: null,
  logo_url: null,
  profile_photo_url: null,
  signature_url: null,
  brand_color: "#169F5E",
  secondary_color: "#1A2233",
  report_header_style: "professional",
  custom_disclaimer:
    "This demo report is for illustration only. Investments in SIFs are subject to market risks. Past performance is not indicative of future returns. Please read all scheme-related documents carefully before investing.",
  cta_text: "Schedule a SIF Consultation",
  cta_url: "https://sifprime.com/contact",
  plan: "pro",
  distributor_status: "empanelled",
  is_active: true,
  reports_sent: 0,
  widget_key: "demo",
  password_hash: null,
  aum_band: null,
  created_at: new Date().toISOString(),
};

const DEMO_LEAD = {
  client_name: "Sample Investor",
  risk_profile: "Moderate",
  investable_surplus: "\u20B925L\u201350L",
  sif_category_match: "Hybrid Long-Short",
  priorities: [
    "Protection from market crashes",
    "Better returns than mutual funds",
  ],
  current_investments: ["Mutual Funds", "Fixed Deposits"],
};

/* ------------------------------------------------------------------ */
/*  Derived data from real SIF database                                  */
/* ------------------------------------------------------------------ */

function getAllLaunchedSifs() {
  return sifFunds
    .map((f) => {
      const score = calculateAlphaShield(
        f.marchCrashData.fundReturn,
        f.marchCrashData.benchmarkReturn
      );
      return {
        name: f.name,
        amc: f.amc,
        category: f.category,
        inceptionDate: f.inceptionDate,
        sinceInception: f.returns.sinceInception,
        marchReturn: f.marchCrashData.fundReturn,
        benchmarkReturn: f.marchCrashData.benchmarkReturn,
        alphaShieldScore: score,
      };
    })
    .sort((a, b) => (b.alphaShieldScore ?? -1) - (a.alphaShieldScore ?? -1));
}

function getTopHybridFunds(): FundRecommendation[] {
  return sifFunds
    .filter((f) => f.categorySlug === "hybrid-long-short")
    .map((f) => ({
      fund: f,
      score: calculateAlphaShield(
        f.marchCrashData.fundReturn,
        f.marchCrashData.benchmarkReturn
      ),
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3)
    .map((x, i): FundRecommendation => ({
      fundName: x.fund.name,
      amc: x.fund.amc,
      alphaShieldScore: x.score,
      marchReturn: x.fund.marchCrashData.fundReturn,
      category: x.fund.category,
      verdict: i === 0 ? "best_match" : i === 1 ? "strong_fit" : "consider",
    }));
}

const CATEGORY_INFO: Record<
  string,
  { strategy: string; bestFor: string; leader: string }
> = {
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
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function DemoPartnerReportClient() {
  const partner = DEMO_PARTNER;
  const lead = DEMO_LEAD;
  const brandColor = partner.brand_color || "#1B4B8A";
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const funds = getTopHybridFunds();
  const allSifs = getAllLaunchedSifs();
  const category = lead.sif_category_match;
  const gold = "#F59E0B";
  const navy = partner.secondary_color || "#1A2233";

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-before: always; }
          .report-container { box-shadow: none !important; max-width: 100% !important; }
        }
      `}</style>

      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium shadow hover:bg-gray-50 transition"
        >
          Print / PDF
        </button>
      </div>

      <div className="min-h-screen bg-gray-100 print:bg-white">
        <div className="report-container max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
          {/* Demo banner */}
          <div className="bg-yellow-50 border-b border-yellow-300 px-6 py-3 text-center text-sm text-yellow-800 no-print">
            This is a sample SIFPrime report. Partners can generate fully-branded
            versions with their own logo, colours, and disclaimers.
          </div>

          {/* ============================================================ */}
          {/*  COVER PAGE                                                   */}
          {/* ============================================================ */}
          <CoverPage
            partner={partner}
            clientName={lead.client_name}
            date={today}
            brandColor={brandColor}
            navy={navy}
            gold={gold}
          />
          <div className="page-break" />

          {/* Header */}
          <div className="h-1.5" style={{ backgroundColor: brandColor }} />
          <div className="h-0.5" style={{ backgroundColor: gold }} />
          <header className="px-8 pt-8 pb-6" style={{ backgroundColor: "#F8FBF9" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold" style={{ color: navy }}>
                  {partner.firm_name}
                </h2>
                {partner.tagline && (
                  <p className="text-sm" style={{ color: brandColor }}>
                    {partner.tagline}
                  </p>
                )}
              </div>
            </div>
            <div className="h-px bg-gray-200 mb-3" />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mb-1">
              {partner.phone && <span>{partner.phone}</span>}
              <span>|</span>
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
            </div>
            <div
              className="border-t-2 border-b-2 py-4 text-center"
              style={{ borderColor: brandColor }}
            >
              <h1
                className="text-lg font-bold tracking-wide uppercase"
                style={{ color: brandColor }}
              >
                SIF Recommendation Report
              </h1>
              <p className="text-gray-700 mt-1">
                Prepared for: {lead.client_name}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {today} | Confidential
              </p>
            </div>
          </header>

          {/* Section 0 — What is a SIF? */}
          <section className="px-8 py-10">
            <SectionHeading num={0} title="What is a SIF?" color={brandColor} />
            <p className="text-gray-700 mb-6 leading-relaxed">
              A Specialised Investment Fund (SIF) is SEBI&apos;s newest investment
              category, launched in 2025. It bridges the gap between Mutual Funds
              and Portfolio Management Services (PMS).
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
          </section>

          <Divider />

          {/* Section 1 — Investor Profile */}
          <section className="px-8 py-10">
            <SectionHeading
              num={1}
              title="Your Investor Profile"
              color={brandColor}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <InfoPill label="Risk Profile" value={lead.risk_profile} />
              <InfoPill
                label="Investable Surplus"
                value={lead.investable_surplus}
              />
            </div>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Currently investing in:</span>{" "}
              {lead.current_investments.join(", ")}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold">Priority:</span>{" "}
              {lead.priorities.join(", ")}
            </p>
            <p className="text-gray-700 mb-4">
              Based on your profile, the most suitable SIF category for you is:
            </p>
            <div
              className="inline-block rounded-xl px-8 py-5 text-white text-center shadow-lg border-l-4"
              style={{
                background: `linear-gradient(135deg, ${brandColor} 0%, #0E7C4A 100%)`,
                borderLeftColor: gold,
              }}
            >
              <div
                className="text-xs uppercase tracking-wider font-semibold mb-1 opacity-80"
                style={{ color: "#FDE68A" }}
              >
                Recommended Category
              </div>
              <div className="text-2xl font-bold mb-1">{category}</div>
              <div className="text-sm opacity-90 max-w-xl">
                {CATEGORY_DESCRIPTIONS[category]}
              </div>
            </div>
          </section>

          <Divider />

          {/* Section 2 — Top Fund Recommendations */}
          <section className="px-8 py-10">
            <SectionHeading
              num={2}
              title="Top Fund Recommendations for You"
              color={brandColor}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              {funds.map((f, i) => (
                <FundCard key={i} fund={f} />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              <strong>Note:</strong> Alpha Shield Score measures how well a fund
              protected investors during the March 2026 crash. Higher is better
              (scale 0-10).
            </p>
          </section>

          <Divider />
          <div className="page-break" />

          {/* Section 3 — All Launched SIFs: Performance & Alpha Shield */}
          <section className="px-8 py-10">
            <SectionHeading
              num={3}
              title="All Launched SIFs — Performance & Alpha Shield"
              color={brandColor}
            />
            <p className="text-gray-700 mb-6 leading-relaxed">
              A complete ranking of every SIF launched to date, sorted by our
              proprietary Alpha Shield Score — a measure of how well each fund
              protected investor capital during the March 2026 market crash.
            </p>

            {/* Methodology callout */}
            <MethodologyCallout brandColor={brandColor} gold={gold} navy={navy} />

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr
                    style={{ backgroundColor: brandColor }}
                    className="text-white"
                  >
                    <th className="px-3 py-3 text-left rounded-tl-lg">#</th>
                    <th className="px-3 py-3 text-left">Fund</th>
                    <th className="px-3 py-3 text-left">AMC</th>
                    <th className="px-3 py-3 text-left">Category</th>
                    <th className="px-3 py-3 text-right">Launched</th>
                    <th className="px-3 py-3 text-right">Since Inception</th>
                    <th className="px-3 py-3 text-right">Mar 2026</th>
                    <th className="px-3 py-3 text-right rounded-tr-lg">
                      Alpha Shield
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allSifs.map((s, i) => {
                    const score = s.alphaShieldScore;
                    const scoreBg =
                      score !== null && score >= 8
                        ? "#169F5E"
                        : score !== null && score >= 5
                          ? "#F59E0B"
                          : score === null
                            ? "#9CA3AF"
                            : "#dc2626";
                    const rowBg =
                      i === 0
                        ? "#FFFBEB"
                        : i % 2 === 0
                          ? "#F8FBF9"
                          : "#FFFFFF";
                    return (
                      <tr
                        key={s.name}
                        style={{ backgroundColor: rowBg }}
                      >
                        <td className="px-3 py-3 font-medium text-gray-500">
                          {i + 1}
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-900">
                          {s.name}
                        </td>
                        <td className="px-3 py-3 text-gray-700">{s.amc}</td>
                        <td className="px-3 py-3 text-gray-600">
                          {s.category}
                        </td>
                        <td className="px-3 py-3 text-right text-gray-600">
                          {new Date(s.inceptionDate).toLocaleDateString(
                            "en-IN",
                            { month: "short", year: "numeric" }
                          )}
                        </td>
                        <td
                          className={`px-3 py-3 text-right font-medium ${
                            s.sinceInception >= 0
                              ? "text-green-700"
                              : "text-red-600"
                          }`}
                        >
                          {s.sinceInception >= 0 ? "+" : ""}
                          {s.sinceInception.toFixed(2)}%
                        </td>
                        <td
                          className={`px-3 py-3 text-right font-medium ${
                            s.marchReturn === null
                              ? "text-gray-400"
                              : s.marchReturn >= 0
                                ? "text-green-700"
                                : "text-red-600"
                          }`}
                        >
                          {s.marchReturn === null
                            ? "—"
                            : `${s.marchReturn >= 0 ? "+" : ""}${s.marchReturn.toFixed(2)}%`}
                        </td>
                        <td className="px-3 py-3 text-right">
                          <span
                            className="inline-block px-2.5 py-1 rounded-md text-white text-xs font-bold min-w-[42px]"
                            style={{ backgroundColor: scoreBg }}
                          >
                            {score !== null ? score.toFixed(1) : "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-3 mb-8">
              {allSifs.length} SIFs live as of {today}. Alpha Shield Score is a
              SIFPrime-proprietary metric derived from each fund&apos;s capital
              protection vs. its benchmark during the March 2026 crash.
            </p>

            {/* March 2026 performance visual */}
            <h3 className="text-base font-bold mb-3" style={{ color: navy }}>
              March 2026 Crash — SIFs vs Benchmark
            </h3>
            <PerformanceBarChart
              data={allSifs
                .filter((s) => s.marchReturn !== null)
                .map((s) => ({
                  label: s.name,
                  value: s.marchReturn as number,
                }))}
              benchmark={-11.3}
              gold={gold}
              brandColor={brandColor}
            />
          </section>

          <Divider />

          {/* Section 4 — Categories Explained */}
          <section className="px-8 py-10">
            <SectionHeading
              num={4}
              title="SIF Categories Explained"
              color={brandColor}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr
                    style={{ backgroundColor: brandColor }}
                    className="text-white"
                  >
                    <th className="px-4 py-3 text-left rounded-tl-lg">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left">Strategy</th>
                    <th className="px-4 py-3 text-left">
                      Alpha Shield Leader
                    </th>
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
          </section>

          <Divider />
          <div className="page-break" />

          {/* Section 5 — Crash analysis */}
          <section className="px-8 py-10" style={{ backgroundColor: "#F5F7FA" }}>
            <SectionHeading
              num={5}
              title="Why SIFs Now: The March 2026 Market Crash"
              color={brandColor}
            />
            <p className="text-gray-700 mb-6 leading-relaxed">
              The March 2026 market correction tested every investment vehicle.
              Here is how SIFs compared to broad market indices:
            </p>
            <CrashChart />
            <p className="text-xs text-gray-500 mt-4">
              The Alpha Shield Score is derived from how each SIF performed
              relative to its benchmark during this crash period.
            </p>
          </section>

          <Divider />

          {/* Section 6 — Next Step */}
          <section
            className="px-8 py-10 text-center"
            style={{
              background: `linear-gradient(135deg, #F0FAF4 0%, #FFFBEB 100%)`,
            }}
          >
            <SectionHeading num={6} title="Next Step" color={brandColor} />
            <p className="text-gray-700 text-lg mb-6">
              <strong>{partner.full_name}</strong> at{" "}
              <strong>{partner.firm_name}</strong> will walk you through fund
              selection and documentation.
            </p>
            {partner.cta_url && (
              <a
                href={partner.cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl px-8 py-4 text-white font-bold text-lg shadow-lg hover:opacity-90 transition mb-6"
                style={{
                  background: `linear-gradient(135deg, ${brandColor} 0%, #0E7C4A 100%)`,
                  boxShadow: `0 4px 20px ${brandColor}55`,
                }}
              >
                {partner.cta_text}
              </a>
            )}
            <p className="text-gray-600">
              Questions? {partner.phone && <>{partner.phone} | </>}
              <a href={`mailto:${partner.email}`} className="underline">
                {partner.email}
              </a>
            </p>
          </section>

          {/* Footer */}
          <footer className="border-t-2 border-gray-200 px-8 py-8 bg-gray-50">
            <div className="text-sm text-gray-700 mb-2">
              <strong>{partner.full_name}</strong> | {partner.firm_name} | ARN:{" "}
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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function SectionHeading({
  num,
  title,
  color,
}: {
  num: number;
  title: string;
  color: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold flex items-center gap-3" style={{ color: "#1A2233" }}>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 shadow"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, #0E7C4A 100%)`,
          }}
        >
          {num}
        </span>
        {title}
      </h2>
      <div className="flex gap-1 mt-2 ml-12">
        <div className="h-0.5 w-12" style={{ backgroundColor: color }} />
        <div className="h-0.5 w-4" style={{ backgroundColor: "#F59E0B" }} />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="mx-8 h-px bg-gray-200" />;
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg px-4 py-3 border-l-4"
      style={{
        backgroundColor: "#F0FAF4",
        borderLeftColor: "#169F5E",
      }}
    >
      <div
        className="text-xs uppercase tracking-wide font-semibold"
        style={{ color: "#0E7C4A" }}
      >
        {label}
      </div>
      <div className="text-lg font-bold" style={{ color: "#1A2233" }}>
        {value}
      </div>
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

function FundCard({ fund }: { fund: FundRecommendation }) {
  const score = fund.alphaShieldScore;
  const scoreColor =
    score !== null && score >= 8
      ? "#169F5E"
      : score !== null && score >= 5
        ? "#F59E0B"
        : "#dc2626";

  const verdictMap = {
    best_match: {
      label: "\u2605 Best Match",
      bg: "text-white",
      style: { backgroundColor: "#F59E0B" },
      cardStyle: {
        borderColor: "#F59E0B",
        backgroundColor: "#FFFBEB",
      },
    },
    strong_fit: {
      label: "Strong Fit",
      bg: "text-white",
      style: { backgroundColor: "#169F5E" },
      cardStyle: { borderColor: "#169F5E", backgroundColor: "#F0FAF4" },
    },
    consider: {
      label: "Consider",
      bg: "text-white",
      style: { backgroundColor: "#1A2233" },
      cardStyle: { borderColor: "#1A2233", backgroundColor: "#F5F7FA" },
    },
  };
  const verdict = verdictMap[fund.verdict] || verdictMap.consider;

  return (
    <div className="rounded-xl border-2 p-5 flex flex-col shadow-sm" style={verdict.cardStyle}>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1">{fund.fundName}</h3>
        <p className="text-xs text-gray-500 mb-3">{fund.amc}</p>
        <div className="mb-3">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Alpha Shield Score
          </div>
          <div className="text-3xl font-bold" style={{ color: scoreColor }}>
            {score !== null ? score.toFixed(1) : "N/A"}
            <span className="text-sm font-normal text-gray-400"> / 10</span>
          </div>
          <div className="text-xs text-gray-500">
            {getAlphaShieldLabel(score)}
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Strategy:</span> {fund.category}
        </div>
        {fund.marchReturn !== null && (
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">March 2026:</span>{" "}
            <span
              className={
                fund.marchReturn >= 0 ? "text-green-600" : "text-red-600"
              }
            >
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
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full self-start ${verdict.bg}`}
        style={verdict.style}
      >
        {verdict.label}
      </span>
    </div>
  );
}

function CrashChart() {
  const bars = [
    { label: "Nifty 50", value: -11.3, color: "#dc2626" },
    { label: "Midcap 150", value: -11.06, color: "#dc2626" },
    { label: "SIF Average", value: -2.76, color: "#F59E0B" },
    { label: "Best SIF (ICICI Pru)", value: 1.8, color: "#169F5E" },
    { label: "Best SIF (DSP)", value: 0.9, color: "#169F5E" },
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

/* ------------------------------------------------------------------ */
/*  Cover Page                                                          */
/* ------------------------------------------------------------------ */

function CoverPage({
  partner,
  clientName,
  date,
  brandColor,
  navy,
  gold,
}: {
  partner: Partner;
  clientName: string;
  date: string;
  brandColor: string;
  navy: string;
  gold: string;
}) {
  return (
    <div
      className="relative overflow-hidden text-white flex flex-col justify-between"
      style={{
        minHeight: "1050px",
        background: `linear-gradient(160deg, ${navy} 0%, #0F2027 55%, ${brandColor} 100%)`,
      }}
    >
      {/* Decorative corner shapes */}
      <div
        className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full opacity-20"
        style={{ backgroundColor: brandColor }}
      />
      <div
        className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ backgroundColor: gold }}
      />

      {/* Top band */}
      <div className="relative z-10 px-12 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
              style={{ backgroundColor: gold, color: navy }}
            >
              S
            </div>
            <div>
              <div className="text-lg font-bold">{partner.firm_name}</div>
              <div className="text-xs opacity-70">{partner.tagline}</div>
            </div>
          </div>
          <div
            className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: `${gold}33`, color: gold }}
          >
            Confidential
          </div>
        </div>
      </div>

      {/* Middle title */}
      <div className="relative z-10 px-12 text-center">
        <div
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-6 px-4 py-1.5 rounded"
          style={{ backgroundColor: gold, color: navy }}
        >
          Personalised Report
        </div>
        <h1 className="text-6xl font-extrabold leading-tight mb-4">
          SIF <br />
          <span style={{ color: gold }}>Recommendation</span>
        </h1>
        <div className="h-1 w-24 mx-auto mb-6" style={{ backgroundColor: gold }} />
        <p className="text-xl opacity-90 mb-12">
          Prepared exclusively for
        </p>
        <p className="text-4xl font-bold mb-2">{clientName}</p>
        <p className="text-sm opacity-70 uppercase tracking-widest">
          {date}
        </p>
      </div>

      {/* Bottom stat strip */}
      <div className="relative z-10 px-12 pb-10">
        <div
          className="grid grid-cols-3 gap-4 text-center rounded-xl p-5 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <div className="text-3xl font-bold" style={{ color: gold }}>
              14
            </div>
            <div className="text-xs uppercase tracking-wider opacity-80 mt-1">
              SIFs Analysed
            </div>
          </div>
          <div className="border-x border-white/20">
            <div className="text-3xl font-bold" style={{ color: gold }}>
              4
            </div>
            <div className="text-xs uppercase tracking-wider opacity-80 mt-1">
              Categories
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold" style={{ color: gold }}>
              ₹10L+
            </div>
            <div className="text-xs uppercase tracking-wider opacity-80 mt-1">
              Min Investment
            </div>
          </div>
        </div>
        <div className="text-center text-xs opacity-60 mt-4">
          Advisor: {partner.full_name} · ARN {partner.arn_number}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Methodology Callout                                                 */
/* ------------------------------------------------------------------ */

function MethodologyCallout({
  brandColor,
  gold,
  navy,
}: {
  brandColor: string;
  gold: string;
  navy: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden mb-6 border"
      style={{ borderColor: "#E5E7EB" }}
    >
      <div
        className="px-5 py-2.5 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-between"
        style={{ backgroundColor: navy }}
      >
        <span>SIFPrime Methodology</span>
        <span style={{ color: gold }}>How Alpha Shield is Calculated</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white">
        <CalloutTile
          color={brandColor}
          label="Score ≥ 8"
          title="Elite / Strong"
          desc="Fund preserved at least 80% of capital when its benchmark fell."
        />
        <CalloutTile
          color={gold}
          label="Score 5–7.9"
          title="Moderate"
          desc="Fund absorbed 50–80% of the benchmark drawdown."
          borderX
        />
        <CalloutTile
          color="#dc2626"
          label="Score < 5"
          title="Limited"
          desc="Fund mirrored, or underperformed vs, the benchmark in the crash."
        />
      </div>
    </div>
  );
}

function CalloutTile({
  color,
  label,
  title,
  desc,
  borderX,
}: {
  color: string;
  label: string;
  title: string;
  desc: string;
  borderX?: boolean;
}) {
  return (
    <div
      className={`p-5 ${borderX ? "border-x" : ""}`}
      style={{ borderColor: "#E5E7EB" }}
    >
      <div
        className="text-xs font-bold uppercase tracking-widest mb-2"
        style={{ color }}
      >
        {label}
      </div>
      <div className="text-base font-bold text-gray-900 mb-1">{title}</div>
      <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Performance Bar Chart                                               */
/* ------------------------------------------------------------------ */

function PerformanceBarChart({
  data,
  benchmark,
  gold,
  brandColor,
}: {
  data: { label: string; value: number }[];
  benchmark: number;
  gold: string;
  brandColor: string;
}) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const max = Math.max(...sorted.map((d) => Math.abs(d.value)), Math.abs(benchmark));

  return (
    <div
      className="rounded-xl p-5 border"
      style={{ backgroundColor: "#F8FBF9", borderColor: "#E5E7EB" }}
    >
      {/* Benchmark reference */}
      <div className="flex items-center gap-2 mb-3 text-xs">
        <span
          className="inline-block w-3 h-3 rounded-sm"
          style={{ backgroundColor: "#dc2626" }}
        />
        <span className="text-gray-700">
          Benchmark (Nifty 50): <strong>{benchmark.toFixed(2)}%</strong>
        </span>
        <span className="mx-2 text-gray-300">|</span>
        <span
          className="inline-block w-3 h-3 rounded-sm"
          style={{ backgroundColor: brandColor }}
        />
        <span className="text-gray-700">SIF outperformance</span>
      </div>

      <div className="space-y-2">
        {sorted.map((d) => {
          const isPositive = d.value >= 0;
          const pct = (Math.abs(d.value) / max) * 100;
          const beatsBench = d.value > benchmark;
          return (
            <div key={d.label} className="flex items-center gap-2 text-xs">
              <div className="w-44 text-right text-gray-700 shrink-0 truncate">
                {d.label}
              </div>
              <div className="flex-1 relative h-5">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                {isPositive ? (
                  <div
                    className="absolute top-0 bottom-0 rounded-r"
                    style={{
                      left: "50%",
                      width: `${(pct / 2)}%`,
                      backgroundColor: brandColor,
                    }}
                  />
                ) : (
                  <div
                    className="absolute top-0 bottom-0 rounded-l"
                    style={{
                      right: "50%",
                      width: `${(pct / 2)}%`,
                      backgroundColor: beatsBench ? gold : "#dc2626",
                    }}
                  />
                )}
              </div>
              <div
                className="w-16 text-right font-semibold shrink-0"
                style={{
                  color: isPositive
                    ? brandColor
                    : beatsBench
                      ? "#B45309"
                      : "#dc2626",
                }}
              >
                {isPositive ? "+" : ""}
                {d.value.toFixed(2)}%
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-3 italic">
        Green = positive return. Amber = outperformed benchmark but negative.
        Red = worse than benchmark.
      </p>
    </div>
  );
}
