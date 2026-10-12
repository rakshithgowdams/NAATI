'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins safely on the client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if the user has requested reduced motion at system level.
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Safe GSAP context wrapper that honors prefers-reduced-motion.
 */
export function createSafeAnimation(
  scope: Element | null | undefined,
  animationCallback: () => void
): () => void {
  if (typeof window === 'undefined' || !scope) return () => {};

  if (isReducedMotion()) {
    // If reduced motion is preferred, execute immediate completion or skip animation
    return () => {};
  }

  const ctx = gsap.context(() => {
    animationCallback();
  }, scope);

  return () => ctx.revert();
}

export { gsap, ScrollTrigger };
