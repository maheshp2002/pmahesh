'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Recent Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 lg:px-20 flex items-center justify-between ${
          scrolled
            ? 'py-4 sm:py-5 bg-[#F8F8FA]/75 dark:bg-black/40 backdrop-blur-xl border-b border-black/8 dark:border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.12)]'
            : 'py-5 sm:py-7 bg-linear-to-b from-white/80 via-white/30 to-transparent dark:from-black/60 dark:via-black/20 dark:to-transparent border-b border-transparent backdrop-blur-[2px]'
        }`}
      >
        {/* Logo / Monogram (Figma matching) */}
        <Link
          href="#hero"
          className="text-xl sm:text-2xl font-extrabold tracking-tighter text-black dark:text-white font-heading hover:opacity-80 transition-opacity"
        >
          MP.
        </Link>

        {/* Right Actions: Theme Toggle + Menu Button */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Theme Toggle Button (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white transition-all duration-300 cursor-pointer flex items-center justify-center backdrop-blur-sm"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Minimal text MENU button (Figma matching) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors cursor-pointer py-1 px-2.5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#F8F8FA]/98 dark:bg-black/95 backdrop-blur-xl flex flex-col justify-between pt-32 pb-16 px-8 sm:px-16 lg:px-24"
          >
            <nav className="flex flex-col gap-6 sm:gap-8 max-w-4xl">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between text-3xl sm:text-5xl md:text-6xl font-heading font-bold text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors border-b border-black/10 dark:border-white/10 pb-4"
                >
                  <span className="group-hover:translate-x-4 transition-transform duration-300">
                    {link.label}
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-black/10 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-6">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="/Mahesh_P_Resume.pdf"
                  download
                  className="text-black dark:text-white font-semibold hover:underline"
                >
                  Download Resume
                </a>
              </div>

              <div>{PERSONAL_INFO.email}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
