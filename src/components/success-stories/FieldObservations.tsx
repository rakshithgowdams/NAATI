'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, X, Calendar, MapPin, Sprout, SlidersHorizontal } from 'lucide-react';
import { FieldStory } from '@/data/fieldStories';
import { cn } from '@/lib/utils/cn';

export interface FieldObservationsProps {
  stories: FieldStory[];
  className?: string;
}

/**
 * SUCCESS STORIES — SECTION 04: OBSERVATIONS FROM THE FIELD
 *
 * Conditional: Rendered only when approved observations (before/after photos or video interviews) exist.
 *
 * Eyebrow: 03 / FIELD OBSERVATIONS
 * Headline: "Progress is best understood through observation."
 *
 * Features:
 * - Draggable before-and-after image comparison slider
 *   - Desktop mouse drag
 *   - Mobile touch drag
 *   - Accessible range slider keyboard control
 *   - Divider reaches 0% and 100%
 * - Video experience viewer for approved authentic video links
 * - Transparent observational disclaimers: avoids unverified claims of sole product causation
 */
export function FieldObservations({ stories, className }: FieldObservationsProps) {
  // Collect stories that have observations or videos
  const observationStories = stories.filter(
    (s) =>
      (s.observation?.beforeImage && s.observation?.afterImage) ||
      Boolean(s.approvedVideoUrl)
  );

  // If no stories have verified observations, omit section completely
  if (observationStories.length === 0) {
    return null;
  }

  return (
    <section
      id="field-observations"
      data-nav-theme="light"
      aria-labelledby="observations-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-harvest">
              03 / FIELD OBSERVATIONS
            </span>
            <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
          </div>

          <h2
            id="observations-heading"
            className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-forest-deep tracking-tight leading-[1.12] mb-6"
          >
            Progress is best understood <br />
            <span className="italic font-light">through observation.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-forest-deep/80 leading-relaxed">
            Agricultural outcomes are shaped by soil biology, weather patterns, irrigation and careful field husbandry. We document visual progression transparently, without exaggerating individual inputs.
          </p>
        </div>

        {/* Observation Items */}
        <div className="space-y-16 lg:space-y-24">
          {observationStories.map((story) => (
            <div key={story.id} className="border-t border-forest-deep/15 pt-12">
              {story.observation?.beforeImage && story.observation?.afterImage ? (
                <ComparisonSlider story={story} />
              ) : null}

              {story.approvedVideoUrl ? (
                <VideoExperience story={story} />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Draggable Before / After Comparison Slider
 */
interface ComparisonSliderProps {
  story: FieldStory;
}

function ComparisonSlider({ story }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercent);
  }, []);

  const observation = story.observation;
  if (!observation?.beforeImage || !observation?.afterImage) return null;

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Visual Slider (7 Cols) */}
      <div className="lg:col-span-7">
        <div
          ref={containerRef}
          onMouseDown={() => {
            isDragging.current = true;
          }}
          onMouseUp={() => {
            isDragging.current = false;
          }}
          onMouseLeave={() => {
            isDragging.current = false;
          }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[320px] sm:h-[440px] overflow-hidden select-none touch-none bg-forest-deep border border-forest-deep/20 cursor-ew-resize"
          role="region"
          aria-label="Before and after field observation comparison"
        >
          {/* AFTER Image (Background Base) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={observation.afterImage}
              alt="Field observation after period"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-forest-deep/80 backdrop-blur-sm text-cream font-mono text-xs uppercase tracking-wider">
              {observation.afterLabel || 'Subsequent Observation'}
            </span>
          </div>

          {/* BEFORE Image (Clipped Overlay) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={observation.beforeImage}
              alt="Field observation initial baseline"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-forest-deep/80 backdrop-blur-sm text-cream font-mono text-xs uppercase tracking-wider">
              {observation.beforeLabel || 'Initial Baseline'}
            </span>
          </div>

          {/* Divider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-cream shadow-2xl pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-forest-deep border-2 border-cream flex items-center justify-center text-cream shadow-lg">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Accessible Keyboard Control */}
        <div className="mt-3 flex items-center justify-between text-xs font-mono text-forest-deep/60">
          <span>Drag or use slider to inspect change</span>
          <label className="flex items-center gap-2">
            <span className="sr-only">Comparison Slider Percentage</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="w-28 accent-harvest cursor-pointer"
              aria-label="Before/After percentage position"
            />
            <span>{Math.round(sliderPosition)}%</span>
          </label>
        </div>
      </div>

      {/* Observation Context & Notes (5 Cols) */}
      <div className="lg:col-span-5">
        <div className="flex items-center gap-2 text-xs font-mono text-harvest uppercase font-semibold mb-3">
          {story.crop && (
            <span className="flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5" />
              {story.crop}
            </span>
          )}
          {story.region && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {story.region}
              </span>
            </>
          )}
        </div>

        <h3 className="font-display font-medium text-2xl text-forest-deep mb-4">
          {story.title}
        </h3>

        {observation.timeframe && (
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-forest-deep/70 bg-forest-deep/5 px-2.5 py-1 mb-4 border border-forest-deep/10">
            <Calendar className="w-3 h-3 text-harvest" />
            <span>Documented Timeline: {observation.timeframe}</span>
          </div>
        )}

        <p className="font-sans text-sm sm:text-base text-forest-deep/80 leading-relaxed mb-6">
          {observation.observationNotes}
        </p>

        <div className="text-xs font-mono text-forest-deep/60 p-3 bg-forest-deep/5 border-l-2 border-harvest">
          Note: Visual progression reflects comprehensive farm management, soil aeration and moisture retention during the observed period.
        </div>
      </div>
    </div>
  );
}

/**
 * Authentic Video Experience Viewer
 */
function VideoExperience({ story }: { story: FieldStory }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  if (!story.approvedVideoUrl) return null;

  return (
    <div className="mt-8 bg-forest-deep text-cream p-6 sm:p-10 border border-cream/15">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <div className="relative w-full h-[260px] sm:h-[320px] bg-black flex items-center justify-center overflow-hidden border border-cream/20">
            {isPlaying ? (
              <iframe
                src={story.approvedVideoUrl}
                title={`${story.title} Video Interview`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {story.approvedImages?.[0] && (
                  <Image
                    src={story.approvedImages[0].src}
                    alt={story.title}
                    fill
                    className="object-cover opacity-60"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label={`Play verified video interview for ${story.title}`}
                  className="relative z-10 w-16 h-16 rounded-full bg-harvest text-forest-deep flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                >
                  <Play className="w-6 h-6 ml-0.5 fill-current" />
                </button>
                <span className="relative z-10 mt-3 text-xs font-mono tracking-wider text-cream/90 bg-forest-deep/80 px-3 py-1">
                  Watch Authentic Grower Interview
                </span>
              </div>
            )}

            {isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                aria-label="Close video player"
                className="absolute top-3 right-3 z-20 p-1.5 bg-forest-deep/90 text-cream hover:text-harvest"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="text-xs font-mono text-harvest uppercase font-semibold mb-2">
            Verified Video Testimonial
          </div>
          <h4 className="font-display font-medium text-2xl text-cream mb-3">
            {story.title}
          </h4>
          <p className="font-sans text-sm text-[#B7C1A9] leading-relaxed mb-4">
            Recorded on site with {story.personName || 'grower'}. In their own words, discussing seasonal outcomes and soil observations.
          </p>
          {story.personName && (
            <div className="text-xs font-mono text-cream/80">
              Speaker: {story.personName} {story.role ? `(${story.role})` : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
