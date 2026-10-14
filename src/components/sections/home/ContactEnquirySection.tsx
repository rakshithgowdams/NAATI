'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface ContactEnquirySectionProps {
  className?: string;
}

/**
 * HOMEPAGE SECTION 08 — CONTACT & ENQUIRY (08 / LET'S GROW TOGETHER)
 *
 * Full-Bleed Split-Screen Editorial Composition:
 * - Desktop Layout: Left 55% Cream Panel (#F5F1E7) | Right 45% True Full-Bleed Photographic Panel
 * - Right seedling photograph fills entire height and touches top, bottom & right viewport edge
 * - Zero rounded corners, zero outer margins, zero inset card borders
 * - Preserved editorial line text-mask reveals, botanical stem SVG draw & smooth parallax
 * - Mobile: Seamless stacked layout with comfortable padding and edge-to-edge photography
 */
export function ContactEnquirySection({ className }: ContactEnquirySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);
  const stemPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // =======================================================================
      // 1. Text & Content Entrance Sequence
      // =======================================================================
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      // Section Eyebrow Label
      contentTl.fromTo(
        '.contact-eyebrow',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Headline Lines — Vertical Text Mask Effect
      contentTl.fromTo(
        '.contact-line',
        { y: '105%' },
        {
          y: '0%',
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
        },
        '-=0.25'
      );

      // Botanical Root/Stem Progressive Draw Animation
      if (stemPathRef.current) {
        const pathLength = stemPathRef.current.getTotalLength() || 280;
        gsap.set('.contact-stem-path, .contact-stem-branch', {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        gsap.set('.contact-stem-node', { scale: 0, transformOrigin: 'center' });

        contentTl.to(
          '.contact-stem-path, .contact-stem-branch',
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.4'
        );

        contentTl.to(
          '.contact-stem-node',
          {
            scale: 1,
            duration: 0.35,
            ease: 'back.out(2)',
          },
          '-=0.25'
        );
      }

      // Supporting Editorial Paragraph
      contentTl.fromTo(
        '.contact-copy',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.45'
      );

      // Primary & Secondary CTAs
      contentTl.fromTo(
        '.contact-ctas',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      );

      // Assistance Footnote
      contentTl.fromTo(
        '.contact-assistance',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // =======================================================================
      // 2. Right Side Seedling Visual Entrance
      // Clean full-bleed rectangular reveal without rounded borders
      // =======================================================================
      if (visualWrapperRef.current) {
        gsap.fromTo(
          visualWrapperRef.current,
          { clipPath: 'inset(8% 0% 0% 0%)', opacity: 0, y: 20 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualWrapperRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // =======================================================================
      // 3. Subtle Parallax on Internal Photographic Visual
      // Moves gently inside full-bleed overflow-hidden container
      // =======================================================================
      if (parallaxImgRef.current && visualWrapperRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-enquiry"
      data-nav-theme="light"
      className={cn(
        'relative w-full bg-cream text-text-primary overflow-hidden',
        'border-t border-forest-deep/10',
        className
      )}
      aria-labelledby="section-08-heading"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-[55%_45%] lg:min-h-[100dvh] items-stretch">
        {/* ===================================================================
            LEFT PANEL — (55% on desktop)
            Typography, Editorial Headline, Root Illustration, CTAs & Assistance
            =================================================================== */}
        <div className="flex flex-col justify-center px-4 xs:px-6 sm:px-8 md:px-12 lg:pl-12 lg:pr-10 xl:pl-20 xl:pr-14 2xl:pl-28 2xl:pr-20 pt-24 sm:pt-28 md:pt-32 lg:pt-32 xl:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-cream z-10">
          <div className="w-full max-w-xl xl:max-w-2xl">
            {/* Numbered Section Label */}
            <div className="contact-eyebrow flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-olive" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-sm font-semibold text-olive-dark tracking-[0.2em] uppercase">
                LET&apos;S GROW TOGETHER · GET IN TOUCH
              </span>
            </div>

            {/* Editorial Headline with Vertical Text-Mask Wrappers */}
            <h2
              id="section-08-heading"
              className="font-display text-4xl xs:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] font-medium text-forest-deep tracking-[-0.03em] leading-[1.08] mb-5 sm:mb-6 [text-wrap:balance]"
            >
              <div className="overflow-hidden">
                <span className="contact-line block">Better soil.</span>
              </div>
              <div className="overflow-hidden">
                <span className="contact-line block">Better harvests.</span>
              </div>
              <div className="overflow-hidden">
                <span className="contact-line block italic font-normal text-forest">
                  Let&apos;s begin.
                </span>
              </div>
            </h2>

            {/* Subtle Botanical Detail — Organic Sprouting Stem SVG Illustration */}
            <div
              className="contact-stem-wrapper mb-6 sm:mb-7 overflow-visible"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 280 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-44 sm:w-60 h-8 sm:h-9 text-olive/60"
              >
                <path
                  ref={stemPathRef}
                  className="contact-stem-path"
                  d="M 2 34 C 45 32, 85 18, 135 22 C 185 26, 215 12, 260 8 C 268 7, 274 6, 278 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  className="contact-stem-node"
                  cx="278"
                  cy="5"
                  r="2.5"
                  fill="currentColor"
                />
                <path
                  className="contact-stem-branch"
                  d="M 135 22 C 146 13, 160 11, 172 14"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Supporting Editorial Paragraph */}
            <p className="contact-copy font-sans text-base sm:text-lg lg:text-xl text-forest-deep/80 max-w-xl leading-relaxed mb-8 sm:mb-10 [text-wrap:pretty]">
              Every farm has different needs. Let&apos;s explore how Naati Organics can support
              your journey towards healthier soil and stronger crops.
            </p>

            {/* Premium CTA Actions */}
            <div className="contact-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-10 sm:mb-12">
              {/* Primary CTA Button */}
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-forest-deep text-cream px-7 py-3.5 sm:px-8 sm:py-4 rounded-lg font-sans text-sm sm:text-base font-semibold tracking-wide transition-colors duration-300 hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream shadow-sm"
                aria-label="Get in touch with Naati Organics agronomy advisory"
              >
                <span>Get in Touch</span>
                <ArrowUpRight
                  className="w-4 h-4 text-harvest transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>

              {/* Secondary CTA Link with Horizontal Underline Animation */}
              <Link
                href="/nutrition-system"
                className="group/sec inline-flex items-center justify-center sm:justify-start gap-2.5 font-sans text-sm sm:text-base font-semibold text-forest-deep hover:text-forest transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                aria-label="Explore our complete crop nutrition system"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover/sec:after:w-full after:h-[1.5px] after:bg-forest-deep after:transition-all after:duration-300">
                  Explore Our Products
                </span>
                <ArrowRight
                  className="w-4 h-4 text-olive-dark transition-transform duration-200 group-hover/sec:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Subtle Agronomy Assistance Notice */}
            <div className="contact-assistance pt-6 border-t border-forest-deep/10 max-w-lg">
              <p className="font-sans text-xs sm:text-sm text-forest-deep/65 leading-relaxed">
                Questions about our products or their suitability for your crops? We&apos;d be
                happy to hear from you.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================================
            RIGHT PANEL — (45% on desktop, TRUE FULL-BLEED)
            Continuous Edge-to-Edge Photographic Panel without Card Inset
            =================================================================== */}
        <div
          ref={visualWrapperRef}
          className="contact-visual-panel relative w-full min-h-[380px] xs:min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-full lg:h-full overflow-hidden bg-forest-deep"
        >
          {/* Internal Parallax Container */}
          <div
            ref={parallaxImgRef}
            className="absolute inset-[-6%] w-[112%] h-[112%]"
          >
            <Image
              src="/assets/images/home/contact-seedling.jpg"
              alt="Young healthy crop seedling growing in dark rich fertile soil under natural sunlight"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              quality={90}
              className="object-cover object-[center_36%]"
              priority={false}
            />
            {/* Subtle bottom vignette to ensure caption legibility */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest-deep/65 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Discreet Unobtrusive Editorial Photo Caption */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 z-10 pointer-events-none flex items-center gap-2.5 text-cream/90 font-mono text-[11px] sm:text-xs tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
            <span className="drop-shadow-sm font-semibold tracking-widest">
              Living Soil · Active Growth
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backward-compatible alias for existing naming conventions
export const Section08ContactEnquiry = ContactEnquirySection;
