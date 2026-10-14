import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  AcademyHero,
  LessonIndex,
  LivingSoilExplorer,
  FieldNotesLibrary,
  FarmerQuestions,
  HandbookResource,
  AcademyClosingCta,
} from '@/components/soil-academy';

export const metadata: Metadata = createSiteMetadata({
  title: 'Soil Learning Centre — Soil Health & Crop Nutrition | Naati Organics',
  description:
    "Explore Naati Organics' Soil Learning Centre: farmer-focused lessons on soil health, roots, organic matter, soil biology and balanced crop nutrition.",
  path: '/soil-academy',
});

/**
 * SOIL ACADEMY & SOIL LEARNING CENTRE
 *
 * Route: /soil-academy
 * Central Concept: "KNOWLEDGE BENEATH THE SURFACE"
 *
 * 01 — Immersive Academy Hero: Deep forest green split-screen with full-bleed soil ecosystem photograph
 * 02 — Start Here / Five Essential Lessons: Editorial numbered lesson index with in-page curriculum disclosure
 * 03 — The Living Soil Explorer: Signature interactive soil cross-section with 5 scientific hotspot nodes
 * 04 — Field Notes / Knowledge Library: 10 client topics with real-time keyword search and category filtering
 * 05 — Questions from the Field: Minimal editorial accordion answering 6 practical farmer questions
 * 06 — Farmer Handbook: Verified English & Kannada publication showcase with advisory request
 * 07 — Closing Educational CTA: Deep forest green statement transitioning smoothly into the global footer
 */
export default function SoilAcademyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="dark" for dark hero) */}
      <SiteHeader initialTheme="dark" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <AcademyHero />

        {/* Section 02: Start Here / Five Essential Lessons */}
        <LessonIndex />

        {/* Section 03: The Living Soil Explorer */}
        <LivingSoilExplorer />

        {/* Section 04: Field Notes / Knowledge Library */}
        <FieldNotesLibrary />

        {/* Section 05: Questions from the Field */}
        <FarmerQuestions />

        {/* Section 06: Farmer Handbook Resource */}
        <HandbookResource />

        {/* Section 07: Closing Educational CTA */}
        <AcademyClosingCta />
      </main>
    </div>
  );
}
