'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface NutritionHowItWorksProps {
  className?: string;
}

interface SystemStage {
  id: string;
  step: string;
  headline: string;
  tagline: string;
  description: string;
  focusZone: 'soil' | 'roots' | 'plant';
  badgeColor: string;
}

const STAGES: SystemStage[] = [
  {
    id: 'foundation',
    step: 'STAGE 01 / THE FOUNDATION',
    headline: 'Build the Soil.',
    tagline: 'SOIL ECOLOGY',
    description: 'Naati Plus supports the organic foundation of the root environment.',
    focusZone: 'soil',
    badgeColor: 'text-earth',
  },
  {
    id: 'connection',
    step: 'STAGE 02 / THE CONNECTION',
    headline: 'Support the Roots.',
    tagline: 'RHIZOSPHERE DEVELOPMENT',
    description:
      'Healthy soil structure and biological activity help create favourable conditions for root development.',
    focusZone: 'roots',
    badgeColor: 'text-olive',
  },
  {
    id: 'growth',
    step: 'STAGE 03 / THE GROWTH',
    headline: 'Feed the Plant.',
    tagline: 'FOLIAR & CROP VIGOR',
    description:
      'Naati Pro complements this foundation by supporting plant nutrition during crop development.',
    focusZone: 'plant',
    badgeColor: 'text-forest',
  },
];

/**
 * THE NAATI NUTRITION SYSTEM — SECTION 03: HOW THE SYSTEM WORKS (THE CONNECTION)
 *
 * Signature Botanical Storytelling Sequence:
 * - Desktop: Compact GSAP ScrollTrigger timeline (~150% scroll distance)
 * - Visually stable central botanical cross-section image showing soil, roots, and foliage
 * - 3 synchronized stages:
 *   1. The Foundation ("Build the Soil.")
 *   2. The Connection ("Support the Roots.")
 *   3. The Growth ("Feed the Plant.")
 * - Soft focal zone highlighting + clean reversible crossfades
 * - Clickable stage tabs on desktop for instant navigation
 * - Mobile (<1024px): Converts into 3 naturally stacked editorial panels without scroll-pinning
 */
