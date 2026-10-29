'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-all cursor-pointer"
        />

        {/* Modal Window: Clean Editorial Presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl bg-white dark:bg-[#0D0D0F] border border-black/10 dark:border-white/10 text-[#111114] dark:text-white shadow-2xl flex flex-col overflow-hidden z-10 my-auto transition-colors duration-300"
        >
          {/* Header Bar */}
          <div className="shrink-0 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/10 dark:border-white/10">
            <div>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-black dark:text-white tracking-tight mt-0.5">
                {project.title.split('—')[0].trim()}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 text-neutral-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-6 custom-modal-scroll overscroll-contain">
            
            {/* Meta Line */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500">
              <span>{project.period}</span>
              <span>•</span>
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                {project.companyOrContext}
              </span>
            </div>

            {/* Project Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Overview
              </h4>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Key Contributions / Implementation */}
            {project.contributions && project.contributions.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Key Technical Contributions
                </h4>
                <ul className="space-y-2.5">
                  {project.contributions.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="text-neutral-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Technologies Used
              </h4>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                {project.techStack.map((tech, idx) => (
                  <React.Fragment key={idx}>
                    <span>{tech}</span>
                    {idx < project.techStack.length - 1 && (
                      <span className="text-neutral-300 dark:text-neutral-700 select-none">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* External Links */}
            {(project.repoUrl || project.companyUrl) && (
              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-4">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:underline transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.companyUrl && (
                  <a
                    href={project.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:underline transition-colors"
                  >
                    <span>Visit Company</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
