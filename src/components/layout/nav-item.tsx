'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { NavItem as NavItemType } from '@/lib/constants/navigation';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onNavigate: () => void;
}

export function NavItem({
  item,
  isActive,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
  onNavigate,
}: NavItemProps) {
  const isDimmed = isAnyHovered && !isHovered;

  return (
    <li
      className="group list-none transition-opacity duration-300"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="flex flex-col">
        {/* Main Link */}
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            'flex items-baseline gap-2.5 sm:gap-3.5 py-1 sm:py-1.5 lg:py-1 xl:py-1.5 transition-all duration-300 outline-none',
            'focus-visible:ring-2 focus-visible:ring-harvest focus-visible:ring-offset-2 focus-visible:ring-offset-forest rounded-sm',
            isDimmed ? 'opacity-40' : 'opacity-100',
            isHovered ? 'translate-x-2 sm:translate-x-3 text-harvest' : 'text-cream'
          )}
        >
          {/* Number indicator */}
          <span
            className={cn(
              'font-display text-[11px] sm:text-xs font-semibold tracking-wider transition-colors duration-300 select-none shrink-0',
              isHovered ? 'text-harvest' : 'text-harvest/60'
            )}
          >
            {item.number}
          </span>

          {/* Title with fluid, responsive typography */}
          <span className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.15rem] 2xl:text-[2.35rem] font-bold tracking-tight leading-[1.18]">
            {item.title}
          </span>

          {/* Reveal Arrow */}
          <span
            className={cn(
              'inline-flex items-center justify-center transition-all duration-300 shrink-0 text-harvest',
              isHovered
                ? 'opacity-100 translate-x-1 -translate-y-1 scale-100'
                : 'opacity-0 translate-x-0 translate-y-0 scale-75 pointer-events-none'
            )}
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
          </span>

          {/* Active Route Dot */}
          {isActive && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-olive-light ml-1 shrink-0 self-center"
              title="Current Page"
              aria-label="(Current page)"
            />
          )}
        </Link>

        {/* Children Links (e.g., Naati Plus & Naati Pro) */}
        {item.children && item.children.length > 0 && (
          <div className="pl-6 sm:pl-8 pt-0.5 pb-1 flex flex-wrap gap-2 sm:gap-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className={cn(
                  'group/child inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-pill border transition-all duration-200 text-xs',
                  'focus-visible:ring-2 focus-visible:ring-harvest focus-visible:ring-offset-2 focus-visible:ring-offset-forest',
                  'border-cream-border/20 bg-forest-surface/70 hover:bg-forest-surface hover:border-harvest/50 text-cream hover:text-harvest'
                )}
              >
                <span className="font-display font-semibold text-xs">{child.title}</span>
                <span className="text-[10px] text-harvest/70 uppercase tracking-wider font-display">
                  ({child.role})
                </span>
                <ArrowUpRight className="w-3 h-3 text-harvest/60 group-hover/child:translate-x-0.5 group-hover/child:-translate-y-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
