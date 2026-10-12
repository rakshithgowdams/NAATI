/**
 * NAATI ORGANICS — FARMER KNOWLEDGE HUB DATA MODEL
 *
 * Dedicated data model for /resources ("The Field Library").
 * Grounded in actual client agronomy materials and verified project assets.
 * Distinct from /soil-academy:
 * - Soil Academy = Scientific lessons, biology explanations, conceptual learning.
 * - Knowledge Hub = Practical field guides, downloadable reference tools, video syllabus, and farmer field answers.
 */

export type ResourceCategory = 'ALL RESOURCES' | 'GUIDES' | 'VIDEOS' | 'DOWNLOADS' | 'FARMER QUESTIONS';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: 'GUIDES' | 'VIDEOS' | 'DOWNLOADS' | 'FARMER QUESTIONS';
  typeLabel: string;
  language?: string;
  destination: string;
  destinationLabel: string;
  tags: string[];
  featured?: boolean;
  badge?: string;
  image?: string;
}

export interface FieldGuideItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  focusAreas: string[];
  destination: string;
  destinationText: string;
  image?: string;
  featured?: boolean;
}

export interface VideoTopicItem {
  id: string;
  number: string;
  title: string;
  syllabus: string;
  status: 'In Field Production' | 'Curriculum Ready';
  relatedAcademyTopic: string;
  relatedHref: string;
}

export interface DownloadableResourceItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  format: string;
  language: string;
  status: string;
  distribution: string;
  actionHref: string;
  actionLabel: string;
  image?: string;
  featured?: boolean;
}

export interface HubFarmerQuestion {
  id: string;
  number: string;
  question: string;
  answer: string;
  causes: string[];
  practicalAdvice: string;
  relatedHref: string;
  relatedLabel: string;
}

/* ============================================================================
   01 — COMPLETE SEARCHABLE RESOURCE REPOSITORY
   ============================================================================ */
