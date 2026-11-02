'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
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
  const { t } = useI18n();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [hasChangedPassword, setHasChangedPassword] = useState(false);

  // Enforce Arabic RTL on all admin pages
  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

  // If on login page, render clean layout with RTL and font-naskh
  if (pathname === '/admin/login') {
    return (
      <div dir="rtl" lang="ar" className="font-naskh text-start">
        {children}
      </div>
    );
  }

  const showWeakPasswordPrompt = mustChangePassword && !promptDismissed && !hasChangedPassword;

  const getPageTitle = () => {
    if (pathname === '/admin') return t('admin.nav.dashboard');
    if (pathname === '/admin/submissions') return t('admin.nav.submissions');
    if (pathname === '/admin/complaints') return t('admin.nav.complaints');
    if (pathname === '/admin/suggestions') return t('admin.nav.suggestions');
    if (pathname === '/admin/support') return t('admin.nav.supporters');
    return t('admin.nav.dashboard');
  };

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-sand flex font-naskh text-start">
      {/* Sidebar (Appears on right side in RTL flex) */}
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
                <strong>{t('admin.securityAlert.title')}</strong> {t('admin.securityAlert.message')}
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal hover:bg-deep text-sand font-semibold transition-colors shadow-xs"
              >
                <KeyRound className="w-3.5 h-3.5 text-wheat" />
                <span>{t('admin.securityAlert.changePasswordBtn')}</span>
              </button>
              <button
                type="button"
                onClick={() => setPromptDismissed(true)}
                className="text-amber-800/70 hover:text-amber-900 text-[11px] underline px-1"
              >
                {t('admin.securityAlert.dismiss')}
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
