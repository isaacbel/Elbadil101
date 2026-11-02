'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import arMessages from '@/messages/ar.json';
import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';

export type Locale = 'ar' | 'fr' | 'en';

const messagesMap: Record<Locale, any> = {
  ar: arMessages,
  fr: frMessages,
  en: enMessages,
};

interface I18nContextType {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  setLocale: (l: Locale) => void;
  t: (
    path: string,
    paramsOrFallback?: Record<string, string | number> | string,
    fallback?: string
  ) => string;
}

const I18nContext = createContext<I18nContextType>({
  locale: 'ar',
  dir: 'rtl',
  setLocale: () => {},
  t: (k) => k,
});

export function I18nProvider({
  children,
  initialLocale = 'ar',
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Check cookie on mount
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
    if (match && (match[1] === 'ar' || match[1] === 'fr' || match[1] === 'en')) {
      const saved = match[1] as Locale;
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    } else {
      document.documentElement.lang = initialLocale;
      document.documentElement.dir = initialLocale === 'ar' ? 'rtl' : 'ltr';
    }
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (
    path: string,
    paramsOrFallback?: Record<string, string | number> | string,
    fallback?: string
  ): string => {
    let params: Record<string, string | number> | undefined;
    let defaultVal = fallback;
    if (typeof paramsOrFallback === 'string') {
      defaultVal = paramsOrFallback;
    } else if (paramsOrFallback && typeof paramsOrFallback === 'object') {
      params = paramsOrFallback;
    }

    const keys = path.split('.');
    let current: any = messagesMap[locale];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English, then Arabic, then fallback string or key
        let fallbackVal: any = messagesMap['en'];
        for (const fk of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fk in fallbackVal) {
            fallbackVal = fallbackVal[fk];
          } else {
            fallbackVal = null;
            break;
          }
        }
        current = typeof fallbackVal === 'string' ? fallbackVal : defaultVal || path;
        break;
      }
    }

    let result = typeof current === 'string' ? current : defaultVal || path;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return result;
  };

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, dir, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
