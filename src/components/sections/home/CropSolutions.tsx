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
 * HOMEPAGE SECTION 06 — CROP SOLUTIONS
 *
 * SECTION 6 – CROP SOLUTIONS
 * One System. Multiple Crops.
 * Suitable for: Coconut, Arecanut, Coffee, Pepper, Banana, Mango, Vegetables, Field Crops, Spices & Home/Terrace Gardens.
 *
 * "The Growing Field Index" — Coordinated Editorial Chapter Experience:
 * - Continuous warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Section introduction scrolls naturally away as visitor enters sticky showcase
 * - Desktop (>= 1024px): Pinned scroll journey with coordinated chapter transitions
 *   - Phase A: Current chapter exits upward through overflow-hidden mask
 *   - Phase B: Synchronized image crossfade, vertical number ticker roll, active row slide
 *   - Phase C: Staggered reveal of Naati Plus -> drawing divider -> Naati Pro -> reference timing
 *   - Single active content source prevents text overlapping/doubling during fast/reversed scroll
 * - Mobile / Tablet (< 1024px): Vertical Editorial Crop Journey
 *   - Natural unpinned vertical storytelling across all 10 crop chapters
 *   - Individual ScrollTrigger-driven reveal sequences for photograph, title, protocol & timing
 * - Smooth release into natural flow and animated closing CTA linking to /crop-solutions
 */
