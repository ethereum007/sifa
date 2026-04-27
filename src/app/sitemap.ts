import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sifprime.com";
  const now = new Date().toISOString();

  // Homepage
  const home: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
  ];

  // Core content pages
  const contentPages = [
    "/what-is-sif",
    "/sif-vs-mf",
    "/sif-vs-pms-vs-aif",
    "/sif-strategies",
    "/sif-minimum-investment",
    "/sif-tax-guide",
    "/sif-redemption-rules",
    "/sif-sip-swp-guide",
    "/sif-liquidity-guide",
    "/sif-derivatives-explained",
    "/ex-top-100-sif-explained",
    "/best-hybrid-sif",
    "/nri-sif-guide",
    "/all-sifs-india-ranked-explained",
    "/which-sif-should-you-invest-in",
    "/upcoming-sifs",
    "/sif-fund-insights",
    "/sif-compare",
    "/sif-quiz",
    "/sif-for-mfd",
    "/sif-performance",
    "/blog/sif-vs-pms-detailed-comparison",
    "/blog/best-sif-to-invest-2026",
    "/blog/sif-for-nri-complete-guide",
    "/blog/sif-sip-minimum-amount",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Performance & data pages
  const dataPages = [
    "/sifnav",
    "/sifreturns",
    "/sif-funds-launched",
    "/performance/october-2025",
    "/performance/november-2025",
    "/performance/december-2025",
    "/performance/january-2026",
    "/performance/february-2026",
    "/performance/march-2026",
    "/performance/april-2026",
    "/performance/march-2026/equity-long-short",
    "/performance/march-2026/equity-ex-top-100",
    "/performance/february-2026/equity-long-short",
    "/performance/february-2026/hybrid-long-short",
    "/performance/february-2026/equity-ex-top-100",
    "/performance/equity-long-short",
    "/performance/hybrid-long-short",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Individual fund pages
  const fundPages = [
    "/sifs/qsif-equity-long-short",
    "/sifs/qsif-ex-top-100-long-short",
    "/sifs/diviniti-equity-long-short",
    "/sifs/dyna-equity-long-short",
    "/sifs/dyna-active-asset-allocator",
    "/sifs/arudha-equity-long-short",
    "/sifs/apex-hybrid-long-short",
    "/sifs/altiva-hybrid-long-short",
    "/sifs/magnum-hybrid-long-short",
    "/sifs/titanium-hybrid-long-short",
    "/sifs/qsif-hybrid-long-short",
    "/sifs/arudha-hybrid-long-short",
    "/sifs/sapphire-equity-long-short",
    "/sifs/wsif-equity-long-short",
    "/sifs/wsif-ex-top-100-long-short",
    "/sifs/titanium-equity-long-short",
    "/sifs/qsif-active-asset-allocator-long-short",
    "/sifs/isif",
    "/sifs/isif/extop100",
    "/sifs/isif/hybrid",
    "/sifs",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Distributor & other pages
  const otherPages = [
    "/become-distributor",
    "/distributors/sif-billion-dollar-opportunity",
    "/blog",
    "/contact",
    "/disclaimer",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...home, ...contentPages, ...dataPages, ...fundPages, ...otherPages];
}
