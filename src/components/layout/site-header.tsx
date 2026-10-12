'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { FullScreenMenu } from '@/components/layout/full-screen-menu';
import { cn } from '@/lib/utils/cn';

export type NavTheme = 'light' | 'dark';

export interface SiteHeaderProps {
  initialTheme?: NavTheme;
  className?: string;
}

/**
 * Permanently Transparent Editorial Navbar
 * Blends naturally with whichever section is behind it.
 * Senses active section background via `[data-nav-theme="dark" | "light"]`.
 * - Over dark sections: warm cream controls + dark-variant logo
 * - Over light sections: forest green controls + original logo
 * - Zero background color, zero blur, zero border, zero layout shifts.
 */
export function SiteHeader({ initialTheme, className }: SiteHeaderProps) {
  const pathname = usePathname();
  const defaultTheme: NavTheme = initialTheme ?? (pathname === '/' ? 'dark' : 'light');
  const [navTheme, setNavTheme] = useState<NavTheme>(defaultTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const currentThemeRef = useRef<NavTheme>(defaultTheme);

  // Keep ref in sync when pathname or defaultTheme changes
  useEffect(() => {
    currentThemeRef.current = defaultTheme;
    setNavTheme(defaultTheme);
  }, [defaultTheme, pathname]);

  useEffect(() => {
    let ticking = false;

    const updateThemeFromSections = () => {
      const themeElements = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      if (themeElements.length === 0) {
        if (currentThemeRef.current !== defaultTheme) {
          currentThemeRef.current = defaultTheme;
          setNavTheme(defaultTheme);
        }
        return;
      }

      // Check which section intersects the vertical midpoint of the fixed header (~48px)
      const headerMidpoint = 48;
      let activeTheme: NavTheme = defaultTheme;

      for (let i = 0; i < themeElements.length; i++) {
        const el = themeElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= headerMidpoint && rect.bottom > headerMidpoint) {
          const declared = el.getAttribute('data-nav-theme') as NavTheme | null;
          if (declared === 'dark' || declared === 'light') {
            activeTheme = declared;
          }
          break;
        }
      }

      if (currentThemeRef.current !== activeTheme) {
        currentThemeRef.current = activeTheme;
        setNavTheme(activeTheme);
      }
    };

    // Initial theme check
    updateThemeFromSections();

    // IntersectionObserver across declared theme sections
    const themeElements = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
    const observers: IntersectionObserver[] = [];

    if (typeof IntersectionObserver !== 'undefined' && themeElements.length > 0) {
      themeElements.forEach((el) => {
        const observer = new IntersectionObserver(
          () => {
            updateThemeFromSections();
          },
          {
            rootMargin: '-48px 0px -50% 0px',
            threshold: [0, 0.1, 0.5, 1],
          }
        );
        observer.observe(el);
        observers.push(observer);
      });
    }

    // Scroll listener: handles theme updates across sections
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateThemeFromSections();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname, defaultTheme]);

  const isDark = navTheme === 'dark';

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          // Permanently transparent, always-visible overlay navbar across all sections
          'fixed top-0 left-0 right-0 z-40 h-20 sm:h-24 bg-transparent border-none shadow-none select-none pointer-events-none',
          className
        )}
      >
        <div className="relative w-full h-full max-w-[1600px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between pointer-events-auto">
          {/* =========================================================================
              ZONE 1: LEFT — MENU TRIGGER + MINIMAL TWO-LINE HAMBURGER ICON
              ========================================================================= */}
          <div className="flex items-center">
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-navigation"
              aria-label="Open navigation menu"
              className={cn(
                'group inline-flex items-center gap-2.5 sm:gap-3 min-h-[44px] min-w-[44px] py-2 -ml-2 sm:-ml-3 px-2 sm:px-3 rounded-subtle cursor-pointer transition-colors duration-300',
                'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-4',
                isDark
                  ? 'text-cream hover:text-harvest'
                  : 'text-forest hover:text-olive'
              )}
            >
              {/* Minimal Two-Line Hamburger Icon */}
              <div
                className="w-5 sm:w-6 h-3 flex flex-col justify-between items-start"
                aria-hidden="true"
              >
                <span
                  className={cn(
                    'h-[1.75px] rounded-full transition-all duration-300',
                    'w-full group-hover:w-3/4',
                    isDark ? 'bg-cream' : 'bg-forest'
                  )}
                />
                <span
                  className={cn(
                    'h-[1.75px] rounded-full transition-all duration-300',
                    'w-3/4 group-hover:w-full',
                    isDark ? 'bg-cream' : 'bg-forest'
                  )}
                />
              </div>

              {/* Text Label in DM Sans */}
              <span className="font-sans text-xs sm:text-sm font-bold tracking-widest uppercase">
                Menu
              </span>
            </button>
          </div>

          {/* =========================================================================
              ZONE 2: CENTER — OFFICIAL NAATI ORGANICS LOGO
              Strictly centered relative to viewport with zero backing pill/badge.
              Smooth opacity crossfade between dark variant (cream/gold text) and light.
              ========================================================================= */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <Logo
              variant={isDark ? 'dark' : 'light'}
              size="nav"
              priority
              withLink={true}
            />
          </div>

          {/* =========================================================================
              ZONE 3: RIGHT — CONTACT LABEL + DIRECTIONAL ARROW
              ========================================================================= */}
          <div className="flex items-center">
            <Link
              href="/contact"
              className={cn(
                'group inline-flex items-center gap-1.5 min-h-[44px] py-2 -mr-2 sm:-mr-3 px-2 sm:px-3 rounded-subtle font-sans text-xs sm:text-sm font-bold tracking-wider transition-colors duration-300',
                'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-4',
                isDark
                  ? 'text-cream hover:text-harvest'
                  : 'text-forest hover:text-olive'
              )}
            >
              <span>CONTACT</span>
              <ArrowUpRight
                className={cn(
                  'w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                  isDark ? 'text-cream' : 'text-forest'
                )}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Menu Overlay (Preserved with solid forest-green overlay) */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={menuTriggerRef}
      />
    </>
  );
}
