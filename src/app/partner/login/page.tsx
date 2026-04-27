import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Partner Login — SIFPrime',
  description: 'Log in to your SIFPrime partner dashboard.',
  robots: { index: false, follow: false },
};

export default function PartnerLoginPage() {
  return <PageClient />;
}
