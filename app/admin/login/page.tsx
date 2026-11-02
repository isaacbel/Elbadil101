'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import Logo from '@/components/shared/Logo';
import { Lock, Mail, AlertCircle, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setErrorMsg(t('admin.login.lockout'));
        } else {
          setErrorMsg(t('admin.login.incorrectCredentials'));
        }
        setStatus('error');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMsg(t('common.error'));
      setStatus('error');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-deep flex flex-col justify-center items-center p-4 relative overflow-hidden select-none text-sand font-naskh">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Back to Site Button (Logical top-start) */}
      <div className="absolute top-6 start-6 z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-sand/70 hover:text-sand transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>{t('admin.login.backToSite')}</span>
        </a>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Emblem & Title */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex justify-center drop-shadow-md">
            <Logo layout="horizontal" colourway="reversed" width={180} height={50} priority />
          </div>
          <h1 className="font-kufam text-2xl sm:text-3xl font-bold text-sand">
            {t('admin.login.title')}
          </h1>
          <p className="text-xs text-sand/70 font-naskh">
            {t('admin.login.subtitle')}
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 text-ink">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                {t('admin.login.email')}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@candidate.dz"
                  className="w-full ps-10 pe-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal text-sm text-ink bg-white transition-all text-start"
                />
                <Mail className="w-4 h-4 text-muted absolute start-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                {t('admin.login.password')}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full ps-10 pe-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal text-sm text-ink bg-white transition-all text-start"
                />
                <Lock className="w-4 h-4 text-muted absolute start-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl bg-teal hover:bg-teal-light text-sand font-semibold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('admin.login.submitting')}</span>
                </>
              ) : (
                <span>{t('admin.login.submit')}</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-line text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-green-brand" />
              <span>{t('admin.login.securityBadge')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
