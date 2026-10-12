'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProGrowthJourneyProps {
  className?: string;
}

interface StageData {
  id: string;
  number: string;
  name: string;
  headline: string;
  description: string;
  botanicalContext: string;
  imageSrc: string;
  imageAlt: string;
}

const STAGES: StageData[] = [
  {
    id: 'stage-01',
    number: '01',
    name: 'ESTABLISHMENT',
    headline: 'The beginning of a healthy growing environment.',
    description:
      'Early root exploration and initial seedling emergence set the trajectory for all subsequent crop development.',
    botanicalContext:
      'In this formative window, the young crop transitions from seed reserves to active root-zone mineral uptake.',
    imageSrc: '/assets/images/products/naati-pro/stage1-establishment.jpg',
    imageAlt: 'Young emerging green crop seedling sprouting healthy in fertile soil',
  },
  {
    id: 'stage-02',
    number: '02',
    name: 'VEGETATIVE GROWTH',
    headline: 'Developing leaves, stems and plant structure.',
    description:
      'Rapid photosynthetic foliage expansion requires consistent cellular vigour and balanced micronutrient support above ground.',
    botanicalContext:
      'Active shoot elongation and chlorophyll synthesis demand sustained bio-nutritional harmony.',
    imageSrc: '/assets/images/products/naati-pro/stage2-vegetative.jpg',
    imageAlt: 'Lush expansive green crop foliage in full vegetative canopy growth',
  },
  {
    id: 'stage-03',
    number: '03',
    name: 'REPRODUCTIVE DEVELOPMENT',
    headline: 'Flowering and fruit development in applicable crops.',
    description:
      'As crops transition into floral initiation and fruit set, metabolic resources shift toward reproductive tissues.',
    botanicalContext:
      'Nutritional balance supports the plant as energy concentrates on flower retention and fruit formation.',
    imageSrc: '/assets/images/products/naati-pro/stage3-reproductive.jpg',
    imageAlt: 'Flowering and maturing healthy fruit clusters in clean agricultural setting',
  },
];

/**
 * NAATI PRO PRODUCT PAGE — SECTION 04: THE PLANT GROWTH JOURNEY
 *
 * Storytelling botanical growth narrative:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "04 / FROM ROOTS TO GROWTH"
 * - Headline: "Every stage of growth begins with balance."
 * - Three connected botanical stages:
 *   01: ESTABLISHMENT
 *   02: VEGETATIVE GROWTH
 *   03: REPRODUCTIVE DEVELOPMENT
 * - Desktop: Refined GSAP ScrollTrigger anchored crossfade sequence with progress indicator
 * - Mobile/Tablet: Stacked visual narrative with smooth reveals (no pinning lock)
 */
