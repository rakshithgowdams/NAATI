'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ScrollTrigger, isReducedMotion } from '@/lib/animations/gsap';
import { cn } from '@/lib/utils/cn';

export interface SoilComparisonSliderProps {
  className?: string;
  initialPosition?: number;
}

/**
 * SoilComparisonSlider
 * Deterministic scroll-driven and pointer-draggable before/after soil comparison.
 * - Layer A (base): Degraded Soil (0% to 100% full range support)
 * - Layer B (reveal): Living Soil (clipped from the right with CSS custom property)
 * - Deterministic ScrollTrigger: position = 100 * (1 - scrollProgress)
 * - Boundary callbacks (onLeave -> 0%, onLeaveBack -> 100%) prevent sticking on fast scroll.
 * - Single position controller function: setComparisonPosition(percent)
 * - Manual drag with piecewise linear interpolation anchor for seamless scroll resume.
 */
export function SoilComparisonSlider({
  className,
  initialPosition = 100,
}: SoilComparisonSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; y: number; isGestureResolved: boolean } | null>(null);

  // Position and anchor refs
  const currentPosRef = useRef<number>(initialPosition);
  const currentProgressRef = useRef<number>(0);
  const manualAnchorRef = useRef<{ progress: number; position: number } | null>(null);

  // ===========================================================================
  // TASK 4: SINGLE POSITION CONTROLLER
  // Clamps 0..100, updates CSS custom property --slider-pos, keeps reveal and line in sync.
  // ===========================================================================
  const setComparisonPosition = useCallback((percent: number) => {
    const clamped = Math.min(100, Math.max(0, percent));
    currentPosRef.current = clamped;

    if (stageRef.current) {
      stageRef.current.style.setProperty('--slider-pos', `${clamped}%`);
      stageRef.current.setAttribute('aria-valuenow', `${Math.round(clamped)}`);
    }
  }, []);

  // ===========================================================================
  // TASK 2 & 5: DETERMINISTIC SCROLL MAPPING & PIECEWISE RE-ANCHORING
  // Maps scrollProgress to divider position (0.00 -> 100%, 1.00 -> 0%).
  // If manual dragging occurred, piecewise linear interpolation guarantees smooth
  // continuation from user's chosen position while still reaching 100% and 0% at boundaries.
  // ===========================================================================
  const calculatePositionFromProgress = useCallback((progress: number) => {
    const p = Math.min(1, Math.max(0, progress));
    const anchor = manualAnchorRef.current;

    // Default linear journey: 0.00 -> 100%, 1.00 -> 0%
    if (!anchor) {
      return 100 * (1 - p);
    }

    // Piecewise interpolation from anchor
    const { progress: pAnchor, position: posAnchor } = anchor;

    if (p <= pAnchor) {
      // Interpolate from 100% (at progress 0) to posAnchor (at pAnchor)
      if (pAnchor > 0.001) {
        return 100 - (p / pAnchor) * (100 - posAnchor);
      }
      return posAnchor;
    } else {
      // Interpolate from posAnchor (at pAnchor) to 0% (at progress 1)
      if (pAnchor < 0.999) {
        return posAnchor - ((p - pAnchor) / (1 - pAnchor)) * posAnchor;
      }
      return posAnchor;
    }
  }, []);

  // Update position from pointer coordinate (full 0% to 100% range)
  const updatePositionFromPointer = useCallback(
    (clientX: number) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.width <= 0) return;

      const x = clientX - rect.left;
      // Full 0% to 100% range without restriction
      const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
      setComparisonPosition(pct);
    },
    [setComparisonPosition]
  );

  // Pointer Handlers: Non-conflicting touch gesture discrimination
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only accept primary pointer button
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      pointerStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        isGestureResolved: false,
      };

      // Desktop mouse pointer engages immediately
      if (e.pointerType === 'mouse') {
        setIsDragging(true);
        isDraggingRef.current = true;
        updatePositionFromPointer(e.clientX);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        } catch {}
      }
    },
    [updatePositionFromPointer]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Direct mouse dragging
      if (isDraggingRef.current && e.pointerType === 'mouse') {
        updatePositionFromPointer(e.clientX);
        return;
      }

      // Touch gesture discrimination: avoid hijacking vertical page scroll
      if (!pointerStartRef.current) return;

      const dx = e.clientX - pointerStartRef.current.x;
      const dy = e.clientY - pointerStartRef.current.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      if (!pointerStartRef.current.isGestureResolved) {
        // Need minimal directional distance (8px) before resolving gesture intent
        if (absX < 8 && absY < 8) return;

        if (absX > absY) {
          // Horizontal drag intended: claim gesture and drag comparison
          pointerStartRef.current.isGestureResolved = true;
          setIsDragging(true);
          isDraggingRef.current = true;
          try {
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
          } catch {}
          updatePositionFromPointer(e.clientX);
        } else {
          // Vertical swipe intended: release pointer and allow native page scroll
          pointerStartRef.current = null;
          setIsDragging(false);
          isDraggingRef.current = false;
        }
        return;
      }

      if (isDraggingRef.current) {
        updatePositionFromPointer(e.clientX);
      }
    },
    [updatePositionFromPointer]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      pointerStartRef.current = null;
      setIsDragging(false);
      isDraggingRef.current = false;

      // Anchor manual interaction to current progress for smooth scroll handoff
      manualAnchorRef.current = {
        progress: currentProgressRef.current,
        position: currentPosRef.current,
      };

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    },
    []
  );

  // Keyboard Accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newPos = currentPosRef.current;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        newPos = Math.max(0, newPos - 5);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        newPos = Math.min(100, newPos + 5);
      } else if (e.key === 'Home') {
        newPos = 100;
      } else if (e.key === 'End') {
        newPos = 0;
      } else {
        return;
      }

      e.preventDefault();
      setComparisonPosition(newPos);
      manualAnchorRef.current = {
        progress: currentProgressRef.current,
        position: newPos,
      };
    },
    [setComparisonPosition]
  );

  // ===========================================================================
  // TASK 3 & 6: SCROLLTRIGGER PIN & BOUNDARY CALLBACKS
  // ===========================================================================
  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current) return;
    if (isReducedMotion()) return;

    const isMobile = window.innerWidth < 768;
    // On mobile, set initial position to 50% (centered) so both soil profiles are immediately visible
    const startingPos = isMobile ? 50 : initialPosition;
    setComparisonPosition(startingPos);

    // On mobile, keep normal vertical scroll and allow touch dragging
    if (isMobile) return;

    // Create a single ScrollTrigger with immediate 1:1 progress tracking (no scrub delay)
    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 12%',
      end: '+=120%',
      pin: containerRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        currentProgressRef.current = self.progress;
        if (!isDraggingRef.current) {
          const pos = calculatePositionFromProgress(self.progress);
          setComparisonPosition(pos);
        }
      },
      // Fast scroll boundary safety guarantees
      onLeave: () => {
        if (!isDraggingRef.current) {
          setComparisonPosition(0); // Exactly 0% (100% Living Soil)
        }
      },
      onLeaveBack: () => {
        if (!isDraggingRef.current) {
          setComparisonPosition(100); // Exactly 100% (100% Degraded Soil)
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [calculatePositionFromProgress, initialPosition, setComparisonPosition]);

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full', className)}
    >
      <div
        ref={containerRef}
        className="w-full flex flex-col justify-center"
      >
        {/* Active Comparison Stage */}
        <div
          ref={stageRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            // Initialize shared CSS custom property
            ['--slider-pos' as string]: '50%',
          }}
          className={cn(
            'relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[820px] overflow-hidden select-none cursor-ew-resize touch-pan-y',
            'bg-forest-deep shadow-warm-lg rounded-subtle focus-visible:outline-2 focus-visible:outline-harvest focus-visible:outline-offset-2'
          )}
          role="slider"
          aria-label="Soil condition comparison slider: degraded hardpan vs living fertile soil"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
        >
          {/* ===================================================================
              BASE LAYER: DEGRADED SOIL (Always visible on left / base)
              =================================================================== */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image
              src="/assets/images/home/soil-degraded-aligned.jpg"
              alt="Degraded, compacted agricultural hardpan soil cross-section with dry clods and shallow, stressed root systems"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* ===================================================================
              OVERLAY LAYER: LIVING SOIL (Revealed via shared CSS custom property)
              inset(0 0 0 var(--slider-pos, 50%)) reaches true 0% and 100%
              =================================================================== */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none will-change-[clip-path]"
            style={{
              clipPath: 'inset(0 0 0 var(--slider-pos, 50%))',
              WebkitClipPath: 'inset(0 0 0 var(--slider-pos, 50%))',
            }}
          >
            <Image
              src="/assets/images/home/soil-living-aligned.jpg"
              alt="Living, biologically rich humus soil cross-section with deep root network and earthworm tunnels"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* ===================================================================
              ATMOSPHERIC GRADIENT VIGNETTES
              =================================================================== */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-forest-deep/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-deep/75 to-transparent" />
          </div>

          {/* ===================================================================
              TASK 1 & 4: DIVIDER LINE (Physically reaches exact 0% and 100% edges)
              =================================================================== */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-cream pointer-events-none z-20 shadow-[0_0_10px_rgba(0,0,0,0.6)]"
            style={{ left: 'var(--slider-pos, 50%)' }}
          >
            {/* Circular Drag Handle (Clamped within stage boundaries for accessibility) */}
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full cursor-grab active:cursor-grabbing',
                'bg-forest-deep/90 border border-cream/90 backdrop-blur-md shadow-warm-lg',
                'flex items-center justify-center text-cream transition-transform duration-150',
                isDragging ? 'scale-110 ring-2 ring-harvest/60' : 'hover:scale-105'
              )}
            >
              <svg
                className="w-4 h-4 text-cream"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m8 18-5-6 5-6M16 6l5 6-5 6" />
              </svg>
            </div>
          </div>

          {/* ===================================================================
              MINIMAL EDITORIAL LABELS (IBM Plex Mono)
              =================================================================== */}
          <div className="absolute inset-0 pointer-events-none p-4 xs:p-5 sm:p-7 md:p-8 flex flex-col justify-between z-10">
            {/* Top Minimal Label Badges */}
            <div className="flex items-start justify-between gap-4">
              {/* Left Plate: Degraded Soil */}
              <div className="bg-forest-deep/85 backdrop-blur-md border border-cream/20 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-pill text-cream shadow-warm-sm">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-cream/90 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/60" />
                  DEGRADED SOIL
                </span>
              </div>

              {/* Right Plate: Living Soil */}
              <div className="bg-forest-deep/85 backdrop-blur-md border border-harvest/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-pill text-cream shadow-warm-sm">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-harvest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-harvest" />
                  LIVING SOIL
                </span>
              </div>
            </div>

            {/* Bottom Meta Annotation */}
            <div className="flex items-center justify-between text-cream/70 text-[10px] sm:text-[11px] font-mono tracking-[0.16em] uppercase">
              <span>FIG. 02 — BIOLOGICAL SOIL COMPARISON (CONCEPTUAL ILLUSTRATION)</span>
              <span className="hidden sm:inline text-cream-muted/70">
                SCROLL OR DRAG TO COMPARE
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Caption below Comparison Stage */}
        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-text-secondary text-xs sm:text-sm font-sans">
          <p className="max-w-xl leading-relaxed [text-wrap:pretty]">
            The crop above is a reflection of the biology below. Where soil is
            aerated and alive with organic matter, roots tap into continuous moisture
            and balanced natural fertility.
          </p>
          <span className="font-mono text-[10px] sm:text-xs tracking-wider text-olive uppercase shrink-0">
            CONCEPTUAL ILLUSTRATION — SOIL PROFILE STUDY
          </span>
        </div>
      </div>
    </div>
  );
}
