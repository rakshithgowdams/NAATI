'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight, AlertCircle } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { FARMER_QUESTIONS, FarmerQuestion } from '@/data/soilAcademy';

export interface FarmerQuestionsProps {
  className?: string;
}

/**
 * SOIL ACADEMY — SECTION 05: QUESTIONS FROM THE FIELD
 *
 * Minimal Editorial FAQ Accordion:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "04 / FARMER QUESTIONS"
 * - Headline: "Good questions grow better understanding."
 * - Six practical questions directly from the client document:
 *   1. Why is my soil becoming hard?
 *   2. Why are earthworms disappearing?
 *   3. Why are my roots weak?
 *   4. Why is water not staying in my field?
 *   5. Why do plants remain yellow even after fertilization?
 *   6. Why is organic matter important?
 * - Multi-cause scientific humility disclaimer on every diagnosis
 * - Smooth accessible expansion & keyboard navigation
 */
export function FarmerQuestions({ className }: FarmerQuestionsProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'soil-becoming-hard': true, // First question open by default
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="farmer-questions"
      data-nav-theme="light"
      aria-labelledby="questions-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="narrow">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-14 sm:mb-18">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              04 / FARMER QUESTIONS
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
              FIELD OBSERVATIONS
            </span>
          </div>

          <h2
            id="questions-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Good questions grow better understanding.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed mb-6 [text-wrap:pretty]">
            Practical agronomic questions raised by growers across South India. Below are scientifically cautious introductions addressing common symptoms.
          </p>

          {/* Scientific Caution Alert */}
          <div className="p-4 rounded-xl bg-forest-medium/10 border border-forest-medium/20 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-forest-medium shrink-0 mt-0.5" />
            <p className="font-sans text-xs sm:text-sm text-forest-deep/80 leading-relaxed">
              <strong>Agronomic Note:</strong> A field symptom (such as yellow foliage or poor water penetration) can have multiple distinct physical, biological, or chemical causes. Always inspect root architecture and soil friability before deciding on inputs.
            </p>
          </div>
        </div>

        {/* Minimal Accordion List */}
        <div className="divide-y divide-forest-deep/15 border-y border-forest-deep/15">
          {FARMER_QUESTIONS.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div key={item.id} className="py-6 sm:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-medium/40 focus-visible:ring-offset-2 rounded-lg"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-sm sm:text-base font-bold text-forest-medium/70 group-hover:text-forest-medium transition-colors">
                      {item.number}
                    </span>
                    <span className="font-display font-medium text-lg sm:text-xl md:text-2xl text-forest-deep group-hover:text-forest-medium transition-colors leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={cn(
                      'shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-1',
                      isOpen
                        ? 'border-forest-deep bg-forest-deep text-cream rotate-180'
                        : 'border-forest-deep/30 text-forest-deep group-hover:border-forest-deep group-hover:bg-forest-deep/5'
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Collapsible Body */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={item.id}
                  className={cn(
                    'overflow-hidden transition-all duration-400 ease-in-out',
                    isOpen ? 'max-h-[600px] opacity-100 mt-5' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="pl-8 sm:pl-12 pr-4 sm:pr-8 space-y-4">
                    <p className="font-sans text-base sm:text-lg text-forest-deep/85 leading-relaxed [text-wrap:pretty]">
                      {item.answer}
                    </p>

                    {/* Contributing Factors */}
                    <div className="p-4 rounded-xl bg-white/70 border border-forest-deep/10">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/70 block mb-2">
                        COMMON CONTRIBUTING FACTORS:
                      </span>
                      <ul className="space-y-1.5 list-disc list-inside font-sans text-xs sm:text-sm text-forest-deep/80">
                        {item.primaryCauses.map((cause, idx) => (
                          <li key={idx}>{cause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
                      <span className="text-forest-deep/60">
                        Recommended Action: {item.practicalAdvice}
                      </span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 font-bold text-forest-medium hover:text-forest-deep transition-colors uppercase tracking-wider"
                      >
                        <span>Discuss with an agronomist</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
