'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Check, BookOpen, Clock } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { ESSENTIAL_LESSONS, AcademyLesson } from '@/data/soilAcademy';

export interface LessonIndexProps {
  className?: string;
}

/**
 * SOIL ACADEMY — SECTION 02: START HERE / FIVE ESSENTIAL LESSONS
 *
 * Premium Editorial Lesson Index:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Section label: "01 / START HERE"
 * - Headline: "Learn farming from the soil up."
 * - Top: Featured Lesson 01 spotlight with high-res photograph and comprehensive overview
 * - Bottom: Elegant numbered editorial index (Lessons 02 to 05) with interactive disclosure
 * - In-page curriculum overview disclosure (no empty pages or fabricated articles)
 */
export function LessonIndex({ className }: LessonIndexProps) {
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const featuredLesson = ESSENTIAL_LESSONS[0];
  const remainingLessons = ESSENTIAL_LESSONS.slice(1);

  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.lesson-index-header',
        { opacity: 0, y: 24 },
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

      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        '.lesson-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.lesson-rows-list',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const toggleLesson = (id: string) => {
    setExpandedLessonId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="five-lessons"
      data-nav-theme="light"
      aria-labelledby="lessons-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="lesson-index-header max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              01 / START HERE
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
            <span className="font-mono text-xs tracking-wider uppercase text-forest-deep/60 hidden sm:inline-block">
              FOUNDATIONAL CURRICULUM
            </span>
          </div>

          <h2
            id="lessons-heading"
            className="font-display font-medium text-[clamp(2.35rem,4.4vw,4rem)] leading-[1.08] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Learn farming from the soil up.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
            Five essential lessons to help you understand the foundations of soil and crop nutrition.
          </p>
        </div>

        {/* =====================================================================
            FEATURED LESSON 01 SPOTLIGHT (Architectural Presentation)
            ===================================================================== */}
        <div
          ref={featuredRef}
          className="relative rounded-3xl bg-white border border-forest-deep/15 overflow-hidden shadow-warm-sm mb-16 sm:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            {/* Left Column: Lesson Content (Col 1 to 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-forest-medium bg-forest-medium/10 px-3 py-1 rounded-full">
                    FEATURED STARTING POINT · LESSON {featuredLesson.number}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-forest-deep/60">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredLesson.readingTime}</span>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-forest-deep tracking-tight mb-3">
                  {featuredLesson.title}
                </h3>

                <p className="font-display italic text-lg sm:text-xl text-forest-medium mb-5">
                  &ldquo;{featuredLesson.summary}&rdquo;
                </p>

                <p className="font-sans text-base text-forest-deep/80 leading-relaxed mb-8 [text-wrap:pretty]">
                  {featuredLesson.overview}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-3 pt-6 border-t border-forest-deep/15 mb-8">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/70 block mb-2">
                    CORE TAKEAWAYS FOR GROWERS:
                  </span>
                  {featuredLesson.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-forest-medium/20 text-forest-medium flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-sans text-sm text-forest-deep/80 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-forest-deep/15 flex items-center justify-between">
                <span className="font-mono text-xs text-forest-deep/50 uppercase tracking-wider">
                  CURRICULUM MODULE: SOIL SCIENCE ESSENTIALS
                </span>
                <button
                  type="button"
                  onClick={() => toggleLesson(featuredLesson.id)}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-forest-deep hover:text-forest-medium transition-colors"
                >
                  <span>{expandedLessonId === featuredLesson.id ? 'Collapse Notes' : 'Inspect Full Outline'}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform duration-300',
                      expandedLessonId === featuredLesson.id ? 'rotate-180' : ''
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Photography (Col 8 to 12) */}
            <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-forest-deep/5">
              <Image
                src={featuredLesson.imageSrc || '/assets/images/soil-academy/soil-macro-hands.jpg'}
                alt={featuredLesson.imageAlt || 'Macro soil held in farmer hands'}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                quality={90}
                className="object-cover object-center"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent lg:hidden"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-forest-deep/85 backdrop-blur-md px-4 py-3 rounded-xl border border-cream/20 text-cream">
                <span className="font-mono text-[11px] uppercase tracking-wider text-harvest font-semibold block mb-0.5">
                  DOCUMENTARY LESSON ARCHIVE
                </span>
                <span className="font-display text-sm font-medium tracking-tight">
                  Lesson 01 · Why Soil Health Matters
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Full Outline Drawer */}
          {expandedLessonId === featuredLesson.id && (
            <div className="p-6 sm:p-10 bg-cream/30 border-t border-forest-deep/15">
              <div className="max-w-3xl">
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-forest-deep mb-3">
                  COMPREHENSIVE LESSON SYLLABUS & MANUSCRIPT OVERVIEW
                </h4>
                <p className="font-sans text-sm sm:text-base text-forest-deep/85 leading-relaxed mb-4">
                  In modern agriculture, soil is frequently reduced to a physical anchor for root anchorage and chemical inputs. This lesson establishes the biological paradigm: soil is a living sponge consisting of weathered mineral sand, silt, and clay bound together by microscopic biological polymers into resilient aggregates.
                </p>
                <div className="p-4 rounded-xl bg-forest-deep/5 border border-forest-deep/10 font-mono text-xs text-forest-deep/70">
                  Status: Foundational Syllabus Active · Extended interactive article manuscript in preparation for Phase 07 release.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================================
            LESSONS 02 TO 05 EDITORIAL NUMBERED INDEX
            ===================================================================== */}
        <div className="lesson-rows-list">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-forest-deep/15">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/60">
              PROGRESSION INDEX (LESSONS 02 — 05)
            </span>
            <span className="font-mono text-xs text-forest-deep/50 hidden sm:inline">
              SELECT ANY LESSON TO INSPECT CORE THEMES
            </span>
          </div>

          <div className="divide-y divide-forest-deep/15">
            {remainingLessons.map((lesson) => {
              const isExpanded = expandedLessonId === lesson.id;
              return (
                <div
                  key={lesson.id}
                  className="lesson-row py-6 sm:py-8 transition-colors group"
                >
                  <button
                    type="button"
                    onClick={() => toggleLesson(lesson.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-start sm:items-center justify-between gap-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-medium/50 rounded-lg p-2 -m-2"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline w-full">
                      {/* Number */}
                      <div className="sm:col-span-2 flex items-center gap-3">
                        <span className="font-mono text-base sm:text-lg font-bold text-forest-medium/70 group-hover:text-forest-medium transition-colors">
                          LESSON {lesson.number}
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <div className="sm:col-span-7">
                        <h4 className="font-display font-medium text-xl sm:text-2xl text-forest-deep group-hover:text-forest-medium transition-colors leading-snug mb-1">
                          {lesson.title}
                        </h4>
                        <p className="font-sans text-sm sm:text-base text-forest-deep/70 leading-relaxed">
                          &ldquo;{lesson.summary}&rdquo;
                        </p>
                      </div>

                      {/* Metadata */}
                      <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-4 text-forest-deep/50">
                        <span className="font-mono text-xs tracking-wider uppercase">
                          {lesson.readingTime}
                        </span>
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full border border-forest-deep/20 flex items-center justify-center transition-all duration-300 shrink-0',
                            isExpanded
                              ? 'bg-forest-deep text-cream rotate-180'
                              : 'group-hover:border-forest-deep group-hover:bg-forest-deep/5 text-forest-deep'
                          )}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable Curriculum Drawer */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-forest-deep/10 bg-white/70 p-6 sm:p-8 rounded-2xl border">
                      <div className="max-w-3xl">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-medium block mb-2">
                          LESSON {lesson.number} SYLLABUS OVERVIEW
                        </span>
                        <p className="font-sans text-base text-forest-deep/85 leading-relaxed mb-6">
                          {lesson.overview}
                        </p>

                        <div className="space-y-2 mb-6">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-deep/70 block mb-2">
                            KEY LEARNING POINTS:
                          </span>
                          {lesson.keyPoints.map((pt, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-forest-medium mt-2 shrink-0" />
                              <span className="font-sans text-sm text-forest-deep/80">
                                {pt}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-forest-deep/10">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-forest-deep/50">
                            Curriculum Status: Source Outline Grounded · Full manuscript in development
                          </span>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest-medium flex items-center gap-1">
                            <span>Interactive Module</span>
                            <BookOpen className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
