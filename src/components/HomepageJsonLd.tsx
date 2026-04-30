const FAQ_ITEMS = [
  {
    question: "What is a Specialized Investment Fund (SIF)?",
    answer:
      "A SIF is a new SEBI-regulated investment product that bridges the gap between Mutual Funds and Portfolio Management Services (PMS). SIFs combine the ease of mutual funds with advanced long-short strategies using derivatives, offering sophisticated investing to HNI investors with a minimum investment of \u20b910 lakhs.",
  },
  {
    question: "What is the minimum investment for SIF in India?",
    answer:
      "The minimum aggregate investment for SIF is \u20b910,00,000 (\u20b910 lakhs) at the PAN level across all SIF strategies offered by an AMC. Accredited investors are exempt from this threshold. After meeting the threshold, SIP/STP/SWP options become available.",
  },
  {
    question: "How is SIF different from PMS?",
    answer:
      "SIFs have a much lower entry point (\u20b910 lakhs vs \u20b950 lakhs for PMS), offer mutual fund-like taxation benefits, provide daily/weekly liquidity, and are pooled vehicles rather than individually managed portfolios. SIFs can also take unhedged short positions up to 25% of net assets.",
  },
  {
    question: "How is SIF different from Mutual Funds?",
    answer:
      "While Mutual Funds can only use derivatives for hedging, SIFs can take unhedged short positions up to 25% of net assets. This allows SIF managers to potentially profit from both rising and falling markets. SIFs have a higher minimum investment (\u20b910 lakhs vs \u20b9500 for MFs) but retain MF-like taxation.",
  },
  {
    question: "Who can invest in SIF?",
    answer:
      "Any Indian resident or NRI with a minimum investment capacity of \u20b910 lakhs can invest in SIFs. Investors need to complete standard KYC requirements and open a separate SIF folio. Accredited investors are exempt from the minimum threshold requirement.",
  },
  {
    question: "How are SIFs taxed in India?",
    answer:
      "SIF taxation is aligned with Mutual Fund taxation. Equity-oriented SIFs: 12.5% LTCG (after 12 months), 20% STCG. Debt-oriented SIFs: taxed as per investor\u2019s income tax slab. Hybrid SIFs: 12.5% LTCG for holdings over 12 months, STCG as per slab.",
  },
];

export default function HomepageJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SIFPrime",
    url: "https://sifprime.com",
    logo: "https://sifprime.com/icon.svg",
    description:
      "India\u2019s premier platform for discovering, comparing, and investing in SEBI-regulated Specialized Investment Funds (SIFs)",
    email: "info@sifprime.com",
    telephone: "+919032999466",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [
      "https://www.linkedin.com/company/sif-prime",
      "https://www.instagram.com/sifprime/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SIFPrime",
    url: "https://sifprime.com",
    description: "Compare Specialized Investment Funds in India",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sifprime.com/sif-funds-launched?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
