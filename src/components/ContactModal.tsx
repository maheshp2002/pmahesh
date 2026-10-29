'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { LinkedinIcon, GithubIcon } from './Icons';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject || 'Software Engineering Opportunity — Mahesh P'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  if (!isOpen) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#0D0D0F] border border-black/10 dark:border-white/10 text-[#111114] dark:text-white shadow-2xl flex flex-col overflow-hidden z-10 my-auto transition-colors duration-300"
        >
          {/* Header */}
          <div className="shrink-0 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/10 dark:border-white/10">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-black dark:text-white tracking-tight">
              Get in Touch
            </h3>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/10 dark:hover:border-white/10 text-neutral-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed">
              Open to high-impact backend engineering roles, database optimization challenges, and technical inquiries. Reach out directly via email or professional profiles.
            </p>

            {/* Direct Email Container */}
            <div className="p-5 rounded-2xl bg-black/3 dark:bg-white/3 border border-black/10 dark:border-white/10 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Direct Email
                </span>
                <div className="text-base sm:text-lg font-mono font-semibold text-black dark:text-white mt-0.5 select-all">
                  {PERSONAL_INFO.email}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Software%20Engineering%20Opportunity%20—%20Mahesh%20P`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-mono font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-transparent border border-black/15 dark:border-white/15 text-neutral-700 dark:text-neutral-300 text-xs font-mono font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-semibold">Email Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <span className="text-neutral-400 uppercase tracking-wider">Profiles:</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:underline transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:underline transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400" />
              </a>
            </div>

            {/* Quick Note Form (Functional Mailto Dispatch) */}
            <form onSubmit={handleSendMail} className="pt-4 border-t border-black/10 dark:border-white/10 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                Compose Quick Message (launches via your email)
              </div>

              <div>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject / Topic (e.g. Backend Role Discussion)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/2 dark:bg-white/2 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message or project context..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/2 dark:bg-white/2 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black/30 dark:focus:border-white/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-xs font-mono font-semibold hover:bg-black dark:hover:bg-white transition-colors cursor-pointer"
              >
                Launch in Email Client →
              </button>
            </form>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
