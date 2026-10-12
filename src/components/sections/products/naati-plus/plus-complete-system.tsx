'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface PlusCompleteSystemProps {
  className?: string;
}

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 05: PART OF A COMPLETE SYSTEM
 *
 * Immersive Two-Product Dark Forest Connection:
 * - Deep forest green (#14240E) background with data-nav-theme="dark"
 * - Section headline: "Build the Soil. Feed the Plant."
 * - Left: Approved Naati Plus package + "Soil Nutrition"
 * - Center: Dynamic animated botanical/biochemical connecting graphic
 * - Right: Approved Naati Pro package + "Plant Nutrition"
 * - Supporting text & dual action CTAs (/products/naati-pro & /nutrition-system)
 */
export function PlusCompleteSystem({ className }: PlusCompleteSystemProps) {
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
        '.sys-conn-header',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo(
          '.sys-conn-prod-left',
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );

      if (connectorLineRef.current) {
        tl.fromTo(
          connectorLineRef.current,
          { strokeDashoffset: 300, strokeDasharray: 300 },
          { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' },
          '-=0.4'
        );
      }

      tl.fromTo(
        '.sys-conn-prod-right',
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      ).fromTo(
        '.sys-conn-actions',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="complete-system-connection"
      data-nav-theme="dark"
      aria-labelledby="complete-sys-heading"
      className={cn(
        'relative w-full bg-[#14240E] text-cream py-22 sm:py-26 md:py-30 lg:py-34 overflow-hidden border-t border-cream/15 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Background Radiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-olive/10 blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        {/* =======================================================================
            SECTION HEADER
            ======================================================================= */}
        <div className="sys-conn-header text-center max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
              05 / THE COMPLETE SYSTEM
            </span>
          </div>

          <h2
            id="complete-sys-heading"
            className="tracking-[-0.035em] leading-[1.06] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.5rem,5vw,4.5rem)] text-cream">
              Build the Soil.
            </span>
            <span className="block font-display italic font-normal text-harvest text-[clamp(2.5rem,5vw,4.5rem)] mt-1">
              Feed the Plant.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed mt-4 sm:mt-5 max-w-xl mx-auto [text-wrap:pretty]">
            Naati Plus focuses on the soil foundation, while Naati Pro complements the system through
            plant nutrition.
          </p>
        </div>

        {/* =======================================================================
            TWO-PRODUCT INTERCONNECTED STAGE
            Left: Naati Plus | Center: Subtle Botanical Flow | Right: Naati Pro
            ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 lg:gap-4 items-center mb-12 sm:mb-16">
          {/* PRODUCT 01: NAATI PLUS (Col 1 to 5) */}
          <div className="sys-conn-prod-left lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/15 backdrop-blur-xs">
            <div className="relative w-48 sm:w-56 md:w-64 aspect-square mb-6">
              <Image
                src="/assets/images/products/naati-plus-pack.png"
                alt="Naati Plus official pouch packaging"
                fill
                sizes="(max-width: 1024px) 240px, 300px"
                className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] select-none"
              />
            </div>

            <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-harvest mb-1">
              SOIL NUTRITION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-cream mb-2">
              Naati Plus
            </h3>
            <p className="font-sans text-sm sm:text-base text-cream/70 max-w-xs">
              Enriched vermicompost replenishing root structure and living organic carbon.
            </p>
          </div>

          {/* CENTER: CONNECTING BOTANICAL CONNECTOR (Col 6) */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center py-4">
            <svg
              className="w-16 h-12 text-harvest overflow-visible"
              viewBox="0 0 64 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                ref={connectorLineRef}
                d="M 4 12 C 24 2, 40 22, 60 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-70"
              />
              <circle cx="4" cy="12" r="3" fill="currentColor" />
              <circle cx="60" cy="12" r="3" fill="currentColor" />
            </svg>
            <span className="font-mono text-[9px] tracking-widest text-harvest/80 uppercase mt-1">
              SYNERGY
            </span>
          </div>

          {/* PRODUCT 02: NAATI PRO (Col 7 to 11) */}
          <div className="sys-conn-prod-right lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/15 backdrop-blur-xs">
            <div className="relative w-48 sm:w-56 md:w-64 aspect-square mb-6">
              <Image
                src="/assets/images/products/naati-pro-pack.png"
                alt="Naati Pro official box packaging"
                fill
                sizes="(max-width: 1024px) 240px, 300px"
                className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] select-none"
              />
            </div>

            <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-olive mb-1">
              PLANT NUTRITION
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-cream mb-2">
              Naati Pro
            </h3>
            <p className="font-sans text-sm sm:text-base text-cream/70 max-w-xs">
              Bio-activator complementing the root environment with targeted plant nutrition.
            </p>
          </div>
        </div>

        {/* =======================================================================
            ACTIONS
            ======================================================================= */}
        <div className="sys-conn-actions flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/products/naati-pro"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px]"
            aria-label="Explore Naati Pro plant nutrition"
          >
            <span>Explore Naati Pro</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/nutrition-system"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-cream/30 text-cream font-sans text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:bg-cream/10 hover:border-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 min-h-[48px]"
            aria-label="View the complete Naati crop nutrition system"
          >
            <span>View Complete System</span>
            <ArrowUpRight className="w-4 h-4 text-cream/70" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
