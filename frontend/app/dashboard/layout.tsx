// app/dashboard/layout.tsx
'use client';

import { Layout } from '@/components/common/Layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}