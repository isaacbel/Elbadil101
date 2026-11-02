import { ReactNode } from 'react';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './AdminLayoutClient';

export const dynamic = 'force-dynamic';

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
