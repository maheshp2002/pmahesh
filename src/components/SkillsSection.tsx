'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

function SkillCategoryRow({
  category,
  shouldReduceMotion,
}: {
  category: typeof SKILL_CATEGORIES[0];
  shouldReduceMotion: boolean | null;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 92%', 'start 68%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <motion.div
      ref={rowRef}
      style={shouldReduceMotion ? undefined : { opacity, y }}
      className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-all duration-300"
    >
      {/* Category Heading (Col 1-4): Smooth color illumination on row hover without layout shift */}
      <div className="md:col-span-4">
        <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white tracking-tight transition-colors duration-300 inline-block">
          {category.title}
        </h3>
      </div>

      {/* Text-Based Skills List: Stable spacing with refined subtle pill highlight on hover */}
      <div className="md:col-span-8">
        <div className="flex flex-wrap items-center gap-y-2.5 text-sm sm:text-base gap-x-2 sm:gap-x-3">
          {category.skills.map((skill, sIdx) => (
            <React.Fragment key={skill}>
              <span
                className="font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all duration-200 inline-block select-none px-2.5 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 border border-transparent hover:border-black/5 dark:hover:border-white/10"
              >
                {skill}
              </span>
              {sIdx < category.skills.length - 1 && (
                <span
                  className="text-neutral-300 dark:text-neutral-700 select-none px-0.5 group-hover:text-neutral-400 dark:group-hover:text-neutral-600 transition-colors duration-300"
                  aria-hidden="true"
                >
                  •
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92%', 'start 65%'],
  });

  const headerOpacity = useTransform(sectionProgress, [0, 1], [0, 1]);
  const headerY = useTransform(sectionProgress, [0, 1], [24, 0]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#F8F8FA] dark:bg-black py-24 sm:py-36 text-[#111114] dark:text-white overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header: Minimal, Editorial, Spacious */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: headerOpacity, y: headerY }}
          className="mb-16 sm:mb-20 max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#111114] dark:text-white tracking-tight">
            Technical Skills
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-normal leading-relaxed">
            Core technologies, database architectures, and engineering practices applied across enterprise production systems.
          </p>
        </motion.div>

        {/* Clean Typographic Skills Layout: Grouped lists with subtle dividers */}
        <div className="border-t border-black/10 dark:border-white/10 divide-y divide-black/10 dark:divide-white/10">
          {SKILL_CATEGORIES.map((category) => (
            <SkillCategoryRow
              key={category.title}
              category={category}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
