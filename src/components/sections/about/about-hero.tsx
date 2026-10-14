'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown, Sparkles } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface AboutHeroProps {
  className?: string;
}

/**
 * ABOUT NAATI ORGANICS — SECTION 01: HERO BANNER
 *
 * Client Specification:
 * ABOUT NAATI ORGANICS
 * Hero Banner
 * (Background: Sunrise over healthy farmland with a farmer gently holding a handful of rich, living soil.)
 * We Believe Every Great Harvest Begins Beneath the Soil.
 * Fix the Soil. Feed the Plant.
 */
export function AboutHero({ className }: AboutHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Text entrance choreography on load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.about-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.about-hero-title-line',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 },
          '-=0.35'
        )
        .fromTo(
          '.about-hero-tagline',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.about-hero-scroll-cue',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );

      // 2. Right visual panel entrance (subtle vertical clip-path reveal)
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(6% 0% 0% 0%)', opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.25,
          }
        );
      }

      // 3. Subtle image parallax on scroll
      if (parallaxImgRef.current && visualWrapperRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
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
      id="about-hero"
      data-nav-theme="light"
      aria-label="About Naati Organics — We Believe Every Great Harvest Begins Beneath the Soil."
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-[auto] lg:min-h-screen">
        {/* ===================================================================
            LEFT PANEL (54% on desktop): EDITORIAL HEADLINE & STORY STATEMENT
            Warm cream editorial surface with breathing room & container alignment
            =================================================================== */}
        <div className="w-full lg:w-[54%] xl:w-[52%] flex flex-col justify-between pt-28 sm:pt-32 md:pt-36 lg:pt-36 xl:pt-40 pb-12 sm:pb-14 lg:pb-16 xl:pb-20 px-6 sm:px-10 md:px-14 lg:pl-[max(3rem,calc((100vw-1440px)/2+3rem))] lg:pr-12 xl:pr-16 2xl:pr-20 z-10">
          {/* Top/Center content group */}
          <div className="my-auto py-6 sm:py-8 lg:py-10">
            {/* Monospace Category Eyebrow */}
            <div className="about-hero-eyebrow inline-flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
                ABOUT NAATI ORGANICS
              </span>
            </div>

            {/* Display Headline in Fraunces (Client Specified) */}
            <h1 className="tracking-[-0.035em] leading-[1.04] [text-wrap:balance] mb-6 sm:mb-8">
              <span className="about-hero-title-line block font-display font-medium text-[clamp(2.5rem,5vw,5.2rem)] text-forest">
                We Believe Every
              </span>
              <span className="about-hero-title-line block font-display font-medium text-[clamp(2.5rem,5vw,5.2rem)] text-forest">
                Great Harvest Begins
              </span>
              <span className="about-hero-title-line block font-display font-normal italic text-olive text-[clamp(2.5rem,5vw,5.2rem)] mt-1 sm:mt-2">
                Beneath the Soil.
              </span>
            </h1>

            {/* Core Tagline Badge (Client Specified) */}
            <div className="about-hero-tagline max-w-xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-forest text-cream shadow-warm-xs mb-4">
                <Sparkles className="w-4 h-4 text-harvest" />
                <span className="font-display font-medium text-sm sm:text-base tracking-wide">
                  Fix the Soil. Feed the Plant.
                </span>
              </div>
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed [text-wrap:pretty]">
                Healthy crops are not created in isolation—they are the natural biological outcome of fertile, living soil.
              </p>
            </div>
          </div>

          {/* Editorial Anchor Indicator at Bottom */}
          <div className="about-hero-scroll-cue pt-4 sm:pt-6">
            <a
              href="#our-story"
              className="group inline-flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.2em] text-forest/80 hover:text-forest transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded py-1"
              aria-label="Scroll to explore our story"
            >
              <span>DISCOVER OUR STORY</span>
              <span className="w-7 h-7 rounded-full bg-cream-light border border-cream-border flex items-center justify-center transition-transform duration-300 group-hover:translate-y-1 shadow-warm-xs">
                <ArrowDown className="w-3.5 h-3.5 text-olive" />
              </span>
            </a>
          </div>
        </div>

        {/* ===================================================================
            RIGHT PANEL (46% on desktop): SUNRISE OVER FARMLAND WITH LIVING SOIL
            (Background: Sunrise over healthy farmland with a farmer gently holding a handful of rich, living soil.)
            =================================================================== */}
        <div className="w-full lg:w-[46%] xl:w-[48%] relative min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-full self-stretch order-last">
          <div
            ref={visualWrapperRef}
            className="relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-full overflow-hidden will-change-transform bg-cream-deep"
          >
            {/* Parallax Image Element */}
            <div
              ref={parallaxImgRef}
              className="absolute inset-[-6%] w-[112%] h-[112%] will-change-transform"
            >
              <Image
                src="/assets/images/home/why-farmers-choose-naati.jpg"
                alt="Sunrise over healthy farmland with farmer gently holding rich, living soil with active root nodules"
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_40%] select-none"
              />
            </div>

            {/* Architectural Hairline Divider on Left Edge (Desktop) */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-cream-border/70 z-10" />

            {/* Top Atmospheric Gradient for Nav Legibility */}
            <div
              className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#F5F1E7]/25 via-transparent to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Bottom Atmospheric Vignette for Caption Contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />

            {/* Corner Editorial Caption */}
            <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-6 sm:left-8 lg:left-10 right-6 sm:right-8 lg:right-10 z-20 flex items-center justify-between text-cream pointer-events-none">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-cream/90 flex items-center gap-2 drop-shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                SUNRISE ON LIVING FARMLAND
              </span>
              <span className="font-mono text-[10px] tracking-wider text-cream/75 uppercase drop-shadow-sm">
                LIVING SOIL ECOSYSTEM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
