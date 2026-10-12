import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  CropHero,
  CropAtlas,
  CropNaatiApproach,
  CropGrowingJourney,
  CropGuidanceCta,
} from '@/components/sections/crop-solutions';

export const metadata: Metadata = createSiteMetadata({
  title: 'Crop Solutions & Field Guide | Naati Organics',
  description:
    'Explore crop families from fruiting vegetables and alliums to spices and field crops. Learn how the two-part Naati approach supports healthy soil foundations and plant growth.',
  path: '/crop-solutions',
});

/**
 * CROP SOLUTIONS & FIELD GUIDE PAGE
 *
 * Route: /crop-solutions
 * Core Concept: "Every crop is different. Every strong harvest begins beneath."
 *
 * 01 — Immersive Hero: Full-bleed split-screen Karnataka agricultural landscape
 * 02 & 03 — The Crop Atlas & Selected Crop Experience: Interactive 5-family crop discovery & detail study
 * 04 — Build the Soil. Feed the Plant.: Dual-product comparison linking Naati Plus and Naati Pro
 * 05 — A Practical Growing Journey: Scientific 3-step timeline infographic
 * 06 — Crop Guidance CTA: Dark forest closing statement with crop inquiry actions
 */
export default function CropSolutionsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="light" matching warm cream hero) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <CropHero />

        {/* Section 02 & 03: The Crop Atlas & Selected Experience */}
        <CropAtlas />

        {/* Section 04: The Naati Approach (Build the Soil. Feed the Plant.) */}
        <CropNaatiApproach />

        {/* Section 05: A Practical Growing Journey */}
        <CropGrowingJourney />

        {/* Section 06: Crop Guidance CTA */}
        <CropGuidanceCta />
      </main>
    </div>
  );
}
