'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface PlusUnderstandingProps {
  className?: string;
}

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 02: UNDERSTANDING NAATI PLUS
 *
 * Full-Bleed Split-Screen Editorial Section:
 * - Warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Left 52%: Editorial statement & understanding ("Soil is more than a growing medium.")
 * - Right 48%: Full-bleed macro photograph of living soil and organic compost reaching right edge
 * - Corner caption: "THE FOUNDATION BENEATH GROWTH"
 * - Smooth vertical clip reveal & subtle parallax
 */
export function PlusUnderstanding({ className }: PlusUnderstandingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text reveal on scroll
      gsap.fromTo(
        '.plus-under-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Right panel clip reveal
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(8% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualWrapperRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Subtle image parallax on scroll
      if (parallaxImgRef.current && visualWrapperRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: visualWrapperRef.current,
              start: 'top bottom',
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
      id="understanding-naati-plus"
      data-nav-theme="light"
      aria-label="Understanding Naati Plus — Soil is more than a growing medium."
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden border-t border-cream-border/70 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-[auto] lg:min-h-[80vh]">
        {/* ===================================================================
            LEFT PANEL (52% on desktop): EDITORIAL STATEMENT
            =================================================================== */}
        <div className="w-full lg:w-[52%] xl:w-[50%] flex flex-col justify-center py-16 sm:py-20 md:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pr-14 xl:pr-20 z-10">
          <div className="max-w-xl">
            {/* Monospace Eyebrow */}
            <div className="plus-under-reveal inline-flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                02 / THE FOUNDATION
              </span>
            </div>

            {/* Display Headline in Fraunces */}
            <h2 className="plus-under-reveal font-display text-[clamp(2.25rem,4.4vw,4.25rem)] text-forest font-medium tracking-[-0.035em] leading-[1.08] [text-wrap:balance] mb-6 sm:mb-8">
              Soil is more than a growing medium.
            </h2>

            {/* Supporting Statement in DM Sans */}
            <p className="plus-under-reveal font-sans text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-6 [text-wrap:pretty]">
              A healthy root environment depends on organic matter, favourable soil structure and
              active soil biology.
            </p>

            <p className="plus-under-reveal font-sans text-sm sm:text-base text-text-muted leading-relaxed [text-wrap:pretty]">
              When soil loses its organic foundation, plants struggle to access moisture and nutrients
              regardless of surface inputs. Naati Plus is formulated to address this biological reality.
            </p>
          </div>
        </div>

        {/* ===================================================================
            RIGHT PANEL (48% on desktop): FULL-BLEED LIVING SOIL MACRO
            =================================================================== */}
        <div className="w-full lg:w-[48%] xl:w-[50%] relative min-h-[360px] sm:min-h-[440px] lg:min-h-full self-stretch order-last">
          <div
            ref={visualWrapperRef}
            className="relative w-full h-full min-h-[360px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-cream-deep"
          >
            {/* Parallax Image Element */}
            <div
              ref={parallaxImgRef}
              className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
            >
              <Image
                src="/assets/images/nutrition/soil-foundation-macro.jpg"
                alt="Macro photograph of organically rich living soil, compost texture and fine roots"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-cover object-center select-none"
              />
            </div>

            {/* Architectural Hairline Divider on Left Edge (Desktop) */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-cream-border/70 z-10" />

            {/* Bottom Atmospheric Vignette for Caption Contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/15 to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Corner Editorial Caption */}
            <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 z-20 flex items-center justify-between text-cream pointer-events-none">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-cream/90 flex items-center gap-2 drop-shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                THE FOUNDATION BENEATH GROWTH
              </span>
              <span className="font-mono text-[10px] tracking-wider text-cream/75 uppercase drop-shadow-sm">
                SOIL MORPHOLOGY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
