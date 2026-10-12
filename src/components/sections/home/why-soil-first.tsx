'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface WhySoilFirstProps {
  className?: string;
}

/**
 * HOMEPAGE SECTION 03 — WHY SOIL FIRST?
 * 
 * Compact, high-impact editorial brand chapter structured in three focused parts:
 * - PART A: Opening Philosophy + Compact Question Transition
 *   ("Don't chase the symptoms." -> scroll-driven transformation to "How do we make this soil healthier?")
 * - PART B: Farmer Photograph + Short Statement
 *   (Master documentary photo + "When we care for the soil, we care for the crop.")
 * - PART C: Signature Closing Quote
 *   ("Healthy soil isn't an expense. It's the greatest investment a farmer can make.")
 */
export function WhySoilFirst({ className }: WhySoilFirstProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const questionWrapperRef = useRef<HTMLDivElement>(null);
  const questionPinRef = useRef<HTMLDivElement>(null);
  const q1Ref = useRef<HTMLDivElement>(null);
  const q2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // =======================================================================
      // 1. PART A: Opening Entrance Animation
      // =======================================================================
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.part-a-trigger',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      introTl
        .fromTo(
          '.part-a-eyebrow',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
        )
        .fromTo(
          '.part-a-line-1',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.part-a-line-2',
          { opacity: 0, scale: 0.97, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          '.part-a-sub',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        );

      // =======================================================================
      // 2. PART A: Compact "Change the Question" Scroll Transition
      // Desktop: Pinned crisp stage (~30% viewport)
      // Mobile: Smooth unpinned scroll-scrubbed transition with zero dead space
      // =======================================================================
      if (
        questionWrapperRef.current &&
        questionPinRef.current &&
        q1Ref.current &&
        q2Ref.current
      ) {
        const isMobile = window.innerWidth < 768;

        const questionTl = gsap.timeline({
          scrollTrigger: {
            trigger: questionWrapperRef.current,
            start: isMobile ? 'top 65%' : 'top top',
            end: isMobile ? 'bottom 35%' : '+=30%',
            pin: isMobile ? false : questionPinRef.current,
            pinSpacing: !isMobile,
            scrub: 0.4,
            anticipatePin: isMobile ? 0 : 1,
            invalidateOnRefresh: true,
          },
        });

        // Question 1 travels upward and softens
        questionTl.to(
          q1Ref.current,
          {
            y: isMobile ? -30 : -55,
            opacity: 0,
            scale: 0.96,
            ease: 'none',
            duration: 0.42,
          },
          0
        );

        // Question 2 rises from below and takes center stage as dominant statement
        questionTl.fromTo(
          q2Ref.current,
          {
            y: isMobile ? 35 : 65,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            duration: 0.52,
          },
          0.18
        );
      }

      // =======================================================================
      // 3. PART B: Farmer Photo Mask & Statement Entrance
      // =======================================================================
      gsap.fromTo(
        '.part-b-photo',
        { clipPath: 'inset(4% 3% 4% 3% round 6px)', opacity: 0.6 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.part-b-photo',
            start: 'top 82%',
            end: 'top 50%',
            scrub: 0.4,
          },
        }
      );

      gsap.fromTo(
        '.part-b-text',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.part-b-text',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // =======================================================================
      // 4. PART C: Signature Closing Quote Reveal
      // =======================================================================
      const quoteTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.part-c-quote',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      quoteTl
        .fromTo(
          '.part-c-eyebrow',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        )
        .fromTo(
          '.part-c-line-1',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(
          '.part-c-line-2',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.part-c-attr',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-soil-first"
      data-nav-theme="dark"
      aria-label="Why Soil First — We don't believe in chasing symptoms. We believe in solving the root cause."
      className={cn('relative w-full overflow-hidden select-none bg-forest-deep', className)}
    >
      {/* =========================================================================
          PART A — OPENING PHILOSOPHY & COMPACT QUESTION TRANSITION
          Deep forest-green background, compact spacing, asymmetrical typography
          ========================================================================= */}
      <div
        data-nav-theme="dark"
        className="part-a-trigger relative w-full bg-forest-deep text-cream pt-14 sm:pt-16 md:pt-20 pb-8 sm:pb-10 px-5 sm:px-8 md:px-12 lg:px-16"
      >
        <Container size="wide">
          <div className="max-w-4xl">
            {/* Small Monospaced Eyebrow */}
            <div className="part-a-eyebrow inline-flex items-center gap-2 mb-3.5 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
                03 / WHY SOIL FIRST?
              </span>
            </div>

            {/* Asymmetrical Display Headline */}
            <h2 className="tracking-[-0.035em] leading-[1.05]">
              <span className="part-a-line-1 block font-display font-medium text-[clamp(2.15rem,4.2vw,3.75rem)] text-cream">
                Don&apos;t chase the symptoms.
              </span>
              <span className="part-a-line-2 block mt-2 sm:mt-2.5 font-display font-bold italic text-harvest-light text-[clamp(2.4rem,4.8vw,4.25rem)]">
                Understand the root cause.
              </span>
            </h2>

            {/* Supporting Philosophy Quote (No redundant phrase repetition) */}
            <div className="part-a-sub max-w-xl mt-5 sm:mt-7 border-l-2 border-harvest/40 pl-4 sm:pl-6">
              <p className="font-sans text-sm sm:text-base text-cream-muted/90 leading-relaxed [text-wrap:pretty]">
                When crops struggle, chemical quick-fixes only mask subterranean degradation.
                Lasting agricultural resilience begins by restoring living soil biology and root structure.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* COMPACT QUESTION TRANSITION SCENE
          Single shared visual stage where Question 2 replaces Question 1 in-place */}
      <div
        ref={questionWrapperRef}
        data-nav-theme="dark"
        className="relative w-full bg-[#152611] text-cream"
      >
        <div
          ref={questionPinRef}
          className="relative w-full h-[42vh] sm:h-[46vh] min-h-[290px] max-h-[440px] flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden"
        >
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-transparent to-forest-deep/80 pointer-events-none" />

          {/* Centered Grid Stage — Both questions occupy the exact same optical center */}
          <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 grid-rows-1 items-center justify-items-center text-center">
            {/* QUESTION 01 (Initial State: Visible; Scrolls Upward and Softens) */}
            <div
              ref={q1Ref}
              className="col-start-1 row-start-1 will-change-transform flex flex-col items-center"
            >
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-cream-muted/70 mb-2.5 sm:mb-3 block">
                INSTEAD OF ASKING
              </span>
              <p className="font-display font-medium text-[clamp(1.75rem,3.4vw,2.75rem)] text-cream-muted/85 leading-[1.12] tracking-[-0.03em] [text-wrap:balance]">
                &ldquo;How do we make this crop greener?&rdquo;
              </p>
            </div>

            {/* QUESTION 02 (Rises from Below & Dominates Same Visual Stage) */}
            <div
              ref={q2Ref}
              className="col-start-1 row-start-1 will-change-transform flex flex-col items-center opacity-0"
            >
              <div className="inline-flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" />
                <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-harvest">
                  WE ASK
                </span>
              </div>
              <p className="font-display font-bold italic text-[clamp(1.85rem,3.8vw,3.15rem)] text-harvest leading-[1.06] tracking-[-0.035em] [text-wrap:balance] drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                &ldquo;How do we make this soil healthier?&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PART B — FARMER PHOTOGRAPH + SHORT STATEMENT
          Desktop: Large photograph on left (58% width), strong editorial statement on right
          ========================================================================= */}
      <div
        data-nav-theme="dark"
        className="relative w-full bg-forest-deep text-cream py-10 sm:py-14 md:py-18 px-5 sm:px-8 md:px-12 lg:px-16"
      >
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Master Photographic Spread (~58% Width on Desktop) */}
            <div className="lg:col-span-7">
              <div className="part-b-photo relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-subtle bg-[#1a2d15] shadow-warm-lg">
                <Image
                  src="/assets/images/home/living-soil-engine.jpg"
                  alt="Cross-section of rich dark living agricultural soil with healthy crop seedling, extensive fibrous root system, and active soil biology"
                  fill
                  priority={false}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Strong Editorial Statement + Supporting Text */}
            <div className="part-b-text lg:col-span-5 flex flex-col justify-center space-y-3.5 sm:space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-harvest">
                  THE LIVING FOUNDATION
                </span>
              </div>

              <h3 className="font-display font-medium text-xl sm:text-2xl md:text-3xl text-cream leading-[1.18] tracking-[-0.025em] [text-wrap:pretty]">
                When we care for the soil, we care for the crop.
              </h3>

              <p className="font-sans text-sm sm:text-base text-cream-muted/90 leading-relaxed [text-wrap:pretty]">
                Healthy soil supports stronger roots, beneficial biological activity,
                and the conditions plants need to grow.
              </p>

              <div className="pt-1.5">
                <div className="w-12 h-px bg-harvest/40" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* =========================================================================
          PART C — SIGNATURE CLOSING QUOTE
          Deep forest-green environment maintaining dark section theme identity
          ========================================================================= */}
      <div
        data-nav-theme="dark"
        className="part-c-quote relative w-full bg-[#182d14] text-cream py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 lg:px-16 border-t border-cream/10 scroll-mt-28"
      >
        <Container size="narrow" className="text-center">
          {/* Eyebrow Attribution */}
          <div className="part-c-eyebrow inline-flex items-center gap-2 mb-3.5 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-harvest" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
              THE SOIL-FIRST PRINCIPLE
            </span>
          </div>

          {/* Exact Signature Client Quote */}
          <blockquote className="font-display text-[clamp(1.75rem,3.4vw,2.85rem)] font-medium text-cream leading-[1.12] tracking-[-0.03em] [text-wrap:balance]">
            <span className="part-c-line-1 block">
              &ldquo;Healthy soil isn&apos;t an expense.
            </span>
            <span className="part-c-line-2 block mt-1.5 sm:mt-2.5 font-bold italic text-harvest">
              It&apos;s the greatest investment a farmer can make.&rdquo;
            </span>
          </blockquote>

          {/* Minimal Brand Attribution */}
          <div className="part-c-attr mt-5 sm:mt-7 flex items-center justify-center gap-3 text-cream-muted/70 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase">
            <div className="w-6 h-px bg-cream/20" />
            <span>NAATI ORGANICS</span>
            <div className="w-6 h-px bg-cream/20" />
          </div>
        </Container>
      </div>
    </section>
  );
}
