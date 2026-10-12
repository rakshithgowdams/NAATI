'use client';

import React, { useRef, useEffect } from 'react';
import { Compass, Sprout, FileCheck2 } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface CropGrowingJourneyProps {
  className?: string;
}

const JOURNEY_STEPS = [
  {
    number: '01',
    icon: Compass,
    eyebrow: 'FOUNDATION',
    title: 'UNDERSTAND YOUR SOIL',
    quote: 'Consider soil structure, organic matter and the conditions surrounding the root zone.',
    detail:
      'Soil porosity, aeration, and organic carbon dictate nutrient absorption efficiency. Knowing your soil baseline ensures every input supports living subterranean microbiology.',
  },
  {
    number: '02',
    icon: Sprout,
    eyebrow: 'DEVELOPMENT',
    title: 'UNDERSTAND YOUR CROP',
    quote: 'Recognize that different crops and growth stages have different nutritional requirements.',
    detail:
      'Vegetative shoots, floral initiation, and ripening fruit demand distinctly timed nutrient availability. Aligning timing with natural crop rhythm unlocks true field potential.',
  },
  {
    number: '03',
    icon: FileCheck2,
    eyebrow: 'STEWARDSHIP',
    title: 'CHOOSE INFORMED GUIDANCE',
    quote: 'Consult the approved product information and seek suitable advice before selecting an application approach.',
    detail:
      'Verified label instructions and certified agricultural advisory guidance ensure inputs are applied responsibly, sustainably, and cost-effectively for the long term.',
  },
];

/**
 * CROP SOLUTIONS PAGE — SECTION 05: A PRACTICAL GROWING JOURNEY
 *
 * Scientific Infographic Timeline:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "04 / FROM FIELD TO HARVEST"
 * - Headline: "Start with the right questions."
 * - Three-stage modern scientific editorial timeline (Soil, Crop, Guidance)
 * - Large architectural stage numbers, thin connecting lines, lots of intentional breathing space
 * - Fine animated progress line drawing on scroll with sequential stage reveals
 */
export function CropGrowingJourney({ className }: CropGrowingJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.crop-journey-header',
        { opacity: 0, y: 22 },
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

      // Connecting timeline progress line drawing
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Step reveals
      gsap.fromTo(
        '.crop-journey-step',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.crop-journey-steps',
            start: 'top 80%',
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
      id="growing-journey"
      data-nav-theme="light"
      aria-labelledby="crop-journey-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* Header */}
        <div className="crop-journey-header max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              04 / FROM FIELD TO HARVEST
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
              AGRONOMIC PRINCIPLES
            </span>
          </div>

          <h2
            id="crop-journey-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Start with the right questions.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
            Sustainable crop management begins before any package is opened. Consider these fundamental steps to build a thoughtful agronomic strategy.
          </p>
        </div>

        {/* Scientific Timeline Infographic */}
        <div className="relative">
          {/* Subtle connecting horizontal line on desktop */}
          <div
            ref={timelineLineRef}
            className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-forest-deep/20 z-0"
            aria-hidden="true"
          />

          <div className="crop-journey-steps grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 xl:gap-16 relative z-10">
            {JOURNEY_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="crop-journey-step flex flex-col justify-between pt-6 border-t lg:border-t-0 border-forest-deep/15"
                >
                  <div>
                    {/* Index & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-display font-light text-5xl sm:text-6xl text-forest-medium/30 leading-none">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-forest-medium/10 text-forest-medium flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Eyebrow & Title */}
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-forest-medium block mb-2">
                      {step.eyebrow}
                    </span>
                    <h3 className="font-mono text-sm sm:text-base font-bold tracking-wider uppercase text-forest-deep mb-4">
                      {step.title}
                    </h3>

                    {/* Core Quote */}
                    <p className="font-display italic text-lg sm:text-xl text-forest-deep leading-snug mb-4">
                      &ldquo;{step.quote}&rdquo;
                    </p>

                    {/* Detail text */}
                    <p className="font-sans text-sm sm:text-base text-forest-deep/75 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-forest-deep/10">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-forest-deep/50">
                      STEP {step.number} OF 03 · NAATI GUIDANCE
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
