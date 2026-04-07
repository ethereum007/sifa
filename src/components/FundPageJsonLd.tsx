interface FundPageJsonLdProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  category?: string;
}

export default function FundPageJsonLd({
  name,
  description,
  provider,
  url,
  category = "Specialized Investment Fund",
}: FundPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    category,
    feesAndCommissionsSpecification: "Minimum investment \u20b910,00,000 (10 Lakhs)",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    broker: {
      "@type": "Organization",
      name: "SIFPrime",
      url: "https://sifprime.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
