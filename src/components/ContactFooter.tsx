'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight, ArrowUp, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '@/data/portfolioData';
import ContactModal from './ContactModal';

const FULL_HEADLINE = "Let's talk about what I can bring to your team.";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const footerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const typedSpanRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  // Scroll progress for the headline character-by-character typing effect
  // Triggers as headline enters the bottom of the viewport (92%) up to comfortable middle view (48%)
  const { scrollYProgress: typingProgress } = useScroll({
    target: headlineRef,
    offset: ['start 92%', 'start 48%'],
  });

  // Scroll progress for the overall contact container entry/exit
  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ['start 95%', 'start 65%'],
  });

  // Bidirectional transforms for badge, paragraph, and actions
  const badgeOpacity = useTransform(footerProgress, [0, 0.45], [0, 1]);
  const badgeY = useTransform(footerProgress, [0, 0.45], [16, 0]);

  const descOpacity = useTransform(typingProgress, [0.45, 0.95], [0, 1]);
  const descY = useTransform(typingProgress, [0.45, 0.95], [20, 0]);

  const actionsOpacity = useTransform(typingProgress, [0.75, 1], [0, 1]);
  const actionsY = useTransform(typingProgress, [0.75, 1], [20, 0]);

  // Synchronize typed text directly with scroll progress without causing React re-renders
  const updateTyping = (progress: number) => {
    if (shouldReduceMotion) {
      if (typedSpanRef.current) typedSpanRef.current.textContent = FULL_HEADLINE;
      if (caretRef.current) caretRef.current.style.display = 'none';
      return;
    }

    const count = Math.min(
      FULL_HEADLINE.length,
      Math.max(0, Math.round(progress * FULL_HEADLINE.length))
    );

    if (typedSpanRef.current) {
      typedSpanRef.current.textContent = FULL_HEADLINE.slice(0, count);
    }

    if (caretRef.current) {
      if (count === 0) {
        caretRef.current.style.opacity = '0';
      } else if (count >= FULL_HEADLINE.length) {
        caretRef.current.style.opacity = '0.6';
        caretRef.current.classList.add('animate-pulse');
      } else {
        caretRef.current.style.opacity = '1';
        caretRef.current.classList.remove('animate-pulse');
      }
    }
  };

  useMotionValueEvent(typingProgress, 'change', (latest) => {
    updateTyping(latest);
  });

  useEffect(() => {
    updateTyping(typingProgress.get());
  }, [shouldReduceMotion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#F8F8FA] dark:bg-black text-[#111114] dark:text-white pt-24 sm:pt-36 pb-14 overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 space-y-16 sm:space-y-20">
        
        {/* Main Career Statement */}
        <div className="space-y-6 max-w-4xl">
          <motion.div
            style={shouldReduceMotion ? undefined : { opacity: badgeOpacity, y: badgeY }}
            className="text-xs font-mono uppercase tracking-wider text-neutral-500"
          >
            Available for Software Engineering Opportunities
          </motion.div>

          <h2
            ref={headlineRef}
            className="relative text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-heading font-extrabold text-black dark:text-white tracking-tight leading-[1.08]"
          >
            {/* Invisible baseline to maintain responsive height and eliminate layout shift */}
            <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
              {FULL_HEADLINE}
            </span>

            {/* Live scroll-progress typewriter overlay with blinking caret */}
            <span className="absolute inset-0">
              <span ref={typedSpanRef} />
              <span
                ref={caretRef}
                className="inline-block w-0.75 sm:w-1 h-[0.82em] bg-black dark:bg-white ml-1.5 align-baseline opacity-0 transition-opacity"
              />
            </span>
          </h2>

          <motion.p
            style={shouldReduceMotion ? undefined : { opacity: descOpacity, y: descY }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-3xl"
          >
            Software engineer focused on .NET backend systems, database performance engineering, and mission-critical enterprise integrations.
          </motion.p>
        </div>

        {/* Action Row with reversible scroll progress animation */}
        <motion.div
          style={shouldReduceMotion ? undefined : { opacity: actionsOpacity, y: actionsY }}
          className="space-y-8 pt-2"
        >
          {/* Primary Action Button & Email Row */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-heading font-bold text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-300 shadow-lg cursor-pointer"
              aria-label="Open contact modal"
            >
              <Mail className="w-4 h-4 text-white dark:text-black" />
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 text-white dark:text-black" />
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full bg-white dark:bg-[#111113] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 text-neutral-800 dark:text-neutral-300 transition-all text-sm font-mono cursor-pointer shadow-sm"
              title="Click to copy email address"
            >
              <span>{PERSONAL_INFO.email}</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-500 hover:text-black dark:hover:text-white transition-colors" />
              )}
            </button>
          </div>

          {/* Clean Text Links for Resume, GitHub, LinkedIn */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-600 dark:text-neutral-400 pt-2">
            <a
              href="/Mahesh_P_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </motion.div>


        {/* Minimal Bottom Footer */}
        <div className="pt-12 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-mono text-neutral-500">
          <div>
            © 2026 Mahesh P. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </footer>
  );
}
