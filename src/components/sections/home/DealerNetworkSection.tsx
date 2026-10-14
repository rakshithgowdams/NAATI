'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Store,
  Users,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface DealerNetworkSectionProps {
  className?: string;
}

interface DealerPerk {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const DEALER_PERKS: DealerPerk[] = [
  {
    id: 'repeat-orders',
    icon: TrendingUp,
    title: 'High Repeat Demand',
    description:
      'Growers experience visible root revival and soil moisture retention, driving consistent seasonal re-orders across plantation and vegetable tracts.',
  },
  {
    id: 'differentiated-portfolio',
    icon: Award,
    title: 'Differentiated System',
    description:
      'Naati Plus (Soil) and Naati Pro (Plant) offer a proven scientific two-step alternative to generic commodity fertilizers and chemical salts.',
  },
  {
    id: 'agronomy-support',
    icon: Users,
    title: 'Direct Agronomy Backing',
    description:
      'Field technical sheets, regional language dosage charts, and direct dealer hotline support for acre-specific farmer queries.',
  },
  {
    id: 'trusted-terms',
    icon: ShieldCheck,
    title: 'Ethical Distribution',
    description:
      'Transparent trade policies, reliable consignment logistics, and protected territory opportunities for committed rural stockists.',
  },
];

/**
 * HOMEPAGE SECTION 11 — DEALER NETWORK
 *
 * Client Specification:
 * SECTION 11 – DEALER NETWORK
 * Grow Together With Naati
 * Interested in becoming a Dealer or Distributor?
 * Join us in building healthier farms across India.
 * (Button)
 * Become a Dealer
 */
export function DealerNetworkSection({ className }: DealerNetworkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.dealer-header-anim'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Left visual card entrance
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Perks items entrance
      if (perksRef.current) {
        gsap.fromTo(
          perksRef.current.querySelectorAll('.dealer-perk-item'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: perksRef.current,
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
      id="dealer-network"
      data-nav-theme="light"
      aria-labelledby="dealer-network-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-28 lg:py-32 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Top Hairline Separation */}
      <div className="absolute top-0 inset-x-0 h-px bg-cream-border/70 z-10" />

      <Container size="default">
        {/* =====================================================================
            01 — SECTION HEADER (Client Specification)
            SECTION 11 – DEALER NETWORK
            Grow Together With Naati
            Interested in becoming a Dealer or Distributor?
            Join us in building healthier farms across India.
            (Button) Become a Dealer
            ===================================================================== */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <div className="dealer-header-anim inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              SECTION 11 – DEALER NETWORK
            </span>
          </div>

          <h2
            id="dealer-network-heading"
            className="tracking-[-0.03em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="dealer-header-anim block font-display font-medium text-[clamp(2.35rem,4.5vw,4.2rem)] text-forest">
              Grow Together With Naati.
            </span>
            <span className="dealer-header-anim block mt-1.5 font-display italic font-normal text-olive text-[clamp(1.75rem,3.2vw,3rem)]">
              Interested in becoming a Dealer or Distributor?
            </span>
          </h2>

          <p className="dealer-header-anim font-sans text-base sm:text-lg text-text-secondary mt-4 max-w-2xl leading-relaxed [text-wrap:pretty]">
            Join us in building healthier farms across India. Partner with a brand dedicated to scientific biological nutrition, farmer education, and sustainable soil stewardship.
          </p>

          {/* Primary Action Button (Client Specified) */}
          <div className="dealer-header-anim mt-6 flex flex-wrap items-center gap-3.5">
            <Link
              href="/dealer-network"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-forest text-cream font-sans text-sm sm:text-base font-semibold hover:bg-olive transition-all duration-200 group shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20"
            >
              <span>Become a Dealer</span>
              <ArrowRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact?intent=dealer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-forest/5 text-forest font-sans text-sm font-medium border border-forest/20 transition-colors"
            >
              <span>Submit Partnership Enquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-olive" />
            </Link>
          </div>
        </div>

        {/* =====================================================================
            02 — SPLIT SHOWCASE (Documentary Image + Dealer Value Pillars)
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Documentary Visual Showcase (~48%) */}
          <div ref={visualRef} className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-cream-deep border border-cream-border/90 shadow-warm-md group">
              <Image
                src="/assets/images/dealers/hero.jpg"
                alt="Authorized Naati Organics agricultural input dealership serving local farmers in South India"
                fill
                sizes="(max-width: 1023px) 100vw, 560px"
                quality={90}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Top Pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-deep/85 backdrop-blur-md text-cream text-[11px] font-mono tracking-wider uppercase border border-cream/20">
                  <Sparkles className="w-3.5 h-3.5 text-harvest" />
                  <span>NATIONWIDE NETWORK EXPANSION</span>
                </span>
              </div>

              {/* Bottom In-Image Badge */}
              <div className="absolute bottom-4 left-5 right-5 z-10 text-cream pointer-events-none">
                <span className="font-display text-lg sm:text-xl font-medium drop-shadow-sm block">
                  A Collaborative Knowledge Bridge
                </span>
                <span className="font-sans text-xs sm:text-sm text-cream/80 block mt-0.5">
                  Supplying verified organic inputs through authorized rural stockists
                </span>
              </div>
            </div>

            {/* Quick Stat Bar Below Image */}
            <div className="mt-4 grid grid-cols-3 gap-3 p-4 rounded-2xl bg-cream-light/95 border border-cream-border/90 text-center">
              <div>
                <span className="font-display font-bold text-lg sm:text-xl text-forest block">
                  100+
                </span>
                <span className="font-sans text-[11px] text-text-secondary">
                  Agro Districts
                </span>
              </div>
              <div className="border-x border-cream-border/80">
                <span className="font-display font-bold text-lg sm:text-xl text-olive block">
                  100%
                </span>
                <span className="font-sans text-[11px] text-text-secondary">
                  Bio-Formulated
                </span>
              </div>
              <div>
                <span className="font-display font-bold text-lg sm:text-xl text-earth block">
                  Top Tier
                </span>
                <span className="font-sans text-[11px] text-text-secondary">
                  Repeat Demand
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Dealer Partner Pillars (~52%) */}
          <div ref={perksRef} className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
            <div className="mb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-earth block mb-1">
                WHY PARTNER WITH NAATI
              </span>
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-forest tracking-tight">
                Designed for long-term commercial success and farmer trust.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DEALER_PERKS.map((perk) => {
                const IconComponent = perk.icon;

                return (
                  <div
                    key={perk.id}
                    className="dealer-perk-item p-5 rounded-2xl bg-cream-light/95 border border-cream-border/90 hover:border-olive/40 hover:bg-white shadow-warm-xs transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-cream transition-colors duration-300 mb-3.5">
                        <IconComponent className="w-5 h-5 text-olive group-hover:text-harvest transition-colors" />
                      </div>

                      <h4 className="font-display font-medium text-base sm:text-lg text-forest tracking-tight mb-1.5 group-hover:text-olive transition-colors">
                        {perk.title}
                      </h4>

                      <p className="font-sans text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                        {perk.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-cream-border/50 flex items-center justify-between text-text-muted">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-forest/60">
                        Dealer Benefit
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-harvest opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Partner Categories Quick Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cream-light/70 border border-cream-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-olive shrink-0" />
                <span className="font-medium text-forest">
                  We welcome: Input Dealers · Regional Stockists · FPOs · Agronomists
                </span>
              </div>

              <Link
                href="/dealer-network"
                className="font-semibold text-olive hover:text-forest flex items-center gap-1 shrink-0 transition-colors"
              >
                <span>View Full Program Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Backward-compatible alias
export const Section11DealerNetwork = DealerNetworkSection;
