'use client';

import React, { useRef, useEffect } from 'react';
import { Microscope, GitCommit, Layers, Sparkles } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutApproachProps {
  className?: string;
}

const APPROACH_STEPS = [
  {
    step: 'Step 1',
    title: 'Understand the Soil',
    lead: 'Every field tells a story.',
    description: 'Healthy farming begins by understanding what lies beneath the surface.',
    icon: Microscope,
    tag: 'DIAGNOSTIC FOUNDATION',
  },
  {
    step: 'Step 2',
    title: 'Strengthen the Roots',
    lead: 'Healthy roots create stronger plants.',
    description: 'Healthy roots develop only in healthy soil.',
    icon: GitCommit,
    tag: 'ROOT ARCHITECTURE',
  },
  {
    step: 'Step 3',
    title: 'Provide Balanced Nutrition',
    lead: 'Plants need balanced nutrition—not just NPK.',
    description: 'Balanced nutrition supports vigorous growth, flowering, fruiting, and long-term crop health.',
    icon: Layers,
    tag: 'COMPLETE NUTRITION',
  },
  {
    step: 'Step 4',
    title: 'Harvest Sustainably',
    lead: 'Our goal is not just a better harvest this season.',
    description: 'Our goal is healthier soil for every season to come.',
    icon: Sparkles,
    tag: 'REGENERATIVE CYCLE',
  },
];

/**
 * ABOUT NAATI ORGANICS — SECTION 07: OUR APPROACH
 *
 * Client Specification:
 * OUR APPROACH
 * We don't believe agriculture needs more products.
 * We believe agriculture needs better understanding.
 * That is why Naati follows a simple four-step approach:
 * Step 1: Understand the Soil
 * Step 2: Strengthen the Roots
 * Step 3: Provide Balanced Nutrition
 * Step 4: Harvest Sustainably
 */
export function AboutApproach({ className }: AboutApproachProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.approach-header-item',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.approach-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll('.approach-step-card'),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
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
      id="our-approach"
      data-nav-theme="light"
      aria-labelledby="our-approach-heading"
      className={cn(
        'relative w-full bg-[#FAF7F0] text-forest py-20 sm:py-26 lg:py-32 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* =====================================================================
            HEADER: Better Understanding Philosophy
            ===================================================================== */}
        <div className="approach-header max-w-3xl mb-14 sm:mb-18">
          <div className="approach-header-item inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              OUR APPROACH
            </span>
          </div>

          <h2
            id="our-approach-heading"
            className="approach-header-item font-display font-medium text-[clamp(2.15rem,4vw,3.5rem)] text-forest tracking-[-0.03em] leading-tight mb-4 [text-wrap:balance]"
          >
            We don&apos;t believe agriculture needs more products.
            <br />
            <span className="text-olive italic">
              We believe agriculture needs better understanding.
            </span>
          </h2>

          <p className="approach-header-item font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
            That is why Naati follows a simple four-step approach:
          </p>
        </div>

        {/* =====================================================================
            FOUR STEPS GRID
            ===================================================================== */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch"
        >
          {APPROACH_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="approach-step-card flex flex-col justify-between p-7 rounded-2xl bg-cream-light border border-cream-border/90 shadow-warm-xs hover:border-olive/40 hover:shadow-warm-sm transition-all duration-300 group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold tracking-widest text-olive uppercase bg-olive/10 px-2.5 py-1 rounded-md">
                      {step.step}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-forest tracking-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Lead Sentence */}
                  <p className="font-sans font-semibold text-sm sm:text-base text-forest/90 mb-2 leading-snug">
                    {step.lead}
                  </p>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Focus Tag Footer */}
                <div className="pt-6 mt-6 border-t border-cream-border/60">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-text-muted uppercase tracking-widest">
                    {step.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
