'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

export default function BigPhotoSection() {
  const { locale } = useI18n();

  const altTexts = {
    ar: 'صورة ميدانية للعمل التواصلي والجماهيري — القائمة الحرّة البديل 101',
    fr: 'Photographie de terrain et engagement de proximité — ALBADIL 101',
    en: 'Field engagement and community outreach — ALBADIL 101',
  };

  return (
    <section className="py-12 lg:py-16 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] rounded-3xl overflow-hidden shadow-editorial border border-line bg-deep">
          <Image
            src="/images/terrain-communication.jpeg"
            alt={altTexts[locale] || altTexts.ar}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
