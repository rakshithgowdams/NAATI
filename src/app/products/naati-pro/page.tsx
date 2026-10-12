import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  ProHero,
  ProWhyNutritionMatters,
  ProIntroducing,
  ProGrowthJourney,
  ProCompleteSystem,
  ProApplicationGuidance,
  ProFaq,
  ProFinalCta,
} from '@/components/sections/products/naati-pro';

export const metadata: Metadata = createSiteMetadata({
  title: 'Naati Pro — Plant Nutrition Bio-Activator | Naati Organics',
  description:
    'Feed the plant with Naati Pro. A plant nutrition bio-activator designed to support balanced crop development, vegetative vigour, and healthy growth above ground.',
  path: '/products/naati-pro',
});

/**
 * NAATI PRO PRODUCT DETAIL PAGE
 *
 * Route: /products/naati-pro
 * Core Concept: "Feed the Plant. Nourish the growth above."
 *
 * 01 — Hero: Cinematic full-viewport hero featuring approved packaging & botanical canopy
 * 02 — Why Plant Nutrition Matters: Full-bleed split-screen leaf vein macro study
 * 03 — Introducing Naati Pro: Asymmetrical product storytelling with approved box visual
 * 04 — The Plant Growth Journey: 3-stage botanical development narrative (Desktop pinned / Mobile stacked)
 * 05 — One Complete Approach: Dual-product connection linking Naati Plus with Naati Pro
 * 06 — Product & Application Information: Clean editorial guidance blocks without invented claims
 * 07 — Common Questions: Accessible editorial FAQ accordion
 * 08 — Final CTA: Deep forest closing statement transitioning to the global footer
 */
export default function NaatiProPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="dark" for dark hero) */}
      <SiteHeader initialTheme="dark" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <ProHero />

        {/* Section 02: Why Plant Nutrition Matters */}
        <ProWhyNutritionMatters />

        {/* Section 03: Introducing Naati Pro */}
        <ProIntroducing />

        {/* Section 04: The Plant Growth Journey */}
        <ProGrowthJourney />

        {/* Section 05: How Naati Pro Fits into the System */}
        <ProCompleteSystem />

        {/* Section 06: Product Guidance & Application */}
        <ProApplicationGuidance />

        {/* Section 07: Common Questions / FAQ */}
        <ProFaq />

        {/* Section 08: Final Product CTA */}
        <ProFinalCta />
      </main>
    </div>
  );
}
