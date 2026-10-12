'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface CropHeroProps {
  className?: string;
}

/**
 * CROP SOLUTIONS PAGE — SECTION 01: IMMERSIVE HERO
 *
 * Full-Bleed Split-Screen Hero:
 * - Background: Warm cream (#F5F1E7) on the left, full-bleed agricultural photo on the right
 * - data-nav-theme="light" for transparent adaptive navbar
 * - Left side (approx. 50%): Editorial typography & narrative
 *   - Eyebrow: "01 / CROP SOLUTIONS"
 *   - Main headline: "Every crop is different."
 *   - Italic supporting headline: "Every strong harvest begins beneath."
 *   - Description: "From vegetables and spices to field crops, explore the role of healthy soil and balanced plant nutrition across different growing systems."
 *   - CTA: "Explore Crops ↓" (smooth scrolls to #crop-atlas)
 * - Right side (approx. 50%): Full-bleed Karnataka agricultural field photograph touching top, bottom, and right edge of viewport
 * - Pure GSAP text choreography, subtle image parallax, natural upward scroll
 */
export function CropHero({ className }: CropHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Staggered text entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.crop-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.crop-hero-title-line',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.crop-hero-desc',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.crop-hero-cta',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        );

      // 2. Right image clip reveal
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

      // 3. Gentle background photo parallax
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
      id="crop-solutions-hero"
      data-nav-theme="light"
      aria-labelledby="crop-hero-heading"
      className={cn(
        'relative min-h-[100dvh] w-full flex items-stretch bg-cream text-forest-deep overflow-hidden pt-24 sm:pt-28 lg:pt-0',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh]">
        {/* =====================================================================
            LEFT SIDE: EDITORIAL CONTENT (Col 1 to 6)
            Generous breathing space, Fraunces typography, clear hierarchy
            ===================================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 z-10">
          <div className="max-w-xl">
            {/* Small Editorial Eyebrow */}
            <div className="crop-hero-eyebrow flex items-center gap-3 mb-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
                01 / CROP SOLUTIONS
              </span>
              <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
              <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
                AGRONOMIC FIELD GUIDE
              </span>
            </div>

            {/* Display Headline in Fraunces */}
            <h1
              id="crop-hero-heading"
              className="tracking-[-0.035em] leading-[1.05] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="crop-hero-title-line block font-display font-medium text-[clamp(2.75rem,5.2vw,5.2rem)] text-forest-deep">
                Every crop is different.
              </span>
              <span className="crop-hero-title-line block font-display font-normal italic text-forest-medium text-[clamp(2.35rem,4.5vw,4.6rem)] mt-1 sm:mt-2">
                Every strong harvest begins beneath.
              </span>
            </h1>

            {/* Short Editorial Description */}
            <p className="crop-hero-desc font-sans text-base sm:text-lg md:text-xl text-forest-deep/80 leading-relaxed max-w-xl mb-10 [text-wrap:pretty]">
              From vegetables and spices to field crops, explore the role of healthy soil and balanced plant nutrition across different growing systems.
            </p>

            {/* Action CTA */}
            <div className="crop-hero-cta flex items-center">
              <a
                href="#crop-atlas"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-forest-deep text-cream font-sans text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 hover:bg-forest-medium hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep min-h-[48px]"
                aria-label="Explore the Crop Atlas"
              >
                <span>Explore Crops</span>
                <ArrowDown className="w-4 h-4 text-cream/80" />
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT SIDE: FULL-BLEED KARNATAKA FIELD PHOTOGRAPH (Col 7 to 12)
            Extends completely to the viewport edge. No margins. No rounded frame.
            ===================================================================== */}
        <div className="lg:col-span-6 relative min-h-[420px] sm:min-h-[520px] lg:min-h-full overflow-hidden bg-forest-deep/5">
          <div
            ref={visualWrapperRef}
            className="relative w-full h-full min-h-[420px] sm:min-h-[520px] lg:min-h-full overflow-hidden"
          >
            <div
              ref={parallaxImgRef}
              className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
            >
              <Image
                src="/assets/images/crop-solutions/hero.jpg"
                alt="Panoramic early morning agricultural field in Karnataka with furrowed red-loam earth and vibrant green crops"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-cover object-center"
              />
              {/* Subtle natural tonal overlay on mobile for smooth blend */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent lg:hidden"
                aria-hidden="true"
              />
            </div>

            {/* Editorial Corner Badge */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 bg-forest-deep/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-cream/20">
              <span className="font-mono text-xs tracking-wider uppercase text-harvest font-semibold">
                KARNATAKA AGRICULTURAL FIELD · MORNING SUNLIGHT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
