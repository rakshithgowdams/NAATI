'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface CropNutritionSystemProps {
  className?: string;
}

export interface ProductGalleryItem {
  id: 'naati-plus' | 'naati-pro';
  identifier: string;
  name: string;
  description: string;
  supporting: string;
  imageSrc: string;
  imageAlt: string;
  route: string;
}

/**
 * Reusable Product Gallery Data
 * Canonical routes point to dedicated product detail pages.
 * High-resolution isolated transparent packshots preserve 100% of the approved packaging,
 * vermicompost pile, and circular bio-activator blocks.
 */
export const PRODUCTS: ProductGalleryItem[] = [
  {
    id: 'naati-plus',
    identifier: '01 / SOIL NUTRITION',
    name: 'Naati Plus',
    description: 'Enriched Vermicompost',
    supporting: 'Build the Soil.',
    imageSrc: '/assets/images/products/naati-plus-isolated.webp',
    imageAlt:
      'Naati Plus Enriched Vermicompost official packaging pouch with rich moist vermicompost spread across the base',
    route: '/products/naati-plus',
  },
  {
    id: 'naati-pro',
    identifier: '02 / PLANT NUTRITION',
    name: 'Naati Pro',
    description: 'Bio-Activator',
    supporting: 'Feed the Plant.',
    imageSrc: '/assets/images/products/naati-pro-isolated.webp',
    imageAlt:
      'Naati Pro Bio-Activator official cardboard box package with two solid circular product blocks displayed beside it',
    route: '/products/naati-pro',
  },
];

/**
 * HOMEPAGE SECTION 05 — THE COMPLETE CROP NUTRITION SYSTEM
 *
 * "Two Products. One Living System." — Premium Dark Botanical Product Showcase:
 * - Deep forest-green background (#142819) with data-nav-theme="dark" for transparent adaptive navbar
 * - Crisp cream typography (#F5F1E7), muted olive (#B8C6AF), and earthy-gold accents (#D4C38C)
 * - Open 50/50 editorial desktop composition with fine central hairline divider
 * - Photographic staging with subtle ambient botanical glow and elliptical base drop shadows
 * - Zero white rectangular cards, zero mix-blend hacks, preserving 100% approved product packaging
 * - Multi-phase GSAP ScrollTrigger animation sequence (Reveal -> Connect -> Settle)
 * - Mobile-first vertical stack with lightweight, independent viewport-triggered animations
 */
