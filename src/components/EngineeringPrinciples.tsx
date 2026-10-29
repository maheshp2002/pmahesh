'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ENGINEERING_PRINCIPLES } from '@/data/portfolioData';

export default function EngineeringPrinciples() {
  return (
    <section id="approach" className="relative py-24 sm:py-32 bg-[#08090C] border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Engineering Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Core Principles & Approach
            </h2>
            <p className="text-neutral-400 text-base mt-2 max-w-xl">
              How I approach software engineering: disciplined diagnosis, empirical performance tuning, and designing for production resilience.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-400 px-4 py-2 rounded-full bg-white/2 border border-white/6">
            <span>Methodology: Rigor Over Hype</span>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ENGINEERING_PRINCIPLES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-white/8 hover:border-sky-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Number & Tagline */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-sky-400/40 group-hover:text-sky-400 transition-colors">
                    {item.number}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 px-3 py-1 rounded-full bg-white/3 border border-white/6">
                    {item.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Practical Application */}
              <div className="pt-6 mt-6 border-t border-white/6 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs font-mono text-neutral-300 leading-relaxed">
                  <strong className="text-white font-semibold">In Practice: </strong>
                  {item.practicalApplication}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
