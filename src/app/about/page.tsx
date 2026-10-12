import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  AboutHero,
  AboutStoryBeneath,
  AboutPhilosophy,
  AboutGuidingPrinciples,
  AboutLookingForward,
  AboutFinalCta,
} from '@/components/sections/about';

export const metadata: Metadata = createSiteMetadata({
  title: 'About Us — Soil-First Farming & Plant Nutrition',
  description:
    "Discover Naati Organics' soil-first philosophy and its approach to healthy soil, plant nutrition and thoughtful agriculture.",
  path: '/about',
});

/**
 * ABOUT NAATI ORGANICS — COMPLETE EDITORIAL STORY PAGE
 *
 * Core Concept: "The Story Beneath the Surface"
 * 01 — About Hero: Split-screen editorial statement ("To grow better, we look deeper.")
 * 02 — The Story Beneath: Asymmetric living soil macro visual & Why We Exist statement
 * 03 — Our Philosophy: Compact connected dark green stage ("Fix the Soil. Feed the Plant.")
 * 04 — What Guides Us: Three full-width typography-led guiding principle rows
 * 05 — Looking Forward: Panoramic South Indian agricultural landscape panorama
 * 06 — Final CTA: Minimal dark forest-green conclusion merging smoothly into global footer
 */
export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (Senses data-nav-theme dynamically) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <AboutHero />

        {/* Section 02: The Story Beneath */}
        <AboutStoryBeneath />

        {/* Section 03: Our Philosophy */}
        <AboutPhilosophy />

        {/* Section 04: What Guides Us */}
        <AboutGuidingPrinciples />

        {/* Section 05: Looking Forward */}
        <AboutLookingForward />

        {/* Section 06: Final CTA */}
        <AboutFinalCta />
      </main>
    </div>
  );
}
