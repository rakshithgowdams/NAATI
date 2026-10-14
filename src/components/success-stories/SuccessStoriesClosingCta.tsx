'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';

export interface SuccessStoriesClosingCtaProps {
  className?: string;
}

/**
 * SUCCESS STORIES — SECTION 07: FINAL EDITORIAL CTA
 *
 * Small label: CONTINUE THE JOURNEY
 * Headline: "Every growing season begins with understanding."
 * Supporting: "Explore the thinking behind Naati Organics and discover our approach to soil and plant nutrition."
 * Primary CTA: EXPLORE SOIL ACADEMY ↗ (/soil-academy)
 * Secondary CTA: EXPLORE OUR SYSTEM ↗ (/nutrition-system)
 *
 * Visual:
 * - Deep forest green (#14240E), data-nav-theme="dark"
 * - Warm cream typography and fine gold/harvest accents
 * - Leads directly into the dark global footer (SiteFooter)
 */
export function SuccessStoriesClosingCta({ className }: SuccessStoriesClosingCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="closing-cta"
      data-nav-theme="dark"
      aria-labelledby="closing-cta-heading"
      className={cn(
        'relative w-full bg-[#14240E] text-cream py-20 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden border-t border-cream/10',
        className
      )}
    >
      {/* Subtle background ambient grain / gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.12),rgba(20,36,14,0))] pointer-events-none"
        aria-hidden="true"
      />

      <div ref={contentRef} className="max-w-5xl mx-auto text-center relative z-10">
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-harvest">
            CONTINUE THE JOURNEY
          </span>
          <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
        </div>

        {/* Display Headline in Fraunces */}
        <h2
          id="closing-cta-heading"
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight leading-[1.12] mb-6 sm:mb-8 [text-wrap:balance]"
        >
          Every growing season <br />
          <span className="italic font-light text-harvest">begins with understanding.</span>
        </h2>

        {/* Supporting Paragraph */}
        <p className="font-sans text-base sm:text-lg lg:text-xl text-[#B7C1A9] leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12">
          Explore the thinking behind Naati Organics and discover our approach to soil and plant nutrition.
        </p>

        {/* Dual Verified CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/soil-academy"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 sm:py-4.5 bg-harvest text-forest-deep text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-cream transition-all duration-300 shadow-md"
          >
            <span>EXPLORE SOIL LEARNING CENTRE</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/nutrition-system"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 sm:py-4.5 border border-cream/25 text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium hover:border-harvest hover:text-harvest transition-all duration-200"
          >
            <span>EXPLORE OUR SYSTEM</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-harvest" />
          </Link>
        </div>

        {/* Editorial Subtext */}
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#B7C1A9]/70">
          <span>Naati Plus — Build the Soil</span>
          <span className="hidden sm:inline">•</span>
          <span>Naati Pro — Feed the Plant</span>
          <span className="hidden sm:inline">•</span>
          <span>Regenerative Agriculture</span>
        </div>
      </div>
    </section>
  );
}