export function ProGrowthJourney({ className }: ProGrowthJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.pro-journey-header',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Desktop crossfade setup using ScrollTrigger matchMedia
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        STAGES.forEach((stage, index) => {
          const stepEl = document.getElementById(`journey-step-${index}`);
          if (!stepEl) return;

          ScrollTrigger.create({
            trigger: stepEl,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setActiveStage(index),
            onEnterBack: () => setActiveStage(index),
          });
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="growth-journey"
      data-nav-theme="light"
      aria-labelledby="growth-journey-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10',
        className
      )}
    >
      <Container size="wide">
        {/* =====================================================================
            SECTION HEADER
            ===================================================================== */}
        <div className="pro-journey-header max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              04 / FROM ROOTS TO GROWTH
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
          </div>

          <h2
            id="growth-journey-heading"
            className="font-display font-medium text-[clamp(2.25rem,4vw,3.6rem)] leading-[1.1] tracking-[-0.03em] text-forest-deep mb-6 [text-wrap:balance]"
          >
            Every stage of growth begins with balance.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 leading-relaxed [text-wrap:pretty]">
            Healthy crops move through distinct developmental milestones. A complete nutritional approach attends to the plant&apos;s changing requirements as it builds stem, foliage, and fruit above the soil.
          </p>

          <p className="font-mono text-xs text-forest-deep/50 tracking-wider uppercase mt-4">
            General crop development context · Formulated for complete field synergy
          </p>
        </div>

        {/* =====================================================================
            DESKTOP INTERACTIVE SEQUENCE (lg:grid)
            ===================================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Scrolling Stage Cards (Col 1 to 6) */}
          <div className="lg:col-span-6 space-y-24 py-6">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.id}
                  id={`journey-step-${idx}`}
                  className={cn(
                    'relative pl-8 border-l-2 transition-all duration-500 min-h-[280px] flex flex-col justify-center',
                    isActive
                      ? 'border-forest-deep text-forest-deep'
                      : 'border-forest-deep/20 text-forest-deep/50'
                  )}
                >
                  {/* Step Stage Pill */}
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={cn(
                        'font-mono text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300',
                        isActive ? 'text-forest-deep' : 'text-forest-deep/50'
                      )}
                    >
                      STAGE {stage.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-medium/40" />
                    <span
                      className={cn(
                        'font-mono text-xs tracking-wider uppercase transition-colors duration-300',
                        isActive ? 'text-forest-medium' : 'text-forest-deep/40'
                      )}
                    >
                      {stage.name}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3
                    className={cn(
                      'font-display font-medium text-2xl sm:text-3xl leading-snug tracking-tight mb-4 transition-colors duration-300',
                      isActive ? 'text-forest-deep' : 'text-forest-deep/60'
                    )}
                  >
                    &ldquo;{stage.headline}&rdquo;
                  </h3>

                  {/* Descriptions */}
                  <p
                    className={cn(
                      'font-sans text-base leading-relaxed mb-3 transition-colors duration-300',
                      isActive ? 'text-forest-deep/85' : 'text-forest-deep/45'
                    )}
                  >
                    {stage.description}
                  </p>

                  <p
                    className={cn(
                      'font-sans text-sm leading-relaxed transition-colors duration-300',
                      isActive ? 'text-forest-deep/70' : 'text-forest-deep/35'
                    )}
                  >
                    {stage.botanicalContext}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Frame with Crossfading Photos (Col 7 to 12) */}
          <div className="lg:col-span-6 sticky top-28 py-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-forest-deep shadow-warm-lg border border-forest-deep/15">
              {STAGES.map((stage, idx) => (
                <div
                  key={stage.id}
                  className={cn(
                    'absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out',
                    activeStage === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  )}
                >
                  <Image
                    src={stage.imageSrc}
                    alt={stage.imageAlt}
                    fill
                    sizes="50vw"
                    quality={90}
                    className="object-cover object-center transform transition-transform duration-1000 ease-out scale-100"
                  />
                  {/* Subtle tonal gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-black/20"
                    aria-hidden="true"
                  />

                  {/* Floating Caption on Image */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between text-cream">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-harvest block mb-1">
                        STAGE {stage.number} OF 03
                      </span>
                      <span className="font-display text-lg font-medium tracking-tight">
                        {stage.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2].map((dotIdx) => (
                        <div
                          key={dotIdx}
                          className={cn(
                            'h-1.5 rounded-full transition-all duration-300',
                            activeStage === dotIdx ? 'w-6 bg-harvest' : 'w-2 bg-cream/40'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Indicator Bar below sticky visual */}
            <div className="flex items-center justify-between mt-4 px-2">
              <span className="font-mono text-xs text-forest-deep/60 uppercase tracking-wider">
                CHOREOGRAPHED BOTANICAL PROGRESSION
              </span>
              <span className="font-mono text-xs font-semibold text-forest-deep">
                0{activeStage + 1} / 03
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            MOBILE & TABLET STACKED PANELS (Natural unpinned flow)
            ===================================================================== */}
        <div className="lg:hidden space-y-12">
          {STAGES.map((stage) => (
            <div
              key={`mobile-${stage.id}`}
              className="bg-white/60 border border-forest-deep/10 rounded-2xl overflow-hidden p-5 sm:p-7 shadow-xs"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-forest-deep">
                <Image
                  src={stage.imageSrc}
                  alt={stage.imageAlt}
                  fill
                  sizes="100vw"
                  quality={88}
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-3 bg-forest-deep/80 backdrop-blur-md px-3 py-1 rounded-full border border-cream/20">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-harvest font-semibold">
                    STAGE {stage.number} · {stage.name}
                  </span>
                </div>
              </div>

              {/* Stage Content */}
              <div>
                <h3 className="font-display font-medium text-xl sm:text-2xl leading-snug text-forest-deep mb-3">
                  &ldquo;{stage.headline}&rdquo;
                </h3>
                <p className="font-sans text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-3">
                  {stage.description}
                </p>
                <p className="font-sans text-xs sm:text-sm text-forest-deep/60 leading-relaxed">
                  {stage.botanicalContext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
