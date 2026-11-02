'use client';

import React from 'react';
import { useI18n, Locale } from '@/lib/i18n';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  const languages: { code: Locale; label: string }[] = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  return (
    <div className={`inline-flex items-center rounded-full bg-white/10 backdrop-blur-md p-1 border border-white/20 text-xs font-medium text-sand ${className}`}>
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLocale(lang.code)}
            className={`px-3 py-1 rounded-full transition-all duration-200 ${
              isActive
                ? 'bg-wheat text-deep font-semibold shadow-sm'
                : 'text-sand/80 hover:text-sand hover:bg-white/10'
            }`}
            aria-pressed={isActive}
            aria-label={`Change language to ${lang.label}`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
