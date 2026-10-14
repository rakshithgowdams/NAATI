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
    id: 'coconut',
    index: '01',
    name: 'Coconut',
    category: 'Plantation Palms',
    headline: 'Sustained crown vigour and high copra yields.',
    description:
      'Perennial palms require deep soil aeration, biological feeding in the active 2-metre root basin, and balanced trace minerals to prevent premature button shedding.',
    themes: [
      {
        title: 'Feeder Root Zone Vitality',
        description: 'Rebuilding fibrous feeder roots in the 1.5–2.0 metre circular ring around the palm trunk.',
      },
      {
        title: 'Button Retention & Fruit Set',
        description: 'Targeted biological support minimizing button drop and supporting uniform bunch filling.',
      },
      {
        title: 'Crown Health & Copra Weight',
        description: 'Dense, dark green frond architecture maximizing photosynthetic capacity and meat density.',
      },
    ],
    timing: 'Pre-monsoon & post-monsoon dressing',
    imageSrc: '/assets/images/crop-solutions/coconut.jpg',
    imageAlt: 'Healthy productive coconut palm crown laden with abundant nut bunches on South Indian plantation',
  },
  {
    id: 'arecanut',
    index: '02',
    name: 'Arecanut',
    category: 'Plantation Palms',
    headline: 'Crown stability and heavy nut-bunch retention.',
    description:
      'Arecanut palms demand porous, well-aerated soil structure to avoid waterlogging and crown rot, coupled with active bio-nutrition during monsoon transitions.',
    themes: [
      {
        title: 'Root Basin Aeration',
        description: 'De-compacting trench soil around palm bases to encourage vigorous white feeder roots.',
      },
      {
        title: 'Nut Retention & Weight',
        description: 'Reducing young nut drop during heavy rainfall and optimizing final harvest grade.',
      },
      {
        title: 'Seasonal Resistance',
        description: 'Fortifying palm resilience against torrential monsoon stress and sudden moisture swings.',
      },
    ],
    timing: 'May–June & September–October',
    imageSrc: '/assets/images/crop-solutions/arecanut.jpg',
    imageAlt: 'Towering healthy arecanut palms with vigorous green foliage and heavy nut bunches in Karnataka grove',
  },
  {
    id: 'coffee',
    index: '03',
    name: 'Coffee',
    category: 'Estate Plantations',
    headline: 'Thriving bushes beneath the forest canopy.',
    description:
      'Shade-grown Arabica and Robusta coffee estates depend on rich microbial humus layers to support floral initiation, pinhead setting, and uniform cherry sizing.',
    themes: [
      {
        title: 'Forest Soil Humus Building',
        description: 'Enhancing the natural leaf-litter decomposition layer to feed shallow root mats continuously.',
      },
      {
        title: 'Post-Blossom Berry Set',
        description: 'Targeted bio-nutrition after blossom showers ensuring minimal berry drop and uniform berry clusters.',
      },
      {
        title: 'Bean Density & Cup Quality',
        description: 'Balanced trace elements enhancing coffee cherry maturation, sugar content, and premium cup profiles.',
      },
    ],
    timing: 'Post-blossom & berry swelling',
    imageSrc: '/assets/images/crop-solutions/coffee.jpg',
    imageAlt: 'Lush shade-grown coffee plants loaded with ripe red cherries in Western Ghats estate',
  },
  {
    id: 'pepper',
    index: '04',
    name: 'Pepper',
    category: 'Spices & Vines',
    headline: 'Dense spikes and strong vine anchoring.',
    description:
      'Black pepper vines clambering on shade standards require healthy collar root zones protected from soil pathogens, along with balanced foliar feeding for long spike filling.',
    themes: [
      {
        title: 'Collar Root Protection',
        description: 'Organic soil enrichment around tree standards strengthening vine root collars against monsoon wilt.',
      },
      {
        title: 'Spike Emergence & Pollination',
        description: 'Supporting robust spike elongation and uniform flowering along every fruiting branch.',
      },
      {
        title: 'Berry Filling & Bold Peppercorns',
        description: 'Nutrient availability throughout monsoon berry filling producing heavy, high-density black peppercorns.',
      },
    ],
    timing: 'Spike emergence & berry development',
    imageSrc: '/assets/images/crop-solutions/pepper.jpg',
    imageAlt: 'Climbing black pepper vines with dense green and ripening red peppercorn spikes on shade trees',
  },
  {
    id: 'banana',
    index: '05',
    name: 'Banana',
    category: 'Horticultural Fruits',
    headline: 'Massive bunches from vigorous rootstocks.',
    description:
      'Bananas are heavy feeders requiring extensive rootzone organic matter, quick nutrient cycling, and biological stimulation from vegetative pseudostem to bunch emergence.',
    themes: [
      {
        title: 'Planting Pit Conditioning',
        description: 'Deep organic soil enrichment in planting pits ensuring rapid early root anchorage and sucker emergence.',
      },
      {
        title: 'Shooting & Finger Count',
        description: 'Nutrient surge during floral transformation maximizing the number of hands and fingers per bunch.',
      },
      {
        title: 'Bunch Filling & Grade A Quality',
        description: 'Sustained bio-nutrition maintaining strong bunch stalks, uniform finger length, and early maturity.',
      },
    ],
    timing: 'Pit preparation through bunch shooting',
    imageSrc: '/assets/images/crop-solutions/banana.jpg',
    imageAlt: 'Vibrant organic banana plantation showing heavy hanging bunches of green bananas and purple inflorescence heart',
  },
  {
    id: 'mango',
    index: '06',
    name: 'Mango',
    category: 'Orchard Fruits',
    headline: 'Flourishing blossoms to golden harvest.',
    description:
      'Mango orchards thrive when feeder roots along the canopy drip-line are energized with organic matter, followed by targeted nutrient timing during flowering and fruit sizing.',
    themes: [
      {
        title: 'Canopy Drip-Line Ring Feeding',
        description: 'Applying organic nutrition along the drip circle where feeder root concentration is highest.',
      },
      {
        title: 'Panicle Vitality & Fruitlet Retention',
        description: 'Biological conditioning preventing heavy flower drop and supporting early pea-stage fruitlet set.',
      },
      {
        title: 'Fruit Sizing & Aroma Development',
        description: 'Balanced organic nourishment enhancing fruit weight, pulp sweetness, and natural shelf-life.',
      },
    ],
    timing: 'Post-harvest rest & fruit-set stage',
    imageSrc: '/assets/images/crop-solutions/mango.jpg',
    imageAlt: 'Abundant mature Alphonso and Badami mangoes hanging on leafy orchard branches in sunny grove',
  },
  {
    id: 'vegetables',
    index: '07',
    name: 'Vegetables',
    category: 'Open-Field & Protected Crops',
    headline: 'From establishment to heavy picking.',
    description:
      'Tomatoes, brinjals, chillies, and gourds require fast, bio-available soil nutrition for rapid root establishment, continuous flowering, and prolonged harvest windows.',
    themes: [
      {
        title: 'Raised Bed Soil Conditioning',
        description: 'Aerated, microbe-rich bed preparation ensuring strong root spread right from nursery transplanting.',
      },
      {
        title: 'Continuous Flowering & Set',
        description: 'Balanced bio-stimulants helping plants navigate heat and humidity while retaining blossom clusters.',
      },
      {
        title: 'Skin Lustre & Harvest Longevity',
        description: 'Natural trace minerals delivering vibrant color, firm pulp texture, and improved transport shelf-life.',
      },
    ],
    timing: 'Bed preparation & active fruiting cycles',
    imageSrc: '/assets/images/crop-solutions/vegetables.jpg',
    imageAlt: 'Lush organic vegetable beds with healthy tomatoes, brinjals, and chillies in fertile red loam soil',
  },
  {
    id: 'field-crops',
    index: '08',
    name: 'Field Crops',
    category: 'Cereals & Millets',
    headline: 'Different fields. A common foundation.',
    description:
      'Finger millet (ragi), paddy, pulses, and dryland cereals need improved soil moisture retention, strong crown root establishment, and uniform panicle filling.',
    themes: [
      {
        title: 'Basal Soil Moisture Capacity',
        description: 'Replenishing soil humus to improve water retention during erratic seasonal dry spells.',
      },
      {
        title: 'Crown-Root & Tillering Drive',
        description: 'Strong seedling emergence and early root initiation establishing robust tillering structure.',
      },
      {
        title: 'Grain Filling & Panicle Weight',
        description: 'Aligned agronomic timing supporting complete grain filling without premature lodging.',
      },
    ],
    timing: 'Basal ploughing & tillering stage',
    imageSrc: '/assets/images/crop-solutions/field-crops.jpg',
    imageAlt: 'Golden ripening finger millet ragi and cereal field crops under Karnataka sunlight',
  },
  {
    id: 'spices',
    index: '09',
    name: 'Spices',
    category: 'Aromatic Spices & Rhizomes',
    headline: 'Rich vitality beneath and above the soil.',
    description:
      'Turmeric, ginger, and cardamom demand deep, loose, humus-rich soil mounds that drain excess rainfall while providing sustained nutrition for dense underground rhizomes.',
    themes: [
      {
        title: 'Porous Mounds & Drainage',
        description: 'High organic carbon content creating friable raised beds preventing waterlogging and rhizome rot.',
      },
      {
        title: 'Shoot Tillering & Canopy Cover',
        description: 'Vigorous pseudostem and leaf canopy development establishing strong photosynthetic reserves.',
      },
      {
        title: 'Rhizome Bulking & Curcumin',
        description: 'Long-duration biological feeding boosting primary and secondary finger expansion and active essential oils.',
      },
    ],
    timing: 'Land preparation through rhizome maturity',
    imageSrc: '/assets/images/crop-solutions/spices.jpg',
    imageAlt: 'Aromatic turmeric and ginger rhizomes growing vigorously in deep organic raised soil beds',
  },
  {
    id: 'terrace-gardens',
    index: '10',
    name: 'Home / Terrace Gardens',
    category: 'Urban & Container Gardens',
    headline: 'Vibrant organic food on your rooftop.',
    description:
      'Potted vegetables, herbs, and container fruit trees in limited potting soil require frequent, gentle biological replenishment to stay lush, disease-free, and productive.',
    themes: [
      {
        title: 'Potting Mix Biological Life',
        description: 'Preventing soil exhaustion and compaction in grow bags and terracotta containers with organic bio-inputs.',
      },
      {
        title: 'Safe, Residue-Free Nutrition',
        description: '100% natural, non-toxic feeding ideal for home kitchen gardens, edible herbs, and terrace greens.',
      },
      {
        title: 'Continuous Flowering in Pots',
        description: 'Gentle foliar spritz and drench promoting prolific fruit set on potted tomatoes, chillies, and flowering ornamentals.',
      },
    ],
    timing: 'Potting mix & fortnightly feeding',
    imageSrc: '/assets/images/crop-solutions/terrace-garden.jpg',
    imageAlt: 'Thriving rooftop terrace garden with potted organic vegetables, herbs, and lush grow bags',
  },
];

