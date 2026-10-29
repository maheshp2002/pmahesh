'use client';

import { GithubIcon, LinkedinIcon } from './Icons';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowUpRight, Download, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    
    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#0ea5e9', '#ffffff']
      });
    } catch {
      // Ignore if confetti not supported
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#08090C] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Initiate Communication</span>
        </div>

        {/* Big Editorial Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {"Let's"} build reliable software <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-300 via-sky-400 to-blue-500">together.</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed">
            Interested in discussing backend engineering, database optimization, or architectural roles? Reach out directly via email or professional networks.
          </p>
        </div>

        {/* Contact Action Card (Figma Reference 1 & 2 Fusion) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Direct Email Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Direct Email Channel
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Actively Monitoring Inbox
                </span>
              </div>

              {/* Email Address Display */}
              <div className="py-2">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight break-all">
                  {PERSONAL_INFO.email}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-950 font-bold text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-800" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Send Mail Directly</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Links & Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 border border-white/8 hover:border-sky-500/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">LinkedIn</div>
                  <div className="text-xs font-mono text-neutral-400">Connect professionally</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 border border-white/8 hover:border-sky-500/30 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">GitHub</div>
                  <div className="text-xs font-mono text-neutral-400">Repositories & code</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Resume Download */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Mahesh_P_Resume.pdf"
              className="glass-card rounded-2xl p-5 border border-sky-500/20 bg-sky-500/3 hover:border-sky-500/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-300">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-sky-200 group-hover:text-white transition-colors">Download Resume</div>
                  <div className="text-xs font-mono text-neutral-400">PDF • Verified Career Record</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
