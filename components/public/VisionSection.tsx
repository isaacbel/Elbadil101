'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { visionPriorities } from '@/data/content';
import { ShieldCheck, Building2, GraduationCap, Eye, CheckCircle } from 'lucide-react';

const iconMap = {
  ShieldCheck,
  Building2,
  GraduationCap,
  Eye,
};

export default function VisionSection() {
  const { locale, t } = useI18n();

  return (
    <section id="vision" className="py-20 lg:py-28 bg-teal text-sand scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-start">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-wheat font-semibold text-xs tracking-wider uppercase mb-3">
            {t('vision.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sand leading-tight mb-4">
            {t('vision.title')}
          </h2>
          <p className="text-sand/80 text-base sm:text-lg leading-relaxed">
            {t('vision.subtitle')}
          </p>
        </div>

        {/* 4 Priorities Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {visionPriorities.map((item, index) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={item.id}
                className="group relative bg-deep/90 rounded-2xl p-7 border border-white/15 shadow-card hover:shadow-editorial hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Priority Counter & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-wheat group-hover:bg-wheat group-hover:text-deep transition-colors duration-300 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-kreon text-2xl font-bold text-wheat/40 group-hover:text-wheat/70 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-sand mb-3 leading-snug">
                    {item.title[locale]}
                  </h3>

                  {/* Description */}
                  <p className="text-sand/75 text-sm leading-relaxed mb-6">
                    {item.description[locale]}
                  </p>
                </div>

                {/* Key Bullet Points */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {item.points[locale].map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-sand/85 leading-normal">
                      <CheckCircle className="w-3.5 h-3.5 text-wheat flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
