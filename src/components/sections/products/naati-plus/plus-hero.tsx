'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface PlusHeroProps {
  className?: string;
}

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 01: IMMERSIVE PRODUCT HERO
 *
 * Product-First Dark Forest Hero:
 * - Deep forest green (#14240E) background with data-nav-theme="dark"
 * - Left: Monumental Fraunces headline ("Build the Soil."), metadata badges, description & CTAs
 * - Right: Approved Naati Plus pouch package displayed in a premium studio setting
 * - Pure GSAP text choreography, package upward entrance, and subtle scroll parallax
 */
export function PlusHero({ className }: PlusHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const bgTextureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Staggered text entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.plus-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.plus-hero-title-line',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.plus-hero-desc',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.plus-hero-pills',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        )
        .fromTo(
          '.plus-hero-actions',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        );

      // 2. Product package entrance with soft float
      if (packageRef.current) {
        gsap.fromTo(
          packageRef.current,
          { opacity: 0, y: 36, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // 3. Subtle background parallax on scroll
      if (bgTextureRef.current) {
        gsap.fromTo(
          bgTextureRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
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
      id="naati-plus-hero"
      data-nav-theme="dark"
      aria-label="Naati Plus — Build the Soil. Where healthier growth begins."
      className={cn(
        'relative w-full min-h-[90svh] lg:min-h-screen bg-[#14240E] text-cream overflow-hidden pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 sm:pb-20 md:pb-24 selection:bg-harvest selection:text-forest-deep flex items-center',
        className
      )}
    >
      {/* Background restrained botanical radiance texture */}
      <div
        ref={bgTextureRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-olive/15 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[420px] h-[420px] rounded-full bg-harvest/10 blur-[130px]" />
      </div>

      <Container size="default" className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-18 items-center">
          {/* ===================================================================
              LEFT COLUMN: PRODUCT HEADLINE & EDITORIAL DETAILS (Col 1 to 7)
              =================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Monospace Eyebrow */}
            <div className="plus-hero-eyebrow inline-flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
                01 / SOIL NUTRITION
              </span>
            </div>

            {/* Display Headline in Fraunces */}
            <h1 className="tracking-[-0.035em] leading-[1.04] [text-wrap:balance] mb-6 sm:mb-8">
              <span className="plus-hero-title-line block font-display font-medium text-[clamp(2.75rem,5.4vw,5.5rem)] text-cream">
                Build the Soil.
              </span>
              <span className="plus-hero-title-line block font-display font-normal italic text-harvest text-[clamp(2.75rem,5.4vw,5.5rem)] mt-1 sm:mt-2">
                Where healthier growth begins.
              </span>
            </h1>

            {/* Short Product Description in DM Sans */}
            <p className="plus-hero-desc font-sans text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed max-w-xl mb-8 [text-wrap:pretty]">
              Naati Plus is an enriched vermicompost designed to support the organic foundation of
              healthy soil.
            </p>

            {/* Compact Technical Pills */}
            <div className="plus-hero-pills flex flex-wrap items-center gap-3 mb-10">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-cream/90 bg-cream/10 border border-cream/20 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                ENRICHED VERMICOMPOST
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-harvest bg-harvest/10 border border-harvest/30 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                THE SOIL-FIRST APPROACH
              </span>
            </div>

            {/* Actions */}
            <div className="plus-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <Link
                href="/contact?product=naati-plus"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px]"
                aria-label="Request product information for Naati Plus"
              >
                <span>Request Product Information</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="#understanding-naati-plus"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-cream/30 text-cream font-sans text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:bg-cream/10 hover:border-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 min-h-[48px]"
                aria-label="Explore the science of Naati Plus"
              >
                <span>Explore the Science</span>
                <ArrowDown className="w-4 h-4 text-cream/70" />
              </a>
            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: APPROVED NAATI PLUS PACKAGING (Col 8 to 12)
              =================================================================== */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div
              ref={packageRef}
              className="relative w-full max-w-[440px] aspect-square flex items-center justify-center will-change-transform"
            >
              {/* Grounded Soft Shadow */}
              <div
                className="absolute bottom-6 w-3/4 h-8 bg-black/40 blur-2xl rounded-full"
                aria-hidden="true"
              />

              {/* Exact Approved Packaging Visual */}
              <Image
                src="/assets/images/products/naati-plus-pack.png"
                alt="Naati Plus Enriched Vermicompost official standing product pouch package"
                width={800}
                height={800}
                priority
                quality={92}
                className="relative z-10 w-full h-auto object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
