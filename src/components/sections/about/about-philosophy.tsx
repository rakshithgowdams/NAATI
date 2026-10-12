'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutPhilosophyProps {
  className?: string;
}

/**
 * ABOUT NAATI ORGANICS — SECTION 03: OUR PHILOSOPHY
 *
 * Compact, visually striking connected editorial composition:
 * - Dark forest-green background (#14240E) with data-nav-theme="dark"
 * - Oversized cream typography in Fraunces
 * - Photographic backdrop of living soil & thriving plant foliage
 * - Flowing botanical root-inspired SVG connector line that progressively draws
 * - Two connected priorities: 01 Build the Soil (Naati Plus) & 02 Feed the Plant (Naati Pro)
 * - Seamless links navigating to /products/naati-plus and /products/naati-pro
 * - Concluding statement: "Two connected priorities. One thoughtful approach."
 */
export function AboutPhilosophy({ className }: AboutPhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorSvgRef = useRef<SVGSVGElement>(null);
  const connectorPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.phil-about-header',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      headerTl
        .fromTo(
          '.phil-about-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.phil-about-headline',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.phil-about-intro',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      // 2. Botanical Connecting SVG Path Draw
      if (connectorPathRef.current) {
        const pathLength = connectorPathRef.current.getTotalLength() || 400;
        gsap.set(connectorPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(connectorPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.phil-connect-stage',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      }

      // 3. Two Pillars Entrance
      const pillarsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.phil-connect-stage',
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });

      pillarsTl
        .fromTo(
          '.phil-pillar-1',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          '.phil-pillar-2',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.phil-final-statement',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.3'
        );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-philosophy"
      data-nav-theme="dark"
      aria-labelledby="about-phil-heading"
      className={cn(
        'relative w-full bg-[#14240E] text-cream overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Boundary Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream/15" />

      <Container size="default">
        {/* =======================================================================
            1. SECTION INTRODUCTION
            ======================================================================= */}
        <div className="phil-about-header max-w-3xl mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="phil-about-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
              02 / THE NAATI PHILOSOPHY
            </span>
          </div>

          {/* Main Headline in Fraunces */}
          <h2
            id="about-phil-heading"
            className="phil-about-headline tracking-[-0.035em] leading-[1.05] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-cream">
              Fix the Soil.
            </span>
            <span className="block font-display italic font-normal text-harvest text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              Feed the Plant.
            </span>
          </h2>

          {/* Supporting Intro in DM Sans */}
          <p className="phil-about-intro font-sans text-base sm:text-lg md:text-xl text-cream-muted/90 mt-4 sm:mt-5 max-w-xl leading-relaxed [text-wrap:pretty]">
            Healthy growth depends on the relationship between the soil and the crop. Our approach
            considers both.
          </p>
        </div>

        {/* =======================================================================
            2. CONNECTED CONCEPTUAL STAGE
            Atmospheric photographic visual backdrop + Two interconnected pillars
            ======================================================================= */}
        <div className="phil-connect-stage relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-cream/15 bg-forest-surface shadow-2xl p-6 sm:p-10 md:p-12 lg:p-16">
          {/* Background Soil-Plant Connection Visual */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/assets/images/about/soil-plant-connection.jpg"
              alt="Botanical study of plant foliage and roots anchored deeply into living soil"
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover object-center select-none mix-blend-luminosity"
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#14240E]/90 via-[#14240E]/80 to-[#14240E]/95" />
          </div>

          {/* Foreground Grid: Two Pillars Connected by Botanical Concept */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-stretch">
            {/* PILLAR 01: BUILD THE SOIL */}
            <div className="phil-pillar-1 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/10 backdrop-blur-xs">
              <div>
                {/* Index in IBM Plex Mono */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-harvest">
                    01 / BUILD THE SOIL
                  </span>
                </div>

                {/* Subtitle in Fraunces */}
                <h3 className="font-display font-medium text-2xl sm:text-3xl text-cream tracking-tight mb-3">
                  The Subterranean Foundation
                </h3>

                {/* Principle Explanation */}
                <p className="font-sans text-sm sm:text-base text-cream-muted/90 leading-relaxed [text-wrap:pretty]">
                  Support soil structure, organic matter and the living environment surrounding
                  plant roots.
                </p>
              </div>

              {/* Contextual Product Link */}
              <div className="mt-6 pt-5 border-t border-cream/10">
                <Link
                  href="/products/naati-plus"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-harvest hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-harvest"
                  aria-label="Discover Naati Plus — Enriched Vermicompost"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-harvest">
                    NAATI PLUS
                  </span>
                  <span className="text-cream-muted/70">— Enriched Vermicompost</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* PILLAR 02: FEED THE PLANT */}
            <div className="phil-pillar-2 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/10 backdrop-blur-xs">
              <div>
                {/* Index in IBM Plex Mono */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive-light" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-olive-light">
                    02 / FEED THE PLANT
                  </span>
                </div>

                {/* Subtitle in Fraunces */}
                <h3 className="font-display font-medium text-2xl sm:text-3xl text-cream tracking-tight mb-3">
                  The Canopy & Yield
                </h3>

                {/* Principle Explanation */}
                <p className="font-sans text-sm sm:text-base text-cream-muted/90 leading-relaxed [text-wrap:pretty]">
                  Support plant nutrition through the stages of crop growth.
                </p>
              </div>

              {/* Contextual Product Link */}
              <div className="mt-6 pt-5 border-t border-cream/10">
                <Link
                  href="/products/naati-pro"
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-olive-light hover:text-cream transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-olive-light"
                  aria-label="Discover Naati Pro — Plant Nutrition Bio-Activator"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-olive-light">
                    NAATI PRO
                  </span>
                  <span className="text-cream-muted/70">— Bio-Activator</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Progressive Botanical SVG Connector Draw Between Pillars (Desktop/Tablet) */}
          <div className="hidden md:flex justify-center my-6 relative z-10 pointer-events-none">
            <svg
              ref={connectorSvgRef}
              width="320"
              height="32"
              viewBox="0 0 320 32"
              fill="none"
              className="w-80 h-8 opacity-80"
              aria-hidden="true"
            >
              <path
                ref={connectorPathRef}
                d="M10 16 C 80 6, 120 26, 160 16 C 200 6, 240 26, 310 16"
                stroke="#DDCE9A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />
              <circle cx="160" cy="16" r="3" fill="#DDCE9A" />
            </svg>
          </div>

          {/* Ending Statement */}
          <div className="phil-final-statement relative z-10 text-center pt-8 md:pt-4 border-t border-cream/10 mt-6 sm:mt-8">
            <p className="font-display italic text-lg sm:text-xl md:text-2xl text-cream font-normal">
              Two connected priorities.{' '}
              <span className="text-harvest font-medium">One thoughtful approach.</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