export const HUB_RESOURCES: ResourceItem[] = [
  {
    id: 'guide-soil-carbon',
    title: 'Soil Organic Carbon & Friability Guide',
    description:
      'Step-by-step field guidance on identifying soil compaction, restoring humus levels, and rebuilding biological friability across commercial acreage.',
    category: 'GUIDES',
    typeLabel: 'Field Guide',
    destination: '/soil-academy#lessons',
    destinationLabel: 'Read Academy Lesson ↗',
    tags: ['Soil Health', 'Carbon', 'Organic Matter', 'Compaction', 'Humus', 'Naati Plus'],
    featured: true,
    badge: 'Core Reference',
    image: '/assets/images/resources/field-guide-soil.jpg',
  },
  {
    id: 'guide-root-aeration',
    title: 'Root Architecture & Subterranean Aeration',
    description:
      'Understanding why root systems fail under hardpan soils, how to establish healthy feeder roots, and balancing pore structure for oxygen and water.',
    category: 'GUIDES',
    typeLabel: 'Field Guide',
    destination: '/products/naati-plus',
    destinationLabel: 'Soil Nutrition Protocol ↗',
    tags: ['Roots', 'Aeration', 'Feeder Roots', 'Structure', 'Soil Biology'],
    featured: false,
    image: '/assets/images/resources/field-guide-roots.jpg',
  },
  {
    id: 'guide-two-step-nutrition',
    title: 'The Two-Step Nutrition System Protocol',
    description:
      'A practical manual explaining how Naati Plus (Soil Nutrition) and Naati Pro (Plant Nutrition) operate together from pre-sowing to final harvest.',
    category: 'GUIDES',
    typeLabel: 'Field Guide',
    destination: '/nutrition-system',
    destinationLabel: 'Explore Two-Step System ↗',
    tags: ['Nutrition System', 'Naati Plus', 'Naati Pro', 'Application', 'Synergy'],
    featured: true,
    badge: 'Agronomy Protocol',
  },
  {
    id: 'guide-crop-specific',
    title: 'Crop Solutions & Seasonal Dosage Protocols',
    description:
      'Targeted nutrient management and field timing for Arecanut, Coffee, Coconut, Black Pepper, Ginger, Turmeric, Vegetables and Pulses.',
    category: 'GUIDES',
    typeLabel: 'Field Guide',
    destination: '/crop-solutions',
    destinationLabel: 'View Crop Solutions ↗',
    tags: ['Arecanut', 'Coffee', 'Pepper', 'Ginger', 'Vegetables', 'Dosage'],
    featured: false,
  },
  {
    id: 'doc-handbook-en',
    title: 'Naati Organics Farmer Handbook (English)',
    description:
      'Comprehensive agricultural handbook covering soil physics, biological fertility, earthworm management, root development and crop nutrition.',
    category: 'DOWNLOADS',
    typeLabel: 'Official Publication',
    language: 'English',
    destination: '/contact?subject=handbook-english',
    destinationLabel: 'Request Print / Notification ↗',
    tags: ['Handbook', 'English', 'Farmer Handbook', 'Soil Science', 'Print Edition'],
    featured: true,
    badge: 'Official Print Edition',
    image: '/assets/images/resources/farmer-handbook-mockup.jpg',
  },
  {
    id: 'doc-handbook-kn',
    title: 'ರೈತ ಮಾರ್ಗದರ್ಶಿ ಪುಸ್ತಕ (ಕನ್ನಡ ಆವೃತ್ತಿ)',
    description:
      'ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ಸಾವಯವ ಇಂಗಾಲ, ಎರೆಹುಳುಗಳ ಪೋಷಣೆ ಮತ್ತು ಬೆಳೆ ಪೋಷಕಾಂಶಗಳ ಸಮಗ್ರ ಕನ್ನಡ ಕೃಷಿ ಕೈಪಿಡಿ.',
    category: 'DOWNLOADS',
    typeLabel: 'ಪ್ರಾದೇಶಿಕ ಪ್ರಕಟಣೆ',
    language: 'ಕನ್ನಡ (Kannada)',
    destination: '/contact?subject=handbook-kannada',
    destinationLabel: 'ಪ್ರತಿಗಾಗಿ ವಿನಂತಿಸಿ ↗',
    tags: ['ಕನ್ನಡ', 'Kannada', 'Farmer Handbook', 'ರೈತ ಮಾರ್ಗದರ್ಶಿ', 'ಪ್ರಾದೇಶಿಕ'],
    featured: false,
    badge: 'ಕನ್ನಡ ಮುದ್ರಣ',
  },
  {
    id: 'doc-naati-plus-spec',
    title: 'Naati Plus Technical Application Sheet',
    description:
      'Dosage recommendations, basal placement techniques, moisture maintenance, and storage guidelines for enriched vermicompost.',
    category: 'DOWNLOADS',
    typeLabel: 'Technical Spec Sheet',
    language: 'Bilingual (EN / KN)',
    destination: '/products/naati-plus',
    destinationLabel: 'View Product Details ↗',
    tags: ['Naati Plus', 'Dosage', 'Application', 'Technical Sheet', 'Vermicompost'],
    featured: false,
  },
  {
    id: 'doc-naati-pro-spec',
    title: 'Naati Pro Foliar Spray Protocol & Compatibility',
    description:
      'Dilution ratios, vegetative and flowering spray schedules, tank-mix compatibility notes, and absorption window instructions.',
    category: 'DOWNLOADS',
    typeLabel: 'Technical Spec Sheet',
    language: 'Bilingual (EN / KN)',
    destination: '/products/naati-pro',
    destinationLabel: 'View Product Details ↗',
    tags: ['Naati Pro', 'Foliar Spray', 'Dosage', 'Compatibility', 'Bio-activator'],
    featured: false,
  },
  {
    id: 'video-understanding-soil',
    title: 'Video Series: Understanding Living Soil',
    description:
      'Documentary field module inspecting soil crumb aggregates, organic carbon accumulation, and microbial respiration beneath cultivated fields.',
    category: 'VIDEOS',
    typeLabel: 'Field Video Series',
    destination: '/soil-academy',
    destinationLabel: 'View Soil Academy ↗',
    tags: ['Video', 'Living Soil', 'Aggregates', 'Microbiology', 'Documentary'],
    featured: false,
    badge: 'In Production',
  },
  {
    id: 'video-earthworms-biology',
    title: 'Video Series: Earthworms as Field Engineers',
    description:
      'Field study exploring subterranean earthworm channels, vermicompost integration, moisture conservation, and casting nutrient richness.',
    category: 'VIDEOS',
    typeLabel: 'Field Video Series',
    destination: '/soil-academy#living-soil',
    destinationLabel: 'Living Soil Explorer ↗',
    tags: ['Video', 'Earthworms', 'Vermiculture', 'Channels', 'Biology'],
    featured: false,
    badge: 'In Production',
  },
  {
    id: 'video-root-development',
    title: 'Video Series: Feeder Root Growth & Canopy Health',
    description:
      'Visual dissection comparing shallow stunted root zones in compacted soil versus deep flourishing roots in biological humus.',
    category: 'VIDEOS',
    typeLabel: 'Field Video Series',
    destination: '/soil-academy#lessons',
    destinationLabel: 'Root Health Lesson ↗',
    tags: ['Video', 'Roots', 'Compaction', 'Canopy', 'Vegetative Vigour'],
    featured: false,
    badge: 'In Production',
  },
  {
    id: 'faq-soil-hard',
    title: 'Why is my soil becoming hard and difficult to plough?',
    description:
      'Analysis of organic carbon depletion, tractor wheel traffic, salt accumulation, and steps to recover aggregate porosity.',
    category: 'FARMER QUESTIONS',
    typeLabel: 'Field Advisory FAQ',
    destination: '#farmer-questions',
    destinationLabel: 'Read Detailed Answer ↓',
    tags: ['Soil Compaction', 'Hard Soil', 'Tillage', 'Ploughing', 'Organic Carbon'],
    featured: false,
  },
  {
    id: 'faq-earthworms-disappearing',
    title: 'Why are earthworms disappearing from my cultivated fields?',
    description:
      'Examining how intensive synthetic salt applications, lack of decomposing organic residues, and summer heat drive worms away.',
    category: 'FARMER QUESTIONS',
    typeLabel: 'Field Advisory FAQ',
    destination: '#farmer-questions',
    destinationLabel: 'Read Detailed Answer ↓',
    tags: ['Earthworms', 'Microbiology', 'Salinity', 'Mulching', 'Soil Life'],
    featured: false,
  },
  {
    id: 'faq-weak-roots',
    title: 'Why are my crops developing shallow, fragile root systems?',
    description:
      'Root restriction caused by subterranean hardpan barriers, anaerobic moisture saturation, and absence of mycorrhizal fungi.',
    category: 'FARMER QUESTIONS',
    typeLabel: 'Field Advisory FAQ',
    destination: '#farmer-questions',
    destinationLabel: 'Read Detailed Answer ↓',
    tags: ['Roots', 'Hardpan', 'Aeration', 'Root Rot', 'Mycorrhizae'],
    featured: false,
  },
  {
    id: 'faq-water-drainage',
    title: 'Why is irrigation water running off instead of staying in the field?',
    description:
      'How organic humus functions as a natural reservoir, holding capillary moisture against gravity and eliminating surface crusting.',
    category: 'FARMER QUESTIONS',
    typeLabel: 'Field Advisory FAQ',
    destination: '#farmer-questions',
    destinationLabel: 'Read Detailed Answer ↓',
    tags: ['Water Retention', 'Runoff', 'Drought', 'Capillary Water', 'Organic Humus'],
    featured: false,
  },
  {
    id: 'faq-yellow-leaves',
    title: 'Why do plants remain pale or yellow even after heavy fertilizer?',
    description:
      'Understanding chlorosis beyond nitrogen deficit: root suffocation, pH lockup of iron and magnesium, and nematode pressures.',
    category: 'FARMER QUESTIONS',
    typeLabel: 'Field Advisory FAQ',
    destination: '#farmer-questions',
    destinationLabel: 'Read Detailed Answer ↓',
    tags: ['Yellow Leaves', 'Chlorosis', 'Fertilizer Lockup', 'pH', 'Micronutrients'],
    featured: false,
  },
  {
    id: 'faq-organic-matter-role',
    title: 'What makes organic matter the true foundation of farm productivity?',
    description:
      'Exploring Cation Exchange Capacity (CEC), aggregate stability, water sponge effects, and sustaining long-term generational yield.',
    category: 'FARMER QUESTIONS',
    typeLabel: 'Field Advisory FAQ',
    destination: '#farmer-questions',
    destinationLabel: 'Read Detailed Answer ↓',
    tags: ['Organic Matter', 'CEC', 'Humus', 'Long-term Fertility', 'Soil Engine'],
    featured: false,
  },
];

