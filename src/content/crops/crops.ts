import { CropProtocol } from '@/types';

export const CROP_PROTOCOLS: Record<string, CropProtocol> = {
  coconut: {
    id: 'coconut',
    name: 'Coconut',
    kannadaName: 'ತೆಂಗು (Thengu)',
    group: 'Plantation',
    slug: 'coconut',
    overview:
      'Root-zone nutrition program addressing yellowing leaves, crown vigor, button shedding, and copra weight.',
    applicationSchedule: [],
  },
  arecanut: {
    id: 'arecanut',
    name: 'Arecanut',
    kannadaName: 'ಅಡಿಕೆ (Adike)',
    group: 'Plantation',
    slug: 'arecanut',
    overview:
      'Nutritional protocol tailored for Arecanut palms, focusing on root-zone aeration, nut retention, and healthy crown development.',
    applicationSchedule: [],
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    kannadaName: 'ಕಾಫಿ (Coffee)',
    group: 'Plantation',
    slug: 'coffee',
    overview:
      'Nutritional management for Arabica and Robusta plantations to optimize bush framing, berry clusters, and soil humus in shade-grown tracts.',
    applicationSchedule: [],
  },
  pepper: {
    id: 'pepper',
    name: 'Black Pepper',
    kannadaName: 'ಕಾಳುಮೆಣಸು (Kalu Menasu)',
    group: 'Spices',
    slug: 'pepper',
    overview:
      'Targeted soil and vine bio-nutrition for healthy root anchoring on standard trees, spike development, and berry density.',
    applicationSchedule: [],
  },
  banana: {
    id: 'banana',
    name: 'Banana',
    kannadaName: 'ಬಾಳೆ (Bale)',
    group: 'Horticulture',
    slug: 'banana',
    overview:
      'Rapid pseudostem growth, deep pit soil aeration, shooting initiation, and heavy bunch finger development.',
    applicationSchedule: [],
  },
  mango: {
    id: 'mango',
    name: 'Mango',
    kannadaName: 'ಮಾವು (Mavu)',
    group: 'Orchards',
    slug: 'mango',
    overview:
      'Canopy drip-line feeder root replenishment, panicle retention, and pea-stage fruitlet sizing.',
    applicationSchedule: [],
  },
  vegetables: {
    id: 'vegetables',
    name: 'Vegetables',
    kannadaName: 'ತರಕಾರಿಗಳು (Tarakarigalu)',
    group: 'Vegetables',
    slug: 'vegetables',
    overview:
      'Raised bed conditioning, transplant recovery, continuous floral retention, and heavy fruit yields.',
    applicationSchedule: [],
  },
  field_crops: {
    id: 'field-crops',
    name: 'Field Crops',
    kannadaName: 'ಕ್ಷೇತ್ರ ಬೆಳೆಗಳು (Kshethra Belegalu)',
    group: 'Field Crops',
    slug: 'field-crops',
    overview:
      'Basal moisture resilience, crown-root emergence, tillering drive, and uniform panicle grain filling.',
    applicationSchedule: [],
  },
  spices: {
    id: 'spices',
    name: 'Spices',
    kannadaName: 'ಮಸಾಲೆ ಬೆಳೆಗಳು (Masale Belegalu)',
    group: 'Spices',
    slug: 'spices',
    overview:
      'Loose mound aeration, tillering expansion, rhizome bulking, and essential oil concentration for turmeric and ginger.',
    applicationSchedule: [],
  },
  terrace_gardens: {
    id: 'terrace-gardens',
    name: 'Home / Terrace Gardens',
    kannadaName: 'ಮನೆ/ಟೆರೇಸ್ ಗಾರ್ಡನ್ (Terrace Garden)',
    group: 'Urban Gardening',
    slug: 'terrace-gardens',
    overview:
      '100% natural, residue-free biological nutrition rejuvenating container potting soils and grow bags.',
    applicationSchedule: [],
  },
};
