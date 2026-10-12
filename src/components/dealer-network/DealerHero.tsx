'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface DealerHeroProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 01: IMMERSIVE PARTNERSHIP HERO
 *
 * Route: /dealer-network
 * Eyebrow: PARTNER WITH NAATI ORGANICS
 * Main Headline: "Grow with Naati."
 * Secondary Statement: "Build something better, together."
 * Supporting: "Join the conversation around healthier soils, informed farming and a thoughtful approach to crop nutrition."
 * CTAs: BECOME A PARTNER ↗ / EXPLORE OUR SYSTEM →
 *
 * Asymmetric Split (Desktop 55/45 or 50/50):
 * - Left: Deep forest-green (#14240E, data-nav-theme="dark"), Fraunces ivory serif display, clean actions
 * - Right: Full-bleed documentary agricultural photography extending to viewport outer edge (zero margin, no rounded frame)
 * - Motion: Label -> Headline lines -> Description -> Photo unveil mask -> Dual CTAs
 */
export function DealerHero({ className }: DealerHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text entrance sequence
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.dealer-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.dealer-hero-title-line',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.dealer-hero-sub',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.dealer-hero-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.dealer-hero-actions',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        );

      // 2. Right photograph clip unveil
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.25,
          }
        );
      }

      // 3. Subtle internal image parallax on scroll
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -3, scale: 1.04 },
          {
            yPercent: 3,
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

  const scrollToEnquiry = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('dealer-enquiry');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="dealer-hero"
      data-nav-theme="dark"
      aria-labelledby="dealer-hero-heading"
      className={cn(
        'relative min-h-[100dvh] w-full flex items-stretch bg-forest-deep text-cream overflow-hidden pt-24 sm:pt-28 lg:pt-0',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh]">
        {/* =====================================================================
            LEFT PANEL: EDITORIAL PARTNERSHIP BRANDING (55% Desktop)
            ===================================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 z-10 bg-forest-deep">
          <div className="max-w-xl xl:max-w-2xl">
            {/* Small Eyebrow Label */}
            <div className="dealer-hero-eyebrow flex items-center gap-3 mb-6 sm:mb-8">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-harvest">
                PARTNER WITH NAATI ORGANICS
              </span>
              <span className="h-px w-10 bg-harvest/35" aria-hidden="true" />
            </div>

            {/* Monumental Fraunces Headline */}
            <h1
              id="dealer-hero-heading"
              className="tracking-[-0.035em] leading-[1.05] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="dealer-hero-title-line block font-display font-medium text-[clamp(2.75rem,5.5vw,5.5rem)] text-cream">
                Grow with Naati.
              </span>
              <span className="dealer-hero-sub block font-display font-light italic text-[clamp(2.35rem,4.8vw,4.8rem)] text-harvest mt-1">
                Build something better, together.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="dealer-hero-desc font-sans text-base sm:text-lg lg:text-xl text-[#B7C1A9] leading-relaxed mb-8 sm:mb-10 max-w-xl">
              Join the conversation around healthier soils, informed farming and a thoughtful approach to crop nutrition.
            </p>

            {/* Dual Clean CTAs */}
            <div className="dealer-hero-actions flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <a
                href="#dealer-enquiry"
                onClick={scrollToEnquiry}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-harvest text-forest-deep text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-cream transition-all duration-300 shadow-md"
              >
                <span>BECOME A PARTNER</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <Link
                href="/nutrition-system"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium text-cream hover:text-harvest transition-colors duration-200"
              >
                <span>EXPLORE OUR SYSTEM</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-harvest" />
              </Link>
            </div>

            {/* Context Badge Footnote */}
            <div className="mt-12 sm:mt-16 pt-6 border-t border-cream/10 flex items-center justify-between text-xs font-mono text-[#B7C1A9]/70">
              <span className="uppercase tracking-[0.15em]">Dealership & Distribution Network</span>
              <span className="hidden sm:inline-block">South India Agro-Centres</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: FULL-BLEED DOCUMENTARY PHOTOGRAPHY (45% Desktop)
            Touches top, bottom, and right viewport edges. Zero margin. Zero rounding.
            ===================================================================== */}
        <div
          ref={visualWrapperRef}
          className="lg:col-span-5 xl:col-span-5 relative min-h-[50vh] sm:min-h-[58vh] lg:min-h-full w-full overflow-hidden bg-forest-deep"
        >
          <div ref={parallaxImgRef} className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/images/dealers/hero.jpg"
              alt="Cultivated Indian agricultural farmland in early morning light extending to the horizon"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          {/* Natural Environmental Gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-black/25 pointer-events-none lg:bg-gradient-to-r lg:from-forest-deep/30 lg:to-transparent"
            aria-hidden="true"
          />

          {/* Documentary Photo Meta Tag */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-deep/85 backdrop-blur-sm border border-cream/15 text-cream text-[11px] font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
              <span>Commercial & Agricultural Field Partnerships</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
