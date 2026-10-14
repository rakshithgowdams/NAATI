import React from 'react';
import { SiteHeader } from '@/components/layout/site-header';
import {
  HomeHero,
  SoilCrisis,
  WhySoilFirst,
  NaatiPhilosophy,
  CropNutritionSystem,
  CropSolutions,
  KnowledgeSection,
  WhyFarmersChooseNaati,
  HomeTestimonials,
  DealerNetworkSection,
  ContactEnquirySection,
} from '@/components/sections/home';

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
      {/* Global Transparent Overlay Navbar (Senses active section data-nav-theme) */}
      <SiteHeader initialTheme="dark" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Phase 03: Full-Bleed Premium Cinematic Hero */}
        <HomeHero />

        {/* Phase 04: Homepage Section 02 — The Soil Crisis */}
        <SoilCrisis />

        {/* Phase 05: Homepage Section 03 — Why Soil First? */}
        <WhySoilFirst />

        {/* Phase 06: Homepage Section 04 — The Naati Philosophy */}
        <NaatiPhilosophy />

        {/* Phase 07: Homepage Section 05 — The Complete Crop Nutrition System */}
        <CropNutritionSystem />

        {/* Phase 08: Homepage Section 06 — Interactive Crop Solutions */}
        <CropSolutions />

        {/* Phase 09: Homepage Section 07 — Knowledge Before Products (Field Notes) */}
        <KnowledgeSection />

        {/* Phase 10: Homepage Section 09 — Why Farmers Choose Naati */}
        <WhyFarmersChooseNaati />

        {/* Phase 11: Homepage Section 10 — Testimonials (Voices from the Field) */}
        <HomeTestimonials />

        {/* Phase 12: Homepage Section 11 — Dealer Network (Grow Together With Naati) */}
        <DealerNetworkSection />

        {/* Phase 13: Closing Contact & Enquiry (Let's Grow Together) */}
        <ContactEnquirySection />
      </main>
    </div>
  );
}
