'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { ADMIN_ROLE_LABELS } from '@/lib/admin-labels';
import Logo from '@/components/shared/Logo';
import {
  LayoutDashboard,
  Inbox,
  ShieldAlert,
  Lightbulb,
  Users,
  KeyRound,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  userRole?: string;
  onOpenPasswordModal?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
  userRole = 'admin',
  onOpenPasswordModal,
}: SidebarProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: '/admin', label: t('admin.nav.dashboard'), icon: LayoutDashboard },
    { href: '/admin/submissions', label: t('admin.nav.submissions'), icon: Inbox },
    { href: '/admin/complaints', label: t('admin.nav.complaints'), icon: ShieldAlert },
    { href: '/admin/suggestions', label: t('admin.nav.suggestions'), icon: Lightbulb },
    { href: '/admin/support', label: t('admin.nav.supporters'), icon: Users },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const roleText = ADMIN_ROLE_LABELS[userRole] || t('admin.nav.administration');

  const content = (
    <div className="h-full flex flex-col justify-between p-4 bg-teal text-sand select-none font-naskh">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pt-2 pb-4 border-b border-white/10">
          <div>
            <div className="mb-2">
              <Logo layout="horizontal" colourway="reversed" width={140} height={38} />
            </div>
            <div className="text-[11px] text-wheat font-semibold tracking-wide">
              {roleText}
            </div>
          </div>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg bg-white/10 text-sand hover:bg-white/20"
              aria-label={t('admin.drawer.close')}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-sand text-teal font-semibold shadow-sm'
                    : 'text-sand/80 hover:bg-white/10 hover:text-sand'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal' : 'text-sand/70'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        {onOpenPasswordModal && (
          <button
            type="button"
            onClick={() => {
              if (onCloseMobile) onCloseMobile();
              onOpenPasswordModal();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-sand/80 hover:bg-white/10 hover:text-sand transition-colors text-start"
          >
            <span className="flex items-center gap-2.5">
              <KeyRound className="w-3.5 h-3.5 text-wheat" />
              <span>{t('admin.nav.changePassword')}</span>
            </span>
          </button>
        )}

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-sand/75 hover:bg-white/10 hover:text-sand transition-colors"
        >
          <span>{t('admin.nav.viewPublicSite')}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-200 hover:bg-red-950/40 hover:text-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span>{t('admin.nav.signOut')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar (Fixed at start/right in RTL) */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-s border-teal-light/40 bg-teal z-30">
        {content}
      </aside>

      {/* Mobile Modal Drawer (Slides from end/right in RTL) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="fixed inset-y-0 end-0 w-72 bg-teal shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
