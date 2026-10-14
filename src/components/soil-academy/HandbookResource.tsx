'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Languages, ArrowUpRight, Check, AlertCircle, Download, Presentation } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { HANDBOOK_INFO } from '@/data/soilAcademy';

export interface HandbookResourceProps {
  className?: string;
}

/**
 * SOIL ACADEMY — SECTION 06: FARMER HANDBOOK
 *
 * Premium Publication Showcase:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "05 / FREE LEARNING RESOURCES"
 * - Headline: "Knowledge worth taking to the field."
 * - Description: "The Naati Farmer Handbook brings together practical introductions to healthy soil, root development, balanced nutrition and the complete Naati approach."
 * - Supports English and Kannada language editions
 * - Verified publication presentation with honest digital publication status (no broken links)
 * - Action to request printed copy through the agricultural advisory network
 */
export function HandbookResource({ className }: HandbookResourceProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'kn'>('en');

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.handbook-header',
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
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
      id="farmer-handbook"
      data-nav-theme="light"
      aria-labelledby="handbook-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* Header */}
        <div className="handbook-header max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              05 / FREE LEARNING RESOURCES
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
              FIELD GUIDEBOOK
            </span>
          </div>

          <h2
            id="handbook-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Knowledge worth taking to the field.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
            The Naati Farmer Handbook brings together practical introductions to healthy soil, root development, balanced nutrition and the complete Naati approach.
          </p>
        </div>

        {/* =====================================================================
            HANDBOOK SHOWCASE DISPLAY
            ===================================================================== */}
        <div
          ref={cardRef}
          className="rounded-3xl bg-white border border-forest-deep/15 overflow-hidden shadow-warm-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left: Book Mockup Photograph (Col 1 to 5) */}
            <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] lg:min-h-full overflow-hidden bg-forest-deep">
              <Image
                src="/assets/images/soil-academy/farmer-handbook-mockup.jpg"
                alt="Naati Organics Farmer Handbook printed hardcover publication resting on rustic wooden table"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={90}
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-transparent"
                aria-hidden="true"
              />

              {/* Cover Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-10 bg-forest-deep/85 backdrop-blur-md p-4 rounded-xl border border-cream/20 text-cream">
                <span className="font-mono text-[11px] uppercase tracking-wider text-harvest font-semibold block mb-0.5">
                  OFFICIAL AGRONOMIC PUBLICATION
                </span>
                <span className="font-display text-sm font-medium tracking-tight">
                  NAATI ORGANICS FARMER HANDBOOK · SOIL HEALTH & CROP NUTRITION
                </span>
              </div>
            </div>

            {/* Right: Handbook Specs & Language Editions (Col 6 to 12) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14">
              <div>
                {/* Language Switcher Tabs */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="font-mono text-xs uppercase tracking-wider text-forest-deep/60 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-forest-medium" /> LANGUAGE EDITION:
                  </span>
                  <div className="inline-flex rounded-full bg-forest-deep/5 p-1 border border-forest-deep/10">
                    <button
                      type="button"
                      onClick={() => setSelectedLanguage('en')}
                      className={cn(
                        'px-4 py-1.5 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all',
                        selectedLanguage === 'en'
                          ? 'bg-forest-deep text-cream shadow-xs'
                          : 'text-forest-deep/70 hover:text-forest-deep'
                      )}
                    >
                      ENGLISH
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedLanguage('kn')}
                      className={cn(
                        'px-4 py-1.5 rounded-full font-sans text-xs font-bold tracking-wider transition-all',
                        selectedLanguage === 'kn'
                          ? 'bg-forest-deep text-cream shadow-xs'
                          : 'text-forest-deep/70 hover:text-forest-deep'
                      )}
                    >
                      ಕನ್ನಡ (KANNADA)
                    </button>
                  </div>
                </div>

                {/* Edition Details based on active language */}
                {selectedLanguage === 'en' ? (
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest-medium block mb-2">
                      OFFICIAL ADVISORY EDITION · ENGLISH
                    </span>
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl text-forest-deep mb-3">
                      Farmer Handbook: Soil Health & Crop Nutrition
                    </h3>
                    <p className="font-sans text-base text-forest-deep/80 leading-relaxed mb-6">
                      A structured field guide detailing the living subterranean ecosystem, the principles of biological aggregation, root-zone moisture holding, and sustainable crop nutrition.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest-medium block mb-2">
                      ಪ್ರಾದೇಶಿಕ ಆವೃತ್ತಿ · ಕನ್ನಡ
                    </span>
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl text-forest-deep mb-3">
                      ನಾಟಿ ಆರ್ಗ್ಯಾನಿಕ್ಸ್ ರೈತ ಮಾರ್ಗದರ್ಶಿ ಪುಸ್ತಕ
                    </h3>
                    <p className="font-sans text-base text-forest-deep/80 leading-relaxed mb-6">
                      ಮಣ್ಣಿನ ಫಲವತ್ತತೆ, ಜೈವಿಕ ಸಾರವರ್ಧನೆ, ಬೇರಿನ ಬೆಳವಣಿಗೆ ಮತ್ತು ಸಮತೋಲಿತ ಪೋಷಕಾಂಶಗಳ ನಿರ್ವಹಣೆ ಕುರಿತು ಸಮಗ್ರ ಕೃಷಿ ಮಾರ್ಗದರ್ಶಿ.
                    </p>
                  </div>
                )}

                {/* Handbook Content Outline */}
                <div className="space-y-3 pt-6 border-t border-forest-deep/15 mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/70 block mb-2">
                    HANDBOOK CHAPTERS INCLUDE:
                  </span>
                  {[
                    'Chapter 01: Physical & Biological Dimensions of Soil',
                    'Chapter 02: Earthworms, Mycorrhizae & Rhizosphere Microflora',
                    'Chapter 03: Root Architecture & Mineral Absorption Dynamics',
                    'Chapter 04: The Two-Step Approach: Build the Soil, Feed the Plant',
                  ].map((ch, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-forest-medium/20 text-forest-medium flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-sans text-sm text-forest-deep/80">{ch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Real Action */}
              <div className="pt-6 border-t border-forest-deep/15">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-forest-deep/5 border border-forest-deep/10 mb-6">
                  <AlertCircle className="w-4 h-4 text-forest-medium shrink-0 mt-0.5" />
                  <div className="text-xs font-sans text-forest-deep/75 leading-relaxed">
                    <strong>Publication Status:</strong> The official Naati Organics Farmer Handbook is now available for immediate digital download in full-fidelity PDF and presentation PPTX formats. High-quality printed editions are also distributed at Naati regional farmer workshops.
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="/downloads/Naati-Farmers-Handbook.pdf"
                    download="Naati-Farmers-Handbook.pdf"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-forest-deep text-cream font-sans text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-forest-medium hover:shadow-warm-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-deep"
                  >
                    <Download className="w-4 h-4 text-harvest" />
                    <span>Download Handbook (PDF · 4.5 MB)</span>
                  </a>

                  <a
                    href="/downloads/Naati-Farmers-Handbook.pptx"
                    download="Naati-Farmers-Handbook.pptx"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-forest-deep/20 bg-white text-forest-deep font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:bg-cream hover:border-forest-deep"
                  >
                    <Presentation className="w-4 h-4 text-olive" />
                    <span>Download Slides (PPTX · 48 MB)</span>
                  </a>

                  <Link
                    href="/contact?subject=farmer-handbook"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-forest-deep/75 hover:text-forest-deep transition-colors py-2 px-1"
                  >
                    <span>Request Print Edition ↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
