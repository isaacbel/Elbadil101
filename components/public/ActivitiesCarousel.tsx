'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { activities, Activity } from '@/data/content';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import ActivityDetailModal, { renderTextWithHashtags } from './ActivityDetailModal';

export default function ActivitiesCarousel() {
  const { locale, dir, t } = useI18n();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const scrollAmount = 380;
    // In RTL, standard left scroll sign is inverted
    const sign = dir === 'rtl' ? (direction === 'next' ? -1 : 1) : direction === 'next' ? 1 : -1;
    carouselRef.current.scrollBy({ left: scrollAmount * sign, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = 360 + 24;
    const scrollPos = Math.abs(container.scrollLeft);
    const index = Math.round(scrollPos / cardWidth);
    setActiveIndex(Math.min(Math.max(index, 0), activities.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 360 + 24;
    const sign = dir === 'rtl' ? -1 : 1;
    carouselRef.current.scrollTo({
      left: index * cardWidth * sign,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  return (
    <section id="activities" className="py-20 lg:py-28 bg-teal text-sand scroll-mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-start">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-wheat font-semibold text-xs tracking-wider uppercase mb-3">
              {t('activities.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sand leading-tight mb-4">
              {t('activities.title')}
            </h2>
            <p className="text-sand/80 text-base sm:text-lg">
              {t('activities.subtitle')}
            </p>
          </div>

          {/* Carousel Arrows (mirrored in RTL) */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => scroll('prev')}
              className="w-12 h-12 rounded-full border border-white/20 bg-deep/60 text-sand hover:bg-wheat hover:text-deep transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95"
              aria-label={t('activities.prev')}
            >
              {dir === 'rtl' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => scroll('next')}
              className="w-12 h-12 rounded-full border border-white/20 bg-deep/60 text-sand hover:bg-wheat hover:text-deep transition-all duration-200 flex items-center justify-center shadow-sm active:scale-95"
              aria-label={t('activities.next')}
            >
              {dir === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Activities Carousel"
        >
          {activities.map((act, index) => {
            const imageIndex = (index % 5) + 1;
            const isLong = act.description[locale].includes('\n') || act.description[locale].length > 160;
            const isExpanded = !!expandedCards[act.id];

            return (
              <div
                key={act.id}
                onClick={(e) => {
                  setTriggerElement(e.currentTarget);
                  setSelectedActivity(act);
                }}
                className="snap-start flex-shrink-0 w-[300px] sm:w-[360px] bg-deep/90 rounded-2xl overflow-hidden border border-white/15 shadow-card hover:shadow-editorial hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Image with zoom effect */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-teal/30">
                    <Image
                      src={act.image || `/images/activity-${imageIndex}.svg`}
                      alt={(act.imageAlt && act.imageAlt[locale]) || act.title[locale]}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1 rounded-full bg-deep/80 backdrop-blur-md text-sand text-xs font-semibold">
                      {act.category[locale]}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-start space-y-3">
                    <div className="flex items-center justify-between text-xs text-sand/65">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-wheat" />
                        <span className="font-kreon">{act.year}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-wheat" />
                        {act.location[locale]}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-sand group-hover:text-wheat transition-colors leading-snug line-clamp-2">
                      {act.title[locale]}
                    </h3>

                    <div>
                      <p
                        className={`text-sand/75 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                          isExpanded ? '' : 'line-clamp-3'
                        }`}
                      >
                        {renderTextWithHashtags(act.description[locale], 'text-wheat font-semibold')}
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCards((prev) => ({
                              ...prev,
                              [act.id]: !prev[act.id],
                            }));
                          }}
                          className="mt-2 text-xs font-semibold text-wheat hover:text-sand hover:underline inline-flex items-center gap-1 focus:outline-none"
                        >
                          {isExpanded ? t('activities.showLess') : t('activities.readMore')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer action */}
                <div className="px-6 pb-6 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-wheat group-hover:text-sand">
                  <span>{t('activities.viewDetails')}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-4" role="tablist" aria-label="Carousel pagination">
          {activities.map((act, idx) => (
            <button
              key={act.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-8 bg-wheat' : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ActivityDetailModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
        triggerElement={triggerElement}
        fallbackImageIndex={selectedActivity ? (activities.indexOf(selectedActivity) % 5) + 1 : 1}
      />
    </section>
  );
}
