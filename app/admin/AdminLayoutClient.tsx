'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ChangePasswordModal from '@/components/admin/ChangePasswordModal';
import { AlertTriangle, KeyRound } from 'lucide-react';

export default function AdminLayoutClient({
  children,
  userEmail,
  userRole,
  mustChangePassword = false,
}: {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
  mustChangePassword?: boolean;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  // If on login page, render clean layout without sidebar or topbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const showWeakPasswordPrompt = mustChangePassword && !promptDismissed && !hasChangedPassword;

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
        onOpenPasswordModal={() => setPasswordModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={getPageTitle()}
          userEmail={userEmail}
          userRole={userRole}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenPasswordModal={() => setPasswordModalOpen(true)}
        />

        {/* Security Warning Banner for Weak / Initial Password */}
        {showWeakPasswordPrompt && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 text-xs">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Security Alert:</strong> You are currently using a default or development password. Please change your password to a secure phrase.
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal hover:bg-deep text-sand font-semibold transition-colors shadow-xs"
              >
                <KeyRound className="w-3.5 h-3.5 text-wheat" />
                <span>Change Password</span>
              </button>
              <button
                type="button"
                onClick={() => setPromptDismissed(true)}
                className="text-amber-800/70 hover:text-amber-900 text-[11px] underline px-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSuccess={() => setHasChangedPassword(true)}
      />
    </div>
  );
}
