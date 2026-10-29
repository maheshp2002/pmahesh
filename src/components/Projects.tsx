'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Backend & Database', value: 'backend' },
    { label: 'Integrations', value: 'integrations' },
    { label: 'Products & AR', value: 'products' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'backend') return p.category.includes('Backend') || p.category.includes('Database');
    if (selectedFilter === 'integrations') return p.category.includes('Integration') || p.category.includes('Distributed');
    if (selectedFilter === 'products') return p.category.includes('Product') || p.category.includes('AR') || p.category.includes('Full-Stack');
    return true;
  });

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#08090C] border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>Verified Engineering Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Selected Work & Case Studies
            </h2>
            <p className="text-neutral-400 text-base mt-2 max-w-xl">
              Production contributions at product software companies, database performance engineering, and independent technical projects.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSelectedFilter(f.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedFilter === f.value
                    ? 'bg-sky-500 text-neutral-950 font-semibold shadow-md shadow-sky-500/20'
                    : 'bg-white/3 text-neutral-400 hover:text-white hover:bg-white/8 border border-white/6'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Project Grid (Figma Reference 1 + Reference 2 Fusion) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/8 hover:border-sky-500/30 transition-all group"
            >
              <div className="space-y-5">
                {/* Top Card Meta */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-white/4 text-sky-300 border border-white/8">
                    {project.category}
                  </span>

                  <span className="text-xs font-mono text-neutral-500">
                    {project.period}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1">
                    {project.companyOrContext}
                  </p>
                  <p className="text-sm text-neutral-400 leading-relaxed mt-3">
                    {project.description}
                  </p>
                </div>

                {/* Key Contribution Points */}
                <div className="space-y-2 pt-1 border-t border-white/5">
                  {project.contributions.slice(0, 2).map((item, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Outcome Badge */}
                {project.metricsOrHighlight && (
                  <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/15 text-xs text-sky-200 font-mono">
                    <span className="font-semibold text-sky-300">Highlight: </span>
                    {project.metricsOrHighlight}
                  </div>
                )}
              </div>

              {/* Card Footer: Tech Stack & Modal Action */}
              <div className="pt-6 mt-6 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/3 text-neutral-300 border border-white/6"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-mono text-neutral-500">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-sky-400 transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
