'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface PlusFaqProps {
  className?: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  actionText?: string;
  actionHref?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what-is-naati-plus',
    question: 'What is Naati Plus?',
    answer:
      'Naati Plus is an enriched vermicompost formulated to serve as the soil-nutrition foundation of the Naati Organics system. It focuses on replenishing depleted organic matter, improving physical soil structure, and supporting the living root environment.',
  },
  {
    id: 'what-is-enriched-vermicompost',
    question: 'What is enriched vermicompost?',
    answer:
      'Enriched vermicompost is organically decomposed matter processed through earthworm digestion and biological enrichment. It delivers stable organic carbon, biological diversity, and porous aggregate structure back into agricultural soil.',
  },
  {
    id: 'how-it-fits-system',
    question: 'How does Naati Plus fit into the Naati nutrition system?',
    answer:
      'In our two-step approach ("Build the Soil. Feed the Plant"), Naati Plus provides the subterranean foundation beneath the surface. It pairs synergistically with Naati Pro, which delivers targeted plant nutrition above ground during vegetative and reproductive growth stages.',
  },
  {
    id: 'application-instructions',
    question: 'Where can I find application quantities and instructions?',
    answer:
      'Application quantities vary depending on your specific crop, growing cycle, and baseline soil conditions. Always refer to the verified product label on your package or contact the Naati technical advisory team for recommendations tailored to your field.',
    actionText: 'Ask our team about application',
    actionHref: '/contact?product=naati-plus',
  },
  {
    id: 'inquire-availability',
    question: 'How can I inquire about Naati Plus availability?',
    answer:
      'You can inquire directly with our team through our contact page or speak with authorized agricultural dealers across Karnataka and South India to verify local pack availability and distribution logistics.',
    actionText: 'Contact our team for availability',
    actionHref: '/contact?product=naati-plus',
  },
];

/**
 * NAATI PLUS PRODUCT PAGE — SECTION 06: PRODUCT QUESTIONS
 *
 * Minimal Editorial Accordion FAQ:
 * - Warm cream background (#F5F1E7) with data-nav-theme="light"
 * - Headline: "Questions about Naati Plus?"
 * - Large comfortable rows with subtle hairline dividers
 * - Smooth accessible toggles with rotating plus/minus indicator
 * - Factual, non-fabricated product answers
 */
export function PlusFaq({ className }: PlusFaqProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'what-is-naati-plus': true, // First item open by default for immediate context
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        '.faq-accordion-row',
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-accordion-container',
            start: 'top 80%',
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
      id="naati-plus-faq"
      data-nav-theme="light"
      aria-labelledby="faq-section-heading"
      className={cn(
        'relative w-full bg-[#F5F1E7] text-forest py-20 sm:py-24 md:py-28 lg:py-32 border-t border-cream-border/70 selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      <Container size="default">
        {/* =======================================================================
            SECTION HEADER
            ======================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-olive">
              06 / GOOD TO KNOW
            </span>
          </div>

          <h2
            id="faq-section-heading"
            className="tracking-[-0.035em] leading-[1.08] [text-wrap:balance]"
          >
            <span className="block font-display font-medium text-[clamp(2.25rem,4.5vw,4.25rem)] text-forest">
              Questions about
            </span>
            <span className="block font-display italic font-normal text-olive text-[clamp(2.25rem,4.5vw,4.25rem)] mt-1">
              Naati Plus?
            </span>
          </h2>
        </div>

        {/* =======================================================================
            MINIMAL ACCORDION LIST
            ======================================================================= */}
        <div className="faq-accordion-container divide-y divide-cream-border border-y border-cream-border max-w-4xl">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = !!openItems[item.id];
            return (
              <div key={item.id} className="faq-accordion-row py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                  className="w-full flex items-center justify-between text-left gap-6 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/20 rounded-md py-1"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <span className="font-mono text-xs text-text-muted mt-1 sm:mt-0 shrink-0">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl text-forest font-medium tracking-[-0.015em] group-hover:text-olive transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <span
                    className={cn(
                      'w-8 h-8 rounded-full border border-cream-border flex items-center justify-center shrink-0 transition-transform duration-300 shadow-warm-xs',
                      isOpen ? 'bg-forest text-cream rotate-90' : 'bg-cream-light text-forest'
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Animated Accordion Body */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={cn(
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 sm:mt-5' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden pl-7 sm:pl-11 pr-4 sm:pr-8">
                    <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mb-4 [text-wrap:pretty]">
                      {item.answer}
                    </p>

                    {item.actionText && item.actionHref && (
                      <Link
                        href={item.actionHref}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider uppercase text-olive hover:text-forest transition-colors mt-1"
                      >
                        <span>{item.actionText}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