export function CropSolutions({ className }: CropSolutionsProps) {
  const totalCrops = CROP_SOLUTIONS.length;

  // Authoritative active crop index (0 to totalCrops - 1)
  const [activeIndex, setActiveIndex] = useState(0);

  // Desktop nutrition panel rendered index (controlled via Phase A exit -> Phase B swap)
  const [displayedIndex, setDisplayedIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const showcaseStageRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const guidancePanelRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Transition coordination refs
  const displayedIndexRef = useRef(0);
  const desktopTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const runGuidanceTransitionRef = useRef<(index: number) => void>(() => {});

  // Active crop helper
  const activeCrop = CROP_SOLUTIONS[activeIndex] ?? CROP_SOLUTIONS[0];

  // Coordinated Desktop Guidance Panel Transition (Phase A: Exit -> Swap -> Phase C: Reveal)
  const runGuidanceTransition = useCallback((targetIndex: number) => {
    if (displayedIndexRef.current === targetIndex) return;

    if (isReducedMotion()) {
      displayedIndexRef.current = targetIndex;
      setDisplayedIndex(targetIndex);
      return;
    }

    // Kill any active transition immediately to stay deterministic during fast scroll
    if (desktopTimelineRef.current) {
      desktopTimelineRef.current.kill();
      desktopTimelineRef.current = null;
    }

    const panel = guidancePanelRef.current;
    if (!panel) {
      displayedIndexRef.current = targetIndex;
      setDisplayedIndex(targetIndex);
      return;
    }

    const outgoingTargets = panel.querySelectorAll('.crop-guidance-anim-target');

    // PHASE A: Swift upward exit through overflow mask (~12-16px)
    const exitTl = gsap.timeline({
      onComplete: () => {
        // PHASE B: Atomic content swap to newly selected crop
        displayedIndexRef.current = targetIndex;
        setDisplayedIndex(targetIndex);
      },
    });

    exitTl.to(outgoingTargets, {
      y: -14,
      opacity: 0,
      duration: 0.12,
      ease: 'power2.in',
      stagger: 0.012,
    });

    desktopTimelineRef.current = exitTl;
  }, []);

  useEffect(() => {
    runGuidanceTransitionRef.current = runGuidanceTransition;
  }, [runGuidanceTransition]);

  // PHASE C: Editorial Staggered Reveal for newly mounted crop content
  useEffect(() => {
    if (isReducedMotion()) return;
    const panel = guidancePanelRef.current;
    if (!panel) return;

    const step1 = panel.querySelectorAll('.crop-guidance-step-1');
    const dividerLines = panel.querySelectorAll('.crop-guidance-divider-line');
    const dividerBadge = panel.querySelectorAll('.crop-guidance-divider-badge');
    const step2 = panel.querySelectorAll('.crop-guidance-step-2');
    const footer = panel.querySelectorAll('.crop-guidance-footer');

    // Kill any lingering tweens on guidance items
    gsap.killTweensOf([step1, dividerLines, dividerBadge, step2, footer]);

    // Initial hidden state behind overflow masks
    gsap.set(step1, { y: 14, opacity: 0 });
    gsap.set(dividerLines, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(dividerBadge, { opacity: 0, scale: 0.95 });
    gsap.set(step2, { y: 14, opacity: 0 });
    gsap.set(footer, { y: 10, opacity: 0 });

    const revealTl = gsap.timeline();

    revealTl
      // Step 1: Naati Plus ("01 / BUILD THE SOIL" + product + application)
      .to(step1, {
        y: 0,
        opacity: 1,
        duration: 0.26,
        ease: 'power2.out',
        stagger: 0.03,
      })
      // Step 2: Fine divider draws across from left to right + COMPLETE SYSTEM tag
      .to(
        dividerLines,
        {
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        '-=0.08'
      )
      .to(
        dividerBadge,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=0.18'
      )
      // Step 3: Naati Pro ("02 / FEED THE PLANT" + product + application)
      .to(
        step2,
        {
          y: 0,
          opacity: 1,
          duration: 0.26,
          ease: 'power2.out',
          stagger: 0.03,
        },
        '-=0.08'
      )
      // Step 4: Reference timing badge and indicative footnote
      .to(
        footer,
        {
          y: 0,
          opacity: 1,
          duration: 0.22,
          ease: 'power2.out',
        },
        '-=0.12'
      );

    desktopTimelineRef.current = revealTl;
  }, [displayedIndex]);

  // Smooth scroll to stage when clicking selector on desktop
  const handleSelectCrop = useCallback((index: number) => {
    setActiveIndex(index);
    if (runGuidanceTransitionRef.current) {
      runGuidanceTransitionRef.current(index);
    }

    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const count = CROP_SOLUTIONS.length;
      const targetProgress = (index + 0.5) / count;
      const targetScroll = st.start + targetProgress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const count = CROP_SOLUTIONS.length;

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
      // 2. RESPONSIVE ANIMATION SUITE (Desktop Pinned vs Mobile Vertical Editorial)
      // =======================================================================
      const mm = gsap.matchMedia();

      // DESKTOP: STICKY SCROLL-DRIVEN SHOWCASE (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        if (!pinWrapperRef.current || !showcaseStageRef.current) return;

        let currentStage = 0;

        const st = ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 4.0)}`,
          pin: showcaseStageRef.current,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Deterministic interval distribution across all crops
            const newStage = Math.min(count - 1, Math.max(0, Math.floor(p * count)));

            // Continuous 60fps progress bar update directly on DOM ref
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.min(100, Math.max(4, Math.round(p * 100)))}%`;
            }

            // Subtle depth / vertical parallax within active photograph
            if (parallaxRef.current) {
              const yShift = (p - 0.5) * 22;
              parallaxRef.current.style.transform = `translateY(${yShift.toFixed(1)}px)`;
            }

            // Coordinated atomic chapter update when active stage changes
            if (newStage !== currentStage) {
              currentStage = newStage;
              setActiveIndex(newStage);
              if (runGuidanceTransitionRef.current) {
                runGuidanceTransitionRef.current(newStage);
              }
            }
          },
        });

        scrollTriggerRef.current = st;
      });

      // MOBILE & TABLET: VERTICAL EDITORIAL CROP JOURNEY (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        const chapters = gsap.utils.toArray<HTMLElement>('.mobile-crop-chapter');

        chapters.forEach((chapter) => {
          const header = chapter.querySelector('.mobile-crop-header');
          const photoWrap = chapter.querySelector('.mobile-crop-photo-wrap');
          const photo = chapter.querySelector('.mobile-crop-photo');
          const titleOverlay = chapter.querySelector('.mobile-crop-title-overlay');
          const step1 = chapter.querySelector('.mobile-crop-step-1');
          const lineLeft = chapter.querySelector('.mobile-crop-line-left');
          const lineRight = chapter.querySelector('.mobile-crop-line-right');
          const step2 = chapter.querySelector('.mobile-crop-step-2');
          const footer = chapter.querySelector('.mobile-crop-footer');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          });

          // Step 1: Crop number and category label enter with subtle vertical reveal
          tl.fromTo(
            header,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          )
            // Step 2: Photograph unveils using a clean clipping & subtle scale animation
            .fromTo(
              photoWrap,
              { clipPath: 'inset(10% 0% 10% 0% round 1rem)', opacity: 0.8 },
              {
                clipPath: 'inset(0% 0% 0% 0% round 1rem)',
                opacity: 1,
                duration: 0.65,
                ease: 'power3.out',
              },
              '-=0.2'
            )
            .fromTo(
              photo,
              { scale: 1.06 },
              { scale: 1, duration: 0.75, ease: 'power2.out' },
              '<'
            )
            // Step 3: Crop title reveals from masked line
            .fromTo(
              titleOverlay,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
              '-=0.3'
            )
            // Step 4: Naati Plus information enters gently
            .fromTo(
              step1,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
              '-=0.2'
            )
            // Step 5: Connecting line draws across
            .fromTo(
              [lineLeft, lineRight],
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.35, ease: 'power2.inOut', stagger: 0.08 },
              '-=0.15'
            )
            // Step 6: Naati Pro information enters
            .fromTo(
              step2,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
              '-=0.2'
            )
            // Step 7: Reference information becomes visible
            .fromTo(
              footer,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' },
              '-=0.15'
            );
        });
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
          Client Specification:
          SECTION 6 – CROP SOLUTIONS
          One System.
          Multiple Crops.
          Suitable for:
          🥥 Coconut, 🌴 Arecanut, ☕ Coffee, 🌶️ Pepper, 🍌 Banana, 🥭 Mango,
          🍅 Vegetables, 🌾 Field Crops, 🌿 Spices & Home/Terrace Gardens
          (Button)
          ======================================================================= */}
      <div
        ref={headerRef}
        className="relative w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-8 sm:pb-12 md:pb-14"
      >
        <Container size="default">
          <div className="max-w-4xl">
            {/* Eyebrow in IBM Plex Mono */}
            <div className="crop-header-eyebrow inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                SECTION 6 – CROP SOLUTIONS
              </span>
            </div>

            {/* Main Headline in Fraunces */}
            <h2
              id="crop-solutions-heading"
              className="tracking-[-0.03em] leading-[1.08] [text-wrap:balance]"
            >
              <span className="crop-header-title-main block font-display font-medium text-[clamp(2.25rem,4.5vw,4rem)] text-forest">
                One System.
              </span>
              <span className="crop-header-title-sub block mt-1 font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4rem)]">
                Multiple Crops.
              </span>
            </h2>

            {/* Client-Specified Suitable For & Quick Navigator */}
            <div className="crop-header-desc mt-5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
                  Suitable for:
                </span>
              </div>

              {/* Crop Quick Filter / Navigation Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 mb-6">
                {CROP_SOLUTIONS.map((crop, idx) => (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => handleSelectCrop(idx)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border select-none',
                      activeIndex === idx
                        ? 'bg-forest text-cream border-forest shadow-xs font-semibold'
                        : 'bg-cream-light/80 text-forest/85 hover:bg-forest/10 hover:text-forest border-cream-border/90'
                    )}
                  >
                    <span className="text-sm">{crop.emoji}</span>
                    <span>{crop.name}</span>
                  </button>
                ))}
              </div>

              {/* Primary Action Button */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/crop-solutions"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-forest text-cream font-sans text-sm font-semibold hover:bg-olive transition-all duration-200 group shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20"
                >
                  <span>Explore All Crop Solutions</span>
                  <ArrowRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact?intent=crop-guidance"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-forest/5 text-forest font-sans text-sm font-medium border border-forest/20 transition-colors"
                >
                  <span>Request Custom Schedule</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-olive" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* =======================================================================
          02 — CROP SHOWCASE STAGE
          Desktop (>= 1024px): Pinned scroll journey with coordinated chapter transitions
          Mobile (< 1024px): Natural vertical editorial storytelling chapters
          ======================================================================= */}
      <div ref={pinWrapperRef} className="crop-showcase-pin-wrapper relative w-full">
        <div
          ref={showcaseStageRef}
          className="crop-showcase-stage w-full lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:py-8"
        >
          <Container size="default">
            {/* =================================================================
                MOBILE / TABLET: VERTICAL EDITORIAL CROP JOURNEY (< 1024px)
                Natural scroll-driven chapters with independent ScrollTrigger reveals
                ================================================================= */}
            <div className="lg:hidden flex flex-col space-y-12">
              {CROP_SOLUTIONS.map((crop, idx) => (
                <article
                  key={crop.id}
                  id={`crop-mobile-chapter-${crop.id}`}
                  className="mobile-crop-chapter relative pt-6 first:pt-0 pb-6 border-b border-cream-border/70 last:border-b-0"
                >
                  {/* Chapter Header: Crop Number, Emoji and Category Label */}
                  <div className="mobile-crop-header flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest" aria-hidden="true" />
                      <span className="font-mono text-[11px] font-semibold text-olive uppercase tracking-widest">
                        CROP {crop.index} / {String(totalCrops).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cream-deep border border-cream-border text-forest/80 font-medium">
                      {crop.tag}
                    </span>
                  </div>

                  {/* Large Full-Width Photograph with Clip-Mask Reveal */}
                  <div className="mobile-crop-photo-wrap relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-cream-deep border border-cream-border/80 shadow-warm-sm mb-4">
                    <Image
                      src={crop.imageSrc}
                      alt={crop.imageAlt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 640px"
                      priority={idx === 0}
                      quality={90}
                      className="mobile-crop-photo object-cover"
                    />

                    {/* Gentle caption contrast gradient */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-deep/60 via-forest-deep/20 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Crop Title and Index Overlay */}
                    <div className="mobile-crop-title-overlay absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between text-cream pointer-events-none">
                      <span className="font-display text-lg sm:text-xl font-medium tracking-tight drop-shadow-sm flex items-center gap-2">
                        <span className="text-xl">{crop.emoji}</span>
                        <span>{crop.name}</span>
                      </span>
                      <span className="font-mono text-xs text-cream/90 tracking-wider">
                        {crop.index} / {String(totalCrops).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Guidance Card: Two-Stage Nutrition Protocol */}
                  <div className="mobile-crop-guidance p-4 xs:p-5 rounded-2xl bg-cream-light/95 border border-cream-border/90 shadow-warm-xs">
                    <div className="space-y-3.5">
                      {/* Stage 01: Naati Plus */}
                      <div className="mobile-crop-step-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-earth" aria-hidden="true" />
                          <span className="font-mono text-[10px] font-bold text-earth tracking-[0.16em] uppercase">
                            {crop.naatiPlus.stage}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                          <h4 className="font-display font-medium text-base sm:text-lg text-forest tracking-[-0.02em]">
                            {crop.naatiPlus.product}
                          </h4>
                          <span className="font-sans text-xs sm:text-sm text-text-secondary leading-snug">
                            — {crop.naatiPlus.application}
                          </span>
                        </div>
                      </div>

                      {/* Connecting Line Between Stages */}
                      <div className="mobile-crop-divider flex items-center gap-3 py-1">
                        <div className="mobile-crop-line-left w-6 h-px bg-cream-border" />
                        <div className="flex items-center gap-1.5">
                          <ArrowDown className="w-3.5 h-3.5 text-olive stroke-[2.5]" />
                          <span className="font-mono text-[9px] text-olive font-semibold tracking-wider uppercase">
                            COMPLETE SYSTEM
                          </span>
                        </div>
                        <div className="mobile-crop-line-right flex-1 h-px bg-cream-border" />
                      </div>

                      {/* Stage 02: Naati Pro */}
                      <div className="mobile-crop-step-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
                          <span className="font-mono text-[10px] font-bold text-olive tracking-[0.16em] uppercase">
                            {crop.naatiPro.stage}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-2 pt-0.5">
                          <h4 className="font-display font-medium text-base sm:text-lg text-forest tracking-[-0.02em]">
                            {crop.naatiPro.product}
                          </h4>
                          <span className="font-sans text-xs sm:text-sm text-text-secondary leading-snug">
                            — {crop.naatiPro.application}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Timing & Indicative Note Footer */}
                    <div className="mobile-crop-footer mt-4 pt-3 border-t border-cream-border/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 text-forest/90">
                        <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase font-semibold">
                          Reference Timing:
                        </span>
                        <span className="font-sans text-xs font-semibold text-forest bg-forest/5 px-2.5 py-0.5 rounded-full border border-forest/10">
                          {crop.referenceTiming}
                        </span>
                      </div>
                      <span className="font-sans text-[10px] text-text-muted/80 italic">
                        *Indicative; confirm on product label
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* =================================================================
                DESKTOP: ASYMMETRIC STICKY SPLIT SHOWCASE (>= 1024px)
                Left Photographic Stage (55%) | Right Selector & Guidance (45%)
                ================================================================= */}
            <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
              {/* ---------------------------------------------------------------
                  LEFT COLUMN (~55%): CINEMATIC PHOTOGRAPHIC VISUAL STAGE
                  Consistent 4:3 aspect ratio with seamless layered crossfades
                  --------------------------------------------------------------- */}
              <div className="lg:col-span-7 relative">
                <div
                  ref={parallaxRef}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-cream-deep border border-cream-border/80 shadow-warm-md will-change-transform"
                >
                  {/* Floating Category Tag Badge */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-deep/80 backdrop-blur-md text-cream border border-cream/15 text-[11px] font-mono tracking-wider uppercase shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                      <span className="transition-opacity duration-300">
                        {activeCrop.tag}
                      </span>
                    </span>
                  </div>

                  {/* Pre-rendered Stack of all 10 Photographic Assets (Zero-Flicker Transitions) */}
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
                          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-forest-deep/60 via-forest-deep/20 to-transparent pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Active Crop Name Caption on Image */}
                        <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-cream pointer-events-none">
                          <span className="font-display text-lg sm:text-xl font-medium tracking-tight drop-shadow-sm flex items-center gap-2">
                            <span className="text-2xl">{crop.emoji}</span>
                            <span>{crop.name}</span>
                          </span>
                          <span className="font-mono text-xs text-cream/90 tracking-wider">
                            {crop.index} / {String(totalCrops).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------------------
                  RIGHT COLUMN (~45%): EDITORIAL SELECTOR & GUIDANCE PANEL
                  Synchronized with scroll progress, clickable to navigate stages
                  --------------------------------------------------------------- */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                {/* Desktop Editorial Navigation Header & Vertical Number-Roll Counter */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-cream-border/70">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] font-semibold text-olive uppercase tracking-widest">
                      SUITABLE CROPS
                    </span>

                    {/* Masked Vertical Number-Roll Ticker */}
                    <div className="inline-flex items-baseline font-mono text-xs font-bold text-forest">
                      <div className="relative h-[1.2em] w-[1.7em] overflow-hidden inline-flex flex-col justify-start align-baseline">
                        <div
                          className="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col"
                          style={{
                            transform: `translateY(-${activeIndex * (100 / totalCrops)}%)`,
                          }}
                        >
                          {CROP_SOLUTIONS.map((crop) => (
                            <span
                              key={crop.id}
                              className="h-[1.2em] flex items-center justify-center select-none"
                            >
                              {crop.index}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-forest/60 ml-0.5">
                        / {String(totalCrops).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* 10-Stage Continuous Scroll Progress Bar */}
                  <div
                    className="w-28 h-1 bg-cream-border/60 rounded-full overflow-hidden"
                    title="Crop explore progress"
                  >
                    <div
                      ref={progressBarRef}
                      className="h-full bg-forest rounded-full transition-[width] duration-150 ease-out"
                      style={{ width: `${((activeIndex + 1) / totalCrops) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Desktop Compact 10-Crop Selector Rows */}
                <div
                  role="tablist"
                  aria-label="Crop categories"
                  aria-orientation="vertical"
                  className="flex flex-col space-y-1 mb-4 max-h-[310px] overflow-y-auto pr-1 scrollbar-thin"
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
                          'w-full text-left py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-between group relative cursor-pointer select-none',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20',
                          isActive
                            ? 'bg-cream-light text-forest shadow-warm-xs border border-cream-border/90 font-semibold'
                            : 'text-text-secondary hover:text-forest hover:bg-cream-light/50 border border-transparent'
                        )}
                      >
                        {/* Left: Indicator Bar, Emoji, Index & Crop Name */}
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              'w-1 rounded-full transition-all duration-200 ease-out',
                              isActive
                                ? 'h-4 bg-forest opacity-100 scale-y-100'
                                : 'h-2 bg-transparent opacity-0 scale-y-50 group-hover:bg-olive/40 group-hover:opacity-100 group-hover:scale-y-75'
                            )}
                            aria-hidden="true"
                          />

                          <span className="text-base select-none shrink-0">{crop.emoji}</span>

                          <span
                            className={cn(
                              'font-mono text-[11px] tracking-wider transition-all duration-200',
                              isActive
                                ? 'font-bold text-olive'
                                : 'font-medium text-text-muted group-hover:text-olive'
                            )}
                          >
                            {crop.index}
                          </span>

                          <span
                            className={cn(
                              'font-sans text-xs sm:text-sm tracking-[-0.01em] transition-all duration-200',
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
                            'w-3.5 h-3.5 transition-all duration-200 ease-out shrink-0',
                            isActive
                              ? 'text-forest opacity-100 translate-x-0'
                              : 'text-text-muted/30 opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-60 group-hover:-translate-x-1'
                          )}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Dynamic Product Guidance Panel: Single Active Content Source with Editorial Revealed Motion */}
                <div
                  id="crop-guidance-panel"
                  ref={guidancePanelRef}
                  role="tabpanel"
                  aria-labelledby={`crop-tab-${activeCrop.id}`}
                  className="relative p-4 rounded-xl bg-cream-light/95 border border-cream-border/90 shadow-warm-xs backdrop-blur-xs min-h-[210px] flex flex-col justify-between overflow-hidden"
                >
                  {/* Single Active Chapter Renderer (Guarantees zero duplicate layers or text overlap) */}
                  {(() => {
                    const crop = CROP_SOLUTIONS[displayedIndex] ?? CROP_SOLUTIONS[0];

                    return (
                      <div className="w-full flex flex-col justify-between h-full">
                        {/* Two-Stage Guidance Layout */}
                        <div className="space-y-3">
                          {/* Stage 01: Naati Plus */}
                          <div className="space-y-0.5 overflow-hidden">
                            {/* Step 1a: Stage Eyebrow */}
                            <div className="crop-guidance-anim-target crop-guidance-step-1 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-earth" aria-hidden="true" />
                              <span className="font-mono text-[10px] font-bold text-earth tracking-[0.16em] uppercase">
                                {crop.naatiPlus.stage}
                              </span>
                            </div>

                            {/* Step 1b: Product Name & Application */}
                            <div className="crop-guidance-anim-target crop-guidance-step-1 flex flex-wrap items-baseline gap-2 pt-0.5">
                              <h4 className="font-display font-medium text-base sm:text-lg text-forest tracking-[-0.02em]">
                                {crop.naatiPlus.product}
                              </h4>
                              <span className="font-sans text-xs text-text-secondary leading-snug">
                                — {crop.naatiPlus.application}
                              </span>
                            </div>
                          </div>

                          {/* Fine Connector Line Between Stages */}
                          <div className="flex items-center gap-2.5 py-0.5">
                            <div className="crop-guidance-divider-line w-5 h-px bg-cream-border" />
                            <div className="crop-guidance-anim-target crop-guidance-divider-badge flex items-center gap-1.5">
                              <ArrowDown className="w-3 h-3 text-olive stroke-[2.5]" />
                              <span className="font-mono text-[9px] text-olive font-semibold tracking-wider uppercase">
                                COMPLETE SYSTEM
                              </span>
                            </div>
                            <div className="crop-guidance-divider-line flex-1 h-px bg-cream-border" />
                          </div>

                          {/* Stage 02: Naati Pro */}
                          <div className="space-y-0.5 overflow-hidden">
                            {/* Step 2a: Stage Eyebrow */}
                            <div className="crop-guidance-anim-target crop-guidance-step-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
                              <span className="font-mono text-[10px] font-bold text-olive tracking-[0.16em] uppercase">
                                {crop.naatiPro.stage}
                              </span>
                            </div>

                            {/* Step 2b: Product Name & Application */}
                            <div className="crop-guidance-anim-target crop-guidance-step-2 flex flex-wrap items-baseline gap-2 pt-0.5">
                              <h4 className="font-display font-medium text-base sm:text-lg text-forest tracking-[-0.02em]">
                                {crop.naatiPro.product}
                              </h4>
                              <span className="font-sans text-xs text-text-secondary leading-snug">
                                — {crop.naatiPro.application}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Timing & Indicative Note Footer */}
                        <div className="crop-guidance-anim-target crop-guidance-footer mt-3 pt-2.5 border-t border-cream-border/80 flex flex-wrap items-center justify-between gap-2 overflow-hidden">
                          <div className="inline-flex items-center gap-2 text-forest/90">
                            <span className="font-mono text-[10px] text-text-muted tracking-wider uppercase font-semibold">
                              Reference Timing:
                            </span>
                            <span className="font-sans text-xs font-semibold text-forest bg-forest/5 px-2.5 py-0.5 rounded-full border border-forest/10">
                              {crop.referenceTiming}
                            </span>
                          </div>

                          <span className="font-sans text-[10px] text-text-muted/80 italic">
                            *Indicative; confirm on product label
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* =======================================================================
          03 — SECTION CLOSING ACTION (CTA)
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
                One System for all your signature crops.
              </p>
              <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1 max-w-lg leading-relaxed">
                Explore comprehensive agronomic schedules, dosage guides and seasonal application timings for all 10 crop systems.
              </p>
            </div>

            <Link
              href="/crop-solutions"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-cream font-sans text-sm font-semibold hover:bg-olive transition-colors group/cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 shadow-warm-xs"
            >
              <span>Explore All 10 Crop Solutions</span>
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
