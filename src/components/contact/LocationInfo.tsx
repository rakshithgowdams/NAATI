'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ArrowUpRight } from 'lucide-react';
import { VERIFIED_CONTACT_INFO } from '@/data/contact';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface LocationInfoProps {
  className?: string;
}

/**
 * CONTACT & ENQUIRY — SECTION 04: LOCATION & COMPANY PRESENCE
 *
 * Eyebrow: 03 / FIND US
 * Headline: "Rooted in purpose. Open to conversation."
 *
 * Restrained Editorial Presence:
 * - Highlights regional headquarters in Bengaluru, Karnataka, India
 * - Direct connection to verified regional dealer network across Karnataka and South India
 * - GSAP ScrollTrigger reveal for heading and information card
 * - Avoids decorative fake maps or invented street addresses
 */
export function LocationInfo({ className }: LocationInfoProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Heading entrance
      gsap.fromTo(
        '.location-head-anim',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Info Card entrance
      gsap.fromTo(
        '.location-card-anim',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.location-card-anim',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location-info"
      data-nav-theme="light"
      aria-labelledby="location-info-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Heading (6 Cols) */}
          <div className="lg:col-span-6">
            <div className="location-head-anim flex items-center gap-3 mb-4">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
                03 / FIND US
              </span>
              <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
            </div>

            <h2
              id="location-info-heading"
              className="location-head-anim font-display font-medium text-3xl sm:text-4xl lg:text-4xl tracking-tight text-forest-deep leading-[1.15]"
            >
              Rooted in purpose. <br />
              <span className="italic font-light">Open to conversation.</span>
            </h2>

            <p className="location-head-anim font-sans text-sm sm:text-base text-forest-deep/75 mt-4 leading-relaxed max-w-lg">
              Headquartered in Bengaluru with agricultural field presence, dealer outlets, and agronomic advisory support throughout key growing belts in South India.
            </p>
          </div>

          {/* Right Column: Verified Editorial Info Block (6 Cols) */}
          <div className="location-card-anim lg:col-span-6 bg-white/70 border border-forest-deep/15 p-6 sm:p-8 lg:p-10 space-y-6 shadow-warm-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-forest-deep/5 border border-forest-deep/15 flex items-center justify-center text-forest-deep shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-harvest" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-forest-deep/60 block mb-1">
                  Regional Headquarters
                </span>
                <h3 className="font-display font-medium text-xl sm:text-2xl text-forest-deep">
                  {VERIFIED_CONTACT_INFO.headquarters}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-forest-deep/70 mt-1">
                  South India Agricultural Advisory & Commercial Operations
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-forest-deep/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-forest-deep/75">
                <Navigation className="w-3.5 h-3.5 text-harvest" />
                <span>Operating across Karnataka, Tamil Nadu, Andhra Pradesh & Telangana</span>
              </div>

              <Link
                href="/dealer-network"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] font-medium text-forest-deep hover:text-harvest transition-colors shrink-0"
              >
                <span>Locate Dealer Network</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
