"use client";

const AMC_DOMAIN_MAP: Record<string, string> = {
  edelweiss: "edelweissmf.com",
  sbi: "sbimutual.com",
  tata: "tatamutualfund.com",
  bandhan: "bandhanmf.com",
  icici: "icicipruamc.com",
  quant: "quantmutual.com",
  "360 one": "360oneinvestments.com",
  iti: "itimf.com",
  dsp: "dspim.com",
  mirae: "miraeassetmf.com",
  "aditya birla": "adityabirlacapital.com",
};

function getAmcDomain(amcName: string): string | null {
  const lower = amcName.toLowerCase();
  for (const [key, domain] of Object.entries(AMC_DOMAIN_MAP)) {
    if (lower.includes(key)) return domain;
  }
  return null;
}

function getInitials(name: string): string {
  const words = name.replace(/mutual fund/gi, "").trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

const COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-orange-600",
  "bg-rose-600", "bg-teal-600", "bg-indigo-600", "bg-amber-600",
];

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

interface AmcLogoProps {
  amc: string;
  size?: "sm" | "md";
  className?: string;
}

export function getAmcLogoUrl(amcName: string): string | null {
  const domain = getAmcDomain(amcName);
  return domain ? `https://logo.clearbit.com/${domain}` : null;
}

const AmcLogo = ({ amc, size = "sm", className = "" }: AmcLogoProps) => {
  const dim = size === "md" ? "w-12 h-12" : "w-8 h-8";
  const textSize = size === "md" ? "text-sm" : "text-xs";

  return (
    <div className={`${dim} rounded-md ${getColor(amc)} flex items-center justify-center text-white font-semibold ${textSize} flex-shrink-0 ${className}`}>
      {getInitials(amc)}
    </div>
  );
};

export default AmcLogo;
