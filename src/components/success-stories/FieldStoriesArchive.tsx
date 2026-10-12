'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Sprout, Quote, X, Calendar, UserCheck } from 'lucide-react';
import { FieldStory, StoryCategory } from '@/data/fieldStories';
import { cn } from '@/lib/utils/cn';

export interface FieldStoriesArchiveProps {
  stories: FieldStory[];
  className?: string;
}

/**
 * SUCCESS STORIES — SECTION 03: THE FIELD STORIES ARCHIVE
 *
 * Conditional: Rendered only when approved stories exist.
 *
 * Eyebrow: 02 / FIELD EXPERIENCES
 * Headline: "Different fields. Different journeys."
 *
 * Features:
 * - Category filters (ALL STORIES, FARMER STORIES, DEALER EXPERIENCES, AGRONOMIST PERSPECTIVES)
 * - Only shows categories that actually contain published items
 * - Asymmetrical editorial publication layout (not standard cards)
 * - Accessible story detail modal viewer for deep reading without leaving page
 */
export function FieldStoriesArchive({ stories, className }: FieldStoriesArchiveProps) {
  const [activeCategory, setActiveCategory] = useState<StoryCategory>('ALL STORIES');
  const [selectedStory, setSelectedStory] = useState<FieldStory | null>(null);

  // Compute available categories based strictly on published items
  const availableCategories = useMemo<StoryCategory[]>(() => {
    if (!stories || stories.length === 0) return [];
    const set = new Set<string>();
    stories.forEach((s) => set.add(s.category));

    const cats: StoryCategory[] = ['ALL STORIES'];
    if (set.has('FARMER STORIES')) cats.push('FARMER STORIES');
    if (set.has('DEALER EXPERIENCES')) cats.push('DEALER EXPERIENCES');
    if (set.has('AGRONOMIST PERSPECTIVES')) cats.push('AGRONOMIST PERSPECTIVES');
    return cats;
  }, [stories]);

  // Filter stories
  const filteredStories = useMemo(() => {
    if (activeCategory === 'ALL STORIES') return stories;
    return stories.filter((s) => s.category === activeCategory);
  }, [stories, activeCategory]);

  // If no stories available, return null
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <section
      id="stories-archive"
      data-nav-theme="light"
      aria-labelledby="stories-archive-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16 pb-8 border-b border-forest-deep/15">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-harvest">
                02 / FIELD EXPERIENCES
              </span>
              <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
            </div>

            <h2
              id="stories-archive-heading"
              className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-forest-deep tracking-tight leading-[1.12]"
            >
              Different fields. <br />
              <span className="italic font-light">Different journeys.</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          {availableCategories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 sm:gap-3" role="tablist" aria-label="Story Categories">
              {availableCategories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      'px-4 py-2 text-xs font-mono uppercase tracking-[0.16em] transition-all duration-200 border',
                      isActive
                        ? 'bg-forest-deep text-cream border-forest-deep font-semibold shadow-sm'
                        : 'bg-transparent text-forest-deep/75 border-forest-deep/20 hover:border-forest-deep hover:text-forest-deep'
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Asymmetrical Editorial Publication Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {filteredStories.map((story, index) => {
            const isLead = index === 0 && filteredStories.length > 1;
            const primaryImage = story.approvedImages?.[0];

            return (
              <article
                key={story.id}
                id={`story-${story.slug}`}
                className={cn(
                  'group flex flex-col justify-between border-b border-forest-deep/15 pb-8 lg:pb-12',
                  isLead ? 'lg:col-span-8' : 'lg:col-span-4'
                )}
              >
                <div>
                  {/* Image Container if present */}
                  {primaryImage && (
                    <div
                      className={cn(
                        'relative w-full overflow-hidden bg-forest-deep mb-6',
                        isLead ? 'h-[320px] sm:h-[420px]' : 'h-[240px] sm:h-[280px]'
                      )}
                    >
                      <Image
                        src={primaryImage.src}
                        alt={primaryImage.alt || story.title}
                        fill
                        sizes={isLead ? '(max-width: 1024px) 100vw, 65vw' : '(max-width: 1024px) 100vw, 35vw'}
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Metadata Tags */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-forest-deep/60 mb-3">
                    <span className="text-harvest uppercase font-semibold">{story.category}</span>
                    {story.crop && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Sprout className="w-3 h-3" />
                          {story.crop}
                        </span>
                      </>
                    )}
                    {story.region && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {story.region}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Story Title */}
                  <h3
                    className={cn(
                      'font-display font-medium text-forest-deep leading-tight mb-3 group-hover:text-harvest transition-colors',
                      isLead ? 'text-2xl sm:text-3xl' : 'text-xl'
                    )}
                  >
                    {story.title}
                  </h3>

                  {/* Narrative Summary */}
                  <p className="font-sans text-sm sm:text-base text-forest-deep/75 leading-relaxed line-clamp-3 mb-6">
                    {story.summary}
                  </p>

                  {/* Farmer / Speaker Name */}
                  {story.personName && (
                    <div className="text-xs font-mono text-forest-deep font-semibold mb-4">
                      {story.personName}
                      {story.role ? ` — ${story.role}` : ''}
                    </div>
                  )}
                </div>

                {/* Open Modal CTA */}
                <button
                  type="button"
                  onClick={() => setSelectedStory(story)}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] font-medium text-forest-deep hover:text-harvest transition-colors pt-2"
                >
                  <span>READ FULL RECORD</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-harvest" />
                </button>
              </article>
            );
          })}
        </div>

        {/* =====================================================================
            ACCESSIBLE STORY DETAIL MODAL VIEWER
            ===================================================================== */}
        {selectedStory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-forest-deep/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-story-title"
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-cream border border-forest-deep/20 p-6 sm:p-10 shadow-2xl">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                aria-label="Close story detail"
                className="absolute top-6 right-6 p-2 text-forest-deep/60 hover:text-forest-deep transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Eyebrow & Category */}
              <div className="flex items-center gap-3 text-xs font-mono text-harvest uppercase font-semibold mb-4">
                <span>{selectedStory.category}</span>
                {selectedStory.crop && (
                  <>
                    <span>•</span>
                    <span>{selectedStory.crop}</span>
                  </>
                )}
                {selectedStory.region && (
                  <>
                    <span>•</span>
                    <span>{selectedStory.region}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2
                id="modal-story-title"
                className="font-display font-medium text-2xl sm:text-3xl text-forest-deep mb-4 leading-tight"
              >
                {selectedStory.title}
              </h2>

              {/* Author & Consent Verification Badge */}
              <div className="flex items-center gap-2 text-xs font-mono text-forest-deep/70 mb-6 pb-6 border-b border-forest-deep/15">
                <UserCheck className="w-4 h-4 text-harvest" />
                <span>
                  Documented observation by {selectedStory.personName || 'Consented Grower'}
                  {selectedStory.role ? ` (${selectedStory.role})` : ''}
                </span>
              </div>

              {/* Story Narrative */}
              <div className="space-y-4 font-sans text-base text-forest-deep/85 leading-relaxed mb-8">
                <p>{selectedStory.summary}</p>

                {selectedStory.quote && (
                  <blockquote className="my-6 pl-6 border-l-2 border-harvest text-forest-deep italic font-display text-lg">
                    &ldquo;{selectedStory.quote}&rdquo;
                  </blockquote>
                )}
              </div>

              {/* Documented Observations Notes */}
              {selectedStory.observation && (
                <div className="bg-forest-deep/5 p-4 sm:p-6 border border-forest-deep/10 text-xs font-mono mb-6">
                  <div className="flex items-center gap-2 font-semibold text-forest-deep uppercase mb-2">
                    <Calendar className="w-4 h-4 text-harvest" />
                    <span>Observation Notes</span>
                  </div>
                  <p className="text-forest-deep/80 leading-relaxed font-sans text-sm">
                    {selectedStory.observation.observationNotes}
                  </p>
                </div>
              )}

              {/* Close Action */}
              <div className="pt-4 border-t border-forest-deep/15 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2.5 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.16em] hover:bg-forest-light hover:text-forest-deep transition-colors"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
