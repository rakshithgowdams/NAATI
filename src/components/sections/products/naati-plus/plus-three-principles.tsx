'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface PlusThreePrinciplesProps {
  className?: string;
}

interface SoilPrinciple {
  number: string;
  title: string;
  description: string;
  accentColor: string;
}

const PRINCIPLES: SoilPrinciple[] = [
  {
    number: '01',
    title: 'ORGANIC MATTER',
    description: 'Supports the organic foundation of soil.',
    accentColor: 'text-earth',
  },
  {
    number: '02',
    title: 'SOIL STRUCTURE',
    description: 'Helps create favourable conditions for water movement and root development.',
    accentColor: 'text-olive',
  },
  {
    number: '03',
    title: 'SOIL BIOLOGY',
    description:
      'Organic matter provides a foundation for the living organisms involved in soil processes.',
    accentColor: 'text-forest',
  },
];

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 03: THREE PRINCIPLES OF HEALTHY SOIL
 *
 * Architectural Material Study Layout:
 * - Warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Section header: Eyebrow ("03 / SOIL FUNDAMENTALS") + Headline ("Three elements. One living foundation.")
 * - Central oversized soil study visual with fine architectural connecting lines
 * - Three elegantly arranged principle labels surrounding the visual without generic cards
 * - Controlled reversible GSAP ScrollTrigger reveals in sequence
 * - Natural stacked layout on mobile
 */
export function PlusThreePrinciples({ className }: PlusThreePrinciplesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
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

      // 2. Central image reveal
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Staggered principle markers reveal
      gsap.fromTo(
        '.soil-principle-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.soil-principles-container',
            start: 'top 78%',
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
      id="three-principles"
      data-nav-theme="light"
      aria-labelledby="principles-heading"
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
              03 / SOIL FUNDAMENTALS
            </span>
          </div>

          <h2
            id="principles-heading"
            className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-forest">
              Three elements.
            </span>
            <span className="block font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              One living foundation.
            </span>
          </h2>
        </div>

        {/* =======================================================================
            ARCHITECTURAL STUDY COMPOSITION
            Left 7 cols: Oversized soil photograph
            Right 5 cols: 3 Connected principle nodes with editorial connecting lines
            ======================================================================= */}
        <div className="soil-principles-container grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
          {/* OVERSIZED SOIL STUDY VISUAL (Col 1 to 7) */}
          <div className="lg:col-span-7 relative">
            <div
              ref={visualRef}
              className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-cream-deep border border-cream-border shadow-warm-md"
            >
              <Image
                src="/assets/images/about/living-soil-macro.jpg"
                alt="Documentary macro photograph showing rich organic matter, soil aggregates, and biological porosity"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                quality={92}
                className="object-cover object-center select-none"
              />

              {/* Architectural Technical Watermark */}
              <div className="absolute top-4 sm:top-6 left-5 sm:left-7 z-10 flex items-center gap-2 font-mono text-[10px] tracking-widest text-cream/90 bg-forest-deep/80 px-3 py-1.5 rounded backdrop-blur-xs uppercase border border-cream/15">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                SOIL MORPHOLOGY STUDY · NAATI LAB
              </div>

              {/* Bottom Subtle Bar */}
              <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-7 right-5 sm:right-7 z-10 flex items-center justify-between font-mono text-[10px] tracking-wider text-cream/80 uppercase pointer-events-none drop-shadow-sm">
                <span>POROSITY & RHIZOSPHERE</span>
                <span>ORGANIC CARBON MATRIX</span>
              </div>

              {/* Subtle Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-forest-deep/20 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* THREE EDITORIAL PRINCIPLES (Col 8 to 12) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 sm:space-y-10">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="soil-principle-row relative pl-8 border-l border-cream-border transition-colors duration-300 hover:border-olive"
              >
                {/* Architectural Indicator Point */}
                <div
                  className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cream-light border-2 border-olive shadow-xs"
                  aria-hidden="true"
                />

                {/* Number & Title */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-text-muted">
                    {principle.number} —
                  </span>
                  <h3 className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-forest">
                    {principle.title}
                  </h3>
                </div>

                {/* Description in DM Sans */}
                <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed [text-wrap:pretty]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
