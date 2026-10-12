'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Info, Check, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { SOIL_HOTSPOTS, SoilHotspot } from '@/data/soilAcademy';

export interface LivingSoilExplorerProps {
  className?: string;
}

/**
 * SOIL ACADEMY — SECTION 03: THE LIVING SOIL EXPLORER
 *
 * Signature Educational Interaction:
 * - Background: Deep forest green (#14240E) with data-nav-theme="dark"
 * - Eyebrow: "02 / EXPLORE BELOW THE SURFACE"
 * - Headline: "Soil is not just dirt. It's a living system."
 * - Full-width high-resolution cross-sectional soil profile photograph
 * - 5 interactive selectable hotspots with calibrated anchor coordinates:
 *   01: SOIL STRUCTURE
 *   02: ORGANIC MATTER
 *   03: SOIL BIOLOGY
 *   04: ROOT HEALTH
 *   05: WATER & AIR
 * - Clicking any hotspot focuses the node and displays clear scientific editorial details
 * - Mobile-friendly touch list below the visual
 */
export function LivingSoilExplorer({ className }: LivingSoilExplorerProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('structure');
  const activeHotspot = SOIL_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? SOIL_HOTSPOTS[0];

  const sectionRef = useRef<HTMLElement>(null);
  const visualContainerRef = useRef<HTMLDivElement>(null);
  const activeDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        '.explorer-header',
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

      // Visual container entrance
      if (visualContainerRef.current) {
        gsap.fromTo(
          visualContainerRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visualContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handleSelectHotspot = (id: string) => {
    if (id === activeHotspotId) return;

    if (!isReducedMotion() && activeDetailRef.current) {
      gsap.fromTo(
        activeDetailRef.current,
        { opacity: 0.5, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
    setActiveHotspotId(id);
  };

  return (
    <section
      ref={sectionRef}
      id="living-soil-explorer"
      data-nav-theme="dark"
      aria-labelledby="explorer-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-20 sm:py-28 lg:py-36 border-t border-cream/10 overflow-hidden',
        className
      )}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide">
        {/* Section Header */}
        <div className="explorer-header max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-harvest">
              02 / EXPLORE BELOW THE SURFACE
            </span>
            <span className="h-px w-8 bg-harvest/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-cream/60 hidden sm:inline-block">
              SIGNATURE EDUCATIONAL EXPLORER
            </span>
          </div>

          <h2
            id="explorer-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.5vw,4.2rem)] leading-[1.08] tracking-[-0.035em] text-cream mb-6 [text-wrap:balance]"
          >
            Soil is not just dirt.
            <br />
            <span className="italic text-harvest">It&apos;s a living system.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-cream/80 leading-relaxed [text-wrap:pretty]">
            Discover the essential components and processes that help soil support plant growth. Select any hotspot below to inspect the subterranean ecosystem.
          </p>
        </div>

        {/* =====================================================================
            INTERACTIVE SOIL VISUAL & HOTSPOTS STAGE
            ===================================================================== */}
        <div
          ref={visualContainerRef}
          className="relative w-full rounded-3xl overflow-hidden bg-forest-deep border border-cream/15 shadow-warm-lg mb-8"
        >
          {/* Main Soil Cross-Section Photography */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden select-none">
            <Image
              src="/assets/images/soil-academy/living-soil-explorer.jpg"
              alt="Detailed scientific cross-section of living agricultural topsoil showing roots, pores, earthworms and organic matter"
              fill
              sizes="(max-width: 1280px) 100vw, 1440px"
              quality={92}
              className="object-cover object-center"
            />

            {/* Controlled darkening gradient for readable hotspot buttons */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-black/30 pointer-events-none"
              aria-hidden="true"
            />

            {/* Desktop Interactive Hotspot Pins */}
            <div className="hidden sm:block absolute inset-0 pointer-events-auto">
              {SOIL_HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspotId === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => handleSelectHotspot(hotspot.id)}
                    style={{
                      left: `${hotspot.xPercent}%`,
                      top: `${hotspot.yPercent}%`,
                    }}
                    className={cn(
                      'absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest rounded-full transition-transform duration-300',
                      isActive ? 'scale-110' : 'hover:scale-105'
                    )}
                    aria-label={`Inspect ${hotspot.title}: ${hotspot.summary}`}
                  >
                    {/* Pulsing beacon ring */}
                    <span
                      className={cn(
                        'absolute -inset-2 rounded-full transition-opacity duration-300',
                        isActive
                          ? 'bg-harvest/30 animate-ping'
                          : 'bg-cream/10 opacity-0 group-hover:opacity-100'
                      )}
                    />

                    {/* Hotspot Core Pin */}
                    <div
                      className={cn(
                        'relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md transition-all duration-300 shadow-md',
                        isActive
                          ? 'bg-harvest text-forest-deep border-harvest font-bold'
                          : 'bg-forest-deep/80 text-cream border-cream/30 hover:border-harvest hover:text-harvest'
                      )}
                    >
                      <span className="font-mono text-xs">{hotspot.number}</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider hidden md:inline">
                        {hotspot.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom In-Image Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 bg-forest-deep/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-cream/20">
              <span className="font-mono text-[11px] uppercase tracking-wider text-harvest font-semibold">
                SCIENTIFIC CROSS-SECTION PROFILE
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            HOTSPOT NAVIGATION & ACTIVE DETAIL CARD
            ===================================================================== */}
        {/* Hotspot Selector Tabs (Visible on all devices for fast switching) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-wider text-cream/50 mr-2 hidden sm:inline">
            EXPLORE NODES:
          </span>
          {SOIL_HOTSPOTS.map((h) => {
            const isActive = activeHotspotId === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => handleSelectHotspot(h.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer',
                  isActive
                    ? 'bg-harvest text-forest-deep font-bold shadow-xs'
                    : 'bg-cream/5 text-cream/75 border border-cream/15 hover:border-cream/40 hover:text-cream'
                )}
              >
                {h.number} · {h.title}
              </button>
            );
          })}
        </div>

        {/* Active Node Detail Card */}
        <div
          ref={activeDetailRef}
          className="rounded-2xl bg-cream/5 border border-cream/15 p-6 sm:p-8 lg:p-10 backdrop-blur-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Header info */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-cream/15 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-harvest bg-harvest/10 px-3 py-1 rounded-full border border-harvest/30">
                  NODE {activeHotspot.number}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-cream/50">
                  CATEGORY: {activeHotspot.category}
                </span>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl text-cream tracking-tight mb-2">
                {activeHotspot.title}
              </h3>

              <p className="font-display italic text-base sm:text-lg text-harvest/90">
                &ldquo;{activeHotspot.summary}&rdquo;
              </p>
            </div>

            {/* Detail explanation */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full lg:pl-4">
              <p className="font-sans text-base sm:text-lg text-cream/85 leading-relaxed mb-6 [text-wrap:pretty]">
                {activeHotspot.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream/10 text-xs font-mono text-cream/60">
                <span>Natural Agronomic Mechanism · Zero Artificial Interventions</span>
                <a
                  href="#five-lessons"
                  className="inline-flex items-center gap-1.5 text-harvest hover:text-cream font-semibold transition-colors"
                >
                  <span>Learn how this connects to Lesson 03</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
