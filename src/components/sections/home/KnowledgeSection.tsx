'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface KnowledgeSectionProps {
  className?: string;
}

/**
 * HOMEPAGE SECTION 07 — KNOWLEDGE BEFORE PRODUCTS (KNOWLEDGE & FIELD NOTES)
 *
 * Editorial Agricultural Knowledge Showcase:
 * - Deep forest green background (#14240E) with data-nav-theme="dark"
 * - Asymmetric split layout (Left ~55% Photographic Visual Stage | Right ~45% Two Educational Destinations)
 * - Soil Academy & Farmer Handbook resource portals
 * - Natural scroll reveals with clip-path entrance, horizontal divider draws, and subtle parallax
 * - Concluding editorial quote: "Knowledge grows stronger roots."
 */
export function KnowledgeSection({ className }: KnowledgeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Section Header Timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.knowledge-header-trigger',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      headerTl
        .fromTo(
          '.knowledge-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.knowledge-title-main',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.knowledge-title-sub',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          '.knowledge-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      // 2. Left Editorial Visual Clip-Path Reveal
      gsap.fromTo(
        '.knowledge-visual-stage',
        { clipPath: 'inset(8% 0% 0% 0%)', opacity: 0, y: 20 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Subtle Parallax on the Visual Still
      if (parallaxImgRef.current && visualRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { y: -16 },
          {
            y: 16,
            ease: 'none',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }

      // 4. Right Column Resource Entries & Divider Animation
      const resourcesTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.knowledge-resources-trigger',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      resourcesTl
        .fromTo(
          '.knowledge-entry-1',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
        )
        .fromTo(
          '.knowledge-divider',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.75, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo(
          '.knowledge-entry-2',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          '-=0.4'
        );

      // 5. Concluding Editorial Statement Reveal
      gsap.fromTo(
        '.knowledge-conclusion',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.knowledge-conclusion',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="knowledge-field-notes"
      data-nav-theme="dark"
      aria-labelledby="knowledge-heading"
      className={cn(
        'relative w-full bg-[#14240E] text-cream overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Subtle Hairline Boundary Divider Transitioning from Section 06 */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream/15 z-10" />

      <Container size="default">
        {/* =======================================================================
            01 — SECTION INTRODUCTION
            Spacious, controlled editorial header in Fraunces & DM Sans
            ======================================================================= */}
        <div className="knowledge-header-trigger max-w-3xl mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="knowledge-eyebrow inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
              07 / KNOWLEDGE & FIELD NOTES
            </span>
          </div>

          {/* Main Heading in Fraunces */}
          <h2
            id="knowledge-heading"
            className="tracking-[-0.03em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="knowledge-title-main block font-display font-medium text-[clamp(2.15rem,4.2vw,3.75rem)] text-cream">
              Good farming begins with
            </span>
            <span className="knowledge-title-sub block mt-1 font-display italic font-normal text-harvest text-[clamp(2.15rem,4.2vw,3.75rem)]">
              understanding.
            </span>
          </h2>

          {/* Supporting Description in DM Sans */}
          <p className="knowledge-desc font-sans text-sm sm:text-base md:text-lg text-cream-muted/90 mt-3 sm:mt-4 max-w-xl leading-relaxed [text-wrap:pretty]">
            Explore the science beneath healthy soil and discover practical knowledge for stronger,
            more resilient farming.
          </p>
        </div>

        {/* =======================================================================
            02 — ASYMMETRIC EDITORIAL COMPOSITION
            Left ~55% Photographic Visual Area | Right ~45% Educational Destinations
            ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* -------------------------------------------------------------------
              LEFT COLUMN (~55% on lg): EDITORIAL VISUAL STAGE
              Living soil root matrix still with minimal annotations & parallax
              ------------------------------------------------------------------- */}
          <div ref={visualRef} className="lg:col-span-7 relative">
            <div className="knowledge-visual-stage relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-forest-surface border border-cream/15 shadow-2xl">
              {/* Inner Parallax Image Wrapper */}
              <div
                ref={parallaxImgRef}
                className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
              >
                <Image
                  src="/assets/images/academy/soil-root-matrix.jpg"
                  alt="High-resolution macro view of organic soil humus aggregates with living white mycorrhizal root fibers"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 720px"
                  priority={false}
                  quality={90}
                  className="object-cover select-none"
                />
              </div>

              {/* Tonal Vignette Overlays for Maximum Contrast & Atmosphere */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-forest-deep/40 pointer-events-none"
                aria-hidden="true"
              />

              {/* Top-Left Annotation Badge */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-deep/75 backdrop-blur-md text-cream border border-cream/15 text-[11px] font-mono tracking-wider uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                  BELOW THE SURFACE
                </span>
              </div>

              {/* Top-Right Technical Specimen Identifier */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none hidden sm:block">
                <span className="font-mono text-[10px] text-cream/70 tracking-widest uppercase px-2.5 py-1 rounded-full bg-forest-deep/60 backdrop-blur-sm border border-cream/10">
                  FIG. 07 — RHIZOSPHERE
                </span>
              </div>

              {/* Bottom Editorial Caption & Creative Detail */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 pointer-events-none flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-harvest font-semibold tracking-[0.22em] uppercase mb-1">
                    FIELD NOTE 001
                  </div>
                  <div className="font-display text-base sm:text-xl font-medium text-cream tracking-tight">
                    The Living Foundation
                  </div>
                </div>

                <span className="font-mono text-[10px] sm:text-[11px] text-cream/60 uppercase tracking-widest text-right">
                  SOIL ARCHITECTURE
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN (~45% on lg): EDUCATIONAL DESTINATIONS
              Two cleanly separated resource entries with interactive states
              ------------------------------------------------------------------- */}
          <div className="knowledge-resources-trigger lg:col-span-5 flex flex-col justify-between">
            {/* ENTRY 01: SOIL LEARNING CENTRE */}
            <Link
              href="/soil-academy"
              className="knowledge-entry-1 group block p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:bg-cream/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest/40 -mx-2 sm:-mx-5"
              aria-label="Explore Soil Learning Centre — Understand soil structure, biological activity and crop nutrition"
            >
              {/* Entry Number & Category in IBM Plex Mono */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-semibold text-harvest tracking-[0.2em] uppercase">
                  01 / LEARN THE SCIENCE
                </span>
              </div>

              {/* Resource Title in Fraunces */}
              <h3 className="font-display text-2xl sm:text-3xl text-cream font-medium tracking-[-0.02em] group-hover:text-harvest transition-colors duration-300">
                Soil Learning Centre
              </h3>

              {/* Resource Description in DM Sans */}
              <p className="font-sans text-sm sm:text-base text-cream-muted/85 mt-2 leading-relaxed [text-wrap:pretty]">
                Understand soil structure, biological activity and the foundations of healthier
                crop growth.
              </p>

              {/* Small Supporting Tag Metadata */}
              <div className="mt-3 font-mono text-[11px] text-harvest/75 tracking-wider uppercase">
                Structure / Biology / Nutrition
              </div>

              {/* CTA Link Indicator */}
              <div className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold text-cream group-hover:text-harvest transition-colors">
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover:after:w-full after:h-px after:bg-harvest after:transition-all after:duration-300">
                  Explore Soil Learning Centre
                </span>
                <ArrowRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover:translate-x-1.5" />
              </div>
            </Link>

            {/* Refined Horizontal Rule Divider */}
            <div className="knowledge-divider w-full h-px bg-cream/15 my-6 sm:my-8" />

            {/* ENTRY 02: FARMER HANDBOOK */}
            <Link
              href="/resources#resource-downloads"
              className="knowledge-entry-2 group block p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:bg-cream/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest/40 -mx-2 sm:-mx-5"
              aria-label="Open Farmer Handbook — Practical field knowledge for informed growing decisions"
            >
              {/* Entry Number & Category in IBM Plex Mono */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-semibold text-olive-light tracking-[0.2em] uppercase">
                  02 / TAKE IT TO THE FIELD
                </span>
              </div>

              {/* Resource Title in Fraunces */}
              <h3 className="font-display text-2xl sm:text-3xl text-cream font-medium tracking-[-0.02em] group-hover:text-harvest transition-colors duration-300">
                Farmer Handbook
              </h3>

              {/* Resource Description in DM Sans */}
              <p className="font-sans text-sm sm:text-base text-cream-muted/85 mt-2 leading-relaxed [text-wrap:pretty]">
                Practical field knowledge to help farmers understand soil care and make more
                informed growing decisions.
              </p>

              {/* Small Supporting Tag Metadata */}
              <div className="mt-3 font-mono text-[11px] text-olive-light/90 tracking-wider uppercase">
                Field Knowledge / Practical Guidance
              </div>

              {/* CTA Link Indicator */}
              <div className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold text-cream group-hover:text-harvest transition-colors">
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover:after:w-full after:h-px after:bg-harvest after:transition-all after:duration-300">
                  Open Farmer Handbook
                </span>
                <ArrowRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover:translate-x-1.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* =======================================================================
            03 — SECTION EXIT
            Restrained, poetic concluding statement transitioning naturally
            ======================================================================= */}
        <div className="knowledge-conclusion mt-14 sm:mt-18 md:mt-22 pt-8 sm:pt-10 border-t border-cream/15 text-center">
          <p className="font-display italic text-lg sm:text-xl text-cream-muted/80 tracking-tight">
            &ldquo;Knowledge grows stronger roots.&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias for existing naming conventions
export const Section07Knowledge = KnowledgeSection;
