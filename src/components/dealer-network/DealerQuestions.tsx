'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { DEALER_FAQS } from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';

export interface DealerQuestionsProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 06: DEALER QUESTIONS
 *
 * Eyebrow: 05 / PARTNERSHIP QUESTIONS
 * Headline: "Before we begin."
 *
 * Minimalist Editorial FAQ Accordion:
 * - 6 Verified partnership questions
 * - Clear, honest answers without commercial hyperbole
 * - Full-width dividers, large clear typography, accessible keyboard navigation
 */
export function DealerQuestions({ className }: DealerQuestionsProps) {
  // First FAQ open by default
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="dealer-questions"
      data-nav-theme="light"
      aria-labelledby="dealer-questions-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              05 / PARTNERSHIP QUESTIONS
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="dealer-questions-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Before we begin.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Common questions regarding dealership eligibility, geographic coverage, application review, and partnership discussions.
          </p>
        </div>

        {/* Minimalist Full-Width Editorial Accordion */}
        <div className="divide-y divide-forest-deep/15 border-t border-b border-forest-deep/15">
          {DEALER_FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="transition-colors duration-200">
                {/* Accordion Trigger */}
                <button
                  type="button"
                  id={`dealer-faq-trigger-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`dealer-faq-panel-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full py-6 sm:py-7 flex items-center justify-between gap-4 text-left group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-forest-deep"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 pr-2">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-harvest tracking-widest shrink-0 mt-0.5 sm:mt-0">
                      {faq.number}
                    </span>
                    <h3 className="font-display font-medium text-lg sm:text-xl lg:text-2xl text-forest-deep group-hover:text-forest-deep/80 transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-2 border border-forest-deep/20 text-forest-deep group-hover:bg-forest-deep group-hover:text-cream transition-all duration-200 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  id={`dealer-faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`dealer-faq-trigger-${faq.id}`}
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-[600px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="pl-8 sm:pl-12 lg:pl-14 pr-2 sm:pr-8 space-y-4 pt-1">
                    <p className="font-sans text-sm sm:text-base text-forest-deep/85 leading-relaxed">
                      {faq.answer}
                    </p>

                    <div className="p-4 bg-white/60 border border-forest-deep/10 text-xs sm:text-sm font-sans text-forest-deep/75 leading-relaxed">
                      {faq.detail}
                    </div>

                    {faq.actionHref && (
                      <div className="pt-2">
                        <Link
                          href={faq.actionHref}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] font-medium text-forest-deep hover:text-harvest transition-colors"
                        >
                          <span>{faq.actionLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center text-xs font-mono text-forest-deep/60">
          Have an unlisted question? Reach our partnership desk directly at info@naatiorganics.com.
        </div>
      </div>
    </section>
  );
}
