'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function MarqueeRibbon() {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ribbonRef,
    offset: ['start end', 'center 75%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);

  const items = [
    'SOFTWARE ENGINEER',
    '.NET BACKEND DEVELOPER',
    'ADO.NET & SQL QUERY TUNING',
    'ENGINEERING & CONSTRUCTION DOMAIN',
    'CIRCULARO & VSIGN INTEGRATIONS',
    'CLEAN ARCHITECTURE & CQRS',
    'HIGH-THROUGHPUT SYSTEMS'
  ];

  return (
    <motion.div
      ref={ribbonRef}
      id="marquee-ribbon"
      style={shouldReduceMotion ? undefined : { opacity, scale }}
      className="relative w-full overflow-hidden bg-[#F2F2F5] dark:bg-black py-4 sm:py-6 border-y border-black/8 dark:border-white/8 select-none transition-colors duration-300"
    >
      <div className="animate-figma-marquee flex items-center whitespace-nowrap gap-12 sm:gap-16">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-12 sm:gap-16">
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-outline uppercase tracking-tight">
              {text}
            </span>
            <span className="text-2xl sm:text-4xl text-neutral-300 dark:text-neutral-700 font-bold font-heading">
              —
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
