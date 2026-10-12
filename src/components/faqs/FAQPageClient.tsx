'use client';

import React, { useState } from 'react';
import { FAQHero } from './FAQHero';
import { FAQExplorer } from './FAQExplorer';
import { FAQRelatedKnowledge } from './FAQRelatedKnowledge';
import { FAQClosingCta } from './FAQClosingCta';

/**
 * Interactive Client Container for FAQ Page
 * Seamlessly synchronizes search state between the hero search bar and the FAQ explorer.
 */
export function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <main className="flex-1 flex flex-col">
      {/* Section 01: Hero with functional search */}
      <FAQHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Section 02: Interactive FAQ Explorer */}
      <FAQExplorer
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery('')}
      />

      {/* Section 03: Continue Learning Navigation */}
      <FAQRelatedKnowledge />

      {/* Section 04: Still Have Questions Closing CTA */}
      <FAQClosingCta />
    </main>
  );
}
