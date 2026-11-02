'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { candidate } from '@/data/content';
import { ArrowDown, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function Hero() {
  const { locale, dir, t } = useI18n();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen bg-gradient-to-b from-deep via-teal to-[#093D39] text-sand pt-28 pb-16 lg:py-36 overflow-hidden flex items-center"
    >
      {/* Subtle Architectural & Geometric Background Graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-white/20" />
        <div className="absolute top-1/4 -right-16 w-[550px] h-[550px] rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-white/15" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Candidate Role & Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-sand/90">
              <span className="w-2 h-2 rounded-full bg-wheat animate-pulse" />
              <span>{candidate.role[locale]}</span>
              <span className="opacity-40">|</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sand/70" />
                {candidate.place[locale]}
              </span>
            </div>

            {/* Campaign Slogan H1 with Kufam for campaign voice */}
            <h1 className="font-kufam text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-sand leading-[1.12]">
              {candidate.slogan[locale]}
            </h1>

            {/* Short Bio Paragraph */}
            <p className="text-lg sm:text-xl text-sand/85 max-w-2xl font-light leading-relaxed">
              {candidate.shortBio[locale]}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#support"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-wheat hover:bg-wheat/90 text-deep text-base font-semibold transition-all duration-200 shadow-elevated hover:shadow-2xl hover:scale-105 active:scale-95"
              >
                <span>{t('hero.supportCta')}</span>
                <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </a>

              <a
                href="#vision"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-sand text-base font-medium transition-all duration-200 backdrop-blur-sm"
              >
                <span>{t('hero.visionCta')}</span>
                <ArrowDown className="w-4 h-4 opacity-70" />
              </a>
            </div>

            {/* Institutional Guarantee Note */}
            <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-sand/70">
              <ShieldCheck className="w-4 h-4 text-green-brand flex-shrink-0" />
              <span>{candidate.party[locale]}</span>
            </div>
          </div>

          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/5] rounded-[2rem] p-2 bg-gradient-to-b from-white/20 via-white/5 to-transparent backdrop-blur-sm shadow-2xl">
              <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-deep border border-white/15">
                <Image
                  src="/images/hero-portrait.svg"
                  alt={`${candidate.name[locale]} - ${t('hero.altPortrait')}`}
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-transparent to-transparent pointer-events-none" />

                {/* Candidate Name Floating Tag */}
                <div className="absolute bottom-5 inset-x-5 p-3 rounded-xl bg-teal/90 backdrop-blur-md border border-white/15 text-start">
                  <div className="font-serif font-bold text-base sm:text-lg text-sand">
                    {candidate.name[locale]}
                  </div>
                  <div className="text-xs text-sand/70 truncate">
                    {candidate.role[locale]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
