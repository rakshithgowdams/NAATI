'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Sprout, Quote } from 'lucide-react';
import { FieldStory } from '@/data/fieldStories';
import { cn } from '@/lib/utils/cn';

export interface FeaturedFieldStoryProps {
  story?: FieldStory;
  className?: string;
}

/**
 * SUCCESS STORIES — SECTION 02: FEATURED FIELD STORY
 *
 * Conditional: Renders ONLY when at least one verified and publication-approved field story exists.
 *
 * Eyebrow: 01 / FEATURED STORY
 * Headline: "From the field, in their own words."
 *
 * Layout:
 * - Immersive editorial feature with full-bleed outer edge photography
 * - LEFT (Desktop): Large authentic field photograph touching the left viewport edge
 * - RIGHT: Genuine title, farmer/role, crop, location, experience summary, approved quotation
 * - Strict integrity: Never invents missing fields or fabricated endorsements
 */
export function FeaturedFieldStory({ story, className }: FeaturedFieldStoryProps) {
  // If no approved story provided, omit section completely
  if (!story || !story.publicationConsent || story.publicationStatus !== 'published') {
    return null;
  }

  const primaryImage = story.approvedImages?.[0];

  return (
    <section
      id="featured-story"
      data-nav-theme="light"
      aria-labelledby="featured-story-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary border-b border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] items-stretch">
        {/* =====================================================================
            LEFT PANEL: FULL-BLEED AUTHENTIC FIELD PHOTOGRAPHY (50% Desktop)
            Touches top, bottom, and left viewport edges.
            ===================================================================== */}
        <div className="lg:col-span-6 relative min-h-[400px] sm:min-h-[500px] lg:min-h-full w-full bg-forest-deep overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt || story.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-cream/70 font-mono text-sm">
              Authentic field photographic record
            </div>
          )}

          {/* Environmental Gradient & Caption */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-black/20 pointer-events-none"
            aria-hidden="true"
          />

          {primaryImage?.caption && (
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <p className="text-xs font-mono text-cream/90 bg-forest-deep/80 backdrop-blur-sm p-3 border border-cream/15 max-w-md">
                {primaryImage.caption}
              </p>
            </div>
          )}
        </div>

        {/* =====================================================================
            RIGHT PANEL: EDITORIAL FIELD NARRATIVE (50% Desktop)
            ===================================================================== */}
        <div className="lg:col-span-6 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-14 sm:py-20 lg:py-24 bg-cream">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-harvest">
                01 / FEATURED STORY
              </span>
              <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
              <span className="font-mono text-xs text-forest-deep/60 uppercase tracking-widest">
                {story.category}
              </span>
            </div>

            {/* Display Headline */}
            <h2
              id="featured-story-heading"
              className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-forest-deep tracking-tight leading-[1.12] mb-6"
            >
              From the field, <br />
              <span className="italic font-light">in their own words.</span>
            </h2>

            {/* Meta Tags (Crop & Consented Location) */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-forest-deep/75 mb-8 pb-6 border-b border-forest-deep/15">
              {story.crop && (
                <div className="flex items-center gap-1.5 bg-forest-deep/5 px-3 py-1 border border-forest-deep/10">
                  <Sprout className="w-3.5 h-3.5 text-harvest" />
                  <span className="font-medium">{story.crop}</span>
                </div>
              )}
              {story.region && (
                <div className="flex items-center gap-1.5 bg-forest-deep/5 px-3 py-1 border border-forest-deep/10">
                  <MapPin className="w-3.5 h-3.5 text-harvest" />
                  <span>{story.region}</span>
                </div>
              )}
              {story.personName && (
                <span className="font-semibold text-forest-deep">
                  {story.personName}
                  {story.role ? `, ${story.role}` : ''}
                </span>
              )}
            </div>

            {/* Story Title & Summary */}
            <h3 className="font-display font-medium text-2xl text-forest-deep mb-4 leading-snug">
              {story.title}
            </h3>

            <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed mb-8">
              {story.summary}
            </p>

            {/* Genuine Approved Quote if available */}
            {story.quote && (
              <blockquote className="relative my-8 pl-6 border-l-2 border-harvest text-forest-deep/90 italic font-display text-lg sm:text-xl leading-relaxed">
                <Quote className="w-5 h-5 text-harvest/40 absolute -top-3 -left-2.5" />
                &ldquo;{story.quote}&rdquo;
              </blockquote>
            )}

            {/* Action CTA */}
            <div className="pt-2">
              <a
                href={`#story-${story.slug}`}
                className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium text-forest-deep hover:text-harvest transition-colors duration-200"
              >
                <span>READ FULL STORY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-harvest" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
