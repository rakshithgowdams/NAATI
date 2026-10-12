import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  ResourcesHero,
  ResourceLibrary,
  FieldGuides,
  VideoLibrary,
  ResourceDownloads,
  FarmerQuestionsSummary,
  ResourcesCTA,
} from '@/components/resources';

export const metadata: Metadata = createSiteMetadata({
  title: 'Farmer Knowledge Hub & Resources',
  description:
    'Explore practical farming guides, soil health resources, farmer questions and available educational materials from Naati Organics.',
  path: '/resources',
});

/**
 * NAATI ORGANICS — FARMER KNOWLEDGE HUB / THE FIELD LIBRARY
 *
 * Route: /resources
 * Concept: "THE FIELD LIBRARY" — Practical farmer reference centre, searchable knowledge library, and agricultural publishing platform.
 *
 * Distinction from Soil Academy (/soil-academy):
 * - Soil Academy teaches concepts (lessons, soil science explanations, interactive soil learning).
 * - Farmer Knowledge Hub helps farmers find practical tools and reference materials (guides, downloadable documents, videos, farmer field questions, product information sheets).
 *
 * Section Breakdown:
 * 01 — Editorial Hero: Warm cream asymmetric hero with full-bleed documentary field-study photography
 * 02 — Find What You Need: Real-time searchable & filterable resource index across verified topics
 * 03 — Practical Field Guides: Editorial publication shelf of field-tested agronomic protocols
 * 04 — Watch & Learn: Honest documentary video curriculum preview cross-linking to immediate interactive lessons
 * 05 — Downloadable Farmer Resources: Publication showcase for English & Kannada Handbooks & technical sheets
 * 06 — Questions From The Field: Minimal editorial accordion answering 6 practical farmer challenges
 * 07 — Closing Exploration CTA: Deep forest green statement transitioning into the global footer
 */
export default function ResourcesPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="light" matching cream hero) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Editorial Hero */}
        <ResourcesHero />

        {/* Section 02: Resource Library & Search */}
        <ResourceLibrary />

        {/* Section 03: Practical Field Guides */}
        <FieldGuides />

        {/* Section 04: Watch & Learn / Educational Media */}
        <VideoLibrary />

        {/* Section 05: Downloadable Farmer Resources */}
        <ResourceDownloads />

        {/* Section 06: Farmer Questions Accordion */}
        <FarmerQuestionsSummary />

        {/* Section 07: Closing Exploration CTA */}
        <ResourcesCTA />
      </main>
    </div>
  );
}
