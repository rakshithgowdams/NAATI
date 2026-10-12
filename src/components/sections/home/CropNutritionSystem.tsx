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
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  route: string;
  accentColorClass: string;
}

/**
 * Reusable Product Gallery Data
 * Canonical routes point to dedicated product detail pages.
 */
export const PRODUCTS: ProductGalleryItem[] = [
  {
    id: 'naati-plus',
    identifier: '01 / SOIL NUTRITION',
    name: 'Naati Plus',
    subtitle: 'Enriched Vermicompost',
    imageSrc: '/assets/images/products/naati-plus-showcase.jpg',
    imageAlt:
      'Naati Plus Enriched Vermicompost official packaging pouch with rich moist vermicompost spread across the base',
    route: '/products/naati-plus',
    accentColorClass: 'text-earth',
  },
  {
    id: 'naati-pro',
    identifier: '02 / PLANT NUTRITION',
    name: 'Naati Pro',
    subtitle: 'Bio-Activator',
    imageSrc: '/assets/images/products/naati-pro-showcase.jpg',
    imageAlt:
      'Naati Pro Bio-Activator official cardboard box package with two solid circular product blocks displayed beside it',
    route: '/products/naati-pro',
    accentColorClass: 'text-olive',
  },
];

/**
 * HOMEPAGE SECTION 05 — THE COMPLETE CROP NUTRITION SYSTEM
 *
 * Minimal Editorial Product Gallery:
 * - Continuous warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Compact top header: Section label + Fraunces headline ("Two products. One system.")
 * - Open, 2-column balanced gallery layout with zero bulky card boxes
 * - Seamless product photography integration preserving all packaging, circular blocks & vermicompost
 * - Subtle desktop hover lift, scale, diagonal CTA arrow shift, and fine underline reveal
 * - Accessible link semantics routing to /products/naati-plus and /products/naati-pro
 */
export function CropNutritionSystem({ className }: CropNutritionSystemProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Section Header Subtle Upward Entrance
      gsap.fromTo(
        '.sys-header-anim',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Both Products Staggered Reveal
      gsap.fromTo(
        '.sys-product-col',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.sys-gallery-grid',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="crop-nutrition-system"
      data-nav-theme="light"
      aria-labelledby="crop-nutrition-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Subtle Hairline Boundary Divider Transitioning from Section 04 */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-10" />

      <Container size="default">
        {/* =======================================================================
            TOP: COMPACT SECTION HEADER
            Small section index and Fraunces headline
            ======================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="sys-header-anim inline-flex items-center gap-2 mb-3 sm:mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              05 / THE COMPLETE CROP NUTRITION SYSTEM
            </span>
          </div>

          {/* Main Headline in Fraunces */}
          <h2
            id="crop-nutrition-heading"
            className="sys-header-anim font-display font-medium text-[clamp(2.15rem,4.2vw,3.65rem)] text-forest leading-[1.08] tracking-[-0.03em] [text-wrap:balance]"
          >
            Two products.{' '}
            <span className="italic font-normal">One system.</span>
          </h2>
        </div>

        {/* =======================================================================
            MIDDLE & BOTTOM: TWO-COLUMN OPEN EDITORIAL PRODUCT GALLERY
            Continuous #F5F1E7 background, zero bulky cards, seamless image blending
            ======================================================================= */}
        <div className="sys-gallery-grid grid grid-cols-1 md:grid-cols-2 items-stretch">
          {PRODUCTS.map((product, idx) => {
            const isFirst = idx === 0;

            return (
              <div
                key={product.id}
                className={cn(
                  'sys-product-col flex flex-col',
                  // Balanced editorial separation via fine hairline divider
                  isFirst
                    ? 'md:border-r md:border-cream-border/70 md:pr-8 lg:pr-14 xl:pr-16 pb-12 md:pb-0 border-b border-cream-border/70 md:border-b-0'
                    : 'md:pl-8 lg:pl-14 xl:pl-16 pt-12 md:pt-0'
                )}
              >
                <Link
                  href={product.route}
                  className="group relative flex flex-col justify-between items-center text-center h-full p-2 sm:p-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20"
                  aria-label={`Discover ${product.name} — ${product.subtitle}`}
                >
                  {/* Top: Product Identifier */}
                  <div className="mb-4 sm:mb-6">
                    <span
                      className={cn(
                        'font-mono text-xs font-semibold tracking-[0.2em] uppercase',
                        product.accentColorClass
                      )}
                    >
                      {product.identifier}
                    </span>
                  </div>

                  {/* Middle: Prominent Product Image with Seamless Edge Blending */}
                  <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center my-auto py-2">
                    <div
                      className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] lg:h-[420px] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02] will-change-transform"
                      style={{
                        maskImage:
                          'radial-gradient(circle at center, black 86%, transparent 98%)',
                        WebkitMaskImage:
                          'radial-gradient(circle at center, black 86%, transparent 98%)',
                      }}
                    >
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 520px"
                        priority={false}
                        quality={92}
                        className="object-contain mix-blend-multiply select-none pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Bottom: Product Name, Subtitle and Compact CTA */}
                  <div className="flex flex-col items-center mt-4 sm:mt-6">
                    <h3 className="font-display font-medium text-3xl sm:text-4xl lg:text-[2.65rem] text-forest tracking-[-0.03em] mb-1 sm:mb-1.5 leading-tight">
                      {product.name}
                    </h3>

                    <p
                      className={cn(
                        'font-sans text-sm sm:text-base font-medium mb-4 sm:mb-5',
                        product.accentColorClass
                      )}
                    >
                      {product.subtitle}
                    </p>

                    <div className="inline-flex items-center gap-1.5 font-sans text-sm sm:text-base font-semibold text-forest tracking-wide group/cta">
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover:after:w-full after:h-px after:bg-forest after:transition-all after:duration-300">
                        Discover Product
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-forest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias for existing naming conventions
export const Section05Products = CropNutritionSystem;
