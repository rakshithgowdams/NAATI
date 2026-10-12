import { CropProtocol } from '@/types';

export const CROP_PROTOCOLS: Record<string, CropProtocol> = {
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
  pepper: {
    id: 'pepper',
    name: 'Black Pepper',
    kannadaName: 'ಕಾಳುಮೆಣಸು (Kalu Menasu)',
    group: 'Plantation',
    slug: 'pepper',
    overview:
      'Targeted soil and vine bio-nutrition for healthy root anchoring on standard trees, spike development, and berry density.',
    applicationSchedule: [],
  },
};
