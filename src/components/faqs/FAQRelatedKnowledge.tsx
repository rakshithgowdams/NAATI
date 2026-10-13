'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';

export interface FAQRelatedKnowledgeProps {
  className?: string;
}

interface LearningDestination {
  number: string;
  title: string;
  description: string;
  ctaText: string;
  href: string;
}

const DESTINATIONS: LearningDestination[] = [
  {
    number: '01',
    title: 'SOIL ACADEMY',
    description: 'Explore the science beneath healthy soil, microbial aggregation, and living ecosystems.',
    ctaText: 'EXPLORE SOIL ACADEMY',
    href: '/soil-academy',
  },
  {
    number: '02',
    title: 'COMPLETE NAATI SYSTEM',
    description: 'Understand the biological roles of soil nutrition (Naati Plus) and plant nutrition (Naati Pro).',
    ctaText: 'EXPLORE THE SYSTEM',
    href: '/nutrition-system',
  },
  {
    number: '03',
    title: 'CROP SOLUTIONS',
    description: 'Explore crop-specific protocols for plantations, horticulture, vegetables, and field crops.',
    ctaText: 'EXPLORE CROPS',
    href: '/crop-solutions',
  },
];

/**
 * FAQ PAGE — SECTION 03: CONTINUE LEARNING
 *
 * Eyebrow: 02 / GO DEEPER
 * Headline: "Curiosity is where learning begins."
 *
 * Design:
 * - Minimal editorial rows with small numbering, strong headings, concise summaries, animated arrows
 * - Warm cream background with fine dividers (no giant cards)
 * - Directly bridges the FAQ page with completed educational and product sections
 */
export function FAQRelatedKnowledge({ className }: FAQRelatedKnowledgeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.related-knowledge-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
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
      id="continue-learning"
      data-nav-theme="light"
      aria-labelledby="continue-learning-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="related-knowledge-header max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              02 / GO DEEPER
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="continue-learning-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-forest-deep tracking-tight leading-[1.12] mb-5"
          >
            Curiosity is <br />
            <span className="italic font-light">where learning begins.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed max-w-xl">
            Answers are only the starting point. Delve deeper into our comprehensive educational guides, agronomic systems, and crop-specific guidance.
          </p>
        </div>

        {/* Minimal Editorial Rows / Columns */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-forest-deep/15 pt-10">
          {DESTINATIONS.map((dest) => (
            <article
              key={dest.number}
              className="group flex flex-col justify-between p-6 sm:p-8 bg-white/40 border border-forest-deep/10 hover:border-forest-deep/30 transition-all duration-300 hover:shadow-sm"
            >
              <div>
                {/* Number */}
                <div className="font-mono text-xs sm:text-sm font-semibold text-harvest tracking-widest mb-4">
                  {dest.number}
                </div>

                {/* Title */}
                <h3 className="font-display font-medium text-xl sm:text-2xl text-forest-deep mb-3 group-hover:text-harvest transition-colors leading-tight">
                  {dest.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-sm sm:text-base text-forest-deep/75 leading-relaxed mb-8">
                  {dest.description}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-forest-deep/10">
                <Link
                  href={dest.href}
                  className="group/link inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] font-semibold text-forest-deep hover:text-harvest transition-colors"
                >
                  <span>{dest.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
