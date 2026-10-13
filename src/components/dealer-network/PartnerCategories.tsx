'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PARTNER_CATEGORIES, type PartnerCategory } from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';

export interface PartnerCategoriesProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 03: WHO CAN PARTNER WITH US?
 *
 * Eyebrow: 02 / OPPORTUNITIES
 * Headline: "Different businesses. A common purpose."
 * Concept: "FIVE PARTNERS. ONE SHARED VISION."
 *
 * Interactive Scroll-Driven Partnership Explorer:
 * - 5 Verified partner categories (Input Dealers, Distributors, Retailers, FPOs, Consultants)
 * - Desktop (>= 1024px): Pinned ~250vh scroll interval with deterministic category progression
 * - Synchronized active row highlight, masked heading reveal, description, profiles, and photography
 * - Mobile (< 1024px): Vertical touch-friendly category explorer with lightweight scroll-triggered reveals
 * - Click navigation synchronized with scroll timeline
 * - Respects prefers-reduced-motion and fixed transparent navbar clearance
 */
export function PartnerCategories({ className }: PartnerCategoriesProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const explorerStageRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const photoPanelRef = useRef<HTMLDivElement>(null);
  const imageContainersRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const runCategoryTransitionRef = useRef<(index: number) => void>(() => {});
  const displayedIndexRef = useRef(0);
  const activeIndexRef = useRef(0);
  const isInitialMountRef = useRef(true);

  const activeCategory: PartnerCategory =
    PARTNER_CATEGORIES[activeIndex] || PARTNER_CATEGORIES[0];
  const displayedCategory: PartnerCategory =
    PARTNER_CATEGORIES[displayedIndex] || PARTNER_CATEGORIES[0];

  // =========================================================================
  // COORDINATED CATEGORY TRANSITION (Phase 01 Exit -> Swap -> Phase 02 Reveal)
  // =========================================================================
  const runCategoryTransition = useCallback((targetIndex: number) => {
    if (displayedIndexRef.current === targetIndex) return;

    if (isReducedMotion()) {
      displayedIndexRef.current = targetIndex;
      setDisplayedIndex(targetIndex);
      return;
    }

    // Kill any active transition timeline to guarantee deterministic fast-scroll handling
    if (transitionTimelineRef.current) {
      transitionTimelineRef.current.kill();
      transitionTimelineRef.current = null;
    }

    const contentCard = contentCardRef.current;
    if (!contentCard) {
      displayedIndexRef.current = targetIndex;
      setDisplayedIndex(targetIndex);
      return;
    }

    const outgoingTargets = contentCard.querySelectorAll('.partner-anim-target');

    // PHASE 01 — EXIT: Previous content moves upward ~18px through overflow mask
    const exitTl = gsap.timeline({
      onComplete: () => {
        displayedIndexRef.current = targetIndex;
        setDisplayedIndex(targetIndex);
      },
    });

    exitTl.to(outgoingTargets, {
      y: -18,
      opacity: 0,
      duration: 0.14,
      ease: 'power2.in',
      stagger: 0.01,
    });

    transitionTimelineRef.current = exitTl;
  }, []);

  useEffect(() => {
    runCategoryTransitionRef.current = runCategoryTransition;
  }, [runCategoryTransition]);

  // =========================================================================
  // PHASE 02 REVEAL & PHASE 03 SETTLE (Triggered when displayedIndex changes)
  // =========================================================================
  useEffect(() => {
    if (isReducedMotion()) return;

    // Skip animation on initial mount to display default category without flash
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    const contentCard = contentCardRef.current;
    if (!contentCard) return;

    const meta = contentCard.querySelector('.partner-anim-meta');
    const heading = contentCard.querySelector('.partner-anim-heading');
    const subtitle = contentCard.querySelector('.partner-anim-subtitle');
    const desc = contentCard.querySelector('.partner-anim-desc');
    const profileLabel = contentCard.querySelector('.partner-anim-profile-label');
    const profileItems = contentCard.querySelectorAll('.partner-anim-profile-item');

    gsap.killTweensOf([meta, heading, subtitle, desc, profileLabel, profileItems]);

    // Initial hidden states behind text masks
    gsap.set(meta, { opacity: 0, y: 10 });
    gsap.set(heading, { opacity: 0, y: 26 });
    gsap.set(subtitle, { opacity: 0, x: -14 });
    gsap.set(desc, { opacity: 0, y: 14 });
    gsap.set(profileLabel, { opacity: 0, y: 8 });
    gsap.set(profileItems, { opacity: 0, y: 10 });

    const revealTl = gsap.timeline();

    revealTl
      // 1. Category number & partner focus meta reveals first
      .to(meta, {
        opacity: 1,
        y: 0,
        duration: 0.22,
        ease: 'power2.out',
      })
      // 2. Heading reveals upward through vertical text mask
      .to(
        heading,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power3.out',
        },
        '-=0.12'
      )
      // 3. Supporting statement enters with subtle horizontal translation
      .to(
        subtitle,
        {
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      // 4. Description follows with gentle upward movement
      .to(
        desc,
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
        },
        '-=0.18'
      )
      // 5. Representative profile details reveal sequentially
      .to(
        profileLabel,
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=0.15'
      )
      .to(
        profileItems,
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          stagger: 0.04,
          ease: 'power2.out',
        },
        '-=0.12'
      );

    // Photographic transition: Directional clip mask & subtle scale settle
    const incomingContainer = imageContainersRef.current[displayedIndex];
    if (incomingContainer) {
      gsap.killTweensOf(incomingContainer);
      const innerImg = incomingContainer.querySelector('.partner-photo-img');
      if (innerImg) gsap.killTweensOf(innerImg);

      gsap.fromTo(
        incomingContainer,
        { clipPath: 'inset(12% 0% 0% 0%)', opacity: 0.3 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
        }
      );

      if (innerImg) {
        gsap.fromTo(
          innerImg,
          { scale: 1.05 },
          { scale: 1, duration: 0.75, ease: 'power2.out' }
        );
      }
    }

    transitionTimelineRef.current = revealTl;
  }, [displayedIndex]);

  // =========================================================================
  // GSAP SCROLLTRIGGER MASTER SETUP (Desktop Pinned Explorer vs Mobile)
  // =========================================================================
  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const mm = gsap.matchMedia();

      // DESKTOP: PINNED SCROLL-DRIVEN CATEGORY EXPLORER (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        if (!pinWrapperRef.current || !explorerStageRef.current) return;

        let currentStage = 0;

        const st = ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: 'top 104px', // Clear fixed transparent navbar (h-24 = 96px + 8px margin)
          end: () => `+=${Math.round(window.innerHeight * 2.5)}`,
          pin: explorerStageRef.current,
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

            // 60fps horizontal scroll progress indicator update
            if (progressBarRef.current) {
              const pct = Math.min(100, Math.max(2, Math.round(p * 100)));
              progressBarRef.current.style.width = `${pct}%`;
            }

            // Subtle internal depth movement for photo
            if (photoPanelRef.current) {
              const yShift = (p - 0.5) * 16;
              const activeContainer = imageContainersRef.current[currentStage];
              if (activeContainer) {
                const imgEl = activeContainer.querySelector(
                  '.partner-photo-img'
                ) as HTMLElement;
                if (imgEl) {
                  imgEl.style.transform = `scale(1.02) translateY(${yShift.toFixed(1)}px)`;
                }
              }
            }

            // Synchronized category switch when active stage changes
            if (newStage !== currentStage) {
              currentStage = newStage;
              activeIndexRef.current = newStage;
              setActiveIndex(newStage);
              if (runCategoryTransitionRef.current) {
                runCategoryTransitionRef.current(newStage);
              }
            }
          },
        });

        scrollTriggerRef.current = st;
      });

      // MOBILE & TABLET: NATURAL VERTICAL SCROLL WITH EDITORIAL REVEALS (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        if (!explorerStageRef.current) return;

        gsap.fromTo(
          explorerStageRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: explorerStageRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef.current);

    return () => {
      ctx.revert();
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.kill();
      }
    };
  }, []);

  // =========================================================================
  // USER CLICK INTERACTION: SYNCHRONIZED WITH SCROLL TIMELINE
  // =========================================================================
  const handleSelectCategory = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);

    if (runCategoryTransitionRef.current) {
      runCategoryTransitionRef.current(index);
    }

    // On desktop (>= 1024px), smoothly scroll to that category's pinned position
    if (
      typeof window !== 'undefined' &&
      window.innerWidth >= 1024 &&
      scrollTriggerRef.current
    ) {
      const st = scrollTriggerRef.current;
      const progressTargets = [0.10, 0.30, 0.50, 0.70, 0.90];
      const targetProgress = progressTargets[index] ?? 0.10;
      const targetScroll = st.start + targetProgress * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: isReducedMotion() ? 'auto' : 'smooth',
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partner-categories"
      data-nav-theme="light"
      aria-labelledby="partner-categories-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="partner-header max-w-2xl mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              02 / OPPORTUNITIES
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="partner-categories-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Different businesses. <br />
            <span className="italic font-light">A common purpose.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            From established rural input retailers to regional distributors and farmer collectives, explore how our agricultural nutrition solutions align with your business model.
          </p>
        </div>

        {/* Pinned Showcase Container */}
        <div ref={pinWrapperRef} className="partner-explorer-pin-wrapper relative w-full">
          <div ref={explorerStageRef} className="partner-explorer-stage w-full">
            {/* Explorer Card with Subtle Progress Indicator */}
            <div className="relative bg-white/60 border border-forest-deep/15 overflow-hidden shadow-warm-sm">
              {/* Horizontal Scroll Progress Indicator */}
              <div
                className="w-full h-1 bg-forest-deep/10 relative overflow-hidden"
                aria-hidden="true"
              >
                <div
                  ref={progressBarRef}
                  className="h-full bg-harvest origin-left"
                  style={{ width: `${((activeIndex + 1) / 5) * 100}%` }}
                />
              </div>

              {/* Category Explorer Split Composition */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch p-6 sm:p-8 lg:p-10">
                {/* Left Column: Category Selectable List & Active Information (Col 1 to 6) */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  {/* Category Navigation List */}
                  <div
                    className="space-y-2 mb-8"
                    role="tablist"
                    aria-label="Select partner category"
                  >
                    {PARTNER_CATEGORIES.map((cat, idx) => {
                      const isSelected = idx === activeIndex;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          aria-controls="partner-details-content"
                          onClick={() => handleSelectCategory(idx)}
                          className={cn(
                            'w-full text-left p-3.5 sm:p-4 border transition-all duration-300 flex items-center justify-between group cursor-pointer relative overflow-hidden',
                            isSelected
                              ? 'bg-forest-deep text-cream border-forest-deep shadow-sm'
                              : 'bg-white/40 text-forest-deep/80 border-forest-deep/10 hover:border-forest-deep/30 hover:bg-white/80'
                          )}
                        >
                          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                            <span
                              className={cn(
                                'font-mono text-xs font-semibold tracking-wider transition-colors duration-300',
                                isSelected ? 'text-harvest' : 'text-forest-deep/50'
                              )}
                            >
                              {cat.number}
                            </span>
                            <span className="font-display font-medium text-sm sm:text-base tracking-tight transition-colors duration-300">
                              {cat.title}
                            </span>
                          </div>

                          <ArrowRight
                            className={cn(
                              'w-4 h-4 transition-all duration-300 relative z-10',
                              isSelected
                                ? 'text-harvest translate-x-1 opacity-100'
                                : 'text-forest-deep/30 group-hover:translate-x-0.5'
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Category Information Card */}
                  <div
                    id="partner-details-content"
                    ref={contentCardRef}
                    className="pt-6 border-t border-forest-deep/10 relative overflow-hidden"
                  >
                    <div className="partner-anim-target partner-anim-meta flex items-center gap-2 text-xs font-mono text-harvest uppercase tracking-wider mb-2 font-semibold">
                      <span>CATEGORY {displayedCategory.number}</span>
                      <span>•</span>
                      <span className="text-forest-deep/60">PARTNER FOCUS</span>
                    </div>

                    <div className="overflow-hidden mb-2">
                      <h3 className="partner-anim-target partner-anim-heading font-display font-medium text-xl sm:text-2xl text-forest-deep">
                        {displayedCategory.title}
                      </h3>
                    </div>

                    <div className="overflow-hidden mb-3">
                      <p className="partner-anim-target partner-anim-subtitle font-sans text-xs sm:text-sm text-forest-deep/70 italic">
                        {displayedCategory.subtitle}
                      </p>
                    </div>

                    <p className="partner-anim-target partner-anim-desc font-sans text-sm text-forest-deep/80 leading-relaxed mb-6">
                      {displayedCategory.description}
                    </p>

                    {/* Profile Points */}
                    <div className="space-y-1.5 pt-3 border-t border-forest-deep/10">
                      <span className="partner-anim-target partner-anim-profile-label block text-[11px] font-mono uppercase tracking-wider text-forest-deep/60 mb-1.5">
                        Representative Profile:
                      </span>
                      <div className="space-y-1.5">
                        {displayedCategory.focusProfile.map((item, idx) => (
                          <div
                            key={idx}
                            className="partner-anim-target partner-anim-profile-item flex items-center gap-2 text-xs font-sans text-forest-deep/85"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-forest-deep shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Large Photographic Area (Col 7 to 12) */}
                <div
                  ref={photoPanelRef}
                  className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden bg-forest-deep flex items-center justify-center"
                >
                  {/* All 5 Category Photographs rendered once and smoothly transitioned */}
                  {PARTNER_CATEGORIES.map((cat, idx) => {
                    const isCurrent = idx === displayedIndex;
                    return (
                      <div
                        key={cat.id}
                        ref={(el) => {
                          imageContainersRef.current[idx] = el;
                        }}
                        className={cn(
                          'absolute inset-0 w-full h-full transition-opacity duration-500 ease-out',
                          isCurrent
                            ? 'opacity-100 z-10 pointer-events-auto'
                            : 'opacity-0 z-0 pointer-events-none'
                        )}
                      >
                        <div className="partner-image-inner relative w-full h-full">
                          <Image
                            src={cat.imageSrc}
                            alt={cat.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={idx === 0}
                            className="partner-photo-img object-cover object-center"
                          />
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-black/20 pointer-events-none"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    );
                  })}

                  {/* Photo Caption Tag */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-deep/85 backdrop-blur-sm border border-cream/15 text-cream text-[11px] font-mono tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                      <span>{displayedCategory.title} • Commercial Environment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

