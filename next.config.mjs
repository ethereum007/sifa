/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_PROJECT_ID: process.env.VITE_SUPABASE_PROJECT_ID || process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID,
  },
  async redirects() {
    return [
      { source: "/isifextop100", destination: "/sifs/isif/extop100", permanent: true },
      { source: "/isif-hybrid", destination: "/sifs/isif/hybrid", permanent: true },
      { source: "/specialized-investment-fund-sif", destination: "/what-is-sif", permanent: true },
      { source: "/sif-funds", destination: "/sif-funds-launched", permanent: true },
      // URL canonicalization — avoid duplicate content penalties
      { source: "/sifperformance", destination: "/sif-performance", permanent: true },
      { source: "/sifvsmutualfund", destination: "/sif-vs-mf", permanent: true },
      { source: "/compare-sifs", destination: "/sif-compare", permanent: true },
      { source: "/arudha", destination: "/sifs/arudha-hybrid-long-short", permanent: true },
      { source: "/dyna-equity-long-short", destination: "/sifs/dyna-equity-long-short", permanent: true },
      { source: "/qsif-equity-long-short", destination: "/sifs/qsif-equity-long-short", permanent: true },
      { source: "/qsif-ex-top-100-long-short", destination: "/sifs/qsif-ex-top-100-long-short", permanent: true },
      { source: "/diviniti-equity-long-short", destination: "/sifs/diviniti-equity-long-short", permanent: true },
      { source: "/dyna-active-asset-allocator", destination: "/sifs/dyna-active-asset-allocator", permanent: true },
      { source: "/apex-hybrid-long-short", destination: "/sifs/apex-hybrid-long-short", permanent: true },
      { source: "/arudha-equity-long-short", destination: "/sifs/arudha-equity-long-short", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sifprime.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
};

export default nextConfig;
