'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050608] border-t border-white/8 pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
        
        {/* Top Footer Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center font-mono font-bold text-sky-400 text-xs">
              MP
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{PERSONAL_INFO.name}</div>
              <div className="text-xs font-mono text-neutral-400">{PERSONAL_INFO.title} • {PERSONAL_INFO.currentCompany}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#projects" className="hover:text-white transition-colors">Work</Link>
            <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
            <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white px-3.5 py-1.5 rounded-full bg-white/3 border border-white/8 hover:border-white/20 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>

        {/* Massive Editorial Nameplate (Figma Reference 1 & 2 Fusion) */}
        <div className="py-12 sm:py-16 text-center overflow-hidden">
          <h1 className="text-[14vw] font-black tracking-tighter text-white/6 hover:text-white/10 transition-colors leading-none uppercase whitespace-nowrap">
            MAHESH P
          </h1>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400 pt-6 border-t border-white/6">
          <div>
            © 2026 Mahesh P. All rights reserved.
          </div>
          <div>
            Built with Next.js App Router, TypeScript & Tailwind CSS.
          </div>
        </div>

      </div>
    </footer>
  );
}
