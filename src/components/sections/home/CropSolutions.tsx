'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ArrowDown } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { CROP_SOLUTIONS } from '@/data/cropSolutions';

export interface CropSolutionsProps {
  className?: string;
}

/**
 * HOMEPAGE SECTION 06 — INTERACTIVE CROP SOLUTIONS
 *
 * Sticky, Scroll-Driven Editorial Crop Showcase:
 * - Continuous warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Section introduction scrolls naturally away as visitor enters sticky showcase
 * - Pinned desktop scroll journey (~280vh) transitioning across 5 deterministic crop stages
 * - Smooth reversible crossfade & subtle cinematic depth on the photographic visual stage
 * - Clickable editorial selector synced directly with scroll position (single source of truth)
 * - Dynamic two-stage nutrition summary (Naati Plus -> Naati Pro) with zero height jumps
 * - Compact unpinned tabbed layout on mobile (< 1024px) with touch-friendly targets
 * - Smooth release into natural flow and animated closing CTA linking to /crop-solutions
 */
export function CropSolutions({ className }: CropSolutionsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const showcaseStageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Active crop helper
  const activeCrop = CROP_SOLUTIONS[activeIndex] ?? CROP_SOLUTIONS[0];

  // Smooth scroll to stage when clicking selector on desktop & center chip on mobile
  const handleSelectCrop = useCallback((index: number) => {
    setActiveIndex(index);

    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const progressTargets = [0.06, 0.28, 0.50, 0.72, 0.94];
      const targetProgress = progressTargets[index];
      const targetScroll = st.start + targetProgress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else if (typeof document !== 'undefined') {
      const tabEl = document.getElementById(`crop-tab-mobile-${CROP_SOLUTIONS[index]?.id}`);
      if (tabEl) {
        tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // =======================================================================
      // 1. HEADER ENTRANCE ANIMATION (Scrolls naturally away)
      // =======================================================================
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        headerTl
          .fromTo(
            '.crop-header-eyebrow',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
          .fromTo(
            '.crop-header-title-main',
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            '.crop-header-title-sub',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.45'
          )
          .fromTo(
            '.crop-header-desc',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          );
      }

      // =======================================================================
      // 2. DESKTOP STICKY SCROLL-DRIVEN SHOWCASE (>= 1024px)
      // =======================================================================
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (!pinWrapperRef.current || !showcaseStageRef.current) return;

        let currentStage = 0;

        const st = ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
          pin: showcaseStageRef.current,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // 5 deterministic intervals across 0.0 to 1.0 progress
            let newStage = 0;
            if (p < 0.20) newStage = 0;
            else if (p < 0.40) newStage = 1;
            else if (p < 0.60) newStage = 2;
            else if (p < 0.80) newStage = 3;
            else newStage = 4;

            // Continuous 60fps progress bar update directly on DOM ref
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.min(100, Math.max(4, Math.round(p * 100)))}%`;
            }

            // Subtle cinematic depth / vertical parallax within active photograph
            if (parallaxRef.current) {
              const yShift = (p - 0.5) * 22;
              parallaxRef.current.style.transform = `translateY(${yShift.toFixed(1)}px)`;
            }

            // Only trigger React state change when active stage actually changes
            if (newStage !== currentStage) {
              currentStage = newStage;
              setActiveIndex(newStage);
            }
          },
        });

        scrollTriggerRef.current = st;
      });

      // =======================================================================
      // 3. CLOSING CTA REVEAL ANIMATION
      // =======================================================================
      if (ctaContainerRef.current) {
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: ctaContainerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        ctaTl
          .fromTo(
            '.crop-cta-divider',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
          )
          .fromTo(
            '.crop-cta-content',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
            '-=0.4'
          );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="crop-solutions"
      data-nav-theme="light"
      aria-labelledby="crop-solutions-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Subtle Hairline Boundary Divider Transitioning from Section 05 */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-10" />

      {/* =======================================================================
          01 — SECTION INTRODUCTION (Normal Document Flow)
          Scrolls naturally out of view as visitor enters the sticky showcase
          ======================================================================= */}
      <div
        ref={headerRef}
        className="relative w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-14"
      >
        <Container size="default">
          <div className="max-w-3xl">
            {/* Eyebrow in IBM Plex Mono */}
            <div className="crop-header-eyebrow inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                06 / CROP SOLUTIONS
              </span>
            </div>

            {/* Main Headline in Fraunces */}
            <h2
              id="crop-solutions-heading"
              className="tracking-[-0.03em] leading-[1.08] [text-wrap:balance]"
            >
              <span className="crop-header-title-main block font-display font-medium text-[clamp(2.15rem,4.2vw,3.75rem)] text-forest">
                Every crop has a story.
              </span>
              <span className="crop-header-title-sub block mt-1 font-display italic font-normal text-olive text-[clamp(2.15rem,4.2vw,3.75rem)]">
                Start with yours.
              </span>
            </h2>

            {/* Supporting Description in DM Sans */}
            <p className="crop-header-desc font-sans text-sm sm:text-base md:text-lg text-text-secondary mt-3 sm:mt-4 max-w-xl leading-relaxed [text-wrap:pretty]">
              From vegetables to field crops, explore how soil and plant nutrition work together.
            </p>
          </div>
        </Container>
      </div>

      {/* =======================================================================
          02 — STICKY SCROLL-DRIVEN CROP SHOWCASE
          Desktop (>= 1024px): Pinned ~280vh scroll journey
          Mobile (< 1024px): Responsive unpinned gallery with tap-based chips
          ======================================================================= */}
      <div ref={pinWrapperRef} className="crop-showcase-pin-wrapper relative w-full">
        <div
          ref={showcaseStageRef}
          className="crop-showcase-stage w-full lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:py-12"
        >
          <Container size="default">
            {/* Mobile/Tablet Horizontal Chip Selector (< 1024px) */}
            <div
              role="tablist"
              aria-label="Crop categories"
              aria-orientation="horizontal"
              className="flex lg:hidden overflow-x-auto scrollbar-none gap-2 pb-2 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {CROP_SOLUTIONS.map((crop, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={crop.id}
                    type="button"
                    role="tab"
                    id={`crop-tab-mobile-${crop.id}`}
                    aria-selected={isActive}
                    aria-controls="crop-guidance-panel"
                    onClick={() => handleSelectCrop(idx)}
                    className={cn(
                      'shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all min-h-[44px]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 select-none cursor-pointer',
                      isActive
                        ? 'bg-forest text-cream shadow-warm-xs'
                        : 'bg-cream-light text-forest/80 border border-cream-border/90 hover:bg-cream-deep'
                    )}
                  >
                    <span
                      className={cn(
                        'font-mono text-[10px]',
                        isActive ? 'text-harvest' : 'text-text-muted'
                      )}
                    >
                      {crop.index}
                    </span>
                    <span className="font-sans whitespace-nowrap">{crop.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Asymmetric Split Layout: Left Photographic Stage (56%) | Right Selector & Guidance (44%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
              {/* -----------------------------------------------------------------
                  LEFT COLUMN (~56% on lg): CINEMATIC PHOTOGRAPHIC VISUAL STAGE
                  Consistent 4:3 aspect ratio with seamless layered crossfades
                  ----------------------------------------------------------------- */}
              <div className="lg:col-span-7 relative">
                <div
                  ref={parallaxRef}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-cream-deep border border-cream-border/80 shadow-warm-md will-change-transform"
                >
                  {/* Floating Category Tag Badge */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-deep/75 backdrop-blur-md text-cream border border-cream/15 text-[11px] font-mono tracking-wider uppercase shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                      {activeCrop.tag}
                    </span>
                  </div>

                  {/* Pre-rendered Stack of all 5 Photographic Assets (Zero-Flicker Transitions) */}
                  {CROP_SOLUTIONS.map((crop, idx) => {
                    const isCurrent = idx === activeIndex;
                    const isPast = idx < activeIndex;

                    return (
                      <div
                        key={crop.id}
                        aria-hidden={!isCurrent}
                        className={cn(
                          'absolute inset-0 w-full h-full will-change-transform transition-all duration-500 ease-out',
                          isCurrent
                            ? 'opacity-100 scale-100 translate-y-0 z-10'
                            : isPast
                            ? 'opacity-0 scale-[1.035] -translate-y-2 z-0 pointer-events-none'
                            : 'opacity-0 scale-[0.98] translate-y-2 z-0 pointer-events-none'
                        )}
                      >
                        <Image
                          src={crop.imageSrc}
                          alt={crop.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 760px"
                          priority={idx <= 1}
                          quality={90}
                          className="object-cover select-none"
                        />

                        {/* Gentle bottom shadow gradient for caption contrast */}
                        <div
                          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-deep/55 via-forest-deep/20 to-transparent pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Active Crop Name Caption on Image */}
                        <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-cream pointer-events-none">
                          <span className="font-display text-lg sm:text-xl font-medium tracking-tight drop-shadow-sm">
                            {crop.name}
                          </span>
                          <span className="font-mono text-xs text-cream/90 tracking-wider">
                            {crop.index} / 05
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* -----------------------------------------------------------------
                  RIGHT COLUMN (~44% on lg): EDITORIAL SELECTOR & GUIDANCE PANEL
                  Synchronized with scroll progress, clickable to navigate stages
                  ----------------------------------------------------------------- */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                {/* Desktop Editorial Navigation Header & Progress Indicator */}
                <div className="hidden lg:flex items-center justify-between mb-4 pb-2.5 border-b border-cream-border/70">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-olive uppercase tracking-widest">
                      CROP JOURNEY
                    </span>
                    <span className="font-mono text-xs font-bold text-forest">
                      {activeCrop.index} / 05
                    </span>
                  </div>

                  {/* 5-Stage Continuous Scroll Progress Bar */}
                  <div
                    className="w-28 h-1 bg-cream-border/60 rounded-full overflow-hidden"
                    title="Crop explore progress"
                  >
                    <div
                      ref={progressBarRef}
                      className="h-full bg-forest rounded-full transition-[width] duration-150 ease-out"
                      style={{ width: `${((activeIndex + 1) / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Desktop Vertical Indexed Navigation Rows (>= 1024px) */}
                <div
                  role="tablist"
                  aria-label="Crop categories"
                  aria-orientation="vertical"
                  className="hidden lg:flex flex-col space-y-1.5 mb-6"
                >
                  {CROP_SOLUTIONS.map((crop, idx) => {
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={crop.id}
                        type="button"
                        role="tab"
                        id={`crop-tab-${crop.id}`}
                        aria-selected={isActive}
                        aria-controls="crop-guidance-panel"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleSelectCrop(idx)}
                        className={cn(
                          'w-full text-left py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-between group relative cursor-pointer select-none',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20',
                          isActive
                            ? 'bg-cream-light/95 text-forest shadow-warm-xs border border-cream-border/90'
                            : 'text-text-secondary hover:text-forest hover:bg-cream-light/40 border border-transparent'
                        )}
                      >
                        {/* Left: Growing Indicator Bar, Index & Crop Name */}
                        <div className="flex items-center gap-3.5">
                          <span
                            className={cn(
                              'w-1 rounded-full transition-all duration-300',
                              isActive
                                ? 'h-5 bg-forest opacity-100'
                                : 'h-1.5 bg-transparent opacity-0 group-hover:bg-olive/40 group-hover:opacity-100'
                            )}
                            aria-hidden="true"
                          />

                          <span
                            className={cn(
                              'font-mono text-xs tracking-wider transition-all duration-300',
                              isActive
                                ? 'font-bold text-olive scale-105'
                                : 'font-medium text-text-muted group-hover:text-olive'
                            )}
                          >
                            {crop.index}
                          </span>

                          <span
                            className={cn(
                              'font-sans text-sm sm:text-base tracking-[-0.01em] transition-all duration-300',
                              isActive
                                ? 'font-bold text-forest'
                                : 'font-medium text-forest/75 group-hover:text-forest'
                            )}
                          >
                            {crop.name}
                          </span>
                        </div>

                        {/* Right: Active Sliding Indicator Arrow */}
                        <ArrowRight
                          className={cn(
                            'w-4 h-4 transition-all duration-300 shrink-0',
                            isActive
                              ? 'text-forest opacity-100 translate-x-1'
                              : 'text-text-muted/30 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Product Guidance Panel: Stable Dimensions with Upward Revealing Content */}
                <div
                  id="crop-guidance-panel"
                  role="tabpanel"
                  aria-labelledby={`crop-tab-${activeCrop.id}`}
                  className="relative p-4 xs:p-5 sm:p-6 rounded-2xl bg-cream-light/90 border border-cream-border/90 shadow-warm-xs backdrop-blur-xs min-h-[250px] xs:min-h-[230px] flex flex-col justify-between overflow-hidden"
                >
                  {CROP_SOLUTIONS.map((crop, idx) => {
                    const isCurrent = idx === activeIndex;
                    const isPast = idx < activeIndex;

                    return (
                      <div
                        key={crop.id}
                        aria-hidden={!isCurrent}
                        className={cn(
                          'w-full flex flex-col justify-between h-full transition-all duration-400 ease-out',
                          isCurrent
                            ? 'relative opacity-100 translate-y-0 z-10 pointer-events-auto'
                            : isPast
                            ? 'absolute inset-0 p-4 xs:p-5 sm:p-6 opacity-0 -translate-y-3 z-0 pointer-events-none'
                            : 'absolute inset-0 p-4 xs:p-5 sm:p-6 opacity-0 translate-y-3 z-0 pointer-events-none'
                        )}
                      >
                        {/* Two-Stage Guidance Layout */}
                        <div className="space-y-3.5">
                          {/* Stage 01: Naati Plus */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-earth" aria-hidden="true" />
                              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-earth tracking-[0.16em] uppercase">
                                {crop.naatiPlus.stage}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                              <h4 className="font-display font-medium text-lg sm:text-xl text-forest tracking-[-0.02em]">
                                {crop.naatiPlus.product}
                              </h4>
                              <span className="font-sans text-xs sm:text-sm text-text-secondary leading-snug">
                                — {crop.naatiPlus.application}
                              </span>
                            </div>
                          </div>

                          {/* Fine Connector Line Between Stages */}
                          <div className="flex items-center gap-3 py-0.5">
                            <div className="w-6 h-px bg-cream-border" />
                            <ArrowDown className="w-3.5 h-3.5 text-olive stroke-[2.5]" />
                            <span className="font-mono text-[10px] text-olive font-semibold tracking-wider uppercase">
                              COMPLETE SYSTEM
                            </span>
                            <div className="flex-1 h-px bg-cream-border" />
                          </div>

                          {/* Stage 02: Naati Pro */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
                              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-olive tracking-[0.16em] uppercase">
                                {crop.naatiPro.stage}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                              <h4 className="font-display font-medium text-lg sm:text-xl text-forest tracking-[-0.02em]">
                                {crop.naatiPro.product}
                              </h4>
                              <span className="font-sans text-xs sm:text-sm text-text-secondary leading-snug">
                                — {crop.naatiPro.application}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Timing & Indicative Note Footer */}
                        <div className="mt-4 pt-3 border-t border-cream-border/80 flex flex-wrap items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-2 text-forest/90">
                            <span className="font-mono text-[10px] sm:text-[11px] text-text-muted tracking-wider uppercase font-semibold">
                              Reference Timing:
                            </span>
                            <span className="font-sans text-xs font-semibold text-forest bg-forest/5 px-2.5 py-0.5 rounded-full border border-forest/10">
                              {crop.referenceTiming}
                            </span>
                          </div>

                          <span className="font-sans text-[11px] text-text-muted/80 italic">
                            *Indicative; confirm on product label
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* =======================================================================
          03 — SECTION CLOSING ACTION (CTA)
          Naturally follows once the 5th crop stage is explored and pin releases
          ======================================================================= */}
      <div
        ref={ctaContainerRef}
        className="relative w-full py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <Container size="default">
          {/* Animated Expanding Divider Hairline */}
          <div className="crop-cta-divider w-full h-px bg-cream-border/80 mb-8 sm:mb-10" />

          {/* Closing Content and Route Navigation */}
          <div className="crop-cta-content flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-sans text-base sm:text-lg text-forest font-semibold tracking-tight">
                Growing something different?
              </p>
              <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1 max-w-lg leading-relaxed">
                Explore tailored agronomic protocols for arecanut, plantation spices, pulses and regional staples.
              </p>
            </div>

            <Link
              href="/crop-solutions"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-cream font-sans text-sm font-semibold hover:bg-olive transition-colors group/cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 shadow-warm-xs"
            >
              <span>Explore All Crop Solutions</span>
              <ArrowUpRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}

// Backward-compatible alias for existing naming conventions
export const Section06CropSolutions = CropSolutions;
