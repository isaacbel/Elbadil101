'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { ArrowRight, Mail } from 'lucide-react';

export default function FinalCTA() {
  const { dir, t } = useI18n();

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-deep via-teal to-[#093D39] text-sand overflow-hidden text-center">
      {/* Decorative background circles */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-white/20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-kufam text-3xl sm:text-4xl lg:text-5xl font-bold text-sand mb-6 leading-tight">
          {t('cta.title')}
        </h2>
        <p className="text-sand/85 text-base sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {t('cta.text')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#support"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-wheat hover:bg-wheat/90 text-deep text-base font-semibold transition-all duration-200 shadow-elevated hover:scale-105 active:scale-95"
          >
            <span>{t('cta.supportBtn')}</span>
            <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-sand text-base font-medium transition-all duration-200 backdrop-blur-sm"
          >
            <Mail className="w-4 h-4 opacity-80" />
            <span>{t('cta.contactBtn')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
