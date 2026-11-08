'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { Activity } from '@/data/content';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

interface ActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity | null;
  triggerElement?: HTMLElement | null;
  fallbackImageIndex?: number;
}

export function renderTextWithHashtags(text: string, hashtagClass = 'text-teal font-semibold') {
  const parts = text.split(/(#[\p{L}\p{N}_]+)/u);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      return (
        <span key={index} className={hashtagClass}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function ActivityDetailModal({
  isOpen,
  onClose,
  activity,
  triggerElement,
  fallbackImageIndex = 1,
}: ActivityDetailModalProps) {
  const { locale, dir, t } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // SSR portal mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image slider index when activity changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activity]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  // Focus trap, Escape key, and restore focus on close
  useEffect(() => {
    if (!isOpen) return;

    // Focus the initial close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [isOpen, onClose, triggerElement]);

  if (!mounted || !isOpen || !activity) return null;

  // Resolve list of images
  const imageList: string[] =
    activity.images && activity.images.length > 0
      ? activity.images
      : activity.image
      ? [activity.image]
      : [`/images/activity-${fallbackImageIndex}.svg`];

  const hasMultipleImages = imageList.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const formattedDate =
    activity.year === '2026'
      ? locale === 'ar'
        ? 'نوفمبر 2026'
        : locale === 'fr'
        ? 'Novembre 2026'
        : 'November 2026'
      : activity.year;

  const listBranding =
    locale === 'fr'
      ? '« Liste Libre Al-Badil N° 101 » 🌿'
      : locale === 'en'
      ? '« Free List Al-Badil No. 101 » 🌿'
      : '«القائمة الحرة البديل رقم 101» 🌿';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4 md:p-6 transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="activity-modal-title"
        className="relative w-full max-w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-elevated overflow-hidden flex flex-col text-start animate-modal-in"
      >
        {/* Top Fixed Image Area with Gradient & Slider */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex-shrink-0 bg-deep/90 select-none overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={imageList[currentImageIndex]}
            alt={(activity.imageAlt && activity.imageAlt[locale]) || activity.title[locale]}
            fill
            priority
            className="object-cover"
          />

          {/* Subtle gradient at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

          {/* Close button: round X button fixed at top corner (top-left in RTL) */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 left-4 rtl:left-4 rtl:right-auto ltr:right-4 ltr:left-auto z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-wheat/70 active:scale-95"
            aria-label={t('activities.close', 'إغلاق')}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Multiple images controls */}
          {hasMultipleImages && (
            <>
              {/* Previous button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous image"
              >
                {dir === 'rtl' ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>

              {/* Next button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Next image"
              >
                {dir === 'rtl' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>

              {/* Image counter (1/3) */}
              <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-kreon font-medium z-20">
                {currentImageIndex + 1}/{imageList.length}
              </div>

              {/* Slider Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                {imageList.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-start">
          {/* Date & Location Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 font-medium text-teal">
              <MapPin className="w-4 h-4 text-green-brand" />
              <span>{activity.location[locale]}</span>
            </span>
            <span className="text-line">•</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-amber-brand" />
              <span className="font-kreon">{formattedDate}</span>
            </span>
            {activity.category && (
              <>
                <span className="text-line">•</span>
                <span className="px-2.5 py-0.5 rounded-full bg-sand text-deep font-semibold text-xs">
                  {activity.category[locale]}
                </span>
              </>
            )}
          </div>

          {/* Title in Kufam, bold, in brand color */}
          <h3
            id="activity-modal-title"
            className="font-kufam font-bold text-xl sm:text-2xl md:text-3xl text-teal leading-snug"
          >
            {activity.title[locale]}
          </h3>

          {/* Full description in Noto Naskh Arabic, text-base md:text-lg, leading-loose */}
          <div className="pt-2 text-ink font-naskh text-base md:text-lg leading-loose whitespace-pre-line text-start">
            {renderTextWithHashtags(activity.description[locale], 'text-teal font-semibold')}
          </div>
        </div>

        {/* Footer with list name and number in brand style */}
        <div className="flex-shrink-0 border-t border-line/60 bg-sand/30 px-6 py-3.5 sm:px-8 sm:py-4 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-deep font-bold font-kufam">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-brand shadow-sm" />
            <span>{listBranding}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-teal hover:bg-teal-light text-sand text-xs sm:text-sm font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-teal/40"
          >
            {t('activities.close', 'إغلاق')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

