'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight, ArrowUp, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '@/data/portfolioData';
import ContactModal from './ContactModal';

const FULL_HEADLINE = "Let's talk about what I can bring to your team.";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Direct DOM typewriter animation with active backward typing on scroll up and forward typing on scroll down
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const typedSpanRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  const startForward = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (caretRef.current) {
      caretRef.current.style.display = 'inline-block';
      caretRef.current.classList.remove('animate-pulse', 'opacity-60');
      caretRef.current.classList.add('opacity-100');
    }

    timerRef.current = setInterval(() => {
      if (indexRef.current < FULL_HEADLINE.length) {
        indexRef.current += 1;
        if (typedSpanRef.current) {
          typedSpanRef.current.textContent = FULL_HEADLINE.slice(0, indexRef.current);
        }
        if (indexRef.current >= FULL_HEADLINE.length) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          if (caretRef.current) {
            caretRef.current.classList.add('animate-pulse', 'opacity-60');
          }
        }
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 24);
  }, []);

  const startReverse = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (caretRef.current) {
      caretRef.current.style.display = 'inline-block';
      caretRef.current.classList.remove('animate-pulse', 'opacity-60');
      caretRef.current.classList.add('opacity-100');
    }

    timerRef.current = setInterval(() => {
      if (indexRef.current > 0) {
        indexRef.current -= 1;
        if (typedSpanRef.current) {
          typedSpanRef.current.textContent = FULL_HEADLINE.slice(0, indexRef.current);
        }
        if (indexRef.current <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          timerRef.current = null;
          if (caretRef.current) {
            caretRef.current.style.display = 'none';
          }
        }
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        if (caretRef.current) {
          caretRef.current.style.display = 'none';
        }
      }
    }, 14);
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const checkHeadlineVisibility = () => {
      if (!headlineRef.current) return false;
      const rect = headlineRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.95 && rect.bottom > 0;
    };

    // If already in view on load, begin typing forward
    if (checkHeadlineVisibility() && indexRef.current === 0) {
      startForward();
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      const isVisible = checkHeadlineVisibility();

      if (isVisible) {
        if (delta < -2) {
          // Scrolling UP: Actively type backward!
          startReverse();
        } else if (delta > 2 && indexRef.current < FULL_HEADLINE.length) {
          // Scrolling DOWN: Actively type forward!
          startForward();
        }
      } else {
        // Scrolled away / above footer: rewind to 0
        if (indexRef.current > 0 && delta < 0) {
          startReverse();
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startForward, startReverse]);

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
      id="contact"
      className="relative bg-[#F8F8FA] dark:bg-black text-[#111114] dark:text-white pt-24 sm:pt-36 pb-14 overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 space-y-16 sm:space-y-20">
        
        {/* Main Career Statement */}
        <div className="space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-wider text-neutral-500"
          >
            Available for Software Engineering Opportunities
          </motion.div>

          <motion.h2
            ref={headlineRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-heading font-extrabold text-black dark:text-white tracking-tight leading-[1.08]"
          >
            {/* Invisible baseline to maintain responsive height and eliminate layout shift */}
            <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
              {FULL_HEADLINE}
            </span>

            {/* Live typewriter overlay with blinking caret */}
            <span className="absolute inset-0">
              <span ref={typedSpanRef} />
              <span
                ref={caretRef}
                className="inline-block w-0.75 sm:w-1 h-[0.82em] bg-black dark:bg-white ml-1.5 align-baseline"
                style={{ display: 'none' }}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-3xl"
          >
            Software engineer focused on .NET backend systems, database performance engineering, and mission-critical enterprise integrations.
          </motion.p>
        </div>

        {/* Action Row with bi-directional reverse animation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
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
