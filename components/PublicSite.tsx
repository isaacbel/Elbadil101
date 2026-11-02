'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import SubmissionForm from '@/components/public/SubmissionForm';
import VisionSection from '@/components/public/VisionSection';
import BigPhotoSection from '@/components/public/BigPhotoSection';
import ActivitiesCarousel from '@/components/public/ActivitiesCarousel';
import CandidatesCarousel from '@/components/public/CandidatesCarousel';
import AchievementsSection from '@/components/public/AchievementsSection';
import FinalCTA from '@/components/public/FinalCTA';
import Footer from '@/components/public/Footer';

export default function PublicSite() {
  const { dir } = useI18n();

  return (
    <div className={`min-h-screen bg-sand text-ink font-sans selection:bg-teal selection:text-sand ${dir === 'rtl' ? 'font-naskh' : ''}`}>
      {/* Navigation header */}
      <Navbar />

      <main>
        {/* 1. Hero (Dark: Deep/Teal, spacious layout without portrait) */}
        <Hero />

        {/* 2. Direct Citizen Contact Form (Light: Sand - replaces old support section) */}
        <SubmissionForm />

        {/* 3. Vision & Priorities (Dark: Teal) */}
        <VisionSection />

        {/* 4. Large Field Photography Block (Light: Sand background) */}
        <BigPhotoSection />

        {/* 5. Field Activities Carousel (Dark: Teal) */}
        <ActivitiesCarousel />

        {/* 6. Candidates Carousel (Light: Sand) */}
        <CandidatesCarousel />

        {/* 7. Key Impact / Milestones (Conditional on verified data) */}
        <AchievementsSection />

        {/* 8. Final Call to Action (Dark: Teal) */}
        <FinalCTA />
      </main>

      {/* 9. Institutional Footer (Deep) */}
      <Footer />
    </div>
  );
}
