'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeRibbon from '@/components/MarqueeRibbon';
import About from '@/components/About';
import RecentProjects from '@/components/RecentProjects';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ContactFooter from '@/components/ContactFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F8FA] dark:bg-black text-[#111114] dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col transition-colors duration-300">
      {/* 1. Minimal Header */}
      <Navbar />

      {/* 2. Hero Section (Noah William Composition) */}
      <Hero />

      {/* 3. Giant Outline Text Marquee Ticker */}
      <MarqueeRibbon />

      {/* 4. About Me with Hand-Drawn Accents */}
      <About />

      {/* 5. Recent Projects (The High-Contrast Light Section) */}
      <RecentProjects />

      {/* 6. Work Experience (3 Dark Cards with Quotes & Dots) */}
      <ExperienceSection />

      {/* 7. Skills & Technical Expertise */}
      <SkillsSection />

      {/* 8. Contact & Minimal Footer */}
      <ContactFooter />
    </main>
  );
}
