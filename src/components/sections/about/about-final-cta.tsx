'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutFinalCtaProps {
  className?: string;
}

/**
 * ABOUT NAATI ORGANICS — SECTION 06: FINAL CTA
 *
 * Refined dark forest-green closing section:
 * - Seamless tonal merge into the global dark footer (#142914)
 * - data-nav-theme="dark"
 * - High-impact Fraunces typography: "Let's grow something better."
 * - Primary CTA: EXPLORE OUR PRODUCTS ↗ (/nutrition-system)
 * - Secondary CTA: GET IN TOUCH ↗ (/contact)
 * - Subtle organic decorative accents & responsive button micro-interactions
 */
export function AboutFinalCta({ className }: AboutFinalCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        '.cta-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
        .fromTo(
          '.cta-headline',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.cta-paragraph',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.cta-buttons',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
          '-=0.35'
        );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-final-cta"
      data-nav-theme="dark"
      aria-labelledby="about-cta-heading"
      className={cn(
        'relative w-full bg-[#142914] text-[#F5F1E7] overflow-hidden py-24 sm:py-28 md:py-32 lg:py-36 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Transition Divider from Cream to Dark */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#F5F1E7]/10" />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-olive/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Eyebrow in IBM Plex Mono */}
          <div className="cta-eyebrow inline-flex items-center gap-2.5 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6C895] animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#D6C895]">
              THE NEXT CHAPTER
            </span>
          </div>

          {/* Main Headline in Fraunces */}
          <h2
            id="about-cta-heading"
            className="cta-headline font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] text-[#F5F1E7] leading-[1.08] tracking-[-0.03em] mb-5 sm:mb-6 [text-wrap:balance]"
          >
            Let&apos;s grow something better.
          </h2>

          {/* Supporting Copy in DM Sans */}
          <p className="cta-paragraph font-sans text-base sm:text-lg md:text-xl text-[#B7C1A9] leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto [text-wrap:pretty]">
            Explore the Naati nutrition system or connect with us to learn more about our approach.
          </p>

          {/* Interactive CTAs */}
          <div className="cta-buttons flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {/* Primary Action Button */}
            <Link
              href="/nutrition-system"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#D6C895] text-[#142914] font-sans text-sm sm:text-base font-bold tracking-wide hover:bg-[#F5F1E7] active:scale-[0.98] transition-all shadow-warm-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C895]/50"
              aria-label="Explore Our Products — Discover the complete Naati crop nutrition system"
            >
              <span>EXPLORE OUR PRODUCTS</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* Secondary Action Link */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-[#F5F1E7]/25 text-[#F5F1E7] hover:border-[#D6C895] hover:text-[#D6C895] font-sans text-sm sm:text-base font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C895]/50"
              aria-label="Get in Touch — Connect with our agronomy advisory team"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
