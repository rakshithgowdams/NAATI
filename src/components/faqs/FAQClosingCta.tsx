'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface FAQClosingCtaProps {
  className?: string;
}

/**
 * FAQ PAGE — SECTION 04: STILL HAVE QUESTIONS?
 *
 * Background: Deep forest green (#14240E), data-nav-theme="dark"
 * Eyebrow: 03 / WE'RE HERE TO HELP
 * Headline: "Still have a question?"
 * Supporting: "Connect with the Naati team for product information, crop-related enquiries or partnership questions."
 * Primary CTA: GET IN TOUCH ↗ (/contact?type=general)
 * Secondary CTA: EXPLORE OUR PRODUCTS ↗ (/nutrition-system)
 *
 * Visual:
 * - Refined, compact closing statement transitioning into the dark global footer (SiteFooter)
 * - Warm ivory and harvest gold accents
 */
export function FAQClosingCta({ className }: FAQClosingCtaProps) {
  return (
    <section
      id="still-have-questions"
      data-nav-theme="dark"
      aria-labelledby="still-have-questions-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-20 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 overflow-hidden border-t border-cream/10',
        className
      )}
    >
      {/* Ambient Radial Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,rgba(197,160,89,0.12),rgba(20,36,14,0))] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
          <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-harvest">
            03 / WE&apos;RE HERE TO HELP
          </span>
          <span className="h-px w-8 bg-harvest/40" aria-hidden="true" />
        </div>

        {/* Display Headline in Fraunces */}
        <h2
          id="still-have-questions-heading"
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-cream tracking-tight leading-[1.12] mb-6 [text-wrap:balance]"
        >
          Still have <br />
          <span className="italic font-light text-harvest">a question?</span>
        </h2>

        {/* Supporting Paragraph */}
        <p className="font-sans text-base sm:text-lg lg:text-xl text-[#B7C1A9] leading-relaxed max-w-xl mx-auto mb-10 sm:mb-12">
          Connect with the Naati team for product information, crop-related enquiries or partnership questions.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/contact?type=general"
            className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 bg-harvest text-forest-deep text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-cream transition-all duration-300 shadow-md"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/nutrition-system"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 border border-cream/25 text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium hover:border-harvest hover:text-harvest transition-all duration-200"
          >
            <span>EXPLORE OUR PRODUCTS</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-harvest" />
          </Link>
        </div>

        {/* Quick Contact Footnote */}
        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#B7C1A9]/70">
          <div className="flex items-center gap-2">
            <MessageSquareText className="w-4 h-4 text-harvest" />
            <span>Agronomy Advisory &amp; Technical Consultation</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>Response within 24–48 Business Hours</span>
        </div>
      </div>
    </section>
  );
}
