'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProHeroProps {
  className?: string;
}

/**
 * NAATI PRO PRODUCT PAGE — SECTION 01: CINEMATIC PRODUCT HERO
 *
 * Full-viewport premium botanical hero:
 * - Background: Cinematic full-bleed agricultural canopy photograph with controlled dark green overlay
 * - data-nav-theme="dark" for transparent adaptive navbar
 * - Left: Editorial label ("01 / PLANT NUTRITION"), monumental Fraunces headline ("Feed the Plant."),
 *   secondary italic line ("Nourish the growth above."), short description, technical pills & dual CTAs
 * - Right: Approved Naati Pro box package displayed crisp and naturally integrated
 * - Pure GSAP text choreography, package upward entrance, and subtle scroll parallax
 */
export function ProHero({ className }: ProHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Staggered text & badge entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.pro-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.pro-hero-title-line',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.pro-hero-desc',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.pro-hero-pills',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        )
        .fromTo(
          '.pro-hero-actions',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 },
          '-=0.35'
        );

      // 2. Packaging smooth reveal
      if (packageRef.current) {
        gsap.fromTo(
          packageRef.current,
          { opacity: 0, y: 32, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power2.out',
            delay: 0.35,
          }
        );
      }

      // 3. Gentle background photo parallax
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Subtle packaging scroll float
      if (packageRef.current) {
        gsap.to(packageRef.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="naati-pro-hero"
      data-nav-theme="dark"
      aria-labelledby="pro-hero-heading"
      className={cn(
        'relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-forest-deep text-cream pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24',
        className
      )}
    >
      {/* =======================================================================
          BACKGROUND: CINEMATIC FULL-BLEED CANOPY PHOTOGRAPH + CONTROLLED GRADIENTS
          ======================================================================= */}
      <div
        ref={bgImageRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] pointer-events-none select-none will-change-transform z-0"
        aria-hidden="true"
      >
        <Image
          src="/assets/images/products/naati-pro/hero-canopy.jpg"
          alt="Lush green crop canopy in morning sunlight"
          fill
          priority
          sizes="100vw"
          quality={88}
          className="object-cover object-center filter brightness-[0.45] saturate-[1.12]"
        />
        {/* Controlled dark green overlay for guaranteed text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/80 to-forest-deep/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-forest-deep/70" />
      </div>

      {/* Decorative ambient radial glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* =======================================================================
          CONTENT CONTAINER
          ======================================================================= */}
      <Container size="wide" className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ===================================================================
              LEFT COLUMN: HERO EDITORIAL TEXT (Col 1 to 7)
              =================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center max-w-2xl lg:max-w-none">
            {/* Small Editorial Eyebrow */}
            <div className="pro-hero-eyebrow flex items-center gap-3 mb-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-harvest">
                01 / PLANT NUTRITION
              </span>
              <span className="h-px w-10 bg-harvest/40" aria-hidden="true" />
              <span className="font-mono text-xs tracking-wider uppercase text-cream/70 hidden sm:inline-block">
                BIO-ACTIVATOR
              </span>
            </div>

            {/* Display Headline in Fraunces */}
            <h1
              id="pro-hero-heading"
              className="tracking-[-0.035em] leading-[1.04] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="pro-hero-title-line block font-display font-medium text-[clamp(2.75rem,5.4vw,5.5rem)] text-cream">
                Feed the Plant.
              </span>
              <span className="pro-hero-title-line block font-display font-normal italic text-harvest text-[clamp(2.5rem,5vw,5.1rem)] mt-1 sm:mt-2">
                Nourish the growth above.
              </span>
            </h1>

            {/* Short Product Description */}
            <p className="pro-hero-desc font-sans text-base sm:text-lg md:text-xl text-cream/85 leading-relaxed max-w-xl mb-8 [text-wrap:pretty]">
              Naati Pro is a plant nutrition bio-activator designed to complement the Naati soil-first system.
            </p>

            {/* Compact Technical Product Identity Strip */}
            <div className="pro-hero-pills flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-cream/90 bg-cream/10 border border-cream/20 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                PLANT NUTRITION
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-harvest bg-harvest/10 border border-harvest/30 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                BIO-ACTIVATOR
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-cream/75 bg-cream/5 border border-cream/15 px-3.5 py-1.5 rounded-full backdrop-blur-xs">
                SOLID BLOCK FORMAT
              </span>
            </div>

            {/* CTAs */}
            <div className="pro-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <a
                href="#why-plant-nutrition"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px]"
                aria-label="Explore Naati Pro"
              >
                <span>Explore Naati Pro</span>
                <ArrowDown className="w-4 h-4 text-forest-deep" />
              </a>

              <Link
                href="/contact?product=naati-pro"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-cream/30 text-cream font-sans text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:bg-cream/10 hover:border-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 min-h-[48px]"
                aria-label="Product Inquiry for Naati Pro"
              >
                <span>Product Inquiry</span>
                <ArrowUpRight className="w-4 h-4 text-cream/70" />
              </Link>
            </div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: APPROVED NAATI PRO PACKAGING BOX (Col 8 to 12)
              =================================================================== */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div
              ref={packageRef}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center will-change-transform"
            >
              {/* Natural Grounded Soft Shadow */}
              <div
                className="absolute bottom-6 w-3/4 h-8 bg-black/50 blur-2xl rounded-full"
                aria-hidden="true"
              />

              {/* Exact Approved Packaging Box Visual */}
              <Image
                src="/assets/images/products/naati-pro-pack.png"
                alt="Naati Pro Plant Nutrition Bio-Activator official solid product blocks box packaging"
                width={800}
                height={800}
                priority
                quality={92}
                className="relative z-10 w-full h-auto object-contain select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]"
              />

              {/* Natural subtle ambient rim light reflection behind box */}
              <div
                className="absolute inset-8 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none -z-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
