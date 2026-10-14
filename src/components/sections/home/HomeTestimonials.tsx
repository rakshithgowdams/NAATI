'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Quote,
  Sparkles,
} from 'lucide-react';
import { gsap, isReducedMotion } from '@/lib/animations/gsap';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';

export interface HomeTestimonialsProps {
  className?: string;
}

export type TestimonialCategory =
  | 'ALL VOICES'
  | 'FARMER STORIES'
  | 'DEALER EXPERIENCES'
  | 'AGRONOMIST OPINIONS';

export interface VideoTestimonial {
  id: string;
  category: 'FARMER STORIES' | 'DEALER EXPERIENCES' | 'AGRONOMIST OPINIONS';
  categoryLabel: string;
  personName: string;
  role: string;
  location: string;
  cropOrSpecialty: string;
  duration: string;
  posterSrc: string;
  posterAlt: string;
  headlineQuote: string;
  fullNarrative: string;
  verifiedTag: string;
}

const TESTIMONIALS_DATA: VideoTestimonial[] = [
  {
    id: 'farmer-arecanut',
    category: 'FARMER STORIES',
    categoryLabel: 'Farmer Story',
    personName: 'Manjunath Gowda',
    role: 'Arecanut & Black Pepper Planter (12 Acres)',
    location: 'Thirthahalli, Shimoga District, Karnataka',
    cropOrSpecialty: '🌴 Arecanut & 🌶️ Black Pepper',
    duration: '2:45 MIN',
    posterSrc: '/assets/images/testimonials/farmer-arecanut.jpg',
    posterAlt: 'Manjunath Gowda in his lush arecanut and pepper plantation in Karnataka',
    headlineQuote:
      'Our soil stays moist for days longer during summer, and young arecanut button shedding has dropped by over 30%.',
    fullNarrative:
      'For over 15 years we relied purely on chemical fertilizers, but our soil turned hard like red cement during hot months. We introduced Naati Plus into root trenches before the south-west monsoons and sprayed Naati Pro during inflorescence. In just two seasons, natural earthworms returned, our soil became loose and dark, and our black pepper spikes are noticeably longer and fuller.',
    verifiedTag: '✓ Verified Field Inspection',
  },
  {
    id: 'farmer-coconut',
    category: 'FARMER STORIES',
    categoryLabel: 'Farmer Story',
    personName: 'Shankarappa K.',
    role: 'Coconut Plantation Grower (18 Acres)',
    location: 'Tiptur, Tumakuru District, Karnataka',
    cropOrSpecialty: '🥥 Coconut Plantation',
    duration: '3:10 MIN',
    posterSrc: '/assets/images/testimonials/farmer-coconut.jpg',
    posterAlt: 'Shankarappa K. resting a hand on a sturdy coconut palm in Tumakuru',
    headlineQuote:
      'The yellowing of coconut fronds stopped within 45 days. Nut weight and copra thickness are consistently Grade A.',
    fullNarrative:
      'Our family grove had severe button drop and yellow fronds. The Naati agronomy team visited our land and advised a circular basin application of Naati Plus in the 2-metre root zone. The palms recovered deep emerald green fronds, new frond emergence accelerated, and our average nut harvest per palm increased reliably without chemical burns.',
    verifiedTag: '✓ Verified Field Inspection',
  },
  {
    id: 'farmer-coffee',
    category: 'FARMER STORIES',
    categoryLabel: 'Farmer Story',
    personName: 'Bopanna M.',
    role: 'Shade-Grown Arabica & Robusta Planter',
    location: 'Mudigere, Chikmagalur District, Karnataka',
    cropOrSpecialty: '☕ Shade-Grown Coffee',
    duration: '2:15 MIN',
    posterSrc: '/assets/images/testimonials/farmer-coffee.jpg',
    posterAlt: 'Bopanna M. among ripe coffee cherries in Chikmagalur Western Ghats',
    headlineQuote:
      'Naati Pro applied post-blossom gave us the most uniform berry cluster development we have seen in a decade.',
    fullNarrative:
      'Western Ghats estate coffee demands a balanced organic touch that preserves forest mulch and native shade canopies. Naati Pro gave our bushes an immediate foliar boost right after blossom showers. Berry pinhead retention was remarkable, and final bean density at the curing works reached premium specialty grades.',
    verifiedTag: '✓ Verified Field Inspection',
  },
  {
    id: 'dealer-experience',
    category: 'DEALER EXPERIENCES',
    categoryLabel: 'Dealer Experience',
    personName: 'Ramesh Patel',
    role: 'Proprietor, Ravi Agro Solutions',
    location: 'Mandya Agro-Belt, Karnataka',
    cropOrSpecialty: 'Authorized Agro Stockist',
    duration: '2:30 MIN',
    posterSrc: '/assets/images/testimonials/dealer-experience.jpg',
    posterAlt: 'Ramesh Patel in his agricultural service center in Mandya',
    headlineQuote:
      'Farmers don’t just buy Naati once; they return before every monsoon because their own soil tests prove it works.',
    fullNarrative:
      'Running an agro-inputs store for 18 years, I have seen dozens of organic brands make tall promises. Naati Organics stands apart because their agronomy team actually spends time in farmers’ fields. When growers see genuine root nodulation and reduced irrigation stress, they become lifelong advocates. It is one of our highest repeat-order products.',
    verifiedTag: '✓ Authorized Dealership Partner',
  },
  {
    id: 'agronomist-opinion',
    category: 'AGRONOMIST OPINIONS',
    categoryLabel: 'Agronomist Opinion',
    personName: 'Dr. Rajeshwari K.',
    role: 'Senior Soil Microbiologist & Crop Consultant',
    location: 'Bengaluru Agricultural Advisory, Karnataka',
    cropOrSpecialty: 'Soil Microbial Ecology & Pathology',
    duration: '3:40 MIN',
    posterSrc: '/assets/images/testimonials/agronomist-opinion.jpg',
    posterAlt: 'Dr. Rajeshwari K. with soil core testing equipment in research field',
    headlineQuote:
      'The microbial consortium in Naati Plus promotes true mycorrhizal root colonisation and organic carbon buildup without salt stress.',
    fullNarrative:
      'In tropical red loam and laterite soils, chemical NPK inputs cause rapid organic carbon oxidation and soil compaction. Naati Plus inoculates the root zone with beneficial bio-fermented carbon and stable mycorrhizae. This bio-system unlocks fixed soil phosphorus, improves cation exchange capacity, and makes plants naturally resilient to drought and pathogens.',
    verifiedTag: '✓ Certified Agronomic Evaluation',
  },
];

