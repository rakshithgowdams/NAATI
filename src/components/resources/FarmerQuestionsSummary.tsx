'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight, AlertCircle } from 'lucide-react';
import { HUB_FARMER_QUESTIONS } from '@/data/resources';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface FarmerQuestionsSummaryProps {
  className?: string;
}

/**
 * FARMER KNOWLEDGE HUB — SECTION 06: FARMER QUESTIONS
 *
 * Eyebrow: 05 / QUESTIONS FROM THE FIELD
 * Headline: "Every question is a place to begin."
 *
 * Design:
 * - Minimal editorial accordion
 * - 6 practical questions from the client's field plan
 * - GSAP ScrollTrigger reveal for header and accordion rows
 * - Cautious scientific explanations acknowledging multiple contributing causes
 * - Actionable practical advice for growers
 * - Functional cross-links to relevant Soil Academy and Crop Solutions resources
 */
export function FarmerQuestionsSummary({ className }: FarmerQuestionsSummaryProps) {
  // Allow opening/closing accordion items (first item open by default for immediate context)
  const [openId, setOpenId] = useState<string | null>('q1-soil-hard');
  const sectionRef = useRef<HTMLElement>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.fq-head-anim',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Accordion rows entrance
      gsap.fromTo(
        '.fq-row-anim',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.fq-accordion-list',
            start: 'top 88%',
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
      id="farmer-questions"
      data-nav-theme="light"
      aria-labelledby="farmer-questions-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="fq-head-anim flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              05 / QUESTIONS FROM THE FIELD
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="farmer-questions-heading"
            className="fq-head-anim font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Every question is <br />
            <span className="italic font-light">a place to begin.</span>
          </h2>

          <p className="fq-head-anim font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Direct, scientifically grounded answers to the most common challenges encountered by growers across varied soil conditions and cropping patterns.
          </p>
        </div>

        {/* Editorial Accordion */}
        <div className="fq-accordion-list divide-y divide-forest-deep/15 border-t border-b border-forest-deep/15">
          {HUB_FARMER_QUESTIONS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="fq-row-anim transition-colors duration-200">
                {/* Accordion Trigger */}
                <button
                  type="button"
                  id={`accordion-trigger-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-forest-deep"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 pr-2">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-harvest tracking-widest shrink-0 mt-0.5 sm:mt-0">
                      {item.number}
                    </span>
                    <h3 className="font-display font-medium text-lg sm:text-xl lg:text-2xl text-forest-deep group-hover:text-forest-deep/80 transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="p-2 border border-forest-deep/20 text-forest-deep group-hover:bg-forest-deep group-hover:text-cream transition-all duration-200 shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-[800px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="pl-8 sm:pl-12 lg:pl-14 pr-2 sm:pr-8 space-y-6 pt-2">
                    {/* Primary Scientific Explanation */}
                    <p className="font-sans text-sm sm:text-base text-forest-deep/85 leading-relaxed">
                      {item.answer}
                    </p>

                    {/* Contributing Causes */}
                    <div className="bg-white/60 border border-forest-deep/10 p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-deep font-semibold">
                        <AlertCircle className="w-3.5 h-3.5 text-harvest" />
                        <span>Common Contributing Causes:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm font-sans text-forest-deep/80">
                        {item.causes.map((cause, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest-deep/40 shrink-0 mt-1.5" />
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Practical Guidance & Direct Cross-Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-forest-deep/10">
                      <div className="text-xs sm:text-sm font-sans text-forest-deep/75 italic">
                        <span className="font-semibold font-mono not-italic uppercase text-xs tracking-wider text-forest-deep mr-2">
                          Practical Step:
                        </span>
                        {item.practicalAdvice}
                      </div>

                      <Link
                        href={item.relatedHref}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] font-medium text-forest-deep hover:text-harvest transition-colors shrink-0"
                      >
                        <span>{item.relatedLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Guidance Notice */}
        <div className="mt-12 text-center text-xs font-mono text-forest-deep/60">
          Note: Field symptoms often reflect complex, overlapping soil variables. For customized acre-specific advice, consult your regional Naati agronomist.
        </div>
      </div>
    </section>
  );
}
