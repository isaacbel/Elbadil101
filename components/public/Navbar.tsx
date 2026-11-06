'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { verifiedAchievements } from '@/data/content';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Logo from '@/components/shared/Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const { locale, dir, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'contact', 'vision', 'activities', 'candidates'];
      if (verifiedAchievements && verifiedAchievements.length > 0) sections.push('achievements');

      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLabels = {
    ar: {
      contactCta: 'تواصل معنا',
      candidates: 'مترشحونا',
      contactLink: 'تواصل معنا',
      about: 'من نحن؟',
    },
    fr: {
      contactCta: 'Contactez-nous',
      candidates: 'Nos candidats',
      contactLink: 'Contactez-nous',
      about: 'Qui sommes-nous ?',
    },
    en: {
      contactCta: 'Contact Us',
      candidates: 'Our Candidates',
      contactLink: 'Contact Us',
      about: 'About Us',
    },
  };

  const loc = navLabels[locale] || navLabels.ar;

  const navLinks = [
    { href: '#home', label: t('nav.home'), id: 'home' },
    { href: '#about', label: loc.about, id: 'about' },
    { href: '#contact', label: loc.contactLink, id: 'contact' },
    { href: '#vision', label: t('nav.vision'), id: 'vision' },
    { href: '#activities', label: t('nav.activities'), id: 'activities' },
    { href: '#candidates', label: loc.candidates, id: 'candidates' },
    ...(verifiedAchievements && verifiedAchievements.length > 0
      ? [{ href: '#achievements', label: t('nav.achievements'), id: 'achievements' }]
      : []),
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-teal/95 backdrop-blur-md shadow-editorial py-3 border-b border-white/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-wheat rounded-lg p-1"
          >
            <Logo layout="horizontal" colourway="reversed" width={160} height={44} priority />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-sand/90">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 relative hover:text-sand ${
                    isActive ? 'text-sand font-semibold' : 'text-sand/80'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-wheat rounded-full animate-fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-wheat hover:bg-wheat/90 text-deep text-xs font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <span>{loc.contactCta}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-[-90deg]' : ''}`} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-sand hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-wheat"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-deep/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-white/15 text-sand font-semibold'
                    : 'text-sand/80 hover:bg-white/10 hover:text-sand'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-wheat text-deep font-semibold text-sm shadow-md"
            >
              <span>{loc.contactCta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