/* ============================================================================
   02 — PRACTICAL FIELD GUIDES (EDITORIAL PUBLICATION SELECTION)
   ============================================================================ */
export const PRACTICAL_FIELD_GUIDES: FieldGuideItem[] = [
  {
    id: 'soil-carbon-friability',
    number: '01',
    title: 'Soil Organic Carbon & Structural Friability',
    tagline: 'The physics of crumbly, oxygenated soil that holds rain and breathes freely.',
    summary:
      'When soil carbon falls below 0.5%, soils lose aggregate cohesion, turn rock-hard under summer heat, and form impenetrable surface crusts. This guide explains how integrating carbon-dense enriched vermicompost creates sponge-like porosity that stays loose and friable across seasons.',
    focusAreas: [
      'Testing field soil for surface crusting and aggregate stability',
      'Distinguishing between inert mineral dirt and active biological humus',
      'How glomalin and microbial exudates physically hold aggregates together',
    ],
    destination: '/soil-academy#lessons',
    destinationText: 'Study in Soil Academy ↗',
    image: '/assets/images/resources/field-guide-soil.jpg',
    featured: true,
  },
  {
    id: 'root-architecture-aeration',
    number: '02',
    title: 'Root Zone Architecture & Subterranean Feeding',
    tagline: 'Deep taproot penetration and prolific lateral feeder development.',
    summary:
      'A plant can never produce foliage or harvest yield beyond the physical boundary of its roots. Discover how proper aeration and biological stimulation break through tillage hardpans, extending feeder roots into untouched mineral horizons.',
    focusAreas: [
      'Subterranean hardpan identification using simple field tools',
      'The role of mycorrhizal hyphal networks in expanding root absorption area',
      'Preventing anaerobic root suffocation during high-monsoon rain periods',
    ],
    destination: '/products/naati-plus',
    destinationText: 'Soil Nutrition Protocol ↗',
    image: '/assets/images/resources/field-guide-roots.jpg',
  },
  {
    id: 'crop-nutrition-two-step',
    number: '03',
    title: 'The Two-Step Nutrition System: Soil + Plant',
    tagline: 'A balanced agronomic approach: Fix the Soil first, then Feed the Plant.',
    summary:
      'Decades of chemical farming have demonstrated that foliar sprays cannot rescue crops planted in exhausted, compact soil. Naati Organics establishes a biological soil foundation with Naati Plus before unlocking vegetative and reproductive vigour with Naati Pro.',
    focusAreas: [
      'Step 1: Basal soil enrichment with humic-dense, living vermicompost',
      'Step 2: Timed foliar bio-activation across critical crop phenological stages',
      'Synergistic interaction reducing crop stress and fertilizer dependency',
    ],
    destination: '/nutrition-system',
    destinationText: 'Explore Nutrition System ↗',
  },
  {
    id: 'water-sponge-capacity',
    number: '04',
    title: 'Water Retention in Rainfed & Irrigated Acreage',
    tagline: 'Transforming dry, hard fields into resilient biological sponges.',
    summary:
      'Every 1% increase in soil organic carbon allows topsoil to hold tens of thousands of litres of capillary moisture per acre. Learn practical mulching and humus techniques to protect crops through unpredictable dry spells and heat waves.',
    focusAreas: [
      'Capillary vs gravitational water dynamics in agricultural loam',
      'Preventing runoff during intense tropical cloudbursts',
      'Optimizing drip irrigation efficiency through enriched soil organic matter',
    ],
    destination: '/soil-academy#field-notes',
    destinationText: 'Read Field Notes ↗',
  },
  {
    id: 'plantation-horticulture-protocols',
    number: '05',
    title: 'Plantation & Horticultural Crop Protocols',
    tagline: 'Calibrated guidelines for Arecanut, Coffee, Spices and High-Value Vegetables.',
    summary:
      'Different crops place unique physiological demands on the soil. Review verified application schedules tailored for arecanut basins, shade-grown coffee bushes, turmeric and ginger beds, and intensive open-field vegetables.',
    focusAreas: [
      'Arecanut root basin dressing and monsoon pre-treatment',
      'Coffee berry development and foliar vegetative boost',
      'Vegetable nursery hardening and flowering stage bio-activation',
    ],
    destination: '/crop-solutions',
    destinationText: 'Browse Crop Protocols ↗',
  },
];

