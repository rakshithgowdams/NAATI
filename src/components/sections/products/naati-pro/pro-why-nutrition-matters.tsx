'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface ProWhyNutritionMattersProps {
  className?: string;
}

const CONCEPTS = [
  {
    number: '01',
    title: 'NUTRITION',
    description: 'Supporting balanced nutritional needs.',
    detail: 'Balanced mineral availability supports essential cellular metabolic activity during periods of rapid foliage formation.',
  },
  {
    number: '02',
    title: 'VIGOUR',
    description: 'Understanding the conditions that support active plant growth.',
    detail: 'A responsive crop can better handle environmental fluctuations when its internal nutrient balance is maintained.',
  },
  {
    number: '03',
    title: 'DEVELOPMENT',
    description: 'Supporting the crop through its growing journey.',
    detail: 'From early vegetative expansion to mature flowering, each stage requires tailored nutritional attention.',
  },
];

/**
 * NAATI PRO PRODUCT PAGE — SECTION 02: WHY PLANT NUTRITION MATTERS
 *
 * Full-Bleed Split-Screen Composition:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Left 50%: Full-bleed macro photograph of healthy green leaf with backlit leaf veins touching the left edge
 * - Right 50%: Large editorial heading, concise explanation, and 3 vertically stacked concepts with fine separator lines
 * - Smooth vertical clip reveal, internal parallax, and staggered typography
 */
export function ProWhyNutritionMatters({ className }: ProWhyNutritionMattersProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text reveal on scroll
      gsap.fromTo(
        '.pro-why-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Left image clip reveal
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(8% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Subtle internal image parallax
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }

      // 4. Hairline separator draws
      linesRef.current.forEach((line) => {
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.85,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-plant-nutrition"
      data-nav-theme="light"
      aria-labelledby="why-nutrition-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep overflow-hidden border-t border-forest-deep/10',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[90vh]">
        {/* =====================================================================
            LEFT SIDE: FULL-BLEED MACRO LEAF PHOTOGRAPH (Col 1 to 6)
            Reaches left viewport edge completely with zero margin.
            ===================================================================== */}
        <div className="lg:col-span-6 relative order-2 lg:order-1 min-h-[460px] sm:min-h-[580px] lg:min-h-full overflow-hidden bg-forest-deep/5">
          <div
            ref={visualWrapperRef}
            className="relative w-full h-full min-h-[460px] sm:min-h-[580px] lg:min-h-full overflow-hidden"
          >
            <div
              ref={parallaxImgRef}
              className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
            >
              <Image
                src="/assets/images/products/naati-pro/leaf-macro.jpg"
                alt="Macro photograph of translucent backlit green plant leaf showing intricate natural cellular veins"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover object-center"
              />
              {/* Subtle natural tonal overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cream/20 hidden lg:block"
                aria-hidden="true"
              />
            </div>

            {/* Editorial Corner Badge */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 bg-forest-deep/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-cream/20">
              <span className="font-mono text-xs tracking-wider uppercase text-harvest font-semibold">
                MACRO BOTANICAL VEIN STRUCTURE
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT SIDE: EDITORIAL CONTENT & 3 CONCEPTS (Col 7 to 12)
            ===================================================================== */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            {/* Editorial Eyebrow */}
            <div className="pro-why-reveal flex items-center gap-3 mb-5">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
                02 / THE GROWTH ABOVE
              </span>
              <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            </div>

            {/* Section Headline */}
            <h2
              id="why-nutrition-heading"
              className="pro-why-reveal font-display font-medium text-[clamp(2.1rem,3.8vw,3.4rem)] leading-[1.12] tracking-[-0.03em] text-forest-deep mb-6 [text-wrap:balance]"
            >
              Healthy growth needs more than good soil.
            </h2>

            {/* Core Premise */}
            <p className="pro-why-reveal font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed mb-10 [text-wrap:pretty]">
              Healthy soil provides the foundation. Plant nutrition must also respond to the needs of the developing crop.
            </p>

            {/* Three Vertically Stacked Concepts */}
            <div className="space-y-6 sm:space-y-8">
              {CONCEPTS.map((concept, idx) => (
                <div key={concept.number} className="group">
                  {/* Fine Separator Line */}
                  <div
                    ref={(el) => {
                      linesRef.current[idx] = el;
                    }}
                    className="w-full h-px bg-forest-deep/15 mb-6"
                    aria-hidden="true"
                  />

                  <div className="pro-why-reveal grid grid-cols-12 gap-4 items-baseline">
                    {/* Index */}
                    <div className="col-span-2 sm:col-span-2">
                      <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-forest-medium/70">
                        {concept.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="col-span-10 sm:col-span-10">
                      <h3 className="font-mono text-xs sm:text-sm font-bold tracking-[0.16em] uppercase text-forest-deep mb-2">
                        {concept.title}
                      </h3>
                      <p className="font-sans text-base sm:text-lg font-medium text-forest-deep/90 leading-snug mb-1">
                        &ldquo;{concept.description}&rdquo;
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-forest-deep/65 leading-relaxed">
                        {concept.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bottom Hairline */}
              <div
                ref={(el) => {
                  linesRef.current[CONCEPTS.length] = el;
                }}
                className="w-full h-px bg-forest-deep/15 pt-2"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
