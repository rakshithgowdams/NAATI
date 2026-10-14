'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { BRAND_CONFIG } from '@/lib/constants/brand';
import { cn } from '@/lib/utils/cn';

export interface SiteFooterProps {
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterNavColumn {
  heading: string;
  links: FooterLink[];
}

/**
 * Verified Real Routes in Multipage Project
 */
const FOOTER_COLUMNS: FooterNavColumn[] = [
  {
    heading: 'PRODUCTS',
    links: [
      { label: 'Naati Plus', href: '/products/naati-plus' },
      { label: 'Naati Pro', href: '/products/naati-pro' },
      { label: 'Complete System', href: '/nutrition-system' },
    ],
  },
  {
    heading: 'EXPLORE',
    links: [
      { label: 'Our Approach', href: '/nutrition-system' },
      { label: 'Crop Solutions', href: '/crop-solutions' },
      { label: 'Soil Learning Centre', href: '/soil-academy' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Dealer Network', href: '/dealer-network' },
    ],
  },
  {
    heading: 'RESOURCES',
    links: [
      { label: 'Field Notes', href: '/resources' },
      { label: 'Farmer Stories', href: '/success-stories' },
      { label: 'FAQ', href: '/faqs' },
    ],
  },
];

/**
 * NAATI ORGANICS — REFINED EDITORIAL GLOBAL FOOTER
 *
 * Creative Concept: "ROOTED IN NATURE. BUILT FOR TOMORROW."
 *
 * Visual System:
 * - Background: Deep forest green (#142914) with data-nav-theme="dark"
 * - Primary typography: Warm cream (#F5F1E7) in Fraunces & DM Sans
 * - Secondary typography: Muted sage (#B7C1A9)
 * - Accent: Earthy harvest gold (#D6C895)
 * - Fine dividers: Translucent cream (#F5F1E7/12)
 *
 * Vertical Rhythm:
 * 01 — TOP CONTACT AREA ("Better soil. Better tomorrow." + Direct email interaction)
 * 02 — THIN DIVIDER (Expanding scroll entrance)
 * 03 — REFINED NAVIGATION COLUMNS (4 editorial categories with fine underlines)
 * 04 — THIN DIVIDER (Expanding scroll entrance)
 * 05 — OFFICIAL LOGO + BRAND PHILOSOPHY (Transparent light logo on left + Monospace philosophy on right)
 * 06 — OVERSIZED NAATI ORGANICS WORDMARK (Responsive clamp, clean margins, vertical clip reveal)
 * 07 — BOTTOM LEGAL ROW (Copyright, verified links & smooth Back to Top trigger)
 */
export function SiteFooter({ className }: SiteFooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!footerRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // 1. "Better soil. Better tomorrow." reveals upward through a clean text mask
      footerTl.fromTo(
        '.footer-headline-mask',
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.75, ease: 'power3.out' }
      )
        // 2. Contact details enter gently
        .fromTo(
          '.footer-top-contact',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.45'
        )
        // 3. Divider line expands horizontally
        .fromTo(
          '.footer-divider-1',
          { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
        // 4. Navigation columns reveal with short stagger
        .fromTo(
          '.footer-nav-col',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' },
          '-=0.35'
        )
        // 5. Divider 2 expands horizontally
        .fromTo(
          '.footer-divider-2',
          { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, duration: 0.65, ease: 'power2.out' },
          '-=0.3'
        )
        // 6. Official footer logo reveals subtly & brand philosophy appears
        .fromTo(
          '.footer-brand-logo, .footer-brand-philosophy',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.35'
        )
        // 7. Oversized "NAATI ORGANICS" typography reveals upward through clipping mask
        .fromTo(
          '.footer-brand-title',
          { y: '105%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' },
          '-=0.25'
        )
        // 8. Bottom legal row becomes visible
        .fromTo(
          '.footer-legal-bar',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.4'
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    const prefersReduced = isReducedMotion();
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      data-nav-theme="dark"
      aria-label="Site Footer"
      className={cn(
        'relative w-full bg-[#142914] text-[#F5F1E7] overflow-hidden',
        'border-t border-[#F5F1E7]/10',
        className
      )}
    >
      <Container size="default">
        {/* =====================================================================
            01 — TOP CONTACT AREA
            Refined editorial statement with prominent interactive contact email
            ===================================================================== */}
        <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-end justify-between">
            {/* Left Statement Block */}
            <div className="footer-top-heading lg:col-span-7 xl:col-span-8">
              <span className="font-mono text-xs font-semibold text-[#D6C895] tracking-[0.22em] uppercase block mb-3 sm:mb-4 select-none">
                LET&apos;S GROW SOMETHING BETTER
              </span>
              <div className="overflow-hidden">
                <h2 className="footer-headline-mask font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-[#F5F1E7] tracking-[-0.025em] leading-[1.1] [text-wrap:balance] m-0">
                  Better soil.
                  <span className="block font-normal italic text-[#B7C1A9] mt-0.5">
                    Better tomorrow.
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Contact Block */}
            <div className="footer-top-contact lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right">
              <span className="font-mono text-xs font-semibold text-[#B7C1A9] tracking-[0.2em] uppercase block mb-2 select-none">
                HAVE A QUESTION?
              </span>

              {/* Verified Contact Email */}
              <a
                href={`mailto:${BRAND_CONFIG.socials.email}`}
                className="group/email inline-flex items-center gap-2 font-display text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-[#F5F1E7] hover:text-[#D6C895] transition-colors tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C895]/50 rounded py-0.5"
                aria-label={`Send email to ${BRAND_CONFIG.socials.email}`}
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover/email:after:w-full after:h-px after:bg-[#D6C895] after:transition-all after:duration-300">
                  {BRAND_CONFIG.socials.email}
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-[#D6C895] transition-transform duration-300 group-hover/email:translate-x-1 group-hover/email:-translate-y-1"
                  aria-hidden="true"
                />
              </a>

              {/* Direct Agronomy Advisory Link */}
              <Link
                href="/contact"
                className="font-sans text-xs sm:text-sm text-[#B7C1A9]/80 hover:text-[#D6C895] transition-colors mt-2.5 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6C895]"
              >
                <span>Agronomy Advisory &amp; Field Support ↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================================
            02 — THIN DIVIDER
            ===================================================================== */}
        <div className="footer-divider-1 w-full h-px bg-[#F5F1E7]/12 mb-10 sm:mb-12 lg:mb-14" />

        {/* =====================================================================
            03 — REFINED NAVIGATION COLUMNS
            Four balanced editorial categories: PRODUCTS, EXPLORE, COMPANY, RESOURCES
            ===================================================================== */}
        <div className="pb-10 sm:pb-12">
          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="footer-nav-col flex flex-col">
                {/* Monospace Column Label */}
                <h3 className="font-mono text-xs font-semibold text-[#D6C895] tracking-[0.22em] uppercase mb-4 sm:mb-5 select-none">
                  {column.heading}
                </h3>

                {/* Navigation Links List */}
                <ul className="space-y-3 sm:space-y-3.5 list-none p-0 m-0">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group/nav inline-flex items-center text-sm sm:text-[15px] font-sans text-[#B7C1A9] hover:text-[#F5F1E7] transition-all duration-200 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C895]/40 rounded"
                      >
                        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 group-hover/nav:after:w-full after:h-px after:bg-[#D6C895] after:transition-all after:duration-300 group-hover/nav:translate-x-0.5 transition-transform duration-200">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* =====================================================================
            04 — THIN DIVIDER
            ===================================================================== */}
        <div className="footer-divider-2 w-full h-px bg-[#F5F1E7]/12 mb-8 sm:mb-10" />

        {/* =====================================================================
            05 — OFFICIAL LOGO + BRAND PHILOSOPHY
            Official light-variant Naati Organics logo on left + Monospace philosophy on right
            ===================================================================== */}
        <div className="footer-brand-signature flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8">
          {/* Left: Official Naati Organics Logo (Transparent light variant on dark background) */}
          <div className="footer-brand-logo flex items-center">
            <Link
              href="/"
              className="group/logo inline-flex items-center transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C895]/50 rounded-sm"
              aria-label="Naati Organics Home"
            >
              <div className="relative w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] shrink-0">
                <Image
                  src="/assets/brand/naati-organics-logo-dark.png"
                  alt="Naati Organics Official Logo"
                  width={104}
                  height={104}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            </Link>
          </div>

          {/* Right: Brand Philosophy & Subtitle */}
          <div className="footer-brand-philosophy flex flex-col items-start sm:items-end text-left sm:text-right">
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-[0.24em] sm:tracking-[0.32em] text-[#D6C895] uppercase m-0">
              BUILD THE SOIL. FEED THE PLANT.
            </p>
            <span className="font-mono text-[11px] text-[#B7C1A9]/70 tracking-[0.18em] uppercase mt-1">
              SCIENTIFIC SOIL CARE · BIOLOGICAL PLANT NUTRITION
            </span>
          </div>
        </div>

        {/* =====================================================================
            06 — OVERSIZED NAATI ORGANICS BRAND WORDMARK
            Monumental editorial typography with responsive clamp and vertical mask reveal
            ===================================================================== */}
        <div className="footer-brand-section pb-8 sm:pb-12 pt-1 sm:pt-2">
          <div className="overflow-hidden w-full select-none">
            <h2 className="footer-brand-title font-display font-medium text-[#F5F1E7] tracking-tight sm:tracking-[-0.03em] leading-[0.88] uppercase m-0 text-center sm:text-left text-[clamp(2.4rem,8.2vw,8.5rem)] whitespace-normal sm:whitespace-nowrap break-words sm:break-normal">
              NAATI ORGANICS
            </h2>
          </div>
        </div>

        {/* =====================================================================
            07 — BOTTOM LEGAL ROW
            Minimal baseline bar with copyright, verified links & smooth Back to Top trigger
            ===================================================================== */}
        <div className="footer-legal-bar py-6 sm:py-8 border-t border-[#F5F1E7]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#B7C1A9]/75">
          {/* Left: Copyright */}
          <div className="text-center sm:text-left select-none">
            <span>© {currentYear} Naati Organics. All rights reserved.</span>
          </div>

          {/* Right: Functional Inquiries & Smooth Back to Top */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 sm:gap-6">
            <Link
              href="/contact"
              className="text-[#B7C1A9]/75 hover:text-[#F5F1E7] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6C895]"
            >
              Agronomy Advisory
            </Link>
            <Link
              href="/dealer-network"
              className="text-[#B7C1A9]/75 hover:text-[#F5F1E7] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6C895]"
            >
              Dealer Network
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="group/top inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#D6C895] hover:text-[#F5F1E7] transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6C895] py-0.5 cursor-pointer"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <span
                className="inline-block transition-transform duration-200 group-hover/top:-translate-y-1"
                aria-hidden="true"
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
