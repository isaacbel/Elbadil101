'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { verifiedAchievements } from '@/data/content';

export default function AchievementsSection() {
  const { locale } = useI18n();

  // Condition 5.7: Show only if verified figures supplied. Otherwise omit cleanly with NO empty block.
  if (!verifiedAchievements || verifiedAchievements.length === 0) {
    return null;
  }

  return (
    <section id="achievements" className="py-16 bg-deep text-sand border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {verifiedAchievements.map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="font-kreon text-4xl sm:text-5xl font-bold text-wheat">
                {item.stat}
              </div>
              <div className="text-sm sm:text-base font-semibold text-sand/90">
                {item.label[locale]}
              </div>
              {item.detail && (
                <div className="text-xs text-sand/60">
                  {item.detail[locale]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
