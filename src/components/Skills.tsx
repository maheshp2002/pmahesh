'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Network, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES } from '@/data/portfolioData';

export default function Skills() {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 1:
        return <Database className="w-5 h-5 text-sky-400" />;
      case 2:
        return <Network className="w-5 h-5 text-sky-400" />;
      default:
        return <Wrench className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-[#08090C] border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Skills & Engineering Expertise
            </h2>
            <p className="text-neutral-400 text-base mt-2 max-w-xl">
              Categorized breakdown of backend architecture, database performance, external integrations, and development practices.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 px-4 py-2 rounded-full bg-white/2 border border-white/6">
            <span>Primary Focus: .NET & SQL Performance</span>
          </div>
        </div>

        {/* Bento Grid Layout (Inspired by Figma Reference 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-white/8 hover:border-sky-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      {getCategoryIcon(idx)}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2 pt-6">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-white/2 border border-white/5 text-xs font-mono text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category Footer Note */}
              <div className="pt-6 mt-6 border-t border-white/6 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Production validated</span>
                <span>{cat.skills.length} core proficiencies</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
