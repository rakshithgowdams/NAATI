'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Sprout,
  Microscope,
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface WhyFarmersChooseNaatiProps {
  className?: string;
}

interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    id: 'soil-first',
    number: '01',
    title: 'Soil-First Approach',
    subtitle: 'Healing the subterranean ecosystem before feeding leaves',
    description:
      'Chemical dependency treats symptoms while starving the soil. We restore organic humus, porous soil aggregates, and active root microflora as the primary foundation of crop vigor.',
    tag: 'Living Foundation',
    icon: Sprout,
    accentColor: 'text-earth bg-earth/10 border-earth/20',
  },
  {
    id: 'science-based',
    number: '02',
    title: 'Science-Based Solutions',
    subtitle: 'Precision bio-nutrition calibrated for Indian conditions',
    description:
      'Formulated with synergistic consortia of beneficial bacteria, mycorrhizal fungi, and organic carbon balances rigorously evaluated across diverse tropical soil types.',
    tag: 'Bio-Calibrated',
    icon: Microscope,
    accentColor: 'text-olive bg-olive/10 border-olive/20',
  },
  {
    id: 'farmer-friendly',
    number: '03',
    title: 'Farmer-Friendly Guidance',
    subtitle: 'Clear, acre-specific schedules without chemical confusion',
    description:
      'No complex chemical mixing equations or proprietary equipment needed. Plain-language schedules available in Kannada and English that integrate directly into regular field routines.',
    tag: 'Field Advisory',
    icon: HeartHandshake,
    accentColor: 'text-harvest bg-harvest/10 border-harvest/20',
  },
  {
    id: 'sustainable-practices',
    number: '04',
    title: 'Sustainable Practices',
    subtitle: '100% natural, residue-free inputs safe for generations',
    description:
      'Zero synthetic salts, zero toxic runoff. Protect groundwater aquifers, beneficial earthworms, pollinating bees, and farm workers without compromising productivity.',
    tag: 'Ecological Safety',
    icon: ShieldCheck,
    accentColor: 'text-forest bg-forest/10 border-forest/20',
  },
  {
    id: 'long-term-health',
    number: '05',
    title: 'Long-Term Soil Health',
    subtitle: 'Cumulative fertility compounding season after season',
    description:
      'Synthetic fertilizers yield diminishing returns as soil compacts. Naati builds moisture-holding capacity and organic carbon reserves that grow richer with every agricultural year.',
    tag: 'Cumulative Wealth',
    icon: TrendingUp,
    accentColor: 'text-earth bg-earth/10 border-earth/20',
  },
  {
    id: 'honest-communication',
    number: '06',
    title: 'Honest Communication',
    subtitle: 'Transparent agronomy with zero exaggerated miracle claims',
    description:
      'We never make unrealistic overnight yield promises. Clear expectations, full transparency in ingredients, verified timing, and honest dialogue from first application to harvest.',
    tag: 'Farmer Trust',
    icon: BadgeCheck,
    accentColor: 'text-forest bg-forest/10 border-forest/20',
  },
];

/**
 * HOMEPAGE SECTION 09 — WHY FARMERS CHOOSE NAATI
 *
 * SECTION 9 – WHY FARMERS CHOOSE NAATI
 * More Than Products.
 * A Farming Philosophy.
 *
 * 6 Core Principles:
 * ✔️ Soil-First Approach
 * ✔️ Science-Based Solutions
 * ✔️ Farmer-Friendly Guidance
 * ✔️ Sustainable Practices
 * ✔️ Long-Term Soil Health
 * ✔️ Honest Communication
 *
 * Features coordinated pinned horizontal scroll animation on both desktop and mobile,
 * with live progress bar, active card focus glow, dynamic ticker, and interactive chevrons/dots.
 */
