'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative bg-[#F8F8FA] dark:bg-black py-24 sm:py-36 text-[#111114] dark:text-white overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header: Minimal, Editorial, Spacious */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6 }}
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
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="group py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-all duration-300"
            >
              {/* Category Heading (Col 1-4): Smoothly enlarges when hovering the row or any skill */}
              <div className="md:col-span-4">
                <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white tracking-tight transition-all duration-300 transform group-hover:scale-108 origin-left inline-block">
                  {category.title}
                </h3>
              </div>

              {/* Text-Based Skills List: Spreads gap apart on hover, and enlarges individual hovered skill */}
              <div className="md:col-span-8">
                <div className="flex flex-wrap items-center gap-y-2.5 text-sm sm:text-base gap-x-2 sm:gap-x-3 group-hover:gap-x-4.5 sm:group-hover:gap-x-6 transition-all duration-300 ease-out">
                  {category.skills.map((skill, sIdx) => (
                    <React.Fragment key={skill}>
                      <span
                        data-interactive
                        className="font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 hover:text-black! dark:hover:text-white! transition-all duration-200 inline-block transform hover:scale-120 hover:-translate-y-1 cursor-pointer select-none px-2.5 py-1 -mx-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 origin-center"
                      >
                        {skill}
                      </span>
                      {sIdx < category.skills.length - 1 && (
                        <span
                          className="text-neutral-300 dark:text-neutral-700 select-none px-0.5 group-hover:text-neutral-400 dark:group-hover:text-neutral-500 transition-colors duration-300"
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
          ))}
        </div>

      </div>
    </section>
  );
}
