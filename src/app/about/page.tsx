import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  AboutHero,
  AboutStoryBeneath,
  AboutMissionVision,
  AboutPhilosophy,
  AboutApproach,
  AboutDifferencePromise,
  AboutValues,
  AboutFinalCta,
} from '@/components/sections/about';

export const metadata: Metadata = createSiteMetadata({
  title: 'About Us — Soil-First Farming & Plant Nutrition | Naati Organics',
  description:
    'We believe every great harvest begins beneath the soil. Fix the Soil. Feed the Plant. Discover the Naati Organics story, mission, philosophy, and approach.',
  path: '/about',
});

/**
 * ABOUT NAATI ORGANICS — CLIENT EDITORIAL SPECIFICATION
 *
 * 01. Hero Banner: "We Believe Every Great Harvest Begins Beneath the Soil. Fix the Soil. Feed the Plant."
 * 02. Our Story: "Naati Was Born From One Simple Observation..."
 * 03. Why "Naati"?: Native wisdom, natural farming principles, respect for soil, sustainable agriculture, long-term thinking.
 * 04. Our Mission & Vision: "Rebuild Soil. Restore Nature. Empower Farmers." / India's most trusted soil health company.
 * 05. Our Philosophy: "Soil First. Everything Else Follows." Biological cascade (Healthy Soil -> Strong Roots -> Healthy Plants -> Abundant Harvests).
 * 06. Our Approach: Four-step approach (Understand Soil -> Strengthen Roots -> Balanced Nutrition -> Harvest Sustainably).
 * 07. What Makes Us Different? & The Naati Promise: 5 core differentiators & 6 solemn commitments.
 * 08. Our Values: Integrity, Education, Sustainability, Innovation, Partnership.
 * 09. A Message From Naati & Join The Movement: "Let's Build Healthier Soils Together. Fix the Soil. Feed the Plant. Harvest the Future."
 */
export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Dynamic Overlay Navbar */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* 01. Hero Banner */}
        <AboutHero />

        {/* 02. Our Story & Why "Naati"? */}
        <AboutStoryBeneath />

        {/* 03. Our Mission & Our Vision */}
        <AboutMissionVision />

        {/* 04. Our Philosophy (Soil First & Biological Cascade) */}
        <AboutPhilosophy />

        {/* 05. Our Approach (4-Step Understanding) */}
        <AboutApproach />

        {/* 06. What Makes Us Different? & The Naati Promise */}
        <AboutDifferencePromise />

        {/* 07. Our Values */}
        <AboutValues />

        {/* 08. A Message From Naati & Join The Movement */}
        <AboutFinalCta />
      </main>
    </div>
  );
}
