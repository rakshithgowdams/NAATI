'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clapperboard, Compass } from 'lucide-react';
import { VIDEO_TOPICS } from '@/data/resources';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface VideoLibraryProps {
  className?: string;
}

/**
 * FARMER KNOWLEDGE HUB — SECTION 04: WATCH & LEARN
 *
 * Eyebrow: 03 / PRACTICAL LEARNING
 * Headline: "See how knowledge grows."
 *
 * Authentic handling:
 * - Highlights the comprehensive video learning curriculum currently being filmed in Karnataka fields
 * - Honest status: "In Field Production" / "Curriculum Ready"
 * - GSAP ScrollTrigger reveal animations across header, syllabus cards and callout
 * - Directs visitors to immediate interactive equivalents in the Soil Academy
 */
export function VideoLibrary({ className }: VideoLibraryProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        '.video-head-anim',
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

      // 2. Syllabus cards staggered entrance
      gsap.fromTo(
        '.video-card-anim',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.video-cards-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Callout banner entrance
      gsap.fromTo(
        '.video-callout-anim',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.video-callout-anim',
            start: 'top 90%',
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
      id="video-library"
      data-nav-theme="light"
      aria-labelledby="video-library-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="video-head-anim flex items-center gap-3 mb-4">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
                03 / PRACTICAL LEARNING
              </span>
              <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
            </div>

            <h2
              id="video-library-heading"
              className="video-head-anim font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
            >
              See how knowledge grows.
            </h2>

            <p className="video-head-anim font-sans text-base sm:text-lg text-forest-deep/75 mt-4 leading-relaxed">
              Our agronomists and field researchers are filming documentary demonstrations across South Indian farms. Explore the core curriculum below.
            </p>
          </div>

          {/* Quick Notice Badge */}
          <div className="video-head-anim inline-flex items-center gap-3 px-4 py-2.5 bg-white/70 border border-forest-deep/15 text-xs font-mono text-forest-deep/80 shrink-0 shadow-warm-xs">
            <Clapperboard className="w-4 h-4 text-forest-deep" />
            <span>Field Video Series • In Active Production</span>
          </div>
        </div>

        {/* Video Syllabus Grid */}
        <div className="video-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {VIDEO_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="video-card-anim flex flex-col justify-between bg-white/50 border border-forest-deep/15 p-6 sm:p-7 transition-all duration-300 hover:bg-white hover:border-forest-deep/30 hover:shadow-warm-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-forest-deep/60 mb-4 pb-2 border-b border-forest-deep/10">
                  <span className="font-semibold text-harvest">EPISODE {topic.number}</span>
                  <span className="inline-block px-2 py-0.5 bg-forest-deep/5 text-forest-deep/80 text-[10px] uppercase tracking-wider">
                    {topic.status}
                  </span>
                </div>

                <h3 className="font-display font-medium text-xl text-forest-deep mb-3 leading-snug">
                  {topic.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-forest-deep/75 leading-relaxed mb-6">
                  {topic.syllabus}
                </p>
              </div>

              {/* Action: Study Topic Now in Academy */}
              <div className="pt-4 border-t border-forest-deep/10">
                <Link
                  href={topic.relatedHref}
                  className="group inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-[0.12em] font-medium text-forest-deep hover:text-harvest transition-colors"
                >
                  <span>Learn in Soil Academy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Transition Callout */}
        <div className="video-callout-anim bg-forest-deep text-cream p-8 sm:p-10 lg:p-12 border border-forest-deep flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-warm-md">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-harvest text-xs font-mono uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4" />
              <span>Interactive Learning Alternative</span>
            </div>
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-cream mb-2">
              Looking to study soil concepts today?
            </h3>
            <p className="font-sans text-sm sm:text-base text-cream/75 leading-relaxed">
              Explore the five structured lessons and the signature interactive Living Soil Explorer inside the Naati Soil Academy.
            </p>
          </div>

          <Link
            href="/soil-academy"
            className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-harvest text-forest-deep text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-cream transition-all duration-300 shrink-0"
          >
            <span>ENTER SOIL ACADEMY</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
