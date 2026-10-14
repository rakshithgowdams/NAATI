'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, HeartHandshake, Sparkles, Sprout } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface AboutFinalCtaProps {
  className?: string;
}

/**
 * ABOUT NAATI ORGANICS — SECTIONS 11 & 12: A MESSAGE FROM NAATI & JOIN THE MOVEMENT
 *
 * Client Specification:
 * A MESSAGE FROM NAATI
 * We are not here simply to sell crop nutrition products.
 * We are here because we believe healthy soil is one of the world's most valuable natural resources.
 * Every handful of healthy soil contains billions of living organisms working silently to feed our crops.
 * When we protect that living ecosystem, nature rewards us with healthier plants, stronger harvests, and a more sustainable future.
 * That is the journey we invite every farmer to join.
 *
 * JOIN THE MOVEMENT
 * Let's Build Healthier Soils Together.
 * Whether you are a farmer, dealer, agronomist, or agriculture enthusiast...
 * You are welcome to become part of the Naati family.
 * Fix the Soil. Feed the Plant. Harvest the Future.
 */
export function AboutFinalCta({ className }: AboutFinalCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Message reveal
      if (messageRef.current) {
        gsap.fromTo(
          messageRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: messageRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Join The Movement reveal
      if (joinRef.current) {
        gsap.fromTo(
          joinRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: joinRef.current,
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
      id="about-cta"
      data-nav-theme="dark"
      aria-labelledby="cta-heading"
      className={cn(
        'relative w-full bg-[#142914] text-cream overflow-hidden py-20 sm:py-28 lg:py-36 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream/15" />

      {/* Decorative Atmosphere Glows */}
      <div
        className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-forest-light/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-harvest/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto space-y-16 sm:space-y-20">
          {/* ===================================================================
              SECTION 11 — A MESSAGE FROM NAATI
              =================================================================== */}
          <div
            ref={messageRef}
            className="p-8 sm:p-12 md:p-14 rounded-3xl bg-cream/5 border border-cream/15 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
                A MESSAGE FROM NAATI
              </span>
            </div>

            {/* Letter / Manifesto Body */}
            <div className="space-y-5 font-display text-xl sm:text-2xl md:text-3xl text-cream/95 leading-relaxed font-light [text-wrap:pretty]">
              <p>
                We are not here simply to sell crop nutrition products.
              </p>
              <p className="text-cream">
                We are here because we believe <span className="text-harvest italic font-normal">healthy soil is one of the world&apos;s most valuable natural resources</span>.
              </p>
              <p className="font-sans text-base sm:text-lg text-cream-muted leading-relaxed font-normal">
                Every handful of healthy soil contains billions of living organisms working silently to feed our crops. When we protect that living ecosystem, nature rewards us with healthier plants, stronger harvests, and a more sustainable future.
              </p>
              <p className="font-sans text-base sm:text-lg text-harvest font-medium pt-2">
                That is the journey we invite every farmer to join.
              </p>
            </div>

            {/* Signature Accent */}
            <div className="mt-8 pt-6 border-t border-cream/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-harvest/20 flex items-center justify-center text-harvest">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display font-medium text-cream text-sm">The Naati Organics Team</p>
                  <p className="font-mono text-xs text-cream/60">Karnataka, India</p>
                </div>
              </div>
              <span className="font-mono text-xs text-harvest uppercase tracking-widest hidden sm:inline">
                Soil Health First
              </span>
            </div>
          </div>

          {/* ===================================================================
              SECTION 12 — JOIN THE MOVEMENT
              =================================================================== */}
          <div
            ref={joinRef}
            className="text-center p-8 sm:p-12 rounded-3xl bg-forest-surface border border-harvest/30 shadow-2xl relative overflow-hidden"
          >
            {/* Background Warmth */}
            <div
              className="absolute inset-0 bg-radial-at-c from-harvest/10 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-harvest" />
              <span className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-harvest">
                JOIN THE MOVEMENT
              </span>
            </div>

            {/* Headline */}
            <h2
              id="cta-heading"
              className="font-display font-medium text-[clamp(2.25rem,4.5vw,4rem)] text-cream tracking-[-0.03em] leading-tight mb-5"
            >
              Let&apos;s Build Healthier Soils Together.
            </h2>

            {/* Inclusivity Paragraph */}
            <p className="font-sans text-base sm:text-lg text-cream/90 max-w-2xl mx-auto leading-relaxed mb-6 [text-wrap:pretty]">
              Whether you are a farmer, dealer, agronomist, or agriculture enthusiast...
              <br />
              <span className="text-harvest font-medium">You are welcome to become part of the Naati family.</span>
            </p>

            {/* The Climax Tagline */}
            <div className="inline-block py-2.5 px-6 rounded-full bg-cream/10 border border-harvest/40 text-cream font-display text-lg sm:text-xl font-medium tracking-wide mb-10 shadow-warm-xs">
              Fix the Soil. Feed the Plant. Harvest the Future.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/crop-solutions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest text-forest font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-harvest-light hover:shadow-warm-md"
              >
                <span>EXPLORE CROP SOLUTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-cream/10 text-cream border border-cream/20 font-sans font-medium text-sm tracking-wide transition-all duration-300 hover:bg-cream/20 hover:border-cream/40"
              >
                <span>BECOME A DEALER / PARTNER</span>
                <ArrowUpRight className="w-4 h-4 text-harvest" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
