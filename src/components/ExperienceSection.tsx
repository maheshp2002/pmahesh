'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES } from '@/data/portfolioData';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-[#F8F8FA] dark:bg-black py-24 sm:py-36 text-[#111114] dark:text-white overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header: Minimal, Typographic, Clear */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-20 max-w-3xl"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#111114] dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-3 font-normal leading-relaxed">
            Professional career progression across enterprise product software and backend systems.
          </p>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Single continuous timeline spine: runs from the top work experience through all items, fading out only as it reaches past the bottom */}
          <div
            className="hidden sm:block absolute top-3 -bottom-8 w-[1.5px] bg-linear-to-b from-black/45 dark:from-white/55 via-black/25 dark:via-white/30 to-transparent left-68 md:left-76 -translate-x-1/2 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, idx) => {
              const isCurrent = exp.current;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-8 relative"
                >
                  {/* Left Column: Dates, Company, Location with subtle hover highlight */}
                  <div className="sm:w-56 md:w-64 shrink-0 sm:text-right space-y-1.5 pt-1 transition-transform duration-300 group-hover:-translate-x-0.5">
                    <div className="text-xs font-mono font-semibold tracking-wider text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                      {exp.period}
                    </div>

                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-base sm:text-lg font-heading font-bold text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors group/link"
                      >
                        <span>{exp.company}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <div className="text-base sm:text-lg font-heading font-bold text-black dark:text-white">
                        {exp.company}
                      </div>
                    )}

                    <div className="text-xs font-mono text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors duration-300">
                      {exp.location}
                    </div>

                    {isCurrent && (
                      <div className="pt-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                        Current Role
                      </div>
                    )}
                  </div>

                  {/* Center Spine Node: sits cleanly atop the continuous vertical line and reacts interactively to hover */}
                  <div className="hidden sm:flex flex-col items-center shrink-0 w-8 self-stretch relative z-10">
                    {/* The Dot Node: Recent work has dot + outline circle after small padding; Old works have hollow rounded outline only */}
                    {isCurrent ? (
                      <div className="w-5 h-5 rounded-full border border-black/80 dark:border-white/80 bg-[#F8F8FA] dark:bg-black p-0.5 flex items-center justify-center mt-1 group-hover:scale-130 group-hover:border-black dark:group-hover:border-white group-hover:shadow-[0_0_12px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] transition-all duration-300 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-black dark:bg-white group-hover:scale-115 transition-transform duration-300" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-black/40 dark:border-white/40 bg-[#F8F8FA] dark:bg-black mt-1.5 group-hover:scale-140 group-hover:border-black dark:group-hover:border-white group-hover:shadow-[0_0_10px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300" />
                    )}
                  </div>

                  {/* Right Column: Experience Details Card with interactive micro-lift, border brightening, and bullet hover */}
                  <div className="flex-1 w-full">
                    <div
                      data-interactive
                      className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#0D0D0F] border border-black/10 dark:border-white/10 group-hover:border-black/25 dark:group-hover:border-white/25 group-hover:-translate-y-1 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] dark:group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
                    >
                      {/* Role Header */}
                      <div className="pb-3 border-b border-black/5 dark:border-white/5 flex items-start justify-between">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-heading font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform duration-300">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-mono text-neutral-500 mt-1 inline-block">
                            {exp.type}
                          </span>
                        </div>
                        {exp.companyUrl && (
                          <span className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors p-1">
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </span>
                        )}
                      </div>

                      {/* Role Summary */}
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed font-normal mt-4">
                        {exp.description}
                      </p>

                      {/* Key Responsibilities with individual bullet hover effects */}
                      {exp.keyContributions && exp.keyContributions.length > 0 && (
                        <div className="mt-5 space-y-2">
                          <ul className="space-y-2.5">
                            {exp.keyContributions.map((item, cIdx) => (
                              <li
                                key={cIdx}
                                className="group/item text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white leading-relaxed flex items-start gap-2.5 transition-all duration-200 hover:translate-x-1"
                              >
                                <span className="text-neutral-400 group-hover/item:text-black dark:group-hover/item:text-white font-bold shrink-0 mt-0.5 transition-colors">
                                  •
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
