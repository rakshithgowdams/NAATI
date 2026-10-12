'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProFinalCtaProps {
  className?: string;
}

/**
 * NAATI PRO PRODUCT PAGE — SECTION 08: FINAL CTA
 *
 * Impactful Dark Forest Closing Statement:
 * - Background: Deep forest green (#14240E) with natural botanical atmosphere and data-nav-theme="dark"
 * - Headline: "Give your crop the attention it deserves."
 * - Supporting text: "Explore the Naati nutrition system and connect with our team to learn more about Naati Pro."
 * - Primary CTA: "Inquire About Naati Pro ↗"
 * - Secondary CTA: "Explore Naati Plus ↗"
 * - Seamlessly transitions into the global site footer
 */
export function ProFinalCta({ className }: ProFinalCtaProps) {
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
      id="naati-pro-final-cta"
      data-nav-theme="dark"
      aria-labelledby="pro-cta-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-cream/10',
        className
      )}
    >
      {/* Botanical ambient gradient circles */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10 text-center">
        <div ref={contentRef} className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-harvest">
              08 / FEED THE PLANT
            </span>
          </div>

          {/* Monumental Display Headline */}
          <h2
            id="pro-cta-heading"
            className="font-display font-medium text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.08] tracking-[-0.035em] text-cream mb-6 [text-wrap:balance]"
          >
            Give your crop the attention it deserves.
          </h2>

          {/* Supporting Statement */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-cream/80 leading-relaxed mb-10 max-w-xl [text-wrap:pretty]">
            Explore the Naati nutrition system and connect with our team to learn more about Naati Pro.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full sm:w-auto">
            <Link
              href="/contact?product=naati-pro"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-harvest text-forest-deep font-sans text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[52px] w-full sm:w-auto"
              aria-label="Inquire about Naati Pro"
            >
              <span>Inquire About Naati Pro</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products/naati-plus"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-cream/30 text-cream font-sans text-base font-medium tracking-wide transition-all duration-300 hover:bg-cream/10 hover:border-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/40 min-h-[52px] w-full sm:w-auto"
              aria-label="Explore Naati Plus product page"
            >
              <span>Explore Naati Plus</span>
              <ArrowUpRight className="w-4 h-4 text-cream/70" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
