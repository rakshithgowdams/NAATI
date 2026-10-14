'use client';

import React, { useRef, useEffect } from 'react';
import { Check, ShieldCheck, Award } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutDifferencePromiseProps {
  className?: string;
}

const DIFFERENCES = [
  {
    icon: '🌱',
    title: 'Soil-First Philosophy',
    description: 'We focus on restoring soil health before addressing crop performance.',
  },
  {
    icon: '📚',
    title: 'Education Before Products',
    description:
      'We believe informed farmers make better farming decisions. That is why we invest in educational resources, guides, and practical knowledge—not just products.',
  },
  {
    icon: '🤝',
    title: 'Farmer-Centric Thinking',
    description:
      'Every recommendation should be practical, understandable, and useful in the field.',
  },
  {
    icon: '🔬',
    title: 'Science Meets Nature',
    description:
      'We combine natural agricultural principles with scientific understanding to create balanced crop nutrition systems.',
  },
  {
    icon: '🌍',
    title: 'Long-Term Sustainability',
    description: 'Healthy soil today creates resilient farms tomorrow.',
  },
];

const NAATI_PROMISES = [
  'Respect the soil.',
  'Support the farmer.',
  'Promote sustainable agriculture.',
  'Continue learning.',
  'Continue educating.',
  'Build trust before business.',
];

/**
 * ABOUT NAATI ORGANICS — SECTIONS 08 & 09: WHAT MAKES US DIFFERENT? & THE NAATI PROMISE
 *
 * Client Specification:
 * WHAT MAKES US DIFFERENT?
 * 🌱 Soil-First Philosophy
 * 📚 Education Before Products
 * 🤝 Farmer-Centric Thinking
 * 🔬 Science Meets Nature
 * 🌍 Long-Term Sustainability
 *
 * THE NAATI PROMISE
 * We promise to:
 * ✔ Respect the soil.
 * ✔ Support the farmer.
 * ✔ Promote sustainable agriculture.
 * ✔ Continue learning.
 * ✔ Continue educating.
 * ✔ Build trust before business.
 */
export function AboutDifferencePromise({ className }: AboutDifferencePromiseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const diffListRef = useRef<HTMLDivElement>(null);
  const promiseCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Differentiators stagger entrance
      if (diffListRef.current) {
        gsap.fromTo(
          diffListRef.current.querySelectorAll('.diff-item-row'),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: diffListRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Promise Card Entrance
      if (promiseCardRef.current) {
        gsap.fromTo(
          promiseCardRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: promiseCardRef.current,
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
      id="difference-promise"
      data-nav-theme="light"
      aria-labelledby="difference-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-26 lg:py-32 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ===================================================================
              LEFT (7 Cols): WHAT MAKES US DIFFERENT?
              =================================================================== */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                DISTINCT APPROACH
              </span>
            </div>

            <h2
              id="difference-heading"
              className="font-display font-medium text-[clamp(2.15rem,3.8vw,3.5rem)] text-forest tracking-[-0.03em] leading-tight mb-8 sm:mb-10 [text-wrap:balance]"
            >
              What Makes Us Different?
            </h2>

            {/* List of 5 Differentiators */}
            <div ref={diffListRef} className="space-y-4 sm:space-y-5">
              {DIFFERENCES.map((diff, idx) => (
                <div
                  key={idx}
                  className="diff-item-row p-6 rounded-2xl bg-cream-light border border-cream-border/80 shadow-warm-xs hover:border-olive/40 hover:shadow-warm-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl sm:text-3xl shrink-0 select-none p-2 rounded-xl bg-forest/5">
                      {diff.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-medium text-lg sm:text-xl text-forest mb-1.5">
                        {diff.title}
                      </h3>
                      <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed [text-wrap:pretty]">
                        {diff.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================================
              RIGHT (5 Cols): THE NAATI PROMISE
              Authoritative Certificate / Pledge Styling
              =================================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div
              ref={promiseCardRef}
              className="p-8 sm:p-10 rounded-3xl bg-forest text-cream border border-forest-border shadow-warm-lg relative overflow-hidden"
            >
              {/* Background Glow */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-harvest/15 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Eyebrow & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-harvest" />
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-harvest">
                    OUR COMMITMENT
                  </span>
                </div>
                <Award className="w-5 h-5 text-harvest/70" />
              </div>

              {/* Title */}
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-cream tracking-tight mb-2">
                The Naati Promise
              </h3>
              <p className="font-sans text-sm text-cream/80 mb-6 pb-4 border-b border-forest-border">
                We promise to:
              </p>

              {/* The 6 Promises with checkmarks */}
              <ul className="space-y-3.5 mb-8">
                {NAATI_PROMISES.map((promise, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-harvest text-forest flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="font-sans font-medium text-sm sm:text-base text-cream">
                      {promise}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom Stamp of Trust */}
              <div className="pt-6 border-t border-forest-border/80 flex items-center justify-between text-xs font-mono text-cream/60">
                <span className="uppercase tracking-widest">Ground Truth in Soil</span>
                <span className="text-harvest font-semibold">100% TRANSPARENCY</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
