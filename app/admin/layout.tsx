import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { getSession } from '@/lib/auth';
import AdminLayoutClient from './AdminLayoutClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'لوحة التحكم الإدارية | البديل 101',
    template: '%s | لوحة التحكم | البديل 101',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <AdminLayoutClient
      userEmail={session?.email}
      userRole={session?.role}
      mustChangePassword={Boolean(session?.mustChangePassword)}
    >
      {children}
    </AdminLayoutClient>
  );
}
