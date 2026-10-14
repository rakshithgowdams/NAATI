/**
 * NAATI ORGANICS — DEALER & DISTRIBUTOR NETWORK DATA MODEL
 *
 * Dedicated data models and verified content for /dealer-network ("Growing Together").
 * Grounded in client brief and partnership requirements:
 * - 4 Pillars of Partnership Philosophy
 * - 5 Partner Categories with photographic references
 * - 4 Stages of the Partnership Journey
 * - 6 Verified Partnership Questions & Answers
 * - Form select options (States, Experience, Interest categories)
 */

export interface PartnershipPillar {
  number: string;
  title: string;
  description: string;
  accent: string;
}

export interface PartnerCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  focusProfile: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface PartnershipStage {
  number: string;
  title: string;
  description: string;
  focus: string;
}

export interface DealerFaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
  detail: string;
  actionHref?: string;
  actionLabel?: string;
}

/* ============================================================================
   01 — FOUR PILLARS: THE PARTNERSHIP PHILOSOPHY
   ============================================================================ */
export const PARTNERSHIP_PILLARS: PartnershipPillar[] = [
  {
    number: '01',
    title: 'SOIL-FIRST THINKING',
    description:
      'A brand approach built around understanding and supporting the foundation of crop growth.',
    accent: 'Biological Foundation',
  },
  {
    number: '02',
    title: 'COMPLEMENTARY PRODUCTS',
    description:
      'Naati Plus and Naati Pro address soil nutrition and plant nutrition as distinct but connected priorities.',
    accent: 'Two-Step Nutrition',
  },
  {
    number: '03',
    title: 'FARMER EDUCATION',
    description:
      'Educational resources are part of Naati’s broader direction toward better-informed agricultural decisions.',
    accent: 'Knowledge-Led Agriculture',
  },
  {
    number: '04',
    title: 'LONG-TERM PARTNERSHIP',
    description:
      'An opportunity to explore a working relationship centred on agricultural knowledge, products and farmer needs.',
    accent: 'Collaborative Growth',
  },
];

/* ============================================================================
   02 — FIVE PARTNER CATEGORIES (CATEGORY EXPLORER)
   ============================================================================ */
export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: 'input-dealers',
    number: '01',
    title: 'AGRICULTURAL INPUT DEALERS',
    subtitle: 'Retailers serving farming communities with soil and crop care inputs.',
    description:
      'Businesses serving farmers through agricultural input products and related services. If you operate an established retail agro-center catering to local growers, our two-step soil and plant nutrition products offer a distinctive, science-backed portfolio.',
    focusProfile: [
      'Agro-chemical and fertilizer retail outlets',
      'Seed and soil amendment stockists',
      'Grower-facing advisory counters',
    ],
    imageSrc: '/assets/images/dealers/input-dealers.jpg',
    imageAlt: 'Agricultural input store environment showcasing crop nutrition and field supplies in rural India',
  },
  {
    id: 'distributors',
    number: '02',
    title: 'DISTRIBUTORS',
    subtitle: 'Regional partners exploring product distribution across defined operating areas.',
    description:
      'Businesses interested in exploring product distribution across defined operating areas. We welcome discussions with logistics and distribution partners who maintain active retail dealer connections and warehousing capabilities.',
    focusProfile: [
      'District-level agro-distributors',
      'Wholesale agricultural supply networks',
      'Supply chain and regional inventory operators',
    ],
    imageSrc: '/assets/images/dealers/distributors.jpg',
    imageAlt: 'Agricultural distribution and logistics facility managing farm input stock',
  },
  {
    id: 'retailers',
    number: '03',
    title: 'ORGANIC & AGRICULTURAL RETAILERS',
    subtitle: 'Specialty stores focused on organic cultivation and regenerative farming.',
    description:
      'Retailers focused on agricultural supplies and related products. Specialty organic stores and sustainable farming suppliers looking to provide certified, high-grade vermicompost and biological foliar activators.',
    focusProfile: [
      'Organic farming supply stores',
      'Sustainable farm stores & nursery centers',
      'High-value horticultural supply hubs',
    ],
    imageSrc: '/assets/images/dealers/retailers.jpg',
    imageAlt: 'Organized agricultural supplies retail environment with biological farming solutions',
  },
  {
    id: 'fpos',
    number: '04',
    title: 'FARMER PRODUCER ORGANISATIONS',
    subtitle: 'Organisations representing and supporting groups of farmers.',
    description:
      'Organisations representing and supporting groups of farmers. We collaborate with FPOs and farmer cooperatives to provide volume supply, agronomic learning material, and crop-specific dosage protocols for member growers.',
    focusProfile: [
      'Registered Farmer Producer Companies (FPCs)',
      'Horticultural and plantation grower societies',
      'Collective agricultural buying groups',
    ],
    imageSrc: '/assets/images/dealers/fpos.jpg',
    imageAlt: 'Indian farmer producer collective in open field reviewing agricultural crop progress',
  },
  {
    id: 'consultants',
    number: '05',
    title: 'AGRI ENTREPRENEURS & CONSULTANTS',
    subtitle: 'Agronomists and farm managers exploring new business relationships.',
    description:
      'Entrepreneurs and agricultural professionals exploring new business relationships. Independent agronomists, farm managers, and agricultural graduates seeking to introduce evidence-backed soil restoration solutions.',
    focusProfile: [
      'Independent agricultural consultants',
      'Estate and commercial plantation managers',
      'Rural agri-business innovators',
    ],
    imageSrc: '/assets/images/dealers/consultants.jpg',
    imageAlt: 'Agronomist and grower in South Indian field examining living soil and crop foliage',
  },
];

