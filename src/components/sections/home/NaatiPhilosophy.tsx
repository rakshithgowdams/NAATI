'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface NaatiPhilosophyProps {
  className?: string;
}

/**
 * Panel 01: Build the Soil Principles
 */
const STAGE_01_ITEMS = [
  { index: '01', title: 'Soil Biology', note: 'Active nutrient cycling' },
  { index: '02', title: 'Organic Matter', note: 'Humus & moisture retention' },
  { index: '03', title: 'Beneficial Microorganisms', note: 'Rhizosphere microbial network' },
  { index: '04', title: 'Stronger Roots', note: 'Deep soil penetration' },
];

/**
 * Panel 02: Feed the Plant Principles
 */
const STAGE_02_ITEMS = [
  { index: '01', title: 'Balanced Nutrition', note: 'Bio-chelated mineral delivery' },
  { index: '02', title: 'Plant Vigour', note: 'Photosynthetic capacity & vascular strength' },
  { index: '03', title: 'Flowering Support', note: 'Uniform blossom setting & retention' },
  { index: '04', title: 'Fruit Development', note: 'Cellular division & sizing' },
  { index: '05', title: 'Healthier Harvests', note: 'Brix, grade & storage resilience' },
];

/**
 * HOMEPAGE SECTION 04 — THE NAATI PHILOSOPHY
 * 
 * Farm Minerals-Inspired Editorial Split-Screen Horizontal Scroll Experience:
 * - Concise, sophisticated asymmetric editorial introduction
 * - Pinned two-panel horizontal track on desktop (>= 1024px)
 *   - PANEL 01: [ 50% Soil Image ] [ 50% Build the Soil Content ]
 *   - PANEL 02: [ 50% Feed the Plant Content ] [ 50% Crop Image ]
 * - Natural, elegant vertical responsive layout on mobile/tablet (< 1024px)
 * - Pure GSAP ScrollTrigger matchMedia with zero extra manual scrollbars
 */