/* ============================================================================
   03 — VIDEO LEARNING SYLLABUS (PREPARATION & EDUCATIONAL DIRECTORY)
   ============================================================================ */
export const VIDEO_TOPICS: VideoTopicItem[] = [
  {
    id: 'vid-01',
    number: '01',
    title: 'Understanding Living Soil',
    syllabus:
      'Microscopic inspection of healthy soil aggregates, organic carbon accumulation, and microbial respiration beneath cultivated acres.',
    status: 'In Field Production',
    relatedAcademyTopic: 'Why Soil Health Matters',
    relatedHref: '/soil-academy#lessons',
  },
  {
    id: 'vid-02',
    number: '02',
    title: 'Earthworms as Subterranean Engineers',
    syllabus:
      'Documentary footage examining earthworm burrowing, macro-pore aeration channels, vermicompost casting biological richness, and habitat revival.',
    status: 'In Field Production',
    relatedAcademyTopic: 'Soil Is Alive',
    relatedHref: '/soil-academy#lessons',
  },
  {
    id: 'vid-03',
    number: '03',
    title: 'Root Architecture & Aeration',
    syllabus:
      'Comparing root penetration in hardpan soil versus friable biological loam; feeder root proliferation and disease tolerance.',
    status: 'In Field Production',
    relatedAcademyTopic: 'Healthy Roots Build Healthy Plants',
    relatedHref: '/soil-academy#lessons',
  },
  {
    id: 'vid-04',
    number: '04',
    title: 'Balanced Nutrition: Soil Foundation to Foliar Boost',
    syllabus:
      'The physiological mechanics of Liebig’s Law of the Minimum and how combining root-zone humus with plant bio-activators drives harvest yield.',
    status: 'In Field Production',
    relatedAcademyTopic: 'Feeding the Plant Naturally',
    relatedHref: '/nutrition-system',
  },
  {
    id: 'vid-05',
    number: '05',
    title: 'Naati Plus & Naati Pro in the Field',
    syllabus:
      'Practical demonstration of basal furrow application, basin incorporation, foliar spray dilution, timing, and tank compatibility.',
    status: 'In Field Production',
    relatedAcademyTopic: 'Crop Solutions & Dosage Protocols',
    relatedHref: '/crop-solutions',
  },
  {
    id: 'vid-06',
    number: '06',
    title: 'Farmer Training & Seasonal Field Management',
    syllabus:
      'Interviews with experienced growers in Karnataka detailing how soil restoration transformed pest resilience, irrigation needs, and crop grade.',
    status: 'Curriculum Ready',
    relatedAcademyTopic: 'Living Soil Explorer',
    relatedHref: '/soil-academy#living-soil',
  },
];

