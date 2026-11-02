'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/shared/Logo';
import { Lock, Mail, AlertCircle, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
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
        setErrorMsg(data.error || 'Invalid email or password.');
        setStatus('error');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMsg('Authentication error. Please check connection.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-deep flex flex-col justify-center items-center p-4 relative overflow-hidden select-none text-sand">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      {/* Back to Site Button */}
      <div className="absolute top-6 left-6 z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-sand/70 hover:text-sand transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to public site</span>
        </a>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Emblem & Title */}
        <div className="text-center mb-8 space-y-3">
          <div className="flex justify-center drop-shadow-md">
            <Logo layout="horizontal" colourway="reversed" width={180} height={50} priority />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sand">
            Candidate Office Dashboard
          </h1>
          <p className="text-xs text-sand/70">
            Authorized Campaign Personnel &amp; Staff Portal
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
                Office Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@candidate.dz"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal text-sm text-ink bg-white transition-all"
                />
                <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  dir="ltr"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-teal text-sm text-ink bg-white transition-all"
                />
                <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
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
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-line text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-green-brand" />
              <span>Protected by cryptographic session tokens &amp; role checks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
