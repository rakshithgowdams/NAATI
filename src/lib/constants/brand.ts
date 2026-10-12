/**
 * Naati Organics Brand Constants
 * Single source of truth for brand metadata, philosophy, and color definitions.
 */

export const BRAND_CONFIG = {
  name: 'Naati Organics',
  domain: 'www.naatiorganics.com',
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.naatiorganics.com',
  tagline: 'Fix the Soil. Feed the Plant.',
  vision: 'India’s Knowledge-Led Soil Health & Crop Nutrition Platform',
  description:
    'Naati Organics delivers scientific, biological crop nutrition through the Naati Complete Crop Nutrition System: Naati Plus (Soil Nutrition) and Naati Pro (Plant Nutrition).',
  products: {
    plus: {
      name: 'Naati Plus',
      category: 'Enriched Vermicompost',
      role: 'Soil Nutrition',
      focus: 'Organic matter, soil structure, beneficial soil biology, root environment and moisture retention.',
      slug: 'naati-plus',
    },
    pro: {
      name: 'Naati Pro',
      category: 'Biological Nutrition Assistant',
      role: 'Plant Nutrition',
      focus: 'Balanced plant nutrition, vegetative growth, flowering, fruit development and crop performance.',
      slug: 'naati-pro',
    },
  },
  colors: {
    forestGreen: '#203817',
    oliveGreen: '#637B43',
    warmCream: '#F5F1E7',
    earthBrown: '#654A32',
    harvestAccent: '#DDCE9A',
  },
  socials: {
    phone: '+91 99000 00000',
    email: 'info@naatiorganics.com',
  },
} as const;
