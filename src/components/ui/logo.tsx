import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export type LogoSize = 'nav-mobile' | 'nav-compact' | 'nav' | 'nav-responsive' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type LogoVariant = 'light' | 'dark';

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  withLink?: boolean;
  alt?: string;
  onClick?: () => void;
}

const SIZE_MAP: Record<'nav-mobile' | 'nav-compact' | 'nav' | 'nav-responsive' | 'sm' | 'md' | 'lg' | 'xl', number> = {
  'nav-mobile': 54,
  'nav-compact': 64,
  'nav': 84,
  'nav-responsive': 84,
  sm: 120,
  md: 180,
  lg: 260,
  xl: 340,
};

export function Logo({
  size = 'md',
  variant = 'light',
  className,
  priority = false,
  withLink = true,
  alt = 'Naati Organics — Fix the Soil. Feed the Plant.',
  onClick,
}: LogoProps) {
  const isNav = size === 'nav' || size === 'nav-responsive';
  const pixelDimension = typeof size === 'number' ? size : SIZE_MAP[size];
  const isDark = variant === 'dark';

  const imageElement = (
    <div
      className={cn(
        'relative inline-flex items-center justify-center select-none',
        isNav ? 'w-[64px] h-[64px] sm:w-[84px] sm:h-[84px]' : '',
        className
      )}
      style={
        isNav
          ? undefined
          : {
              width: pixelDimension,
              height: pixelDimension,
            }
      }
    >
      {/* Light Background Logo Asset (Original green & brown text on light surfaces) */}
      <Image
        src="/assets/brand/naati-organics-logo.png"
        alt={alt}
        width={pixelDimension}
        height={pixelDimension}
        priority={priority}
        className={cn(
          'absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-in-out',
          isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      />

      {/* Dark Background Logo Asset (Warm ivory & gold lettering on dark hero/transparent surfaces) */}
      <Image
        src="/assets/brand/naati-organics-logo-dark.png"
        alt={alt}
        width={pixelDimension}
        height={pixelDimension}
        priority={priority}
        className={cn(
          'absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-in-out',
          isDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      />
    </div>
  );

  if (withLink) {
    return (
      <Link
        href="/"
        onClick={onClick}
        className="inline-flex focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-4 rounded-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
        aria-label="Naati Organics Home"
      >
        {imageElement}
      </Link>
    );
  }

  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer focus-visible:outline-2 focus-visible:outline-olive rounded-md"
      aria-label="Naati Organics Home"
    >
      {imageElement}
    </button>
  ) : (
    imageElement
  );
}
