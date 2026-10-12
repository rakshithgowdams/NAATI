'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight, Search, Check, Link2, RotateCcw } from 'lucide-react';
import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  FaqCategorySlug,
  FaqItem,
  searchFaqs,
} from '@/data/faqs';
import { cn } from '@/lib/utils/cn';

export interface FAQExplorerProps {
  searchQuery: string;
  onClearSearch: () => void;
  className?: string;
}

/**
 * FAQ PAGE — SECTION 02: INTERACTIVE FAQ EXPLORER
 *
 * Route: /faqs
 * Eyebrow: 01 / FIND YOUR ANSWERS
 * Headline: "Everything starts with understanding."
 * Supporting: "Choose a topic or search directly for what you need."
 *
 * Design:
 * - Desktop Two-Column Layout:
 *   - Left (~30%): Sticky Category Navigation (01 / SOIL HEALTH, 02 / NAATI PRODUCTS, 03 / APPLICATION, 04 / DEALER NETWORK)
 *   - Right (~70%): Full-width editorial question rows with thin horizontal dividers (NO boxed cards)
 * - Deep-linking anchor support with smooth scrolling
 * - Live search matching across all questions and answers
 * - Accessible accordion controls (WAI-ARIA compliance)
 */
export function FAQExplorer({ searchQuery, onClearSearch, className }: FAQExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategorySlug>('soil-health');
  const [expandedId, setExpandedId] = useState<string | null>('sh-01');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const explorerRef = useRef<HTMLElement>(null);

  const isSearching = searchQuery.trim().length > 0;

  // Search results
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return searchFaqs(searchQuery);
  }, [searchQuery, isSearching]);

  // Questions to display
  const displayedItems: FaqItem[] = useMemo(() => {
    if (isSearching) {
      return searchResults;
    }
    return FAQ_ITEMS.filter((item) => item.category === selectedCategory);
  }, [isSearching, searchResults, selectedCategory]);

  // Active category metadata
  const currentCategoryMeta = useMemo(() => {
    return FAQ_CATEGORIES.find((cat) => cat.slug === selectedCategory) || FAQ_CATEGORIES[0];
  }, [selectedCategory]);

  // Deep linking: Inspect hash on initial load or change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const targetItem = FAQ_ITEMS.find((item) => item.slug === hash);
    if (targetItem) {
      setSelectedCategory(targetItem.category);
      setExpandedId(targetItem.id);

      setTimeout(() => {
        const el = document.getElementById(targetItem.slug);
        if (el) {
          const yOffset = -120;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  // When searching, expand first result automatically
  useEffect(() => {
    if (isSearching && searchResults.length > 0) {
      setExpandedId(searchResults[0].id);
    }
  }, [isSearching, searchResults]);

  // Handle accordion toggle
  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Copy shareable link
  const copyShareLink = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    if (typeof window === 'undefined') return;

    const url = `${window.location.origin}/faqs#${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  return (
    <section
      ref={explorerRef}
      id="faq-explorer"
      data-nav-theme="light"
      aria-labelledby="faq-explorer-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* =====================================================================
            SECTION INTRODUCTORY STATEMENT
            ===================================================================== */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              01 / FIND YOUR ANSWERS
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="faq-explorer-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-forest-deep tracking-tight leading-[1.12] mb-5"
          >
            Everything starts <br />
            <span className="italic font-light">with understanding.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed">
            Choose a topic or search directly for what you need. Clear, scientifically honest answers grounded in regenerative soil biology.
          </p>
        </div>

        {/* =====================================================================
            TWO-COLUMN EDITORIAL EXPLORER
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ===================================================================
              LEFT COLUMN: STICKY CATEGORY NAVIGATION (~30% Desktop)
              =================================================================== */}
          <aside className="lg:col-span-4 sticky top-28 sm:top-32 self-start z-10">
            {isSearching ? (
              /* Search Mode Sidebar Header */
              <div className="bg-forest-deep text-cream p-6 border border-forest-deep/15 mb-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-harvest font-semibold flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5" />
                    SEARCH RESULTS
                  </span>
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-cream/70 hover:text-harvest transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                <div className="font-display text-lg text-cream mb-1">
                  &ldquo;{searchQuery}&rdquo;
                </div>
                <div className="text-xs font-mono text-[#B7C1A9]">
                  {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} across all topics
                </div>
              </div>
            ) : (
              /* Normal Category Navigation */
              <nav
                aria-label="FAQ Category Navigation"
                className="flex flex-col space-y-1 border-t border-b lg:border-b-0 border-forest-deep/15 py-3 lg:py-0"
              >
                <div className="hidden lg:block text-xs font-mono uppercase tracking-[0.2em] text-forest-deep/50 pb-4">
                  Categories
                </div>

                {/* Mobile: Horizontal scroll tab-pills */}
                <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-1 scrollbar-none pb-2 lg:pb-0">
                  {FAQ_CATEGORIES.map((cat) => {
                    const isActive = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          const firstInCat = FAQ_ITEMS.find((item) => item.category === cat.slug);
                          if (firstInCat) setExpandedId(firstInCat.id);
                        }}
                        className={cn(
                          'group relative text-left py-3 sm:py-3.5 px-4 sm:px-5 transition-all duration-200 border-l-2 shrink-0 lg:shrink',
                          isActive
                            ? 'border-harvest bg-forest-deep text-cream font-medium shadow-sm'
                            : 'border-transparent text-forest-deep/70 hover:text-forest-deep hover:bg-forest-deep/5'
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase">
                            {cat.shortLabel}
                          </span>
                          <span
                            className={cn(
                              'text-xs font-mono transition-opacity duration-200 hidden sm:inline',
                              isActive ? 'opacity-100 text-harvest' : 'opacity-0 group-hover:opacity-40'
                            )}
                          >
                            →
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}

            {/* Quick Context Card (Desktop only) */}
            <div className="hidden lg:block mt-8 p-6 bg-forest-deep/5 border border-forest-deep/10">
              <div className="font-mono text-xs uppercase tracking-wider text-forest-deep/60 mb-2">
                Need Specific Formulation Advice?
              </div>
              <p className="font-sans text-xs text-forest-deep/80 leading-relaxed mb-4">
                Our team can review your soil test report, plantation acreage, and current fertility practices.
              </p>
              <Link
                href="/contact?type=general"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] font-semibold text-forest-deep hover:text-harvest transition-colors"
              >
                <span>Ask an Agronomist</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-harvest" />
              </Link>
            </div>
          </aside>

          {/* ===================================================================
              RIGHT COLUMN: QUESTIONS AND ANSWERS (~70% Desktop)
              =================================================================== */}
          <div className="lg:col-span-8">
            {/* Header for current topic (or search mode) */}
            <div className="mb-8 pb-6 border-b border-forest-deep/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-harvest font-semibold block mb-1">
                  {isSearching ? 'EXPLORING SEARCH RESULTS' : currentCategoryMeta.shortLabel}
                </span>
                <h3 className="font-display font-medium text-2xl sm:text-3xl text-forest-deep leading-tight">
                  {isSearching ? `Matching Questions for “${searchQuery}”` : currentCategoryMeta.name}
                </h3>
              </div>
              <span className="font-mono text-xs text-forest-deep/60 shrink-0">
                {displayedItems.length} {displayedItems.length === 1 ? 'Question' : 'Questions'}
              </span>
            </div>

            {/* No Results Fallback */}
            {displayedItems.length === 0 && (
              <div className="py-14 text-center border-t border-b border-forest-deep/15 my-6">
                <p className="font-display text-2xl text-forest-deep mb-3">
                  No matching questions found.
                </p>
                <p className="font-sans text-sm text-forest-deep/75 max-w-md mx-auto mb-6">
                  We couldn&apos;t find answers matching &ldquo;{searchQuery}&rdquo;. Try another keyword or browse questions by category.
                </p>
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="px-6 py-2.5 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.18em] hover:bg-forest-light hover:text-forest-deep transition-colors"
                >
                  View All Questions
                </button>
              </div>
            )}

            {/* =================================================================
                FULL-WIDTH QUESTION ROWS (NO BOXED CARDS)
                ================================================================= */}
            <div className="divide-y divide-forest-deep/15 border-b border-forest-deep/15">
              {displayedItems.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                  <article
                    key={item.id}
                    id={item.slug}
                    className={cn(
                      'group transition-colors duration-200',
                      isExpanded ? 'bg-white/40' : 'hover:bg-forest-deep/[0.02]'
                    )}
                  >
                    {/* Clickable Question Header Button */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`faq-answer-${item.id}`}
                      className="w-full text-left py-6 sm:py-7 px-2 sm:px-4 flex items-start justify-between gap-4 sm:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-harvest"
                    >
                      <div className="flex items-start gap-4 sm:gap-6 flex-1">
                        {/* Number Indicator */}
                        <span className="font-mono text-xs sm:text-sm font-semibold text-harvest tracking-wider pt-1 shrink-0">
                          {item.number}
                        </span>

                        <div className="flex-1">
                          {/* Category Badge when searching */}
                          {isSearching && (
                            <span className="inline-block text-[11px] font-mono text-forest-deep/60 uppercase tracking-widest mb-1.5">
                              {item.categoryLabel}
                            </span>
                          )}

                          {/* Question Text */}
                          <h4
                            className={cn(
                              'font-sans text-lg sm:text-xl lg:text-[1.35rem] leading-snug transition-colors',
                              isExpanded
                                ? 'text-forest-deep font-semibold'
                                : 'text-forest-deep/90 font-medium group-hover:text-forest-deep'
                            )}
                          >
                            {item.question}
                          </h4>
                        </div>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 border',
                          isExpanded
                            ? 'bg-forest-deep text-cream border-forest-deep rotate-180'
                            : 'bg-transparent text-forest-deep/60 border-forest-deep/20 group-hover:border-forest-deep group-hover:text-forest-deep'
                        )}
                        aria-hidden="true"
                      >
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Answer Panel */}
                    {isExpanded && (
                      <div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={item.slug}
                        className="px-2 sm:px-4 pb-8 pt-1 ml-8 sm:ml-12 border-t border-forest-deep/10 text-forest-deep/85 animate-in fade-in duration-200"
                      >
                        {/* Short Answer Summary Callout */}
                        <div className="mb-4 pt-3 font-display text-base sm:text-lg text-forest-deep font-medium italic border-l-2 border-harvest pl-4 leading-relaxed">
                          {item.shortAnswer}
                        </div>

                        {/* Detailed Answer Paragraphs */}
                        <div className="space-y-3 font-sans text-sm sm:text-base leading-relaxed text-forest-deep/80 max-w-3xl">
                          {item.detailedAnswer.map((para, pIdx) => (
                            <p key={pIdx}>{para}</p>
                          ))}
                        </div>

                        {/* Footer Actions: Related Link & Anchor Copy */}
                        <div className="mt-6 pt-4 border-t border-forest-deep/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                          {item.relatedLink && item.relatedLabel ? (
                            <Link
                              href={item.relatedLink}
                              className="group inline-flex items-center gap-1.5 font-medium text-forest-deep hover:text-harvest uppercase tracking-[0.16em] transition-colors"
                            >
                              <span>{item.relatedLabel}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-harvest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                          ) : (
                            <span className="text-forest-deep/50 uppercase tracking-widest">
                              Direct Agronomy Guidance
                            </span>
                          )}

                          {/* Shareable Anchor Button */}
                          <button
                            type="button"
                            onClick={(e) => copyShareLink(e, item.slug)}
                            aria-label={`Copy link to question: ${item.question}`}
                            className="inline-flex items-center gap-1.5 text-forest-deep/60 hover:text-forest-deep transition-colors uppercase tracking-wider text-[11px]"
                          >
                            {copiedSlug === item.slug ? (
                              <>
                                <Check className="w-3 h-3 text-harvest" />
                                <span className="text-harvest">Link Copied!</span>
                              </>
                            ) : (
                              <>
                                <Link2 className="w-3 h-3" />
                                <span>Copy Link</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
