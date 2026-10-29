'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Scroll-linked outgoing animation for the entire hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 1. Background oversized typography: expands slightly, glides down with depth, and fades out
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgTextScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // 2. Portrait: scales down, glides downwards, and fades out smoothly into the next section
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // 3. Foreground headline: glides upward and fades out
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 4. Mouse indicator & subtitle: fades out immediately upon scrolling
  const indicatorsOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] lg:h-screen lg:min-h-180 lg:max-h-262.5 bg-[radial-gradient(ellipse_950px_750px_at_50%_36%,#ffffff_0%,#f4f4f7_40%,#e8e8ed_75%,#dedee5_100%)] dark:bg-[radial-gradient(ellipse_950px_750px_at_50%_36%,#45454c_0%,#29292f_35%,#151518_68%,#08080a_90%,#000000_100%)] text-[#111114] dark:text-white flex flex-col justify-between items-center overflow-hidden pt-16 sm:pt-20 pb-6 select-none transition-colors duration-300"
    >
      {/* 1. Visible Faded Solid Background Typography Behind Portrait (Authoritative Figma Recreation) */}
      <motion.div
        style={{ y: bgTextY, scale: bgTextScale, opacity: bgTextOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span
          className="bg-hero-text text-[20vw] sm:text-[20vw] lg:text-[21vw] font-black tracking-[-0.035em] leading-[0.85] uppercase text-[#111114]/8 dark:text-white/16 whitespace-nowrap select-none translate-y-[-2%]"
          style={{
            fontFamily: "'Outfit', var(--font-heading), sans-serif",
          }}
        >
          MAHESH
        </span>
      </motion.div>

      {/* 2. Main Composition: Monochromatic Cutout Portrait + Centered Headline Overlay */}
      <div className="relative my-auto w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center z-10">
        
        {/* Cutout Portrait Container */}
        <div className="relative w-70 sm:w-100 md:w-120 lg:w-135 aspect-4/5 flex items-end justify-center">
          
          {/* Grayscale Portrait with Outgoing Scale & Fade */}
          <motion.div
            style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
            className="relative w-full h-full flex items-end justify-center z-10 origin-bottom"
          >
            <div
              className="relative w-full h-full flex items-end justify-center"
              style={{
                maskImage: 'linear-gradient(to bottom, black 72%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 98%)',
              }}
            >
              <Image
                src="/images/hero-portrait.png"
                alt="Mahesh P — Software Engineer"
                width={890}
                height={1024}
                priority
                className="w-full h-auto max-h-full object-contain object-bottom pointer-events-none filter grayscale contrast-108 brightness-96"
              />
            </div>
          </motion.div>

          {/* Centered Headline Overlay Placed Directly Across Lower Chest (Exact Figma Geometry) */}
          <motion.div
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="absolute inset-x-0 bottom-12 sm:bottom-28 md:bottom-32 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-2 sm:px-4"
          >
            <span
              className="text-base sm:text-2xl md:text-3xl font-medium text-[#111114] dark:text-white mb-1 sm:mb-2 drop-shadow-[0_2px_12px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Outfit', var(--font-heading), sans-serif" }}
            >
              Hello,
            </span>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-extrabold text-[#111114] dark:text-white tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.98)] dark:drop-shadow-[0_6px_32px_rgba(0,0,0,0.98)] whitespace-nowrap"
              style={{ fontFamily: "'Outfit', var(--font-heading), sans-serif" }}
            >
              I&apos;m Mahesh P
            </h1>
          </motion.div>
        </div>

      </div>

      {/* 3. Subtle Scroll Mouse Indicator & Subtitle */}
      <motion.div
        style={{ opacity: indicatorsOpacity }}
        className="relative z-20 flex flex-col items-center gap-3"
      >
        {/* Animated Mouse Icon */}
        <div className="w-5 h-8 rounded-full border border-neutral-400 dark:border-neutral-500/60 flex justify-center pt-1.5 opacity-80">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-black dark:bg-white"
          />
        </div>

        {/* Minimal Subtitle */}
        <div className="text-[10px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-400 tracking-wider uppercase text-center px-4 flex flex-wrap justify-center items-center gap-x-2 gap-y-0.5">
          <span>Software Engineer</span>
          <span className="text-neutral-400 dark:text-neutral-600 hidden sm:inline">•</span>
          <span>.NET Backend Developer</span>
          <span className="text-neutral-400 dark:text-neutral-400 hidden sm:inline">•</span>
          <span>Wrench Solutions</span>
        </div>
      </motion.div>
    </section>
  );
}
