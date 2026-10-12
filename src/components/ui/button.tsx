import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-forest text-text-inverse hover:bg-forest-hover active:bg-forest-deep border border-transparent shadow-warm-sm',
  secondary:
    'bg-earth text-text-inverse hover:bg-earth-hover active:bg-earth-dark border border-transparent shadow-warm-sm',
  outline:
    'bg-transparent text-forest border border-forest/30 hover:border-forest hover:bg-forest/5 active:bg-forest/10',
  ghost:
    'bg-transparent text-text-primary hover:bg-cream-muted/60 active:bg-cream-muted border border-transparent',
  accent:
    'bg-harvest text-forest-deep hover:bg-harvest-hover active:bg-harvest-dark border border-transparent font-semibold shadow-warm-sm',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'min-h-[40px] px-3.5 py-1.5 text-xs tracking-wider uppercase',
  md: 'min-h-[44px] px-5 py-2.5 text-sm tracking-wide',
  lg: 'min-h-[50px] px-7 py-3 text-base tracking-normal',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      external = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 rounded-subtle font-display font-medium text-center',
      'transition-all duration-200 select-none cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-olive focus-visible:outline-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed',
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseClasses}
            aria-disabled={disabled}
          >
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={baseClasses}
          aria-disabled={disabled}
        >
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={baseClasses}
        disabled={disabled}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
