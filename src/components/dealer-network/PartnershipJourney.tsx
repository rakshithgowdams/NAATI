'use client';

import React from 'react';
import { PARTNERSHIP_STAGES } from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';

export interface PartnershipJourneyProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 04: THE PARTNERSHIP JOURNEY
 *
 * Eyebrow: 03 / GETTING STARTED
 * Headline: "Every partnership begins with a conversation."
 *
 * Design:
 * - Desktop: Horizontal editorial timeline with clean numbering, connecting line and clear stages
 * - Mobile: Responsive vertical timeline with progressive indicators
 * - Grounded framing: Explains the exploratory dialogue without false promises of automatic approval or legal guarantees
 */
export function PartnershipJourney({ className }: PartnershipJourneyProps) {
  return (
    <section
      id="partnership-journey"
      data-nav-theme="light"
      aria-labelledby="partnership-journey-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              03 / GETTING STARTED
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="partnership-journey-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Every partnership <br />
            <span className="italic font-light">begins with a conversation.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Our collaborative onboarding process is built around straightforward communication, clear mutual expectations, and honest evaluation of market needs.
          </p>
        </div>

        {/* Timeline Layout */}
        {/* Desktop Horizontal Timeline (1024px+) */}
        <div className="hidden lg:block relative pt-8 pb-12">
          {/* Horizontal Connecting Guide Line */}
          <div
            className="absolute top-[52px] left-[5%] right-[5%] h-px bg-forest-deep/20 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {PARTNERSHIP_STAGES.map((stage) => (
              <div key={stage.number} className="flex flex-col">
                {/* Stage Marker Dot */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-forest-deep text-cream border-2 border-cream flex items-center justify-center font-mono text-xs font-semibold shadow-sm">
                    {stage.number}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-harvest font-semibold">
                    STAGE {stage.number}
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-display font-medium text-lg xl:text-xl text-forest-deep mb-2 leading-snug">
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="font-sans text-xs xl:text-sm text-forest-deep/75 leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Focus Detail */}
                <div className="mt-auto pt-3 border-t border-forest-deep/10 text-[11px] font-mono text-forest-deep/60">
                  {stage.focus}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (<1024px) */}
        <div className="lg:hidden relative pl-6 border-l border-forest-deep/20 space-y-8 sm:space-y-10">
          {PARTNERSHIP_STAGES.map((stage) => (
            <div key={stage.number} className="relative">
              {/* Marker on the vertical line */}
              <div
                className="absolute -left-[31px] top-1 w-7 h-7 rounded-full bg-forest-deep text-cream border border-cream flex items-center justify-center font-mono text-[10px] font-semibold"
                aria-hidden="true"
              >
                {stage.number}
              </div>

              <div className="text-xs font-mono text-harvest uppercase tracking-wider mb-1 font-semibold">
                STAGE {stage.number}
              </div>

              <h3 className="font-display font-medium text-lg sm:text-xl text-forest-deep mb-1.5 leading-snug">
                {stage.title}
              </h3>

              <p className="font-sans text-sm text-forest-deep/75 leading-relaxed mb-2">
                {stage.description}
              </p>

              <div className="text-[11px] font-mono text-forest-deep/60">
                {stage.focus}
              </div>
            </div>
          ))}
        </div>

        {/* Cautious Editorial Disclaimer */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-forest-deep/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-forest-deep/60">
          <span>* All partnership discussions depend on mutual operational alignment and verified territory coverage.</span>
          <span className="uppercase tracking-wider">Transparent Process</span>
        </div>
      </div>
    </section>
  );
}