/* ============================================================================
   03 — FOUR-STAGE ENQUIRY JOURNEY
   ============================================================================ */
export const PARTNERSHIP_STAGES: PartnershipStage[] = [
  {
    number: '01',
    title: 'INTRODUCE YOUR BUSINESS',
    description: 'Share your business details, operating location and area of interest.',
    focus: 'Online registration with preliminary business profile and geography.',
  },
  {
    number: '02',
    title: 'TELL US YOUR INTEREST',
    description: 'Let us know whether you are exploring a dealership, distribution or another business partnership.',
    focus: 'Clarifying your preferred partnership scope, market reach, and commercial focus.',
  },
  {
    number: '03',
    title: 'START A DISCUSSION',
    description: 'The Naati team can review the enquiry and discuss relevant possibilities.',
    focus: 'Direct conversation with our regional sales and agronomy leadership.',
  },
  {
    number: '04',
    title: 'EXPLORE THE NEXT STEPS',
    description: 'Any future partnership arrangements, eligibility or commercial terms can be discussed directly.',
    focus: 'Detailed mutual review of inventory logistics, terms, and working agreements.',
  },
];

/* ============================================================================
   04 — DEALER & PARTNERSHIP QUESTIONS (FAQ)
   ============================================================================ */
export const DEALER_FAQS: DealerFaqItem[] = [
  {
    id: 'faq-01',
    number: '01',
    question: 'Who can enquire about becoming a Naati dealer?',
    answer:
      'We welcome enquiries from registered agricultural input retailers, district distributors, organic farm suppliers, Farmer Producer Organisations (FPOs), and qualified agricultural consultants who share our commitment to soil health and authentic farmer education.',
    detail:
      'Whether you run a standalone rural agro-center or manage a multi-district network, we review every enquiry based on local agricultural demand and mutual fit.',
  },
  {
    id: 'faq-02',
    number: '02',
    question: 'Can I enquire about distribution in my district?',
    answer:
      'Yes. You can submit your operating district and current network reach through the partnership enquiry form. Our commercial team will evaluate district coverage and reach out to discuss relevant opportunities.',
    detail:
      'Submitting an enquiry allows us to assess geographic coverage. Please note that territory allocations and operating terms are evaluated during direct discussions and are not guaranteed prior to mutual agreement.',
  },
  {
    id: 'faq-03',
    number: '03',
    question: 'What information is required for a partnership enquiry?',
    answer:
      'You will need to provide your full name, business name, mobile contact, email, state, district, current operating area, and your specific area of interest (dealership, distribution, or institutional partnership).',
    detail:
      'Sharing additional details like years of business experience, current product portfolio, and anticipated monthly requirement helps us understand your operating context faster.',
  },
  {
    id: 'faq-04',
    number: '04',
    question: 'Does submitting an enquiry confirm a dealership?',
    answer:
      'No. Submitting an enquiry initiates an exploratory dialogue between your business and Naati Organics. It does not constitute a commercial agreement, territorial grant, or binding commitment from either party.',
    detail:
      'Formal dealership or distribution appointments require mutual verification of business credentials, commercial alignment, and executed agreements.',
  },
  {
    id: 'faq-05',
    number: '05',
    question: 'How can I ask about product details before applying?',
    answer:
      'You can explore our detailed product documentation online for Naati Plus (enriched vermicompost) and Naati Pro (plant bio-activator), or get in touch directly with our agronomy support desk.',
    detail:
      'Comprehensive crop charts, dosage recommendations, and scientific rationale are also accessible in our Soil Learning Centre and Resource Library.',
    actionHref: '/nutrition-system',
    actionLabel: 'Explore the Nutrition System ↗',
  },
  {
    id: 'faq-06',
    number: '06',
    question: 'Is training or marketing support available?',
    answer:
      'Educational literature, farmer handbooks, and crop protocols are core elements of Naati Organics’ mission. Specific marketing materials and field technical support can be discussed directly with our regional representatives.',
    detail:
      'We do not make blanket contractual promises prior to partnership formation, but we actively collaborate with our verified partners to ensure growers receive clear agronomic guidance.',
  },
];

/* ============================================================================
   05 — FORM SELECT OPTIONS
   ============================================================================ */
export const PARTNERSHIP_INTEREST_OPTIONS = [
  { value: 'Dealership', label: 'Dealership (Retail Agro-Input Store)' },
  { value: 'Distribution', label: 'Distribution (District / Regional Network)' },
  { value: 'Agricultural Retail Partnership', label: 'Organic & Agricultural Retail Partnership' },
  { value: 'Farmer Producer Organisation', label: 'Farmer Producer Organisation (FPO / Society)' },
  { value: 'Other Business Enquiry', label: 'Other Agri-Business Enquiry / Consultancy' },
];

export const STATE_OPTIONS = [
  'Karnataka',
  'Tamil Nadu',
  'Andhra Pradesh',
  'Telangana',
  'Kerala',
  'Maharashtra',
  'Goa',
  'Other State / Union Territory',
];

export const EXPERIENCE_OPTIONS = [
  'Less than 2 years in agricultural inputs',
  '2 to 5 years established experience',
  '5 to 10 years mature agro-business',
  'Over 10 years extensive regional network',
  'New business venture in agriculture',
];
