'use client';

import React, { useRef, useEffect } from 'react';
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
} from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
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
 */
export function WhyFarmersChooseNaati({ className }: WhyFarmersChooseNaatiProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
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

      // 2. Left visual card reveal
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

      // 3. Grid items staggered reveal
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.why-pillar-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsGridRef.current,
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
      id="why-farmers-choose-naati"
      data-nav-theme="light"
      aria-labelledby="why-naati-heading"
      className={cn(
        'relative w-full bg-[#FAF7F0] text-forest py-20 sm:py-28 lg:py-32 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-10" />

      <Container size="default">
        {/* =====================================================================
            01 — SECTION HEADER (Client Specification)
            SECTION 9 – WHY FARMERS CHOOSE NAATI
            More Than Products.
            A Farming Philosophy.
            ===================================================================== */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <div className="why-header-anim inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              SECTION 9 – WHY FARMERS CHOOSE NAATI
            </span>
          </div>

          <h2
            id="why-naati-heading"
            className="tracking-[-0.03em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="why-header-anim block font-display font-medium text-[clamp(2.35rem,4.5vw,4.2rem)] text-forest">
              More Than Products.
            </span>
            <span className="why-header-anim block mt-1 font-display italic font-normal text-olive text-[clamp(2.35rem,4.5vw,4.2rem)]">
              A Farming Philosophy.
            </span>
          </h2>

          <p className="why-header-anim font-sans text-base sm:text-lg text-text-secondary mt-4 max-w-2xl leading-relaxed [text-wrap:pretty]">
            Most agricultural inputs treat crops as standalone chemical factories. At Naati Organics, we view farming as an enduring partnership with the living soil under our feet.
          </p>
        </div>

        {/* =====================================================================
            02 — SPLIT SHOWCASE (Hero Photo Anchor + 6 Philosophy Pillars)
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Documentary Anchor & Brand Promise (~40%) */}
          <div ref={visualRef} className="lg:col-span-5 flex flex-col space-y-6">
            {/* High-Resolution Documentary Photo Frame */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md group">
              <Image
                src="/assets/images/home/why-farmers-choose-naati.jpg"
                alt="Farmer and agricultural advisor examining living soil root nodules in Karnataka field"
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                quality={90}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                <span className="font-display text-base sm:text-lg font-medium drop-shadow-sm block">
                  Root-Level Trust Across South India
                </span>
                <span className="font-sans text-xs text-cream/80 block mt-0.5">
                  Inspecting living humus &amp; mycorrhizal root nodulation
                </span>
              </div>
            </div>

            {/* Editorial Manifesto Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-cream-light border border-cream-border/90 shadow-warm-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-earth block mb-2">
                A PROMISE TO THE LAND
              </span>
              <p className="font-display italic text-lg sm:text-xl text-forest leading-snug mb-3">
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

          {/* Right Column: 6 Philosophy Pillars Grid (~60%) */}
          <div ref={cardsGridRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PHILOSOPHY_PILLARS.map((pillar) => {
              const IconComponent = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  className="why-pillar-card p-5 sm:p-6 rounded-2xl bg-cream-light/95 border border-cream-border/90 hover:border-olive/40 hover:bg-white shadow-warm-xs transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Checkmark Icon & Index */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300">
                          <CheckCircle2 className="w-4 h-4 text-olive group-hover:text-harvest transition-colors" />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-text-muted tracking-widest uppercase">
                          {pillar.number} / 06
                        </span>
                      </div>

                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cream-deep border border-cream-border text-forest/75 font-medium uppercase tracking-wider">
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-display font-medium text-lg sm:text-xl text-forest tracking-tight group-hover:text-olive transition-colors mb-1">
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
                    <span className="w-1.5 h-1.5 rounded-full bg-harvest opacity-0 group-hover:opacity-100 transition-opacity" />
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

// Backward-compatible alias
export const Section09WhyFarmersChooseNaati = WhyFarmersChooseNaati;
