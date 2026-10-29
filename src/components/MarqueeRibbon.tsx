'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MarqueeRibbon() {
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
      id="marquee-ribbon"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
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
