'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface PlusApplicationGuidanceProps {
  className?: string;
}

interface GuidanceStep {
  step: string;
  title: string;
  description: string;
}

const STEPS: GuidanceStep[] = [
  {
    step: '01',
    title: 'UNDERSTAND',
    description: 'Consider your crop, growing conditions and soil requirements.',
  },
  {
    step: '02',
    title: 'REFER TO GUIDANCE',
    description:
      'Use the approved product label or verified application recommendations for quantities and methods.',
  },
  {
    step: '03',
    title: 'GET SUPPORT',
    description: 'Contact the Naati team for product-specific guidance where required.',
  },
];

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 04: USING NAATI PLUS
 *
 * Practical Application Guidance (Three-Step Horizontal Sequence):
 * - Warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Headline: "The right foundation starts with the right approach."
 * - Minimal horizontal progression with connecting lines and numbered nodes
 * - Factual guidance without invented dosage or unverified claims
 * - Direct inquiry CTA linked to contact with product context
 */
export function PlusApplicationGuidance({ className }: PlusApplicationGuidanceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        '.guidance-step-col',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.guidance-steps-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="application-guidance"
      data-nav-theme="light"
      aria-labelledby="guidance-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-24 md:py-28 lg:py-32 border-t border-cream-border/70 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      <Container size="default">
        {/* =======================================================================
            SECTION HEADER
            ======================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-18 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              04 / APPLICATION GUIDANCE
            </span>
          </div>

          <h2
            id="guidance-heading"
            className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-forest">
              The right foundation starts
            </span>
            <span className="block font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              with the right approach.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mt-4 sm:mt-5 max-w-xl [text-wrap:pretty]">
            Application varies by crop system, soil profile, and growth stage. We advocate informed,
            verified practices rather than generic one-size-fits-all recommendations.
          </p>
        </div>

        {/* =======================================================================
            THREE-STEP HORIZONTAL EDITORIAL SEQUENCE
            Connected via an architectural horizontal hairline on desktop
            ======================================================================= */}
        <div className="guidance-steps-grid relative mb-14 sm:mb-16 lg:mb-20">
          {/* Desktop Horizontal Connecting Line */}
          <div
            className="hidden lg:block absolute top-[22px] inset-x-[15%] h-px bg-cream-border"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-10">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="guidance-step-col flex flex-col justify-start relative pt-2"
              >
                {/* Node Marker */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-cream-light border border-cream-border flex items-center justify-center font-mono text-sm font-semibold tracking-wider text-forest shadow-warm-xs relative z-10">
                    {s.step}
                  </div>
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-olive">
                    {s.title}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed [text-wrap:pretty]">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================================
            ACTION CTA BAR
            ======================================================================= */}
        <div className="pt-8 border-t border-cream-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-sans text-sm sm:text-base text-text-muted">
            Have questions about field conditions or application timing for your land?
          </p>

          <Link
            href="/contact?product=naati-plus"
            className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-forest hover:text-olive transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded py-1"
            aria-label="Ask our technical team about application guidance for Naati Plus"
          >
            <span>Ask About Application</span>
            <span className="w-6 h-6 rounded-full bg-cream-light border border-cream-border flex items-center justify-center transition-transform duration-300 hover:translate-x-1 hover:-translate-y-0.5 shadow-warm-xs">
              <ArrowUpRight className="w-3.5 h-3.5 text-forest" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
