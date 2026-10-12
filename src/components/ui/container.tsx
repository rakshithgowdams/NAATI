import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
  as?: React.ElementType;
}

const SIZE_CLASSES = {
  default: 'max-w-[1440px]',
  narrow: 'max-w-[1080px]',
  wide: 'max-w-[1600px]',
  full: 'max-w-full',
};

export function Container({
  size = 'default',
  as: Component = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12',
        SIZE_CLASSES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
