'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Search, X, ArrowDown } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface FAQHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

/**
 * FAQ PAGE — SECTION 01: PREMIUM FAQ HERO
 *
 * Route: /faqs
 * Concept: "QUESTIONS THAT HELP US GROW"
 * Eyebrow: NAATI ORGANICS / HELP & KNOWLEDGE
 * Headline: "Good questions lead to better growing." (italic serif treatment on "better growing.")
 * Supporting: "Find straightforward answers about soil health, crop nutrition, Naati products, and working with us."
 *
 * Layout:
 * - Desktop: Split-screen 50/50
 * - Left Panel: Deep forest green (#14240E) with warm cream typography & prominent search field
 * - Right Panel: Full-bleed botanical photograph reaching top, bottom, and right viewport edges (no rounded card, no outer margins)
 * - data-nav-theme="dark" for transparent adaptive navbar
 */
export function FAQHero({ searchQuery, onSearchChange, className }: FAQHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.faq-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.faq-hero-title-line',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.faq-hero-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.faq-hero-search',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.35'
        )
        .fromTo(
          '.faq-hero-anchor',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );

      // 2. Right photograph clip unveil
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }

      // 3. Subtle image parallax during scroll
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const scrollToExplorer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('faq-explorer');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onSearchChange('');
      searchInputRef.current?.blur();
    } else if (e.key === 'Enter') {
      const target = document.getElementById('faq-explorer');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq-hero"
      data-nav-theme="dark"
      aria-labelledby="faq-hero-heading"
      className={cn(
        'relative min-h-[92dvh] lg:min-h-[100dvh] w-full flex items-stretch bg-forest-deep text-cream overflow-hidden pt-24 sm:pt-28 lg:pt-0 border-b border-cream/10',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[92dvh] lg:min-h-[100dvh]">
        {/* =====================================================================
            LEFT PANEL: DEEP FOREST GREEN WITH CREAM TYPOGRAPHY (55% Desktop)
            ===================================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 z-10 bg-forest-deep">
          <div className="max-w-xl xl:max-w-2xl">
            {/* Editorial Eyebrow */}
            <div className="faq-hero-eyebrow flex items-center gap-3 mb-6 sm:mb-8">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-harvest">
                NAATI ORGANICS / HELP &amp; KNOWLEDGE
              </span>
              <span className="h-px w-10 bg-harvest/40" aria-hidden="true" />
            </div>

            {/* Display Headline in Fraunces */}
            <h1
              id="faq-hero-heading"
              className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="faq-hero-title-line block font-display font-medium text-[clamp(2.5rem,5.2vw,5.25rem)] text-cream">
                Good questions lead
              </span>
              <span className="faq-hero-title-line block font-display font-light italic text-[clamp(2.5rem,5.2vw,5.25rem)] text-harvest mt-1">
                to better growing.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="faq-hero-desc font-sans text-base sm:text-lg lg:text-xl text-[#B7C1A9] leading-relaxed mb-8 sm:mb-10 max-w-xl">
              Find straightforward answers about soil health, crop nutrition, Naati products, and working with us.
            </p>

            {/* Prominent Question Search Field */}
            <div className="faq-hero-search relative w-full max-w-lg mb-8">
              <label htmlFor="faq-search-input" className="sr-only">
                Search questions and answers
              </label>
              <div className="relative flex items-center bg-forest-mid/35 border border-cream/25 hover:border-harvest/70 focus-within:border-harvest transition-colors shadow-inner">
                <Search className="w-5 h-5 text-harvest ml-4 sm:ml-5 shrink-0 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  id="faq-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search your question..."
                  className="w-full bg-transparent text-cream placeholder:text-cream/50 px-4 py-4 sm:py-4.5 font-sans text-sm sm:text-base focus:outline-none"
                  autoComplete="off"
                  spellCheck="false"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search input"
                    className="p-2 text-cream/60 hover:text-harvest transition-colors mr-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Helper shortcut indicator */}
              <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-[#B7C1A9]/70 px-1">
                <span>Search soil health, dosage, products, or dealers</span>
                <span className="hidden sm:inline">ESC to clear • ENTER to view</span>
              </div>
            </div>

            {/* Small Helper Anchor */}
            <div className="faq-hero-anchor pt-2">
              <a
                href="#faq-explorer"
                onClick={scrollToExplorer}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-medium text-cream hover:text-harvest transition-colors duration-200"
              >
                <span>EXPLORE QUESTIONS BELOW</span>
                <ArrowDown className="w-3.5 h-3.5 text-harvest transition-transform duration-200 group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: FULL-BLEED BOTANICAL PHOTOGRAPHY (45% Desktop)
            Touches top, bottom, and right viewport edges. No rounded container.
            ===================================================================== */}
        <div
          ref={visualWrapperRef}
          className="lg:col-span-5 relative min-h-[48vh] sm:min-h-[56vh] lg:min-h-full w-full overflow-hidden bg-forest-mid"
        >
          <div ref={parallaxImgRef} className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/images/faqs/hero.jpg"
              alt="Healthy young crops growing naturally in dark fertile agricultural soil in early morning sunlight"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center brightness-95 contrast-105"
            />
          </div>

          {/* Natural Vignette & Gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-black/25 pointer-events-none lg:bg-gradient-to-r lg:from-forest-deep/20 lg:to-transparent"
            aria-hidden="true"
          />

          {/* Documentary Photo Caption Tag */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-deep/85 backdrop-blur-sm border border-cream/15 text-cream text-[11px] font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
              <span>Living Farmland • Soil &amp; Plant Biology</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