/**
 * CROP SOLUTIONS PAGE — SECTION 02 & SECTION 03: THE CROP ATLAS & SELECTED EXPERIENCE
 *
 * Interactive Crop Discovery and Coordinated Detail Experience:
 * - Horizontally flowing editorial gallery displaying the 10 core crop systems
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
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.05,
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

  // Coordinated detail reveal animation on crop selection change
  const runDetailTransition = useCallback(() => {
    if (isReducedMotion()) return;
    if (!detailContentRef.current || !detailImageRef.current) return;

    const content = detailContentRef.current;
    const imgWrap = detailImageRef.current;

    const title = content.querySelector('.crop-detail-title');
    const headline = content.querySelector('.crop-detail-headline');
    const desc = content.querySelector('.crop-detail-desc');
    const meta = content.querySelector('.crop-detail-meta');
    const themeItems = content.querySelectorAll('.crop-detail-theme-item');

    gsap.killTweensOf([title, headline, desc, meta, themeItems, imgWrap]);

    // Initial state setup
    gsap.set([title, headline, desc, meta], { opacity: 0, y: 16 });
    gsap.set(themeItems, { opacity: 0, x: -12 });
    gsap.set(imgWrap, { opacity: 0.7, scale: 0.985 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(imgWrap, { opacity: 1, scale: 1, duration: 0.5 })
      .to(meta, { opacity: 1, y: 0, duration: 0.4 }, '-=0.35')
      .to(title, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
      .to(headline, { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
      .to(desc, { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
      .to(
        themeItems,
        {
          opacity: 1,
          x: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.25'
      );
  }, []);

  // Handle user crop card selection with optional gentle auto-scroll
  const handleSelectCrop = useCallback(
    (idx: number) => {
      setSelectedIndex(idx);
      // Small timeout to allow state rendering before animation fires
      setTimeout(() => {
        runDetailTransition();
      }, 20);

      // Smooth scroll toward the detail panel if user is on mobile or far away
      if (typeof window !== 'undefined' && detailPanelRef.current) {
        const rect = detailPanelRef.current.getBoundingClientRect();
        // If the top of the detail panel is below the screen fold or above viewport
        if (rect.top > window.innerHeight * 0.7 || rect.top < 0) {
          const navbarOffset = 100;
          const targetY = window.scrollY + rect.top - navbarOffset;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth',
          });
        }
      }
    },
    [runDetailTransition]
  );

  return (
    <section
      ref={sectionRef}
      id="crop-atlas"
      data-nav-theme="light"
      aria-labelledby="crop-atlas-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      <Container size="default">
        {/* =====================================================================
            SECTION HEADER & EDITORIAL FRAMING
            ===================================================================== */}
        <div className="crop-atlas-header max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-medium" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-forest-medium">
              02 / THE CROP ATLAS
            </span>
          </div>

          <h2
            id="crop-atlas-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            One System.
            <br />
            <span className="italic text-forest-medium">10 Core Crop Solutions.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
            Explore South India&apos;s signature plantation crops, fruit orchards, open-field vegetables, cereals, and terrace gardens. Select any crop below to view verified agronomic management protocols.
          </p>
        </div>

        {/* =====================================================================
            EDITORIAL CROP ATLAS GALLERY (Grid of 10 Core Crops)
            Desktop: 2 rows of 5 architectural cards
            Mobile / Tablet: 2 or 3 column clean grid
            ===================================================================== */}
        <div className="crop-atlas-gallery mb-16 sm:mb-20">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-forest-deep/15">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/60">
              CROP CATALOGUE (01 — 10)
            </span>
            <span className="font-mono text-xs text-forest-deep/50 hidden sm:inline">
              SELECT TO INSPECT SPECIFIC NEEDS
            </span>
          </div>

          {/* Desktop & Tablet Gallery Grid: 2 rows of 5 on lg */}
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