export function NaatiPhilosophy({ className }: NaatiPhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalWrapperRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  // Subtle Editorial Progress Indicator Refs
  const progressFillRef = useRef<HTMLDivElement>(null);
  const stageNumberRef = useRef<HTMLSpanElement>(null);
  const stage01LabelRef = useRef<HTMLSpanElement>(null);
  const stage02LabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Editorial Introduction Reveal
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.phil-intro-trigger',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      introTl
        .fromTo(
          '.phil-intro-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.phil-intro-headline',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.phil-intro-subphrase',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          '.phil-intro-support',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
          '-=0.4'
        );

      // 2. Desktop Horizontal Scroll Pinned Experience (>= 1024px)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = horizontalTrackRef.current;
        const wrapper = horizontalWrapperRef.current;
        if (!track || !wrapper) return;

        // Dynamic translation calculation: exact track overflow
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        const scrollTween = gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${Math.round(window.innerWidth * 1.2)}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (progressFillRef.current) {
                progressFillRef.current.style.width = `${Math.round(p * 100)}%`;
              }
              if (p < 0.5) {
                if (stageNumberRef.current) stageNumberRef.current.textContent = '01 / 02';
                if (stage01LabelRef.current) {
                  stage01LabelRef.current.className = 'text-forest font-bold transition-colors duration-200';
                }
                if (stage02LabelRef.current) {
                  stage02LabelRef.current.className = 'text-text-muted font-medium transition-colors duration-200';
                }
              } else {
                if (stageNumberRef.current) stageNumberRef.current.textContent = '02 / 02';
                if (stage01LabelRef.current) {
                  stage01LabelRef.current.className = 'text-text-muted font-medium transition-colors duration-200';
                }
                if (stage02LabelRef.current) {
                  stage02LabelRef.current.className = 'text-forest font-bold transition-colors duration-200';
                }
              }
            },
          },
        });

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
        };
      });
    }, sectionRef.current);

    // Refresh ScrollTrigger after layout stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="naati-philosophy"
      data-nav-theme="light"
      aria-label="The Naati Philosophy — Nature Already Knows the Answer."
      className={cn(
        'relative w-full bg-cream text-forest overflow-hidden scroll-mt-24',
        className
      )}
    >
      {/* Hairline boundary divider transitioning out of Section 03 */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-20" />

      {/* =======================================================================
          1. SECTION INTRODUCTION
          Concise editorial introduction leading naturally into the panels
          ======================================================================= */}
      <div className="phil-intro-trigger relative w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-10 sm:pb-14 md:pb-16 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          {/* Main Headline Column */}
          <div className="lg:col-span-8">
            {/* Small Technical Eyebrow in IBM Plex Mono */}
            <div className="phil-intro-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                04 / THE NAATI PHILOSOPHY
              </span>
            </div>

            {/* Display Headline in Fraunces */}
            <h2 className="tracking-[-0.03em] leading-[1.06] [text-wrap:balance]">
              <span className="phil-intro-headline block font-display font-medium text-[clamp(2.15rem,4.2vw,3.75rem)] text-forest">
                Nature Already Knows the Answer.
              </span>
              <span className="phil-intro-subphrase block mt-2 sm:mt-2.5 font-display italic font-normal text-olive text-[clamp(1.65rem,3.2vw,2.75rem)]">
                Our role is simply to help it work better.
              </span>
            </h2>
          </div>

          {/* Asymmetric Supporting Copy Column */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="phil-intro-support space-y-3 border-l-2 border-olive/35 pl-4 sm:pl-5">
              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed [text-wrap:pretty]">
                Healthy soil provides the foundation for healthier crops. The Naati approach
                unites two connected stages into one complete biological system.
              </p>
              <div className="inline-flex items-center gap-2 pt-1 font-mono text-[11px] font-semibold text-olive tracking-[0.16em] uppercase">
                <span>01 BUILD THE SOIL</span>
                <span className="text-olive/40 select-none">→</span>
                <span>02 FEED THE PLANT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================================
          2. HORIZONTAL SCROLL WRAPPER & TWO-PANEL TRACK
          Desktop: Pinned 200vw track that scrubs horizontally (Panel 01 -> Panel 02)
          Mobile/Tablet: Natural stacked vertical layout with zero artificial pinning
          ======================================================================= */}
      <div
        ref={horizontalWrapperRef}
        className="relative w-full h-auto lg:h-[100dvh] overflow-hidden bg-cream"
      >
        {/* Subtle Editorial Progress Indicator (Desktop >= 1024px) */}
        <div
          className="hidden lg:flex absolute top-6 right-8 xl:right-12 z-30 items-center gap-3.5 px-4 py-2 rounded-full bg-cream/95 backdrop-blur-md border border-cream-border/90 shadow-warm-xs pointer-events-none select-none"
          aria-hidden="true"
        >
          <span ref={stageNumberRef} className="font-mono text-[11px] font-bold text-olive tracking-wider">
            01 / 02
          </span>
          <div className="w-px h-3 bg-cream-border" />
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider">
            <span ref={stage01LabelRef} className="text-forest font-bold transition-colors duration-200">
              BUILD THE SOIL
            </span>
            <span className="text-olive/40 select-none">→</span>
            <span ref={stage02LabelRef} className="text-text-muted font-medium transition-colors duration-200">
              FEED THE PLANT
            </span>
          </div>
          <div className="w-14 h-1 rounded-full bg-cream-border/80 overflow-hidden ml-1">
            <div
              ref={progressFillRef}
              className="h-full bg-olive rounded-full transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        <div
          ref={horizontalTrackRef}
          className="flex flex-col lg:flex-row flex-nowrap w-full lg:w-[200vw] h-auto lg:h-full will-change-transform"
        >
          {/* ===================================================================
              PANEL 01 — BUILD THE SOIL
              Desktop: 50% Soil Image on LEFT | 50% Information on RIGHT
              =================================================================== */}
          <div
            id="panel-build-the-soil"
            className="w-full lg:w-[100vw] h-auto lg:h-full flex-shrink-0 flex flex-col lg:flex-row relative border-t lg:border-t-0 border-cream-border/70"
          >
            {/* LEFT SIDE — 50% Immersive Soil Macro Photography */}
            <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[440px] lg:h-full overflow-hidden bg-earth-surface order-1">
              <Image
                src="/assets/images/home/philosophy-stage1-soil.jpg"
                alt="Macro photographic study of living agricultural soil with active organic matter, rich aggregates, and root network"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center will-change-transform"
              />
              {/* Subtle tonal gradient for editorial depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent pointer-events-none" />

              {/* Minimal corner caption */}
              <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7 z-10 text-cream/90 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase drop-shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
                <span>STAGE 01 — LIVING RHIZOSPHERE</span>
              </div>
            </div>

            {/* RIGHT SIDE — 50% Editorial Information Layout */}
            <div className="w-full lg:w-1/2 h-auto lg:h-full bg-cream flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-8 sm:pt-12 lg:pt-20 xl:pt-24 pb-8 sm:pb-10 lg:pb-12 order-2">
              {/* Upper Content Group */}
              <div>
                {/* Small Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth" aria-hidden="true" />
                  <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-earth">
                    01 / THE FOUNDATION
                  </span>
                </div>

                {/* Headline & Subheading */}
                <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-[2.25rem] text-forest leading-[1.1] tracking-[-0.03em]">
                  Build the Soil.
                </h3>
                <p className="font-sans text-base sm:text-lg text-olive-dark font-medium mt-1 sm:mt-1.5 [text-wrap:pretty]">
                  Start where healthy growth begins.
                </p>

                {/* Supporting Copy */}
                <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-2.5 sm:mt-3 max-w-lg [text-wrap:pretty]">
                  Healthy soil conditions support living biology, organic matter and stronger root development.
                </p>
              </div>

              {/* Middle Group: Concise List with Enhanced Readability */}
              <div className="my-5 sm:my-6 lg:my-0 space-y-0 border-t border-cream-border/70">
                {STAGE_01_ITEMS.map((item) => (
                  <div
                    key={item.index}
                    className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-3 py-2.5 sm:py-3.5 border-b border-cream-border/70 group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="font-mono text-xs sm:text-[13px] font-semibold text-olive tracking-wider shrink-0">
                        {item.index}
                      </span>
                      <span className="font-sans font-semibold text-forest text-sm sm:text-base tracking-[-0.01em]">
                        {item.title}
                      </span>
                    </div>
                    <span className="font-sans text-xs sm:text-sm text-text-secondary font-medium tracking-normal text-left xs:text-right max-w-full xs:max-w-[220px] sm:max-w-xs leading-snug pl-6 xs:pl-0">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Sign-off: Contemporary Editorial Styling */}
              <div className="pt-4 sm:pt-5 border-t border-cream-border/80 flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-olive shrink-0" aria-hidden="true" />
                  <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-forest">
                    NAATI PLUS — SOIL NUTRITION
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-olive tracking-widest uppercase">
                  STAGE 01
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              PANEL 02 — FEED THE PLANT
              Desktop: 50% Information on LEFT | 50% Crop Image on RIGHT (Reversed!)
              =================================================================== */}
          <div
            id="panel-feed-the-plant"
            className="w-full lg:w-[100vw] h-auto lg:h-full flex-shrink-0 flex flex-col lg:flex-row relative border-t lg:border-t-0 border-cream-border/70"
          >
            {/* LEFT SIDE (Desktop) — 50% Editorial Information Layout */}
            <div className="w-full lg:w-1/2 h-auto lg:h-full bg-cream flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 pt-8 sm:pt-12 lg:pt-20 xl:pt-24 pb-8 sm:pb-10 lg:pb-12 order-2 lg:order-1">
              {/* Upper Content Group */}
              <div>
                {/* Small Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
                  <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-olive">
                    02 / THE GROWTH
                  </span>
                </div>

                {/* Headline & Subheading */}
                <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-[2.25rem] text-forest leading-[1.1] tracking-[-0.03em]">
                  Feed the Plant.
                </h3>
                <p className="font-sans text-base sm:text-lg text-olive-dark font-medium mt-1 sm:mt-1.5 [text-wrap:pretty]">
                  Support the crop throughout its development.
                </p>

                {/* Supporting Copy */}
                <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-2.5 sm:mt-3 max-w-lg [text-wrap:pretty]">
                  Balanced plant nutrition complements the foundation established by healthy soil.
                </p>
              </div>

              {/* Middle Group: Concise List with Enhanced Readability */}
              <div className="my-5 sm:my-6 lg:my-0 space-y-0 border-t border-cream-border/70">
                {STAGE_02_ITEMS.map((item) => (
                  <div
                    key={item.index}
                    className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-3 py-2.5 sm:py-3.5 border-b border-cream-border/70 group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="font-mono text-xs sm:text-[13px] font-semibold text-olive tracking-wider shrink-0">
                        {item.index}
                      </span>
                      <span className="font-sans font-semibold text-forest text-sm sm:text-base tracking-[-0.01em]">
                        {item.title}
                      </span>
                    </div>
                    <span className="font-sans text-xs sm:text-sm text-text-secondary font-medium tracking-normal text-left xs:text-right max-w-full xs:max-w-[220px] sm:max-w-xs leading-snug pl-6 xs:pl-0">
                      {item.note}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Sign-off: Contemporary Editorial Styling */}
              <div className="pt-4 sm:pt-5 border-t border-cream-border/80 flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-olive shrink-0" aria-hidden="true" />
                  <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-forest">
                    NAATI PRO — PLANT NUTRITION
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-olive tracking-widest uppercase">
                  STAGE 02
                </span>
              </div>
            </div>

            {/* RIGHT SIDE (Desktop) — 50% Immersive Crop Canopy Photography */}
            <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[440px] lg:h-full overflow-hidden bg-olive-surface order-1 lg:order-2">
              <Image
                src="/assets/images/home/philosophy-stage2-plant.jpg"
                alt="Lush healthy green agricultural crop leaves backlit by warm morning sunlight showing vigorous vegetative canopy development"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center will-change-transform"
              />
              {/* Subtle tonal gradient for editorial depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent pointer-events-none" />

              {/* Minimal corner caption */}
              <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7 z-10 text-cream/90 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase drop-shadow-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
                <span>STAGE 02 — PHOTOSYNTHETIC CANOPY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