/* ============================================================================
   04 — DOWNLOADABLE FARMER RESOURCES & PUBLICATIONS
   ============================================================================ */
export const DOWNLOADABLE_RESOURCES: DownloadableResourceItem[] = [
  {
    id: 'handbook-en',
    title: 'Naati Organics Farmer Handbook',
    subtitle: 'A Practical Guide to Soil Health & Crop Nutrition (English Edition)',
    type: 'Comprehensive Agricultural Handbook',
    format: 'Official Print Edition & Advisory PDF',
    language: 'English',
    status: 'Available via Agro-Advisory Network & In Prep for Download',
    distribution: 'Printed copies supplied during regional agronomy training sessions across South India.',
    actionHref: '/contact?subject=handbook-english',
    actionLabel: 'Request Print Copy / Notify Me ↗',
    image: '/assets/images/resources/farmer-handbook-mockup.jpg',
    featured: true,
  },
  {
    id: 'handbook-kn',
    title: 'ರೈತ ಮಾರ್ಗದರ್ಶಿ ಪುಸ್ತಕ (ಕನ್ನಡ)',
    subtitle: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಬೆಳೆ ಪೋಷಕಾಂಶಗಳ ಸಮಗ್ರ ಕೃಷಿ ಕೈಪಿಡಿ',
    type: 'ಪ್ರಾದೇಶಿಕ ರೈತ ಮಾರ್ಗದರ್ಶಿ',
    format: 'ಮುದ್ರಿತ ಕೃಷಿ ಪುಸ್ತಕ',
    language: 'ಕನ್ನಡ (Kannada)',
    status: 'ಅಧಿಕೃತ ವಿತರಕರಲ್ಲಿ ಲಭ್ಯವಿದೆ',
    distribution: 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ನಮ್ಮ ಅಧಿಕೃತ ಡೀಲರ್ ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು ರೈತ ತರಬೇತಿ ಕೇಂದ್ರಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ.',
    actionHref: '/contact?subject=handbook-kannada',
    actionLabel: 'ಪ್ರತಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ ↗',
  },
  {
    id: 'spec-naati-plus',
    title: 'Naati Plus Technical Application Sheet',
    subtitle: 'Enriched Vermicompost: Organic Carbon, Dosage, and Basal Placement',
    type: 'Product Technical Bulletin',
    format: 'Agronomic Reference Sheet',
    language: 'English / Kannada Bilingual',
    status: 'Available in Physical Agro-Centres',
    distribution: 'Distributed with product consignments and through regional agro-dealers.',
    actionHref: '/products/naati-plus',
    actionLabel: 'View Product Specifications ↗',
  },
  {
    id: 'spec-naati-pro',
    title: 'Naati Pro Foliar Spray Protocol & Compatibility Guide',
    subtitle: 'Plant Bio-activator: Spray Timing, Dilution, and Synergy Guidelines',
    type: 'Application Technical Bulletin',
    format: 'Agronomic Reference Sheet',
    language: 'English / Kannada Bilingual',
    status: 'Available in Physical Agro-Centres',
    distribution: 'Distributed with product consignments and through regional agro-dealers.',
    actionHref: '/products/naati-pro',
    actionLabel: 'View Product Specifications ↗',
  },
  {
    id: 'chart-crop-dosage',
    title: 'Major Crops Dosage & Stage Timing Chart',
    subtitle: 'Quick-reference application calendar for Arecanut, Coffee, Ginger & Vegetables',
    type: 'Agronomic Dosage Chart',
    format: 'Laminated Field Reference Card',
    language: 'Bilingual (EN / KN)',
    status: 'Available at Dealer Outlets',
    distribution: 'Supplied directly to registered growers through dealer network.',
    actionHref: '/crop-solutions',
    actionLabel: 'Consult Crop Atlas ↗',
  },
];

