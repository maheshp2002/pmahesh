'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { EXPERIENCES } from '@/data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#08090C] border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Career Progression</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Work Experience & Roles
            </h2>
            <p className="text-neutral-400 text-base mt-2 max-w-xl">
              Professional history across product software companies, enterprise platforms, and production systems.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400 px-4 py-2 rounded-full bg-white/2 border border-white/6">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Product Engineering & Enterprise Backend</span>
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12 sm:space-y-16">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div
                className={`absolute -left-7.75 sm:-left-13.75 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  exp.current
                    ? 'bg-sky-400 border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]'
                    : 'bg-[#08090C] border-neutral-600 group-hover:border-sky-400'
                }`}
              />

              {/* Experience Card */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/8 hover:border-sky-500/30 transition-all">
                
                {/* Header Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                          Current Role
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-sky-400 font-mono mt-1">
                      {exp.company} <span className="text-neutral-500">•</span> <span className="text-neutral-400 font-normal">{exp.type}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-neutral-400 gap-1">
                    <span className="flex items-center gap-1.5 text-white font-medium">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 leading-relaxed pt-4">
                  {exp.description}
                </p>

                {/* Key Contributions */}
                <div className="space-y-2 pt-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Key Responsibilities & Deliverables:
                  </div>
                  <ul className="space-y-2">
                    {exp.keyContributions.map((contrib, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="pt-6 mt-6 border-t border-white/6 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/3 text-neutral-300 border border-white/6"
                    >
                      {tech}
                    </span>
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
