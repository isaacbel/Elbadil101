'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { candidate, timelineMilestones } from '@/data/content';
import { Calendar, Quote } from 'lucide-react';

export default function BiographySection() {
  const { locale, dir, t } = useI18n();

  return (
    <section id="bio" className="py-20 lg:py-28 bg-sand text-ink scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Section: Portrait/Photo + Bio & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Portrait / Professional Photo Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-editorial border border-line bg-white p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-teal/10">
                <Image
                  src="/images/bio-photo.svg"
                  alt="Candidate Biography & Professional Practice"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-2xl bg-white border border-line shadow-card text-start relative">
              <Quote className="w-8 h-8 text-teal/20 mb-2" />
              <p className="font-serif italic text-base sm:text-lg text-teal leading-relaxed">
                « {candidate.slogan[locale]} »
              </p>
              <div className="mt-3 text-xs font-semibold text-muted uppercase tracking-wider">
                — {candidate.name[locale]}
              </div>
            </div>
          </div>

          {/* Column 2: Detailed Bio Text & Vertical Timeline */}
          <div className="lg:col-span-7 space-y-10 text-start">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase">
                {t('bio.eyebrow')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-teal leading-tight">
                {t('bio.title')}
              </h2>
              <p className="text-ink/80 text-base sm:text-lg leading-relaxed pt-2">
                {candidate.fullBio[locale]}
              </p>
            </div>

            {/* Vertical Visually Connected Timeline */}
            <div className="pt-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-teal mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-brand" />
                <span>{t('bio.timelineTitle')}</span>
              </h3>

              <div
                className={`relative space-y-8 ${
                  dir === 'rtl'
                    ? 'border-r-2 border-teal/20 pr-6 mr-3'
                    : 'border-l-2 border-teal/20 pl-6 ml-3'
                }`}
              >
                {timelineMilestones.map((milestone) => (
                  <div key={milestone.year} className="relative group">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute top-1.5 w-3.5 h-3.5 rounded-full bg-green-brand border-4 border-white shadow group-hover:scale-125 transition-transform ${
                        dir === 'rtl' ? '-right-[31px]' : '-left-[31px]'
                      }`}
                    />

                    {/* Timeline Content */}
                    <div className="bg-white p-5 rounded-xl border border-line shadow-sm hover:shadow-card transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-kreon font-bold text-lg text-teal">
                          {milestone.year}
                        </span>
                        {milestone.tag && (
                          <span className="px-2.5 py-0.5 rounded-full bg-teal/10 text-teal text-[11px] font-semibold">
                            {milestone.tag[locale]}
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-base text-teal mb-2">
                        {milestone.title[locale]}
                      </h4>
                      <p className="text-ink/75 text-sm leading-relaxed">
                        {milestone.description[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Field-Work Photo Banner with Short Caption (Section 5.5) */}
        <div className="mt-16 lg:mt-24">
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-3xl overflow-hidden shadow-editorial border border-line bg-deep">
            <Image
              src="/images/banner-field.svg"
              alt={t('bio.bannerCaption')}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent flex items-end p-6 sm:p-10">
              <div className="max-w-2xl text-start">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sand font-semibold text-xs mb-2">
                  {candidate.place[locale]}
                </span>
                <p className="font-serif text-lg sm:text-2xl font-bold text-sand leading-snug">
                  {t('bio.bannerCaption')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
