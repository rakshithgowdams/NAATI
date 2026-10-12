'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
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
      { label: 'Soil Academy', href: '/soil-academy' },
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
 * PREMIUM DARK EDITORIAL FOOTER
 *
 * High-end creative agency design adapted for Naati Organics:
 * - Deep forest green background (#142914) with data-nav-theme="dark"
 * - Warm ivory (#F5F1E7), soft muted green (#B7C1A9), and earthy gold (#D6C895) accents
 * - TOP: Strong brand statement + Prominent interactive email link with diagonal arrow
 * - MIDDLE: Compact 4-column editorial navigation with left-to-right underline draws
 * - SIGNATURE: Monumental oversized "NAATI ORGANICS" typography replacing any tiny logo arrangement
 * - BOTTOM: Slim legal bar + Smooth "Back to Top ↑" trigger
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
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Top statement reveals gently from below
      footerTl.fromTo(
        '.footer-top-heading',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        }
      );

      // 2. Contact link becomes visible
      footerTl.fromTo(
        '.footer-top-contact',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // 3. Navigation columns reveal with subtle stagger
      footerTl.fromTo(
        '.footer-nav-col',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // 4. Large brand signature reveals from vertical clip mask
      footerTl.fromTo(
        '.footer-brand-title',
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        '-=0.25'
      );

      // 5. Brand credo & bottom legal bar fade
      footerTl.fromTo(
        '.footer-brand-details, .footer-legal-bar',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
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
            01 — TOP CONTACT STATEMENT
            Strong editorial brand headline on left, interactive contact on right
            ===================================================================== */}
        <div className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start lg:items-end justify-between">
            {/* Left Statement Block */}
            <div className="footer-top-heading lg:col-span-7 xl:col-span-8">
              <span className="font-mono text-xs font-semibold text-[#D6C895] tracking-[0.22em] uppercase block mb-3 sm:mb-4 select-none">
                LET&apos;S GROW SOMETHING BETTER
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-[#F5F1E7] tracking-[-0.025em] leading-[1.12] [text-wrap:balance] m-0">
                Better soil.
                <span className="block font-normal italic text-[#B7C1A9] mt-0.5">
                  Better tomorrow.
                </span>
              </h2>
            </div>

            {/* Right Contact Block */}
            <div className="footer-top-contact lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right">
              <span className="font-mono text-xs font-semibold text-[#B7C1A9] tracking-[0.2em] uppercase block mb-2 sm:mb-2.5 select-none">
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
                className="font-sans text-xs sm:text-sm text-[#B7C1A9]/80 hover:text-[#D6C895] transition-colors mt-2 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6C895]"
              >
                <span>Agronomy Advisory & Field Support ↗</span>
              </Link>
            </div>
          </div>

          {/* Subtle Full-Width Divider */}
          <div className="w-full h-px bg-[#F5F1E7]/10 mt-12 sm:mt-14 lg:mt-16" />
        </div>

        {/* =====================================================================
            02 — COMPACT EDITORIAL NAVIGATION
            Four columns: PRODUCTS, EXPLORE, COMPANY, RESOURCES
            ===================================================================== */}
        <div className="pb-14 sm:pb-16 lg:pb-20">
          <nav
            aria-label="Footer Navigation"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="footer-nav-col flex flex-col">
                {/* Monospace Column Label */}
                <h3 className="font-mono text-xs font-semibold text-[#D6C895] tracking-[0.2em] uppercase mb-4 sm:mb-5 select-none">
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

          {/* Full-Width Divider into Brand Signature */}
          <div className="w-full h-px bg-[#F5F1E7]/10 mt-12 sm:mt-16" />
        </div>

        {/* =====================================================================
            03 — OVERSIZED NAATI ORGANICS BRAND SIGNATURE
            Monumental editorial typography replacing tiny logo arrangements.
            ===================================================================== */}
        <div className="footer-brand-section pb-12 sm:pb-16 pt-2 sm:pt-4">
          {/* Oversized Brand Typography with Responsive Clamp and Vertical Mask Reveal */}
          <div className="overflow-hidden w-full select-none">
            <h2 className="footer-brand-title font-display font-bold text-[#F5F1E7] tracking-tight sm:tracking-[-0.035em] leading-[0.85] uppercase m-0 text-[clamp(1.85rem,9.2vw,9.75rem)] whitespace-nowrap">
              NAATI ORGANICS
            </h2>
          </div>

          {/* Credo & Secondary Signature Line */}
          <div className="footer-brand-details mt-5 sm:mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5 border-t border-[#F5F1E7]/10">
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.38em] text-[#D6C895] uppercase m-0">
              BUILD THE SOIL. FEED THE PLANT.
            </p>
            <span className="font-mono text-[11px] text-[#B7C1A9]/65 tracking-[0.2em] uppercase">
              SCIENTIFIC SOIL CARE · BIOLOGICAL PLANT NUTRITION
            </span>
          </div>
        </div>

        {/* =====================================================================
            04 — BOTTOM LEGAL BAR
            Slim baseline row with real navigation and smooth Back to Top trigger
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
              className="group/top inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#D6C895] hover:text-[#F5F1E7] transition-colors uppercase tracking-wider focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D6C895] py-0.5"
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
