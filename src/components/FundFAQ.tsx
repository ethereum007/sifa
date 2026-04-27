/**
 * FundFAQ — server component that renders a visible FAQ section
 * AND emits FAQPage JSON-LD for Google rich results.
 *
 * Pass an array of {q, a} objects. The component handles both the
 * styled visible FAQ block and the schema.org structured data.
 */

export interface FAQItem {
  q: string;
  a: string;
}

interface FundFAQProps {
  /** Heading shown above the FAQs (defaults to "Frequently asked questions") */
  heading?: string;
  /** Subheading prose below the heading */
  subheading?: string;
  /** Array of {q, a} pairs */
  faqs: FAQItem[];
}

export default function FundFAQ({
  heading = "Frequently asked questions",
  subheading,
  faqs,
}: FundFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <>
      <section className="py-12 lg:py-16 border-t border-border/50 bg-muted/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {heading}
          </h2>
          {subheading && (
            <p className="text-muted-foreground mb-8 text-sm md:text-base">
              {subheading}
            </p>
          )}
          <dl className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="border-b border-border/40 pb-6 last:border-0"
              >
                <dt className="font-semibold text-foreground text-base md:text-lg mb-2">
                  {q}
                </dt>
                <dd className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
