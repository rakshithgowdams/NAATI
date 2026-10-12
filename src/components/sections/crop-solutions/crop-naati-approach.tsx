'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface CropNaatiApproachProps {
  className?: string;
}

/**
 * CROP SOLUTIONS PAGE — SECTION 04: BUILD THE SOIL. FEED THE PLANT.
 *
 * Editorial Dual-Product Comparison:
 * - Background: Deep forest green (#14240E) with data-nav-theme="dark"
 * - Eyebrow: "03 / THE NAATI APPROACH"
 * - Headline: "Two forms of care. One complete approach."
 * - Stage 01: Naati Plus ("BUILD THE SOIL" · Soil Nutrition · Enriched Vermicompost)
 * - Center: Dynamic animated SVG botanical synergy bridge
 * - Stage 02: Naati Pro ("FEED THE PLANT" · Plant Nutrition · Bio-Activator)
 * - Exact approved packaging imagery for both products
 * - Smooth reversible GSAP scroll choreography without restrictive pinning
 * - CTAs to /products/naati-plus and /products/naati-pro
 */
export function CropNaatiApproach({ className }: CropNaatiApproachProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        '.crop-approach-header',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }
      )
        .fromTo(
          '.crop-stage-soil',
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.35'
        );

      if (connectorLineRef.current) {
        tl.fromTo(
          connectorLineRef.current,
          { strokeDashoffset: 320, strokeDasharray: 320 },
          { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' },
          '-=0.4'
        );
      }

      tl.fromTo(
        '.crop-stage-plant',
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.45'
      ).fromTo(
        '.crop-approach-footer',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="naati-approach"
      data-nav-theme="dark"
      aria-labelledby="crop-approach-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-20 sm:py-28 lg:py-36 border-t border-cream/10 overflow-hidden',
        className
      )}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide">
        {/* Section Header */}
        <div className="crop-approach-header text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-harvest">
              03 / THE NAATI APPROACH
            </span>
          </div>

          <h2
            id="crop-approach-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.5vw,4.2rem)] leading-[1.08] tracking-[-0.035em] text-cream mb-6 [text-wrap:balance]"
          >
            Two forms of care.
            <br />
            <span className="italic text-harvest">One complete approach.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto [text-wrap:pretty]">
            Whatever your crop family, the fundamental principle remains constant: healthy soil foundations nurture vigorous above-ground growth.
          </p>
        </div>

        {/* Connected Visual Stages */}
        <div className="relative max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* STAGE 01: BUILD THE SOIL (Col 1 to 5) */}
            <div className="crop-stage-soil md:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-cream/5 border border-cream/15 backdrop-blur-xs">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-harvest mb-1">
                STAGE 01 / SUBTERRANEAN
              </span>
              <h3 className="font-display font-semibold text-2xl text-cream mb-1">
                BUILD THE SOIL
              </h3>
              <div className="font-mono text-xs font-semibold tracking-wider uppercase text-cream/60 mb-6">
                Naati Plus · Soil Nutrition
              </div>

              {/* Exact Approved Naati Plus Pouch */}
              <div className="relative w-44 sm:w-52 aspect-square flex items-center justify-center mb-6">
                <Image
                  src="/assets/images/products/naati-plus-pack.png"
                  alt="Naati Plus Enriched Vermicompost official packaging pouch"
                  width={340}
                  height={340}
                  quality={90}
                  className="object-contain w-full h-full drop-shadow-[0_16px_30px_rgba(0,0,0,0.55)]"
                />
              </div>

              <p className="font-sans text-sm text-cream/80 leading-relaxed mb-6">
                An organic-matter-focused product within the Naati soil nutrition approach, formulated with enriched vermicompost.
              </p>

              <Link
                href="/products/naati-plus"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-harvest hover:text-cream transition-colors"
              >
                <span>Explore Naati Plus</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* CENTER CONNECTION: SVG SYNERGY CURVE (Col 6 to 7) */}
            <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center">
              <div className="relative w-full flex items-center justify-center">
                <svg
                  className="w-full h-16 overflow-visible"
                  viewBox="0 0 100 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    ref={connectorLineRef}
                    d="M 5 20 C 35 5, 65 35, 95 20"
                    stroke="#E5A93C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                  <circle cx="50" cy="20" r="4" fill="#2D5A27" stroke="#E5A93C" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-harvest/70 font-semibold mt-1">
                COMPLEMENTARY
              </span>
            </div>

            {/* STAGE 02: FEED THE PLANT (Col 8 to 12) */}
            <div className="crop-stage-plant md:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-cream/5 border border-cream/15 backdrop-blur-xs">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-harvest mb-1">
                STAGE 02 / ABOVE GROUND
              </span>
              <h3 className="font-display font-semibold text-2xl text-cream mb-1">
                FEED THE PLANT
              </h3>
              <div className="font-mono text-xs font-semibold tracking-wider uppercase text-cream/60 mb-6">
                Naati Pro · Plant Nutrition
              </div>

              {/* Exact Approved Naati Pro Box */}
              <div className="relative w-44 sm:w-52 aspect-square flex items-center justify-center mb-6">
                <Image
                  src="/assets/images/products/naati-pro-pack.png"
                  alt="Naati Pro Plant Nutrition Bio-Activator official packaging box"
                  width={340}
                  height={340}
                  quality={90}
                  className="object-contain w-full h-full drop-shadow-[0_16px_30px_rgba(0,0,0,0.55)]"
                />
              </div>

              <p className="font-sans text-sm text-cream/80 leading-relaxed mb-6">
                The complementary plant-nutrition product within the Naati system, formulated as a bio-activator in solid product blocks.
              </p>

              <Link
                href="/products/naati-pro"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-harvest hover:text-cream transition-colors"
              >
                <span>Explore Naati Pro</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="crop-approach-footer flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          <Link
            href="/nutrition-system"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px] w-full sm:w-auto"
          >
            <span>Understand the Complete System</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
