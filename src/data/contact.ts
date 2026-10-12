/**
 * NAATI ORGANICS — CONTACT & ENQUIRY DATA MODEL
 *
 * Dedicated data model and verified information for /contact.
 * Supports:
 * - 4 Primary Visitor Intentions: General, Product, Crop Guidance, Dealer/Distributor
 * - Context-specific crop lists and stage options
 * - Verified client contact details from brand configuration
 */

import { BRAND_CONFIG } from '@/lib/constants/brand';

export type EnquiryCategory =
  | 'general'
  | 'naati-plus'
  | 'naati-pro'
  | 'crop-guidance'
  | 'dealer';

export interface EnquiryTypeOption {
  id: EnquiryCategory;
  label: string;
  shortLabel: string;
  description: string;
  badge?: string;
}

export const ENQUIRY_TYPES: EnquiryTypeOption[] = [
  {
    id: 'general',
    label: 'General Enquiry',
    shortLabel: 'General',
    description: 'General questions, company information, or agronomy inquiries.',
  },
  {
    id: 'naati-plus',
    label: 'Naati Plus',
    shortLabel: 'Naati Plus',
    description: 'Enriched vermicompost, soil organic matter, dosage, and basal application.',
    badge: 'Soil Nutrition',
  },
  {
    id: 'naati-pro',
    label: 'Naati Pro',
    shortLabel: 'Naati Pro',
    description: 'Biological nutrition assistant, foliar spraying, dilution, and vegetative vigor.',
    badge: 'Plant Nutrition',
  },
  {
    id: 'crop-guidance',
    label: 'Crop Guidance',
    shortLabel: 'Crops',
    description: 'Acre-specific guidance for plantation crops, spices, vegetables, or field crops.',
    badge: 'Agronomy Support',
  },
  {
    id: 'dealer',
    label: 'Dealer / Distributor',
    shortLabel: 'Dealership',
    description: 'Inquiries about retail stockists, regional distribution, or commercial partnerships.',
    badge: 'Partnership',
  },
];

export const CROP_OPTIONS = [
  'Arecanut',
  'Coffee',
  'Coconut',
  'Black Pepper',
  'Ginger & Turmeric',
  'Tomato / Brinjal / Chilli',
  'Onion & Garlic',
  'Leafy Vegetables',
  'Field Crops & Pulses',
  'Cardamom & Spices',
  'Fruit Orchards (Mango, Banana, Citrus)',
  'Other / Not Listed',
];

export const STAGE_OPTIONS = [
  'Pre-planting / Soil Preparation',
  'Early Establishment & Vegetative Growth',
  'Flowering & Fruit Setting',
  'Maturation & Harvest Phase',
  'Post-Harvest Field Maintenance',
  'Seasonal Routine / All Stages',
];

export const VERIFIED_CONTACT_INFO = {
  email: BRAND_CONFIG.socials.email,
  phone: BRAND_CONFIG.socials.phone,
  headquarters: 'Bengaluru, Karnataka, India',
  region: 'Karnataka & South India Agro-Districts',
  hours: 'Monday – Saturday, 9:00 AM – 6:00 PM IST',
  notes: 'Agronomy advisory desks respond to field inquiries promptly during operating hours.',
};
