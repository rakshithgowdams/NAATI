'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Box, HelpCircle } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProApplicationGuidanceProps {
  className?: string;
}

const GUIDANCE_BLOCKS = [
  {
    id: 'identity',
    icon: ShieldCheck,
    label: 'PRODUCT IDENTITY',
    title: 'Naati Pro — Plant Nutrition Bio-Activator',
    detail:
      'Formulated as an organic plant-nutrition bio-activator to support healthy crop development in living soil environments.',
    note: 'Classification: Bio-Activator · Not a chemical or liquid fertilizer',
  },
  {
    id: 'format',
    icon: Box,
    label: 'PRODUCT FORMAT',
    title: 'Approved Packaging & Solid Product Blocks',
    detail:
      'Refer to the approved product packaging for format, pack details and handling instructions. Packaged in protective moisture-resistant cartons.',
    note: 'Solid block formulation · Keep stored in dry, shaded agricultural conditions',
  },
  {
    id: 'application',
    icon: HelpCircle,
    label: 'APPLICATION INFORMATION',
    title: 'Verified Label Guidance & Expert Support',
    detail:
      'Use verified product-label guidance or contact the Naati team for application recommendations tailored to your specific crop and regional soil profile.',
    note: 'Consult certified agronomic advisors for customized field scheduling',
  },
];

/**
 * NAATI PRO PRODUCT PAGE — SECTION 06: PRODUCT AND APPLICATION INFORMATION
 *
 * Clean Editorial Information Layout:
 * - Background: Deep forest green (#14240E) with data-nav-theme="dark"
 * - Eyebrow: "06 / PRODUCT GUIDANCE"
 * - Headline: "Understand the product before you apply it."
 * - Three compact editorial blocks (Product Identity, Product Format, Application Information)
 * - Factual, non-fabricated content adhering to genuine project information
 * - CTA: "Request Product Guidance ↗"
 */
export function ProApplicationGuidance({ className }: ProApplicationGuidanceProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pro-guidance-reveal',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      id="product-guidance"
      data-nav-theme="dark"
      aria-labelledby="pro-guidance-heading"
      className={cn(
        'relative w-full bg-forest-deep text-cream py-20 sm:py-28 lg:py-36 border-t border-cream/10 overflow-hidden',
        className
      )}
    >
      <Container size="wide">
        {/* Header */}
        <div className="pro-guidance-reveal max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-harvest">
              06 / PRODUCT GUIDANCE
            </span>
            <span className="h-px w-8 bg-harvest/30" aria-hidden="true" />
          </div>

          <h2
            id="pro-guidance-heading"
            className="font-display font-medium text-[clamp(2.25rem,4vw,3.6rem)] leading-[1.1] tracking-[-0.03em] text-cream mb-6 [text-wrap:balance]"
          >
            Understand the product before you apply it.
          </h2>

          <p className="font-sans text-base sm:text-lg text-cream/75 leading-relaxed [text-wrap:pretty]">
            Sustainable agricultural stewardship requires accurate application. Below are verified baseline guidelines for handling and implementing Naati Pro.
          </p>
        </div>

        {/* Three Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-16">
          {GUIDANCE_BLOCKS.map((block) => {
            const Icon = block.icon;
            return (
              <div
                key={block.id}
                className="pro-guidance-reveal flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-cream/5 border border-cream/15 backdrop-blur-xs hover:border-harvest/40 transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-harvest">
                      {block.label}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-harvest/10 flex items-center justify-center text-harvest">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-medium text-xl sm:text-2xl text-cream leading-snug mb-3">
                    {block.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-cream/80 leading-relaxed mb-6">
                    {block.detail}
                  </p>
                </div>

                <div className="pt-4 border-t border-cream/10">
                  <span className="font-mono text-xs text-cream/60 leading-normal block">
                    {block.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Bar */}
        <div className="pro-guidance-reveal flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-forest-medium/30 border border-cream/15">
          <div>
            <span className="font-mono text-xs tracking-wider uppercase text-harvest font-semibold block mb-1">
              FIELD CONSULTATION
            </span>
            <p className="font-sans text-sm sm:text-base text-cream/90 font-medium">
              Have specific crop requirements or looking for localized regional application protocols?
            </p>
          </div>

          <Link
            href="/contact?product=naati-pro"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-harvest text-forest-deep font-sans text-sm sm:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cream hover:shadow-warm-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest min-h-[48px] shrink-0"
          >
            <span>Request Product Guidance</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
