'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';

export interface ShareExperienceCtaProps {
  className?: string;
}

/**
 * SUCCESS STORIES — SECTION 06: SHARE YOUR FIELD EXPERIENCE
 *
 * Eyebrow: 05 / SHARE YOUR EXPERIENCE
 * Headline: "Your field has a story. We'd like to hear it."
 * Supporting: "If you'd like to share an agricultural experience or discuss a field observation, connect with the Naati team."
 * Primary CTA: SHARE YOUR EXPERIENCE ↗ (links to /contact?type=general)
 * Secondary CTA: EXPLORE NAATI PRODUCTS ↗ (/nutrition-system)
 *
 * Background: Deep forest green (#14240E), data-nav-theme="dark"
 * Clean botanical accent and direct link to the established contact experience.
 */
export function ShareExperienceCta({ className }: ShareExperienceCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 82%',
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
      id="share-experience"
      data-nav-theme="dark"
      aria-labelledby="share-experience-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden border-b border-cream/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Headline and Narrative (7 Cols) */}
          <div ref={textColRef} className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-harvest">
                05 / SHARE YOUR EXPERIENCE
              </span>
              <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
            </div>

            <h2
              id="share-experience-heading"
              className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-cream tracking-tight leading-[1.1] mb-6"
            >
              Your field has a story. <br />
              <span className="italic font-light text-harvest">We&apos;d like to hear it.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#B7C1A9] leading-relaxed max-w-xl mb-8 sm:mb-10">
              If you&apos;d like to share an agricultural experience or discuss a field observation with our agronomists, connect with the Naati team. We review every field journey with care, scientific curiosity, and utmost respect for growers.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <Link
                href="/contact?type=general"
                className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-harvest text-forest-deep text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-cream transition-all duration-300 shadow-md"
              >
                <span>SHARE YOUR EXPERIENCE</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/nutrition-system"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium text-cream hover:text-harvest transition-colors duration-200"
              >
                <span>EXPLORE NAATI PRODUCTS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-harvest" />
              </Link>
            </div>
          </div>

          {/* Right Column: Botanical Visual Frame (5 Cols) */}
          <div ref={visualRef} className="lg:col-span-5 relative">
            <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[380px] overflow-hidden border border-cream/15 bg-forest-mid/30">
              <Image
                src="/assets/images/stories/botanical-accent.jpg"
                alt="Farmer holding moist organic soil and healthy root systems"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center brightness-90 contrast-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Tag in corner */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-cream/80 bg-forest-deep/80 backdrop-blur-sm p-3 border border-cream/10">
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-harvest" />
                  <span>Grower Observations • Field Conversations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
