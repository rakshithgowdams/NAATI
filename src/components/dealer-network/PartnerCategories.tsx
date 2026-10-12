'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PARTNER_CATEGORIES, type PartnerCategory } from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';

export interface PartnerCategoriesProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 03: WHO CAN PARTNER WITH US?
 *
 * Eyebrow: 02 / OPPORTUNITIES
 * Headline: "Different businesses. A common purpose."
 *
 * Editorial Category Explorer:
 * - 5 Verified partner categories
 * - Desktop: Left selectable rows / active details; Right large photographic display
 * - Mobile: Clean touch-friendly tabs with inline responsive photo container
 * - User-driven selection (no scroll-hijacked switching)
 * - Authentic documentary agricultural environment imagery
 */
export function PartnerCategories({ className }: PartnerCategoriesProps) {
  const [activeId, setActiveId] = useState<string>(PARTNER_CATEGORIES[0].id);

  const activeCategory: PartnerCategory =
    PARTNER_CATEGORIES.find((cat) => cat.id === activeId) || PARTNER_CATEGORIES[0];

  return (
    <section
      id="partner-categories"
      data-nav-theme="light"
      aria-labelledby="partner-categories-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              02 / OPPORTUNITIES
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="partner-categories-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Different businesses. <br />
            <span className="italic font-light">A common purpose.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            From established rural input retailers to regional distributors and farmer collectives, explore how our agricultural nutrition solutions align with your business model.
          </p>
        </div>

        {/* Category Explorer Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-white/60 border border-forest-deep/15 p-6 sm:p-8 lg:p-10">
          {/* Left Column: Category Selectable List & Active Information (Col 1 to 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Category Navigation List */}
            <div className="space-y-2 mb-8" role="tablist" aria-label="Select partner category">
              {PARTNER_CATEGORIES.map((cat) => {
                const isSelected = cat.id === activeId;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveId(cat.id)}
                    className={cn(
                      'w-full text-left p-3.5 sm:p-4 border transition-all duration-200 flex items-center justify-between group cursor-pointer',
                      isSelected
                        ? 'bg-forest-deep text-cream border-forest-deep shadow-sm'
                        : 'bg-white/40 text-forest-deep/80 border-forest-deep/10 hover:border-forest-deep/30 hover:bg-white/80'
                    )}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={cn(
                          'font-mono text-xs font-semibold tracking-wider',
                          isSelected ? 'text-harvest' : 'text-forest-deep/50'
                        )}
                      >
                        {cat.number}
                      </span>
                      <span className="font-display font-medium text-sm sm:text-base tracking-tight">
                        {cat.title}
                      </span>
                    </div>

                    <ArrowRight
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        isSelected ? 'text-harvest translate-x-0.5' : 'text-forest-deep/30 group-hover:translate-x-0.5'
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Category Information Card */}
            <div className="pt-6 border-t border-forest-deep/10">
              <div className="flex items-center gap-2 text-xs font-mono text-harvest uppercase tracking-wider mb-2 font-semibold">
                <span>CATEGORY {activeCategory.number}</span>
                <span>•</span>
                <span className="text-forest-deep/60">PARTNER FOCUS</span>
              </div>

              <h3 className="font-display font-medium text-xl sm:text-2xl text-forest-deep mb-2">
                {activeCategory.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-forest-deep/70 italic mb-3">
                {activeCategory.subtitle}
              </p>

              <p className="font-sans text-sm text-forest-deep/80 leading-relaxed mb-6">
                {activeCategory.description}
              </p>

              {/* Profile Points */}
              <div className="space-y-1.5 pt-3 border-t border-forest-deep/10">
                <span className="block text-[11px] font-mono uppercase tracking-wider text-forest-deep/60 mb-1.5">
                  Representative Profile:
                </span>
                {activeCategory.focusProfile.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans text-forest-deep/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-deep shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Photographic Area (Col 7 to 12) */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden bg-forest-deep flex items-center justify-center">
            {/* Photographic Image with Smooth Transition */}
            <div key={activeCategory.id} className="absolute inset-0 w-full h-full animate-fadeIn">
              <Image
                src={activeCategory.imageSrc}
                alt={activeCategory.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-black/20 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Photo Caption Tag */}
            <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-deep/85 backdrop-blur-sm border border-cream/15 text-cream text-[11px] font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                <span>{activeCategory.title} • Commercial Environment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
