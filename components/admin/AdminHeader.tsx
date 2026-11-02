'use client';

import React from 'react';
import { Menu, ShieldCheck, User, LogOut, KeyRound } from 'lucide-react';

interface HeaderProps {
  title: string;
  userEmail?: string;
  userRole?: string;
  onOpenMobileSidebar?: () => void;
  onOpenPasswordModal?: () => void;
}

export default function AdminHeader({
  title,
  userEmail = 'admin@candidate.dz',
  userRole = 'admin',
  onOpenMobileSidebar,
  onOpenPasswordModal,
}: HeaderProps) {
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <header className="h-16 px-4 sm:px-6 lg:px-8 bg-sand border-b border-line flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-ink hover:bg-sand/60 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-serif font-bold text-lg sm:text-xl text-teal tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Role indicator badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/5 border border-teal/15 text-xs font-semibold text-teal">
          <ShieldCheck className="w-3.5 h-3.5 text-green-brand" />
          <span className="capitalize">{userRole.replace('_', ' ')}</span>
        </div>

        {/* User email badge */}
        <div className="flex items-center gap-2 text-xs font-medium text-ink/70 bg-white/70 px-3 py-1.5 rounded-lg border border-line">
          <User className="w-3.5 h-3.5 text-teal" />
          <span className="max-w-[140px] sm:max-w-[200px] truncate">{userEmail}</span>
        </div>

        {/* Change password button */}
        {onOpenPasswordModal && (
          <button
            type="button"
            onClick={onOpenPasswordModal}
            className="p-2 rounded-lg text-muted hover:text-teal hover:bg-sand/60 transition-colors"
            title="Change password"
            aria-label="Change password"
          >
            <KeyRound className="w-4 h-4" />
          </button>
        )}

        {/* Quick logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 rounded-lg text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
