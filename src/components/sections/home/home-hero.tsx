'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface HomeHeroProps {
  className?: string;
}

const PHILOSOPHY_MARKERS = [
  { label: 'HEALTHY SOIL', highlight: false },
  { label: 'STRONG ROOTS', highlight: false },
  { label: 'HEALTHY PLANTS', highlight: false },
  { label: 'BETTER HARVESTS', highlight: true },
];

/**
 * NAATI ORGANICS — CINEMATIC SCROLL-SCRUBBED HERO
 * 
 * Refined Editorial Experience:
 * - TASK 01: Physical upward scroll translation for opening typography (0% to ~30%).
 *   Text groups travel linear-upward with zero horizontal translation, passing beyond top edge.
 * - TASK 02: Minimal, box-free closing statement directly over the lower portion of the final video frame.
 * - TASK 03: Full-width dark forest-green brand philosophy strip participating in normal document flow.
 * - TASK 04: Coherent unified GSAP timeline with butter-smooth all-keyframe video scrub.
 */
export function HomeHero({ className }: HomeHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const pinViewportRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Typography & UI Refs for Stage Choreography
  const openingSceneRef = useRef<HTMLDivElement>(null);
  const openingLeftRef = useRef<HTMLDivElement>(null);
  const openingRightRef = useRef<HTMLDivElement>(null);
  const openingMetaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const closingContentRef = useRef<HTMLDivElement>(null);

  // Loading & Ready State
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoDurationRef = useRef<number>(6.0); // Exact duration of naati-hero-scrub.mp4

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      videoDurationRef.current = video.duration;
      try {
        video.currentTime = 0.001;
      } catch {
        // Fallback
      }
      ScrollTrigger.refresh();
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
    setIsVideoReady(false);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !pinViewportRef.current) return;

    // Respect user's motion preferences
    if (isReducedMotion()) {
      setIsVideoReady(false);
      return;
    }

    const ctx = gsap.context(() => {
      const video = videoRef.current;
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? '+=170%' : '+=230%';
      const videoDuration = videoDurationRef.current || 6.0;
      // Cap target time just shy of absolute duration to prevent browser black-frame or 'ended' freeze
      const maxScrubTime = Math.max(0, videoDuration - 0.06);

      // Dedicated GSAP Proxy Object for ultra-smooth currentTime interpolation
      const videoProxy = { currentTime: 0 };

      // =======================================================================
      // MASTER GSAP TIMELINE & SCROLLTRIGGER CHOREOGRAPHY
      // =======================================================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: scrollDistance,
          pin: pinViewportRef.current,
          pinSpacing: true,
          scrub: 0.8, // 0.8s luxury easing catch-up eliminates all scroll jitter
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // -----------------------------------------------------------------------
      // STAGE A: 0% to ~30%
      // Physical Upward Scroll for Opening Typography
      // Both headline groups translate upward in direct proportion to scroll progress,
      // passing naturally beyond the top boundary with zero horizontal translation.
      // -----------------------------------------------------------------------
      const getTravelDistance = () => -(window.innerHeight * 1.15);

      if (openingLeftRef.current) {
        tl.to(
          openingLeftRef.current,
          {
            y: getTravelDistance,
            ease: 'none',
            duration: 0.30,
          },
          0
        );
        // Subtle fade only near the very top boundary exit
        tl.to(
          openingLeftRef.current,
          {
            opacity: 0,
            ease: 'power1.out',
            duration: 0.08,
          },
          0.22
        );
      }

      if (openingRightRef.current) {
        tl.to(
          openingRightRef.current,
          {
            y: getTravelDistance,
            ease: 'none',
            duration: 0.30,
          },
          0
        );
        // Subtle fade only near the very top boundary exit
        tl.to(
          openingRightRef.current,
          {
            opacity: 0,
            ease: 'power1.out',
            duration: 0.08,
          },
          0.22
        );
      }

      if (openingMetaRef.current) {
        tl.to(
          openingMetaRef.current,
          {
            y: () => -(window.innerHeight * 0.45),
            opacity: 0,
            ease: 'none',
            duration: 0.20,
          },
          0
        );
      }

      if (scrollCueRef.current) {
        tl.to(
          scrollCueRef.current,
          {
            y: -60,
            opacity: 0,
            ease: 'power1.out',
            duration: 0.12,
          },
          0
        );
      }

      // -----------------------------------------------------------------------
      // STAGE B: ~8% to ~82%
      // Direct GSAP-driven video scrub through central cinematic brand film
      // -----------------------------------------------------------------------
      tl.to(
        videoProxy,
        {
          currentTime: maxScrubTime,
          ease: 'none',
          duration: 0.74,
          onUpdate: () => {
            if (video && video.readyState >= 2) {
              try {
                if ('fastSeek' in video && typeof (video as unknown as { fastSeek: (t: number) => void }).fastSeek === 'function') {
                  (video as unknown as { fastSeek: (t: number) => void }).fastSeek(videoProxy.currentTime);
                } else {
                  video.currentTime = videoProxy.currentTime;
                }
              } catch {
                // Ignore seek collision
              }
            }
          },
        },
        0.08
      );

      // -----------------------------------------------------------------------
      // STAGE C: ~75% to 90%
      // Minimal, box-free closing statement appears over the lower part of the video
      // Remains readable through 100% as video holds on final frame.
      // -----------------------------------------------------------------------
      if (closingContentRef.current) {
        tl.fromTo(
          closingContentRef.current,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 0.16,
          },
          0.75
        );
      }

      // Intro Entrance Animation for page load (subtle, non-scrubbed)
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl.fromTo(
        '.hero-opening-enter',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home-hero"
      data-nav-theme="dark"
      aria-label="Naati Organics Hero — Fix the Soil. Feed the Plant."
      className={cn('relative w-full bg-forest-deep select-none', className)}
    >
      {/* =========================================================================
          PINNED VIEWPORT CONTAINER — EXTENDS BEHIND TRANSPARENT NAVBAR
          ========================================================================= */}
      <div
        ref={pinViewportRef}
        className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-forest-deep flex flex-col justify-between"
      >
        {/* =======================================================================
            LAYER 01: FIRST-FRAME STATIC POSTER (Zero layout shift & reliable fallback)
            Extracted directly from the real video at 1920x1080
            ======================================================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <Image
            src="/assets/videos/home/hero-poster.jpg"
            alt="Agricultural field at sunrise with central young plant and deep soil cross-section"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* =======================================================================
            LAYER 02: FULL-BLEED ALL-KEYFRAME SCROLL-SCRUBBED MP4
            Seamlessly cross-fades over the identical poster once decoded
            ======================================================================= */}
        {!videoFailed && (
          <video
            ref={videoRef}
            src="/assets/videos/home/naati-hero-scrub.mp4"
            poster="/assets/videos/home/hero-poster.jpg"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            className={cn(
              'absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-[1] will-change-transform transition-opacity duration-700',
              isVideoReady ? 'opacity-100' : 'opacity-0'
            )}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onError={handleVideoError}
          />
        )}

        {/* =======================================================================
            LAYER 03: REFINED EDITORIAL CONTRAST OVERLAYS
            Leaves the central plant and sunrise glow clear while guaranteeing text legibility
            ======================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
          {/* Top subtle vignette for transparent navbar controls contrast */}
          <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-forest-deep/85 via-forest-deep/30 to-transparent" />

          {/* Left typographic scrim (specifically behind left headline) */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-[42%] lg:w-[38%] bg-gradient-to-r from-forest-deep/80 via-forest-deep/35 to-transparent" />

          {/* Right typographic scrim (specifically behind right headline) */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-[42%] lg:w-[38%] bg-gradient-to-l from-forest-deep/80 via-forest-deep/35 to-transparent" />

          {/* Mobile vertical scrim ensuring text legibility over foliage & sunrise */}
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-forest-deep/75 via-forest-deep/25 to-forest-deep/85" />

          {/* Bottom subtle vertical vignette for ground roots and minimal closing text */}
          <div className="absolute inset-x-0 bottom-0 h-44 sm:h-64 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent" />
        </div>

        {/* =======================================================================
            LAYER 04: OPENING SCENE — DUAL-SIDED EDITORIAL TYPOGRAPHY (0% to 30%)
            Physically translates upward as user scrolls, exiting naturally past the top
            ======================================================================= */}
        <div
          ref={openingSceneRef}
          className="relative z-10 w-full h-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 flex flex-col justify-between pointer-events-none"
        >
          {/* Top Brand / Technical Eyebrow Bar */}
          <div
            ref={openingMetaRef}
            className="hero-opening-enter w-full flex items-center justify-between gap-4 will-change-transform"
          >
            {/* Left Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-pill bg-forest-deep/70 backdrop-blur-md border border-cream/15 pointer-events-auto">
              <span
                className="w-2 h-2 rounded-full bg-harvest shadow-[0_0_8px_rgba(221,206,154,0.7)] animate-pulse"
                aria-hidden="true"
              />
              <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-harvest">
                NAATI ORGANICS — SOIL FIRST
              </span>
            </div>

            {/* Right Origin Pill (Desktop) */}
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-forest-deep/60 backdrop-blur-md border border-cream/10 text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.16em] uppercase text-cream-muted/75">
              <span>EST. CHAMARAJANAGAR, KARNATAKA</span>
            </div>
          </div>

          {/* Dual-Sided Editorial Spread Framing the Central Subject */}
          <div className="w-full flex-1 flex flex-col md:flex-row justify-between gap-6 md:gap-10 py-2 sm:py-4">
            {/* LEFT THIRD: Fix the Soil. (Positioned at Top) */}
            <div
              ref={openingLeftRef}
              className="hero-opening-enter w-full md:w-[40%] lg:w-[35%] flex flex-col items-start text-left pointer-events-auto will-change-transform md:self-start md:mt-2 lg:mt-4"
            >
              <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest/80" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-harvest/90">
                  STEP 01 — THE FOUNDATION
                </span>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,5.6vw,5.5rem)] font-bold text-cream leading-[0.98] tracking-[-0.035em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
                Fix the<br />Soil.
              </h1>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-cream-muted font-sans max-w-xs leading-relaxed hidden sm:block [text-wrap:pretty]">
                Rebuilding living subterranean microbiology before applying crop nutrition.
              </p>
            </div>

            {/* CENTER CORRIDOR (~30% on desktop): Completely clear for the young plant & roots */}
            <div className="hidden md:block flex-1 pointer-events-none" aria-hidden="true" />

            {/* RIGHT THIRD: Feed the Plant. (Positioned at Bottom) */}
            <div
              ref={openingRightRef}
              className="hero-opening-enter w-full md:w-[40%] lg:w-[35%] flex flex-col items-start md:items-end text-left md:text-right pointer-events-auto will-change-transform md:self-end md:mb-2 lg:mb-4"
            >
              <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest-light/80" />
                <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-harvest-light/90">
                  STEP 02 — THE HARVEST
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5.6vw,5.5rem)] font-bold italic text-harvest-light leading-[0.98] tracking-[-0.035em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
                Feed the<br />Plant.
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-cream-muted font-sans max-w-xs leading-relaxed hidden sm:block [text-wrap:pretty]">
                Bio-available nutrition absorbed directly through deep, resilient root systems.
              </p>
            </div>
          </div>

          {/* Bottom Minimal Scroll Indicator */}
          <div className="w-full flex items-center justify-center pt-2">
            <div
              ref={scrollCueRef}
              className="hero-opening-enter inline-flex items-center gap-2.5 px-4 py-2 rounded-pill bg-forest-deep/70 backdrop-blur-md border border-cream/15 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-cream-muted shadow-warm-sm will-change-transform"
              aria-hidden="true"
            >
              <span>SCROLL TO EXPLORE</span>
              <div className="w-3 h-5 rounded-pill border border-cream/35 p-0.5 flex justify-center items-start">
                <span className="w-1 h-1.5 rounded-full bg-harvest animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            LAYER 05: CLOSING SCENE — MINIMAL BOX-FREE EDITORIAL STATEMENT (TASK 02)
            Pure typography over the lower frame without box or card background
            ======================================================================= */}
        <div
          ref={closingContentRef}
          className="absolute inset-x-0 bottom-0 z-20 pointer-events-none px-6 sm:px-10 md:px-16 pb-8 sm:pb-12 md:pb-16 flex flex-col items-center justify-end will-change-transform"
          style={{ opacity: 0 }}
        >
          <div className="w-full max-w-3xl mx-auto text-center pointer-events-auto">
            {/* Minimal Micro Tag */}
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-harvest">
                THE CORE PRINCIPLE
              </span>
            </div>

            {/* Main Editorial Closing Statement in Fraunces */}
            <h3 className="font-display font-medium text-[clamp(1.85rem,4.2vw,3.5rem)] text-cream leading-[1.06] tracking-[-0.03em] mb-2 sm:mb-3 [text-wrap:balance] drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              &ldquo;Every great harvest begins beneath the soil.&rdquo;
            </h3>

            {/* Supporting Copy in DM Sans */}
            <p className="font-sans text-xs xs:text-sm sm:text-base md:text-lg text-cream-muted/95 max-w-xl mx-auto leading-relaxed [text-wrap:pretty] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
              Healthy soil. Strong roots. Healthier plants. Better harvests.
            </p>
          </div>
        </div>

        {/* Sentinel for precision boundary detection */}
        <div id="hero-sentinel" className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none" aria-hidden="true" />
      </div>

      {/* =========================================================================
          TASK 02 & TASK 03 — FULL-WIDTH EDITORIAL BRAND STRIP
          Participates in normal document flow immediately following the pinned video.
          Edge-to-edge dark forest-green (#1c2e17) with the 4 philosophy markers + link.
          ========================================================================= */}
      <div
        data-nav-theme="dark"
        className="hero-brand-strip relative w-full bg-[#1b3014] border-t border-cream/15 text-cream py-5 sm:py-6 px-5 sm:px-8 md:px-12 lg:px-16 z-20"
      >
        <div className="max-w-[1720px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Brand Philosophy Markers */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 sm:gap-x-5 md:gap-x-7 gap-y-2 text-center"
            aria-label="Brand philosophy sequence: Healthy Soil to Strong Roots to Healthy Plants to Better Harvests"
          >
            {PHILOSOPHY_MARKERS.map((marker, idx) => (
              <React.Fragment key={marker.label}>
                <span
                  className={cn(
                    'font-mono text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase flex items-center gap-2',
                    marker.highlight ? 'text-harvest font-bold' : 'text-cream/90'
                  )}
                >
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      marker.highlight ? 'bg-harvest animate-pulse' : 'bg-harvest/80'
                    )}
                    aria-hidden="true"
                  />
                  {marker.label}
                </span>

                {idx < PHILOSOPHY_MARKERS.length - 1 && (
                  <span className="text-harvest/50 font-mono text-xs select-none hidden xs:inline" aria-hidden="true">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Action CTAs: Primary Complete Nutrition System + Farmer Handbook */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 shrink-0">
            <Link
              href="#crop-nutrition-system"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-harvest text-forest-deep font-sans text-xs sm:text-sm font-bold tracking-wide hover:bg-cream active:scale-[0.98] transition-all group shadow-warm-xs"
            >
              <span>Explore Nutrition System</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cream/20 hover:border-cream/50 text-cream/90 hover:text-cream font-sans text-xs sm:text-sm font-medium tracking-wide transition-colors"
            >
              <span>Farmer Handbook</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
