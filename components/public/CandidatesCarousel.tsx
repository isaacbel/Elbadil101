'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { candidates } from '@/data/candidates';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

export default function CandidatesCarousel() {
  const { locale, dir, t } = useI18n();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const scrollAmount = 360;
    const sign = dir === 'rtl' ? (direction === 'next' ? -1 : 1) : direction === 'next' ? 1 : -1;
    carouselRef.current.scrollBy({ left: scrollAmount * sign, behavior: 'smooth' });
  };

  const titles = {
    ar: {
      kicker: 'القائمة الحرّة البديل 101',
      title: 'مترشحونا',
      subtitle: 'كفاءات وطاقات محلية ملتزمة بالعمل الميداني والتمثيل الصادق لطموحات ساكنة الطاهير وجيجل.',
    },
    fr: {
      kicker: 'Liste Indépendante ALBADIL 101',
      title: 'Nos Candidats',
      subtitle: 'Des compétences et énergies citoyennes engagées au service du terrain et de nos communes.',
    },
    en: {
      kicker: 'Independent List ALBADIL 101',
      title: 'Our Candidates',
      subtitle: 'Dedicated local professionals committed to grassroots accountability and public progress.',
    },
  };

  const cur = titles[locale] || titles.ar;

  return (
    <section id="candidates" className="py-20 lg:py-28 bg-sand text-ink scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-start">
            <span className="font-kufam inline-block px-3.5 py-1 rounded-full bg-teal/10 text-teal font-semibold text-xs tracking-wider uppercase mb-3">
              {cur.kicker}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-teal leading-tight mb-4">
              {cur.title}
            </h2>
            <p className="text-muted text-base sm:text-lg">
              {cur.subtitle}
            </p>
          </div>

          {/* Carousel Arrows (mirrored in RTL) */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => scroll('prev')}
              className="w-12 h-12 rounded-full border border-line bg-white text-ink hover:bg-teal hover:text-sand transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95"
              aria-label={t('activities.prev')}
            >
              {dir === 'rtl' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              className="w-12 h-12 rounded-full border border-line bg-white text-ink hover:bg-teal hover:text-sand transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95"
              aria-label={t('activities.next')}
            >
              {dir === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Candidates Carousel"
        >
          {candidates.map((c, idx) => (
            <div
              key={c.id}
              className="snap-start flex-shrink-0 w-[290px] sm:w-[330px] lg:w-[340px] rounded-3xl overflow-hidden shadow-card"
            >
              {c.image ? (
                <Image
                  src={c.image}
                  alt={c.name[locale] || c.name.ar}
                  width={1080}
                  height={1350}
                  priority={idx < 3}
                  loading={idx >= 3 ? 'lazy' : undefined}
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 330px, 340px"
                  className="w-full h-auto block"
                  style={{ display: 'block' }}
                />
              ) : (
                <div className="w-full aspect-[4/5] flex flex-col items-center justify-center bg-gradient-to-br from-deep via-teal/80 to-deep text-sand">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-2">
                    <User className="w-10 h-10 text-wheat/80" />
                  </div>
                  <span className="font-kreon text-xl font-bold text-wheat">
                    #{c.number}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
