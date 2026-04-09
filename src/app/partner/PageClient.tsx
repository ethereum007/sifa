"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Shield, BarChart3, Zap } from "lucide-react";
import type { SignupFormData } from "@/lib/partner/types";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const AUM_BANDS = ["<5 Cr", "5\u201325 Cr", "25\u2013100 Cr", "100 Cr+"];

const DIST_STATUSES = [
  { value: "empanelled", label: "\u2705 Already empanelled" },
  { value: "in_progress", label: "\uD83D\uDD04 In progress" },
  { value: "need_help", label: "\u2753 Need help" },
  { value: "exploring", label: "\uD83D\uDCCB Just exploring" },
];

const PLANS = [
  { value: "starter", label: "Starter \u2014 \u20B9999/mo" },
  { value: "pro", label: "Pro \u2014 \u20B91,999/mo" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] pt-24 pb-20 sm:pt-32 sm:pb-28">
      {/* subtle gradient orb */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-br from-amber-500/10 via-transparent to-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
          B2B Partner Platform
        </span>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your HNI clients deserve India&apos;s most sophisticated fund
          category.{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            With your name on it.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          SIFPrime generates co-branded, data-rich SIF reports that carry{" "}
          <strong className="text-white">your logo, your colours, your ARN</strong>.
          Your client sees <em>you</em> as the expert. We stay invisible.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold px-8 py-6 text-base"
            onClick={() =>
              document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-slate-500 text-slate-200 hover:bg-slate-800 px-8 py-6 text-base"
            onClick={() => window.open("/reports/demo-partner", "_blank")}
          >
            See Demo Report
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SIF Explainer Banner                                               */
/* ------------------------------------------------------------------ */

function SifExplainerBanner() {
  return (
    <section className="bg-[#0f1d33] py-14">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-amber-600/10 p-8 sm:p-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400">
            New to SIFs?
          </h2>

          <p className="mt-4 text-lg font-semibold text-white">
            Specialized Investment Funds are{" "}
            <span className="text-amber-300">SEBI&apos;s newest mutual-fund category</span>,
            launched in 2025.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: "\u20B910 L", note: "Minimum vs \u20B950L for PMS" },
              { stat: "Long-short", note: "Strategies | SEBI regulated" },
              { stat: "14 funds", note: "Live | \u20B92,400 Cr+ AUM" },
              { stat: "March 2026", note: "Nifty \u221211.30% | SIF avg \u22122.76%" },
            ].map((item) => (
              <div
                key={item.stat}
                className="rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-3 text-center"
              >
                <div className="text-xl font-bold text-white">{item.stat}</div>
                <div className="mt-1 text-xs text-slate-400">{item.note}</div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm font-medium text-slate-300">
            Your HNI clients don&apos;t know about this yet.{" "}
            <span className="text-amber-400 font-semibold">Now you can tell them.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Value Props                                                        */
/* ------------------------------------------------------------------ */

const VALUE_PROPS = [
  {
    icon: Shield,
    emoji: "\uD83C\uDFF7\uFE0F",
    title: "Your brand, zero effort",
    desc: "Every report carries your MFD logo, photo, and brand colours. Your client never sees SIFPrime.",
  },
  {
    icon: BarChart3,
    emoji: "\uD83D\uDCCA",
    title: "India\u2019s only SIF intelligence",
    desc: "14 SIFs ranked by Alpha Shield Score, crash-period analysis, fund vs benchmark breakdowns.",
  },
  {
    icon: Zap,
    emoji: "\u26A1",
    title: "Set up in 5 minutes",
    desc: "Add your ARN, upload your logo, share a single link. Reports generate automatically.",
  },
];

function ValuePropsSection() {
  return (
    <section className="bg-[#0A1628] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Why MFDs &amp; RIAs choose SIFPrime
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {VALUE_PROPS.map((vp) => (
            <div
              key={vp.title}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-8 text-center transition hover:border-amber-500/40"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-3xl">
                {vp.emoji}
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{vp.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{vp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

const PRICING = [
  {
    name: "Starter",
    price: "\u20B9999",
    period: "/mo",
    badge: null,
    features: [
      "20 branded reports / month",
      "Branded reports with your logo + photo",
      "Email delivery to clients",
      "Basic partner dashboard",
      "Logo & photo on reports",
      "SIF explainer PDF for clients",
    ],
  },
  {
    name: "Pro",
    price: "\u20B91,999",
    period: "/mo",
    badge: "MOST POPULAR",
    features: [
      "100 branded reports / month",
      "Full brand kit (colours, tagline, disclaimer)",
      "Email + WhatsApp delivery",
      "Prospect tracking tool",
      "Client portal with your branding",
      "Monthly co-branded market update",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "\u20B94,999",
    period: "/mo",
    badge: null,
    features: [
      "Unlimited reports",
      "White-label experience",
      "Custom domain support",
      "API access",
      "Dedicated relationship manager",
      "Co-branded webinars",
      "Quarterly SIF briefing",
    ],
  },
];

function PricingSection() {
  return (
    <section className="bg-[#0f1d33] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
          Pick a plan that fits your practice. Upgrade or downgrade any time.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {PRICING.map((plan) => {
            const isPro = plan.badge !== null;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition ${
                  isPro
                    ? "border-amber-500 bg-gradient-to-b from-amber-500/10 to-slate-900/80 shadow-lg shadow-amber-500/10"
                    : "border-slate-700/60 bg-slate-900/40"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-slate-900">
                    {plan.badge}
                  </span>
                )}

                <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`mt-8 w-full py-5 font-semibold ${
                    isPro
                      ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
                      : "bg-slate-700 text-white hover:bg-slate-600"
                  }`}
                  onClick={() =>
                    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Started
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm font-semibold text-amber-400">
          First 30 days free. No credit card required.
        </p>
        <p className="mt-2 text-center text-xs text-slate-500">
          RIA? We have an advisory-only plan. Contact{" "}
          <a
            href="mailto:partners@sifprime.com"
            className="text-amber-500 underline hover:text-amber-400"
          >
            partners@sifprime.com
          </a>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Signup Form                                                        */
/* ------------------------------------------------------------------ */

const EMPTY_FORM: SignupFormData = {
  full_name: "",
  firm_name: "",
  arn_number: "",
  email: "",
  phone: "",
  city: "",
  aum_band: "",
  distributor_status: "",
  plan: "pro",
  password: "",
};

function SignupFormSection() {
  const router = useRouter();
  const [form, setForm] = useState<SignupFormData>(EMPTY_FORM);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = useCallback(
    (key: keyof SignupFormData, val: string) =>
      setForm((prev) => ({ ...prev, [key]: val })),
    [],
  );

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!form.full_name.trim()) errs.full_name = "Full name is required";
    if (!form.firm_name.trim()) errs.firm_name = "Firm name is required";
    if (!form.arn_number.trim()) errs.arn_number = "ARN number is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.aum_band) errs.aum_band = "Select an AUM band";
    if (!form.distributor_status)
      errs.distributor_status = "Select your SIF distribution status";
    if (!form.plan) errs.plan = "Select a plan";
    if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (form.password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/partner/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      router.push(`/partner/dashboard?key=${data.widget_key}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";
  const errCls = "mt-1 text-xs text-red-400";

  return (
    <section id="signup" className="bg-[#0A1628] py-20">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Create your partner account
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-slate-400">
          Takes under 5 minutes. Start generating co-branded SIF reports today.
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
          noValidate
        >
          {/* Full Name */}
          <div>
            <label className={labelCls}>Full Name *</label>
            <input
              type="text"
              className={inputCls}
              placeholder="Rajeev Sharma"
              value={form.full_name}
              onChange={(e) => set("full_name", e.target.value)}
            />
            {fieldErrors.full_name && <p className={errCls}>{fieldErrors.full_name}</p>}
          </div>

          {/* Firm Name */}
          <div>
            <label className={labelCls}>Firm / Business Name *</label>
            <input
              type="text"
              className={inputCls}
              placeholder="Sharma Wealth Advisors"
              value={form.firm_name}
              onChange={(e) => set("firm_name", e.target.value)}
            />
            {fieldErrors.firm_name && <p className={errCls}>{fieldErrors.firm_name}</p>}
          </div>

          {/* ARN */}
          <div>
            <label className={labelCls}>ARN Number *</label>
            <input
              type="text"
              className={inputCls}
              placeholder="ARN-XXXXX"
              value={form.arn_number}
              onChange={(e) => set("arn_number", e.target.value)}
            />
            {fieldErrors.arn_number && <p className={errCls}>{fieldErrors.arn_number}</p>}
          </div>

          {/* Email + Phone row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Email Address *</label>
              <input
                type="email"
                className={inputCls}
                placeholder="rajeev@firm.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              {fieldErrors.email && <p className={errCls}>{fieldErrors.email}</p>}
            </div>
            <div>
              <label className={labelCls}>Phone Number *</label>
              <input
                type="tel"
                className={inputCls}
                placeholder="98XXXXXXXX"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
              {fieldErrors.phone && <p className={errCls}>{fieldErrors.phone}</p>}
            </div>
          </div>

          {/* City */}
          <div>
            <label className={labelCls}>City *</label>
            <input
              type="text"
              className={inputCls}
              placeholder="Mumbai"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
            />
            {fieldErrors.city && <p className={errCls}>{fieldErrors.city}</p>}
          </div>

          {/* AUM Band + Distribution Status row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>AUM Band *</label>
              <select
                className={inputCls}
                value={form.aum_band}
                onChange={(e) => set("aum_band", e.target.value)}
              >
                <option value="" disabled>
                  Select AUM band
                </option>
                {AUM_BANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {fieldErrors.aum_band && <p className={errCls}>{fieldErrors.aum_band}</p>}
            </div>
            <div>
              <label className={labelCls}>SIF Distribution Status *</label>
              <select
                className={inputCls}
                value={form.distributor_status}
                onChange={(e) => set("distributor_status", e.target.value)}
              >
                <option value="" disabled>
                  Select status
                </option>
                {DIST_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              {fieldErrors.distributor_status && (
                <p className={errCls}>{fieldErrors.distributor_status}</p>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Not yet empanelled for SIF distribution? No problem &mdash; we&apos;ll
            guide you through the empanelment process after signup.
          </p>

          {/* Plan */}
          <div>
            <label className={labelCls}>Plan *</label>
            <div className="flex flex-wrap gap-4">
              {PLANS.map((p) => (
                <label
                  key={p.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-3 text-sm transition ${
                    form.plan === p.value
                      ? "border-amber-500 bg-amber-500/10 text-amber-300"
                      : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.value}
                    checked={form.plan === p.value}
                    onChange={(e) => set("plan", e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`inline-block h-3 w-3 rounded-full border-2 ${
                      form.plan === p.value
                        ? "border-amber-500 bg-amber-500"
                        : "border-slate-600"
                    }`}
                  />
                  {p.label}
                </label>
              ))}
            </div>
            {fieldErrors.plan && <p className={errCls}>{fieldErrors.plan}</p>}
          </div>

          {/* Password */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Password * (min 8 chars)</label>
              <input
                type="password"
                className={inputCls}
                placeholder="Min 8 characters"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              {fieldErrors.password && <p className={errCls}>{fieldErrors.password}</p>}
            </div>
            <div>
              <label className={labelCls}>Confirm Password *</label>
              <input
                type="password"
                className={inputCls}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {fieldErrors.confirmPassword && (
                <p className={errCls}>{fieldErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 py-6 text-base font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Partner Account \u2014 Free for 30 Days"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PartnerPageClient() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <SifExplainerBanner />
        <ValuePropsSection />
        <PricingSection />
        <SignupFormSection />
      </main>
      <Footer />
    </>
  );
}
