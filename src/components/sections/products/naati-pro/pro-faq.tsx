'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface ProFaqProps {
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
    id: 'what-is-naati-pro',
    question: 'What is Naati Pro?',
    answer:
      'Naati Pro is a plant nutrition bio-activator designed to complement the Naati soil-first system. It focuses on the needs of the developing crop above ground, supporting balanced nutrition and active plant vigour.',
  },
  {
    id: 'how-different-from-naati-plus',
    question: 'How is Naati Pro different from Naati Plus?',
    answer:
      'Naati Plus focuses on "Building the Soil" through enriched vermicompost, restoring organic matter and subterranean soil biology beneath the surface. Naati Pro focuses on "Feeding the Plant" above ground, supporting crop foliage, stem vigour, and reproductive development.',
  },
  {
    id: 'part-of-complete-system',
    question: 'Can Naati Pro be considered part of a complete crop-nutrition system?',
    answer:
      'Yes. In the Naati Organics two-part philosophy ("Build the Soil. Feed the Plant"), Naati Plus and Naati Pro work synergistically as an integrated agricultural regimen for biological balance and crop health.',
    actionText: 'Explore the Complete Nutrition System',
    actionHref: '/nutrition-system',
  },
  {
    id: 'approved-application-instructions',
    question: 'Where can I find approved application instructions?',
    answer:
      'Approved instructions, pack handling, and guidance are printed directly on the verified Naati Pro packaging. For tailored field recommendations based on your specific crop variety and acreage, contact the Naati agricultural advisory team.',
    actionText: 'Request application guidance',
    actionHref: '/contact?product=naati-pro',
  },
  {
    id: 'inquire-pricing-availability',
    question: 'How do I inquire about pricing or availability?',
    answer:
      'You can submit an inquiry directly through our website or connect with authorized Naati Organics agricultural distributors across Karnataka and South India to verify local supply.',
    actionText: 'Contact our sales & advisory team',
    actionHref: '/contact?product=naati-pro',
  },
];

/**
 * NAATI PRO PRODUCT PAGE — SECTION 07: QUESTIONS ABOUT NAATI PRO
 *
 * Minimal Editorial Accordion FAQ:
 * - Background: Warm cream (#F5F1E7) with data-nav-theme="light"
 * - Eyebrow: "07 / COMMON QUESTIONS"
 * - Headline: "Everything you need to know."
 * - Minimal hairline dividers, accessible accordion toggles with rotating plus/minus
 * - Strictly factual, verified product answers without invented scientific claims
 */
export function ProFaq({ className }: ProFaqProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'what-is-naati-pro': true, // Open first item by default
  });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      gsap.fromTo(
        '.pro-faq-item',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pro-faq-list',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="naati-pro-faq"
      data-nav-theme="light"
      aria-labelledby="pro-faq-heading"
      className={cn(
        'relative w-full bg-cream text-forest-deep py-20 sm:py-28 lg:py-36 border-t border-forest-deep/10',
        className
      )}
    >
      <Container size="narrow">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-14 sm:mb-18">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-forest-medium">
              07 / COMMON QUESTIONS
            </span>
            <span className="h-px w-8 bg-forest-medium/30" aria-hidden="true" />
          </div>

          <h2
            id="pro-faq-heading"
            className="font-display font-medium text-[clamp(2.25rem,4vw,3.6rem)] leading-[1.1] tracking-[-0.03em] text-forest-deep mb-5 [text-wrap:balance]"
          >
            Everything you need to know.
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/75 leading-relaxed [text-wrap:pretty]">
            Clear, verified answers to the most common questions regarding Naati Pro and its integration into complete crop nutrition.
          </p>
        </div>

        {/* Minimal Accordion List */}
        <div className="pro-faq-list divide-y divide-forest-deep/15 border-y border-forest-deep/15">
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div key={item.id} className="pro-faq-item py-6 sm:py-8 transition-colors">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-medium/40 focus-visible:ring-offset-2 rounded-lg"
                >
                  <span className="font-display font-medium text-lg sm:text-xl md:text-2xl text-forest-deep group-hover:text-forest-medium transition-colors leading-snug">
                    {item.question}
                  </span>

                  <span
                    className={cn(
                      'shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mt-1',
                      isOpen
                        ? 'border-forest-deep bg-forest-deep text-cream rotate-180'
                        : 'border-forest-deep/30 text-forest-deep group-hover:border-forest-deep group-hover:bg-forest-deep/5'
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated Collapsible Body */}
                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={item.id}
                  className={cn(
                    'overflow-hidden transition-all duration-400 ease-in-out',
                    isOpen ? 'max-h-96 opacity-100 mt-4 sm:mt-5' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="pr-4 sm:pr-12">
                    <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed [text-wrap:pretty]">
                      {item.answer}
                    </p>

                    {item.actionText && item.actionHref && (
                      <div className="mt-4 pt-2">
                        <Link
                          href={item.actionHref}
                          className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-forest-medium hover:text-forest-deep hover:underline transition-colors"
                        >
                          <span>{item.actionText}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
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
