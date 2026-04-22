import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SifQuiz = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Which SIF is Right for Me? Free 2-Minute Quiz",
  description:
    "Take our 5-question quiz to get a personalised SIF recommendation. Matched by risk profile, goals and investment horizon — across all 14 SEBI-regulated Specialized Investment Funds in India.",
  alternates: { canonical: "https://sifprime.com/sif-quiz" },
  openGraph: {
    title: "Find Your Ideal SIF — Free 2-Minute Quiz",
    description:
      "Answer 5 questions, get a personalised SIF fund recommendation.",
    url: "https://sifprime.com/sif-quiz",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "Find Your Ideal SIF — Free Quiz",
    description:
      "5 questions to find your perfect Specialized Investment Fund match.",
  },
};

export const revalidate = 86400;

const QUIZ_LD = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Which SIF is Right for Me?",
  description:
    "5-question quiz that matches your risk profile and investment goals to the right Specialized Investment Fund in India.",
  url: "https://sifprime.com/sif-quiz",
  educationalLevel: "Intermediate",
  about: {
    "@type": "Thing",
    name: "Specialized Investment Funds (SIFs)",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* SSR'd hero */}
        <section className="container mx-auto px-4 max-w-4xl py-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Which SIF is Right for Me?
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
            A free 2-minute, 5-question quiz that matches your risk profile,
            investment goals and time horizon to the right Specialized
            Investment Fund among all 17 SIFs in India.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">5</span>{" "}
              questions
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              <span className="font-semibold text-foreground">2</span> minutes
            </li>
            <li className="hidden md:inline">•</li>
            <li>Personalised top-3 recommendation</li>
          </ul>
        </section>

        {/* Interactive quiz (client island) */}
        <SifQuiz />

        {/* SSR'd SEO prose */}
        <section className="container mx-auto px-4 max-w-3xl py-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How the quiz works
            </h2>
            <p>
              The quiz asks 5 short questions: your primary investment goal
              (capital protection vs growth vs both), comfort during a 10%+
              market correction, time horizon (under 2 years, 2–5 years, or 5+
              years), strategy preference (Hybrid vs Equity Long-Short vs
              Ex-Top 100), and AMC preference (if any). Based on your answers,
              we score each of the 17 SIFs on fit and surface the top 3
              matches, each with its Alpha Shield capital-protection score
              and since-inception return.
            </p>
            <p>
              Quiz results are a starting point, not investment advice. SIFs
              carry high risk — they can use derivatives and run net-short
              positions. Always read the Scheme Information Document and, if
              unsure, talk to a SEBI-registered investment advisor before
              committing ₹10 lakh or more. For a deeper look at each fund, see
              the{" "}
              <Link href="/all-sifs-india-ranked-explained">
                ranked list of all 17 SIFs
              </Link>{" "}
              or the <Link href="/sif-compare">side-by-side comparison tool</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(QUIZ_LD) }}
      />
    </div>
  );
}
