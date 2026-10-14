/**
 * Core domain types for Naati Organics website architecture
 */

export type ProductRole = 'Soil Nutrition' | 'Plant Nutrition';

export interface ProductSummary {
  id: string;
  name: string;
  category: string;
  role: ProductRole;
  tagline: string;
  description: string;
  slug: string;
  features: string[];
}

export type CropGroup =
  | 'Plantation'
  | 'Horticulture'
  | 'Field Crops'
  | 'Vegetables'
  | 'Spices'
  | 'Orchards'
  | 'Urban Gardening';

export interface CropProtocol {
  id: string;
  name: string;
  kannadaName?: string;
  group: CropGroup;
  slug: string;
  overview: string;
  applicationSchedule: {
    stage: string;
    product: string;
    dosage: string;
    method: string;
  }[];
}

export interface SoilLesson {
  id: string;
  title: string;
  slug: string;
  category: 'Soil Physics' | 'Soil Biology' | 'Soil Chemistry' | 'Nutrition Synergy';
  excerpt: string;
  readingTimeMinutes: number;
}
