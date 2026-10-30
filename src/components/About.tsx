'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LightbulbDoodle, QuestionMarkDoodle, HatchDoodle } from './Doodles';
import beachSunset from '../../public/images/beach-sunset.jpg';

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-[#F8F8FA] dark:bg-black py-24 sm:py-36 text-[#111114] dark:text-white overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading & Editorial Bio (Figma matching) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-[#111114] dark:text-white tracking-tight">
              About me
            </h2>

            <div className="space-y-5 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                I am a Software Engineer and .NET Backend Developer with 3.5+ years of hands-on professional experience building and maintaining robust product architectures, eliminating database execution bottlenecks, and engineering enterprise integrations.
              </p>
              <p>
                Currently at <span className="text-black dark:text-white font-semibold">Wrench Solutions</span>, an established enterprise product company, my day-to-day focus centers on C#/.NET backend services, analyzing query execution plans, restructuring stored procedures for high-concurrency workflows, and implementing seamless integrations with <span className="text-neutral-800 dark:text-neutral-200 font-medium">Circularo, vSign</span>, and <span className="text-neutral-800 dark:text-neutral-200 font-medium">Microsoft Graph</span>.
              </p>
              <p>
                Previously at <span className="text-black dark:text-white font-semibold">Experion Technologies</span>, I engineered clean architecture event handlers and PostgreSQL functions with advanced JSONB validations for a US-based hospitality platform, while also contributing to an automotive EV charging network portal.
              </p>
            </div>

            {/* Academic Footnote */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <div>
                <span className="text-black dark:text-white font-semibold">BCA (In Progress)</span> — IGNOU
              </div>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <div>
                <span className="text-black dark:text-white font-semibold">Diploma in Computer Engineering</span> — CGPA 8.95
              </div>
            </div>
          </motion.div>

          {/* Right Column: Framed Image with Hand-Drawn Doodles (Figma matching) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-70 sm:w-85 aspect-4/5">
              
              {/* Delicate Hand-Drawn Yellow Lightbulb Doodle (Top-Left): Tilted inward with subtle soft glow */}
              <div className="absolute -top-7 -left-5 sm:-top-10 sm:-left-8 z-20 pointer-events-none rotate-[-16deg] drop-shadow-[0_0_12px_rgba(250,204,21,0.45)] transform">
                <LightbulbDoodle className="w-18 h-22 sm:w-22 sm:h-26" />
              </div>

              {/* Hand-Drawn Question Mark Doodle (Top-Right): Tilted like reference */}
              <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 z-20 pointer-events-none rotate-15 text-neutral-300 dark:text-neutral-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transform">
                <QuestionMarkDoodle className="w-14 h-18 sm:w-16 sm:h-20" />
              </div>

              {/* Diagonal Striped Decoration (Bottom-Left): Positioned OUTSIDE and BELOW the image, BEHIND in stacking order (z-0) */}
              <div className="absolute -bottom-8 -left-6 sm:-bottom-12 sm:-left-10 z-0 pointer-events-none text-neutral-500/80 dark:text-neutral-500/70 transform">
                <HatchDoodle className="w-20 h-20 sm:w-26 sm:h-26" />
              </div>

              {/* Framed Image Card: z-10 on top of the striped decoration */}
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={beachSunset}
                  alt="Mahesh P at Blue Water, Kerala"
                  fill
                  className="object-cover object-center filter brightness-95 contrast-105"
                  sizes="(max-width: 768px) 100vw, 340px"
                />
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
