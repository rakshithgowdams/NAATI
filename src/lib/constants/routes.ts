/**
 * Route architecture and route plan for Naati Organics.
 * Structured for future incremental development phases.
 */

export interface AppRoute {
  path: string;
  name: string;
  category: 'core' | 'product' | 'education' | 'network' | 'utility';
  description: string;
  phase: number;
}

export const APP_ROUTES: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    category: 'core',
    description: 'Storytelling hub: soil health, two-product nutrition system, and brand philosophy.',
    phase: 3,
  },
  {
    path: '/about',
    name: 'About Naati Organics',
    category: 'core',
    description: 'Brand origins, scientific agronomy philosophy, mission, and leadership.',
    phase: 4,
  },
  {
    path: '/nutrition-system',
    name: 'Complete Crop Nutrition System',
    category: 'product',
    description: 'Two-step synergy: Naati Plus (Soil Nutrition) + Naati Pro (Plant Nutrition).',
    phase: 4,
  },
  {
    path: '/products/naati-plus',
    name: 'Naati Plus',
    category: 'product',
    description: 'Soil Nutrition product details: enriched vermicompost, biology, and application.',
    phase: 5,
  },
  {
    path: '/products/naati-pro',
    name: 'Naati Pro',
    category: 'product',
    description: 'Plant Nutrition product details: biological nutrition assistant and growth stages.',
    phase: 5,
  },
  {
    path: '/crop-solutions',
    name: 'Crop Solutions',
    category: 'education',
    description: 'Agronomic guidance categorized by plantation, horticulture, and field crops.',
    phase: 6,
  },
  {
    path: '/crop-solutions/[slug]',
    name: 'Crop Solution Detail',
    category: 'education',
    description: 'Specific crop dosage, schedule, and stage-by-stage nutrition protocol.',
    phase: 6,
  },
  {
    path: '/soil-academy',
    name: 'Soil Learning Centre',
    category: 'education',
    description: 'Soil health education platform: lessons, soil biology, and organic farming science.',
    phase: 7,
  },
  {
    path: '/soil-academy/[slug]',
    name: 'Soil Learning Centre Lesson',
    category: 'education',
    description: 'Individual educational module explaining soil science in depth.',
    phase: 7,
  },
  {
    path: '/resources',
    name: 'Resources & Downloads',
    category: 'utility',
    description: 'Farmer handbooks, application charts, and dosage guides.',
    phase: 8,
  },
  {
    path: '/success-stories',
    name: 'Success Stories',
    category: 'core',
    description: 'Authentic farmer testimonials and verified field observations.',
    phase: 8,
  },
  {
    path: '/dealers',
    name: 'Dealer Network',
    category: 'network',
    description: 'Authorized dealer inquiry, distributor map, and retail locations.',
    phase: 9,
  },
  {
    path: '/faqs',
    name: 'Frequently Asked Questions',
    category: 'utility',
    description: 'Practical answers to soil preparation, product compatibility, and dosage.',
    phase: 9,
  },
  {
    path: '/contact',
    name: 'Contact & Agronomy Support',
    category: 'utility',
    description: 'Advisory inquiry form, direct phone support, and headquarters details.',
    phase: 9,
  },
];
