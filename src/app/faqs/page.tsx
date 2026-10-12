import React from 'react';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteHeader } from '@/components/layout/site-header';
import { FAQPageClient } from '@/components/faqs';
import { FAQ_ITEMS } from '@/data/faqs';

export const metadata: Metadata = createSiteMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers about soil health, Naati Plus, Naati Pro, crop nutrition, application guidance and dealer enquiries.',
  path: '/faqs',
});

/**
 * NAATI ORGANICS — FREQUENTLY ASKED QUESTIONS PAGE
 *
 * Route: /faqs
 * Concept: "QUESTIONS THAT HELP US GROW"
 *
 * Sections:
 * 01 — Premium FAQ Hero: Split-screen with forest-green search panel & full-bleed botanical photo
 * 02 — Interactive FAQ Explorer: Two-column editorial interface with sticky category navigation & accessible question rows
 * 03 — Continue Learning: Minimalist editorial bridges to Soil Academy, Crop Solutions, and Nutrition System
 * 04 — Still Have Questions?: Forest-green closing statement linking directly to Contact advisory
 */
export default function FaqsPage() {
  // Construct JSON-LD Structured Data for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.shortAnswer} ${item.detailedAnswer.join(' ')}`,
      },
    })),
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Schema.org FAQPage Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Global Transparent Overlay Navbar (initialTheme="dark" for forest-deep hero) */}
      <SiteHeader initialTheme="dark" />

      {/* Synchronized Client Application */}
      <FAQPageClient />
    </div>
  );
}