/* ============================================================================
   05 — PRACTICAL FARMER QUESTIONS & ANSWERS
   ============================================================================ */
export const HUB_FARMER_QUESTIONS: HubFarmerQuestion[] = [
  {
    id: 'q1-soil-hard',
    number: '01',
    question: 'Why is my soil becoming hard and forming a dense crust?',
    answer:
      'Soil hardens when organic carbon is systematically exhausted and biological aggregation collapses. Without humus to glue mineral grains into loose crumbs, rain impact and heavy equipment cause sand, silt, and clay particles to pack tightly together, closing oxygen pores and creating dense surface crusts or deep subsoil hardpans.',
    causes: [
      'Depletion of organic matter and microbial glues (glomalin)',
      'Tractor or tillage compaction, especially in damp conditions',
      'Continuous synthetic fertilizer salts without biological buffers',
    ],
    practicalAdvice:
      'Gradually rebuild soil organic carbon with enriched vermicompost like Naati Plus. Minimize excessive rotary tillage and maintain organic surface mulch to keep the soil porous and aerated.',
    relatedHref: '/soil-academy#lessons',
    relatedLabel: 'Study Soil Health in Academy ↗',
  },
  {
    id: 'q2-earthworms',
    number: '02',
    question: 'Why are earthworms disappearing from my cultivated fields?',
    answer:
      'Earthworms require moisture, aeration, and food in the form of decomposing organic residues. Concentrated chemical salts, compacted dry soil, extended waterlogging, and absence of organic mulch starve earthworms or drive them into deep dormant burrows beneath the plow layer.',
    causes: [
      'Absence of decomposing organic matter and compost to nourish worms',
      'Elevated soil salinity and pH shifts from concentrated chemical inputs',
      'Severe compaction cutting off oxygen in the top 15 cm of soil',
    ],
    practicalAdvice:
      'Replenish organic residues, apply enriched vermicompost containing dormant biological cocoons, and protect the topsoil with crop residue mulch to keep root temperatures cool.',
    relatedHref: '/soil-academy#lessons',
    relatedLabel: 'Read "Soil Is Alive" Lesson ↗',
  },
  {
    id: 'q3-weak-roots',
    number: '03',
    question: 'Why are my crops developing shallow, fragile root systems?',
    answer:
      'Roots require both moisture and oxygen to expand downward. When soil is compacted or biologically depleted, root tips cannot physically penetrate dense soil layers. This forces the plant into a shallow, fragile root pattern that easily lodges in wind and rapidly wilts under brief dry spells.',
    causes: [
      'Subsurface hardpan restricting vertical taproot penetration',
      'Poor drainage causing anaerobic conditions and root rot',
      'Absence of mycorrhizal fungi that naturally multiply root reach',
    ],
    practicalAdvice:
      'Improve soil friability with organic matter before planting. Ensure field drainage so roots can breathe, and support biological colonization around tender root tips.',
    relatedHref: '/products/naati-plus',
    relatedLabel: 'Learn How Naati Plus Restores Roots ↗',
  },
  {
    id: 'q4-water-not-staying',
    number: '04',
    question: 'Why is water not staying in my field between irrigations?',
    answer:
      'Organic matter is the natural sponge of agricultural land. Without organic carbon, coarse sandy soils allow water to drain straight through past the root zone, while crusted clay soils cause irrigation water to run off the surface without soaking into root depth.',
    causes: [
      'Low organic carbon percentage failing to hold capillary water',
      'Surface crusting causing water to run off instead of infiltrating',
      'Loss of porous crumb structure that stores moisture against gravity',
    ],
    practicalAdvice:
      'Build up soil organic carbon. Every 1% increase in organic matter dramatically improves the soil’s moisture holding capacity, keeping moisture available across longer dry intervals.',
    relatedHref: '/soil-academy#field-notes',
    relatedLabel: 'Read Water Retention Field Notes ↗',
  },
  {
    id: 'q5-yellow-leaves',
    number: '05',
    question: 'Why do plants remain pale or yellow even after heavy fertilization?',
    answer:
      'Yellow leaves (chlorosis) can stem from multiple physiological causes beyond simple nitrogen deficit. A crop with yellow foliage often suffers from damaged roots, compacted soil suffocating roots, soil pH imbalances locking up micronutrients like iron or zinc, or waterlogged soil shutting down nutrient transport.',
    causes: [
      'Compacted or anaerobic roots physically unable to absorb nutrients',
      'Micronutrient lockup (iron, zinc, magnesium) due to high soil pH',
      'Root damage from nematodes, salinity, or fungal waterlogging',
    ],
    practicalAdvice:
      'Inspect root health and soil moisture before applying more fertilizer. Combining soil aeration with balanced plant nutrition like Naati Pro helps overcome metabolic bottlenecks.',
    relatedHref: '/products/naati-pro',
    relatedLabel: 'Explore Naati Pro Plant Nutrition ↗',
  },
  {
    id: 'q6-organic-matter',
    number: '06',
    question: 'Why is organic matter considered the foundation of farm productivity?',
    answer:
      'Organic matter is the biological engine of productive agriculture. It feeds beneficial microbes, glues mineral grains into porous crumbs, buffers soil pH, stores available moisture, and creates an aerated biological habitat where roots thrive without continuous heavy chemical intervention.',
    causes: [
      'Acts as the primary energy source for beneficial bacteria and fungi',
      'Dramatically enhances Cation Exchange Capacity (CEC) for nutrient retention',
      'Transforms hard, dense earth into soft, living, productive soil',
    ],
    practicalAdvice:
      'Treat organic matter as your most valuable field capital. Consistent replenishment with enriched vermicompost pays dividends across all crop cycles for generations.',
    relatedHref: '/nutrition-system',
    relatedLabel: 'Understand the Complete Nutrition System ↗',
  },
];
