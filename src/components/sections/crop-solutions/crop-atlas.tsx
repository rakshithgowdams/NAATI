'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface CropAtlasProps {
  className?: string;
}

export interface AtlasCropItem {
  id: string;
  index: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  themes: {
    title: string;
    description: string;
  }[];
  timing: string;
  imageSrc: string;
  imageAlt: string;
}

export const ATLAS_CROPS: AtlasCropItem[] = [
  {
    id: 'solanaceous',
    index: '01',
    name: 'Tomato / Brinjal / Chilli',
    category: 'Fruiting Vegetables',
    headline: 'From establishment to fruit development.',
    description:
      'Fruiting vegetables require attention to soil conditions and changing nutritional needs throughout crop development.',
    themes: [
      {
        title: 'Root-Zone Conditions',
        description: 'Aerated soil structure and stable organic matter for continuous moisture availability and root expansion.',
      },
      {
        title: 'Vegetative Growth',
        description: 'Vigorous stem and leaf development establishing the photosynthetic framework required for heavy fruit sets.',
      },
      {
        title: 'Flowering & Fruit Development',
        description: 'Targeted nutritional support assisting floral retention, fruit sizing, and balanced crop maturity.',
      },
    ],
    timing: 'Establishment through fruit-set cycles',
    imageSrc: '/assets/images/crop-solutions/tomato-brinjal-chilli.jpg',
    imageAlt: 'Healthy tomato and brinjal plants with ripening fruits in organic farm rows',
  },
  {
    id: 'alliums',
    index: '02',
    name: 'Onion / Garlic',
    category: 'Bulb & Root Alliums',
    headline: 'A stronger foundation for bulb crops.',
    description:
      'Explore how soil structure, moisture conditions and crop-stage nutrition form part of bulb crop management.',
    themes: [
      {
        title: 'Soil Structure',
        description: 'Loose, friable soil aggregate preventing physical restriction during progressive bulb expansion.',
      },
      {
        title: 'Root-Zone Environment',
        description: 'Consistent microbial activity in shallow root zones ensuring efficient uptake of available micronutrients.',
      },
      {
        title: 'Bulb Development',
        description: 'Nutritional balance as energy transitions from vertical leaf foliage to underground bulb accumulation.',
      },
    ],
    timing: 'At planting & active bulb swelling',
    imageSrc: '/assets/images/crop-solutions/onion-garlic.jpg',
    imageAlt: 'Cultivated onion and garlic fields with neat rows and healthy upright green leaves',
  },
  {
    id: 'spices',
    index: '03',
    name: 'Turmeric / Ginger',
    category: 'Spices & Rhizomes',
    headline: 'Support growth beneath the surface.',
    description:
      'Rhizome crops require suitable growing conditions, healthy soil structure and nutrition management throughout their development.',
    themes: [
      {
        title: 'Organic Matter',
        description: 'High organic carbon content creating porous, well-aerated mounds for healthy rhizome finger development.',
      },
      {
        title: 'Soil Moisture Conditions',
        description: 'Adequate moisture holding capacity paired with free internal drainage to protect subterranean roots.',
      },
      {
        title: 'Rhizome Development',
        description: 'Long-duration bio-nutrition supporting vegetative tillering through mature underground biomass yield.',
      },
    ],
    timing: 'Land preparation through rhizome maturity',
    imageSrc: '/assets/images/crop-solutions/turmeric-ginger.jpg',
    imageAlt: 'Lush tropical turmeric and ginger crops with vigorous broad green foliage',
  },
  {
    id: 'greens',
    index: '04',
    name: 'Leafy Vegetables',
    category: 'Horticultural Greens',
    headline: 'Nurture every new leaf.',
    description:
      'Leafy crops benefit from careful management of their growing environment and balanced nutrition.',
    themes: [
      {
        title: 'Soil Preparation',
        description: 'Finely composted, active seedbeds promoting rapid emergence and uniform early root distribution.',
      },
      {
        title: 'Vegetative Development',
        description: 'Balanced mineral availability maintaining steady cellular vitality for lush, tender foliage growth.',
      },
      {
        title: 'Crop Health',
        description: 'Natural crop vigour and biological resilience supporting uniform canopy coverage across beds.',
      },
    ],
    timing: 'Pre-sowing & rapid vegetative cycles',
    imageSrc: '/assets/images/crop-solutions/leafy-vegetables.jpg',
    imageAlt: 'Dense green rows of vibrant natural spinach and amaranth leafy greens',
  },
  {
    id: 'field-crops',
    index: '05',
    name: 'Other Field Crops',
    category: 'Cereals, Millets & Field Crops',
    headline: 'Different fields. A common foundation.',
    description:
      'Cereals, millets and other field crops have different needs, but soil health remains an important part of crop management.',
    themes: [
      {
        title: 'Soil Conditions',
        description: 'Replenishing organic soil reserves in diverse soil types to improve moisture resilience in rainfed acres.',
      },
      {
        title: 'Crop Establishment',
        description: 'Strong seedling emergence and early crown-root initiation establishing robust tillering structure.',
      },
      {
        title: 'Crop-Specific Nutritional Planning',
        description: 'Carefully aligned agronomic timing adapting to regional weather cycles and local crop varieties.',
      },
    ],
    timing: 'Basal application & seasonal milestones',
    imageSrc: '/assets/images/crop-solutions/field-crops.jpg',
    imageAlt: 'Golden ripening finger millet ragi crop on Karnataka red earth farmland',
  },
];