const CATEGORIES: { id: TestimonialCategory; label: string }[] = [
  { id: 'ALL VOICES', label: 'All Voices' },
  { id: 'FARMER STORIES', label: 'Farmer Stories' },
  { id: 'DEALER EXPERIENCES', label: 'Dealer Experiences' },
  { id: 'AGRONOMIST OPINIONS', label: 'Agronomist Opinions' },
];

/**
 * HOMEPAGE SECTION 10 — TESTIMONIALS (VOICES FROM THE FIELD)
 *
 * SECTION 10 – TESTIMONIALS
 * Voices from the Field
 * (Video Carousel)
 * Farmer Stories
 * Dealer Experiences
 * Agronomist Opinions
 */
export function HomeTestimonials({ className }: HomeTestimonialsProps) {
  const [selectedCategory, setSelectedCategory] = useState<TestimonialCategory>('ALL VOICES');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModalVideo, setActiveModalVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Filtered stories based on current category
  const filteredStories =
    selectedCategory === 'ALL VOICES'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((story) => story.category === selectedCategory);

  // Keep index within bounds when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.testi-header-anim'),
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredStories.length - 1));
  }, [filteredStories.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredStories.length - 1 ? prev + 1 : 0));
  }, [filteredStories.length]);

  const openVideoModal = (story: VideoTestimonial) => {
    setActiveModalVideo(story);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    setActiveModalVideo(null);
    setIsPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-nav-theme="dark"
      aria-labelledby="testimonials-heading"
      className={cn(
        'relative w-full bg-[#0E170A] text-cream py-20 sm:py-28 lg:py-36 overflow-hidden selection:bg-harvest selection:text-forest-deep',
        className
      )}
    >
      {/* Ambient background glow & fine grid */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-olive/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute top-0 inset-x-0 h-px bg-white/10 z-10" />

      <Container size="default">
        {/* =====================================================================
            01 — SECTION HEADER (Client Specification)
            SECTION 10 – TESTIMONIALS
            Voices from the Field
            (Video Carousel)
            Farmer Stories | Dealer Experiences | Agronomist Opinions
            ===================================================================== */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="testi-header-anim inline-flex items-center gap-2 mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-harvest animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-harvest">
                SECTION 10 – TESTIMONIALS
              </span>
            </div>

            <h2
              id="testimonials-heading"
              className="testi-header-anim font-display font-medium text-[clamp(2.35rem,4.5vw,4.2rem)] leading-[1.08] tracking-[-0.03em] text-cream"
            >
              Voices from the Field.
            </h2>

            <p className="testi-header-anim font-sans text-base sm:text-lg text-cream/75 mt-3.5 max-w-xl leading-relaxed">
              Authentic field documentary journeys, dealer observations, and independent agronomy evaluations from across South Indian soils.
            </p>
          </div>

          {/* Category Filter Pills (Client Specified) */}
          <div className="testi-header-anim flex flex-wrap items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all duration-200 cursor-pointer select-none',
                    isSelected
                      ? 'bg-harvest text-forest-deep shadow-xs'
                      : 'text-cream/70 hover:text-cream hover:bg-white/10'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            02 — INTERACTIVE VIDEO CAROUSEL
            ===================================================================== */}
        <div className="relative">
          {/* Carousel Navigation Arrows */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cream/60">
              <span className="text-harvest font-bold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(filteredStories.length).padStart(2, '0')}</span>
              <span className="mx-2 text-white/20">|</span>
              <span className="uppercase tracking-wider text-[11px] text-cream/70 hidden sm:inline">
                {selectedCategory} VIDEO CAROUSEL
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-harvest bg-white/5 hover:bg-harvest hover:text-forest-deep text-cream flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/20 hover:border-harvest bg-white/5 hover:bg-harvest hover:text-forest-deep text-cream flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Cards Viewport */}
          <div className="overflow-hidden">
            <div
              ref={carouselTrackRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-out"
            >
              {filteredStories.map((story, idx) => {
                const isCurrentActive = idx === currentIndex;

                return (
                  <article
                    key={story.id}
                    className={cn(
                      'relative rounded-3xl bg-[#142310]/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-warm-md',
                      isCurrentActive
                        ? 'border-harvest/50 ring-1 ring-harvest/30'
                        : 'border-white/10 hover:border-white/30'
                    )}
                  >
                    {/* Top: Video Thumbnail Stage with Play Button */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-forest-deep/60">
                      <Image
                        src={story.posterSrc}
                        alt={story.posterAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={88}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Video Gradient Vignette */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#142310] via-black/30 to-black/30"
                        aria-hidden="true"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-forest-deep/85 backdrop-blur-md text-harvest border border-harvest/30">
                          {story.categoryLabel}
                        </span>

                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-cream/90 border border-white/15">
                          <Clock className="w-3 h-3 text-harvest" />
                          <span>{story.duration}</span>
                        </span>
                      </div>

                      {/* Play Button Trigger Overlay */}
                      <button
                        type="button"
                        onClick={() => openVideoModal(story)}
                        aria-label={`Play video testimonial of ${story.personName}`}
                        className="absolute inset-0 flex items-center justify-center z-10 group/play cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-harvest"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-harvest text-forest-deep flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/play:scale-110 group-hover/play:bg-cream">
                          <Play className="w-6 h-6 fill-forest-deep ml-1" />
                        </div>
                      </button>

                      {/* Crop/Specialty Pill on Thumbnail Bottom */}
                      <div className="absolute bottom-3 left-4 z-10 pointer-events-none">
                        <span className="font-sans text-xs font-semibold text-cream bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {story.cropOrSpecialty}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Editorial Testimonial Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Pull Quote */}
                        <div className="relative mb-4">
                          <Quote className="w-6 h-6 text-harvest/30 absolute -top-2 -left-1 pointer-events-none" />
                          <p className="font-display italic text-base sm:text-lg text-cream leading-snug pl-4">
                            &ldquo;{story.headlineQuote}&rdquo;
                          </p>
                        </div>

                        {/* Narrative Snippet */}
                        <p className="font-sans text-xs sm:text-[13px] text-cream/70 line-clamp-3 leading-relaxed mb-4">
                          {story.fullNarrative}
                        </p>
                      </div>

                      {/* Speaker Profile Footer */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-medium text-sm sm:text-base text-cream">
                            {story.personName}
                          </h4>
                          <p className="font-sans text-xs text-cream/60 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-harvest" />
                            <span>{story.location}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => openVideoModal(story)}
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-cream/80 hover:text-harvest flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Expand story details"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {filteredStories.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                  dotIdx === currentIndex ? 'w-8 bg-harvest' : 'w-2 bg-white/20 hover:bg-white/40'
                )}
              />
            ))}
          </div>
        </div>

        {/* =====================================================================
            03 — SECTION CLOSING ACTION (Links to /success-stories)
            ===================================================================== */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-harvest/10 flex items-center justify-center text-harvest shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-sans text-sm sm:text-base font-semibold text-cream">
                Every field has a story. What is yours?
              </p>
              <p className="font-sans text-xs text-cream/60 mt-0.5">
                Join hundreds of verified growers sharing real observations from the ground up.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-harvest text-forest-deep font-sans text-sm font-semibold hover:bg-cream transition-colors group shadow-warm-xs"
            >
              <span>Explore All Field Stories</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/contact?intent=crop-guidance"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-cream font-sans text-sm font-medium border border-white/15 transition-colors"
            >
              <span>Share Your Field Journey</span>
            </Link>
          </div>
        </div>
      </Container>

      {/* =====================================================================
          04 — INTERACTIVE VIDEO TESTIMONIAL MODAL
          ===================================================================== */}
      {activeModalVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-[#142310] border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={closeVideoModal}
              aria-label="Close video testimonial"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-cream flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Frame Container */}
            <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
              <Image
                src={activeModalVideo.posterSrc}
                alt={activeModalVideo.posterAlt}
                fill
                quality={92}
                className={cn(
                  'object-cover transition-opacity duration-300',
                  isPlaying ? 'opacity-85' : 'opacity-60'
                )}
              />

              {/* Simulated Video Overlay & Playback HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Video Play/Pause Center Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-harvest text-forest-deep flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <Play className="w-8 h-8 fill-forest-deep ml-1" />
              </button>

              {/* Video Scrubber & Controls Bar */}
              <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-cream text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-harvest animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-harvest uppercase tracking-wider">
                    {activeModalVideo.duration} VIDEO LOG
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 hover:text-harvest transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[10px] text-cream/70">
                    {activeModalVideo.verifiedTag}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Detail Narrative */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-harvest text-forest-deep">
                  {activeModalVideo.categoryLabel}
                </span>
                <span className="font-mono text-xs text-cream/70 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-harvest" />
                  <span>{activeModalVideo.cropOrSpecialty}</span>
                </span>
              </div>

              <h3
                id="video-modal-title"
                className="font-display font-medium text-xl sm:text-2xl text-cream mb-2"
              >
                {activeModalVideo.personName}
              </h3>
              <p className="font-sans text-xs text-cream/70 mb-4">
                {activeModalVideo.role} · {activeModalVideo.location}
              </p>

              {/* Pull quote */}
              <blockquote className="p-4 rounded-2xl bg-white/5 border border-white/10 font-display italic text-base sm:text-lg text-harvest mb-4">
                &ldquo;{activeModalVideo.headlineQuote}&rdquo;
              </blockquote>

              {/* Full narrative */}
              <p className="font-sans text-sm text-cream/80 leading-relaxed mb-6">
                {activeModalVideo.fullNarrative}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-cream/60">
                  Naati Organics · Farmer Trust Series
                </span>
                <Link
                  href="/success-stories"
                  onClick={closeVideoModal}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-harvest hover:text-cream transition-colors"
                >
                  <span>View All Stories</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Backward-compatible alias
export const Section10Testimonials = HomeTestimonials;
