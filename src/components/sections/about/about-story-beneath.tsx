'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { AlertCircle, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutStoryBeneathProps {
  className?: string;
}

const OBSERVATION_POINTS = [
  'Every season, farmers work harder.',
  'Yet many soils are becoming weaker.',
  'Organic matter is declining.',
  'Beneficial microorganisms are disappearing.',
  'Roots are becoming weaker.',
  'More inputs are often required to achieve the same yields.',
];

const NAATI_PILLARS = [
  { title: 'Native wisdom', desc: 'Indigenous agricultural heritage and local seed-soil understanding' },
  { title: 'Natural farming principles', desc: 'Biological harmony without destructive synthetic salts' },
  { title: 'Respect for soil', desc: 'Viewing the underground ecosystem as sacred living earth' },
  { title: 'Sustainable agriculture', desc: 'Safe for water tables, pollinators, and farm families' },
  { title: 'Long-term thinking', desc: 'Cumulative fertility that compounds over decades' },
];

/**
 * ABOUT NAATI ORGANICS — SECTION 02: OUR STORY & WHY "NAATI"?
 *
 * Client Specification:
 * OUR STORY
 * Naati Was Born From One Simple Observation.
 * Every season, farmers work harder.
 * Yet many soils are becoming weaker...
 * This is not simply a crop problem. It is a soil health problem.
 *
 * WHY "NAATI"?
 * The word Naati represents something deeply rooted in our heritage.
 * It stands for:
 * • Native wisdom
 * • Natural farming principles
 * • Respect for soil
 * • Sustainable agriculture
 * • Long-term thinking
 */
export function AboutStoryBeneath({ className }: AboutStoryBeneathProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const naatiCardRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Story section entrance
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.querySelectorAll('.story-anim-item'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Naati Heritage card entrance
      if (naatiCardRef.current) {
        gsap.fromTo(
          naatiCardRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: naatiCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      data-nav-theme="light"
      aria-labelledby="our-story-heading"
      className={cn(
        'relative w-full bg-[#FAF7F0] text-forest py-20 sm:py-28 lg:py-36 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-10" />

      <Container size="default">
        {/* =====================================================================
            01 — OUR STORY (Client Specified Observation & Purpose)
            ===================================================================== */}
        <div ref={storyRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20 sm:mb-28">
          {/* Left Column: The Observation & Diagnostic Realization */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Eyebrow in IBM Plex Mono */}
              <div className="story-anim-item inline-flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                  OUR STORY
                </span>
              </div>

              {/* Main Headline */}
              <h2
                id="our-story-heading"
                className="story-anim-item font-display font-medium text-[clamp(2.15rem,4.2vw,3.75rem)] text-forest tracking-[-0.03em] leading-[1.1] mb-6 [text-wrap:balance]"
              >
                Naati Was Born From One Simple Observation.
              </h2>

              {/* Observation Checklist Items */}
              <div className="story-anim-item space-y-3 mb-8 p-5 sm:p-6 rounded-2xl bg-cream-light/80 border border-cream-border/80">
                {OBSERVATION_POINTS.map((obs, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-earth/15 text-earth flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      !
                    </span>
                    <span className="font-sans text-sm sm:text-base text-forest/90 font-medium leading-snug">
                      {obs}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Diagnosis Callout Box */}
              <div className="story-anim-item p-6 rounded-2xl bg-earth/10 border border-earth/25 mb-8">
                <div className="flex items-center gap-2.5 mb-2">
                  <AlertCircle className="w-5 h-5 text-earth shrink-0" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-earth">
                    THE CRITICAL REALIZATION
                  </span>
                </div>
                <p className="font-display font-medium text-xl sm:text-2xl text-forest tracking-tight">
                  This is not simply a crop problem.
                  <br />
                  <span className="text-earth italic font-normal">It is a soil health problem.</span>
                </p>
              </div>

              {/* Single Purpose Statement */}
              <div className="story-anim-item space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-olive block">
                  OUR FOUNDING PURPOSE
                </span>
                <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
                  Naati Organics was created with a single purpose:
                </p>
                <p className="font-display font-medium text-lg sm:text-xl text-forest pl-4 border-l-2 border-olive leading-snug">
                  &ldquo;To help farmers rebuild the health of their soil before trying to improve the crop. Because healthy crops are a natural outcome of healthy soil.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Macro Visual of Living Soil Soil Organic Matter */}
          <div className="lg:col-span-5">
            <div
              ref={visualWrapperRef}
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md group"
            >
              <Image
                src="/assets/images/about/living-soil-macro.jpg"
                alt="Macro view of living organic soil teeming with organic humus and biological activity"
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                quality={90}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-deep/80 backdrop-blur-md text-cream text-[11px] font-mono tracking-wider uppercase border border-cream/20">
                  <Sparkles className="w-3.5 h-3.5 text-harvest" />
                  <span>THE LIVING SOIL ECOSYSTEM</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 text-cream pointer-events-none">
                <span className="font-display text-lg sm:text-xl font-medium drop-shadow-sm block">
                  Billions of Organisms at Work
                </span>
                <span className="font-sans text-xs text-cream/80 block mt-1 leading-snug">
                  Healthy crumb structure, porous aggregate channels, and beneficial root-zone symbiosis.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            02 — WHY "NAATI"? (Client Specified Heritage Definition)
            ===================================================================== */}
        <div
          ref={naatiCardRef}
          className="rounded-3xl bg-forest-deep text-cream p-8 sm:p-12 lg:p-16 border border-forest/30 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 bg-olive/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-3xl relative z-10 mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-harvest">
                WHY &ldquo;NAATI&rdquo;?
              </span>
            </div>

            <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight mb-3">
              Why &ldquo;Naati&rdquo;?
            </h3>

            <p className="font-sans text-base sm:text-lg text-cream/90 leading-relaxed mb-2 [text-wrap:pretty]">
              The word <span className="text-harvest font-semibold">Naati</span> represents something deeply rooted in our heritage.
            </p>
            <p className="font-mono text-xs uppercase tracking-wider text-harvest/90 font-medium">
              It stands for:
            </p>
          </div>

          {/* 5 Pillars of "Naati" */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 sm:mb-10 relative z-10">
            {NAATI_PILLARS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-harvest/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-harvest shrink-0" />
                    <span className="font-mono text-[10px] text-cream/50 uppercase font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h4 className="font-display font-medium text-base sm:text-lg text-cream mb-1">
                    {item.title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-cream/70 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Conclusion Banner */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <p className="font-sans text-sm sm:text-base text-cream/90 max-w-2xl leading-relaxed">
              At Naati Organics, we combine these timeless values with modern agricultural knowledge to create practical solutions for today&apos;s farmers.
            </p>
            <div className="inline-flex items-center gap-2 text-harvest font-mono text-xs font-bold uppercase tracking-wider shrink-0">
              <Heart className="w-3.5 h-3.5 fill-harvest" />
              <span>Timeless Wisdom · Modern Science</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias
export const Section02AboutStory = AboutStoryBeneath;
