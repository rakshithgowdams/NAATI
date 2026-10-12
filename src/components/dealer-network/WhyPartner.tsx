'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PARTNERSHIP_PILLARS } from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';

export interface WhyPartnerProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 02: WHY GROW WITH NAATI
 *
 * Eyebrow: 01 / THE PARTNERSHIP PHILOSOPHY
 * Headline: "More than products. A shared direction."
 * Supporting: "Naati Organics brings together soil-focused and plant-focused nutrition within a broader philosophy of thoughtful agriculture."
 *
 * Design:
 * - Large typography-led introductory statement
 * - 4 refined editorial rows with fine dividers and subtle hover response (NOT generic benefit cards)
 * - Honest positioning: describes partnership direction without implying guaranteed credit terms or exclusive rights
 */
export function WhyPartner({ className }: WhyPartnerProps) {
  return (
    <section
      id="why-partner"
      data-nav-theme="light"
      aria-labelledby="why-partner-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Introductory Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
                01 / THE PARTNERSHIP PHILOSOPHY
              </span>
              <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
            </div>

            <h2
              id="why-partner-heading"
              className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
            >
              More than products. <br />
              <span className="italic font-light">A shared direction.</span>
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <p className="font-sans text-base sm:text-lg lg:text-xl text-forest-deep/80 leading-relaxed max-w-xl">
              Naati Organics brings together soil-focused and plant-focused nutrition within a broader philosophy of thoughtful agriculture.
            </p>
            <div className="mt-4 pt-4 border-t border-forest-deep/10 text-xs font-mono text-forest-deep/60 uppercase tracking-wider">
              Building long-term agricultural resilience alongside regional partners
            </div>
          </div>
        </div>

        {/* Four Refined Editorial Rows */}
        <div className="divide-y divide-forest-deep/15 border-t border-b border-forest-deep/15">
          {PARTNERSHIP_PILLARS.map((pillar) => (
            <article
              key={pillar.number}
              className="group py-8 sm:py-10 lg:py-12 transition-colors duration-300 hover:bg-white/50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start sm:items-center">
                {/* Column 1: Index Number & Accent */}
                <div className="md:col-span-3 flex items-center md:flex-col md:items-start justify-between md:justify-start gap-2">
                  <span className="font-mono text-sm sm:text-base font-semibold text-harvest tracking-widest">
                    {pillar.number}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-forest-deep/60">
                    {pillar.accent}
                  </span>
                </div>

                {/* Column 2: Pillar Title */}
                <div className="md:col-span-4">
                  <h3 className="font-display font-medium text-xl sm:text-2xl lg:text-3xl text-forest-deep group-hover:text-forest-deep/90 leading-tight">
                    {pillar.title}
                  </h3>
                </div>

                {/* Column 3: Description */}
                <div className="md:col-span-5">
                  <p className="font-sans text-sm sm:text-base text-forest-deep/75 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial Context Footnote */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-forest-deep/60">
          <span>* Describing Naati Organics&apos; positioning and mutual partnership direction.</span>
          <span className="uppercase tracking-wider">Agro-Commercial Values</span>
        </div>
      </div>
    </section>
  );
}
