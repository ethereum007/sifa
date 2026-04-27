import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Interactive comparison tool is the client island
const SifCompareTool = dynamic(() => import("./PageClient"), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-muted-foreground">Loading comparison tool...</div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Compare SIF Funds — Alpha Shield Scores & Returns",
  description:
    "Compare Hybrid Long-Short, Equity Long-Short and Ex-Top 100 SIFs side by side. Capital protection scores, returns, TER and strategy comparison across all 18 SIFs in India.",
  alternates: { canonical: "https://sifprime.com/sif-compare" },
  openGraph: {
    title: "Compare SIF Funds Side by Side",
    description:
      "Interactive SIF comparison tool. Alpha Shield scores, returns, costs and strategy analysis for all 18 SIFs in India.",
    url: "https://sifprime.com/sif-compare",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "Compare SIF Funds Side by Side",
    description: "Interactive SIF comparison tool on SIFPrime.",
  },
};

export const revalidate = 86400;

const FAQS = [
  {
    q: "How do I compare SIF funds on SIFPrime?",
    a: "Pick up to 3 Specialized Investment Funds from the selector above. The comparison table shows Alpha Shield score, March 2026 crash-period return, category rank, since-inception return, Total Expense Ratio (TER), minimum investment, redemption frequency, strategy type and benchmark — all side-by-side with best/worst highlighted.",
  },
  {
    q: "What is the Alpha Shield score?",
    a: "Alpha Shield is SIFPrime's proprietary capital-protection rating on a 0–10 scale. It measures how much downside a SIF avoided during the March 2026 market crash versus its benchmark. A score above 7 means the fund significantly protected capital during the drawdown.",
  },
  {
    q: "Which SIF categories can I compare?",
    a: "All four live SIF categories: Hybrid Long-Short, Equity Long-Short, Ex-Top 100 Long-Short, and Active Asset Allocator. You can mix categories in a single comparison — useful when evaluating risk/return trade-offs across strategies.",
  },
  {
    q: "Where do the numbers come from?",
    a: "NAV and returns are updated daily from the AMC-published data. Crash-period analysis uses the March 3–28, 2026 drawdown window. TER is the latest SID-disclosed figure for the Direct and Regular plans.",
  },
  {
    q: "How is SIFPrime different from aggregators like Groww or Moneycontrol?",
    a: "SIFPrime is the only India-specific platform focused entirely on SIFs. You get crash-period alpha analysis, capital-protection scoring, net-long-range disclosure, and side-by-side TER savings for Direct vs Regular — data most general aggregators don't track for this new category.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24 pb-12">
        {/* SSR'd hero with real h1 and description */}
        <section className="container mx-auto px-4 max-w-4xl py-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Compare SIF Funds Side by Side
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
            Compare up to 3 Specialized Investment Funds across Alpha Shield
            score, returns, TER, strategy and capital protection — all 14
            SEBI-registered SIFs in India, updated daily.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">14</span> live
              SIFs tracked
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              <span className="font-semibold text-foreground">4</span>{" "}
              categories
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              <span className="font-semibold text-foreground">Alpha Shield</span>{" "}
              capital-protection scoring
            </li>
          </ul>
        </section>

        {/* Interactive comparison tool (client island) */}
        <SifCompareTool />

        {/* SSR'd body copy + FAQ */}
        <section className="container mx-auto px-4 max-w-3xl mt-16">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How to choose between SIFs
            </h2>
            <p>
              Specialized Investment Funds look similar on the surface — same
              ₹10 lakh minimum, same SEBI framework, similar long-short
              mandates. The real differences show up in three places: how much
              capital the fund protected during the March 2026 crash, the
              TER drag on Regular vs Direct plans, and the net-long range the
              manager actually ran (as opposed to what the scheme document
              allowed).
            </p>
            <p>
              We recommend anchoring on the{" "}
              <strong>Alpha Shield score</strong> first. It&apos;s the single
              number that tells you whether the long-short machinery actually
              did its job when the market corrected. A fund with an 8+ Alpha
              Shield protected 60-70% more capital than a fund scoring below 4,
              on identical benchmark exposure. For long-term compounders, that
              asymmetry matters more than a few basis points of TER.
            </p>
            <p>
              Once you&apos;ve filtered by protection quality, look at{" "}
              <strong>since-inception return</strong> and{" "}
              <strong>category rank</strong>. Most SIFs launched between October
              2025 and March 2026, so a fund that has held up since inception
              through a crash has already been stress-tested. Pair that with
              the{" "}
              <Link href="/all-sifs-india-ranked-explained">
                SIFPrime ranked list of all 18 SIFs
              </Link>{" "}
              for deeper qualitative context.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">
              Frequently asked questions
            </h2>
            <dl className="space-y-6 not-prose">
              {FAQS.map(({ q, a }) => (
                <div
                  key={q}
                  className="border-b border-border/50 pb-6 last:border-0"
                >
                  <dt className="font-semibold text-foreground text-base md:text-lg">
                    {q}
                  </dt>
                  <dd className="text-muted-foreground mt-2 text-sm md:text-base leading-relaxed">
                    {a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Related tools / internal links */}
        <section className="container mx-auto px-4 max-w-3xl mt-16 text-sm">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
            <Link href="/sifs" className="hover:text-primary">
              Browse all SIFs by AMC →
            </Link>
            <Link href="/sif-performance" className="hover:text-primary">
              SIF performance tracker →
            </Link>
            <Link
              href="/all-sifs-india-ranked-explained"
              className="hover:text-primary"
            >
              All 18 SIFs ranked →
            </Link>
            <Link href="/which-sif-should-you-invest-in" className="hover:text-primary">
              Which SIF should you invest in? →
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
