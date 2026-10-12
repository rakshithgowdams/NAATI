'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Tag } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { FIELD_NOTES_TOPICS, FieldNoteTopic } from '@/data/soilAcademy';

export interface FieldNotesLibraryProps {
  className?: string;
}

const CATEGORIES = [
  'All Topics',
  'Biology & Microbes',
  'Soil Physics & Structure',
  'Nutrition & Farming',
] as const;

/**
 * SOIL ACADEMY — SECTION 04: FIELD NOTES / KNOWLEDGE LIBRARY
 *
 * Sophisticated Agricultural Research Index:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "03 / FIELD NOTES"
 * - Headline: "Explore what lies beneath."
 * - Description: "Browse essential topics in soil health and crop nutrition."
 * - Instant search input ("Search soil topics") and genuine category filters
 * - Ten client learning topics with compact numbered rows and source-grounded overview expansion
 * - Zero fabricated articles or dead links
 */
export function FieldNotesLibrary({ className }: FieldNotesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.field-notes-header',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  // Filter topics based on search and category
  const filteredTopics = useMemo(() => {
    return FIELD_NOTES_TOPICS.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'All Topics' || topic.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.extendedSummary.toLowerCase().includes(q) ||
        topic.keyFocus.some((k) => k.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleTopic = (id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="field-notes"
      data-nav-theme="light"
      aria-labelledby="field-notes-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* Header */}
        <div className="field-notes-header max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              03 / FIELD NOTES
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
              SOIL SCIENCE KNOWLEDGE REPOSITORY
            </span>
          </div>

          <h2
            id="field-notes-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Explore what lies beneath.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
            Browse essential topics in soil health and crop nutrition. Search or filter through key agronomic subjects derived from certified field observations.
          </p>
        </div>

        {/* =====================================================================
            SEARCH & CATEGORY CONTROLS
            ===================================================================== */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 pb-6 mb-8 border-b border-forest-deep/15">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-deep/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search soil topics (e.g., biology, roots, carbon)..."
              aria-label="Search soil topics"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-forest-deep/20 text-forest-deep placeholder:text-forest-deep/45 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-forest-medium/40 focus:border-forest-medium transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-forest-deep/50 hover:text-forest-deep"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-colors cursor-pointer',
                  selectedCategory === cat
                    ? 'bg-forest-deep text-cream font-bold'
                    : 'bg-white/70 text-forest-deep/75 border border-forest-deep/15 hover:border-forest-deep/40'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-forest-deep/60 pb-4 mb-2">
          <span>
            SHOWING {filteredTopics.length} OF {FIELD_NOTES_TOPICS.length} VERIFIED TOPICS
          </span>
          {searchQuery && <span>FILTERED BY: &ldquo;{searchQuery}&rdquo;</span>}
        </div>

        {/* =====================================================================
            TOPIC ROWS REPOSITORY LIST
            ===================================================================== */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border border-forest-deep/10">
            <p className="font-display text-lg text-forest-deep mb-2">
              No matching soil science topics found.
            </p>
            <p className="font-sans text-sm text-forest-deep/60 mb-4">
              Try searching for &ldquo;biology&rdquo;, &ldquo;matter&rdquo;, &ldquo;water&rdquo; or &ldquo;fungi&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Topics');
              }}
              className="px-4 py-2 rounded-full bg-forest-deep text-cream font-mono text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-forest-deep/15 border-b border-forest-deep/15">
            {filteredTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;
              return (
                <div key={topic.id} className="py-5 sm:py-6 transition-colors group">
                  <button
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-start sm:items-center justify-between gap-4 sm:gap-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-medium/50 rounded-lg p-2 -m-2"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline w-full">
                      {/* Index & Category */}
                      <div className="sm:col-span-3 flex items-center gap-3">
                        <span className="font-mono text-xs sm:text-sm font-bold text-forest-medium/70 group-hover:text-forest-medium transition-colors">
                          {topic.number}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-forest-deep/50 px-2 py-0.5 rounded-full bg-forest-deep/5">
                          {topic.category}
                        </span>
                      </div>

                      {/* Title & Short Summary */}
                      <div className="sm:col-span-7">
                        <h3 className="font-display font-medium text-lg sm:text-xl text-forest-deep group-hover:text-forest-medium transition-colors leading-snug mb-1">
                          {topic.title}
                        </h3>
                        <p className="font-sans text-sm text-forest-deep/75 leading-relaxed">
                          {topic.summary}
                        </p>
                      </div>

                      {/* Expand Control */}
                      <div className="sm:col-span-2 flex items-center justify-end">
                        <div
                          className={cn(
                            'w-7 h-7 rounded-full border border-forest-deep/20 flex items-center justify-center transition-all duration-300 text-forest-deep',
                            isExpanded
                              ? 'bg-forest-deep text-cream rotate-180'
                              : 'group-hover:border-forest-deep group-hover:bg-forest-deep/5'
                          )}
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Inline Educational Detail Drawer */}
                  {isExpanded && (
                    <div className="mt-4 pt-5 border-t border-forest-deep/10 bg-white/70 p-6 sm:p-7 rounded-2xl border">
                      <div className="max-w-3xl">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-medium block mb-2">
                          AGRONOMIC STUDY: {topic.title.toUpperCase()}
                        </span>
                        <p className="font-sans text-sm sm:text-base text-forest-deep/85 leading-relaxed mb-4">
                          {topic.extendedSummary}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-forest-deep/60 mr-1 flex items-center gap-1">
                            <Tag className="w-3 h-3" /> Focus Areas:
                          </span>
                          {topic.keyFocus.map((focus, i) => (
                            <span
                              key={i}
                              className="font-mono text-xs px-2.5 py-1 rounded-full bg-forest-deep/5 text-forest-deep/80 border border-forest-deep/10"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>

                        <div className="text-[11px] font-mono text-forest-deep/50 pt-3 border-t border-forest-deep/10">
                          Resource Status: Grounded Source Topic · Full dedicated article in active editorial compilation.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
