# Naati Organics — Route Plan & Architecture

Website: `www.naatiorganics.com`  
Positioning: **India's Knowledge-Led Soil Health & Crop Nutrition Platform**  
Core Philosophy: **Fix the Soil. Feed the Plant.**

---

## Route Overview & Phased Roadmap

| Route | Page Name | Primary Objective | Phased Delivery |
|---|---|---|---|
| `/` | **Home** | Editorial storytelling hub. Introduction to soil health philosophy, the two-product system, and high-impact agricultural imagery. | Phase 03 |
| `/about` | **About Naati** | Brand origins, scientific agronomy philosophy, founder's mission, and commitment to soil biology. | Phase 04 |
| `/nutrition-system` | **Crop Nutrition System** | The synergistic relationship: Naati Plus (Soil Nutrition) + Naati Pro (Plant Nutrition). "Fix the Soil. Feed the Plant." | Phase 04 |
| `/products/naati-plus` | **Naati Plus** | Product focus: Enriched Vermicompost for soil organic matter, microbial activity, root architecture, and moisture retention. | Phase 05 |
| `/products/naati-pro` | **Naati Pro** | Product focus: Biological Nutrition Assistant for vegetative vigour, flowering, fruit set, and stress tolerance. | Phase 05 |
| `/crop-solutions` | **Crop Solutions Hub** | Agronomic protocols categorized by Plantation (Arecanut, Coffee, Coconut), Horticulture, and Field Crops. | Phase 06 |
| `/crop-solutions/[slug]` | **Crop Protocol Detail** | Dynamic page detailing dosage, application windows, and crop-specific guidance. | Phase 06 |
| `/soil-academy` | **Soil Academy Hub** | Educational center answering farmer queries on soil compaction, root health, microbial flora, and earthworms. | Phase 07 |
| `/soil-academy/[slug]` | **Soil Academy Lesson** | Rich editorial articles explaining fundamental soil science before introducing products. | Phase 07 |
| `/resources` | **Resources & Downloads** | PDF handbooks, downloadable application charts, and dosage calculators. | Phase 08 |
| `/success-stories` | **Success Stories** | Authentic farmer experiences and verified field observations (strictly no fabricated endorsements). | Phase 08 |
| `/dealers` | **Dealer Network** | Partnership enquiry form for retail distributors, regional agro-centers, and dealer locator. | Phase 09 |
| `/faq` | **FAQs** | Categorized answers addressing product compatibility, organic standards, and usage instructions. | Phase 09 |
| `/contact` | **Contact & Advisory** | Agronomy hotline, headquarters address, and consultation request form. | Phase 09 |

---

## Technical Architecture

- **Framework:** Next.js App Router with TypeScript
- **Styling:** Tailwind CSS with CSS Variable design tokens
- **Font Stack:** Manrope (Headings), DM Sans (Body), Noto Sans Kannada (Regional support)
- **Animation Framework:** GSAP & ScrollTrigger (prepared with `prefers-reduced-motion` safety)
- **Image Handling:** Next.js Image component with modern AVIF/WebP formats and fluid device sizing
- **SEO & Canonical URLs:** Server-rendered Next.js Metadata API with canonical domain `https://www.naatiorganics.com`
