'use client';

import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { PARTNERSHIP_STAGES } from '@/data/dealerNetwork';
import { cn } from '@/lib/utils/cn';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';

export interface PartnershipJourneyProps {
  className?: string;
}

/**
 * DEALER & DISTRIBUTOR NETWORK — SECTION 04: THE PARTNERSHIP JOURNEY
 *
 * Eyebrow: 03 / GETTING STARTED
 * Headline: "Every partnership begins with a conversation."
 * Concept: "THE GROWTH PATH"
 *
 * Modern Creative Steps UI:
 * - Desktop (>= 1024px): Connected, slightly staggered 4-step editorial staircase with large expressive
 *   numerals, fine panel separation, animated S-curve connectors, and natural scroll-driven progression.
 * - Mobile & Tablet (< 1024px): Dedicated vertical editorial stepper with animated continuous connecting line.
 * - Natural non-pinned scroll progression: REVEAL -> HIGHLIGHT -> CONNECT -> CONTINUE.
 * - Grounded framing: Explains exploratory dialogue without false promises or artificial approval hurdles.
 */
export function PartnershipJourney({ className }: PartnershipJourneyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const processContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Section Header Entrance Animation
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        headerTl
          .fromTo(
            headerRef.current.querySelector('.journey-eyebrow'),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          )
          .fromTo(
            headerRef.current.querySelector('.journey-heading'),
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            '-=0.25'
          )
          .fromTo(
            headerRef.current.querySelector('.journey-desc'),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.35'
          );
      }

      const mm = gsap.matchMedia();

      // =======================================================================
      // DESKTOP: STAGGERED EDITORIAL STAIRCASE WITH PROGRESSION CONNECTORS (>= 1024px)
      // Natural page-scroll driven timeline without locking or pinning
      // =======================================================================
      mm.add('(min-width: 1024px)', () => {
        if (!processContainerRef.current) return;

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: processContainerRef.current,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        });

        // Initial Milestone 01 starts emphasized
        masterTl
          .to('.step-card-0', {
            borderColor: 'rgba(27, 48, 34, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 28px -6px rgba(27, 48, 34, 0.09)',
            duration: 0.15,
          })
          .to('.step-num-0', { color: '#1B3022', duration: 0.15 }, '<')
          .to(
            '.step-badge-0',
            { backgroundColor: 'rgba(200, 138, 54, 0.15)', color: '#C88A36', duration: 0.15 },
            '<'
          )

          // Pathway 0 -> 1 draws toward Step 02
          .to(
            '.step-connector-path-0',
            { strokeDashoffset: 0, duration: 0.25, ease: 'none' },
            '+=0.04'
          )
          .to('.step-connector-notch-0', { borderColor: '#C88A36', duration: 0.1 }, '-=0.08')

          // Milestone 02 activates
          .to('.step-card-1', {
            opacity: 1,
            borderColor: 'rgba(27, 48, 34, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 28px -6px rgba(27, 48, 34, 0.09)',
            duration: 0.2,
          })
          .to('.step-num-1', { color: '#1B3022', duration: 0.15 }, '<')
          .to(
            '.step-badge-1',
            { backgroundColor: 'rgba(200, 138, 54, 0.15)', color: '#C88A36', duration: 0.15 },
            '<'
          )

          // Pathway 1 -> 2 draws toward Step 03
          .to(
            '.step-connector-path-1',
            { strokeDashoffset: 0, duration: 0.25, ease: 'none' },
            '+=0.04'
          )
          .to('.step-connector-notch-1', { borderColor: '#C88A36', duration: 0.1 }, '-=0.08')

          // Milestone 03 activates
          .to('.step-card-2', {
            opacity: 1,
            borderColor: 'rgba(27, 48, 34, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 28px -6px rgba(27, 48, 34, 0.09)',
            duration: 0.2,
          })
          .to('.step-num-2', { color: '#1B3022', duration: 0.15 }, '<')
          .to(
            '.step-badge-2',
            { backgroundColor: 'rgba(200, 138, 54, 0.15)', color: '#C88A36', duration: 0.15 },
            '<'
          )

          // Pathway 2 -> 3 draws toward Step 04
          .to(
            '.step-connector-path-2',
            { strokeDashoffset: 0, duration: 0.25, ease: 'none' },
            '+=0.04'
          )
          .to('.step-connector-notch-2', { borderColor: '#C88A36', duration: 0.1 }, '-=0.08')

          // Milestone 04 activates (All 4 milestones fully connected)
          .to('.step-card-3', {
            opacity: 1,
            borderColor: 'rgba(27, 48, 34, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 10px 28px -6px rgba(27, 48, 34, 0.09)',
            duration: 0.2,
          })
          .to('.step-num-3', { color: '#1B3022', duration: 0.15 }, '<')
          .to(
            '.step-badge-3',
            { backgroundColor: 'rgba(200, 138, 54, 0.15)', color: '#C88A36', duration: 0.15 },
            '<'
          );
      });

      // =======================================================================
      // MOBILE & TABLET: DEDICATED VERTICAL EDITORIAL STEPPER (< 1024px)
      // Viewport-driven triggers for nodes, cards, and vertical connecting line
      // =======================================================================
      mm.add('(max-width: 1023px)', () => {
        PARTNERSHIP_STAGES.forEach((_, idx) => {
          const item = document.querySelector(`.mobile-step-item-${idx}`);
          if (!item) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play reverse play reverse',
            },
          });

          tl.fromTo(
            item.querySelector('.mobile-step-node'),
            {
              scale: 0.92,
              backgroundColor: '#ffffff',
              borderColor: 'rgba(27, 48, 34, 0.18)',
              color: 'rgba(27, 48, 34, 0.7)',
            },
            {
              scale: 1,
              backgroundColor: '#1B3022',
              borderColor: '#1B3022',
              color: '#FBF9F4',
              duration: 0.35,
              ease: 'power2.out',
            }
          ).fromTo(
            item.querySelector('.mobile-step-card'),
            { opacity: 0.65, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.2'
          );

          if (idx < 3) {
            const spine = item.querySelector('.mobile-spine-fill');
            if (spine) {
              tl.to(
                spine,
                { scaleY: 1, duration: 0.45, ease: 'power1.inOut' },
                '-=0.15'
              );
            }
          }
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partnership-journey"
      data-nav-theme="light"
      aria-labelledby="partnership-journey-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-20 lg:pt-20 lg:pb-32 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Reduced gap into process */}
        <div ref={headerRef} className="max-w-2xl mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center gap-3 mb-3.5">
            <span className="journey-eyebrow font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
              03 / GETTING STARTED
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <div className="overflow-hidden mb-3">
            <h2
              id="partnership-journey-heading"
              className="journey-heading font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
            >
              Every partnership <br />
              <span className="italic font-light">begins with a conversation.</span>
            </h2>
          </div>

          <p className="journey-desc font-sans text-base sm:text-lg text-forest-deep/75 leading-relaxed [text-wrap:pretty]">
            Our collaborative onboarding process is built around straightforward communication, clear mutual expectations, and honest evaluation of market needs.
          </p>
        </div>

        {/* Process Container */}
        <div ref={processContainerRef} className="relative w-full">
          {/* ===================================================================
              DESKTOP (>= 1024px): 4-STEP STAGGERED EDITORIAL STAIRCASE
              Slightly offset modules with S-curve connectors and scrubbed progression
              =================================================================== */}
          <div className="hidden lg:grid grid-cols-4 gap-6 xl:gap-8 items-start relative z-10">
            {PARTNERSHIP_STAGES.map((stage, idx) => {
              // Staircase vertical offsets (approx 16px increments: 0px, 16px, 32px, 48px)
              const staggerClasses = [
                'lg:translate-y-0',
                'lg:translate-y-4',
                'lg:translate-y-8',
                'lg:translate-y-12',
              ];

              return (
                <div
                  key={stage.number}
                  className={cn(
                    `step-card step-card-${idx} group relative flex flex-col justify-between bg-white/70 backdrop-blur-xs border border-forest-deep/15 p-6 xl:p-7 min-h-[340px] xl:min-h-[365px] transition-all duration-300 shadow-warm-xs`,
                    idx > 0 && 'opacity-75',
                    staggerClasses[idx]
                  )}
                >
                  {/* Top Header: Prominent Number & Step Badge */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col">
                        <span
                          className={`step-num step-num-${idx} font-mono text-4xl xl:text-5xl font-medium tracking-tight text-forest-deep/75 transition-colors duration-300`}
                        >
                          {stage.number}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest uppercase text-harvest font-semibold mt-1">
                          MILESTONE {stage.number}
                        </span>
                      </div>

                      {/* Micro arrow badge indicator */}
                      <div
                        className={`step-badge step-badge-${idx} w-8 h-8 rounded-full bg-forest-deep/5 flex items-center justify-center text-forest-deep/40 transition-all duration-300`}
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Fine Divider Line */}
                    <div className="w-full h-px bg-forest-deep/10 mb-4 origin-left" />

                    {/* Step Title in Fraunces */}
                    <div className="overflow-hidden mb-2.5">
                      <h3 className="font-display font-medium text-lg xl:text-xl text-forest-deep leading-snug tracking-tight">
                        {stage.title}
                      </h3>
                    </div>

                    {/* Short Explanation in DM Sans */}
                    <p className="font-sans text-xs xl:text-sm text-forest-deep/75 leading-relaxed [text-wrap:pretty]">
                      {stage.description}
                    </p>
                  </div>

                  {/* Bottom Note: Operational Focus */}
                  <div className="mt-6 pt-3.5 border-t border-forest-deep/10">
                    <span className="block font-mono text-[10px] tracking-widest uppercase text-forest-deep/50 font-semibold mb-1">
                      OPERATIONAL FOCUS
                    </span>
                    <p className="font-sans text-[11px] xl:text-xs text-forest-deep/70 leading-relaxed">
                      {stage.focus}
                    </p>
                  </div>

                  {/* S-Curve Connecting Pathway to next step (Desktop only, for idx < 3) */}
                  {idx < 3 && (
                    <div
                      className="hidden lg:block absolute -right-6 xl:-right-8 top-10 w-6 xl:w-8 h-8 pointer-events-none z-20 overflow-visible"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 24 16"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        {/* Outlined Background Pathway */}
                        <path
                          d="M 0 0 C 12 0, 12 16, 24 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="text-forest-deep/15"
                        />
                        {/* Animated Progression Path */}
                        <path
                          d="M 0 0 C 12 0, 12 16, 24 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`text-harvest step-connector-path-${idx}`}
                          strokeDasharray="36"
                          strokeDashoffset="36"
                        />
                      </svg>
                      {/* Directional Chevron Notch */}
                      <div
                        className={`step-connector-notch-${idx} absolute right-0 top-[14px] w-1.5 h-1.5 border-t-2 border-r-2 border-forest-deep/20 rotate-45 transition-colors duration-300`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ===================================================================
              MOBILE & TABLET (< 1024px): DEDICATED VERTICAL EDITORIAL STEPPER
              Continuous progression line with large milestone numbers on left
              =================================================================== */}
          <div className="lg:hidden flex flex-col space-y-6 sm:space-y-8">
            {PARTNERSHIP_STAGES.map((stage, idx) => (
              <div
                key={stage.number}
                className={`mobile-step-item mobile-step-item-${idx} relative flex items-start gap-4 sm:gap-6 pb-6 last:pb-0`}
              >
                {/* Left Column: Milestone Node & Vertical Connecting Spine */}
                <div className="relative flex flex-col items-center shrink-0">
                  {/* Milestone Number Badge */}
                  <div className="mobile-step-node w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-forest-deep/15 flex items-center justify-center font-mono text-base sm:text-lg font-semibold text-forest-deep/80 shadow-warm-xs relative z-10 transition-all duration-300">
                    {stage.number}
                  </div>

                  {/* Vertical Connecting Line to next step */}
                  {idx < 3 && (
                    <div
                      className="w-0.5 bg-forest-deep/15 absolute top-12 sm:top-14 bottom-0 left-1/2 -translate-x-1/2 -z-0 overflow-hidden"
                      aria-hidden="true"
                    >
                      <div className="mobile-spine-fill w-full h-full bg-harvest origin-top scale-y-0" />
                    </div>
                  )}
                </div>

                {/* Right Column: Step Content Card */}
                <div className="mobile-step-card flex-1 bg-white/70 border border-forest-deep/15 p-5 sm:p-6 rounded-2xl shadow-warm-xs transition-all duration-300">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-harvest font-semibold mb-1">
                    MILESTONE {stage.number}
                  </div>

                  <div className="overflow-hidden mb-1.5">
                    <h3 className="font-display font-medium text-lg sm:text-xl text-forest-deep leading-snug">
                      {stage.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-forest-deep/75 leading-relaxed mb-3.5">
                    {stage.description}
                  </p>

                  <div className="pt-3 border-t border-forest-deep/10">
                    <span className="block font-mono text-[10px] tracking-widest uppercase text-forest-deep/50 font-semibold mb-0.5">
                      OPERATIONAL FOCUS
                    </span>
                    <p className="font-sans text-xs text-forest-deep/70 leading-relaxed">
                      {stage.focus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cautious Editorial Disclaimer */}
        <div className="mt-14 sm:mt-18 lg:mt-24 pt-6 border-t border-forest-deep/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-forest-deep/60">
          <span>* All partnership discussions depend on mutual operational alignment and verified territory coverage.</span>
          <span className="uppercase tracking-wider">Transparent Process</span>
        </div>
      </div>
    </section>
  );
}

