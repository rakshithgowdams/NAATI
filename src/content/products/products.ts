import { ProductSummary } from '@/types';

export const PRODUCTS_DATA: Record<string, ProductSummary> = {
  'naati-plus': {
    id: 'naati-plus',
    name: 'Naati Plus',
    category: 'Enriched Vermicompost',
    role: 'Soil Nutrition',
    tagline: 'Fix the Soil. Rebuild Living Fertility.',
    description:
      'High-grade enriched vermicompost formulated to restore soil organic carbon, aggregate structure, beneficial microbial diversity, and root moisture holding capacity.',
    slug: 'naati-plus',
    features: [
      'Replenishes depleted soil organic matter',
      'Improves porosity, aeration, and root penetration',
      'Inoculates native soil biology and microbial life',
      'Maximizes root-zone moisture and cation exchange capacity',
    ],
  },
  'naati-pro': {
    id: 'naati-pro',
    name: 'Naati Pro',
    category: 'Biological Nutrition Assistant',
    role: 'Plant Nutrition',
    tagline: 'Feed the Plant. Unlock Genetic Potential.',
    description:
      'Advanced bio-nutrition formulation delivering bio-available plant nutrients, micronutrient assimilation, vegetative vigour, reproductive fruit set, and harvest quality.',
    slug: 'naati-pro',
    features: [
      'Balanced bio-available plant nutrition',
      'Accelerates vegetative vigour and branch development',
      'Promotes uniform flowering and higher fruit retention',
      'Enhances natural crop defense and abiotic stress resilience',
    ],
  },
};
