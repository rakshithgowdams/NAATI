'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PRACTICAL_FIELD_GUIDES } from '@/data/resources';
import { cn } from '@/lib/utils/cn';

export interface FieldGuidesProps {
  className?: string;
}

/**
 * FARMER KNOWLEDGE HUB — SECTION 03: PRACTICAL FIELD GUIDES
 *
 * Eyebrow: 02 / FIELD GUIDES
 * Headline: "Practical knowledge. Made for the field."
 *
 * Editorial publication layout:
 * - One prominent featured guide on the left/top with documentary photography
 * - Indexed secondary guides in a clean, high-density editorial grid
 * - Direct links to active Academy lessons, product technical systems, and crop protocols
 * - Not a repeat of the 5-lesson Academy curriculum, but practical agronomic guidance
 */
export function FieldGuides({ className }: FieldGuidesProps) {
  const featuredGuide = PRACTICAL_FIELD_GUIDES.find((g) => g.featured) || PRACTICAL_FIELD_GUIDES[0];
  const secondaryGuides = PRACTICAL_FIELD_GUIDES.filter((g) => g.id !== featuredGuide.id);

  return (
    <section
      id="field-guides"
      data-nav-theme="light"
      aria-labelledby="field-guides-heading"
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
              02 / FIELD GUIDES
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="field-guides-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Practical knowledge. <br />
            <span className="italic font-light">Made for the field.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Essential agronomic protocols designed for day-to-day farm management—from soil aggregate restoration to balanced crop nutrition.
          </p>
        </div>

        {/* Featured Guide Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16 bg-white/60 border border-forest-deep/15 p-6 sm:p-8 lg:p-10">
          {/* Featured Image */}
          <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-forest-deep">
            {featuredGuide.image ? (
              <Image
                src={featuredGuide.image}
                alt={featuredGuide.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-forest-deep flex items-center justify-center p-6 text-cream font-mono text-xs">
                Agronomic Field Documentation
              </div>
            )}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-forest-deep text-cream text-[11px] font-mono tracking-wider uppercase">
              Featured Field Protocol
            </div>
          </div>

          {/* Featured Content */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-forest-deep/60 mb-3">
                <span className="text-harvest font-semibold">GUIDE {featuredGuide.number}</span>
                <span>•</span>
                <span>SOIL PHYSICS & CARBON</span>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl lg:text-3xl text-forest-deep mb-3 leading-tight">
                {featuredGuide.title}
              </h3>

              <p className="font-sans text-sm sm:text-base italic text-forest-deep/70 mb-4 font-serif">
                {featuredGuide.tagline}
              </p>

              <p className="font-sans text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-6">
                {featuredGuide.summary}
              </p>

              {/* Key Focus Checklist */}
              <div className="space-y-2 mb-8 pt-2 border-t border-forest-deep/10">
                <span className="block text-xs font-mono uppercase tracking-wider text-forest-deep/60 mb-2">
                  Key Field Focus Areas:
                </span>
                {featuredGuide.focusAreas.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-forest-deep/85">
                    <CheckCircle2 className="w-4 h-4 text-forest-deep shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Link */}
            <div className="pt-4 border-t border-forest-deep/10">
              <Link
                href={featuredGuide.destination}
                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.16em] hover:bg-forest-light hover:text-forest-deep transition-all duration-300"
              >
                <span>{featuredGuide.destinationText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Field Guides Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {secondaryGuides.map((guide) => (
            <article
              key={guide.id}
              className="group flex flex-col justify-between bg-white/40 border border-forest-deep/15 p-6 sm:p-8 hover:bg-white/80 hover:border-forest-deep/35 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-forest-deep/60 mb-3">
                  <span className="font-semibold text-harvest">PROTOCOL {guide.number}</span>
                  <span className="uppercase tracking-wider">Field Guide</span>
                </div>

                <h3 className="font-display font-medium text-xl sm:text-2xl text-forest-deep mb-2 group-hover:text-forest-deep/90 transition-colors">
                  {guide.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-forest-deep/65 mb-3 italic">
                  {guide.tagline}
                </p>

                <p className="font-sans text-sm text-forest-deep/75 leading-relaxed mb-6">
                  {guide.summary}
                </p>

                {/* Focus areas */}
                <ul className="space-y-1.5 mb-6 text-xs font-sans text-forest-deep/80 border-t border-forest-deep/10 pt-3">
                  {guide.focusAreas.slice(0, 2).map((area, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-forest-deep/40" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-forest-deep/10">
                <Link
                  href={guide.destination}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] font-medium text-forest-deep group-hover:text-harvest transition-colors"
                >
                  <span>{guide.destinationText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
