"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { CONSULTATION_URL, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { sifFunds, type SIFund } from "@/lib/sifData";
import { calculateAlphaShield } from "@/lib/alphaShield";
import AlphaShieldBadge from "@/components/AlphaShieldBadge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Answers {
  goal?: string;
  crashComfort?: string;
  timeHorizon?: string;
  strategyPref?: string;
  amcPref?: string;
}

interface OptionCard {
  key: string;
  emoji: string;
  title: string;
  subtitle: string;
}

/* ------------------------------------------------------------------ */
/*  Quiz option data                                                   */
/* ------------------------------------------------------------------ */

const STEPS: {
  question: string;
  answerKey: keyof Answers;
  options: OptionCard[];
}[] = [
  {
    question: "What matters most to you?",
    answerKey: "goal",
    options: [
      {
        key: "A",
        emoji: "\u{1F6E1}\uFE0F",
        title: "Capital Protection",
        subtitle: "Limit my losses when markets crash",
      },
      {
        key: "B",
        emoji: "\u{1F4C8}",
        title: "Beat the Market",
        subtitle: "Outperform Nifty over 3\u20135 years",
      },
      {
        key: "C",
        emoji: "\u{1F3AF}",
        title: "Advanced Strategies",
        subtitle: "Access what institutions use",
      },
      {
        key: "D",
        emoji: "\u{1F310}",
        title: "True Diversification",
        subtitle: "Uncorrelated to stocks and bonds",
      },
    ],
  },
  {
    question: "If this investment fell 8% in one month, you would:",
    answerKey: "crashComfort",
    options: [
      {
        key: "A",
        emoji: "\u{1F630}",
        title: "Exit immediately",
        subtitle: "I cannot tolerate losses",
      },
      {
        key: "B",
        emoji: "\u{1F61F}",
        title: "Hold, but lose sleep",
        subtitle: "Uncomfortable with drawdowns",
      },
      {
        key: "C",
        emoji: "\u{1F60C}",
        title: "Hold comfortably",
        subtitle: "I understand markets cycle",
      },
      {
        key: "D",
        emoji: "\u{1F60A}",
        title: "Buy more",
        subtitle: "Great entry point!",
      },
    ],
  },
  {
    question: "How long can you stay invested?",
    answerKey: "timeHorizon",
    options: [
      {
        key: "A",
        emoji: "\u{1F4C5}",
        title: "1\u20132 years",
        subtitle: "Short term",
      },
      {
        key: "B",
        emoji: "\u{1F4C5}",
        title: "2\u20133 years",
        subtitle: "Medium term",
      },
      {
        key: "C",
        emoji: "\u{1F4C5}",
        title: "3\u20135 years",
        subtitle: "\u2713 Recommended",
      },
      {
        key: "D",
        emoji: "\u{1F4C5}",
        title: "5+ years",
        subtitle: "Long term",
      },
    ],
  },
  {
    question: "Which approach resonates with you?",
    answerKey: "strategyPref",
    options: [
      {
        key: "A",
        emoji: "\u{1F30D}",
        title: "Multi-strategy + Global",
        subtitle: "Equity + Debt + Overseas + Events",
      },
      {
        key: "B",
        emoji: "\u2696\uFE0F",
        title: "Pure Long-Short",
        subtitle: "Equity with a short hedge",
      },
      {
        key: "C",
        emoji: "\u{1F916}",
        title: "Quantitative / Algorithmic",
        subtitle: "Data-driven, systematic",
      },
      {
        key: "D",
        emoji: "\u{1F680}",
        title: "Mid & Small Cap Focus",
        subtitle: "Beyond the top 100 stocks",
      },
    ],
  },
  {
    question: "Any fund house preference? (optional)",
    answerKey: "amcPref",
    options: [
      {
        key: "A",
        emoji: "\u{1F3E6}",
        title: "Large established AMC",
        subtitle: "SBI, ICICI, Tata, Bandhan",
      },
      {
        key: "B",
        emoji: "\u{1F4A1}",
        title: "Specialist boutique",
        subtitle: "Edelweiss, DSP",
      },
      {
        key: "C",
        emoji: "\u{1F4CA}",
        title: "Quantitative specialist",
        subtitle: "Quant",
      },
      {
        key: "D",
        emoji: "\u{1F52C}",
        title: "Innovative boutique",
        subtitle: "360 ONE, ITI",
      },
      {
        key: "E",
        emoji: "\u{1F937}",
        title: "No preference",
        subtitle: "Show me the best match",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Scoring logic                                                      */
/* ------------------------------------------------------------------ */

function scoreFunds(answers: Answers): SIFund[] {
  const scores = new Map<string, number>();

  for (const fund of sifFunds) {
    let score = 0;

    // --- Primary goal (weight 30) ---
    const goal = answers.goal;
    if (goal === "A") {
      const as = calculateAlphaShield(fund.marchCrashData?.fundReturn ?? null, fund.marchCrashData?.benchmarkReturn ?? -11.30);
      if (as !== null && as >= 8) score += 30;
      else if (as !== null && as >= 6) score += 20;
      else if (as !== null && as >= 4) score += 10;
    } else if (goal === "B") {
      // highest sinceInception gets 30; scale linearly
      const allReturns = sifFunds.map((f) => f.returns.sinceInception);
      const maxRet = Math.max(...allReturns);
      const minRet = Math.min(...allReturns);
      const range = maxRet - minRet || 1;
      score += Math.round(
        ((fund.returns.sinceInception - minRet) / range) * 30
      );
    } else if (goal === "C") {
      if (
        fund.strategyType === "quantitative" ||
        fund.strategyType === "multi-strategy"
      )
        score += 30;
    } else if (goal === "D") {
      // multi-strategy with global/overseas emphasis
      if (
        fund.strategyType === "multi-strategy" ||
        fund.strategyType === "active-asset-allocator"
      )
        score += 30;
    }

    // --- Crash comfort (weight 20) ---
    const cc = answers.crashComfort;
    if (cc === "A" || cc === "B") {
      if (
        fund.quizProfile.riskLevel === "conservative" ||
        fund.quizProfile.riskLevel === "moderate"
      )
        score += 20;
    } else if (cc === "C" || cc === "D") {
      if (fund.quizProfile.riskLevel === "aggressive") score += 20;
      else if (fund.quizProfile.riskLevel === "moderate") score += 10;
    }

    // --- Strategy preference (weight 30) ---
    const sp = answers.strategyPref;
    if (sp === "A") {
      if (
        fund.strategyType === "multi-strategy" ||
        fund.strategyType === "active-asset-allocator"
      )
        score += 30;
    } else if (sp === "B") {
      if (fund.strategyType === "pure-long-short") score += 30;
      else if (fund.strategyType === "equity-long-short") score += 20;
    } else if (sp === "C") {
      if (fund.strategyType === "quantitative") score += 30;
    } else if (sp === "D") {
      if (fund.categorySlug === "ex-top-100") score += 30;
    }

    // --- AMC preference (weight 20) ---
    const amc = answers.amcPref;
    if (amc === "A") {
      if (fund.quizProfile.amcTrust === "large") score += 20;
    } else if (amc === "B") {
      if (fund.quizProfile.amcTrust === "specialist") score += 20;
    } else if (amc === "C") {
      if (fund.quizProfile.amcTrust === "quant") score += 20;
    } else if (amc === "D") {
      if (fund.quizProfile.amcTrust === "boutique") score += 20;
    }
    // E = no preference, no filter

    scores.set(fund.id, score);
  }

  const sorted = [...sifFunds].sort(
    (a, b) => (scores.get(b.id) ?? 0) - (scores.get(a.id) ?? 0)
  );

  return sorted.slice(0, 3);
}

/* ------------------------------------------------------------------ */
/*  Why text generator                                                 */
/* ------------------------------------------------------------------ */

function whyText(fund: SIFund, answers: Answers): string {
  const parts: string[] = [];

  if (answers.goal === "A") {
    parts.push(
      `You prioritised capital protection \u2014 ${fund.shortName} has an Alpha Shield Score that shows strong downside defence during the March 2026 crash.`
    );
  } else if (answers.goal === "B") {
    parts.push(
      `You want to beat the market. ${fund.shortName} returned ${fund.returns.sinceInception > 0 ? "+" : ""}${fund.returns.sinceInception.toFixed(2)}% since inception.`
    );
  } else if (answers.goal === "C") {
    parts.push(
      `You wanted access to institutional-grade strategies. ${fund.shortName} uses a ${fund.strategyType.replace(/-/g, " ")} approach.`
    );
  } else if (answers.goal === "D") {
    parts.push(
      `You value true diversification. ${fund.shortName} provides exposure beyond traditional equity and bonds.`
    );
  }

  if (answers.crashComfort === "A" || answers.crashComfort === "B") {
    parts.push(
      `As a ${fund.quizProfile.riskLevel}-risk fund, it aligns with your comfort level during drawdowns.`
    );
  } else {
    parts.push(
      `Your higher risk tolerance pairs well with ${fund.shortName}\u2019s ${fund.quizProfile.riskLevel} risk profile.`
    );
  }

  if (answers.amcPref && answers.amcPref !== "E") {
    parts.push(`Managed by ${fund.amc}, matching your AMC preference.`);
  }

  return parts.join(" ");
}

function keyStrength(fund: SIFund): string {
  const mr = fund.marchCrashData?.fundReturn;
  if (mr !== null && mr !== undefined) {
    const direction = mr >= 0 ? `+${mr.toFixed(2)}%` : `${mr.toFixed(2)}%`;
    return `During the March 2026 crash (Nifty \u221211.3%), ${fund.shortName} returned ${direction}, protecting capital far better than the index.`;
  }
  return `${fund.shortName} launched after the March 2026 crash. Performance tracking is underway.`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SifQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<SIFund[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analysing your profile...");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);

  const handleSelect = useCallback(
    (answerKey: keyof Answers, value: string) => {
      const next = { ...answers, [answerKey]: value };
      setAnswers(next);

      if (step < 4) {
        setStep(step + 1);
      } else {
        // Last question answered -> compute results
        setStep(5);
        setLoading(true);
        setLoadingText("Analysing your profile...");
        setTimeout(() => {
          setLoadingText("Matching with 19 SIFs...");
        }, 700);
        setTimeout(() => {
          setResults(scoreFunds(next));
          setLoading(false);
        }, 1500);
      }
    },
    [answers, step]
  );

  const goBack = useCallback(() => {
    if (step > 0 && step <= 4) setStep(step - 1);
  }, [step]);

  const handleWhatsApp = () => {
    if (!results[0]) return;
    const fund = results[0];
    const msg = `Hi, I took the SIF Quiz on SIFPrime.\n\nMy best match: ${fund.name}\nReturns since inception: ${fund.returns.sinceInception > 0 ? "+" : ""}${fund.returns.sinceInception.toFixed(2)}%\n\nI'd like to know more about this fund.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const handleEmailSubscribe = async () => {
    if (!email || !results[0]) return;
    try {
      await supabase.from("leads").insert({
        email,
        name: `Quiz Match: ${results[0].name}`,
        phone: "",
      });
      setEmailSaved(true);
    } catch {
      /* silent fail */
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Loading spinner                                                  */
  /* ---------------------------------------------------------------- */

  if (step === 5 && loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-6">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mx-auto" />
          <p className="text-lg text-muted-foreground animate-pulse">
            {loadingText}
          </p>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Results page                                                     */
  /* ---------------------------------------------------------------- */

  if (step === 5 && !loading && results.length > 0) {
    const primary = results[0];
    const primaryAlpha = calculateAlphaShield(
      primary.marchCrashData?.fundReturn ?? null,
      primary.marchCrashData?.benchmarkReturn ?? -11.30
    );

    return (
      <div className="pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* ------ PRIMARY RESULT ------ */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-emerald-400 text-xs uppercase tracking-widest font-semibold mb-4">
              Your SIF Match
            </p>

              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm">
                  {primary.amcCode}
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {primary.name}
                  </h2>
                  <p className="text-sm text-slate-400">{primary.category}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-6 bg-slate-800/60 rounded-xl p-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">Alpha Shield</p>
                  <AlphaShieldBadge score={primaryAlpha} size="sm" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">
                    Since Inception
                  </p>
                  <p
                    className={`text-lg font-bold ${primary.returns.sinceInception >= 0 ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {primary.returns.sinceInception > 0 ? "+" : ""}
                    {primary.returns.sinceInception.toFixed(2)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400 mb-1">TER (Direct)</p>
                  <p className="text-lg font-bold text-white">
                    {primary.ter.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Why this fund */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                  Why This Fund for You:
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {whyText(primary, answers)}
                </p>
              </div>

              {/* Key strength */}
              <div className="mt-4">
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                  Key Strength:
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {keyStrength(primary)}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  href={`/${primary.slug}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                  >
                    View Full Fund Analysis →
                  </Button>
                </Link>
                <a
                  href={CONSULTATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="gold" className="w-full gap-2">
                    📱 Book a Consultation →
                  </Button>
                </a>
              </div>
            </div>

            {/* ------ ALSO CONSIDER ------ */}
            {results.length > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Also Consider:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.slice(1).map((fund) => {
                    const alpha = calculateAlphaShield(
                      fund.marchCrashData?.fundReturn ?? null,
                      fund.marchCrashData?.benchmarkReturn ?? -11.30
                    );
                    return (
                      <div
                        key={fund.id}
                        className="bg-card border border-border rounded-xl p-5"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs">
                            {fund.amcCode}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground text-sm">
                              {fund.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {fund.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <AlphaShieldBadge score={alpha} size="sm" />
                          <span
                            className={
                              fund.returns.sinceInception >= 0
                                ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                                : "text-red-600 dark:text-red-400 font-semibold"
                            }
                          >
                            {fund.returns.sinceInception > 0 ? "+" : ""}
                            {fund.returns.sinceInception.toFixed(2)}%
                          </span>
                          <span className="text-muted-foreground">
                            TER {fund.ter.toFixed(2)}%
                          </span>
                        </div>
                        <Link href={`/${fund.slug}`} className="mt-3 block">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Analysis →
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ------ LEAD CAPTURE ------ */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  Get this recommendation on WhatsApp
                </h4>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <Button
                    onClick={handleWhatsApp}
                    variant="gold"
                    className="shrink-0"
                  >
                    Send on WhatsApp
                  </Button>
                </div>
              </div>

              {/* Email */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  Get monthly SIF performance updates
                </h4>
                {emailSaved ? (
                  <p className="text-emerald-500 text-sm font-medium">
                    Subscribed! You will receive monthly updates.
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                    <Button
                      onClick={handleEmailSubscribe}
                      variant="gold"
                      className="shrink-0"
                    >
                      Subscribe
                    </Button>
                  </div>
                )}
              </div>
            </div>

          {/* Retake */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
                setResults([]);
                setEmailSaved(false);
                setPhone("");
                setEmail("");
              }}
              className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Retake quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Quiz steps (0-4)                                                 */
  /* ---------------------------------------------------------------- */

  const currentStep = STEPS[step];

  return (
    <div className="pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Step {step + 1} of 5
              </p>
              {step > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step
                      ? "bg-emerald-500"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {currentStep.question}
          </h2>

          {/* Option grid */}
          <div
            className={`grid gap-4 ${
              currentStep.options.length <= 4
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentStep.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() =>
                  handleSelect(currentStep.answerKey, opt.key)
                }
                className="group relative bg-card border border-border rounded-xl p-5 text-left transition-all duration-200 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 active:scale-[0.98]"
              >
                <span className="text-2xl block mb-2">{opt.emoji}</span>
                <p className="font-semibold text-foreground group-hover:text-emerald-500 transition-colors">
                  {opt.title}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {opt.subtitle}
                </p>
              </button>
            ))}
          </div>
      </div>
    </div>
  );
}
