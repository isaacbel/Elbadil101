'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayoutClient({
  children,
  userEmail,
  userRole,
}: {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on login page, render clean layout without sidebar or topbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Overview & Analytics';
    if (pathname === '/admin/submissions') return 'Citizen Submissions';
    if (pathname === '/admin/complaints') return 'Complaints & Grievances';
    if (pathname === '/admin/suggestions') return 'Citizen Suggestions';
    if (pathname === '/admin/support') return 'Supporters Directory';
    return 'Admin Dashboard';
  };

  return (
    <div className="min-h-screen bg-sand flex">
      {/* Sidebar */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        userRole={userRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={getPageTitle()}
          userEmail={userEmail}
          userRole={userRole}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
