'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight, ArrowDownRight, BookOpen, Video, FileText, HelpCircle } from 'lucide-react';
import { HUB_RESOURCES, type ResourceCategory, type ResourceItem } from '@/data/resources';
import { cn } from '@/lib/utils/cn';

const CATEGORIES: ResourceCategory[] = [
  'ALL RESOURCES',
  'GUIDES',
  'VIDEOS',
  'DOWNLOADS',
  'FARMER QUESTIONS',
];

export interface ResourceLibraryProps {
  className?: string;
}

/**
 * FARMER KNOWLEDGE HUB — SECTION 02: FIND WHAT YOU NEED
 *
 * Searchable and Filterable Resource Library:
 * - Real-time client-side search across titles, summaries, and verified tags
 * - Category filter pills with immediate feedback and active count badges
 * - Clear reset action & helpful empty state
 * - Compact editorial rows with clear typography, content-type markers, and functioning actions
 * - Verified metadata only: no fake dates, durations, download metrics or fictional file sizes
 */
export function ResourceLibrary({ className }: ResourceLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('ALL RESOURCES');

  // Filter resources based on query and category
  const filteredResources = useMemo(() => {
    return HUB_RESOURCES.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'ALL RESOURCES' || item.category === activeCategory;

      if (!matchesCategory) return false;

      // Query match across title, description, category, and tags
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inTags = item.tags.some((tag) => tag.toLowerCase().includes(q));
      const inType = item.typeLabel.toLowerCase().includes(q);

      return inTitle || inDesc || inTags || inType;
    });
  }, [searchQuery, activeCategory]);

  // Compute category counts for pills
  const categoryCounts = useMemo(() => {
    const counts: Record<ResourceCategory, number> = {
      'ALL RESOURCES': HUB_RESOURCES.length,
      'GUIDES': HUB_RESOURCES.filter((r) => r.category === 'GUIDES').length,
      'VIDEOS': HUB_RESOURCES.filter((r) => r.category === 'VIDEOS').length,
      'DOWNLOADS': HUB_RESOURCES.filter((r) => r.category === 'DOWNLOADS').length,
      'FARMER QUESTIONS': HUB_RESOURCES.filter((r) => r.category === 'FARMER QUESTIONS').length,
    };
    return counts;
  }, []);

  const handleReset = () => {
    setSearchQuery('');
    setActiveCategory('ALL RESOURCES');
  };

  const getCategoryIcon = (category: ResourceItem['category']) => {
    switch (category) {
      case 'GUIDES':
        return <BookOpen className="w-4 h-4 text-forest-deep/70" />;
      case 'VIDEOS':
        return <Video className="w-4 h-4 text-forest-deep/70" />;
      case 'DOWNLOADS':
        return <FileText className="w-4 h-4 text-forest-deep/70" />;
      case 'FARMER QUESTIONS':
        return <HelpCircle className="w-4 h-4 text-forest-deep/70" />;
    }
  };

  return (
    <section
      id="resource-library"
      data-nav-theme="light"
      aria-labelledby="resource-library-heading"
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
              01 / RESOURCE LIBRARY
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="resource-library-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Find the knowledge you need.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Search our curated library of practical field guides, crop protocols, educational media, and regional farmer questions.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-10 sm:mb-12 space-y-6">
          {/* Functional Search Bar */}
          <div className="relative max-w-2xl">
            <label htmlFor="resource-search-input" className="sr-only">
              Search guides, topics and resources
            </label>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-forest-deep/40 pointer-events-none" />
              <input
                id="resource-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, topics and resources..."
                className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white/70 border border-forest-deep/20 rounded-none font-sans text-sm sm:text-base text-forest-deep placeholder:text-forest-deep/40 focus:outline-none focus:ring-1 focus:ring-forest-deep focus:bg-white transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                  className="absolute right-4 p-1 text-forest-deep/50 hover:text-forest-deep transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3" role="tablist" aria-label="Filter resource categories">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category];

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-3.5 sm:px-4 py-2 text-xs font-mono tracking-[0.12em] uppercase transition-all duration-200 border flex items-center gap-2 cursor-pointer',
                    isActive
                      ? 'bg-forest-deep text-cream border-forest-deep shadow-sm'
                      : 'bg-white/40 text-forest-deep/80 border-forest-deep/15 hover:border-forest-deep/40 hover:bg-white/80'
                  )}
                >
                  <span>{category}</span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full font-sans font-medium',
                      isActive ? 'bg-harvest text-forest-deep' : 'bg-forest-deep/10 text-forest-deep/70'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Clear All Filters Button */}
            {(searchQuery || activeCategory !== 'ALL RESOURCES') && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-forest-deep/60 hover:text-forest-deep underline underline-offset-4 ml-2 transition-colors py-2"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Active Query Indication */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-forest-deep/10 text-xs font-mono text-forest-deep/60">
          <div>
            Showing <span className="font-semibold text-forest-deep">{filteredResources.length}</span> of{' '}
            {HUB_RESOURCES.length} items
            {searchQuery && (
              <span className="ml-2 text-forest-deep">
                matching &ldquo;<span className="italic">{searchQuery}</span>&rdquo;
              </span>
            )}
          </div>
          <div className="hidden sm:block uppercase tracking-wider">
            Category: {activeCategory}
          </div>
        </div>

        {/* Resource Items List */}
        {filteredResources.length > 0 ? (
          <div className="divide-y divide-forest-deep/10 border-t border-forest-deep/10">
            {filteredResources.map((item) => {
              const isAnchor = item.destination.startsWith('#');
              const isExternal = item.destination.startsWith('http');
              const isDownload = item.destination.startsWith('/downloads/');

              return (
                <article
                  key={item.id}
                  className="group py-6 sm:py-8 transition-colors duration-200 hover:bg-white/40 -mx-4 px-4 sm:-mx-6 sm:px-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                    {/* Column 1: Type & Language Meta */}
                    <div className="lg:col-span-3 flex flex-wrap items-center lg:flex-col lg:items-start gap-2 sm:gap-2.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-forest-deep/5 border border-forest-deep/10 text-forest-deep text-xs font-mono tracking-wider">
                        {getCategoryIcon(item.category)}
                        <span className="uppercase text-[11px] font-medium">{item.typeLabel}</span>
                      </div>

                      {item.badge && (
                        <span className="inline-block px-2 py-0.5 bg-harvest/20 border border-harvest/40 text-forest-deep text-[10px] font-mono tracking-wider uppercase font-semibold">
                          {item.badge}
                        </span>
                      )}

                      {item.language && (
                        <span className="inline-block text-[11px] font-mono text-forest-deep/70">
                          {item.language}
                        </span>
                      )}
                    </div>

                    {/* Column 2: Title & Summary */}
                    <div className="lg:col-span-6">
                      <h3 className="font-display font-medium text-lg sm:text-xl lg:text-2xl text-forest-deep group-hover:text-forest-deep/90 leading-snug">
                        {item.title}
                      </h3>

                      <p className="font-sans text-sm sm:text-base text-forest-deep/75 mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      {item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono text-forest-deep/60 bg-forest-deep/[0.04] px-2 py-0.5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Column 3: Action Link */}
                    <div className="lg:col-span-3 lg:text-right flex lg:justify-end items-center pt-2 lg:pt-0">
                      {isAnchor ? (
                        <a
                          href={item.destination}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] font-medium text-forest-deep group-hover:text-harvest transition-colors duration-200"
                        >
                          <span>{item.destinationLabel}</span>
                          <ArrowDownRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                        </a>
                      ) : isDownload ? (
                        <a
                          href={item.destination}
                          download
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] font-medium text-forest-deep group-hover:text-harvest transition-colors duration-200"
                        >
                          <span>{item.destinationLabel}</span>
                          <ArrowDownRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                        </a>
                      ) : isExternal ? (
                        <a
                          href={item.destination}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] font-medium text-forest-deep group-hover:text-harvest transition-colors duration-200"
                        >
                          <span>{item.destinationLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href={item.destination}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] font-medium text-forest-deep group-hover:text-harvest transition-colors duration-200"
                        >
                          <span>{item.destinationLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 sm:py-20 text-center border-t border-b border-forest-deep/10 bg-white/30 px-6">
            <HelpCircle className="w-10 h-10 text-forest-deep/30 mx-auto mb-4" />
            <h3 className="font-display font-medium text-xl text-forest-deep">
              No matching resources found
            </h3>
            <p className="font-sans text-sm sm:text-base text-forest-deep/70 max-w-md mx-auto mt-2 mb-6">
              We couldn&apos;t find any resources matching your search. Try searching for broader terms like &ldquo;soil&rdquo;, &ldquo;roots&rdquo;, or &ldquo;vermicompost&rdquo;.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.15em] hover:bg-forest-light hover:text-forest-deep transition-colors"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
