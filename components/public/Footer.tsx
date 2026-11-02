'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { candidate } from '@/data/content';
import Logo from '@/components/shared/Logo';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Lock } from 'lucide-react';

export default function Footer() {
  const { locale, t } = useI18n();

  return (
    <footer className="bg-deep text-sand/90 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10 text-start">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo layout="horizontal" colourway="reversed" width={160} height={44} />
            </div>
            <p className="text-sm text-sand/70 leading-relaxed max-w-sm">
              {candidate.shortBio[locale]}
            </p>
            <div className="text-xs text-sand/60">
              {candidate.role[locale]} · {candidate.place[locale]}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={candidate.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-sand flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={candidate.social.x}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-sand flex items-center justify-center transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={candidate.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-sand flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={candidate.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-sand flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-sand">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm text-sand/75">
              <li>
                <a href="#home" className="hover:text-sand transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#vision" className="hover:text-sand transition-colors">
                  {t('nav.vision')}
                </a>
              </li>
              <li>
                <a href="#bio" className="hover:text-sand transition-colors">
                  {t('nav.bio')}
                </a>
              </li>
              <li>
                <a href="#activities" className="hover:text-sand transition-colors">
                  {t('nav.activities')}
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-sand transition-colors">
                  {t('nav.support')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-sand transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-base text-sand">
              {t('footer.contactTitle')}
            </h4>
            <ul className="space-y-3 text-sm text-sand/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-brand mt-1 flex-shrink-0" />
                <span>{candidate.contact.officeAddress[locale]}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-brand flex-shrink-0" />
                <span dir="ltr">{candidate.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-brand flex-shrink-0" />
                <a href={`mailto:${candidate.contact.email}`} className="hover:text-sand transition-colors" dir="ltr">
                  {candidate.contact.email}
                </a>
              </li>
            </ul>
            <div className="text-xs text-sand/50 pt-1">
              {candidate.contact.hours[locale]}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links & Admin Login */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60">
          <div>
            {t('footer.copyright')}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="/privacy" className="hover:text-sand transition-colors">
              {t('footer.privacy')}
            </a>
            <span>•</span>
            <a href="/legal" className="hover:text-sand transition-colors">
              {t('footer.legal')}
            </a>
            <span>•</span>
            <a
              href="/admin/login"
              className="inline-flex items-center gap-1 text-wheat hover:text-wheat/80 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>{t('footer.adminLogin')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
