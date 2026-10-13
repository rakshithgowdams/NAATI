'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { DOWNLOADABLE_RESOURCES } from '@/data/resources';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface ResourceDownloadsProps {
  className?: string;
}

/**
 * FARMER KNOWLEDGE HUB — SECTION 05: DOWNLOADABLE FARMER RESOURCES
 *
 * Eyebrow: 04 / DOWNLOADS
 * Headline: "Useful knowledge. Always within reach."
 *
 * Design:
 * - Warm cream and deep forest-green publication-shelf composition
 * - Prominent visual showcase of the official Naati Organics Farmer Handbook mockup
 * - GSAP ScrollTrigger reveal animations across header, featured publication and document shelf
 * - English & Kannada editions clearly distinguished
 * - Real, honest publication status
 */
export function ResourceDownloads({ className }: ResourceDownloadsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredHandbook = DOWNLOADABLE_RESOURCES.find((d) => d.featured) || DOWNLOADABLE_RESOURCES[0];
  const otherResources = DOWNLOADABLE_RESOURCES.filter((d) => d.id !== featuredHandbook.id);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.downloads-head-anim',
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

      // 2. Featured publication reveal
      gsap.fromTo(
        '.downloads-featured-anim',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.downloads-featured-anim',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Document shelf cards
      gsap.fromTo(
        '.downloads-doc-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.downloads-doc-grid',
            start: 'top 88%',
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
      id="resource-downloads"
      data-nav-theme="light"
      aria-labelledby="resource-downloads-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="downloads-head-anim flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              04 / DOWNLOADS
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="resource-downloads-heading"
            className="downloads-head-anim font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
          >
            Useful knowledge. <br />
            <span className="italic font-light">Always within reach.</span>
          </h2>

          <p className="downloads-head-anim font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
            Printed handbooks, regional advisory publications and technical sheets distributed to farmers, growers and agronomy partners across South India.
          </p>
        </div>

        {/* Featured Publication Showcase: Farmer Handbook */}
        <div className="downloads-featured-anim grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white/70 border border-forest-deep/15 p-6 sm:p-10 lg:p-12 mb-12 lg:mb-16 shadow-warm-xs">
          {/* Publication Mockup Image */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-forest-deep flex items-center justify-center p-4">
            {featuredHandbook.image ? (
              <div className="relative w-full h-[320px] sm:h-[400px]">
                <Image
                  src={featuredHandbook.image}
                  alt={featuredHandbook.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-center drop-shadow-xl transition-transform duration-500 hover:scale-105"
                />
              </div>
            ) : (
              <div className="text-cream text-center font-mono text-xs">
                Official Farmer Publication
              </div>
            )}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-forest-deep text-cream text-[11px] font-mono tracking-wider uppercase">
              Official Edition
            </div>
          </div>

          {/* Publication Description & Status */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-forest-deep/60 mb-3">
                <span className="text-harvest font-semibold">{featuredHandbook.type}</span>
                <span>•</span>
                <span>{featuredHandbook.language}</span>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl text-forest-deep mb-2 leading-tight">
                {featuredHandbook.title}
              </h3>

              <p className="font-sans text-sm sm:text-base italic text-forest-deep/70 mb-4">
                {featuredHandbook.subtitle}
              </p>

              <div className="space-y-3 font-sans text-sm text-forest-deep/80 leading-relaxed mb-6 pt-2 border-t border-forest-deep/10">
                <p>
                  A complete field reference compiling fundamental soil physics, aggregate stability, earthworm biological management, root architecture, and the two-step Naati nutrition approach into a practical guide.
                </p>
                <div className="p-4 bg-forest-deep/5 border border-forest-deep/10 text-xs font-mono text-forest-deep/80 space-y-1.5">
                  <div className="font-semibold text-forest-deep uppercase tracking-wider">
                    Distribution & Availability Status:
                  </div>
                  <div>• {featuredHandbook.status}</div>
                  <div>• {featuredHandbook.distribution}</div>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-forest-deep/80">
                  <CheckCircle2 className="w-4 h-4 text-forest-deep" />
                  <span>Available in English & Kannada editions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-forest-deep/80">
                  <CheckCircle2 className="w-4 h-4 text-forest-deep" />
                  <span>Comprehensive crop dosage protocols included</span>
                </div>
              </div>
            </div>

            {/* Publication Action */}
            <div className="pt-4 border-t border-forest-deep/10 flex flex-wrap items-center gap-4">
              <Link
                href={featuredHandbook.actionHref}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.16em] hover:bg-forest hover:text-cream transition-all duration-300"
              >
                <span>{featuredHandbook.actionLabel}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/dealers"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono uppercase tracking-[0.15em] text-forest-deep hover:text-harvest transition-colors"
              >
                <span>Locate Regional Dealer ↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal Indexed Publication Shelf (Additional Documents) */}
        <div className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-forest-deep/60 pb-2 border-b border-forest-deep/10">
            Additional Technical Documents & Regional Editions
          </div>

          <div className="downloads-doc-grid grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {otherResources.map((res) => (
              <div
                key={res.id}
                className="downloads-doc-card bg-white/50 border border-forest-deep/15 p-6 flex flex-col justify-between hover:bg-white hover:shadow-warm-xs transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-forest-deep/60 mb-2">
                    <span className="font-semibold text-harvest">{res.language}</span>
                    <span className="text-[11px] uppercase tracking-wider">{res.format}</span>
                  </div>

                  <h4 className="font-display font-medium text-lg text-forest-deep mb-1">
                    {res.title}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-forest-deep/70 mb-4 leading-relaxed">
                    {res.subtitle}
                  </p>

                  <div className="text-[11px] font-mono text-forest-deep/60 pb-4 mb-4 border-b border-forest-deep/10">
                    Status: <span className="text-forest-deep">{res.status}</span>
                  </div>
                </div>

                <Link
                  href={res.actionHref}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] font-medium text-forest-deep hover:text-harvest transition-colors pt-2"
                >
                  <span>{res.actionLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
