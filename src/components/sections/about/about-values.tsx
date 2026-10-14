'use client';

import React, { useRef, useEffect } from 'react';
import { Scale, BookOpen, Leaf, Lightbulb, Users2 } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutValuesProps {
  className?: string;
}

const VALUES_DATA = [
  {
    index: '01',
    value: 'Integrity',
    meaning: "Honest recommendations, even when they don't immediately lead to a sale.",
    icon: Scale,
    tag: 'ETHICAL FOUNDATION',
  },
  {
    index: '02',
    value: 'Education',
    meaning: 'Helping farmers understand the "why" behind every recommendation.',
    icon: BookOpen,
    tag: 'FARMER EMPOWERMENT',
  },
  {
    index: '03',
    value: 'Sustainability',
    meaning: 'Protecting soil health for future generations.',
    icon: Leaf,
    tag: 'LONG-TERM STEWARDSHIP',
  },
  {
    index: '04',
    value: 'Innovation',
    meaning: 'Continuously improving products and knowledge.',
    icon: Lightbulb,
    tag: 'CONTINUAL LEARNING',
  },
  {
    index: '05',
    value: 'Partnership',
    meaning: 'Growing alongside farmers, not just serving them.',
    icon: Users2,
    tag: 'COMMUNITY BOND',
  },
];

/**
 * ABOUT NAATI ORGANICS — SECTION 10: OUR VALUES
 *
 * Client Specification:
 * OUR VALUES
 * Value          What It Means
 * Integrity      Honest recommendations, even when they don't immediately lead to a sale.
 * Education      Helping farmers understand the "why" behind every recommendation.
 * Sustainability Protecting soil health for future generations.
 * Innovation     Continuously improving products and knowledge.
 * Partnership    Growing alongside farmers, not just serving them.
 */
export function AboutValues({ className }: AboutValuesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (rowsRef.current) {
        gsap.fromTo(
          rowsRef.current.querySelectorAll('.value-item-row'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowsRef.current,
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
      id="our-values"
      data-nav-theme="light"
      aria-labelledby="values-heading"
      className={cn(
        'relative w-full bg-[#FAF7F0] text-forest py-20 sm:py-26 lg:py-32 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              ETHOS & PRINCIPLES
            </span>
          </div>

          <h2
            id="values-heading"
            className="font-display font-medium text-[clamp(2.15rem,3.8vw,3.5rem)] text-forest tracking-[-0.03em] leading-tight mb-4"
          >
            Our Values
          </h2>
          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
            The core convictions that guide every decision, handshake, and product formulation.
          </p>
        </div>

        {/* =====================================================================
            EDITORIAL VALUES LIST / TABLE
            ===================================================================== */}
        <div
          ref={rowsRef}
          className="border-y border-cream-border/80 divide-y divide-cream-border/70 bg-cream-light/60 rounded-3xl px-6 sm:px-10 py-2 shadow-warm-xs"
        >
          {VALUES_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                className="value-item-row py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center transition-colors hover:bg-cream-light/80"
              >
                {/* Index & Value Name */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-olive" />
                  </span>
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-text-muted tracking-widest block uppercase">
                      {item.index}
                    </span>
                    <h3 className="font-display font-medium text-2xl text-forest tracking-tight">
                      {item.value}
                    </h3>
                  </div>
                </div>

                {/* What It Means */}
                <div className="md:col-span-6">
                  <p className="font-sans text-base sm:text-lg text-forest/90 leading-relaxed [text-wrap:pretty]">
                    {item.meaning}
                  </p>
                </div>

                {/* Focus Tag Badge */}
                <div className="md:col-span-2 md:text-right">
                  <span className="inline-block font-mono text-[10px] sm:text-[11px] font-semibold text-olive uppercase tracking-wider bg-olive/10 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
