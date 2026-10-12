import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'none';
  theme?: 'cream' | 'forest' | 'earth' | 'olive-tint';
  as?: React.ElementType;
}

const SPACING_CLASSES = {
  sm: 'py-10 sm:py-14 md:py-20',
  md: 'py-16 sm:py-20 md:py-28 lg:py-32',
  lg: 'py-24 sm:py-28 md:py-36 lg:py-44',
  none: 'py-0',
};

const THEME_CLASSES = {
  cream: 'bg-cream text-text-primary',
  forest: 'bg-forest text-text-inverse',
  earth: 'bg-earth-dark text-text-inverse',
  'olive-tint': 'bg-olive-surface text-text-primary',
};

export function Section({
  spacing = 'md',
  theme = 'cream',
  as: Component = 'section',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-200',
        SPACING_CLASSES[spacing],
        THEME_CLASSES[theme],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
