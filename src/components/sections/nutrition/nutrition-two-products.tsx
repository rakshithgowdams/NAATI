'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface NutritionTwoProductsProps {
  className?: string;
}

/**
 * THE NAATI NUTRITION SYSTEM — SECTION 02: TWO PRODUCTS. TWO PURPOSES.
 *
 * Minimal Editorial Two-Column Product Presentation:
 * - Continuous warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Section header: Eyebrow ("01 / MEET THE SYSTEM") + Fraunces Headline ("Two distinct roles. One shared purpose.")
 * - Two balanced editorial columns separated by an architectural hairline divider
 * - Left: Naati Plus (Soil Nutrition / Build the Soil)
 * - Right: Naati Pro (Plant Nutrition / Feed the Plant)
 * - Authentic approved packaging imagery with refined hover micro-interactions
 * - Accessible routing to /products/naati-plus and /products/naati-pro
 */
export function NutritionTwoProducts({ className }: NutritionTwoProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Product columns staggered reveal
      gsap.fromTo(
        '.two-prod-col',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.two-prod-grid',
            start: 'top 85%',
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
      id="meet-the-system"
      data-nav-theme="light"
      aria-labelledby="two-products-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Section Boundary */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* =======================================================================
            SECTION HEADER
            ======================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-18 lg:mb-20">
          {/* Monospace Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              01 / MEET THE SYSTEM
            </span>
          </div>

          {/* Fraunces Display Headline */}
          <h2
            id="two-products-heading"
            className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-forest">
              Two distinct roles.
            </span>
            <span className="block font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              One shared purpose.
            </span>
          </h2>
        </div>

        {/* =======================================================================
            TWO-COLUMN OPEN EDITORIAL LAYOUT
            Subtle vertical divider without heavy card backgrounds
            ======================================================================= */}
        <div className="two-prod-grid grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-cream-border/80 border-y border-cream-border/80">
          {/* ===================================================================
              PRODUCT 01: NAATI PLUS (SOIL NUTRITION)
              =================================================================== */}
          <div className="two-prod-col flex flex-col justify-between py-10 sm:py-12 lg:py-14 lg:pr-12 xl:pr-16 group">
            {/* Top Label & Identity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-earth">
                  01 / SOIL NUTRITION
                </span>
                <span className="font-mono text-[11px] tracking-wider text-text-muted uppercase">
                  ENRICHED VERMICOMPOST
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-forest font-medium tracking-[-0.02em] mb-1">
                Naati Plus
              </h3>

              <p className="font-serif italic text-lg sm:text-xl text-olive mb-6">
                Build the Soil.
              </p>
            </div>

            {/* Approved Product Visual with Refined Hover Float */}
            <div className="relative my-6 sm:my-8 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-cream-deep/50 border border-cream-border/60 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 shadow-warm-xs group-hover:shadow-warm-md">
              <Image
                src="/assets/images/products/naati-plus-showcase.jpg"
                alt="Naati Plus Enriched Vermicompost official packaging pouch with rich moist vermicompost spread across the base"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-forest/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Description & Interactive CTA */}
            <div>
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mb-6 [text-wrap:pretty]">
                Enriched vermicompost designed to support organic matter, soil structure and the
                root-zone environment.
              </p>

              <Link
                href="/products/naati-plus"
                className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-forest group-hover:text-olive transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded py-1"
                aria-label="Explore Naati Plus product details"
              >
                <span>Explore Naati Plus</span>
                <span className="w-6 h-6 rounded-full bg-cream-light border border-cream-border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 shadow-warm-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 text-forest group-hover:text-olive transition-colors" />
                </span>
              </Link>
            </div>
          </div>

          {/* ===================================================================
              PRODUCT 02: NAATI PRO (PLANT NUTRITION)
              =================================================================== */}
          <div className="two-prod-col flex flex-col justify-between py-10 sm:py-12 lg:py-14 lg:pl-12 xl:pl-16 group">
            {/* Top Label & Identity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-olive">
                  02 / PLANT NUTRITION
                </span>
                <span className="font-mono text-[11px] tracking-wider text-text-muted uppercase">
                  BIO-ACTIVATOR
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-forest font-medium tracking-[-0.02em] mb-1">
                Naati Pro
              </h3>

              <p className="font-serif italic text-lg sm:text-xl text-olive mb-6">
                Feed the Plant.
              </p>
            </div>

            {/* Approved Product Visual with Refined Hover Float */}
            <div className="relative my-6 sm:my-8 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-cream-deep/50 border border-cream-border/60 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 shadow-warm-xs group-hover:shadow-warm-md">
              <Image
                src="/assets/images/products/naati-pro-showcase.jpg"
                alt="Naati Pro Bio-Activator official cardboard box package with two solid circular product blocks displayed beside it"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-forest/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Description & Interactive CTA */}
            <div>
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mb-6 [text-wrap:pretty]">
                A plant nutrition bio-activator designed to complement the soil-first approach.
              </p>

              <Link
                href="/products/naati-pro"
                className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase text-forest group-hover:text-olive transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded py-1"
                aria-label="Explore Naati Pro product details"
              >
                <span>Explore Naati Pro</span>
                <span className="w-6 h-6 rounded-full bg-cream-light border border-cream-border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 shadow-warm-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 text-forest group-hover:text-olive transition-colors" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
