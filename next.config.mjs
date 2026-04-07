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
      { source: "/sif-compare", destination: "/sif-vs-mf", permanent: true },
      { source: "/specialized-investment-fund-sif", destination: "/what-is-sif", permanent: true },
      { source: "/sif-funds", destination: "/sif-funds-launched", permanent: true },
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
