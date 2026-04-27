// Toolkit module catalog. Imported by page.tsx (server) and PageClient.tsx.
// Lives outside page.tsx because Next.js App Router only permits a fixed
// set of named exports from page files.

export interface ToolkitModule {
  title: string;
  description: string;
  group: string;
  eta: string;
}

export const TOOLKIT_MODULES: Record<string, ToolkitModule> = {
  "empanelment": {
    title: "SIF Empanelment Guide",
    description: "NISM Series XIII certification, AMFI ARN add-on, AMC empanelment walkthrough with screenshots, EUIN registration, and common rejection reasons.",
    group: "01 — Get started",
    eta: "Week of 5 May 2026",
  },
  "sif-101-deck": {
    title: "SIF 101 Master Deck",
    description: "12-slide co-brandable PDF covering category, strategies, taxation, and HNI suitability. Editable in PowerPoint or Keynote.",
    group: "01 — Get started",
    eta: "Week of 12 May 2026",
  },
  "onboarding-checklist": {
    title: "Onboarding Checklist",
    description: "1-page PDF covering everything you need to set up before your first SIF transaction — folio, KYC validation, disclosure docs, marketing readiness.",
    group: "01 — Get started",
    eta: "Week of 12 May 2026",
  },
  "hni-pitch-deck": {
    title: "HNI Pitch Deck",
    description: "8-slide closing deck for the ₹50L–₹5Cr conversation. Co-brandable with your logo and ARN. The deck I use myself in client meetings.",
    group: "02 — Pitch SIF to clients",
    eta: "Week of 5 May 2026",
  },
  "battle-card": {
    title: "SIF vs PMS vs AIF Battle Card",
    description: "1-page PDF for the client who already has PMS or is evaluating an AIF. Side-by-side on minimum, taxation, liquidity, transparency, fees — with a decision tree.",
    group: "02 — Pitch SIF to clients",
    eta: "Week of 12 May 2026",
  },
  "allocation-tax": {
    title: "Allocation & Tax Playbook",
    description: "8-page PDF: allocation framework for ₹1Cr / ₹3Cr / ₹10Cr portfolios, the STCG 20% conversation script, rebalancing scenarios, year-end tax-loss harvesting.",
    group: "02 — Pitch SIF to clients",
    eta: "Week of 19 May 2026",
  },
  "selection-framework": {
    title: "SIF Selection Framework",
    description: "Our proprietary 8-pointer evaluation. The exact framework we use internally to rank SIFs. Includes a worked example applied to one fund.",
    group: "03 — Analyze the universe",
    eta: "Week of 5 May 2026",
  },
  "alpha-shield": {
    title: "Alpha Shield Scorecard",
    description: "Proprietary crash-protection metric scored out of 10. Monthly PDF + live web page. Updated within 48 hours of every NAV print. Methodology fully transparent.",
    group: "03 — Analyze the universe",
    eta: "Week of 19 May 2026",
  },
  "risk-pointers": {
    title: "SIF Risk Pointers",
    description: "8-page PDF — the eight risks every distributor must understand and disclose. For each: definition, when it matters, mitigation, what to tell clients.",
    group: "03 — Analyze the universe",
    eta: "Week of 12 May 2026",
  },
};
