'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface AcademyHeroProps {
  className?: string;
}

/**
 * SOIL ACADEMY — SECTION 01: IMMERSIVE ACADEMY HERO
 *
 * Full-Bleed Split-Screen Educational Hero:
 * - Background: Deep forest green (#14240E) with data-nav-theme="dark"
 * - Left 52%: Editorial branding ("NAATI ORGANICS / SOIL LEARNING CENTRE"),
 *   monumental Fraunces headline ("The more you understand your soil, the better you grow."),
 *   subheading ("Healthy farming starts with knowledge."), description & dual CTAs
 * - Right 48%: Full-bleed cross-sectional photograph of living soil ecosystem and root architecture
 *   reaching the outer viewport edges with zero margin and zero rounded frame
 * - Pure GSAP text choreography, clip unveil, and subtle scroll parallax
 */
export function AcademyHero({ className }: AcademyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.academy-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.academy-hero-title-line',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.academy-hero-sub',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.academy-hero-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.academy-hero-actions',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        );

      // 2. Right photograph clip reveal
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(6% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      // 3. Gentle background photo parallax on scroll
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
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
      id="academy-hero"
      data-nav-theme="dark"
      aria-labelledby="academy-hero-heading"
      className={cn(
        'relative min-h-[100dvh] w-full flex items-stretch bg-forest-deep text-cream overflow-hidden pt-24 sm:pt-28 lg:pt-0',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh]">
        {/* =====================================================================
            LEFT SIDE: EDITORIAL NARRATIVE & CTAs (Col 1 to 6 or 7)
            ===================================================================== */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 z-10">
          <div className="max-w-xl xl:max-w-2xl">
            {/* Small Editorial Eyebrow */}
            <div className="academy-hero-eyebrow flex items-center gap-3 mb-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-harvest">
                NAATI ORGANICS / SOIL LEARNING CENTRE
              </span>
              <span className="h-px w-8 bg-harvest/30" aria-hidden="true" />
            </div>

            {/* Display Headline in Fraunces */}
            <h1
              id="academy-hero-heading"
              className="tracking-[-0.035em] leading-[1.06] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="academy-hero-title-line block font-display font-medium text-[clamp(2.6rem,4.8vw,4.8rem)] text-cream">
                The more you understand your soil,
              </span>
              <span className="academy-hero-title-line block font-display font-normal italic text-harvest text-[clamp(2.35rem,4.4vw,4.4rem)] mt-1 sm:mt-2">
                the better you grow.
              </span>
            </h1>

            {/* Subheading */}
            <p className="academy-hero-sub font-display text-lg sm:text-xl md:text-2xl text-cream/90 font-light mb-4">
              Healthy farming starts with knowledge.
            </p>

            {/* Supporting Paragraph */}
            <p className="academy-hero-desc font-sans text-base sm:text-lg text-cream/75 leading-relaxed max-w-xl mb-10 [text-wrap:pretty]">
              Explore practical lessons about soil health, root development, living organisms and balanced crop nutrition.
            </p>

            {/* Actions */}
            <div className="academy-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <a
                href="#five-lessons"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px]"
                aria-label="Start Learning the five essential lessons"
              >
                <span>START LEARNING</span>
                <ArrowDownRight className="w-4 h-4 text-forest-deep" />
              </a>

              <a
                href="#living-soil-explorer"
                className="inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-cream/80 hover:text-harvest transition-colors py-3"
                aria-label="Explore the interactive soil science visual"
              >
                <span>EXPLORE SOIL SCIENCE</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT SIDE: FULL-BLEED LIVING SOIL ECOSYSTEM PHOTOGRAPH
            Extends completely to the top, bottom, and right edge of viewport
            ===================================================================== */}
        <div className="lg:col-span-6 xl:col-span-5 relative min-h-[440px] sm:min-h-[540px] lg:min-h-full overflow-hidden bg-forest-deep/10">
          <div
            ref={visualWrapperRef}
            className="relative w-full h-full min-h-[440px] sm:min-h-[540px] lg:min-h-full overflow-hidden"
          >
            <div
              ref={parallaxImgRef}
              className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
            >
              <Image
                src="/assets/images/soil-academy/hero-soil-profile.jpg"
                alt="Photorealistic cross-sectional soil profile beneath healthy green crop showing roots, crumbly aggregates, and subterranean earthworm life"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-cover object-center"
              />
              {/* Natural blend gradient on mobile */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent lg:hidden"
                aria-hidden="true"
              />
            </div>

            {/* Corner Editorial Label */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 bg-forest-deep/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-cream/20">
              <span className="font-mono text-xs tracking-wider uppercase text-harvest font-semibold">
                BIOLOGICALLY ACTIVE RHIZOSPHERE PROFILE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
