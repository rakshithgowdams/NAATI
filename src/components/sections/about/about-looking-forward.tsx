'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutLookingForwardProps {
  className?: string;
}

/**
 * ABOUT NAATI ORGANICS — SECTION 05: LOOKING FORWARD
 *
 * Cinematic landscape-led section:
 * - Expansive panoramic photograph of healthy agricultural farmlands in Karnataka
 * - Crisp, readable editorial text layout
 * - Subtle scroll-linked internal parallax on the landscape photograph
 * - Progressive headline reveal leading smoothly into the Final CTA (Section 06)
 */
export function AboutLookingForward({ className }: AboutLookingForwardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text entrance
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.forward-content-trigger',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      contentTl
        .fromTo(
          '.forward-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.forward-title-line',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.forward-paragraph',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.forward-signature',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );

      // 2. Parallax on landscape image
      if (parallaxImgRef.current && visualWrapperRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: visualWrapperRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="looking-forward"
      data-nav-theme="light"
      aria-labelledby="looking-forward-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70" />

      <Container size="default">
        {/* =======================================================================
            1. TOP: EDITORIAL NARRATIVE BLOCK
            ======================================================================= */}
        <div className="forward-content-trigger grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 sm:mb-16 md:mb-20">
          {/* Main Headline */}
          <div className="lg:col-span-7">
            <div className="forward-eyebrow inline-flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                04 / LOOKING FORWARD
              </span>
            </div>

            <h2
              id="looking-forward-heading"
              className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance]"
            >
              <span className="forward-title-line block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-forest">
                A healthier future
              </span>
              <span className="forward-title-line block font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
                starts from the ground up.
              </span>
            </h2>
          </div>

          {/* Supporting Statement & Signature */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="forward-paragraph font-sans text-base sm:text-lg text-text-secondary leading-relaxed mb-5 sm:mb-6 [text-wrap:pretty]">
              We see soil care and crop nutrition as parts of the same conversation. Through our
              products and educational resources, we aim to support more thoughtful decisions
              about how we grow.
            </p>

            <div className="forward-signature pt-4 border-t border-cream-border/80 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-olive" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase text-forest">
                NAATI ORGANICS — FIX THE SOIL. FEED THE PLANT.
              </span>
            </div>
          </div>
        </div>

        {/* =======================================================================
            2. EXPANSIVE CINEMATIC LANDSCAPE PHOTOGRAPH
            Karnataka South Indian agricultural panorama with soft golden hour light
            ======================================================================= */}
        <div
          ref={visualWrapperRef}
          className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-lg will-change-transform"
        >
          <div
            ref={parallaxImgRef}
            className="absolute inset-[-8%] w-[116%] h-[116%] will-change-transform"
          >
            <Image
              src="/assets/images/about/agricultural-landscape.jpg"
              alt="Expansive panoramic photograph of flourishing organic agricultural fields in rural Karnataka South India under golden hour light"
              fill
              quality={90}
              sizes="(max-width: 1280px) 100vw, 1600px"
              className="object-cover object-center select-none"
            />
          </div>

          {/* Subtle Atmospheric Gradient for Corner Contrast */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-forest-deep/20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom Left Photographic Identification Tag */}
          <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-7 z-10 text-cream/90 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase drop-shadow-sm flex items-center gap-2 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
            <span>AGRICULTURAL HORIZONS · KARNATAKA, INDIA</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
