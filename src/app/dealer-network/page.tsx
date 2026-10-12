import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  DealerHero,
  WhyPartner,
  PartnerCategories,
  PartnershipJourney,
  DealerEnquiryForm,
  DealerQuestions,
  DealerClosingCta,
} from '@/components/dealer-network';

export const metadata: Metadata = createSiteMetadata({
  title: 'Dealer & Distributor Enquiries',
  description:
    'Explore dealership and distribution enquiries with Naati Organics and connect with the team about potential agricultural business partnerships.',
  path: '/dealer-network',
});

/**
 * NAATI ORGANICS — DEALER & DISTRIBUTOR NETWORK PAGE
 *
 * Route: /dealer-network
 * Concept: "GROWING TOGETHER" — Premium agricultural partnership portal
 *
 * Section Breakdown:
 * 01 — Immersive Partnership Hero: Full-bleed split-screen with documentary field landscape
 * 02 — Why Grow With Naati: 4 refined editorial pillars detailing soil-first agricultural direction
 * 03 — Who Can Partner With Us: Interactive category explorer covering input dealers, distributors, retailers, FPOs, and consultants
 * 04 — The Partnership Journey: 4-stage transparent onboarding timeline
 * 05 — Partnership Enquiry Form: Asymmetric split interface with validation, honeypot anti-spam, and real API processing
 * 06 — Dealer Questions: Minimalist editorial FAQ accordion answering eligibility and operating coverage
 * 07 — Closing Statement: Deep forest-green statement returning to the enquiry interface
 */
export default function DealerNetworkPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="dark" for forest-deep hero) */}
      <SiteHeader initialTheme="dark" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <DealerHero />

        {/* Section 02: Why Grow with Naati */}
        <WhyPartner />

        {/* Section 03: Who Can Partner With Us? */}
        <PartnerCategories />

        {/* Section 04: The Partnership Journey */}
        <PartnershipJourney />

        {/* Section 05: Dealer & Distributor Enquiry Form */}
        <DealerEnquiryForm />

        {/* Section 06: Partnership Questions */}
        <DealerQuestions />

        {/* Section 07: Closing Partnership Statement */}
        <DealerClosingCta />
      </main>
    </div>
  );
}
