/**
 * NAATI ORGANICS — SOIL ACADEMY DATA MODEL & CURRICULUM
 *
 * Source-grounded agronomic curriculum derived directly from client educational material:
 * - 5 Essential Lessons for foundational soil literacy
 * - 5 Living Soil Explorer Hotspots with calibrated coordinate anchors
 * - 10 Field Notes & Knowledge Library Topics with real-time search tags
 * - 6 Farmer Questions & Answers addressing practical field challenges
 * - Farmer Handbook publication specifications (English & Kannada)
 */

export interface AcademyLesson {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  overview: string;
  keyPoints: string[];
  readingTime: string;
  status: 'preview' | 'published';
  targetSlug?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface SoilHotspot {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  xPercent: number; // percentage from left of visual
  yPercent: number; // percentage from top of visual
  category: 'Physics' | 'Biology' | 'Roots' | 'Water & Air';
}

export interface FieldNoteTopic {
  id: string;
  number: string;
  title: string;
  category: 'Biology & Microbes' | 'Soil Physics & Structure' | 'Nutrition & Farming';
  summary: string;
  extendedSummary: string;
  keyFocus: string[];
  featured?: boolean;
}

export interface FarmerQuestion {
  id: string;
  number: string;
  question: string;
  answer: string;
  primaryCauses: string[];
  practicalAdvice: string;
}

/* ============================================================================
   01 — FIVE ESSENTIAL LESSONS
   ============================================================================ */
export const ESSENTIAL_LESSONS: AcademyLesson[] = [
  {
    id: 'why-soil-health-matters',
    number: '01',
    title: 'Why Soil Health Matters',
    subtitle: 'The foundation of all productive agricultural systems.',
    summary: 'Learn why healthy soil is the foundation of productive farming.',
    overview:
      'Soil is not an inert anchoring medium for roots; it is a complex physical, biological, and chemical ecosystem. Productive agriculture depends on preserving organic carbon, crumbly aggregate structure, and diverse microbiology so plants can develop deep, resilient root systems that absorb nutrients efficiently across changing seasons.',
    keyPoints: [
      'Healthy soil buffers against drought by acting like a biological sponge.',
      'Organic matter bonds mineral particles into porous aggregates for root respiration.',
      'Living soil biology converts raw organic residues into plant-accessible nourishment.',
    ],
    readingTime: '5 min read',
    status: 'preview',
    targetSlug: 'why-soil-health-matters',
    imageSrc: '/assets/images/soil-academy/soil-macro-hands.jpg',
    imageAlt: 'Rich dark humus-rich agricultural soil examined in farmer hands',
  },
  {
    id: 'why-soil-fertility-declines',
    number: '02',
    title: 'Why Soil Fertility Declines',
    subtitle: 'Understanding the mechanics of soil degradation and nutrient lockup.',
    summary: 'Understand the factors that can weaken agricultural soil over time.',
    overview:
      'Decades of intensive cultivation without returning organic carbon leads to soil compaction, hardpan development, and microbial starvation. When chemical salts accumulate without humus, beneficial earthworms and mycorrhizae decline, leading to water runoff, poor aeration, and widespread nutrient lockup.',
    keyPoints: [
      'Depletion of organic carbon reduces aggregate stability and causes surface crusting.',
      'Heavy machinery and repetitive tillage create subterranean hardpan barriers.',
      'Chemical saturation without biological buffers suppresses natural nutrient recycling.',
    ],
    readingTime: '6 min read',
    status: 'preview',
    targetSlug: 'why-soil-fertility-declines',
  },
  {
    id: 'soil-is-alive',
    number: '03',
    title: 'Soil Is Alive',
    subtitle: 'Billions of organisms collaborating beneath every cultivated acre.',
    summary: 'Discover the organisms and biological processes found in living soil.',
    overview:
      'A single tablespoon of healthy topsoil houses more living microorganisms than there are humans on Earth. Bacteria, actinomycetes, beneficial mycorrhizal fungi, and earthworms form a complex subterranean web that digests residues, produces natural glues (glomalin), and protects roots against pathogens.',
    keyPoints: [
      'Earthworms create macro-pore aeration channels and generate nutrient-dense casts.',
      'Mycorrhizal fungi physically extend plant root surface area by hundreds of percent.',
      'Beneficial bacteria solubilize phosphorus and fix nitrogen in the living rhizosphere.',
    ],
    readingTime: '7 min read',
    status: 'preview',
    targetSlug: 'soil-is-alive',
  },
  {
    id: 'healthy-roots-build-healthy-plants',
    number: '04',
    title: 'Healthy Roots Build Healthy Plants',
    subtitle: 'The subterranean engine driving above-ground foliage and harvest yield.',
    summary: 'Understand the role of root development in crop health.',
    overview:
      'Above-ground growth directly mirrors root architecture below. Fine feeder roots and microscopic root hairs require pore spaces filled with oxygen to respire and absorb water-dissolved minerals. In compacted, anaerobic earth, root elongation halts, making crops vulnerable to drought and lodging.',
    keyPoints: [
      'Fine root hairs perform over 80% of active mineral uptake and water absorption.',
      'Roots release carbon-rich exudates that feed beneficial microbes directly in the rhizosphere.',
      'Porous, well-structured soil allows deep root penetration into deeper subsoil moisture reserves.',
    ],
    readingTime: '5 min read',
    status: 'preview',
    targetSlug: 'healthy-roots',
  },
  {
    id: 'balanced-crop-nutrition',
    number: '05',
    title: 'Balanced Crop Nutrition',
    subtitle: 'Looking beyond primary nutrients to holistic biological harmony.',
    summary: 'Explore the principles of balanced nutrition beyond primary nutrients alone.',
    overview:
      'Plant health cannot be solved by flooding soil with isolated primary elements alone. True agronomic resilience requires secondary minerals (calcium, magnesium, sulfur), trace elements (zinc, boron, iron), and biological catalysts working in equilibrium within biologically active soil.',
    keyPoints: [
      'Excessive single-nutrient application induces competitive absorption blocks in plants.',
      'Bio-activators stimulate metabolic enzymes and improve trace mineral transport.',
      'Soil-first nutrition establishes a sustainable reservoir that feeds crops progressively.',
    ],
    readingTime: '6 min read',
    status: 'preview',
    targetSlug: 'balanced-crop-nutrition',
  },
];

/* ============================================================================
   02 — LIVING SOIL EXPLORER HOTSPOTS
   ============================================================================ */
export const SOIL_HOTSPOTS: SoilHotspot[] = [
  {
    id: 'structure',
    number: '01',
    title: 'SOIL STRUCTURE',
    summary: 'Soil contains spaces that allow air and water to move through it.',
    description:
      'Aggregated mineral grains and organic residues form crumbly clusters called peds. Between these clusters lie continuous pore networks through which oxygen circulates and excess rainwater drains without waterlogging the crop.',
    xPercent: 18,
    yPercent: 46,
    category: 'Physics',
  },
  {
    id: 'organic-matter',
    number: '02',
    title: 'ORGANIC MATTER',
    summary: 'Organic residues contribute to soil structure and provide material for biological processes.',
    description:
      'Decomposed plant residues and stable humus act as biological glue and moisture sponges. Organic matter buffers soil against pH swings, increases cation exchange capacity (CEC), and supplies carbon energy to beneficial microbes.',
    xPercent: 42,
    yPercent: 24,
    category: 'Biology',
  },
  {
    id: 'soil-biology',
    number: '03',
    title: 'SOIL BIOLOGY',
    summary: 'Soil organisms play important roles in decomposition and nutrient cycling.',
    description:
      'Earthworms, beneficial fungi, and bacteria constantly decompose organic matter into bio-available minerals. Earthworm burrows create natural subterranean aeration channels while their microbial-rich casts enrich the topsoil.',
    xPercent: 68,
    yPercent: 72,
    category: 'Biology',
  },
  {
    id: 'root-health',
    number: '04',
    title: 'ROOT HEALTH',
    summary: 'Roots absorb water and nutrients while anchoring the plant.',
    description:
      'The rhizosphere—the microscopic zone immediately surrounding plant roots—is an intense metabolic trading floor. Roots secrete sugars and amino acids to attract symbiotic bacteria that solubilize insoluble phosphorus and minerals.',
    xPercent: 28,
    yPercent: 62,
    category: 'Roots',
  },
  {
    id: 'water-and-air',
    number: '05',
    title: 'WATER & AIR',
    summary: 'Plants and soil organisms depend on a suitable balance of moisture and aeration.',
    description:
      'In a healthy living soil profile, roughly 50% of the volume consists of pore space evenly shared between capillary moisture and circulating air. Imbalance—either compaction causing suffocation or drought causing desiccation—shuts down biological life.',
    xPercent: 82,
    yPercent: 42,
    category: 'Water & Air',
  },
];

/* ============================================================================
   03 — FIELD NOTES / KNOWLEDGE LIBRARY TOPICS
   ============================================================================ */
export const FIELD_NOTES_TOPICS: FieldNoteTopic[] = [
  {
    id: 'soil-biology',
    number: '01',
    title: 'Soil Biology',
    category: 'Biology & Microbes',
    summary: 'The living subterranean community that transforms dead organic residues into plant nourishment.',
    extendedSummary:
      'Soil biology encompasses billions of microscopic bacteria, fungi, actinomycetes, protozoa, and larger earthworms that inhabit topsoil. They perform continuous biochemical transformations, mineralizing organic nutrients into plant-usable ionic forms.',
    keyFocus: ['Microbial diversity', 'Enzymatic cycling', 'Rhizosphere interactions'],
    featured: true,
  },
  {
    id: 'organic-matter',
    number: '02',
    title: 'Organic Matter',
    category: 'Biology & Microbes',
    summary: 'The carbon-rich foundation of living soil that preserves moisture and stabilizes aggregates.',
    extendedSummary:
      'Organic matter comprises plant residues, animal manures, and stable humus fractions. It enhances soil water retention exponentially, creates porous soil texture, and acts as the primary slow-release reservoir of essential minerals.',
    keyFocus: ['Humus fraction', 'Carbon-to-nitrogen balance', 'Aggregate gluing'],
    featured: true,
  },
  {
    id: 'earthworms',
    number: '03',
    title: 'Earthworms',
    category: 'Biology & Microbes',
    summary: 'Nature’s agricultural engineers creating macro-pore aeration tunnels and fertile castings.',
    extendedSummary:
      'Earthworms ingest organic material and mineral soil, grinding it in their gizzards and excreting mineral-rich vermicast. Their vertical and horizontal tunnels open essential channels for deep root penetration and rainwater infiltration.',
    keyFocus: ['Vermicast enrichment', 'Natural aeration', 'Subterranean tilling'],
  },
  {
    id: 'beneficial-fungi',
    number: '04',
    title: 'Beneficial Fungi',
    category: 'Biology & Microbes',
    summary: 'Mycorrhizal hyphal networks that extend crop root absorption surface area hundreds of times.',
    extendedSummary:
      'Arbuscular mycorrhizal fungi form symbiotic associations with plant root cortical cells. Their microscopic hyphal threads explore micro-pores far beyond root reach, mining locked phosphorus and water in exchange for plant photosynthates.',
    keyFocus: ['Hyphal reach', 'Phosphorus foraging', 'Glomalin production'],
  },
  {
    id: 'microorganisms',
    number: '05',
    title: 'Microorganisms',
    category: 'Biology & Microbes',
    summary: 'Specialized bacteria and actinomycetes solubilizing fixed soil minerals and building humus.',
    extendedSummary:
      'Rhizosphere bacteria produce organic acids that dissolve insoluble rock minerals, making phosphate, potassium, and trace elements bio-available. Free-living and associative bacteria also fix atmospheric nitrogen directly in the root zone.',
    keyFocus: ['Phosphate solubilization', 'Biological nitrogen fixation', 'Disease suppression'],
  },
  {
    id: 'water-retention',
    number: '06',
    title: 'Water Retention',
    category: 'Soil Physics & Structure',
    summary: 'How porous aggregate architecture prevents rapid runoff and protects crops during dry spells.',
    extendedSummary:
      'Every 1% increase in soil organic matter enables an acre of land to hold thousands of additional litres of plant-available water. Well-aggregated soil stores water capillary-tight against gravity without excluding life-giving oxygen.',
    keyFocus: ['Capillary storage', 'Drought resilience', 'Runoff prevention'],
  },
  {
    id: 'soil-structure',
    number: '07',
    title: 'Soil Structure',
    category: 'Soil Physics & Structure',
    summary: 'The physical arrangement of sand, silt, clay, and pores allowing roots to breathe freely.',
    extendedSummary:
      'Good soil structure is characterized by granular, crumbly aggregates that resist slaking and crusting. Proper pore distribution ensures that 50% of the soil volume remains dedicated to air and water movement.',
    keyFocus: ['Pore size distribution', 'Crusting resistance', 'Root run space'],
  },
  {
    id: 'root-health',
    number: '08',
    title: 'Root Health',
    category: 'Nutrition & Farming',
    summary: 'Developing expansive branching root systems capable of withstanding environmental fluctuations.',
    extendedSummary:
      'A crop cannot yield beyond the functional capacity of its root architecture. Aerated, biologically active root zones stimulate prolific lateral feeder root branching and protect root tips against pathogenic nematodes.',
    keyFocus: ['Feeder root branching', 'Rhizosphere sheath', 'Lodging resistance'],
  },
  {
    id: 'nutrient-balance',
    number: '09',
    title: 'Nutrient Balance',
    category: 'Nutrition & Farming',
    summary: 'The delicate equilibrium between primary, secondary, and trace elements in living fields.',
    extendedSummary:
      'Plant nutrition functions under Liebig’s Law of the Minimum: crop growth is limited not by total nutrients, but by the scarcest essential element. Balancing micro-elements and biological co-factors prevents metabolic bottlenecks.',
    keyFocus: ['Liebig’s law', 'Trace element synergy', 'Cation balance'],
  },
  {
    id: 'sustainable-farming',
    number: '10',
    title: 'Sustainable Farming',
    category: 'Nutrition & Farming',
    summary: 'Long-term agricultural stewardship that accumulates biological capital in the soil season after season.',
    extendedSummary:
      'Sustainable farming treats the field as a living asset to be built, not an inert bank to be mined. By integrating enriched vermicompost, cover crops, bio-activators, and balanced nutrition, farmers secure intergenerational fertility.',
    keyFocus: ['Soil capital accumulation', 'Regenerative fertility', 'Input efficiency'],
  },
];

/* ============================================================================
   04 — FARMER QUESTIONS & SCIENTIFIC ANSWERS
   ============================================================================ */
export const FARMER_QUESTIONS: FarmerQuestion[] = [
  {
    id: 'soil-becoming-hard',
    number: '01',
    question: 'Why is my soil becoming hard?',
    answer:
      'Soil hardens when organic carbon is depleted and biological aggregation breaks down. Without organic matter to glue mineral particles into crumbly clusters, rain and heavy machinery cause sand, silt, and clay particles to pack tightly together, closing air pores and forming dense surface crusts or deep hardpans.',
    primaryCauses: [
      'Depletion of organic matter and microbial glues (glomalin)',
      'Tractor compaction under wet soil conditions',
      'Continuous application of synthetic salts without biological buffers',
    ],
    practicalAdvice:
      'Incorporate organic amendments like enriched vermicompost and reduce excessive disc tillage to allow natural aggregation to recover.',
  },
  {
    id: 'earthworms-disappearing',
    number: '02',
    question: 'Why are earthworms disappearing?',
    answer:
      'Earthworms require moisture, aeration, and food in the form of decomposing organic matter. Excessive synthetic chemical salts, dry compacted soil, prolonged waterlogging, and absence of organic mulch starve earthworms or drive them into deep dormant burrows.',
    primaryCauses: [
      'Absence of organic residues and compost to feed earthworms',
      'High soil salinity from concentrated chemical inputs',
      'Severe compaction cutting off oxygen in the top 15 cm of soil',
    ],
    practicalAdvice:
      'Replenish organic residues, apply enriched vermicompost containing living cocoons, and maintain surface mulch to keep the root zone cool.',
  },
  {
    id: 'weak-roots',
    number: '03',
    question: 'Why are my roots weak?',
    answer:
      'Roots require both moisture and oxygen to grow. When soil is compacted, waterlogged, or biologically dead, root tips suffocate and cannot physically penetrate dense soil layers. This forces the plant into a shallow, fragile root pattern that easily lodges in wind and wilts under brief dry spells.',
    primaryCauses: [
      'Subsurface hardpan restricting vertical taproot penetration',
      'Poor drainage causing anaerobic conditions and root rot',
      'Absence of mycorrhizal fungi that naturally expand root reach',
    ],
    practicalAdvice:
      'Improve soil friability with organic matter and ensure adequate drainage before planting so roots can explore the full soil volume.',
  },
  {
    id: 'water-not-staying',
    number: '04',
    question: 'Why is water not staying in my field?',
    answer:
      'Organic matter is the natural sponge of soil. Without organic carbon, coarse sandy soils allow water to drain straight through past the root zone, while crusted clay soils cause irrigation water to run off the surface without soaking in.',
    primaryCauses: [
      'Low organic carbon percentage failing to hold capillary water',
      'Surface crusting causing water to run off instead of infiltrating',
      'Loss of porous crumb structure that stores moisture against gravity',
    ],
    practicalAdvice:
      'Build up soil organic carbon. Every 1% increase in organic matter dramatically improves the soil’s moisture holding capacity.',
  },
  {
    id: 'plants-yellow-after-fertilization',
    number: '05',
    question: 'Why do plants remain yellow even after fertilization?',
    answer:
      'Yellow leaves (chlorosis) can have multiple physiological causes beyond simple nitrogen shortage. A field with yellow crops may suffer from root damage, soil compaction suffocating roots, pH imbalances locking up micronutrients like iron or magnesium, or waterlogged soil shutting down nutrient transport.',
    primaryCauses: [
      'Compacted or anaerobic roots unable to absorb available nutrients',
      'Micronutrient lockup (iron, zinc, magnesium) due to high soil pH',
      'Root damage from nematodes, salinity, or waterlogging',
    ],
    practicalAdvice:
      'Inspect root health and soil moisture before applying more fertilizer. An agronomic soil test or expert field consultation can pinpoint the root cause.',
  },
  {
    id: 'why-organic-matter-important',
    number: '06',
    question: 'Why is organic matter important?',
    answer:
      'Organic matter is the biological engine of agriculture. It feeds beneficial microbes, glues mineral grains into porous crumbs, buffers soil pH, stores available moisture, and creates an aerated biological habitat where roots thrive without continuous chemical intervention.',
    primaryCauses: [
      'Acts as the primary food source for beneficial bacteria and fungi',
      'Dramatically enhances Cation Exchange Capacity (CEC) for nutrient retention',
      'Transforms hard, dense earth into soft, living, productive soil',
    ],
    practicalAdvice:
      'Treat organic matter as your most valuable field capital. Consistent replenishment with enriched vermicompost pays dividends across all crop cycles.',
  },
];

/* ============================================================================
   05 — FARMER HANDBOOK RESOURCE METADATA
   ============================================================================ */
export const HANDBOOK_INFO = {
  title: 'Naati Organics Farmer Handbook',
  subtitle: 'A Practical Guide to Soil Health & Crop Nutrition',
  edition: 'Official Agricultural Advisory Edition',
  overview:
    'The Naati Farmer Handbook synthesizes fundamental soil science, root architecture, living microbial biology, and the two-step Naati nutrition approach into a practical, accessible field reference.',
  languages: [
    {
      code: 'en',
      name: 'English Edition',
      label: 'English (Original)',
      status: 'Available for Immediate Download (PDF & PPTX)',
      format: 'Full-Colour Comprehensive Advisory PDF & Presentation Slides',
      downloadPdfUrl: '/downloads/Naati-Farmers-Handbook.pdf',
      downloadPptxUrl: '/downloads/Naati-Farmers-Handbook.pptx',
    },
    {
      code: 'kn',
      name: 'ಕನ್ನಡ ಆವೃತ್ತಿ',
      label: 'Kannada (ಪ್ರಾದೇಶಿಕ ಆವೃತ್ತಿ)',
      status: 'Available via Authorized Dealers',
      format: 'ರೈತ ಮಾರ್ಗದರ್ಶಿ ಪುಸ್ತಕ (ಕನ್ನಡ)',
    },
  ],
  verifiedNote:
    'The complete Naati Organics Farmer Handbook is available for direct digital download in PDF and PPTX slide formats. High-quality print editions are also distributed through authorized Naati agricultural advisory workshops across Karnataka and South India.',
};
