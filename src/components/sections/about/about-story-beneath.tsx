'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutStoryBeneathProps {
  className?: string;
}

/**
 * ABOUT NAATI ORGANICS — SECTION 02: THE STORY BENEATH
 *
 * Asymmetrical editorial composition:
 * - Warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Left: Macro photograph of living fertile soil with organic matter and root networks
 * - Right: Why We Exist headline, two concise paragraphs, expanding divider line, and closing statement
 * - Smooth reversible ScrollTrigger entrance + micro-parallax
 */
export function AboutStoryBeneath({ className }: AboutStoryBeneathProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Image clip reveal
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(10% 0% 0% 0%)', opacity: 0, y: 28 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualWrapperRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Parallax on macro image
      if (parallaxImgRef.current && visualWrapperRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: visualWrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Right column text entrance
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.story-text-trigger',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      textTl
        .fromTo(
          '.story-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.story-headline',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.story-copy-p',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.story-divider-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo(
          '.story-closing-statement',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.4'
        );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story-beneath"
      data-nav-theme="light"
      aria-labelledby="story-beneath-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden py-18 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* Asymmetrical 2-column editorial grid: Left ~50% | Right ~50% */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 xl:gap-20 items-center">
          {/* ===================================================================
              LEFT: MACRO SOIL ECOLOGY PHOTOGRAPHY
              High-resolution documentary view of humus aggregates & mycorrhizal roots
              =================================================================== */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div
              ref={visualWrapperRef}
              className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md will-change-transform"
            >
              <div
                ref={parallaxImgRef}
                className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
              >
                <Image
                  src="/assets/images/about/living-soil-macro.jpg"
                  alt="High-resolution macro documentary photograph of dark living agricultural soil with organic matter and mycorrhizal root fibers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover object-center select-none"
                />
              </div>

              {/* Tonal Vignette */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Technical Specimen Identification Tag */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-deep/75 backdrop-blur-md text-cream border border-cream/15 text-[11px] font-mono tracking-wider uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                  FIG. 01 — LIVING RHIZOSPHERE
                </span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-cream pointer-events-none">
                <span className="font-display text-sm sm:text-base font-medium tracking-tight drop-shadow-sm">
                  Soil Biology & Root Network
                </span>
                <span className="font-mono text-[10px] tracking-widest text-cream/80 uppercase">
                  ACTIVE HUMUS
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT: WHY WE EXIST EDITORIAL STORY STATEMENT
              =================================================================== */}
          <div className="story-text-trigger lg:col-span-6 flex flex-col justify-between order-1 lg:order-2">
            <div>
              {/* Category Eyebrow in IBM Plex Mono */}
              <div className="story-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-earth" aria-hidden="true" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-earth">
                  01 / WHY WE EXIST
                </span>
              </div>

              {/* Main Headline in Fraunces */}
              <h2
                id="story-beneath-heading"
                className="story-headline font-display font-medium text-2xl sm:text-3xl lg:text-[2.5rem] xl:text-[2.75rem] text-forest leading-[1.12] tracking-[-0.03em] mb-6 sm:mb-8 [text-wrap:balance]"
              >
                The most important part of a plant is often the part we cannot see.
              </h2>

              {/* Two Short Supporting Editorial Paragraphs in DM Sans */}
              <div className="space-y-4 sm:space-y-5 text-text-secondary font-sans text-base sm:text-[17px] leading-relaxed [text-wrap:pretty]">
                <p className="story-copy-p">
                  Healthy soil is more than a growing medium. It supports roots, stores moisture,
                  provides a home for living organisms, and plays an essential role in nutrient
                  cycling.
                </p>
                <p className="story-copy-p">
                  At Naati Organics, we believe caring for this foundation is a meaningful first
                  step toward healthier, more resilient crops.
                </p>
              </div>
            </div>

            {/* Expanding Fine Divider Line */}
            <div className="story-divider-line w-full h-px bg-cream-border/90 my-8 sm:my-10" />

            {/* Concluding Editorial Statement */}
            <div className="story-closing-statement">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-olive block mb-2">
                FOUNDATIONAL PRINCIPLE
              </span>
              <p className="font-display italic text-xl sm:text-2xl text-forest font-normal leading-snug">
                &ldquo;Everything above begins with what is below.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
