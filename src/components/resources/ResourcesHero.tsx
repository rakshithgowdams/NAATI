'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface ResourcesHeroProps {
  className?: string;
}

/**
 * FARMER KNOWLEDGE HUB — SECTION 01: EDITORIAL HERO
 *
 * Route: /resources
 * Label: NAATI ORGANICS / FIELD LIBRARY
 * Headline: "Knowledge for every growing season." (growing season. in Fraunces italic)
 * Supporting: "Practical guides, educational resources and field knowledge to help you understand soil health and crop nutrition."
 * CTAs: EXPLORE RESOURCES ↓ / VISIT SOIL ACADEMY ↗
 *
 * Full-bleed asymmetric split:
 * - Left 52%: Editorial typography on warm cream reading surface (data-nav-theme="light")
 * - Right 48%: Full-bleed documentary agricultural photography extending to viewport outer edge (no rounded container)
 * - Entrance animation: Label -> Headline lines -> Photograph directional mask -> paragraph & CTAs
 */
export function ResourcesHero({ className }: ResourcesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Editorial text entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.resources-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.resources-hero-title-line',
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.resources-hero-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.resources-hero-actions',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        );

      // 2. Right photograph directional mask reveal
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(8% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      // 3. Subtle internal image parallax on scroll
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -3, scale: 1.04 },
          {
            yPercent: 3,
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

  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('resource-library');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="resources-hero"
      data-nav-theme="light"
      aria-labelledby="resources-hero-heading"
      className={cn(
        'relative min-h-[100dvh] w-full flex items-stretch bg-cream text-text-primary overflow-hidden pt-24 sm:pt-28 lg:pt-0 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh]">
        {/* =====================================================================
            LEFT PANEL: EDITORIAL HEADLINE & CTAs (58% on Desktop)
            ===================================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 z-10 bg-cream">
          <div className="max-w-xl xl:max-w-2xl">
            {/* Small Editorial Eyebrow */}
            <div className="resources-hero-eyebrow flex items-center gap-3 mb-6 sm:mb-8">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-deep">
                NAATI ORGANICS / FIELD LIBRARY
              </span>
              <span className="h-px w-10 bg-forest-deep/25" aria-hidden="true" />
            </div>

            {/* Display Headline in Fraunces */}
            <h1
              id="resources-hero-heading"
              className="tracking-[-0.035em] leading-[1.05] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="resources-hero-title-line block font-display font-medium text-[clamp(2.5rem,5vw,5rem)] text-forest-deep">
                Knowledge for
              </span>
              <span className="resources-hero-title-line block font-display font-light italic text-[clamp(2.5rem,5vw,5rem)] text-forest-deep/90 mt-1">
                every growing season.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="resources-hero-desc font-sans text-base sm:text-lg lg:text-xl text-forest-deep/75 leading-relaxed mb-8 sm:mb-10 max-w-xl">
              Practical guides, educational resources and field knowledge to help you understand soil health and crop nutrition.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="resources-hero-actions flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <a
                href="#resource-library"
                onClick={scrollToLibrary}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-forest-deep text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-forest-light hover:text-forest-deep border border-forest-deep shadow-sm"
              >
                <span>EXPLORE RESOURCES</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>

              <Link
                href="/soil-academy"
                className="group inline-flex items-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium text-forest-deep hover:text-harvest transition-colors duration-200"
              >
                <span>VISIT SOIL LEARNING CENTRE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-harvest" />
              </Link>
            </div>

            {/* Subtle Editorial Footnote */}
            <div className="mt-12 sm:mt-16 pt-6 border-t border-forest-deep/10 flex items-center justify-between text-xs font-mono text-forest-deep/60">
              <span className="uppercase tracking-[0.15em]">Field Advisory Edition</span>
              <span className="hidden sm:inline-block">Karnataka & South India</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: IMMERSIVE FULL-BLEED DOCUMENTARY PHOTOGRAPHY (42% on Desktop)
            ===================================================================== */}
        <div
          ref={visualWrapperRef}
          className="lg:col-span-5 xl:col-span-5 relative min-h-[50vh] sm:min-h-[58vh] lg:min-h-full w-full overflow-hidden bg-forest-deep"
        >
          <div ref={parallaxImgRef} className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/images/resources/hero-field.jpg"
              alt="Naturally cultivated South Indian farmland in morning light with lush crop foliage and rich soil"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          {/* Subtle Ambient Grain/Light overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-black/20 pointer-events-none lg:bg-gradient-to-r lg:from-cream/10 lg:to-transparent"
            aria-hidden="true"
          />

          {/* Documentary Photo Caption Tag */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-deep/80 backdrop-blur-sm border border-cream/15 text-cream text-[11px] font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" />
              <span>Living Agro-Ecosystems • Field Observation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
