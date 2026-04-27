import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Reset Password — SIFPrime Partner',
  description: 'Set a new password for your SIFPrime partner account.',
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <PageClient />;
}
