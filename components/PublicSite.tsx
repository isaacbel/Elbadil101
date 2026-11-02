'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import SupportForm from '@/components/public/SupportForm';
import VisionSection from '@/components/public/VisionSection';
import BiographySection from '@/components/public/BiographySection';
import ActivitiesCarousel from '@/components/public/ActivitiesCarousel';
import AchievementsSection from '@/components/public/AchievementsSection';
import SubmissionForm from '@/components/public/SubmissionForm';
import FinalCTA from '@/components/public/FinalCTA';
import Footer from '@/components/public/Footer';

export default function PublicSite() {
  const { dir } = useI18n();

  return (
    <div className={`min-h-screen bg-sand text-ink font-sans selection:bg-teal selection:text-sand ${dir === 'rtl' ? 'font-naskh' : ''}`}>
      {/* 5.1 Navigation header */}
      <Navbar />

      <main>
        {/* 5.2 Hero (Dark: Deep/Teal) */}
        <Hero />

        {/* 5.3 Support registration form (Light: Sand) */}
        <SupportForm />

        {/* 5.4 Vision and priorities (Dark: Teal) */}
        <VisionSection />

        {/* 5.5 Biography and professional journey (Light: Sand) */}
        <BiographySection />

        {/* 5.6 Field activities (Dark: Teal) */}
        <ActivitiesCarousel />

        {/* 5.7 Impact / key achievements (Conditional) */}
        <AchievementsSection />

        {/* 5.8 Citizen submission form (Light: Sand) */}
        <SubmissionForm />

        {/* 5.9 Final call to action (Dark: Teal) */}
        <FinalCTA />
      </main>

      {/* 5.10 Footer (Deep) */}
      <Footer />
    </div>
  );
}
