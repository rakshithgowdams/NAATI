'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface NutritionEditorialChaptersProps {
  className?: string;
}

/**
 * THE NAATI NUTRITION SYSTEM — SECTION 04: PRODUCT EDITORIAL CHAPTERS
 *
 * Two Complementary Full-Bleed Split-Screen Chapters:
 * - CHAPTER A (Below The Surface / Naati Plus):
 *   Left: Full-bleed living soil macro photography reaching left edge
 *   Right: Warm cream editorial typography with right container alignment
 *
 * - CHAPTER B (Above The Surface / Naati Pro):
 *   Left: Warm cream editorial typography with left container alignment
 *   Right: Full-bleed flourishing green crops photography reaching right edge
 *
 * - Zero rounded corners, zero outer margins, seamless full-panel edge integration
 * - Mobile: Clean natural stack with edge-to-edge photography
 * - Subtle GSAP scroll parallax + progressive text entrance
 */
export function NutritionEditorialChapters({ className }: NutritionEditorialChaptersProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chapterAParallaxRef = useRef<HTMLDivElement>(null);
  const chapterBParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Chapter A Parallax
      if (chapterAParallaxRef.current) {
        gsap.fromTo(
          chapterAParallaxRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: '#chapter-below-surface',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }

      // Chapter B Parallax
      if (chapterBParallaxRef.current) {
        gsap.fromTo(
          chapterBParallaxRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: '#chapter-above-surface',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }

      // Staggered text reveals for Chapter A
      gsap.fromTo(
        '.chapter-a-reveal',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#chapter-below-surface',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Staggered text reveals for Chapter B
      gsap.fromTo(
        '.chapter-b-reveal',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#chapter-above-surface',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={cn('relative w-full overflow-hidden', className)}>
      {/* =======================================================================
          CHAPTER A — BELOW THE SURFACE (NAATI PLUS)
          Split: Left 48% Full-Bleed Soil Photography | Right 52% Editorial Text
          ======================================================================= */}
      <section
        id="chapter-below-surface"
        data-nav-theme="light"
        aria-label="Chapter 01: Naati Plus — The foundation comes first."
        className="relative w-full bg-[#F5F1E7] text-forest border-t border-cream-border/70"
      >
        <div className="flex flex-col lg:flex-row w-full min-h-[auto] lg:min-h-[75vh]">
          {/* LEFT: FULL-BLEED LIVING SOIL MACRO (Reaches top, bottom, left edges) */}
          <div className="w-full lg:w-[48%] xl:w-[46%] relative min-h-[360px] sm:min-h-[440px] lg:min-h-full self-stretch order-2 lg:order-1">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-cream-deep">
              <div
                ref={chapterAParallaxRef}
                className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
              >
                <Image
                  src="/assets/images/nutrition/soil-foundation-macro.jpg"
                  alt="High-resolution macro documentary photograph of dark living soil with vermicompost aggregates and organic matter"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  quality={92}
                  className="object-cover object-center select-none"
                />
              </div>

              {/* Architectural Hairline Divider on Right Edge (Desktop) */}
              <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-cream-border/70 z-10" />

              {/* Bottom Subtle Vignette for Tag Contrast */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/15 to-transparent pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* Corner Photographic Tag */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20 flex items-center justify-between text-cream pointer-events-none">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-cream/90 flex items-center gap-2 drop-shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth" />
                  RHIZOSPHERE SUBSTRATE
                </span>
                <span className="font-mono text-[10px] tracking-wider text-cream/75 uppercase drop-shadow-sm">
                  ENRICHED VERMICOMPOST
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: EDITORIAL TEXT (Warm cream with container right alignment) */}
          <div className="w-full lg:w-[52%] xl:w-[54%] flex flex-col justify-center py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:pl-16 xl:pl-20 lg:pr-[max(3rem,calc((100vw-1440px)/2+3rem))] order-1 lg:order-2">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="chapter-a-reveal inline-flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-earth" aria-hidden="true" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-earth">
                  01 / NAATI PLUS
                </span>
              </div>

              {/* Fraunces Headline */}
              <h3 className="chapter-a-reveal font-display text-[clamp(2.25rem,4vw,3.75rem)] text-forest font-medium tracking-[-0.03em] leading-[1.08] [text-wrap:balance] mb-6">
                The foundation comes first.
              </h3>

              {/* Short Description */}
              <p className="chapter-a-reveal font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-8 [text-wrap:pretty]">
                Support the soil&apos;s organic foundation and create healthier conditions for root
                development.
              </p>

              {/* Interactive CTA */}
              <div className="chapter-a-reveal pt-2">
                <Link
                  href="/products/naati-plus"
                  className="group inline-flex items-center gap-3 font-mono text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-forest hover:text-earth transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded py-1"
                  aria-label="Discover Naati Plus product details"
                >
                  <span>Discover Naati Plus</span>
                  <span className="w-7 h-7 rounded-full bg-cream-light border border-cream-border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 shadow-warm-xs">
                    <ArrowUpRight className="w-3.5 h-3.5 text-forest group-hover:text-earth transition-colors" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          CHAPTER B — ABOVE THE SURFACE (NAATI PRO)
          Reversed Split: Left 52% Editorial Text | Right 48% Full-Bleed Crop Photography
          ======================================================================= */}
      <section
        id="chapter-above-surface"
        data-nav-theme="light"
        aria-label="Chapter 02: Naati Pro — Then, support the growth."
        className="relative w-full bg-[#F5F1E7] text-forest border-t border-cream-border/70"
      >
        <div className="flex flex-col lg:flex-row w-full min-h-[auto] lg:min-h-[75vh]">
          {/* LEFT: EDITORIAL TEXT (Warm cream with container left alignment) */}
          <div className="w-full lg:w-[52%] xl:w-[54%] flex flex-col justify-center py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pr-16 xl:pr-20">
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="chapter-b-reveal inline-flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                  02 / NAATI PRO
                </span>
              </div>

              {/* Fraunces Headline */}
              <h3 className="chapter-b-reveal font-display text-[clamp(2.25rem,4vw,3.75rem)] text-forest font-medium tracking-[-0.03em] leading-[1.08] [text-wrap:balance] mb-6">
                Then, support the growth.
              </h3>

              {/* Short Description */}
              <p className="chapter-b-reveal font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-8 [text-wrap:pretty]">
                Complement soil health with a focused approach to plant nutrition throughout crop
                development.
              </p>

              {/* Interactive CTA */}
              <div className="chapter-b-reveal pt-2">
                <Link
                  href="/products/naati-pro"
                  className="group inline-flex items-center gap-3 font-mono text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-forest hover:text-olive transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded py-1"
                  aria-label="Discover Naati Pro product details"
                >
                  <span>Discover Naati Pro</span>
                  <span className="w-7 h-7 rounded-full bg-cream-light border border-cream-border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 shadow-warm-xs">
                    <ArrowUpRight className="w-3.5 h-3.5 text-forest group-hover:text-olive transition-colors" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: FULL-BLEED THRIVING CROP PHOTOGRAPHY (Reaches top, bottom, right edges) */}
          <div className="w-full lg:w-[48%] xl:w-[46%] relative min-h-[360px] sm:min-h-[440px] lg:min-h-full self-stretch">
            <div className="relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-cream-deep">
              <div
                ref={chapterBParallaxRef}
                className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
              >
                <Image
                  src="/assets/images/nutrition/crop-growth-above.jpg"
                  alt="Lush green organic crop canopy thriving under bright natural sunlight in Karnataka agricultural farm"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  quality={92}
                  className="object-cover object-center select-none"
                />
              </div>

              {/* Architectural Hairline Divider on Left Edge (Desktop) */}
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-cream-border/70 z-10" />

              {/* Bottom Subtle Vignette for Tag Contrast */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/15 to-transparent pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* Corner Photographic Tag */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20 flex items-center justify-between text-cream pointer-events-none">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-cream/90 flex items-center gap-2 drop-shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  FOLIAR & VEGETATIVE VIGOR
                </span>
                <span className="font-mono text-[10px] tracking-wider text-cream/75 uppercase drop-shadow-sm">
                  BIO-ACTIVATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
