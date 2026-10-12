import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import {
  ContactHero,
  WaysToConnect,
  SmartContactForm,
  LocationInfo,
  ContactClosingCta,
} from '@/components/contact';

export const metadata: Metadata = createSiteMetadata({
  title: 'Contact & Agronomy Support',
  description:
    'Contact Naati Organics for product information, crop guidance enquiries and agricultural business partnerships.',
  path: '/contact',
});

/**
 * NAATI ORGANICS — CONTACT & ENQUIRY PAGE
 *
 * Route: /contact
 * Concept: "Good conversations grow better things."
 *
 * Serves 4 Primary Visitor Intentions:
 * 1. General Enquiries
 * 2. Product Enquiries (Naati Plus & Naati Pro)
 * 3. Crop Guidance Enquiries (with specific crop and field parameters)
 * 4. Dealer & Distributor Enquiries (with direct action to /dealer-network)
 *
 * Section Breakdown:
 * 01 — Contact Hero: Full-bleed split-screen (55% cream, 45% cinematic agriculture photo)
 * 02 — Ways to Connect: Typography-led contact directory with verified email, phone, and WhatsApp
 * 03 — Smart Contact Form: Adaptive multi-category form with context fields and URL query preselection
 * 04 — Location & Company Presence: Verified Bengaluru headquarters and regional South India presence
 * 05 — Final Brand Statement: Deep forest green closing statement transitioning into the global footer
 */
export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (initialTheme="light" matching cream hero) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Section 01: Hero */}
        <ContactHero />

        {/* Section 02: Ways to Connect */}
        <WaysToConnect />

        {/* Section 03: Smart Adaptive Contact Form */}
        <SmartContactForm />

        {/* Section 04: Location & Presence */}
        <LocationInfo />

        {/* Section 05: Final Brand Statement */}
        <ContactClosingCta />
      </main>
    </div>
  );
}
