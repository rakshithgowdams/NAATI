import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  PlusHero,
  PlusUnderstanding,
  PlusThreePrinciples,
  PlusApplicationGuidance,
  PlusCompleteSystem,
  PlusFaq,
  PlusFinalCta,
} from '@/components/sections/products/naati-plus';

export const metadata: Metadata = createSiteMetadata({
  title: 'Naati Plus — Enriched Vermicompost Soil Nutrition | Naati Organics',
  description:
    'Build the soil with Naati Plus enriched vermicompost. Formulated to replenish organic matter, soil structure, and the living root environment.',
  path: '/products/naati-plus',
});

/**
 * NAATI PLUS PRODUCT DETAIL PAGE
 *
 * Route: /products/naati-plus
 * Core Concept: "Build the Soil. Where healthier growth begins."
 *
 * 01 — Hero: Immersive dark forest product hero featuring approved packaging
 * 02 — Understanding: Full-bleed split-screen living soil documentary ("Soil is more than a growing medium.")
 * 03 — Three Principles: Architectural soil study ("Organic Matter · Soil Structure · Soil Biology")
 * 04 — Application Guidance: 3-step practical horizontal guidance without invented claims
 * 05 — The Complete System: Dual-product connection linking Naati Plus with Naati Pro
 * 06 — Product Questions: Accessible editorial FAQ accordion
 * 07 — Final CTA: Deep forest closing statement transitioning to the global footer
 */
export default function NaatiPlusPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="dark" for dark hero) */}
      <SiteHeader initialTheme="dark" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <PlusHero />

        {/* Section 02: Understanding Naati Plus */}
        <PlusUnderstanding />

        {/* Section 03: Three Principles of Healthy Soil */}
        <PlusThreePrinciples />

        {/* Section 04: Using Naati Plus / Application Guidance */}
        <PlusApplicationGuidance />

        {/* Section 05: Part of a Complete System */}
        <PlusCompleteSystem />

        {/* Section 06: Product Questions / FAQ */}
        <PlusFaq />

        {/* Section 07: Final Product CTA */}
        <PlusFinalCta />
      </main>
    </div>
  );
}
