interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}

export default function ArticleJsonLd({
  headline,
  description,
  url,
  datePublished = "2026-01-01",
  dateModified = "2026-04-14",
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "SIFPrime",
    },
    publisher: {
      "@type": "Organization",
      name: "SIFPrime",
      logo: {
        "@type": "ImageObject",
        url: "https://sifprime.com/og-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
