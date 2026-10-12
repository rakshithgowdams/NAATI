'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProIntroducingProps {
  className?: string;
}

/**
 * NAATI PRO PRODUCT PAGE — SECTION 03: INTRODUCING NAATI PRO
 *
 * Storytelling Product Showcase:
 * - Background: Deep forest green (#14240E) with data-nav-theme="dark"
 * - Eyebrow: "03 / THE PRODUCT"
 * - Headline: "Designed for the growing plant."
 * - Asymmetrical composition with the approved Naati Pro box visual
 * - Opposite the package: Product Identity (Naati Pro, Plant Nutrition, Bio-Activator),
 *   accurate editorial description, and restrained identity strip
 * - GSAP: subtle scale from 0.94 to 1, sequential label reveals, no excessive pinning
 */
export function ProIntroducing({ className }: ProIntroducingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const packageContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text elements enter from below
      gsap.fromTo(
        '.pro-intro-reveal',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Product visual subtle scale from 0.94 to 1
      if (packageContainerRef.current) {
        gsap.fromTo(
          packageContainerRef.current,
          { scale: 0.94, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      }

      // 3. Identity strip items reveal sequentially
      gsap.fromTo(
        '.pro-intro-pill',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.pro-intro-strip',
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
      id="introducing-naati-pro"
      data-nav-theme="dark"
      aria-labelledby="intro-pro-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-cream/10',
        className
      )}
    >
      {/* Subtle organic light accent */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ===================================================================
              LEFT: APPROVED NAATI PRO PACKAGE VISUAL (Col 1 to 6)
              Prominently displayed, crisp, naturally integrated
              =================================================================== */}
          <div className="lg:col-span-6 relative flex justify-center items-center order-2 lg:order-1">
            <div
              ref={packageContainerRef}
              className="relative w-full max-w-[460px] aspect-square flex items-center justify-center will-change-transform"
            >
              {/* Soft grounding shadow */}
              <div
                className="absolute bottom-4 w-4/5 h-10 bg-black/60 blur-2xl rounded-full"
                aria-hidden="true"
              />

              {/* Exact Approved Naati Pro Box Packaging */}
              <Image
                src="/assets/images/products/naati-pro-pack.png"
                alt="Approved Naati Pro Plant Nutrition Bio-Activator packaging box"
                width={800}
                height={800}
                quality={92}
                className="relative z-10 w-full h-auto object-contain select-none drop-shadow-[0_24px_45px_rgba(0,0,0,0.65)]"
              />

              {/* Verified Product Spec Watermark Tag */}
              <div className="absolute -bottom-2 right-4 z-20 bg-forest-dark/90 border border-cream/20 backdrop-blur-md px-3.5 py-1.5 rounded-full hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-cream/90 font-medium">
                  SOLID BLOCKS FORMAT
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT: EDITORIAL STORYTELLING & IDENTITY (Col 7 to 12)
              =================================================================== */}
          <div
            ref={textContentRef}
            className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2 max-w-xl lg:max-w-none"
          >
            {/* Eyebrow */}
            <div className="pro-intro-reveal flex items-center gap-3 mb-5">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-harvest">
                03 / THE PRODUCT
              </span>
              <span className="h-px w-8 bg-harvest/30" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h2
              id="intro-pro-heading"
              className="pro-intro-reveal font-display font-medium text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.08] tracking-[-0.03em] text-cream mb-8 [text-wrap:balance]"
            >
              Designed for the growing plant.
            </h2>

            {/* Product Meta Header */}
            <div className="pro-intro-reveal bg-cream/5 border border-cream/15 rounded-2xl p-6 sm:p-7 mb-8 backdrop-blur-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-cream/10 pb-4 mb-4">
                <span className="font-display font-semibold text-2xl sm:text-3xl tracking-tight text-cream">
                  NAATI PRO
                </span>
                <span className="font-mono text-xs sm:text-sm font-medium uppercase tracking-wider text-harvest">
                  Category: Plant Nutrition
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-wider text-cream/60">
                  Classification:
                </span>
                <span className="font-sans text-sm sm:text-base font-semibold text-cream">
                  Bio-Activator
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="pro-intro-reveal font-sans text-base sm:text-lg text-cream/85 leading-relaxed mb-8 [text-wrap:pretty]">
              Naati Pro forms the plant-nutrition component of the Naati Organics approach, complementing soil-focused nutrition with attention to crop development.
            </p>

            <p className="pro-intro-reveal font-sans text-sm sm:text-base text-cream/70 leading-relaxed mb-10">
              Delivered in solid product blocks inside the approved protective carton, Naati Pro integrates into organic farming protocols without artificial acceleration or non-organic chemical additives.
            </p>

            {/* Restrained Editorial Product Identity Strip */}
            <div className="pro-intro-strip pro-intro-reveal flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="pro-intro-pill font-mono text-xs font-semibold tracking-wider uppercase text-cream/90 bg-cream/10 border border-cream/20 px-3.5 py-1.5 rounded-full">
                PLANT NUTRITION
              </span>
              <span className="text-cream/30 text-xs hidden sm:inline" aria-hidden="true">
                /
              </span>
              <span className="pro-intro-pill font-mono text-xs font-semibold tracking-wider uppercase text-harvest bg-harvest/10 border border-harvest/30 px-3.5 py-1.5 rounded-full">
                BIO-ACTIVATOR
              </span>
              <span className="text-cream/30 text-xs hidden sm:inline" aria-hidden="true">
                /
              </span>
              <span className="pro-intro-pill font-mono text-xs font-semibold tracking-wider uppercase text-cream/80 bg-cream/10 border border-cream/20 px-3.5 py-1.5 rounded-full">
                COMPLETE NAATI SYSTEM
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
