/**
 * NAATI ORGANICS — FIELD STORIES & TESTIMONIALS DATA MODEL
 *
 * Dedicated data source for /success-stories ("Voices From The Field").
 *
 * Strict Compliance:
 * - NO fabricated customer identities, false yield statistics, or fictional testimonials.
 * - Stories require both `publicationConsent: true` and `publicationStatus: 'published'` to render publicly.
 * - When no approved stories exist, the website renders the intentional "Voices From The Field" Launch State (STATE B).
 */

export type StoryCategory =
  | 'ALL STORIES'
  | 'FARMER STORIES'
  | 'DEALER EXPERIENCES'
  | 'AGRONOMIST PERSPECTIVES';

export interface StoryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface FieldObservation {
  timeframe?: string;
  observationNotes: string;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export interface FieldStory {
  id: string;
  slug: string;
  title: string;
  category: 'FARMER STORIES' | 'DEALER EXPERIENCES' | 'AGRONOMIST PERSPECTIVES';
  summary: string;
  crop?: string;
  region?: string;
  personName?: string;
  role?: string;
  quote?: string;
  approvedImages?: StoryImage[];
  approvedVideoUrl?: string;
  observation?: FieldObservation;
  documentedOutcomes?: string[];
  sourceReference?: string;
  publicationConsent: boolean;
  publicationStatus: 'draft' | 'under_review' | 'published';
  featured?: boolean;
}

/**
 * Editorial Principles: How We Listen & Document Field Experiences
 */
export interface StoryPrinciple {
  number: string;
  title: string;
  description: string;
}

export const STORY_PRINCIPLES: StoryPrinciple[] = [
  {
    number: '01',
    title: 'LISTEN TO THE EXPERIENCE',
    description:
      'Understand the grower’s context, challenges and observations without jumping to premature conclusions.',
  },
  {
    number: '02',
    title: 'DOCUMENT THE CONTEXT',
    description:
      'Consider the crop, season, soil type, growing conditions, and environmental factors shaping the field.',
  },
  {
    number: '03',
    title: 'SHARE RESPONSIBLY',
    description:
      'Publish experiences clearly, with appropriate permission, transparent disclaimers, and without overstating results.',
  },
];

/**
 * Verified Field Stories Repository
 *
 * Current State: No approved, publication-consented customer testimonials have been supplied by the client yet.
 * When real farmer case studies are verified and approved, add them to this array with `publicationConsent: true`
 * and `publicationStatus: 'published'`. The site will automatically transition from Launch State (State B)
 * to the full archive (State A).
 */
export const FIELD_STORIES: FieldStory[] = [];

/**
 * Helper: Retrieve only publication-approved stories
 */
export function getPublishedStories(): FieldStory[] {
  return FIELD_STORIES.filter(
    (story) => story.publicationConsent === true && story.publicationStatus === 'published'
  );
}

/**
 * Helper: Retrieve featured published story
 */
export function getFeaturedStory(): FieldStory | undefined {
  const published = getPublishedStories();
  return published.find((s) => s.featured) || published[0];
}

/**
 * Helper: Check if approved stories are available
 */
export function hasPublishedStories(): boolean {
  return getPublishedStories().length > 0;
}
