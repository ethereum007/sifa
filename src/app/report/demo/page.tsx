import { redirect } from 'next/navigation';

export default function DemoReportPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const key = searchParams.key || '';
  redirect(`/report/demo-report?demo=true&key=${key}`);
}
