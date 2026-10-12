'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { SoilComparisonSlider } from './soil-comparison-slider';
import { NaatiPlusStaticGround } from './NaatiPlusScrollBackground';
import { cn } from '@/lib/utils/cn';

export interface SoilCrisisProps {
  className?: string;
}

interface SoilFoundationChapter {
  index: string;
  category: string;
  word: string;
  sentence: string;
}

const SOIL_FOUNDATIONS: SoilFoundationChapter[] = [
  {
    index: '01',
    category: 'STRUCTURE',
    word: 'Space.',
    sentence:
      'Healthy soil structure gives roots room to grow and helps water move through the ground.',
  },
  {
    index: '02',
    category: 'BIOLOGY',
    word: 'Life.',
    sentence:
      'Organic matter supports the living organisms involved in nutrient cycling.',
  },
  {
    index: '03',
    category: 'NUTRITION',
    word: 'Balance.',
    sentence:
      'Healthy plant growth depends on nutrient availability, soil conditions and crop needs.',
  },
];

export function SoilCrisis({ className }: SoilCrisisProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneClosingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Scene A: Editorial Opening reveals
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.crisis-scene-a',
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });

      introTl
        .fromTo(
          '.scene-a-eyebrow',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
        .fromTo(
          '.scene-a-line-1',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.scene-a-line-2',
          { opacity: 0, scale: 0.96, y: 28 },
          { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          '.scene-a-supporting',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );

      // 2. Scene C: Three Editorial Foundations progressive reveal
      const foundationsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.scene-c-container',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      foundationsTl
        .fromTo(
          '.scene-c-header',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          '.scene-c-rule',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.85, ease: 'power2.inOut' },
          '-=0.3'
        )
        .fromTo(
          '.scene-c-chapter-index',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.scene-c-chapter-word',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.15, ease: 'power3.out' },
          '-=0.35'
        )
        .fromTo(
          '.scene-c-chapter-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
          '-=0.4'
        );

      // 3. Section Closing Statement reveal
      gsap.fromTo(
        '.scene-closing',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.scene-closing',
            start: 'top 90%',
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
      id="soil-crisis"
      data-nav-theme="light"
      aria-labelledby="soil-crisis-heading"
      className={cn(
        'relative w-full bg-cream pt-20 sm:pt-28 md:pt-32 pb-0 text-text-primary selection:bg-harvest selection:text-forest-deep overflow-hidden',
        className
      )}
    >
      {/* Subtle top hairline divider transitioning out of the hero boundary */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-[3]" />

      {/* =========================================================================
          SCENE A — EDITORIAL OPENING
          Asymmetric typography composition leading with Fraunces display serif
          ========================================================================= */}
      <Container size="wide" className="crisis-scene-a mb-14 sm:mb-20 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Eyebrow and Headline Column */}
          <div className="lg:col-span-8">
            {/* Small Technical Eyebrow in IBM Plex Mono */}
            <div className="scene-a-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-olive">
                01 / UNDERSTANDING THE SOIL
              </span>
            </div>

            {/* Main Editorial Display Headline in Fraunces */}
            <h2
              id="soil-crisis-heading"
              className="text-forest tracking-[-0.03em] leading-[1.05]"
            >
              <span className="scene-a-line-1 block font-display font-medium text-[clamp(2.15rem,4.2vw,3.75rem)] text-forest">
                The real problem isn&apos;t
                <span className="block font-display font-semibold">above the ground.</span>
              </span>

              {/* Expressive Focal Point Phrase */}
              <span className="scene-a-line-2 block mt-2 sm:mt-2.5 font-display font-extrabold italic text-olive-dark text-[clamp(2.5rem,4.8vw,4.25rem)] tracking-[-0.035em]">
                It&apos;s beneath it.
              </span>
            </h2>
          </div>

          {/* Asymmetric Supporting Copy Column in DM Sans */}
          <div className="lg:col-span-4 flex flex-col justify-end pt-2 lg:pt-12">
            <div className="scene-a-supporting space-y-3.5 max-w-md border-l-2 border-olive/30 pl-5 sm:pl-6">
              <p className="font-sans text-base sm:text-lg font-medium text-text-primary leading-snug [text-wrap:pretty]">
                For decades, farming has focused on feeding the crop while
                gradually overlooking the health of the soil itself.
              </p>
              <p className="font-sans text-xs xs:text-sm text-text-secondary leading-relaxed [text-wrap:pretty]">
                When soil loses its biological vitality and porous structure, even
                the most intensive applications fail to sustain resilient yields.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* =========================================================================
          SCENE B — SCROLL-CONTROLLED SOIL COMPARISON SLIDER (TASK 01)
          Interactive before/after reveal transitioning degraded to living soil
          ========================================================================= */}
      <Container size="wide" className="mb-16 sm:mb-22 md:mb-26">
        <SoilComparisonSlider />
      </Container>

      {/* =========================================================================
          SCENE C — WHAT DOES HEALTHY SOIL NEED? (TASK 02 & TASK 03)
          Pure editorial typographic composition replacing dashboard cards.
          Safe top clearance ensures zero collision with fixed transparent navbar.
          ========================================================================= */}
      <Container size="wide" className="scene-c-container pt-4 sm:pt-6 mb-16 sm:mb-20 md:mb-24 scroll-mt-28">
        {/* Section Header with balanced clearance */}
        <div className="scene-c-header max-w-3xl mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2.5 mb-2.5 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              02 / THE FOUNDATIONS
            </span>
          </div>

          <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-forest tracking-[-0.03em] leading-tight">
            What Does Healthy Soil Need?
          </h3>
        </div>

        {/* Thin continuous editorial baseline separator */}
        <div className="scene-c-rule w-full h-px bg-cream-border mb-8 sm:mb-10 md:mb-12" />

        {/* Three Expressive Editorial Typographic Chapters (No Cards, Pure Typography) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-14">
          {SOIL_FOUNDATIONS.map((chapter, idx) => (
            <div
              key={chapter.index}
              className={cn(
                'group flex flex-col justify-between',
                // Subtle vertical divider on desktop between columns
                idx < SOIL_FOUNDATIONS.length - 1 && 'md:border-r md:border-cream-border/70 md:pr-8 lg:pr-14',
                // Horizontal divider on mobile
                idx < SOIL_FOUNDATIONS.length - 1 && 'border-b border-cream-border/60 pb-8 md:border-b-0 md:pb-0'
              )}
            >
              <div>
                {/* Monospaced Chapter Index and Category */}
                <div className="scene-c-chapter-index flex items-center gap-3 mb-3 sm:mb-5">
                  <span className="font-mono font-semibold text-xs sm:text-[13px] tracking-[0.2em] uppercase text-olive">
                    {chapter.index} / {chapter.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-olive/40" />
                </div>

                {/* Fraunces Display Word with refined proportional scale */}
                <span className="scene-c-chapter-word block font-display font-bold text-[clamp(2.5rem,4.2vw,3.85rem)] text-forest tracking-[-0.035em] leading-[0.98] mb-4 sm:mb-5 group-hover:text-olive-dark transition-colors duration-300">
                  {chapter.word}
                </span>

                {/* Concise Supporting Editorial Sentence in DM Sans */}
                <p className="scene-c-chapter-desc font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-sm [text-wrap:pretty]">
                  {chapter.sentence}
                </p>
              </div>

              {/* Bottom Subtle Underline Indicator */}
              <div className="mt-6 sm:mt-10 pt-3.5 border-t border-cream-border/40 flex items-center justify-between">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-text-muted">
                  PRINCIPLE {chapter.index}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-olive/30 group-hover:bg-olive transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* =========================================================================
          SECTION CLOSING — RESTRAINED EDITORIAL CLOSING STATEMENT
          Concise brand message leading into Soil Academy education
          ========================================================================= */}
      <Container size="narrow" className="scene-closing text-center pb-4 sm:pb-6">
        <div ref={sceneClosingRef} className="space-y-3.5 sm:space-y-4 py-6 sm:py-8 border-t border-b border-cream-border/80">
          {/* Brand Statement in Fraunces */}
          <p className="font-display font-medium text-xl sm:text-2xl md:text-3xl text-forest tracking-[-0.025em] leading-tight">
            &ldquo;Healthy crops cannot thrive in unhealthy soil.&rdquo;
          </p>

          {/* Supporting Philosophy */}
          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed [text-wrap:pretty]">
            The journey begins by understanding what lies beneath. Explore our
            field science and agronomic research.
          </p>

          {/* Understated Editorial Link */}
          <div className="pt-2">
            <Link
              href="/soil-academy"
              className={cn(
                'inline-flex items-center gap-2 font-sans font-bold text-sm sm:text-base text-forest',
                'hover:text-olive active:text-forest-deep transition-colors duration-200 group',
                'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-4 rounded-subtle'
              )}
            >
              <span>Explore Soil Academy</span>
              <ArrowRight
                className="w-4 h-4 text-olive transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </Container>

      {/* =========================================================================
          STATIC DECORATIVE NAATI PLUS GROUND
          Resting Naati Plus package on vermicompost toward lower-right,
          dark soil meeting the bottom edge immediately before Section 03.
          Zero text overlap, zero scroll-jacking, completely seamless integration.
          ========================================================================= */}
      <NaatiPlusStaticGround />
    </section>
  );
}
