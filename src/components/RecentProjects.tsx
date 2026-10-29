'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HatchDoodle } from './Doodles';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import ProjectModal from './ProjectModal';

export default function RecentProjects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative bg-[#ECECEE] text-black py-24 sm:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header Row: Title & Top-Right Doodle with reverse scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between mb-16 sm:mb-20"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-black tracking-tight">
              Selected Work
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl font-normal leading-relaxed">
              Enterprise backend systems, database performance engineering, and independent platforms.
            </p>
          </div>

          <div className="text-neutral-400">
            <HatchDoodle className="w-14 h-14" />
          </div>
        </motion.div>

        {/* Editorial Project List */}
        <div className="border-t border-black/15 divide-y divide-black/15">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveModalProject(project)}
              className="group relative py-8 sm:py-12 px-4 -mx-4 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-black/3"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                
                {/* Left: Project Number, Title, Context, and Link */}
                <div className="md:col-span-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-black group-hover:translate-x-1.5 transition-transform duration-300 tracking-tight">
                      {project.title.split('—')[0].trim()}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>
                  
                  <div className="text-xs font-mono text-neutral-500 tracking-wide">
                    {project.category} <span className="text-neutral-300">•</span> {project.companyOrContext}
                  </div>

                  <div className="pt-2 text-xs font-mono text-neutral-600 group-hover:text-black font-semibold flex items-center gap-1 transition-colors">
                    <span>View project details</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Right: Concise Description & Clean Typographic Tech List */}
                <div className="md:col-span-7 space-y-4">
                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Clean Typographic Tech Stack */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-neutral-600 pt-1">
                    <span className="text-neutral-400 font-medium">Stack:</span>
                    {project.techStack.map((tech, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span className="text-neutral-800 font-medium">{tech}</span>
                        {tIdx < project.techStack.length - 1 && (
                          <span className="text-neutral-300 select-none">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
