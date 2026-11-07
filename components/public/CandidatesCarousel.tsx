'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { candidates, Candidate } from '@/data/candidates';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ArrowUpRight,
  User,
} from 'lucide-react';

export default function CandidatesCarousel() {
  const { locale, dir, t } = useI18n();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

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
      viewBio: 'عرض الملف الكامل',
      close: 'إغلاق',
      listNumber: 'الرقم في القائمة',
      education: 'المؤهل العلمي',
      experience: 'الخبرة الميدانية',
      focus: 'محور الاهتمام والالتزام',
      candidateLabel: 'المترشح رقم',
    },
    fr: {
      kicker: 'Liste Indépendante ALBADIL 101',
      title: 'Nos Candidats',
      subtitle: 'Des compétences et énergies citoyennes engagées au service du terrain et de nos communes.',
      viewBio: 'Voir le profil complet',
      close: 'Fermer',
      listNumber: 'N° sur la liste',
      education: 'Formation',
      experience: 'Expérience',
      focus: 'Priorité d’engagement',
      candidateLabel: 'Candidat N°',
    },
    en: {
      kicker: 'Independent List ALBADIL 101',
      title: 'Our Candidates',
      subtitle: 'Dedicated local professionals committed to grassroots accountability and public progress.',
      viewBio: 'View Full Profile',
      close: 'Close',
      listNumber: 'List Rank',
      education: 'Education',
      experience: 'Experience',
      focus: 'Core Focus',
      candidateLabel: 'Candidate #',
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
              onClick={() => setSelectedCandidate(c)}
              className="snap-start flex-shrink-0 w-[290px] sm:w-[330px] lg:w-[340px] bg-white rounded-3xl overflow-hidden border border-line shadow-card hover:shadow-editorial hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Photo with rank number badge */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-deep">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.name[locale] || c.name.ar}
                      fill
                      priority={idx < 3}
                      loading={idx >= 3 ? 'lazy' : undefined}
                      sizes="(max-width: 640px) 290px, (max-width: 1024px) 330px, 340px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-deep via-teal/80 to-deep text-sand">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-2">
                        <User className="w-10 h-10 text-wheat/80" />
                      </div>
                      <span className="font-kreon text-xl font-bold text-wheat">
                        #{c.number}
                      </span>
                    </div>
                  )}
                  {/* Rank Badge */}
                  <div className="absolute top-4 start-4 px-3 py-1.5 rounded-xl bg-deep/90 backdrop-blur-md border border-white/20 text-wheat shadow-md flex items-center gap-1.5">
                    <span className="text-[11px] font-medium text-sand/80">{cur.listNumber}</span>
                    <span className="font-kreon text-lg font-bold text-wheat">
                      #{c.number}
                    </span>
                  </div>

                  {/* Commune Tag */}
                  <div className="absolute bottom-3 end-3 px-2.5 py-1 rounded-lg bg-teal/85 backdrop-blur-md text-sand text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-wheat" />
                    <span>{c.commune[locale] || c.commune.ar}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 text-start space-y-3">
                  <h3 className="font-serif font-bold text-xl text-teal group-hover:text-teal-light transition-colors leading-snug">
                    {c.name[locale] || c.name.ar}
                  </h3>

                  {(c.profession[locale] || c.profession.ar) ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-green-brand flex-shrink-0" />
                      <span className="line-clamp-1">{c.profession[locale] || c.profession.ar}</span>
                    </div>
                  ) : null}

                  {(c.bio[locale] || c.bio.ar) ? (
                    <p className="text-ink/75 text-xs sm:text-sm leading-relaxed line-clamp-3 pt-1">
                      {c.bio[locale] || c.bio.ar}
                    </p>
                  ) : null}

                  {/* Optional Extra Highlights (shown only when provided) */}
                  {c.extraInfo?.focus && (
                    <div className="pt-2 text-[11px] text-teal/90 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-green-brand flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{c.extraInfo.focus[locale] || c.extraInfo.focus.ar}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 py-4 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-teal group-hover:text-teal-light">
                <span>{cur.viewBio}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-ink rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-line relative text-start max-h-[90vh] flex flex-col">
            <button
              type="button"
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 w-9 h-9 rounded-full bg-deep/70 text-sand flex items-center justify-center hover:bg-deep transition-colors"
              aria-label={cur.close}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Media Block */}
            <div className="relative aspect-[16/9] w-full bg-deep flex-shrink-0">
              {selectedCandidate.image ? (
                <Image
                  src={selectedCandidate.image}
                  alt={selectedCandidate.name[locale] || selectedCandidate.name.ar}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-deep via-teal/80 to-deep text-sand">
                  <User className="w-16 h-16 text-wheat/60" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/40 to-transparent flex items-end p-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-wheat text-deep text-xs font-bold font-kreon mb-2">
                    {cur.candidateLabel} {selectedCandidate.number}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sand">
                    {selectedCandidate.name[locale] || selectedCandidate.name.ar}
                  </h3>
                  <div className="text-sand/80 text-xs sm:text-sm mt-1 flex items-center gap-2">
                    {(selectedCandidate.profession[locale] || selectedCandidate.profession.ar) ? (
                      <>
                        <span>{selectedCandidate.profession[locale] || selectedCandidate.profession.ar}</span>
                        <span>•</span>
                      </>
                    ) : null}
                    <span>{selectedCandidate.commune[locale] || selectedCandidate.commune.ar}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-1">
              {/* Full Bio */}
              {(selectedCandidate.bio[locale] || selectedCandidate.bio.ar) ? (
                <div>
                  <h4 className="text-xs font-bold text-teal uppercase tracking-wider mb-2">
                    {locale === 'ar' ? 'نبذة عن المترشح' : 'Biographie'}
                  </h4>
                  <p className="text-ink/80 text-sm leading-relaxed">
                    {selectedCandidate.bio[locale] || selectedCandidate.bio.ar}
                  </p>
                </div>
              ) : null}

              {/* Extra Info Lines (Shown Only When Provided) */}
              {selectedCandidate.extraInfo && (
                <div className="space-y-3 pt-3 border-t border-line/60">
                  {selectedCandidate.extraInfo.education && (
                    <div className="flex items-start gap-2.5 text-xs">
                      <GraduationCap className="w-4 h-4 text-green-brand flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted block">{cur.education}:</span>
                        <span className="font-semibold text-ink">
                          {selectedCandidate.extraInfo.education[locale] || selectedCandidate.extraInfo.education.ar}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedCandidate.extraInfo.experience && (
                    <div className="flex items-start gap-2.5 text-xs">
                      <Award className="w-4 h-4 text-green-brand flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted block">{cur.experience}:</span>
                        <span className="font-semibold text-ink">
                          {selectedCandidate.extraInfo.experience[locale] || selectedCandidate.extraInfo.experience.ar}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedCandidate.extraInfo.focus && (
                    <div className="flex items-start gap-2.5 text-xs">
                      <Sparkles className="w-4 h-4 text-green-brand flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-muted block">{cur.focus}:</span>
                        <span className="font-semibold text-teal">
                          {selectedCandidate.extraInfo.focus[locale] || selectedCandidate.extraInfo.focus.ar}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Optional Social / Contact Links */}
              {selectedCandidate.social && (
                <div className="pt-3 border-t border-line/60 flex items-center gap-3">
                  {selectedCandidate.social.facebook && (
                    <a
                      href={selectedCandidate.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-sand/80 hover:bg-teal hover:text-sand text-ink flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {selectedCandidate.social.x && (
                    <a
                      href={selectedCandidate.social.x}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-sand/80 hover:bg-teal hover:text-sand text-ink flex items-center justify-center transition-colors"
                      aria-label="X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {selectedCandidate.social.linkedin && (
                    <a
                      href={selectedCandidate.social.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-sand/80 hover:bg-teal hover:text-sand text-ink flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {selectedCandidate.social.email && (
                    <a
                      href={`mailto:${selectedCandidate.social.email}`}
                      className="w-8 h-8 rounded-full bg-sand/80 hover:bg-teal hover:text-sand text-ink flex items-center justify-center transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}

              {/* Close Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="px-6 py-2.5 rounded-full bg-teal hover:bg-deep text-sand text-xs font-semibold"
                >
                  {cur.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
