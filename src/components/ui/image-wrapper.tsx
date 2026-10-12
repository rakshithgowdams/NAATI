import React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface ImageWrapperProps extends Omit<ImageProps, 'className'> {
  wrapperClassName?: string;
  imageClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'wide' | 'auto';
  rounded?: 'none' | 'subtle' | 'card' | 'panel' | 'pill';
  withBorder?: boolean;
}

const ASPECT_RATIOS = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[21/9]',
  auto: '',
};

const ROUNDED_CLASSES = {
  none: 'rounded-none',
  subtle: 'rounded-subtle',
  card: 'rounded-card',
  panel: 'rounded-panel',
  pill: 'rounded-pill',
};

export function ImageWrapper({
  wrapperClassName,
  imageClassName,
  aspectRatio = 'auto',
  rounded = 'card',
  withBorder = false,
  alt,
  src,
  fill = true,
  ...props
}: ImageWrapperProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-cream-muted/60 transition-all duration-300',
        ASPECT_RATIOS[aspectRatio],
        ROUNDED_CLASSES[rounded],
        withBorder && 'border border-cream-border',
        wrapperClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={cn('object-cover duration-500 ease-out', imageClassName)}
        {...props}
      />
    </div>
  );
}
