'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';

export interface ContactClosingCtaProps {
  className?: string;
}

/**
 * CONTACT & ENQUIRY — SECTION 05: FINAL BRAND STATEMENT
 *
 * Eyebrow: THE NAATI APPROACH
 * Headline: "Better soil. Better conversations. Better growing."
 * Supporting: "Discover how Naati brings together soil health and plant nutrition."
 * Primary CTA: EXPLORE OUR SYSTEM ↗ (/nutrition-system)
 * Secondary CTA: VISIT SOIL ACADEMY ↗ (/soil-academy)
 *
 * Background: Deep forest green (#14240E), data-nav-theme="dark"
 * Clean transition into the dark global footer.
 */
export function ContactClosingCta({ className }: ContactClosingCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
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
      id="contact-closing-cta"
      data-nav-theme="dark"
      aria-labelledby="contact-closing-cta-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-20 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden',
        className
      )}
    >
      {/* Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-forest-mid/20 rounded-full blur-[110px] pointer-events-none"
        aria-hidden="true"
      />

      <div ref={contentRef} className="relative max-w-4xl mx-auto text-center z-10">
        {/* Label */}
        <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-harvest">
            THE NAATI APPROACH
          </span>
          <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
        </div>

        {/* Headline */}
        <h2
          id="contact-closing-cta-heading"
          className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-cream tracking-tight leading-[1.1] mb-6 sm:mb-8"
        >
          Better soil. <br />
          <span className="font-light italic text-harvest">Better conversations.</span> <br />
          Better growing.
        </h2>

        {/* Supporting Copy */}
        <p className="font-sans text-base sm:text-lg lg:text-xl text-[#B7C1A9] max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
          Discover how Naati brings together soil health and plant nutrition.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/nutrition-system"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 bg-harvest text-forest-deep text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-cream transition-all duration-300 shadow-md"
          >
            <span>EXPLORE OUR SYSTEM</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/soil-academy"
            className="group inline-flex items-center gap-2 px-6 sm:px-7 py-4 bg-transparent border border-cream/30 text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium hover:border-harvest hover:text-harvest transition-all duration-200"
          >
            <span>VISIT SOIL LEARNING CENTRE</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-harvest" />
          </Link>
        </div>
      </div>
    </section>
  );
}
