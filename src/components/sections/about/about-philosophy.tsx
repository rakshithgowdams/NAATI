'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutPhilosophyProps {
  className?: string;
}

const CASCADE_STEPS = [
  {
    step: '01',
    title: 'Healthy Soil',
    subtitle: 'Living Subterranean Biology',
    desc: 'Rich in organic carbon, active microbes, and mineral balance.',
    color: 'border-earth/40 text-harvest',
    bg: 'bg-earth/10',
  },
  {
    step: '02',
    title: 'Strong Roots',
    subtitle: 'Deeper Feeder Network',
    desc: 'Expansive architecture absorbing moisture and micronutrients efficiently.',
    color: 'border-olive/40 text-olive-light',
    bg: 'bg-olive/10',
  },
  {
    step: '03',
    title: 'Healthy Plants',
    subtitle: 'Vigorous Foliar Canopy',
    desc: 'High chlorophyll index, strong vascular system, and natural disease resistance.',
    color: 'border-forest-light/40 text-cream',
    bg: 'bg-forest-light/10',
  },
  {
    step: '04',
    title: 'Abundant Harvests',
    subtitle: 'Compound Resilience & Yield',
    desc: 'Higher packout grade, superior market taste, and renewed soil fertility for next season.',
    color: 'border-harvest/50 text-harvest',
    bg: 'bg-harvest/10',
  },
];

/**
 * ABOUT NAATI ORGANICS — SECTION 06: OUR PHILOSOPHY
 *
 * Client Specification:
 * OUR PHILOSOPHY
 * Soil First.
 * Everything Else Follows.
 * Most agricultural systems begin with the crop.
 * Naati begins with the soil.
 * Because:
 * Healthy Soil
 * ↓
 * Strong Roots
 * ↓
 * Healthy Plants
 * ↓
 * Abundant Harvests
 * This philosophy influences every product, every recommendation, and every conversation we have with farmers.
 */
export function AboutPhilosophy({ className }: AboutPhilosophyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cascadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.phil-about-header',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      headerTl
        .fromTo(
          '.phil-about-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.phil-about-headline',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.phil-about-intro',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      // 2. Cascade cards animation
      if (cascadeRef.current) {
        gsap.fromTo(
          cascadeRef.current.querySelectorAll('.cascade-step-card'),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cascadeRef.current,
              start: 'top 82%',
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
      id="about-philosophy"
      data-nav-theme="dark"
      aria-labelledby="about-phil-heading"
      className={cn(
        'relative w-full bg-[#14240E] text-cream overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Boundary Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream/15" />

      <Container size="default">
        {/* =======================================================================
            1. SECTION INTRODUCTION
            ======================================================================= */}
        <div className="phil-about-header max-w-3xl mb-12 sm:mb-16 md:mb-20">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="phil-about-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
              OUR PHILOSOPHY
            </span>
          </div>

          {/* Main Headline in Fraunces */}
          <h2
            id="about-phil-heading"
            className="phil-about-headline tracking-[-0.035em] leading-[1.05] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-cream">
              Soil First.
            </span>
            <span className="block font-display italic font-normal text-harvest text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              Everything Else Follows.
            </span>
          </h2>

          {/* Supporting Intro in DM Sans */}
          <p className="phil-about-intro font-sans text-base sm:text-lg md:text-xl text-cream-muted/90 mt-4 sm:mt-5 max-w-2xl leading-relaxed [text-wrap:pretty]">
            Most agricultural systems begin with the crop. Naati begins with the soil.
          </p>
        </div>

        {/* =======================================================================
            2. THE BIOLOGICAL CASCADE (Client Specification)
            Healthy Soil ↓ Strong Roots ↓ Healthy Plants ↓ Abundant Harvests
            ======================================================================= */}
        <div className="mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-harvest" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-harvest font-semibold">
              The Biological Chain Reaction
            </span>
          </div>

          <div
            ref={cascadeRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch relative"
          >
            {CASCADE_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={cn(
                  'cascade-step-card relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border backdrop-blur-xs transition-all duration-300 hover:border-harvest/50 group',
                  item.bg,
                  item.color
                )}
              >
                <div>
                  {/* Step counter */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold tracking-widest text-cream/60">
                      STEP {item.step}
                    </span>
                    {idx < CASCADE_STEPS.length - 1 && (
                      <span className="hidden lg:flex w-6 h-6 rounded-full bg-cream/10 items-center justify-center text-cream/70 group-hover:text-harvest transition-colors">
                        <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-medium text-2xl text-cream mb-1">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-harvest/90 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="font-sans text-sm text-cream-muted/90 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Mobile vertical down arrow indicator */}
                {idx < CASCADE_STEPS.length - 1 && (
                  <div className="flex lg:hidden justify-center pt-4">
                    <ArrowDown className="w-4 h-4 text-cream/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Closing Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/15 max-w-3xl mb-14">
          <p className="font-sans text-base sm:text-lg text-cream/95 leading-relaxed italic [text-wrap:pretty]">
            &ldquo;This philosophy influences every product, every recommendation, and every conversation we have with farmers.&rdquo;
          </p>
        </div>

        {/* =======================================================================
            3. CONNECTED NUTRITION SYSTEMS (Naati Plus & Naati Pro)
            ======================================================================= */}
        <div className="phil-connect-stage relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-cream/15 bg-forest-surface shadow-2xl p-6 sm:p-10 md:p-12">
          {/* Background Soil-Plant Connection Visual */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image
              src="/assets/images/about/soil-plant-connection.jpg"
              alt="Botanical study of plant foliage and roots anchored deeply into living soil"
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="object-cover object-center select-none mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#14240E]/90 via-[#14240E]/80 to-[#14240E]/95" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* PILLAR 01: BUILD THE SOIL */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/10 backdrop-blur-xs">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-harvest">
                    SYSTEM 01 / BUILD THE SOIL
                  </span>
                </div>
                <h3 className="font-display font-medium text-2xl text-cream mb-2">
                  The Subterranean Foundation
                </h3>
                <p className="font-sans text-sm sm:text-base text-cream-muted/90 leading-relaxed mb-6">
                  Rebuild soil structure, restore beneficial microbial colonies, and enrich organic carbon around the root zone.
                </p>
              </div>
              <div className="pt-4 border-t border-cream/10">
                <Link
                  href="/products/naati-plus"
                  className="group inline-flex items-center gap-2 text-sm font-sans font-semibold text-harvest hover:text-cream transition-colors"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-harvest">NAATI PLUS</span>
                  <span className="text-cream-muted/70">— Enriched Vermicompost</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* PILLAR 02: FEED THE PLANT */}
            <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-cream/5 border border-cream/10 backdrop-blur-xs">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive-light" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-olive-light">
                    SYSTEM 02 / FEED THE PLANT
                  </span>
                </div>
                <h3 className="font-display font-medium text-2xl text-cream mb-2">
                  The Canopy & Yield Vitality
                </h3>
                <p className="font-sans text-sm sm:text-base text-cream-muted/90 leading-relaxed mb-6">
                  Provide balanced secondary and micronutrient nutrition to power vegetative vigor, flowering, and fruit set.
                </p>
              </div>
              <div className="pt-4 border-t border-cream/10">
                <Link
                  href="/products/naati-pro"
                  className="group inline-flex items-center gap-2 text-sm font-sans font-semibold text-olive-light hover:text-cream transition-colors"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-olive-light">NAATI PRO</span>
                  <span className="text-cream-muted/70">— Liquid Plant Nutrient</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
