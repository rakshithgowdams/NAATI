/**
 * NAATI ORGANICS — FREQUENTLY ASKED QUESTIONS DATA REPOSITORY
 *
 * Route: /faqs
 *
 * Strict Compliance:
 * - Direct, accurate, scientifically cautious answers.
 * - NO invented dosage figures, unverified mixing instructions, or universal compatibility claims.
 * - Deep linking slugs for accessible anchor sharing.
 * - Verified cross-links to /soil-academy, /nutrition-system, /products/naati-plus,
 *   /products/naati-pro, /crop-solutions, /dealer-network, and /contact.
 */

export type FaqCategorySlug =
  | 'soil-health'
  | 'naati-products'
  | 'application-usage'
  | 'dealers-partnerships';

export interface FaqCategory {
  slug: FaqCategorySlug;
  number: string;
  name: string;
  shortLabel: string;
  description: string;
}

export interface FaqItem {
  id: string;
  slug: string;
  category: FaqCategorySlug;
  categoryLabel: string;
  number: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  relatedLink?: string;
  relatedLabel?: string;
  keywords: string[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: 'soil-health',
    number: '01',
    name: 'SOIL HEALTH',
    shortLabel: '01 / SOIL HEALTH',
    description:
      'Understanding living soil systems, organic matter dynamics, and biological soil stewardship.',
  },
  {
    slug: 'naati-products',
    number: '02',
    name: 'NAATI PRODUCTS',
    shortLabel: '02 / NAATI PRODUCTS',
    description:
      'The foundational roles of Naati Plus (Soil Nutrition) and Naati Pro (Plant Nutrition).',
  },
  {
    slug: 'application-usage',
    number: '03',
    name: 'APPLICATION & USAGE',
    shortLabel: '03 / APPLICATION',
    description:
      'Responsible usage guidance, seasonal considerations, and agronomic consultation.',
  },
  {
    slug: 'dealers-partnerships',
    number: '04',
    name: 'DEALERS & PARTNERSHIPS',
    shortLabel: '04 / DEALER NETWORK',
    description:
      'Commercial retail distribution, institutional partnerships, and grower advisory support.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  // =========================================================================
  // CATEGORY 01: SOIL HEALTH
  // =========================================================================
  {
    id: 'sh-01',
    slug: 'what-is-soil-health',
    category: 'soil-health',
    categoryLabel: '01 / SOIL HEALTH',
    number: '01',
    question: 'What is soil health?',
    shortAnswer:
      'Soil health is the continued capacity of soil to function as a vital living ecosystem that sustains plants, animals, and humans.',
    detailedAnswer: [
      'Healthy soil is not an inert substrate or simple dirt; it is a complex, dynamic living system composed of mineral particles, organic matter, soil water, pore air, and billions of microscopic and macroscopic organisms including beneficial bacteria, mycorrhizal fungi, protozoa, and earthworms.',
      'When biological, physical, and chemical properties are in equilibrium, the soil breathes, holds moisture, cycles plant nutrients naturally, resists compaction, and fosters resilient crop root systems.',
    ],
    relatedLink: '/soil-academy',
    relatedLabel: 'Explore Soil Academy Lessons ↗',
    keywords: [
      'soil health',
      'living soil',
      'soil ecosystem',
      'biology',
      'microbes',
      'what is soil',
      'earthworms',
    ],
  },
  {
    id: 'sh-02',
    slug: 'why-does-organic-matter-matter',
    category: 'soil-health',
    categoryLabel: '01 / SOIL HEALTH',
    number: '02',
    question: 'Why does organic matter matter?',
    shortAnswer:
      'Soil organic matter is the biological powerhouse that binds soil aggregates, stores water, feeds microbes, and buffers nutrient availability.',
    detailedAnswer: [
      'Soil organic matter (SOM) directly influences physical soil structure by creating stable crumb aggregates that resist erosion and crusting. It functions like a biological sponge, significantly boosting water-holding capacity so crops withstand dry spells more effectively.',
      'Furthermore, organic matter serves as the primary food source for beneficial soil microorganisms. As microbes metabolize organic carbon, they gradually convert locked mineral compounds into plant-accessible forms and stabilize cation exchange capacity (CEC).',
    ],
    relatedLink: '/soil-academy',
    relatedLabel: 'Learn About Organic Carbon Dynamics ↗',
    keywords: [
      'organic matter',
      'carbon',
      'water retention',
      'soil structure',
      'crumb aggregates',
      'microbial food',
      'humus',
    ],
  },
  {
    id: 'sh-03',
    slug: 'how-can-i-improve-my-soil-naturally',
    category: 'soil-health',
    categoryLabel: '01 / SOIL HEALTH',
    number: '03',
    question: 'How can I improve my soil naturally?',
    shortAnswer:
      'Naturally revitalizing soil requires consistent replenishment of stable organic carbon, minimizing excessive physical disturbance, and supporting soil biology.',
    detailedAnswer: [
      'Soil regeneration is an ongoing seasonal journey rather than an overnight fix. Essential practices include replenishing organic matter through mature vermicompost, maintaining living roots or protective mulch to shield topsoil from solar baking, and avoiding excessive mechanical pulverization.',
      'Because every farm has unique soil texture, local water salinity, and crop history, sustainable improvement begins with testing and understanding your baseline conditions rather than relying on quick synthetic stimulants.',
    ],
    relatedLink: '/soil-academy',
    relatedLabel: 'Read Soil Regeneration Principles ↗',
    keywords: [
      'improve soil naturally',
      'regenerate soil',
      'organic practices',
      'soil disturbance',
      'mulch',
      'vermicompost',
      'aeration',
    ],
  },

  // =========================================================================
  // CATEGORY 02: NAATI PRODUCTS
  // =========================================================================
  {
    id: 'np-01',
    slug: 'what-is-the-difference-between-naati-plus-and-naati-pro',
    category: 'naati-products',
    categoryLabel: '02 / NAATI PRODUCTS',
    number: '04',
    question: 'What is the difference between Naati Plus and Naati Pro?',
    shortAnswer:
      'Naati Plus builds the soil foundation; Naati Pro feeds and activates the plant.',
    detailedAnswer: [
      'Naati Plus is our Soil Nutrition product—an enriched, biologically active vermicompost formulation designed to improve soil physical structure, replenish organic carbon, stimulate beneficial microbial colonies, and enhance root architecture in the rhizosphere.',
      'Naati Pro is our Plant Nutrition bio-activator—a targeted bio-stimulant formulated to support vegetative vigor, enzyme activation, flowering uniformity, fruit set, and abiotic stress resilience during critical physiological crop stages.',
    ],
    relatedLink: '/nutrition-system',
    relatedLabel: 'Explore the Two-Product Nutrition System ↗',
    keywords: [
      'difference between naati plus and naati pro',
      'naati plus vs naati pro',
      'vermicompost',
      'bio-activator',
      'fix the soil feed the plant',
      'plant nutrition',
      'soil nutrition',
    ],
  },
  {
    id: 'np-02',
    slug: 'can-naati-plus-and-naati-pro-be-used-together',
    category: 'naati-products',
    categoryLabel: '02 / NAATI PRODUCTS',
    number: '05',
    question: 'Can Naati Plus and Naati Pro be used together?',
    shortAnswer:
      'Yes, they are purposefully formulated to work in synergy as a holistic crop nutrition system.',
    detailedAnswer: [
      'Our philosophy is "Fix the Soil. Feed the Plant." When Naati Plus establishes a biologically fertile, well-aerated soil base, crop roots develop more extensively. This enhanced root surface area enables the crop to absorb and utilize the foliar and metabolic benefits of Naati Pro with greater physiological efficiency.',
      'While they work together systematically, they address different parts of the agricultural cycle. Please refer to our verified nutrition system and crop guidance for timing and protocols.',
    ],
    relatedLink: '/nutrition-system',
    relatedLabel: 'See Synergistic Nutrition System ↗',
    keywords: [
      'use together',
      'synergy',
      'combination',
      'two product approach',
      'compatibility',
      'soil and plant',
    ],
  },
  {
    id: 'np-03',
    slug: 'are-naati-products-suitable-for-all-crops',
    category: 'naati-products',
    categoryLabel: '02 / NAATI PRODUCTS',
    number: '06',
    question: 'Are Naati products suitable for all crops?',
    shortAnswer:
      'Naati products are formulated for broad agricultural applicability, but dosage and timing depend on crop type and soil conditions.',
    detailedAnswer: [
      'Because every crop has distinct nutrient uptake curves, root architectures, and seasonal life cycles, we avoid making blanket universal promises. Naati Plus and Naati Pro have established protocols across plantations (Arecanut, Coffee, Coconut), horticultural crops, vegetables, and commercial field crops.',
      'We encourage farmers to review our dedicated Crop Solutions guide or consult with our agronomy team to verify appropriate rates and schedules for your specific crop and region.',
    ],
    relatedLink: '/crop-solutions',
    relatedLabel: 'Browse Crop Protocols & Guidance ↗',
    keywords: [
      'all crops',
      'crop suitability',
      'arecanut',
      'coffee',
      'coconut',
      'horticulture',
      'vegetables',
      'plantation',
    ],
  },

  // =========================================================================
  // CATEGORY 03: APPLICATION & USAGE
  // =========================================================================
  {
    id: 'au-01',
    slug: 'when-should-i-apply-naati-plus',
    category: 'application-usage',
    categoryLabel: '03 / APPLICATION',
    number: '07',
    question: 'When should I apply Naati Plus?',
    shortAnswer:
      'Naati Plus is primarily applied during land preparation, planting, or seasonal root zone replenishment.',
    detailedAnswer: [
      'For annual field crops and vegetables, Naati Plus is ideally incorporated into the top 10–15 cm of soil during basal land preparation or at planting/transplanting to give developing seedlings an active microbial environment.',
      'For perennial plantation crops such as Arecanut, Coffee, and Coconut, application typically aligns with pre-monsoon and post-monsoon soil replenishment cycles within the active root basin. Always consult the official packaging label and technical protocol for verified timing.',
    ],
    relatedLink: '/products/naati-plus',
    relatedLabel: 'View Naati Plus Application Details ↗',
    keywords: [
      'when to apply naati plus',
      'basal application',
      'soil preparation',
      'root zone',
      'monsoon timing',
      'plantation timing',
      'dosage',
    ],
  },
  {
    id: 'au-02',
    slug: 'how-often-should-i-use-naati-pro',
    category: 'application-usage',
    categoryLabel: '03 / APPLICATION',
    number: '08',
    question: 'How often should I use Naati Pro?',
    shortAnswer:
      'Application frequency corresponds to key physiological growth stages rather than an arbitrary calendar schedule.',
    detailedAnswer: [
      'As a biological bio-activator, Naati Pro is designed to assist plants during critical metabolic transition periods: vigorous vegetative development, pre-flowering branch flushes, and early fruit or grain development.',
      'The exact number of applications and interval depends on the crop lifecycle and ambient environmental stress. Please refer to the verified crop-specific schedule on the product carton or consult our agronomy support team.',
    ],
    relatedLink: '/products/naati-pro',
    relatedLabel: 'View Naati Pro Physiological Guide ↗',
    keywords: [
      'how often use naati pro',
      'application frequency',
      'growth stages',
      'flowering stage',
      'vegetative stage',
      'bio-activator frequency',
    ],
  },
  {
    id: 'au-03',
    slug: 'can-i-use-naati-products-with-other-nutrient-management-practices',
    category: 'application-usage',
    categoryLabel: '03 / APPLICATION',
    number: '09',
    question: 'Can I use Naati products with other nutrient-management practices?',
    shortAnswer:
      'Yes, when integrated thoughtfully alongside existing balanced crop management programs.',
    detailedAnswer: [
      'Naati products are designed to enhance biological nutrient cycling and soil structure, which often improves the efficiency of overall farm inputs. However, compatibility depends entirely on the specific inputs in your existing program.',
      'We do not recommend arbitrary tank-mixing with harsh chemical eradicants or unverified compounds without prior jar testing or technical consultation. Contact our agronomy team with your current spray or fertilizer schedule for tailored compatibility guidance.',
    ],
    relatedLink: '/contact',
    relatedLabel: 'Consult Agronomy Advisory Team ↗',
    keywords: [
      'compatibility',
      'other fertilizers',
      'nutrient management',
      'tank mix',
      'integrated nutrient management',
      'chemical compatibility',
    ],
  },

  // =========================================================================
  // CATEGORY 04: DEALERS & PARTNERSHIPS
  // =========================================================================
  {
    id: 'dp-01',
    slug: 'how-can-i-become-a-naati-dealer',
    category: 'dealers-partnerships',
    categoryLabel: '04 / DEALER NETWORK',
    number: '10',
    question: 'How can I become a Naati dealer?',
    shortAnswer:
      'Agricultural retailers and regional distributors can submit a partnership enquiry through our dedicated dealer portal.',
    detailedAnswer: [
      'We welcome established agricultural input dealers, cooperative societies, Farmer Producer Organizations (FPOs), and independent agronomists who share our commitment to soil health and authentic farmer education.',
      'To begin the evaluation process, visit our Dealer Network page and complete the partnership enquiry form with details regarding your location, commercial experience, and existing farmer network. Our commercial team reviews applications and connects directly.',
    ],
    relatedLink: '/dealer-network',
    relatedLabel: 'Submit Dealer Partnership Enquiry ↗',
    keywords: [
      'become a dealer',
      'dealership inquiry',
      'distributor',
      'retailer',
      'fpo partnership',
      'commercial distribution',
      'karnataka dealer',
    ],
  },
  {
    id: 'dp-02',
    slug: 'what-support-does-naati-provide-to-dealers',
    category: 'dealers-partnerships',
    categoryLabel: '04 / DEALER NETWORK',
    number: '11',
    question: 'What support does Naati provide to dealers?',
    shortAnswer:
      'We support authorized partners with agronomic training, product technical literature, and direct team coordination.',
    detailedAnswer: [
      'Our dealer network operates as a collaborative knowledge bridge to local growers. Verified partners receive technical product documentation, scientific crop protocol guides, promotional materials, and direct communication channels with our field agronomy team.',
      'Specific regional supply logistics, inventory terms, and partner onboarding resources are discussed individually with our business team upon review of your partnership application.',
    ],
    relatedLink: '/dealer-network',
    relatedLabel: 'Explore Dealer Network Program ↗',
    keywords: [
      'dealer support',
      'marketing materials',
      'agronomy training',
      'partner resources',
      'distribution support',
      'dealer onboarding',
    ],
  },
];

/**
 * Helper: Retrieve all questions in a specific category
 */
export function getFaqsByCategory(categorySlug: FaqCategorySlug): FaqItem[] {
  return FAQ_ITEMS.filter((item) => item.category === categorySlug);
}

/**
 * Helper: Retrieve item by slug
 */
export function getFaqBySlug(slug: string): FaqItem | undefined {
  return FAQ_ITEMS.find((item) => item.slug === slug);
}

/**
 * Helper: Search questions and answers
 */
export function searchFaqs(query: string): FaqItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  return FAQ_ITEMS.filter((item) => {
    const inQuestion = item.question.toLowerCase().includes(trimmed);
    const inShortAnswer = item.shortAnswer.toLowerCase().includes(trimmed);
    const inDetails = item.detailedAnswer.some((p) => p.toLowerCase().includes(trimmed));
    const inKeywords = item.keywords.some((k) => k.toLowerCase().includes(trimmed));
    const inCategory = item.categoryLabel.toLowerCase().includes(trimmed);

    return inQuestion || inShortAnswer || inDetails || inKeywords || inCategory;
  });
}
