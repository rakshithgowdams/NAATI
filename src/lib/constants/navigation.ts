/**
 * Navigation Configuration for Naati Organics
 * Centralized data source for desktop navbar, full-screen overlay, and mobile navigation.
 */

export interface NavChildLink {
  title: string;
  role: string;
  href: string;
  description: string;
}

export interface NavItem {
  id: string;
  number: string;
  title: string;
  href: string;
  description?: string;
  children?: NavChildLink[];
}

export interface SecondaryNavLink {
  title: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    number: '01',
    title: 'Home',
    href: '/',
    description: 'Storytelling hub & soil philosophy',
  },
  {
    id: 'about',
    number: '02',
    title: 'About Naati',
    href: '/about',
    description: 'Brand origins & agronomy science',
  },
  {
    id: 'nutrition-system',
    number: '03',
    title: 'Complete Nutrition System',
    href: '/nutrition-system',
    description: 'Two-step synergy: Soil Nutrition + Plant Nutrition',
    children: [
      {
        title: 'Naati Plus',
        role: 'Soil Nutrition',
        href: '/products/naati-plus',
        description: 'Enriched vermicompost restoring soil structure, organic matter & root biology',
      },
      {
        title: 'Naati Pro',
        role: 'Plant Nutrition',
        href: '/products/naati-pro',
        description: 'Biological nutrition assistant promoting vegetative vigour & crop performance',
      },
    ],
  },
  {
    id: 'crop-solutions',
    number: '04',
    title: 'Crop Solutions',
    href: '/crop-solutions',
    description: 'Arecanut, Coffee, Coconut, Pepper & field crop protocols',
  },
  {
    id: 'soil-academy',
    number: '05',
    title: 'Soil Academy',
    href: '/soil-academy',
    description: 'Farmer education hub & soil science lessons',
  },
  {
    id: 'resources',
    number: '06',
    title: 'Resources',
    href: '/resources',
    description: 'Field guides, publications, media & downloads',
  },
  {
    id: 'farmer-stories',
    number: '07',
    title: 'Farmer Stories',
    href: '/success-stories',
    description: 'Verified grower experiences & harvest results',
  },
  {
    id: 'dealers',
    number: '08',
    title: 'Dealer Network',
    href: '/dealer-network',
    description: 'Dealership opportunities & distribution partnerships',
  },
  {
    id: 'contact',
    number: '09',
    title: 'Contact',
    href: '/contact',
    description: 'Direct inquiries & agricultural support',
  },
];

export const SECONDARY_NAV_LINKS: SecondaryNavLink[] = [
  {
    title: 'Frequently Asked Questions',
    href: '/faqs',
  },
  {
    title: 'Contact Naati Organics',
    href: '/contact',
  },
  {
    title: 'Return to Homepage',
    href: '/',
  },
];

export const NAV_BRAND_INFO = {
  tagline: 'Fix the Soil. Feed the Plant.',
  philosophy:
    'A scientific, knowledge-led agricultural platform dedicated to restoring living soil biology and unlocking balanced plant nutrition.',
};
