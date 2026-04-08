export const calculateAlphaShield = (fundReturn: number | null, niftyReturn: number = -11.30): number | null => {
  if (fundReturn === null) return null;
  if (fundReturn >= 0) return 10.0;
  const capitalProtected = (1 - (Math.abs(fundReturn) / Math.abs(niftyReturn))) * 100;
  return Math.max(0, Math.round((capitalProtected / 10) * 10) / 10);
};

export const getAlphaShieldLabel = (score: number | null): string => {
  if (score === null) return 'Insufficient Data';
  if (score >= 9) return 'Elite Protection';
  if (score >= 7) return 'Strong Protection';
  if (score >= 5) return 'Moderate Protection';
  if (score >= 3) return 'Limited Protection';
  return 'Weak Protection';
};

export const getAlphaShieldColor = (score: number | null): string => {
  if (score === null) return '#6b7280';
  if (score >= 9) return '#10b981';
  if (score >= 7) return '#0e7c6a';
  if (score >= 5) return '#3b82f6';
  if (score >= 3) return '#f59e0b';
  return '#ef4444';
};
