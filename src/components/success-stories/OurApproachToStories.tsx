'use client';

import React from 'react';
import { STORY_PRINCIPLES } from '@/data/fieldStories';
import { cn } from '@/lib/utils/cn';

export interface OurApproachToStoriesProps {
  className?: string;
}

/**
 * SUCCESS STORIES — SECTION 05: OUR APPROACH TO FIELD STORIES
 *
 * Eyebrow: 04 / HOW WE LISTEN
 * Headline: "Real experience. Thoughtfully documented."
 * Supporting: "Every farm has its own conditions. Understanding an experience means looking beyond a single photograph or outcome."
 *
 * Design:
 * - Sophisticated typography-led composition on warm cream background
 * - 3 spacious rows separated by fine dividers (no generic cards)
 * - Communicates authenticity, scientific caution, and responsible agricultural documentation
 */
export function OurApproachToStories({ className }: OurApproachToStoriesProps) {
  return (
    <section
      id="our-approach"
      data-nav-theme="light"
      aria-labelledby="our-approach-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Introductory Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-14 lg:mb-20">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
                04 / HOW WE LISTEN
              </span>
              <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
            </div>

            <h2
              id="our-approach-heading"
              className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
            >
              Real experience. <br />
              <span className="italic font-light">Thoughtfully documented.</span>
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end">
            <p className="font-sans text-base sm:text-lg lg:text-xl text-forest-deep/80 leading-relaxed max-w-xl">
              Every farm has its own conditions. Understanding an experience means looking beyond a single photograph or outcome.
            </p>
            <div className="mt-4 pt-4 border-t border-forest-deep/10 text-xs font-mono text-forest-deep/60 uppercase tracking-wider">
              Responsible agricultural storytelling founded on scientific integrity
            </div>
          </div>
        </div>

        {/* Three Spacious Rows Separated by Fine Dividers */}
        <div className="divide-y divide-forest-deep/15 border-t border-b border-forest-deep/15">
          {STORY_PRINCIPLES.map((principle) => (
            <article
              key={principle.number}
              className="group py-8 sm:py-10 lg:py-12 transition-colors duration-300 hover:bg-white/50 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start sm:items-center">
                {/* Column 1: Number */}
                <div className="md:col-span-2">
                  <span className="font-mono text-sm sm:text-base font-semibold text-harvest tracking-widest">
                    {principle.number}
                  </span>
                </div>

                {/* Column 2: Title */}
                <div className="md:col-span-5">
                  <h3 className="font-display font-medium text-xl sm:text-2xl lg:text-3xl text-forest-deep group-hover:text-forest-deep/90 leading-tight">
                    {principle.title}
                  </h3>
                </div>

                {/* Column 3: Description */}
                <div className="md:col-span-5">
                  <p className="font-sans text-sm sm:text-base text-forest-deep/75 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial Footnote */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-forest-deep/60">
          <span>* Observations reflect real farm contexts and seasonal variables across regional growing conditions.</span>
          <span className="uppercase tracking-wider">Editorial Standards</span>
        </div>
      </div>
    </section>
  );
}
