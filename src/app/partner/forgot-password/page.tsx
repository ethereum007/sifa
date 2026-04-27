import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Forgot Password — SIFPrime Partner',
  description: 'Reset your SIFPrime partner account password.',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <PageClient />;
}
