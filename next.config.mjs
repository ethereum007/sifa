/** @type {import('next').NextConfig} */
const nextConfig = {
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
    remotePatterns: [{ protocol: "https", hostname: "sifprime.com" }],
  },
};

export default nextConfig;
