'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface PlusFinalCtaProps {
  className?: string;
}

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 07: FINAL PRODUCT CTA
 *
 * Impactful Dark Forest Closing Statement:
 * - Deep forest green (#14240E) background with data-nav-theme="dark"
 * - Monumental Fraunces headline: "Healthy growth begins with better soil."
 * - Clear primary CTA ("Inquire About Naati Plus") & secondary CTA ("Explore Naati Pro")
 * - Seamlessly transitions into the global site footer
 */
export function PlusFinalCta({ className }: PlusFinalCtaProps) {
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
            stagger: 0.16,
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
      id="naati-plus-final-cta"
      data-nav-theme="dark"
      aria-labelledby="plus-cta-heading"
      className={cn(
        'relative w-full bg-[#14240E] text-cream py-24 sm:py-28 md:py-32 lg:py-36 selection:bg-harvest selection:text-forest-deep overflow-hidden border-t border-cream/15',
        className
      )}
    >
      {/* Background Radiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-olive/10 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
              07 / GET STARTED
            </span>
          </div>

          {/* Fraunces Headline */}
          <h2
            id="plus-cta-heading"
            className="tracking-[-0.035em] leading-[1.06] [text-wrap:balance] mb-6 sm:mb-8"
          >
            <span className="block font-display font-medium text-[clamp(2.5rem,5.2vw,4.75rem)] text-cream">
              Healthy growth begins
            </span>
            <span className="block font-display italic font-normal text-harvest text-[clamp(2.5rem,5.2vw,4.75rem)] mt-1">
              with better soil.
            </span>
          </h2>

          {/* Short Supporting Text */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed mb-10 sm:mb-12 max-w-2xl mx-auto [text-wrap:pretty]">
            Learn more about Naati Plus or connect with our team for product and application
            information.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Primary Action Button */}
            <Link
              href="/contact?product=naati-plus"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px]"
              aria-label="Inquire about Naati Plus product and application"
            >
              <span>Inquire About Naati Plus</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Secondary Link Button */}
            <Link
              href="/products/naati-pro"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-cream/30 text-cream font-sans text-sm sm:text-base font-medium tracking-wide transition-all duration-300 hover:bg-cream/10 hover:border-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 min-h-[48px]"
              aria-label="Explore Naati Pro plant nutrition"
            >
              <span>Explore Naati Pro</span>
              <ArrowUpRight className="w-4 h-4 text-cream/70" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