export function WhyFarmersChooseNaati({ className }: WhyFarmersChooseNaatiProps) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillarIndexRef = useRef(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Desktop Pinned Horizontal Track Refs
  const desktopPinWrapperRef = useRef<HTMLDivElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const desktopProgressBarRef = useRef<HTMLDivElement>(null);
  const desktopScrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Mobile Pinned Horizontal Track Refs
  const mobilePinWrapperRef = useRef<HTMLDivElement>(null);
  const mobileStageRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileProgressBarRef = useRef<HTMLDivElement>(null);
  const mobileScrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  // Smooth scroll to pillar card on desktop
  const handleSelectPillarDesktop = useCallback((index: number) => {
    setActivePillarIndex(index);
    activePillarIndexRef.current = index;

    if (typeof window !== 'undefined' && desktopScrollTriggerRef.current) {
      const st = desktopScrollTriggerRef.current;
      const count = PHILOSOPHY_PILLARS.length;
      const targetProgress = count > 1 ? index / (count - 1) : 0;
      const targetScroll = st.start + targetProgress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  // Smooth scroll to pillar card on mobile
  const handleSelectPillarMobile = useCallback((index: number) => {
    setActivePillarIndex(index);
    activePillarIndexRef.current = index;

    if (typeof window !== 'undefined' && mobileScrollTriggerRef.current) {
      const st = mobileScrollTriggerRef.current;
      const count = PHILOSOPHY_PILLARS.length;
      const targetProgress = count > 1 ? index / (count - 1) : 0;
      const targetScroll = st.start + targetProgress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  const handlePrev = useCallback(() => {
    const nextIdx = activePillarIndex > 0 ? activePillarIndex - 1 : PHILOSOPHY_PILLARS.length - 1;
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      handleSelectPillarDesktop(nextIdx);
    } else {
      handleSelectPillarMobile(nextIdx);
    }
  }, [activePillarIndex, handleSelectPillarDesktop, handleSelectPillarMobile]);

  const handleNext = useCallback(() => {
    const nextIdx = activePillarIndex < PHILOSOPHY_PILLARS.length - 1 ? activePillarIndex + 1 : 0;
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      handleSelectPillarDesktop(nextIdx);
    } else {
      handleSelectPillarMobile(nextIdx);
    }
  }, [activePillarIndex, handleSelectPillarDesktop, handleSelectPillarMobile]);

  // Handle horizontal swipe gestures on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!mobileScrollTriggerRef.current) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartXRef.current;
    const deltaY = currentY - touchStartYRef.current;

    // Convert horizontal swipe into vertical page scroll for smooth Scrub
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      window.scrollBy({
        top: -deltaX * 1.3,
        behavior: 'auto',
      });
      touchStartXRef.current = currentX;
      touchStartYRef.current = currentY;
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Mobile Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.why-header-anim'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Mobile visual documentary anchor reveal
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const mm = gsap.matchMedia();

      // DESKTOP PINNED HORIZONTAL TRACK (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        if (!desktopPinWrapperRef.current || !desktopStageRef.current || !desktopTrackRef.current) return;

        const track = desktopTrackRef.current;
        const totalCards = PHILOSOPHY_PILLARS.length;

        const getScrollAmount = () => {
          const container = track.parentElement;
          if (!container) return 0;
          const trackWidth = track.scrollWidth;
          const containerWidth = container.clientWidth;
          return Math.max(0, trackWidth - containerWidth + 32);
        };

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: desktopPinWrapperRef.current,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight * 2.2, getScrollAmount() * 1.25)}`,
            pin: desktopStageRef.current,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;

              if (desktopProgressBarRef.current) {
                desktopProgressBarRef.current.style.width = `${Math.min(100, Math.max(8, Math.round(p * 100)))}%`;
              }

              const currentCardIndex = Math.min(
                totalCards - 1,
                Math.max(0, Math.round(p * (totalCards - 1)))
              );

              if (activePillarIndexRef.current !== currentCardIndex) {
                activePillarIndexRef.current = currentCardIndex;
                setActivePillarIndex(currentCardIndex);
              }
            },
          },
        });

        desktopScrollTriggerRef.current = horizontalTween.scrollTrigger ?? null;

        return () => {
          desktopScrollTriggerRef.current = null;
        };
      });

      // MOBILE & TABLET PINNED HORIZONTAL TRACK (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        if (!mobilePinWrapperRef.current || !mobileStageRef.current || !mobileTrackRef.current) return;

        const track = mobileTrackRef.current;
        const totalCards = PHILOSOPHY_PILLARS.length;

        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          return Math.max(0, trackWidth - viewportWidth + 32);
        };

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: mobilePinWrapperRef.current,
            start: 'top top',
            end: () => `+=${Math.max(window.innerHeight * 2.2, getScrollAmount() * 1.35)}`,
            pin: mobileStageRef.current,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;

              if (mobileProgressBarRef.current) {
                mobileProgressBarRef.current.style.width = `${Math.min(100, Math.max(8, Math.round(p * 100)))}%`;
              }

              const currentCardIndex = Math.min(
                totalCards - 1,
                Math.max(0, Math.round(p * (totalCards - 1)))
              );

              if (activePillarIndexRef.current !== currentCardIndex) {
                activePillarIndexRef.current = currentCardIndex;
                setActivePillarIndex(currentCardIndex);
              }
            },
          },
        });

        mobileScrollTriggerRef.current = horizontalTween.scrollTrigger ?? null;

        return () => {
          mobileScrollTriggerRef.current = null;
        };
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-farmers-choose-naati"
      data-nav-theme="light"
      aria-labelledby="why-naati-heading-desktop"
      className={cn(
        'relative w-full bg-[#FAF7F0] text-forest overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-10" />

      {/* =====================================================================
          01 — DESKTOP PINNED HORIZONTAL SHOWCASE (>= 1024px)
          Left: Visual documentary anchor & brand promise stays pinned in view
          Right: 6 philosophy pillar cards scroll horizontally across the screen
          ===================================================================== */}
      <div ref={desktopPinWrapperRef} className="relative w-full hidden lg:block">
        <div
          ref={desktopStageRef}
          className="w-full min-h-[100svh] flex flex-col justify-center py-4 xl:py-6 overflow-hidden select-none"
        >
          <Container size="default" className="w-full">
            {/* Top Header & Interactive Ticker */}
            <div className="flex items-end justify-between gap-6 mb-4 xl:mb-5 pb-3 xl:pb-4 border-b border-cream-border/70">
              <div>
                <div className="inline-flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                    SECTION 9 – WHY FARMERS CHOOSE NAATI
                  </span>
                </div>
                <h2 id="why-naati-heading-desktop" className="tracking-[-0.03em] leading-tight">
                  <span className="font-display font-medium text-2xl xl:text-3xl text-forest">
                    More Than Products.{' '}
                  </span>
                  <span className="font-display italic font-normal text-olive text-2xl xl:text-3xl">
                    A Farming Philosophy.
                  </span>
                </h2>
              </div>

              {/* Live Pillar Ticker & Nav Controls */}
              <div className="flex items-center gap-4 shrink-0 bg-cream-light/80 border border-cream-border/90 px-3.5 py-2 rounded-2xl shadow-warm-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
                    PILLAR {PHILOSOPHY_PILLARS[activePillarIndex].number} / 06
                  </span>
                  <span className="font-sans text-xs text-text-secondary font-medium">
                    · {PHILOSOPHY_PILLARS[activePillarIndex].title}
                  </span>
                </div>

                <div className="w-24 xl:w-32 h-1.5 bg-cream-deep border border-cream-border rounded-full overflow-hidden">
                  <div
                    ref={desktopProgressBarRef}
                    className="h-full bg-olive rounded-full transition-[width] duration-100 ease-out"
                    style={{ width: `${((activePillarIndex + 1) / PHILOSOPHY_PILLARS.length) * 100}%` }}
                  />
                </div>

                <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-forest text-cream font-semibold shrink-0">
                  {PHILOSOPHY_PILLARS[activePillarIndex].tag}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous philosophy pillar"
                    className="w-7 h-7 rounded-full border border-cream-border/90 hover:border-olive bg-white hover:bg-forest hover:text-cream text-forest flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next philosophy pillar"
                    className="w-7 h-7 rounded-full border border-cream-border/90 hover:border-olive bg-white hover:bg-forest hover:text-cream text-forest flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Split Showcase: Pinned Left Anchor + Scrolling Right Track */}
            <div className="grid grid-cols-12 gap-6 xl:gap-8 items-stretch">
              {/* Left Column: Visual Documentary Anchor & Brand Promise */}
              <div className="col-span-5 flex flex-col justify-between space-y-2.5 xl:space-y-3">
                {/* High-Resolution Documentary Photo Frame */}
                <div className="relative w-full h-[155px] lg:h-[165px] xl:h-[190px] rounded-2xl xl:rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md group">
                  <Image
                    src="/assets/images/home/why-farmers-choose-naati.jpg"
                    alt="Farmer and agricultural advisor examining living soil root nodules in Karnataka field"
                    fill
                    sizes="480px"
                    quality={90}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/25 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* Floating Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-deep/80 backdrop-blur-md text-cream text-[9px] xl:text-[10px] font-mono tracking-wider uppercase border border-cream/20">
                      <Sparkles className="w-3 h-3 text-harvest" />
                      <span>GROUNDED IN FIELD TRUTH</span>
                    </span>
                  </div>
                  {/* Caption Overlay */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 z-10 text-cream pointer-events-none">
                    <span className="font-display text-sm xl:text-base font-medium drop-shadow-sm block">
                      Root-Level Trust Across South India
                    </span>
                    <span className="font-sans text-[10px] xl:text-[11px] text-cream/80 block mt-0.5">
                      Inspecting living humus &amp; mycorrhizal root nodulation
                    </span>
                  </div>
                </div>

                {/* Editorial Manifesto Card */}
                <div className="p-3.5 xl:p-4.5 rounded-2xl xl:rounded-3xl bg-cream-light border border-cream-border/90 shadow-warm-xs">
                  <span className="font-mono text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-earth block mb-1">
                    A PROMISE TO THE LAND
                  </span>
                  <p className="font-display italic text-sm xl:text-base text-forest leading-snug mb-2">
                    &ldquo;A farmer&apos;s soil is their family&apos;s greatest inheritance. Every solution we formulate is built to leave your land healthier than we found it.&rdquo;
                  </p>
                  <div className="flex items-center gap-2 pt-1.5 border-t border-cream-border/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                    <span className="font-sans text-[10px] xl:text-[11px] font-medium text-text-secondary">
                      Naati Organics Agronomy Directorate · Bengaluru, Karnataka
                    </span>
                  </div>
                </div>

                {/* Direct Link to Nutrition System */}
                <Link
                  href="/nutrition-system"
                  className="inline-flex items-center justify-between py-2.5 px-4 xl:py-3 xl:px-5 rounded-xl xl:rounded-2xl bg-forest text-cream font-sans text-xs xl:text-sm font-semibold hover:bg-olive transition-colors group shadow-warm-xs"
                >
                  <div className="flex items-center gap-2">
                    <Sprout className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-harvest" />
                    <span>Explore the Two-Step Nutrition System</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Right Column: Horizontally Scrolling Track of 6 Philosophy Pillars */}
              <div className="col-span-7 overflow-hidden relative flex flex-col justify-between">
                <div
                  ref={desktopTrackRef}
                  className="flex items-stretch gap-4 xl:gap-5 pt-0.5 pb-1.5 will-change-transform"
                >
                  {PHILOSOPHY_PILLARS.map((pillar, idx) => {
                    const IconComponent = pillar.icon;
                    const isActive = activePillarIndex === idx;

                    return (
                      <div
                        key={pillar.id}
                        onClick={() => handleSelectPillarDesktop(idx)}
                        className={cn(
                          'w-[290px] lg:w-[310px] xl:w-[335px] shrink-0 p-4.5 xl:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group select-none',
                          isActive
                            ? 'bg-white border-olive shadow-warm-md scale-[1.01]'
                            : 'bg-cream-light/95 border-cream-border/90 hover:border-olive/50 hover:bg-white shadow-warm-xs'
                        )}
                      >
                        <div>
                          {/* Header: Checkmark Icon & Index */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'w-7 h-7 xl:w-8 xl:h-8 rounded-xl flex items-center justify-center transition-colors duration-300',
                                  isActive
                                    ? 'bg-forest text-cream'
                                    : 'bg-forest/5 text-forest group-hover:bg-forest group-hover:text-cream'
                                )}
                              >
                                <CheckCircle2
                                  className={cn(
                                    'w-3.5 h-3.5 xl:w-4 xl:h-4 transition-colors',
                                    isActive ? 'text-harvest' : 'text-olive group-hover:text-harvest'
                                  )}
                                />
                              </div>
                              <span className="font-mono text-[10px] xl:text-[11px] font-bold text-text-muted tracking-widest uppercase">
                                {pillar.number} / 06
                              </span>
                            </div>

                            <span
                              className={cn(
                                'font-mono text-[9px] xl:text-[10px] px-2.5 py-0.5 rounded-full border font-semibold uppercase tracking-wider transition-colors',
                                isActive
                                  ? 'bg-olive/10 border-olive/30 text-olive'
                                  : 'bg-cream-deep border-cream-border text-forest/75'
                              )}
                            >
                              {pillar.tag}
                            </span>
                          </div>

                          {/* Title & Subtitle */}
                          <h3
                            className={cn(
                              'font-display font-medium text-lg xl:text-xl tracking-tight transition-colors mb-1',
                              isActive ? 'text-forest' : 'text-forest group-hover:text-olive'
                            )}
                          >
                            {pillar.title}
                          </h3>

                          <p className="font-sans text-xs font-semibold text-text-primary/90 mb-2 leading-snug">
                            {pillar.subtitle}
                          </p>

                          {/* Full Description */}
                          <p className="font-sans text-xs xl:text-[13px] text-text-secondary leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>

                        {/* Micro Visual Bar */}
                        <div className="pt-3 mt-4 border-t border-cream-border/60 flex items-center justify-between text-text-muted">
                          <span className="text-[10px] xl:text-[11px] font-mono uppercase tracking-wider text-forest/70 flex items-center gap-1.5">
                            <IconComponent className="w-3.5 h-3.5 text-olive" />
                            <span>Verified Standard</span>
                          </span>
                          <span
                            className={cn(
                              'w-2 h-2 rounded-full transition-all duration-300',
                              isActive ? 'bg-olive scale-125' : 'bg-harvest opacity-0 group-hover:opacity-100'
                            )}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Controls: 6 Dots & Scrolling Hint */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-cream-border/60">
                  <div className="flex items-center gap-2">
                    {PHILOSOPHY_PILLARS.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPillarDesktop(idx)}
                        aria-label={`Jump to pillar ${p.number}: ${p.title}`}
                        className={cn(
                          'h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive',
                          activePillarIndex === idx
                            ? 'w-8 bg-olive'
                            : 'w-2 bg-cream-border hover:bg-olive/50'
                        )}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[10px] tracking-wider uppercase text-text-muted">
                    Scroll down to explore all 6 principles · Click card to jump
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* =====================================================================
          02 — MOBILE SHOWCASE (< 1024px)
          Step 1: Document-flow Section Header & Left Visual Anchor
          Step 2: Pinned Horizontal Track across all 6 philosophy pillars
          ===================================================================== */}
      <div className="block lg:hidden pt-16 sm:pt-20">
        <Container size="default">
          {/* Section Header */}
          <div ref={headerRef} className="max-w-2xl mb-8 sm:mb-12">
            <div className="why-header-anim inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                SECTION 9 – WHY FARMERS CHOOSE NAATI
              </span>
            </div>

            <h2
              id="why-naati-heading-mobile"
              className="tracking-[-0.03em] leading-[1.1] [text-wrap:balance]"
            >
              <span className="why-header-anim block font-display font-medium text-[clamp(2.1rem,6vw,3.2rem)] text-forest">
                More Than Products.
              </span>
              <span className="why-header-anim block mt-1 font-display italic font-normal text-olive text-[clamp(2.1rem,6vw,3.2rem)]">
                A Farming Philosophy.
              </span>
            </h2>

            <p className="why-header-anim font-sans text-sm sm:text-base text-text-secondary mt-3 max-w-xl leading-relaxed">
              Most agricultural inputs treat crops as standalone chemical factories. At Naati Organics, we view farming as an enduring partnership with the living soil under our feet.
            </p>
          </div>

          {/* Visual Documentary Anchor & Brand Promise */}
          <div ref={visualRef} className="flex flex-col space-y-4 mb-10 sm:mb-14">
            {/* High-Resolution Photo Frame */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md group">
              <Image
                src="/assets/images/home/why-farmers-choose-naati.jpg"
                alt="Farmer and agricultural advisor examining living soil root nodules in Karnataka field"
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                quality={90}
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-deep/80 backdrop-blur-md text-cream text-[11px] font-mono tracking-wider uppercase border border-cream/20">
                  <Sparkles className="w-3.5 h-3.5 text-harvest" />
                  <span>GROUNDED IN FIELD TRUTH</span>
                </span>
              </div>
              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-cream pointer-events-none">
                <span className="font-display text-base font-medium drop-shadow-sm block">
                  Root-Level Trust Across South India
                </span>
                <span className="font-sans text-xs text-cream/80 block mt-0.5">
                  Inspecting living humus &amp; mycorrhizal root nodulation
                </span>
              </div>
            </div>

            {/* Editorial Manifesto Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-cream-light border border-cream-border/90 shadow-warm-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-earth block mb-2">
                A PROMISE TO THE LAND
              </span>
              <p className="font-display italic text-base sm:text-lg text-forest leading-snug mb-3">
                &ldquo;A farmer&apos;s soil is their family&apos;s greatest inheritance. Every solution we formulate is built to leave your land healthier than we found it.&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-2 border-t border-cream-border/80">
                <span className="w-2 h-2 rounded-full bg-olive" />
                <span className="font-sans text-xs font-medium text-text-secondary">
                  Naati Organics Agronomy Directorate · Bengaluru, Karnataka
                </span>
              </div>
            </div>

            {/* Direct Link to Nutrition System */}
            <Link
              href="/nutrition-system"
              className="inline-flex items-center justify-between p-4 px-5 rounded-2xl bg-forest text-cream font-sans text-sm font-semibold hover:bg-olive transition-colors group shadow-warm-xs"
            >
              <div className="flex items-center gap-2.5">
                <Sprout className="w-4 h-4 text-harvest" />
                <span>Explore the Two-Step Nutrition System</span>
              </div>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>

        {/* Mobile Pinned Horizontal Cards Stage */}
        <div ref={mobilePinWrapperRef} className="relative w-full">
          <div
            ref={mobileStageRef}
            className="w-full min-h-[100svh] flex flex-col justify-between pt-16 sm:pt-20 pb-8 overflow-hidden select-none"
          >
            {/* Top Status & Live Ticker Bar */}
            <div className="px-4 sm:px-8 mb-3">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-harvest animate-pulse shrink-0" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider shrink-0">
                    PILLAR {PHILOSOPHY_PILLARS[activePillarIndex].number} / 06
                  </span>
                  <span className="font-sans text-xs text-text-secondary font-medium truncate">
                    · {PHILOSOPHY_PILLARS[activePillarIndex].title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-forest text-cream font-semibold shrink-0">
                    {PHILOSOPHY_PILLARS[activePillarIndex].tag}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous pillar"
                      className="w-7 h-7 rounded-full border border-cream-border/90 bg-white text-forest flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next pillar"
                      className="w-7 h-7 rounded-full border border-cream-border/90 bg-white text-forest flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Progress Bar */}
              <div className="w-full h-1 bg-cream-border rounded-full overflow-hidden">
                <div
                  ref={mobileProgressBarRef}
                  className="h-full bg-olive rounded-full transition-[width] duration-100 ease-out"
                  style={{ width: `${((activePillarIndex + 1) / PHILOSOPHY_PILLARS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Horizontal Track of Cards */}
            <div
              className="w-full overflow-hidden py-3"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <div
                ref={mobileTrackRef}
                className="flex items-stretch gap-4 px-4 sm:px-6 will-change-transform"
              >
                {PHILOSOPHY_PILLARS.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  const isActive = activePillarIndex === idx;

                  return (
                    <div
                      key={pillar.id}
                      onClick={() => handleSelectPillarMobile(idx)}
                      className={cn(
                        'w-[84vw] xs:w-[80vw] sm:w-[65vw] max-w-[340px] shrink-0 p-5 sm:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none',
                        isActive
                          ? 'bg-white border-olive shadow-warm-md scale-[1.01]'
                          : 'bg-cream-light/95 border-cream-border/90 shadow-warm-xs'
                      )}
                    >
                      <div>
                        {/* Header: Checkmark Icon & Index */}
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300',
                                isActive ? 'bg-forest text-cream' : 'bg-forest/5 text-forest'
                              )}
                            >
                              <CheckCircle2
                                className={cn(
                                  'w-4 h-4 transition-colors',
                                  isActive ? 'text-harvest' : 'text-olive'
                                )}
                              />
                            </div>
                            <span className="font-mono text-[10px] font-bold text-text-muted tracking-widest uppercase">
                              {pillar.number} / 06
                            </span>
                          </div>

                          <span
                            className={cn(
                              'font-mono text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider',
                              isActive
                                ? 'bg-olive/10 border-olive/30 text-olive font-semibold'
                                : 'bg-cream-deep border-cream-border text-forest/75'
                            )}
                          >
                            {pillar.tag}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h3
                          className={cn(
                            'font-display font-medium text-lg sm:text-xl tracking-tight mb-1',
                            isActive ? 'text-forest' : 'text-forest'
                          )}
                        >
                          {pillar.title}
                        </h3>

                        <p className="font-sans text-xs font-semibold text-text-primary/90 mb-2 leading-snug">
                          {pillar.subtitle}
                        </p>

                        {/* Full Description */}
                        <p className="font-sans text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Micro Visual Bar */}
                      <div className="pt-4 mt-4 border-t border-cream-border/60 flex items-center justify-between text-text-muted">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-forest/60 flex items-center gap-1.5">
                          <IconComponent className="w-3.5 h-3.5 text-olive" />
                          <span>Verified Standard</span>
                        </span>
                        <span
                          className={cn(
                            'w-2 h-2 rounded-full transition-all duration-300',
                            isActive ? 'bg-olive' : 'bg-transparent'
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Controls: 6 Dots & Swipe Indicator */}
            <div className="px-4 sm:px-8 pt-3 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {PHILOSOPHY_PILLARS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectPillarMobile(idx)}
                    aria-label={`Jump to pillar ${p.number}: ${p.title}`}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 cursor-pointer',
                      activePillarIndex === idx ? 'w-7 bg-olive' : 'w-2 bg-cream-border'
                    )}
                  />
                ))}
              </div>

              <span className="font-mono text-[10px] tracking-wider uppercase text-text-muted text-center">
                ← Swipe or scroll down to explore all 6 pillars →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward-compatible alias
export const Section09WhyFarmersChooseNaati = WhyFarmersChooseNaati;