/**
 * CROP SOLUTIONS PAGE — SECTION 02 & SECTION 03: THE CROP ATLAS & SELECTED EXPERIENCE
 *
 * Interactive Crop Discovery and Coordinated Detail Experience:
 * - Horizontally flowing editorial gallery displaying the 5 crop families
 * - Card-to-details auto-scroll navigation accounting for fixed transparent navbar
 * - Immediate state synchronization ensuring active card and details match instantly
 * - Editorial entrance transition on crop switch with masked text and staggered themes
 * - Seamless mobile responsiveness with dynamic touch scroll handling
 */
export function CropAtlas({ className }: CropAtlasProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCrop = ATLAS_CROPS[selectedIndex] ?? ATLAS_CROPS[0];

  const sectionRef = useRef<HTMLElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);
  const detailImageRef = useRef<HTMLDivElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);

  // Entrance animations for the section header and atlas gallery
  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.crop-atlas-header',
        { opacity: 0, y: 24 },
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

      gsap.fromTo(
        '.crop-atlas-card',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.crop-atlas-gallery',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  // Smooth editorial transition for details panel content when selected crop updates
  useEffect(() => {
    if (isReducedMotion()) return;
    if (!detailContentRef.current || !detailImageRef.current) return;

    const content = detailContentRef.current;
    const img = detailImageRef.current;

    const meta = content.querySelector('.crop-detail-meta');
    const title = content.querySelector('.crop-detail-title');
    const headline = content.querySelector('.crop-detail-headline');
    const desc = content.querySelector('.crop-detail-desc');
    const themes = content.querySelectorAll('.crop-detail-theme-item');

    gsap.killTweensOf([meta, title, headline, desc, themes, img]);

    const tl = gsap.timeline();

    tl.fromTo(
      meta,
      { opacity: 0.3, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )
      .fromTo(
        title,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        headline,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo(
        desc,
        { opacity: 0.3, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo(
        themes,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        img,
        { opacity: 0.7, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        0
      );
  }, [selectedIndex]);

  // Reliable anchor/ref-based smooth scroll to the details panel with navbar clearance
  const scrollToDetails = useCallback(() => {
    if (typeof window === 'undefined' || !detailPanelRef.current) return;

    // Use requestAnimationFrame to ensure state has applied and target coordinates are measured
    requestAnimationFrame(() => {
      if (!detailPanelRef.current) return;

      // Measure dynamically rendered navbar height
      const navEl = document.querySelector('header');
      const navHeight = navEl
        ? navEl.getBoundingClientRect().height
        : window.innerWidth < 640
        ? 80
        : 96;

      // Comfortable breathing room below navbar (24px on desktop, 16px on mobile)
      const extraPadding = window.innerWidth < 640 ? 16 : 24;
      const panelRect = detailPanelRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY || window.pageYOffset;
      const targetScrollY = Math.max(0, currentScrollY + panelRect.top - navHeight - extraPadding);

      // If already at or within 20px of destination, avoid unnecessary scroll motion
      if (Math.abs(currentScrollY - targetScrollY) < 20) return;

      window.scrollTo({
        top: targetScrollY,
        behavior: isReducedMotion() ? 'auto' : 'smooth',
      });
    });
  }, []);

  // Card Selection Handler: updates crop immediately and triggers smooth auto-scroll
  const handleSelectCrop = (index: number) => {
    // 1. Immediately update selected state (highlights card & updates panel content)
    setSelectedIndex(index);

    // 2. Smoothly scroll to the top of the details panel
    scrollToDetails();
  };

  return (
    <section
      ref={sectionRef}
      id="crop-atlas"
      data-nav-theme="light"
      aria-labelledby="crop-atlas-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* =====================================================================
            SECTION 02 HEADER
            ===================================================================== */}
        <div className="crop-atlas-header max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              02 / EXPLORE THE FIELDS
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
              FIVE CORE CROP FAMILIES
            </span>
          </div>

          <h2
            id="crop-atlas-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Find your crop.
            <br />
            <span className="italic text-forest-medium">Understand its needs.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
            Explore crop families and discover the foundation for a more informed nutrition approach. Select any group below to explore key agronomic themes.
          </p>
        </div>

        {/* =====================================================================
            EDITORIAL CROP ATLAS GALLERY (Horizontal Stream)
            Desktop: Horizontally flowing 5-column architectural cards
            Mobile: Swipeable scroll stream with visible progress
            ===================================================================== */}
        <div className="crop-atlas-gallery mb-16 sm:mb-20">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-forest-deep/15">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/60">
              CROP CATALOGUE (01 — 05)
            </span>
            <span className="font-mono text-xs text-forest-deep/50 hidden sm:inline">
              SELECT TO INSPECT SPECIFIC NEEDS
            </span>
          </div>

          {/* Desktop & Tablet Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {ATLAS_CROPS.map((crop, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => handleSelectCrop(idx)}
                  className={cn(
                    'crop-atlas-card group relative text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-medium/50',
                    isSelected
                      ? 'bg-forest-deep text-cream shadow-warm-md ring-2 ring-forest-deep'
                      : 'bg-white/70 hover:bg-white text-forest-deep border border-forest-deep/10 hover:border-forest-deep/30'
                  )}
                  aria-pressed={isSelected}
                  aria-controls="crop-details-panel"
                  aria-label={`Select ${crop.name}`}
                >
                  {/* Thumbnail Image Frame */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3.5 bg-forest-deep/10">
                    <Image
                      src={crop.imageSrc}
                      alt={crop.imageAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      quality={85}
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={cn(
                        'absolute inset-0 transition-opacity duration-300',
                        isSelected ? 'bg-forest-deep/20' : 'bg-transparent'
                      )}
                      aria-hidden="true"
                    />

                    {/* Corner index badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span
                        className={cn(
                          'font-mono text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md',
                          isSelected
                            ? 'bg-harvest text-forest-deep'
                            : 'bg-forest-deep/70 text-cream'
                        )}
                      >
                        {crop.index}
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col justify-between min-h-[72px]">
                    <div>
                      <span
                        className={cn(
                          'font-mono text-[10px] tracking-wider uppercase block mb-1 font-semibold transition-colors',
                          isSelected ? 'text-harvest' : 'text-forest-medium'
                        )}
                      >
                        {crop.category}
                      </span>
                      <h3
                        className={cn(
                          'font-display font-medium text-sm sm:text-base leading-tight transition-colors',
                          isSelected ? 'text-cream' : 'text-forest-deep'
                        )}
                      >
                        {crop.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-current/15">
                      <span
                        className={cn(
                          'font-mono text-[10px] uppercase tracking-wider',
                          isSelected ? 'text-cream/70' : 'text-forest-deep/50'
                        )}
                      >
                        {isSelected ? 'ACTIVE VIEW' : 'VIEW DETAILS'}
                      </span>
                      <ArrowRight
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-300',
                          isSelected
                            ? 'text-harvest translate-x-0.5'
                            : 'text-forest-deep/40 group-hover:translate-x-0.5 group-hover:text-forest-deep'
                        )}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            SECTION 03 — THE SELECTED CROP EXPERIENCE DETAIL PANEL
            Connected detail showcase updating dynamically with selected crop
            ===================================================================== */}
        <div
          ref={detailPanelRef}
          id="crop-details-panel"
          className="relative rounded-3xl bg-white border border-forest-deep/15 overflow-hidden shadow-warm-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left Side: Crop Title & Educational Themes (Col 1 to 7) */}
            <div
              ref={detailContentRef}
              className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14"
            >
              <div>
                {/* Stage Tag */}
                <div className="crop-detail-meta flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest-medium bg-forest-medium/10 px-3 py-1 rounded-full">
                    {selectedCrop.index} / {selectedCrop.category}
                  </span>
                  <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/50">
                    STAGE: {selectedCrop.timing}
                  </span>
                </div>

                {/* Crop Name */}
                <div className="overflow-hidden mb-3">
                  <h3 className="crop-detail-title font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest-deep tracking-tight">
                    {selectedCrop.name}
                  </h3>
                </div>

                {/* Narrative Headline */}
                <div className="overflow-hidden mb-4">
                  <p className="crop-detail-headline font-display italic text-lg sm:text-xl text-forest-medium">
                    &ldquo;{selectedCrop.headline}&rdquo;
                  </p>
                </div>

                {/* Narrative Description */}
                <p className="crop-detail-desc font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed mb-8 [text-wrap:pretty]">
                  {selectedCrop.description}
                </p>

                {/* Three Educational Crop Themes */}
                <div className="border-t border-forest-deep/15 pt-6 space-y-5 mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest-deep/70 block">
                    KEY AGRONOMIC THEMES FOR THIS CROP:
                  </span>

                  <div className="space-y-5">
                    {selectedCrop.themes.map((theme, i) => (
                      <div key={i} className="crop-detail-theme-item flex items-start gap-3.5">
                        <div className="w-5 h-5 rounded-full bg-forest-medium/15 text-forest-medium flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-forest-deep mb-0.5">
                            {theme.title}
                          </h4>
                          <p className="font-sans text-xs sm:text-sm text-forest-deep/75 leading-relaxed">
                            {theme.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Links */}
              <div className="pt-6 border-t border-forest-deep/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <Link
                  href={`/contact?crop=${selectedCrop.id}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-forest-deep text-cream font-sans text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-forest-medium hover:shadow-warm-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep"
                >
                  <span>Ask About {selectedCrop.name.split('/')[0].trim()}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#naati-approach"
                  className="inline-flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-forest-medium hover:text-forest-deep transition-colors py-2"
                >
                  <span>See How Naati Applies to This Crop ↓</span>
                </a>
              </div>
            </div>

            {/* Right Side: Large Immersive Photograph (Col 8 to 12) */}
            <div
              ref={detailImageRef}
              className="lg:col-span-5 relative min-h-[340px] sm:min-h-[440px] lg:min-h-full overflow-hidden bg-forest-deep/5"
            >
              <Image
                src={selectedCrop.imageSrc}
                alt={selectedCrop.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={90}
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent lg:hidden"
                aria-hidden="true"
              />

              {/* In-photo caption */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-forest-deep/85 backdrop-blur-md px-4 py-3 rounded-xl border border-cream/20 text-cream">
                <span className="font-mono text-[11px] uppercase tracking-wider text-harvest font-semibold block mb-0.5">
                  AUTHENTIC CULTIVATION ARCHIVE
                </span>
                <span className="font-display text-sm font-medium tracking-tight">
                  {selectedCrop.name} · {selectedCrop.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
