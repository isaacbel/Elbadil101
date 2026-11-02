'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { X, Lock, KeyRound, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose, onSuccess }: Props) {
  const { t } = useI18n();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    if (newPassword !== confirmPassword) {
      setErrorMsg(t('admin.changePassword.mismatchError'));
      setStatus('error');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMsg(t('admin.changePassword.tooShortError'));
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || t('common.error'));
        setStatus('error');
        return;
      }

      setStatus('success');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setStatus('idle');
      }, 1500);
    } catch {
      setErrorMsg(t('common.error'));
      setStatus('error');
    }
  };

  return (
    <div dir="rtl" className="fixed inset-0 z-50 flex items-center justify-center p-4 font-naskh">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-line z-10 text-ink animate-fade-in text-start">
        <div className="flex items-center justify-between pb-4 border-b border-line mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal/10 text-teal flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-teal">{t('admin.changePassword.title')}</h3>
              <p className="text-[11px] text-muted">{t('admin.changePassword.subtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-sand/60 transition-colors"
            aria-label={t('admin.drawer.close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-brand/10 text-green-brand flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-lg text-teal">{t('admin.changePassword.successTitle')}</h4>
            <p className="text-xs text-muted">{t('admin.changePassword.successDesc')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                {t('admin.changePassword.currentPassword')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20 text-start"
                />
                <Lock className="w-4 h-4 text-muted absolute start-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                {t('admin.changePassword.newPassword')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20 text-start"
                />
                <KeyRound className="w-4 h-4 text-muted absolute start-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                {t('admin.changePassword.confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-line focus:outline-none focus:ring-1 focus:ring-teal text-xs bg-sand/20 text-start"
                />
                <KeyRound className="w-4 h-4 text-muted absolute start-3 top-3" />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-line text-xs font-semibold hover:bg-sand/40 transition-colors"
              >
                {t('admin.changePassword.cancel')}
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2 rounded-xl bg-teal hover:bg-deep text-sand text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{t('admin.changePassword.updating')}</span>
                  </>
                ) : (
                  <span>{t('admin.changePassword.submit')}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
