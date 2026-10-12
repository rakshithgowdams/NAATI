export interface CropSolution {
  id: string;
  index: string;
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
 * Client-approved Crop Solutions guidance for Homepage Section 06.
 * General application strategy combining Naati Plus (Soil) and Naati Pro (Plant).
 */
export const CROP_SOLUTIONS: CropSolution[] = [
  {
    id: 'solanaceous',
    index: '01',
    name: 'Tomato / Brinjal / Chilli',
    shortName: 'Tomato / Chilli',
    imageSrc: '/assets/images/crops/tomato-brinjal-chilli.jpg',
    imageAlt:
      'Lush tomato plants with healthy red and green tomatoes growing in rich organic red-loam soil on a South Indian farm',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Mix into soil before or at planting.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply during vegetative growth.',
    },
    referenceTiming: 'Planting & pre-flowering',
    tag: 'Vegetables & Solanaceae',
  },
  {
    id: 'alliums',
    index: '02',
    name: 'Onion / Garlic',
    shortName: 'Onion / Garlic',
    imageSrc: '/assets/images/crops/onion-garlic.jpg',
    imageAlt:
      'Healthy organic onion and garlic bulbs emerging vigorously from moist dark cultivated soil in neat field rows',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Incorporate into root zone.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply during active growth.',
    },
    referenceTiming: 'At planting',
    tag: 'Bulb & Root Alliums',
  },
  {
    id: 'spices',
    index: '03',
    name: 'Turmeric / Ginger',
    shortName: 'Turmeric / Ginger',
    imageSrc: '/assets/images/crops/turmeric-ginger.jpg',
    imageAlt:
      'Vibrant tropical turmeric foliage and fresh aromatic golden rhizomes nestled in aerated fertile soil',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Apply during land preparation.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply during crop growth.',
    },
    referenceTiming: 'Planting & early growth',
    tag: 'Spices & Rhizomes',
  },
  {
    id: 'greens',
    index: '04',
    name: 'Leafy Vegetables',
    shortName: 'Leafy Greens',
    imageSrc: '/assets/images/crops/leafy-vegetables.jpg',
    imageAlt:
      'Dense healthy leafy green vegetable beds thriving under natural morning light in crumbly humus-rich soil',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Mix into beds before sowing.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply after establishment.',
    },
    referenceTiming: 'Early growth',
    tag: 'Horticultural Greens',
  },
  {
    id: 'field-crops',
    index: '05',
    name: 'Other Field Crops',
    shortName: 'Field Crops',
    imageSrc: '/assets/images/crops/field-crops.jpg',
    imageAlt:
      'Golden finger millet ragi crop ripening under warm sunlight in Karnataka red earth agricultural terrain',
    naatiPlus: {
      stage: '01 / BUILD THE SOIL',
      product: 'Naati Plus',
      application: 'Apply during land preparation.',
    },
    naatiPro: {
      stage: '02 / FEED THE PLANT',
      product: 'Naati Pro',
      application: 'Apply during active growth.',
    },
    referenceTiming: 'As per crop stage',
    tag: 'Cereals & Millets',
  },
];
