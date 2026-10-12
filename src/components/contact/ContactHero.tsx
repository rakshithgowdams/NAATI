'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface ContactHeroProps {
  className?: string;
}

/**
 * CONTACT & ENQUIRY — SECTION 01: CONTACT HERO
 *
 * Route: /contact
 * Small Editorial Label: CONTACT / NAATI ORGANICS
 * Main Headline: "Good conversations grow better things." (tasteful italic styling on "grow better things.")
 * Supporting: "Whether you're exploring our products, looking for crop-related information, or interested in working with Naati, we'd love to hear from you."
 * CTAs: SEND AN ENQUIRY ↘ (scrolls to form) / EXPLORE CONTACT OPTIONS → (scrolls to ways to connect)
 *
 * Full-Bleed Split-Screen Composition (Desktop: Left 55% Cream, Right 45% Photo):
 * - Right photo touches right viewport edge, top, and bottom of panel (no rounded card, no inset frame)
 * - data-nav-theme="light" matching the warm cream left panel
 */
export function ContactHero({ className }: ContactHeroProps) {
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
        '.contact-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.15 }
      )
        .fromTo(
          '.contact-hero-title-line',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          '.contact-hero-desc',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65 },
          '-=0.45'
        )
        .fromTo(
          '.contact-hero-actions',
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
            delay: 0.2,
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

  const scrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('contact-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToConnect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('ways-to-connect');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-hero"
      data-nav-theme="light"
      aria-labelledby="contact-hero-heading"
      className={cn(
        'relative min-h-[100dvh] w-full flex items-stretch bg-cream text-text-primary overflow-hidden pt-24 sm:pt-28 lg:pt-0 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[100dvh]">
        {/* =====================================================================
            LEFT PANEL: EDITORIAL TEXT & ACTIONS (55% Desktop)
            ===================================================================== */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24 z-10 bg-cream">
          <div className="max-w-xl xl:max-w-2xl">
            {/* Small Editorial Eyebrow */}
            <div className="contact-hero-eyebrow flex items-center gap-3 mb-6 sm:mb-8">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-deep">
                CONTACT / NAATI ORGANICS
              </span>
              <span className="h-px w-10 bg-forest-deep/25" aria-hidden="true" />
            </div>

            {/* Display Headline in Fraunces */}
            <h1
              id="contact-hero-heading"
              className="tracking-[-0.035em] leading-[1.05] [text-wrap:balance] mb-6 sm:mb-8"
            >
              <span className="contact-hero-title-line block font-display font-medium text-[clamp(2.5rem,5.2vw,5.2rem)] text-forest-deep">
                Good conversations
              </span>
              <span className="contact-hero-title-line block font-display font-light italic text-[clamp(2.35rem,5vw,5rem)] text-forest-deep/90 mt-1">
                grow better things.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="contact-hero-desc font-sans text-base sm:text-lg lg:text-xl text-forest-deep/75 leading-relaxed mb-8 sm:mb-10 max-w-xl">
              Whether you&apos;re exploring our products, looking for crop-related information, or interested in working with Naati, we&apos;d love to hear from you.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="contact-hero-actions flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <a
                href="#contact-form"
                onClick={scrollToForm}
                className="group inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-forest-deep text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-forest-light hover:text-forest-deep border border-forest-deep shadow-sm"
              >
                <span>SEND AN ENQUIRY</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#ways-to-connect"
                onClick={scrollToConnect}
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-medium text-forest-deep hover:text-harvest transition-colors duration-200"
              >
                <span>EXPLORE CONTACT OPTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-harvest" />
              </a>
            </div>

            {/* Subtle Editorial Footnote */}
            <div className="mt-12 sm:mt-16 pt-6 border-t border-forest-deep/10 flex items-center justify-between text-xs font-mono text-forest-deep/60">
              <span className="uppercase tracking-[0.15em]">Agronomy Advisory Desk</span>
              <span className="hidden sm:inline-block">Bengaluru • Karnataka</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT PANEL: FULL-BLEED CINEMATIC PHOTOGRAPHY (45% Desktop)
            Touches top, bottom, and right viewport edges. No rounded container.
            ===================================================================== */}
        <div
          ref={visualWrapperRef}
          className="lg:col-span-5 xl:col-span-5 relative min-h-[50vh] sm:min-h-[58vh] lg:min-h-full w-full overflow-hidden bg-forest-deep"
        >
          <div ref={parallaxImgRef} className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/images/contact/hero.jpg"
              alt="Lush cultivated crops in morning sunlight with rich soil textures in South India"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
          </div>

          {/* Natural Environmental Gradients */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-deep/65 via-transparent to-black/20 pointer-events-none lg:bg-gradient-to-r lg:from-cream/15 lg:to-transparent"
            aria-hidden="true"
          />

          {/* Photo Tag */}
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-deep/85 backdrop-blur-sm border border-cream/15 text-cream text-[11px] font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
              <span>Naati Organics • Direct Agricultural Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
