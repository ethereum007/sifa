"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { Partner, FundRecommendation } from "@/lib/partner/types";
import { matchSifCategory, getTopFundsForCategory } from "@/lib/partner/sifMatcher";

const AlphaShieldBadge = dynamic(() => import("@/components/AlphaShieldBadge"));

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  surplus: string;
  risk: string;
  currentInvestments: string[];
  priorities: string[];
  fullName: string;
  email: string;
  phone: string;
}

interface ResultsData {
  category: string;
  description: string;
  funds: FundRecommendation[];
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SURPLUS_OPTIONS = [
  { value: "₹10L–25L", label: "₹10L \u2013 25L" },
  { value: "₹25L–50L", label: "₹25L \u2013 50L" },
  { value: "₹50L–1Cr", label: "₹50L \u2013 1Cr" },
  { value: "₹1Cr+", label: "₹1Cr+" },
];

const RISK_OPTIONS = [
  { value: "Conservative", label: "Conservative", desc: "Capital protection first" },
  { value: "Moderate", label: "Moderate", desc: "Growth with some protection" },
  { value: "Aggressive", label: "Aggressive", desc: "Maximum growth potential" },
];

const INVESTMENT_OPTIONS = [
  "Mutual Funds",
  "PMS",
  "Direct Stocks",
  "Fixed Deposits",
  "NPS",
  "Nothing yet",
];

const PRIORITY_OPTIONS = [
  "Protection from market crashes",
  "Better returns than mutual funds",
  "Access to hedge fund-style strategies",
  "Lower minimum than PMS (₹50L)",
  "Tax-efficient wealth building",
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Hybrid Long-Short":
    "Hybrid Long-Short SIFs blend equity and debt with hedging strategies. They aim to protect capital during crashes while capturing upside \u2014 ideal for investors who want growth with a safety net.",
  "Equity Long-Short":
    "Equity Long-Short SIFs take both long and short positions in stocks. They target aggressive alpha generation and are suited for investors comfortable with higher volatility for potentially higher returns.",
  "Ex-Top 100 Long-Short":
    "Ex-Top 100 SIFs focus on mid- and small-cap stocks with long-short hedging. They\u2019re built for investors already in mutual funds who want exposure beyond the large-cap index.",
  "Active Asset Allocator":
    "Active Asset Allocator SIFs dynamically shift between equity, debt, and derivatives based on market conditions. Best for high-net-worth investors seeking institutional-grade multi-asset management.",
};

/* ------------------------------------------------------------------ */
/*  Helper: verdict badge                                              */
/* ------------------------------------------------------------------ */

function VerdictBadge({ verdict }: { verdict: FundRecommendation["verdict"] }) {
  if (verdict === "best_match")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5">
        \u2B50 Best Match
      </span>
    );
  if (verdict === "strong_fit")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5">
        \u2705 Strong Fit
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5">
      \uD83D\uDD35 Consider
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PageClient() {
  const params = useParams();
  const widgetKey = params.widget_key as string;

  /* ---- state ---- */
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [form, setForm] = useState<FormData>({
    surplus: "",
    risk: "",
    currentInvestments: [],
    priorities: [],
    fullName: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<ResultsData | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  /* ---- fetch partner ---- */
  useEffect(() => {
    if (!widgetKey) return;
    (async () => {
      try {
        const res = await fetch(`/api/partner/me?key=${encodeURIComponent(widgetKey)}`);
        if (!res.ok) throw new Error("Invalid partner link");
        const data = await res.json();
        setPartner(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [widgetKey]);

  /* ---- scroll to results ---- */
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  /* ---- helpers ---- */
  const brandColor = partner?.brand_color || "#1B4B8A";
  const secondaryColor = partner?.secondary_color || "#0F2B50";
  const firmName = partner?.firm_name || partner?.full_name || "Advisor";
  const mfdName = partner?.full_name || "Advisor";

  const toggleCheckbox = useCallback(
    (field: "currentInvestments" | "priorities", value: string, max?: number) => {
      setForm((prev) => {
        const arr = prev[field];
        if (arr.includes(value)) {
          return { ...prev, [field]: arr.filter((v) => v !== value) };
        }
        if (max && arr.length >= max) return prev;
        return { ...prev, [field]: [...arr, value] };
      });
    },
    []
  );

  const canProceedStep1 =
    form.surplus !== "" &&
    form.risk !== "" &&
    form.currentInvestments.length > 0 &&
    form.priorities.length > 0;

  const canSubmit =
    form.fullName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.phone.trim() !== "";

  /* ---- submit ---- */
  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);

    const category = matchSifCategory(
      form.risk,
      form.priorities,
      form.currentInvestments,
      form.surplus
    );
    const funds = getTopFundsForCategory(category);
    const description = CATEGORY_DESCRIPTIONS[category] || "";

    try {
      await fetch(`/api/invest/${encodeURIComponent(widgetKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: form.fullName,
          client_email: form.email,
          client_phone: form.phone,
          investable_surplus: form.surplus,
          risk_profile: form.risk,
          current_investments: form.currentInvestments,
          priorities: form.priorities,
          sif_category_match: category,
          top_fund_recommendations: funds,
        }),
      });
    } catch {
      // submission error is non-blocking; still show results
    }

    setResults({ category, description, funds });
    setSubmitting(false);
  };

  /* ================================================================== */
  /*  RENDER                                                             */
  /* ================================================================== */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: brandColor }} />
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Invalid Link</h1>
          <p className="text-gray-600">
            {error || "This investment link is not valid. Please contact your advisor for a new link."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================================ */}
      {/*  BRANDED HEADER                                               */}
      {/* ============================================================ */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* Logo or initials */}
          {partner.logo_url ? (
            <img
              src={partner.logo_url}
              alt={firmName}
              className="h-14 mx-auto mb-3 object-contain"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: brandColor }}
            >
              {firmName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {firmName} &mdash; SIF Education &amp; Portfolio Fit Analysis
          </h1>
          <p className="text-sm text-gray-500 mt-1">Powered by SIFPrime Research</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* ============================================================ */}
        {/*  STEP 0 — SIF EXPLAINER                                      */}
        {/* ============================================================ */}
        {step === 0 && (
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Accent bar */}
            <div className="h-1.5" style={{ backgroundColor: brandColor }} />

            <div className="p-6 md:p-8 space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: secondaryColor }}>
                What is a Specialised Investment Fund?
              </h2>

              <p className="text-gray-700 leading-relaxed">
                SIFs are <strong>SEBI&rsquo;s newest investment category, launched in 2025</strong>.
                They sit between Mutual Funds and PMS &mdash; offering hedge-fund-style strategies
                (long-short, derivatives) at a much lower entry point than PMS.
              </p>

              {/* 3-column comparison */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: secondaryColor }}>
                      <th className="text-left text-white px-4 py-3 rounded-tl-lg">&nbsp;</th>
                      <th className="text-center text-white px-4 py-3">Mutual Fund</th>
                      <th className="text-center font-bold px-4 py-3 text-white" style={{ backgroundColor: brandColor }}>
                        SIF
                      </th>
                      <th className="text-center text-white px-4 py-3 rounded-tr-lg">PMS</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium">Min. Amount</td>
                      <td className="px-4 py-3 text-center">\u20B9500</td>
                      <td className="px-4 py-3 text-center font-semibold" style={{ color: brandColor }}>
                        \u20B910 Lakh
                      </td>
                      <td className="px-4 py-3 text-center">\u20B950 Lakh</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-4 py-3 font-medium">Strategy Type</td>
                      <td className="px-4 py-3 text-center">Long only</td>
                      <td className="px-4 py-3 text-center font-semibold" style={{ color: brandColor }}>
                        Long-Short &amp; Derivatives
                      </td>
                      <td className="px-4 py-3 text-center">Flexible</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Regulation</td>
                      <td className="px-4 py-3 text-center">SEBI (MF)</td>
                      <td className="px-4 py-3 text-center font-semibold" style={{ color: brandColor }}>
                        SEBI (MF framework)
                      </td>
                      <td className="px-4 py-3 text-center">SEBI (PMS)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* March 2026 crash stats */}
              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <h3 className="font-semibold text-gray-900">
                  March 2026 Crash Performance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-2xl font-bold text-red-600">-11.30%</div>
                    <div className="text-xs text-gray-500 mt-1">Nifty 50</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">+0.07%</div>
                    <div className="text-xs text-gray-500 mt-1">Best SIF (Arudha)</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="text-2xl font-bold text-amber-600">-2.76%</div>
                    <div className="text-xs text-gray-500 mt-1">SIF Average</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>14 SIFs are live today</strong> from SBI, Edelweiss, Quant, ICICI,
                360 ONE, Bandhan, Tata, and Mirae.
              </p>

              <button
                onClick={() => setStep(1)}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
                style={{ backgroundColor: brandColor }}
              >
                I understand &mdash; Find my SIF match &rarr;
              </button>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/*  STEP 1 — INVESTOR PROFILE                                    */}
        {/* ============================================================ */}
        {step === 1 && (
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: brandColor }} />
            <div className="p-6 md:p-8 space-y-8">
              <h2 className="text-2xl font-bold" style={{ color: secondaryColor }}>
                Your Investor Profile
              </h2>

              {/* Q1 — Surplus */}
              <div className="space-y-3">
                <label className="block font-semibold text-gray-900">
                  How much are you looking to invest in SIFs?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SURPLUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm((p) => ({ ...p, surplus: opt.value }))}
                      className="rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all"
                      style={{
                        borderColor: form.surplus === opt.value ? brandColor : "#e5e7eb",
                        backgroundColor: form.surplus === opt.value ? `${brandColor}10` : "white",
                        color: form.surplus === opt.value ? brandColor : "#374151",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">SIF minimum is \u20B910L per fund.</p>
              </div>

              {/* Q2 — Risk */}
              <div className="space-y-3">
                <label className="block font-semibold text-gray-900">
                  What&rsquo;s your investment risk appetite?
                </label>
                <div className="space-y-2">
                  {RISK_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm((p) => ({ ...p, risk: opt.value }))}
                      className="w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all"
                      style={{
                        borderColor: form.risk === opt.value ? brandColor : "#e5e7eb",
                        backgroundColor: form.risk === opt.value ? `${brandColor}10` : "white",
                      }}
                    >
                      <div>
                        <div className="font-medium text-gray-900">{opt.label}</div>
                        <div className="text-xs text-gray-500">{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3 — Current investments */}
              <div className="space-y-3">
                <label className="block font-semibold text-gray-900">
                  What do you currently invest in?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INVESTMENT_OPTIONS.map((opt) => {
                    const selected = form.currentInvestments.includes(opt);
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 cursor-pointer transition-all text-sm"
                        style={{
                          borderColor: selected ? brandColor : "#e5e7eb",
                          backgroundColor: selected ? `${brandColor}10` : "white",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleCheckbox("currentInvestments", opt)}
                          className="sr-only"
                        />
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0"
                          style={{
                            borderColor: selected ? brandColor : "#d1d5db",
                            backgroundColor: selected ? brandColor : "white",
                          }}
                        >
                          {selected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q4 — Priorities */}
              <div className="space-y-3">
                <label className="block font-semibold text-gray-900">
                  What matters most to you right now?{" "}
                  <span className="text-xs font-normal text-gray-500">(pick up to 2)</span>
                </label>
                <div className="space-y-2">
                  {PRIORITY_OPTIONS.map((opt) => {
                    const selected = form.priorities.includes(opt);
                    return (
                      <label
                        key={opt}
                        className="flex items-center gap-2 rounded-xl border-2 px-4 py-3 cursor-pointer transition-all text-sm"
                        style={{
                          borderColor: selected ? brandColor : "#e5e7eb",
                          backgroundColor: selected ? `${brandColor}10` : "white",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => toggleCheckbox("priorities", opt, 2)}
                          className="sr-only"
                        />
                        <div
                          className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0"
                          style={{
                            borderColor: selected ? brandColor : "#d1d5db",
                            backgroundColor: selected ? brandColor : "white",
                          }}
                        >
                          {selected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-700">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-lg transition-opacity disabled:opacity-40"
                style={{ backgroundColor: brandColor }}
              >
                Continue &rarr;
              </button>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/*  STEP 2 — CONTACT DETAILS                                     */}
        {/* ============================================================ */}
        {step === 2 && !results && (
          <section className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: brandColor }} />
            <div className="p-6 md:p-8 space-y-6">
              <h2 className="text-2xl font-bold" style={{ color: secondaryColor }}>
                Almost there &mdash; Your Contact Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": brandColor } as React.CSSProperties}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": brandColor } as React.CSSProperties}
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": brandColor } as React.CSSProperties}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                Your details are shared only with{" "}
                <strong>{mfdName}</strong> from <strong>{firmName}</strong>.
                SIFPrime does not contact you directly.
              </p>

              <button
                disabled={!canSubmit || submitting}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-lg transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ backgroundColor: brandColor }}
              >
                {submitting ? (
                  <>
                    <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    Analyzing...
                  </>
                ) : (
                  "Get My SIF Recommendation"
                )}
              </button>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/*  RESULTS SECTION                                              */}
        {/* ============================================================ */}
        {results && (
          <section ref={resultsRef} className="space-y-6">
            {/* Category match */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="h-1.5" style={{ backgroundColor: brandColor }} />
              <div className="p-6 md:p-8 text-center space-y-3">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Your SIF Match
                </p>
                <h2 className="text-3xl font-bold" style={{ color: brandColor }}>
                  {results.category}
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
                  {results.description}
                </p>
              </div>
            </div>

            {/* Fund cards */}
            <div className="space-y-4">
              {results.funds.map((fund, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="p-5 md:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{fund.fundName}</h3>
                        <p className="text-sm text-gray-500">{fund.amc}</p>
                      </div>
                      <VerdictBadge verdict={fund.verdict} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {/* Alpha Shield */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Alpha Shield</div>
                        <AlphaShieldBadge
                          score={fund.alphaShieldScore}
                          size="sm"
                          showLabel={false}
                          showTooltip={false}
                        />
                      </div>
                      {/* March Return */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">March 2026</div>
                        <div
                          className={`text-lg font-bold ${
                            (fund.marchReturn ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {fund.marchReturn !== null
                            ? `${fund.marchReturn >= 0 ? "+" : ""}${fund.marchReturn.toFixed(2)}%`
                            : "N/A"}
                        </div>
                      </div>
                      {/* Strategy */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Strategy</div>
                        <div className="text-sm font-medium text-gray-800">{fund.category}</div>
                      </div>
                      {/* Minimum */}
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Minimum</div>
                        <div className="text-sm font-medium text-gray-800">\u20B910L</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alpha Shield note */}
            <p className="text-xs text-gray-500 text-center px-4 leading-relaxed">
              <strong>Alpha Shield Score</strong> measures how much capital a fund protected
              vs its benchmark during the March 2026 crash. Score 10 = stayed positive.
              Score 0 = fell as much as the benchmark.
            </p>

            {/* MFD footer */}
            <div
              className="rounded-2xl p-6 md:p-8 text-center space-y-4"
              style={{ backgroundColor: secondaryColor }}
            >
              <p className="text-white/80 text-sm">
                Prepared by <strong className="text-white">{mfdName}</strong> |{" "}
                <strong className="text-white">{firmName}</strong> | ARN:{" "}
                <strong className="text-white">{partner.arn_number}</strong>
              </p>

              {partner.cta_url && (
                <a
                  href={partner.cta_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
                  style={{ backgroundColor: brandColor }}
                >
                  {partner.cta_text || "Schedule a SIF Consultation"}
                </a>
              )}

              {(partner.phone || partner.email) && (
                <p className="text-white/70 text-sm">
                  Questions?{" "}
                  {partner.phone && (
                    <>
                      \uD83D\uDCDE{" "}
                      <a href={`tel:${partner.phone}`} className="text-white underline">
                        {partner.phone}
                      </a>
                    </>
                  )}
                  {partner.phone && partner.email && " | "}
                  {partner.email && (
                    <>
                      \uD83D\uDCE7{" "}
                      <a href={`mailto:${partner.email}`} className="text-white underline">
                        {partner.email}
                      </a>
                    </>
                  )}
                </p>
              )}

              <p className="text-white/40 text-xs mt-4">Powered by SIFPrime Research</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
