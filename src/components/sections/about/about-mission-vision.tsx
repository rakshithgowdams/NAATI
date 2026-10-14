'use client';

import React, { useRef, useEffect } from 'react';
import { Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutMissionVisionProps {
  className?: string;
}

const VISION_POINTS = [
  'Soil is treated as a living ecosystem.',
  'Farmers understand the science beneath their fields.',
  'Sustainable farming becomes economically rewarding.',
  'Every harvest begins with healthy soil.',
];

/**
 * ABOUT NAATI ORGANICS — SECTIONS 04 & 05: OUR MISSION & OUR VISION
 *
 * Client Specification:
 * OUR MISSION
 * Rebuild Soil.
 * Restore Nature.
 * Empower Farmers.
 * We exist to help farmers improve soil health through science-backed, farmer-friendly, sustainable crop nutrition systems.
 * Every product we develop...
 * Every guide we publish...
 * Every farmer we support...
 * is guided by one simple belief:
 * Healthy soil creates a healthier future.
 *
 * OUR VISION
 * To become India's most trusted soil health company by helping millions of farmers restore the productivity, resilience, and biological richness of their land.
 * We envision a future where:
 * • Soil is treated as a living ecosystem.
 * • Farmers understand the science beneath their fields.
 * • Sustainable farming becomes economically rewarding.
 * • Every harvest begins with healthy soil.
 */
export function AboutMissionVision({ className }: AboutMissionVisionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const missionCardRef = useRef<HTMLDivElement>(null);
  const visionCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Mission Card Entrance
      if (missionCardRef.current) {
        gsap.fromTo(
          missionCardRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: missionCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Vision Card Entrance
      if (visionCardRef.current) {
        gsap.fromTo(
          visionCardRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: visionCardRef.current,
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
      id="mission-vision"
      data-nav-theme="light"
      aria-label="Our Mission and Vision"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-24 lg:py-32 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* ===================================================================
              OUR MISSION CARD
              =================================================================== */}
          <div
            ref={missionCardRef}
            className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 rounded-3xl bg-cream-light border border-cream-border/90 shadow-warm-sm relative overflow-hidden"
          >
            {/* Subtle background decorative watermark */}
            <div
              className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-forest/5 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-forest text-cream flex items-center justify-center">
                  <Target className="w-4 h-4 text-harvest" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-olive">
                  OUR MISSION
                </span>
              </div>

              {/* Mission Triad */}
              <h3 className="font-display font-medium text-3xl sm:text-4xl text-forest tracking-[-0.02em] leading-tight mb-5">
                Rebuild Soil.
                <br />
                Restore Nature.
                <br />
                <span className="text-olive italic">Empower Farmers.</span>
              </h3>

              {/* Purpose Paragraph */}
              <p className="font-sans text-base sm:text-lg text-forest/85 leading-relaxed mb-6 [text-wrap:pretty]">
                We exist to help farmers improve soil health through science-backed,
                farmer-friendly, sustainable crop nutrition systems.
              </p>

              {/* Guiding Triad Bullets */}
              <div className="space-y-2.5 pt-4 border-t border-cream-border/80 text-sm sm:text-base font-sans text-text-secondary">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                  <span>Every product we develop...</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                  <span>Every guide we publish...</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                  <span>Every farmer we support...</span>
                </div>
              </div>
            </div>

            {/* Bottom Core Belief Highlight */}
            <div className="mt-8 pt-5 border-t border-cream-border/80">
              <p className="font-mono text-xs text-olive uppercase tracking-wider mb-1.5">
                Guided by one simple belief
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest text-cream text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 text-harvest" />
                <span>Healthy soil creates a healthier future.</span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              OUR VISION CARD
              =================================================================== */}
          <div
            ref={visionCardRef}
            className="flex flex-col justify-between p-8 sm:p-10 lg:p-12 rounded-3xl bg-forest text-cream border border-forest-border shadow-warm-md relative overflow-hidden"
          >
            {/* Subtle background decorative watermark */}
            <div
              className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-harvest/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Category Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-full bg-harvest/20 text-harvest flex items-center justify-center">
                  <Compass className="w-4 h-4 text-harvest" />
                </span>
                <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-harvest">
                  OUR VISION
                </span>
              </div>

              {/* Vision Statement */}
              <h3 className="font-display font-normal text-2xl sm:text-3xl text-cream tracking-[-0.02em] leading-snug mb-5 [text-wrap:pretty]">
                To become India&apos;s most trusted soil health company by helping millions of farmers restore the productivity, resilience, and biological richness of their land.
              </h3>

              {/* Vision List Header */}
              <p className="font-mono text-xs text-harvest/90 uppercase tracking-wider mb-4 pt-2">
                We envision a future where:
              </p>

              {/* 4 Vision Points */}
              <ul className="space-y-3 font-sans text-sm sm:text-base text-cream/85">
                {VISION_POINTS.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-harvest shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Accent */}
            <div className="mt-8 pt-5 border-t border-forest-border">
              <span className="font-mono text-xs text-cream/60 uppercase tracking-[0.2em]">
                Committed to regenerative Indian agriculture
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
