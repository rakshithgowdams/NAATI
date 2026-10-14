'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface NaatiPlusStaticGroundProps {
  className?: string;
  // Optional backward-compatible props if passed
  startTriggerRef?: React.RefObject<HTMLElement | null>;
  endTriggerRef?: React.RefObject<HTMLElement | null>;
  sectionRef?: React.RefObject<HTMLElement | null>;
}

/**
 * NAATI PLUS STATIC GROUND (Section 02 Bottom Decorative Ground)
 * 
 * Static editorial imagery at the bottom of Section 02:
 * - Naati Plus package resting on rich vermicompost toward the lower-right.
 * - Dark soil extending across the bottom edge immediately before Section 03.
 * - Generous top clearance ensuring the package is never cropped or faded across desktop/mobile.
 * - Seamless top fade into Section 02 warm cream (#F5F1E7) background.
 * - Positioned below the closing quotation and CTA with zero text collision.
 * - 100% responsive without stretching or distorting product proportions.
 */
export function NaatiPlusStaticGround({ className }: NaatiPlusStaticGroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative w-full overflow-hidden pointer-events-none select-none',
        // Tightly composed negative top margin and responsive heights matching cropped 1920x730 aspect
        '-mt-4 sm:-mt-6 md:-mt-8 lg:-mt-12 xl:-mt-14',
        'h-[150px] xs:h-[180px] sm:h-[230px] md:h-[300px] lg:h-[380px] xl:h-[460px] 2xl:h-[540px] min-[1920px]:h-[620px]',
        // Top mask fade residing smoothly in the subtle cream margin above the packaging
        '[mask-image:linear-gradient(to_bottom,transparent_0%,black_30px,black_100%)]',
        '[-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_30px,black_100%)]',
        className
      )}
    >
      {/* Soft cream edge blend guaranteeing zero visible cutoff under all rendering engines */}
      <div
        className="absolute inset-x-0 top-0 h-6 sm:h-8 md:h-10 bg-gradient-to-b from-[#F5F1E7] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <Image
        src="/assets/images/home/naati-plus-compost-end.webp"
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-bottom md:object-[right_bottom]"
      />
    </div>
  );
}

// Backward-compatible alias for existing imports in home/index.ts
export const NaatiPlusScrollBackground = NaatiPlusStaticGround;
export type NaatiPlusScrollBackgroundProps = NaatiPlusStaticGroundProps;
