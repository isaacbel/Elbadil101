'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import AboutSection from '@/components/public/AboutSection';
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
        {/* 1. Hero */}
        <Hero />

        {/* 2. About section - من نحن؟ */}
        <AboutSection />

        {/* 3. Direct Citizen Contact Form */}
        <SubmissionForm />

        {/* 4. Vision & Priorities */}
        <VisionSection />

        {/* 5. Large Field Photography Block */}
        <BigPhotoSection />

        {/* 6. Field Activities Carousel */}
        <ActivitiesCarousel />

        {/* 7. Candidates Carousel */}
        <CandidatesCarousel />

        {/* 8. Key Impact / Milestones (Conditional) */}
        <AchievementsSection />

        {/* 9. Final Call to Action */}
        <FinalCTA />
      </main>

      {/* 10. Institutional Footer */}
      <Footer />
    </div>
  );
}
