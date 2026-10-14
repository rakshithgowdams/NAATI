export interface CropSolution {
  id: string;
  index: string;
  emoji: string;
  name: string;
  shortName: string;
  imageSrc: string;
  imageAlt: string;
  naatiPlus: {
    stage: string;
    product: string;
    application: string;
  };
  naatiPro: {
    stage: string;
    product: string;
    application: string;
  };
  referenceTiming: string;
  tag: string;
}

/**
 * Client-specified Crop Solutions for Section 6 and the Crop Atlas.
 * "One System. Multiple Crops." — Naati Plus (Soil) + Naati Pro (Plant).
 */
export const CROP_SOLUTIONS: CropSolution[] = [
  {
    id: 'coconut',
    index: '01',
    emoji: '🥥',
    name: 'Coconut',
    shortName: 'Coconut',
    imageSrc: '/assets/images/crops/coconut.jpg',
    imageAlt:
      'Healthy productive coconut palm crown laden with abundant nut bunches on a South Indian plantation',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Circular basin trenching around active feeder root zone.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Basin / crown spray supporting nut retention and button setting.',
    },
    referenceTiming: 'Pre-monsoon & post-monsoon',
    tag: 'Plantation Palms',
  },
  {
    id: 'arecanut',
    index: '02',
    emoji: '🌴',
    name: 'Arecanut',
    shortName: 'Arecanut',
    imageSrc: '/assets/images/crops/arecanut.jpg',
    imageAlt:
      'Towering healthy arecanut palms with vigorous green foliage and heavy nut bunches in Karnataka grove',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Apply in root basin trenches to aerate soil and stimulate feeder roots.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Targeted spray for inflorescence vitality and nut retention.',
    },
    referenceTiming: 'May–June & September–October',
    tag: 'Plantation Palms',
  },
  {
    id: 'coffee',
    index: '03',
    emoji: '☕',
    name: 'Coffee',
    shortName: 'Coffee',
    imageSrc: '/assets/images/crops/coffee.jpg',
    imageAlt:
      'Lush shade-grown coffee plants loaded with ripe red cherries in Western Ghats estate',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Incorporate into organic leaf litter and root feeding zone.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply post-blossom and during berry swelling for uniform size.',
    },
    referenceTiming: 'Post-blossom & berry development',
    tag: 'Estate Plantations',
  },
  {
    id: 'pepper',
    index: '04',
    emoji: '🌶️',
    name: 'Pepper',
    shortName: 'Pepper',
    imageSrc: '/assets/images/crops/pepper.jpg',
    imageAlt:
      'Climbing black pepper vines with dense green and ripening red peppercorn spikes on shade trees',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Soil collar drenching at standard tree bases before monsoons.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Foliar application during spike initiation and berry development.',
    },
    referenceTiming: 'Spike emergence & berry development',
    tag: 'Spices & Vines',
  },
  {
    id: 'banana',
    index: '05',
    emoji: '🍌',
    name: 'Banana',
    shortName: 'Banana',
    imageSrc: '/assets/images/crops/banana.jpg',
    imageAlt:
      'Vibrant organic banana plantation showing heavy hanging bunches of green bananas and purple inflorescence heart',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Incorporate into planting pits and base earthing-up rounds.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Spray during rapid vegetative shooting and bunch development.',
    },
    referenceTiming: 'Pit preparation & shooting stage',
    tag: 'Horticultural Fruits',
  },
  {
    id: 'mango',
    index: '06',
    emoji: '🥭',
    name: 'Mango',
    shortName: 'Mango',
    imageSrc: '/assets/images/crops/mango.jpg',
    imageAlt:
      'Abundant mature Alphonso and Badami mangoes hanging on leafy orchard branches in sunny grove',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Canopy drip-line ring application to restore root feeder zones.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply pre-flowering and at pea-size fruit development.',
    },
    referenceTiming: 'Post-harvest & fruit-set phase',
    tag: 'Orchard Fruits',
  },
  {
    id: 'vegetables',
    index: '07',
    emoji: '🍅',
    name: 'Vegetables',
    shortName: 'Vegetables',
    imageSrc: '/assets/images/crops/vegetables.jpg',
    imageAlt:
      'Lush organic vegetable beds with healthy tomatoes, brinjals, and chillies in fertile red loam soil',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Mix thoroughly into raised nursery and field beds before planting.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Foliar nutrition throughout active vegetative expansion and fruit set.',
    },
    referenceTiming: 'Transplanting & active fruiting',
    tag: 'Open-Field Vegetables',
  },
  {
    id: 'field-crops',
    index: '08',
    emoji: '🌾',
    name: 'Field Crops',
    shortName: 'Field Crops',
    imageSrc: '/assets/images/crops/field-crops.jpg',
    imageAlt:
      'Golden ripening finger millet ragi and cereal field crops under Karnataka sunlight',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Basal incorporation during field ploughing and land preparation.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply during active tillering, boot leaf, and grain filling.',
    },
    referenceTiming: 'Basal ploughing & tillering',
    tag: 'Cereals & Millets',
  },
  {
    id: 'spices',
    index: '09',
    emoji: '🌿',
    name: 'Spices',
    shortName: 'Spices',
    imageSrc: '/assets/images/crops/spices.jpg',
    imageAlt:
      'Aromatic turmeric and ginger rhizomes growing vigorously in deep organic raised soil beds',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Apply in beds and furrows prior to planting seed rhizomes.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply during tillering, active foliage growth & rhizome bulking.',
    },
    referenceTiming: 'Bed preparation & shoot emergence',
    tag: 'Aromatic Spices',
  },
  {
    id: 'terrace-gardens',
    index: '10',
    emoji: '🏡',
    name: 'Home / Terrace Gardens',
    shortName: 'Home/Terrace Gardens',
    imageSrc: '/assets/images/crops/terrace-garden.jpg',
    imageAlt:
      'Thriving rooftop terrace garden with potted organic vegetables, herbs, and lush grow bags',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Blend into potting soil, grow bags, and container compost.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Gentle foliar spritz or root drenching every 15–20 days.',
    },
    referenceTiming: 'Potting setup & monthly feeding',
    tag: 'Urban & Home Gardens',
  },
];
