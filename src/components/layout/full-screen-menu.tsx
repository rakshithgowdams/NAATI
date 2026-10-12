'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowUpRight, Phone, Mail, MapPin, Sprout } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { NavItem } from '@/components/layout/nav-item';
import {
  MAIN_NAV_ITEMS,
  SECONDARY_NAV_LINKS,
  NAV_BRAND_INFO,
} from '@/lib/constants/navigation';
import { cn } from '@/lib/utils/cn';
import { gsap } from '@/lib/animations/gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function FullScreenMenu({
  isOpen,
  onClose,
  triggerRef,
}: FullScreenMenuProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const secondaryContentRef = useRef<HTMLDivElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Close menu automatically whenever route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll and manage focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Save previous overflow style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Keyboard handlers: Escape to close & Tab trapping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const triggerEl = triggerRef.current;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      // Restore focus to trigger button
      triggerEl?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  // GSAP Stagger Animation for Links when opened
  useEffect(() => {
    if (!isOpen || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (navListRef.current?.children) {
        gsap.fromTo(
          Array.from(navListRef.current.children),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.035,
            ease: 'power2.out',
            delay: 0.08,
          }
        );
      }
      if (secondaryContentRef.current) {
        gsap.fromTo(
          secondaryContentRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.12 }
        );
      }
    }, overlayRef.current || undefined);

    return () => ctx.revert();
  }, [isOpen, prefersReducedMotion]);

  const handleNavigate = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      id="fullscreen-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-forest-deep text-cream select-none overflow-hidden transition-all duration-300 ease-out',
        isOpen
          ? 'visible opacity-100 pointer-events-auto translate-y-0'
          : 'invisible opacity-0 pointer-events-none -translate-y-2'
      )}
      style={{
        backgroundColor: '#12200E',
      }}
    >
      {/* Top Header Bar of Overlay */}
      <div className="relative z-10 w-full border-b border-cream-border/15 bg-forest-deep/90 backdrop-blur-md shrink-0">
        <div className="w-full mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] h-20 sm:h-24 flex items-center justify-between">
          {/* Close Control (Left) */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={cn(
              'group inline-flex items-center gap-2.5 px-3 py-2 -ml-3 rounded-subtle text-cream cursor-pointer transition-colors duration-200 min-h-[44px] min-w-[44px]',
              'hover:text-harvest focus-visible:outline-2 focus-visible:outline-harvest focus-visible:outline-offset-4'
            )}
            aria-label="Close navigation menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center rounded-full bg-cream-border/10 group-hover:bg-harvest/20 transition-colors">
              <X className="w-4 h-4 text-cream group-hover:text-harvest transition-transform duration-200 group-hover:rotate-90" />
            </div>
            <span className="font-display text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Close
            </span>
          </button>

          {/* Centered Brand Mark — Transparent Adaptive Navbar Alignment */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <Logo
              variant="dark"
              size="nav"
              priority
              withLink={true}
              onClick={handleNavigate}
              alt="Naati Organics"
            />
          </div>

          {/* Quick Contact Link (Right) */}
          <Link
            href="/contact"
            onClick={handleNavigate}
            className={cn(
              'group inline-flex items-center gap-1.5 px-3 py-2 -mr-3 rounded-subtle text-cream font-display text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 min-h-[44px] min-w-[44px] justify-end',
              'hover:text-harvest focus-visible:outline-2 focus-visible:outline-harvest focus-visible:outline-offset-4'
            )}
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-4 h-4 text-cream group-hover:text-harvest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Content Area (Scrollable container for small screens / short viewports) */}
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto overflow-x-hidden pt-3 sm:pt-5 lg:pt-6 pb-8 sm:pb-10 lg:pb-12"
      >
        <div className="w-full mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] flex flex-col justify-between min-h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column: Primary Editorial Navigation (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <span className="block text-[10px] sm:text-xs font-display font-semibold uppercase tracking-widest text-harvest/70 mb-2 sm:mb-2.5">
                Navigation Index
              </span>

              <nav aria-label="Overlay Navigation">
                <ul ref={navListRef} className="space-y-0.5 sm:space-y-1 p-0 m-0">
                  {MAIN_NAV_ITEMS.map((item, index) => {
                    const isActive = pathname === item.href;
                    const isHovered = hoveredIndex === index;
                    const isAnyHovered = hoveredIndex !== null;

                    return (
                      <NavItem
                        key={item.id}
                        item={item}
                        isActive={isActive}
                        isHovered={isHovered}
                        isAnyHovered={isAnyHovered}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        onNavigate={handleNavigate}
                      />
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Right Column: Editorial Brand Statement & Secondary Navigation (5 cols on desktop) */}
            <div
              ref={secondaryContentRef}
              className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-4 lg:pl-8 xl:pl-10 lg:border-l border-cream-border/15"
            >
              {/* Brand Philosophy Editorial Block (Clean & unboxed) */}
              <div className="mb-6 lg:mb-8">
                <div className="flex items-center gap-2 text-harvest mb-2 sm:mb-2.5">
                  <Sprout className="w-3.5 h-3.5 text-harvest" aria-hidden="true" />
                  <span className="font-display text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-harvest/80">
                    Brand Philosophy
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl xl:text-3xl font-bold text-cream mb-2.5 sm:mb-3 leading-snug [text-wrap:balance]">
                  {NAV_BRAND_INFO.tagline}
                </h3>

                <p className="font-sans text-xs sm:text-sm xl:text-[15px] text-cream-muted/85 leading-relaxed [text-wrap:pretty] max-w-md">
                  {NAV_BRAND_INFO.philosophy}
                </p>
              </div>

              {/* Subtle Editorial Separator */}
              <div className="w-full border-t border-cream-border/15 mb-6 lg:mb-7" />

              {/* Quick Access Section */}
              <div className="mb-6 lg:mb-8">
                <span className="block text-[10px] sm:text-xs font-display font-semibold uppercase tracking-widest text-harvest/70 mb-3">
                  Quick Access
                </span>
                <ul className="space-y-2.5 p-0 m-0 list-none">
                  {SECONDARY_NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={handleNavigate}
                        className="group inline-flex items-center gap-2 text-xs sm:text-sm lg:text-[15px] text-cream-muted hover:text-harvest transition-colors font-display"
                      >
                        <span>{link.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-harvest/60 group-hover:text-harvest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Inquiries Gateway */}
              <div className="pt-4 border-t border-cream-border/15">
                <span className="block text-[10px] sm:text-xs font-display font-semibold uppercase tracking-widest text-harvest/70 mb-1.5">
                  Inquiries & Guidance
                </span>
                <p className="font-sans text-xs text-cream-muted/75 mb-3 leading-relaxed max-w-md">
                  Connect with our team for crop nutrition guidance, field application protocols, and dealer partnership inquiries.
                </p>
                <Link
                  href="/contact"
                  onClick={handleNavigate}
                  className="group inline-flex items-center gap-1.5 text-xs font-display font-semibold tracking-wider text-harvest hover:text-harvest-light transition-colors uppercase"
                >
                  <span>Submit Inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-harvest group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Subtle Status Bar — Natural flow inside scroll container */}
          <div className="w-full mt-8 sm:mt-10 pt-4 border-t border-cream-border/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] sm:text-[11px] text-cream-muted/50 font-display">
            <span>© {new Date().getFullYear()} Naati Organics</span>
            <span>Soil Nutrition · Plant Nutrition · Knowledge Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}