export function CropNutritionSystem({ className }: CropNutritionSystemProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const plusColRef = useRef<HTMLDivElement>(null);
  const proColRef = useRef<HTMLDivElement>(null);
  const connectionLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =======================================================================
      // DESKTOP (>= 768px): Coordinated Master Sequence (Reveal -> Connect -> Settle)
      // =======================================================================
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        // PHASE 01 — SECTION INTRODUCTION
        tl.fromTo(
          '.sys-eyebrow-item',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        )
          .fromTo(
            '.sys-head-mask-1',
            { y: '110%' },
            { y: '0%', duration: 0.7, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
            '.sys-head-mask-2',
            { y: '110%' },
            { y: '0%', duration: 0.7, ease: 'power3.out' },
            '-=0.55'
          );

        // PHASE 02 — NAATI PLUS REVEAL
        tl.fromTo(
          '.sys-plus-img-stage',
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
          .fromTo(
            '.sys-plus-label',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.6'
          )
          .fromTo(
            '.sys-plus-name',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
            '-=0.5'
          )
          .fromTo(
            ['.sys-plus-desc', '.sys-plus-supporting'],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            '.sys-plus-cta',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.35'
          );

        // PHASE 03 — NAATI PRO REVEAL (Shortly after Naati Plus)
        tl.fromTo(
          '.sys-pro-img-stage',
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
          .fromTo(
            '.sys-pro-label',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.6'
          )
          .fromTo(
            '.sys-pro-name',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
            '-=0.5'
          )
          .fromTo(
            ['.sys-pro-desc', '.sys-pro-supporting'],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo(
            '.sys-pro-cta',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.35'
          );

        // PHASE 04 — CONNECTION (Subtle progressing line & understated editorial text)
        tl.fromTo(
          connectionLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
          '-=0.2'
        ).fromTo(
          '.sys-connection-text',
          { opacity: 0, letterSpacing: '0.14em' },
          { opacity: 1, letterSpacing: '0.24em', duration: 0.6, ease: 'power2.out' },
          '-=0.5'
        );

        // PHASE 05 — SETTLE (Elements remain completely stable and interactive)
      });

      // =======================================================================
      // MOBILE (< 768px): Independent Viewport Triggers (Touch & Fast-Swipe Resilient)
      // =======================================================================
      mm.add('(max-width: 767px)', () => {
        // Heading Reveal
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
          .fromTo(
            '.sys-eyebrow-item',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
          .fromTo(
            '.sys-head-mask-1',
            { y: '110%' },
            { y: '0%', duration: 0.6, ease: 'power3.out' },
            '-=0.3'
          )
          .fromTo(
            '.sys-head-mask-2',
            { y: '110%' },
            { y: '0%', duration: 0.6, ease: 'power3.out' },
            '-=0.4'
          );

        // Product 1 (Naati Plus) Reveal
        if (plusColRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: plusColRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
            .fromTo(
              '.sys-plus-label',
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            )
            .fromTo(
              '.sys-plus-img-stage',
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
              '-=0.2'
            )
            .fromTo(
              ['.sys-plus-name', '.sys-plus-desc', '.sys-plus-supporting', '.sys-plus-cta'],
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
              '-=0.4'
            );
        }

        // Product 2 (Naati Pro) Reveal
        if (proColRef.current) {
          gsap.timeline({
            scrollTrigger: {
              trigger: proColRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
            .fromTo(
              '.sys-pro-label',
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            )
            .fromTo(
              '.sys-pro-img-stage',
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
              '-=0.2'
            )
            .fromTo(
              ['.sys-pro-name', '.sys-pro-desc', '.sys-pro-supporting', '.sys-pro-cta'],
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
              '-=0.4'
            );
        }

        // Connection Brand Statement Reveal
        gsap.timeline({
          scrollTrigger: {
            trigger: '.sys-connection-wrapper',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })
          .fromTo(
            connectionLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }
          )
          .fromTo(
            '.sys-connection-text',
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          );
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="crop-nutrition-system"
      data-nav-theme="dark"
      aria-labelledby="crop-nutrition-heading"
      className={cn(
        'relative w-full bg-[#142819] text-[#F5F1E7] overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28 selection:bg-[#D4C38C] selection:text-[#142819]',
        className
      )}
    >
      {/* Subtle Atmospheric Botanical Glow (Organic depth without heavy textures) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background:
            'radial-gradient(ellipse 75% 50% at 50% 25%, rgba(45, 78, 33, 0.4) 0%, rgba(20, 40, 25, 0) 75%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Hairline Boundary Dividers Transitioning into and out of Section 05 */}
      <div className="absolute top-0 inset-x-0 h-px bg-[rgba(245,241,231,0.14)] z-10" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-[rgba(245,241,231,0.14)] z-10" />

      <Container size="default" className="relative z-10">
        {/* =======================================================================
            TOP: CENTERED EDITORIAL HEADING
            Minimal spacing, Fraunces headline, masked typography reveals
            ======================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="sys-eyebrow-item inline-flex items-center gap-2 mb-3 sm:mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4C38C]" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#D4C38C]">
              05 / THE COMPLETE CROP NUTRITION SYSTEM
            </span>
          </div>

          {/* Main Headline in Fraunces with Overflow Masking */}
          <h2
            id="crop-nutrition-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.5vw,3.85rem)] text-[#F5F1E7] leading-[1.08] tracking-[-0.03em] [text-wrap:balance]"
          >
            <span className="block overflow-hidden py-0.5">
              <span className="sys-head-mask-1 block will-change-transform">Two products.</span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="sys-head-mask-2 block italic font-normal text-[#F5F1E7] will-change-transform">
                One system.
              </span>
            </span>
          </h2>
        </div>

        {/* =======================================================================
            MIDDLE: BALANCED 50/50 TWO-PRODUCT EDITORIAL SHOWCASE
            Open composition, zero white box cards, photographic stage grounding
            ======================================================================= */}
        <div className="sys-gallery-grid grid grid-cols-1 md:grid-cols-2 items-stretch">
          {/* -------------------------------------------------------------------
              PRODUCT 01: NAATI PLUS (SOIL NUTRITION)
              ------------------------------------------------------------------- */}
          <div
            ref={plusColRef}
            className="sys-product-col flex flex-col md:border-r md:border-[rgba(245,241,231,0.16)] md:pr-8 lg:pr-12 xl:pr-16 pb-12 md:pb-0 border-b border-[rgba(245,241,231,0.16)] md:border-b-0"
          >
            <Link
              href={PRODUCTS[0].route}
              className="group relative flex flex-col justify-between items-center text-center h-full p-2 sm:p-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C38C]/50"
              aria-label={`Discover ${PRODUCTS[0].name} — ${PRODUCTS[0].description}`}
            >
              {/* TOP: Editorial Label */}
              <div className="mb-4 sm:mb-6">
                <span className="sys-plus-label font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#D4C38C]">
                  {PRODUCTS[0].identifier}
                </span>
              </div>

              {/* MIDDLE: Large Approved Product Image on Photographic Stage */}
              <div className="sys-plus-img-stage relative w-full max-w-[440px] lg:max-w-[480px] xl:max-w-[500px] aspect-square flex items-center justify-center my-auto py-2">
                {/* Ambient Botanical Glow Behind Product */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(68, 107, 54, 0.28) 0%, rgba(20, 40, 25, 0) 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Grounding Base Drop Shadow */}
                <div
                  className="absolute bottom-6 w-[70%] h-5 bg-black/45 blur-md rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  aria-hidden="true"
                />

                {/* Product Packshot */}
                <div className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] lg:h-[420px] xl:h-[440px] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] will-change-transform">
                  <Image
                    src={PRODUCTS[0].imageSrc}
                    alt={PRODUCTS[0].imageAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 500px"
                    priority={false}
                    quality={95}
                    className="object-contain select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>

              {/* BOTTOM: Product Identity & Discovery CTA */}
              <div className="flex flex-col items-center mt-4 sm:mt-6">
                <h3 className="sys-plus-name font-display font-medium text-3xl sm:text-4xl lg:text-[2.65rem] text-[#F5F1E7] tracking-[-0.03em] mb-1 leading-tight">
                  {PRODUCTS[0].name}
                </h3>

                <p className="sys-plus-desc font-sans text-sm sm:text-base font-medium text-[#B8C6AF] mb-1">
                  {PRODUCTS[0].description}
                </p>

                <p className="sys-plus-supporting font-serif italic text-xs sm:text-sm text-[#D4C38C] mb-4 sm:mb-5">
                  {PRODUCTS[0].supporting}
                </p>

                <div className="sys-plus-cta inline-flex items-center gap-1.5 font-sans text-sm sm:text-base font-semibold text-[#F5F1E7] tracking-wide group-hover:text-[#D4C38C] transition-colors duration-300">
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover:after:w-full after:h-px after:bg-[#D4C38C] after:transition-all after:duration-300">
                    Discover Product
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#F5F1E7] group-hover:text-[#D4C38C] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </div>

          {/* -------------------------------------------------------------------
              PRODUCT 02: NAATI PRO (PLANT NUTRITION)
              ------------------------------------------------------------------- */}
          <div
            ref={proColRef}
            className="sys-product-col flex flex-col md:pl-8 lg:pl-12 xl:pl-16 pt-12 md:pt-0"
          >
            <Link
              href={PRODUCTS[1].route}
              className="group relative flex flex-col justify-between items-center text-center h-full p-2 sm:p-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4C38C]/50"
              aria-label={`Discover ${PRODUCTS[1].name} — ${PRODUCTS[1].description}`}
            >
              {/* TOP: Editorial Label */}
              <div className="mb-4 sm:mb-6">
                <span className="sys-pro-label font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#D4C38C]">
                  {PRODUCTS[1].identifier}
                </span>
              </div>

              {/* MIDDLE: Large Approved Product Image on Photographic Stage */}
              <div className="sys-pro-img-stage relative w-full max-w-[440px] lg:max-w-[480px] xl:max-w-[500px] aspect-square flex items-center justify-center my-auto py-2">
                {/* Ambient Botanical Glow Behind Product */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-90"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(68, 107, 54, 0.28) 0%, rgba(20, 40, 25, 0) 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Grounding Base Drop Shadow */}
                <div
                  className="absolute bottom-6 w-[70%] h-5 bg-black/45 blur-md rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  aria-hidden="true"
                />

                {/* Product Packshot */}
                <div className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] lg:h-[420px] xl:h-[440px] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] will-change-transform">
                  <Image
                    src={PRODUCTS[1].imageSrc}
                    alt={PRODUCTS[1].imageAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 500px"
                    priority={false}
                    quality={95}
                    className="object-contain select-none pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>

              {/* BOTTOM: Product Identity & Discovery CTA */}
              <div className="flex flex-col items-center mt-4 sm:mt-6">
                <h3 className="sys-pro-name font-display font-medium text-3xl sm:text-4xl lg:text-[2.65rem] text-[#F5F1E7] tracking-[-0.03em] mb-1 leading-tight">
                  {PRODUCTS[1].name}
                </h3>

                <p className="sys-pro-desc font-sans text-sm sm:text-base font-medium text-[#B8C6AF] mb-1">
                  {PRODUCTS[1].description}
                </p>

                <p className="sys-pro-supporting font-serif italic text-xs sm:text-sm text-[#D4C38C] mb-4 sm:mb-5">
                  {PRODUCTS[1].supporting}
                </p>

                <div className="sys-pro-cta inline-flex items-center gap-1.5 font-sans text-sm sm:text-base font-semibold text-[#F5F1E7] tracking-wide group-hover:text-[#D4C38C] transition-colors duration-300">
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover:after:w-full after:h-px after:bg-[#D4C38C] after:transition-all after:duration-300">
                    Discover Product
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#F5F1E7] group-hover:text-[#D4C38C] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* =======================================================================
            BOTTOM: PHASE 04 CONNECTION BRIDGE
            Understated line progressing from Naati Plus to Naati Pro
            ======================================================================= */}
        <div className="sys-connection-wrapper max-w-xl mx-auto mt-12 sm:mt-14 pt-8 text-center relative">
          {/* Animated Connecting Line */}
          <div className="relative h-px w-full max-w-sm sm:max-w-md mx-auto mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-[rgba(245,241,231,0.12)]" />
            <div
              ref={connectionLineRef}
              className="absolute inset-0 bg-gradient-to-r from-[#D4C38C]/30 via-[#D4C38C] to-[#D4C38C]/30 origin-left will-change-transform"
            />
          </div>

          {/* Understated Editorial Statement */}
          <p className="sys-connection-text font-mono text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#D4C38C] uppercase">
            BUILD THE SOIL <span className="text-[#F5F1E7]/40 mx-2">→</span> FEED THE PLANT
          </p>
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias for existing naming conventions
export const Section05Products = CropNutritionSystem;
