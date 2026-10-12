'use client';

import React, { useRef, useEffect } from 'react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutGuidingPrinciplesProps {
  className?: string;
}

interface GuidingPrinciple {
  index: string;
  title: string;
  description: string;
  focusTag: string;
}

const PRINCIPLES: GuidingPrinciple[] = [
  {
    index: '01',
    title: 'Respect the Living Soil',
    description:
      'Recognise soil as a living environment and support the natural processes that help crops grow.',
    focusTag: 'BIOLOGICAL FOUNDATION',
  },
  {
    index: '02',
    title: 'Learn from Nature and Science',
    description:
      'Bring practical agricultural understanding together with an appreciation of natural systems.',
    focusTag: 'SCIENTIFIC BOTANY',
  },
  {
    index: '03',
    title: 'Keep Farming Knowledge Practical',
    description:
      'Make soil and crop nutrition easier to understand so growers can make more informed decisions.',
    focusTag: 'FIELD-READY GUIDANCE',
  },
];

/**
 * ABOUT NAATI ORGANICS — SECTION 04: WHAT GUIDES US
 *
 * Typography-led editorial layout:
 * - Warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Full-width editorial rows separated by elegant thin hairlines (no generic cards)
 * - Multi-column layout per row: Large Index -> Display Title -> Clear Explanation -> Botanical Indicator
 * - Progressive ScrollTrigger reveals with graceful state transitions
 */
export function AboutGuidingPrinciples({ className }: AboutGuidingPrinciplesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.principles-header-trigger',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      headerTl
        .fromTo(
          '.principles-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.principles-title',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );

      // 2. Staggered Row Entrances
      const rows = gsap.utils.toArray<HTMLElement>('.principle-row');
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Animate divider line
        const divider = row.querySelector('.principle-divider');
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.85,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: row,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="guiding-principles"
      data-nav-theme="light"
      aria-labelledby="principles-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Boundary Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* =======================================================================
            SECTION INTRODUCTION
            ======================================================================= */}
        <div className="principles-header-trigger max-w-3xl mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="principles-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              03 / OUR GUIDING PRINCIPLES
            </span>
          </div>

          {/* Display Headline in Fraunces */}
          <h2
            id="principles-heading"
            className="principles-title font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] text-forest leading-[1.1] tracking-[-0.03em] [text-wrap:balance]"
          >
            Thoughtful agriculture starts with better understanding.
          </h2>
        </div>

        {/* =======================================================================
            FULL-WIDTH EDITORIAL ROWS (NO RECTANGULAR CARDS)
            Balanced typography-led multi-column rows separated by hairlines
            ======================================================================= */}
        <div className="space-y-0 border-t border-cream-border/90">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.index}
              className="principle-row group relative py-10 sm:py-12 md:py-14 transition-colors duration-300 hover:bg-cream-light/40"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-baseline">
                {/* Column 1: Monospace Index + Small Tag (~3 cols on md) */}
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-semibold text-olive tracking-tight shrink-0">
                    {principle.index}
                  </span>
                  <div className="h-px w-6 bg-cream-border self-center" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-text-muted tracking-[0.18em] uppercase">
                    {principle.focusTag}
                  </span>
                </div>

                {/* Column 2: Large Principle Headline (~5 cols on md) */}
                <div className="md:col-span-5">
                  <h3 className="font-display font-medium text-xl sm:text-2xl md:text-[1.75rem] text-forest leading-[1.18] tracking-[-0.02em] group-hover:text-olive-dark transition-colors duration-200">
                    {principle.title}
                  </h3>
                </div>

                {/* Column 3: Short Explanation (~4 cols on md) */}
                <div className="md:col-span-4 flex items-start justify-between gap-4">
                  <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed [text-wrap:pretty]">
                    {principle.description}
                  </p>

                  {/* Botanical Indicator Icon */}
                  <span
                    className="w-2 h-2 rounded-full bg-olive/40 group-hover:bg-olive group-hover:scale-125 transition-all duration-300 shrink-0 mt-2"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Bottom Hairline Divider */}
              <div className="principle-divider w-full h-px bg-cream-border/80 absolute bottom-0 left-0 right-0" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