export function NutritionHowItWorks({ className }: NutritionHowItWorksProps) {
  const [activeStage, setActiveStage] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Desktop Pinned Storytelling Sequence (lg screens only)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (!pinWrapperRef.current) return;

        const st = ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: 'top 12%',
          end: '+=160%',
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveStage(0);
            } else if (p < 0.67) {
              setActiveStage(1);
            } else {
              setActiveStage(2);
            }
          },
        });

        return () => st.kill();
      });

      // Mobile lightweight reveals (< 1024px)
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.mobile-stage-card').forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-the-system-works"
      data-nav-theme="light"
      aria-labelledby="how-it-works-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Section Boundary */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* =======================================================================
            SECTION HEADER
            ======================================================================= */}
        <div ref={headlineRef} className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              02 / THE CONNECTION
            </span>
          </div>

          {/* Fraunces Headline */}
          <h2
            id="how-it-works-heading"
            className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-forest">
              Start beneath.
            </span>
            <span className="block font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              Grow beyond.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mt-4 sm:mt-5 max-w-xl [text-wrap:pretty]">
            Soil health and plant nutrition are two halves of the same biological conversation.
            Here is how the complete system connects beneath and above the surface.
          </p>
        </div>

        {/* =======================================================================
            DESKTOP PINNED STORYTELLING STAGE (lg: screens)
            ======================================================================= */}
        <div ref={pinWrapperRef} className="hidden lg:block">
          <div className="grid grid-cols-12 gap-10 xl:gap-14 items-center">
            {/* LEFT / CENTER: BOTANICAL CROSS-SECTION VISUAL (Col 1 to 7) */}
            <div className="col-span-7 relative">
              <div
                ref={imageContainerRef}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md"
              >
                <Image
                  src="/assets/images/nutrition/soil-plant-connection.jpg"
                  alt="Detailed botanical cross-section photograph showing an agricultural plant rooted into dark living organic soil with visible mycorrhizal root network and green foliage"
                  fill
                  priority
                  sizes="(max-width: 1280px) 60vw, 750px"
                  quality={92}
                  className="object-cover object-center select-none"
                />

                {/* Dynamic Zone Highlight Overlays */}
                {/* 1. Soil Highlight (Bottom 45%) */}
                <div
                  className={cn(
                    'absolute bottom-0 inset-x-0 h-[48%] border-t border-harvest/40 bg-earth/10 transition-opacity duration-700 pointer-events-none',
                    activeStage === 0 ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden="true"
                >
                  <div className="absolute bottom-4 left-5 bg-forest-deep/80 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-mono tracking-wider text-harvest uppercase border border-harvest/30">
                    Zone 01 · Living Soil Structure
                  </div>
                </div>

                {/* 2. Roots Highlight (Middle 40%) */}
                <div
                  className={cn(
                    'absolute top-[35%] inset-x-0 h-[40%] border-y border-olive/50 bg-olive/15 transition-opacity duration-700 pointer-events-none',
                    activeStage === 1 ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden="true"
                >
                  <div className="absolute top-4 left-5 bg-forest-deep/80 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-mono tracking-wider text-cream uppercase border border-olive/40">
                    Zone 02 · Rhizosphere Root Architecture
                  </div>
                </div>

                {/* 3. Plant Foliage Highlight (Top 55%) */}
                <div
                  className={cn(
                    'absolute top-0 inset-x-0 h-[52%] border-b border-forest/40 bg-forest/10 transition-opacity duration-700 pointer-events-none',
                    activeStage === 2 ? 'opacity-100' : 'opacity-0'
                  )}
                  aria-hidden="true"
                >
                  <div className="absolute top-4 left-5 bg-forest-deep/80 backdrop-blur-sm px-3 py-1.5 rounded text-[11px] font-mono tracking-wider text-harvest uppercase border border-harvest/30">
                    Zone 03 · Above-Ground Foliar Growth
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: STORYTELLING STAGES (Col 8 to 12) */}
            <div className="col-span-5 flex flex-col justify-center space-y-6">
              {STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={cn(
                      'text-left p-6 rounded-xl transition-all duration-500 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20',
                      isActive
                        ? 'bg-cream-light border-cream-border shadow-warm-xs translate-x-1.5'
                        : 'bg-transparent border-transparent opacity-50 hover:opacity-80'
                    )}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={cn(
                          'font-mono text-xs font-semibold tracking-[0.2em] uppercase',
                          stage.badgeColor
                        )}
                      >
                        {stage.step}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">
                        {stage.tagline}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-forest font-medium tracking-[-0.02em] mb-2">
                      {stage.headline}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                      {stage.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================================================================
            MOBILE STACKED SEQUENCE (< 1024px)
            Natural unpinned editorial layout with visual integrated
            ======================================================================= */}
        <div className="lg:hidden space-y-8">
          {/* Main Visual */}
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-cream-deep border border-cream-border shadow-warm-sm">
            <Image
              src="/assets/images/nutrition/soil-plant-connection.jpg"
              alt="Detailed botanical cross-section showing soil foundation, roots, and plant growth"
              fill
              sizes="100vw"
              quality={90}
              className="object-cover object-center select-none"
            />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-widest uppercase text-cream/90 bg-forest-deep/75 px-3 py-1.5 rounded backdrop-blur-xs">
              <span>SOIL · ROOTS · PLANT</span>
              <span className="text-harvest">COMPLETE SYSTEM</span>
            </div>
          </div>

          {/* 3 Naturally Stacked Cards */}
          <div className="space-y-4">
            {STAGES.map((stage) => (
              <div
                key={stage.id}
                className="mobile-stage-card p-6 rounded-xl bg-cream-light border border-cream-border/90 shadow-warm-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      'font-mono text-xs font-semibold tracking-[0.2em] uppercase',
                      stage.badgeColor
                    )}
                  >
                    {stage.step}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">
                    {stage.tagline}
                  </span>
                </div>

                <h3 className="font-display text-2xl text-forest font-medium tracking-[-0.02em] mb-2">
                  {stage.headline}
                </h3>

                <p className="font-sans text-base text-text-secondary leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
