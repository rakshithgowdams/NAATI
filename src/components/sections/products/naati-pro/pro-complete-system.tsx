'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProCompleteSystemProps {
  className?: string;
}

/**
 * NAATI PRO PRODUCT PAGE — SECTION 05: HOW NAATI PRO FITS INTO THE SYSTEM
 *
 * Two-Product Complementary Editorial Showcase:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "05 / ONE COMPLETE APPROACH"
 * - Headline: "Strong foundations. Healthy development."
 * - Left: Naati Plus ("BUILD THE SOIL" · "SOIL NUTRITION")
 * - Center: Connecting animated SVG relationship curve
 * - Right: Naati Pro ("FEED THE PLANT" · "PLANT NUTRITION")
 * - Supporting sentence & dual navigational CTAs (/products/naati-plus & /nutrition-system)
 * - Restrained, compact, and high-end editorial treatment without oversized cards
 */
export function ProCompleteSystem({ className }: ProCompleteSystemProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorLineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        '.pro-sys-header',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
        .fromTo(
          '.pro-sys-left',
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.3'
        );

      if (connectorLineRef.current) {
        tl.fromTo(
          connectorLineRef.current,
          { strokeDashoffset: 300, strokeDasharray: 300 },
          { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' },
          '-=0.4'
        );
      }

      tl.fromTo(
        '.pro-sys-right',
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
        '-=0.5'
      ).fromTo(
        '.pro-sys-footer',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="complete-system"
      data-nav-theme="light"
      aria-labelledby="pro-system-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* Header */}
        <div className="pro-sys-header text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              05 / ONE COMPLETE APPROACH
            </span>
          </div>

          <h2
            id="pro-system-heading"
            className="font-display font-medium text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.08] tracking-[-0.035em] text-forest-deep mb-6 [text-wrap:balance]"
          >
            Strong foundations.
            <br />
            <span className="italic text-forest-medium">Healthy development.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-forest-deep/80 leading-relaxed max-w-2xl mx-auto [text-wrap:pretty]">
            Naati Plus focuses on the soil foundation, while Naati Pro complements it through plant nutrition.
          </p>
        </div>

        {/* Two-Product Showcase with Center Connection */}
        <div className="relative max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* LEFT PRODUCT: NAATI PLUS (Col 1 to 5) */}
            <div className="pro-sys-left md:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/70 border border-forest-deep/10 shadow-xs hover:shadow-warm-sm transition-shadow duration-300">
              <div className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-forest-medium mb-1">
                BUILD THE SOIL
              </div>
              <div className="font-mono text-xs font-semibold tracking-wider uppercase text-forest-deep/60 mb-6">
                SOIL NUTRITION
              </div>

              {/* Product Pouch Packaging Visual */}
              <div className="relative w-44 sm:w-52 aspect-square flex items-center justify-center mb-6">
                <Image
                  src="/assets/images/products/naati-plus-pack.png"
                  alt="Naati Plus Soil Nutrition standing pouch"
                  width={340}
                  height={340}
                  quality={90}
                  className="object-contain w-full h-full drop-shadow-[0_12px_24px_rgba(20,36,14,0.18)]"
                />
              </div>

              <h3 className="font-display font-semibold text-xl text-forest-deep mb-1">
                Naati Plus
              </h3>
              <p className="font-sans text-xs sm:text-sm text-forest-deep/70 mb-5">
                Enriched Vermicompost for subterranean soil biology & organic matter.
              </p>

              <Link
                href="/products/naati-plus"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-forest-deep hover:text-forest-medium transition-colors"
              >
                <span>View Product Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* CENTER CONNECTION: SVG COMPLEMENTARY BRIDGE (Col 6 to 7) */}
            <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center">
              <div className="relative w-full flex items-center justify-center">
                <svg
                  className="w-full h-16 overflow-visible"
                  viewBox="0 0 100 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    ref={connectorLineRef}
                    d="M 5 20 C 35 5, 65 35, 95 20"
                    stroke="#2D5A27"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                  <circle cx="50" cy="20" r="4" fill="#E5A93C" />
                </svg>
              </div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-forest-deep/60 font-semibold mt-1">
                SYNERGY
              </span>
            </div>

            {/* RIGHT PRODUCT: NAATI PRO (Col 8 to 12) */}
            <div className="pro-sys-right md:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-forest-deep text-cream border border-cream/15 shadow-warm-md">
              <div className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-harvest mb-1">
                FEED THE PLANT
              </div>
              <div className="font-mono text-xs font-semibold tracking-wider uppercase text-cream/70 mb-6">
                PLANT NUTRITION
              </div>

              {/* Product Box Packaging Visual */}
              <div className="relative w-44 sm:w-52 aspect-square flex items-center justify-center mb-6">
                <Image
                  src="/assets/images/products/naati-pro-pack.png"
                  alt="Naati Pro Plant Nutrition Bio-Activator packaging box"
                  width={340}
                  height={340}
                  quality={90}
                  className="object-contain w-full h-full drop-shadow-[0_16px_30px_rgba(0,0,0,0.55)]"
                />
              </div>

              <h3 className="font-display font-semibold text-xl text-cream mb-1">
                Naati Pro
              </h3>
              <p className="font-sans text-xs sm:text-sm text-cream/75 mb-5">
                Bio-Activator solid blocks supporting healthy crop development above ground.
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-harvest">
                Current Product Detail
              </span>
            </div>
          </div>
        </div>

        {/* Supporting Summary & Action CTAs */}
        <div className="pro-sys-footer flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          <Link
            href="/products/naati-plus"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-forest-deep text-cream font-sans text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:bg-forest-medium hover:shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep min-h-[48px] w-full sm:w-auto"
          >
            <span>Explore Naati Plus</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/nutrition-system"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-forest-deep/25 text-forest-deep font-sans text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:bg-forest-deep/5 hover:border-forest-deep/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep/30 min-h-[48px] w-full sm:w-auto"
          >
            <span>View Complete System</span>
            <ArrowUpRight className="w-4 h-4 text-forest-deep/70" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
