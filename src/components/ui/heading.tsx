import React from 'react';
import { cn } from '@/lib/utils/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'hero' | 'editorial' | 'section' | 'subheading' | 'caption';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  as?: React.ElementType;
}

const SIZE_STYLES: Record<HeadingSize, string> = {
  hero: 'text-display-hero font-display tracking-tight',
  editorial: 'text-editorial-lg font-display tracking-tight',
  section: 'text-heading-section font-display tracking-tight',
  subheading: 'text-heading-sub font-display',
  caption: 'text-caption font-display uppercase tracking-wider',
};

const DEFAULT_LEVEL_SIZE_MAP: Record<HeadingLevel, HeadingSize> = {
  1: 'hero',
  2: 'editorial',
  3: 'section',
  4: 'subheading',
  5: 'subheading',
  6: 'caption',
};

export function Heading({
  level = 2,
  size,
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = (as || `h${level}`) as React.ElementType;
  const appliedSize = size || DEFAULT_LEVEL_SIZE_MAP[level];

  return (
    <Component
      className={cn(
        'transition-colors duration-200 [text-wrap:balance]',
        SIZE_STYLES[appliedSize],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
