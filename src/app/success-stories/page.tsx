import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  getPublishedStories,
  getFeaturedStory,
  hasPublishedStories,
} from '@/data/fieldStories';
import {
  StoriesHero,
  FeaturedFieldStory,
  FieldStoriesArchive,
  FieldObservations,
  OurApproachToStories,
  ShareExperienceCta,
  SuccessStoriesClosingCta,
} from '@/components/success-stories';

const hasStories = hasPublishedStories();

export const metadata: Metadata = createSiteMetadata({
  title: 'Voices From The Field — Agricultural Experiences & Observations',
  description:
    'Explore authentic agricultural experiences, grower observations, and Naati Organics’ thoughtful approach to documenting real field journeys.',
  path: '/success-stories',
  // In Launch State without substantive published customer stories, apply noindex
  noIndex: !hasStories,
});

/**
 * NAATI ORGANICS — SUCCESS STORIES & FIELD EXPERIENCES
 *
 * Route: /success-stories
 * Identity: "VOICES FROM THE FIELD"
 * Concept: "EVERY FIELD TELLS A STORY"
 *
 * Dual Data States:
 * - STATE A (Approved Stories Available): Complete interactive documentary archive
 *   (Hero -> Featured Story -> Stories Archive -> Field Observations -> Our Approach -> Share Experience -> Closing CTA)
 * - STATE B (Launch State - Active): High-end intentional editorial launch presentation
 *   (Hero -> Our Approach -> Share Experience -> Closing CTA)
 *
 * Strict Compliance:
 * - NO fabricated customer identities, false yield figures, or stock photography reviews.
 * - Ready to display verified case studies automatically upon data entry in `src/data/fieldStories.ts`.
 */
export default function SuccessStoriesPage() {
  const stories = getPublishedStories();
  const featuredStory = getFeaturedStory();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="light" for cream hero) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Immersive Editorial Hero */}
        <StoriesHero hasStories={hasStories} />

        {/* Section 02: Featured Field Story (Conditional: State A) */}
        {hasStories && featuredStory && (
          <FeaturedFieldStory story={featuredStory} />
        )}

        {/* Section 03: Field Stories Archive (Conditional: State A) */}
        {hasStories && (
          <FieldStoriesArchive stories={stories} />
        )}

        {/* Section 04: Observations From The Field (Conditional: State A) */}
        {hasStories && (
          <FieldObservations stories={stories} />
        )}

        {/* Section 05: Our Approach to Field Stories (Always rendered) */}
        <OurApproachToStories />

        {/* Section 06: Share Your Field Experience (Always rendered) */}
        <ShareExperienceCta />

        {/* Section 07: Final Editorial CTA (Always rendered) */}
        <SuccessStoriesClosingCta />
      </main>
    </div>
  );
}
