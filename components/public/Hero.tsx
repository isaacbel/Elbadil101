'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { candidate } from '@/data/content';
import { CAMPAIGN_LOCATION } from '@/lib/constants';
import Logo from '@/components/shared/Logo';
import { ArrowDown, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function Hero() {
  const { locale, dir, t } = useI18n();

  return (
    <section
      id="home"
      className="relative min-h-[85vh] lg:min-h-[90vh] bg-gradient-to-b from-deep via-teal to-[#093D39] text-sand pt-32 pb-20 lg:py-40 overflow-hidden flex items-center justify-center text-center"
    >
      {/* Subtle Architectural & Geometric Background Graphics + Brand 101 watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/20" />
        <div className="absolute top-1/4 -right-16 w-[550px] h-[550px] rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-white/15" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        {/* Large Decorative 101 Figure in Kreon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-kreon text-[260px] sm:text-[360px] lg:text-[460px] font-bold text-wheat/[0.04] select-none pointer-events-none leading-none">
          101
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Subtle Brand Symbol Emblem */}
        <div className="mb-6 opacity-90 transition-transform hover:scale-105 duration-300">
          <Logo layout="symbol" colourway="reversed" width={48} height={48} priority />
        </div>

        {/* Candidate Role & Locked Location Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-sand/95 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-wheat animate-pulse" />
          <span className="font-semibold text-wheat">القائمة 101</span>
          <span className="opacity-40">|</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sand/80" />
            <span>{CAMPAIGN_LOCATION.commune[locale]} · {CAMPAIGN_LOCATION.wilaya[locale]}</span>
          </span>
        </div>

        {/* Campaign Slogan H1 with Kufam */}
        <h1 className="font-kufam text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-sand leading-[1.15] max-w-4xl mx-auto mb-6">
          {candidate.slogan[locale]}
        </h1>

        {/* Subtitle / Intro text */}
        <p className="text-lg sm:text-xl lg:text-2xl text-sand/85 max-w-3xl mx-auto font-light leading-relaxed mb-10">
          {candidate.shortBio[locale]}
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 mb-10">
          {/* Primary CTA: Directly scrolls to contact form */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-wheat hover:bg-wheat/90 text-deep text-base font-semibold transition-all duration-200 shadow-elevated hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>{locale === 'ar' ? 'تواصل معنا مباشرة' : locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}</span>
            <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </a>

          {/* Secondary CTA: Vision */}
          <a
            href="#vision"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-sand text-base font-medium transition-all duration-200 backdrop-blur-sm"
          >
            <span>{t('hero.visionCta')}</span>
            <ArrowDown className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Institutional Guarantee Note */}
        <div className="pt-6 border-t border-white/15 flex items-center justify-center gap-3 text-xs text-sand/75">
          <ShieldCheck className="w-4 h-4 text-green-brand flex-shrink-0" />
          <span>{candidate.party[locale]}</span>
        </div>
      </div>
    </section>
  );
}
