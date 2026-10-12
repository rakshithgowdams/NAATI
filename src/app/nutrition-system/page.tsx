import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  NutritionHero,
  NutritionTwoProducts,
  NutritionHowItWorks,
  NutritionEditorialChapters,
  NutritionNextStep,
} from '@/components/sections/nutrition';

export const metadata: Metadata = createSiteMetadata({
  title: 'The Complete Crop Nutrition System — Build the Soil. Feed the Plant.',
  description:
    'Discover how Naati Plus (enriched vermicompost soil nutrition) and Naati Pro (plant nutrition bio-activator) work in biological synergy for healthier crops.',
  path: '/nutrition-system',
});

/**
 * THE NAATI NUTRITION SYSTEM — DEDICATED PRODUCT STORY & SYNERGY PAGE
 *
 * Core Concept: "Build the Soil. Feed the Plant."
 * 01 — System Hero: Full-bleed split-screen opening ("Healthy soil. Stronger plants. One complete system.")
 * 02 — Two Products. Two Purposes: Open editorial presentation of Naati Plus & Naati Pro
 * 03 — How the System Works: Signature botanical connection sequence (Soil -> Roots -> Foliar Growth)
 * 04 — Product Editorial Chapters: Two complementary full-bleed split-screen chapters (Below & Above)
 * 05 — The Next Step: Closing dark forest CTA transitioning into the global footer
 */
export default function NutritionSystemPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (Senses data-nav-theme dynamically) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <NutritionHero />

        {/* Section 02: Meet the System — Two Products. Two Purposes. */}
        <NutritionTwoProducts />

        {/* Section 03: How the System Works — The Connection */}
        <NutritionHowItWorks />

        {/* Section 04: Product Editorial Chapters — Below and Above */}
        <NutritionEditorialChapters />

        {/* Section 05: The Next Step — Concluding CTA */}
        <NutritionNextStep />
      </main>
    </div>
  );
}
