interface ItemListItem {
  name: string;
  url: string;
}

interface ItemListJsonLdProps {
  items: ItemListItem[];
  name?: string;
}

export default function ItemListJsonLd({ items, name }: ItemListJsonLdProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
  if (name) schema.name = name;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
