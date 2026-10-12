# Naati Organics — Web Platform

> **Fix the Soil. Feed the Plant.**  
> India’s Knowledge-Led Soil Health & Biological Crop Nutrition Platform.

---

## 🌾 Overview

Naati Organics is an editorial multipage web application presenting the complete biological crop nutrition system:
- **Naati Plus**: Build the Soil (Enriched vermicompost & biological soil conditioners)
- **Naati Pro**: Feed the Plant (Vegetative vigour, foliar nutrition & canopy bio-activator)
- **Crop Solutions**: Stage-wise agronomic protocols across Plantation, Horticulture, Field, and Spice crops
- **Soil Academy**: Educational learning centre with interactive Living Soil microbiology explorer
- **Farmer Knowledge Hub**: Technical agronomy notes, dosage tables, and guides
- **Dealer Network**: Commercial partnership registration and territory protection
- **Contact Desk**: District and Taluk-based advisory routing

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS & Vanilla CSS (Editorial palette: Cream `#F5F1E7`, Deep Forest `#14240E`, Harvest Gold `#D6C895`)
- **Typography**: Google Fonts via `next/font` (Fraunces Display Serif, DM Sans Body, IBM Plex Mono, Noto Sans Kannada)
- **Interactions**: GSAP 3 (ScrollTrigger, matchMedia, prefers-reduced-motion safe context)
- **Icons**: Lucide React
- **SEO & Structured Data**: Dynamic XML Sitemap, `robots.txt`, OpenGraph metadata, JSON-LD Schema (`FAQPage`, `Organization`)

---

## 🚀 Deployment Options

### 1. Vercel (Recommended)
1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project into [Vercel](https://vercel.com/new).
3. Set the build settings (detected automatically):
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add Environment Variables (from `.env.example`):
   - `NEXT_PUBLIC_SITE_URL`: `https://www.naatiorganics.com`
   - `CONTACT_WEBHOOK_URL`: (optional webhook endpoint)
   - `DEALER_ENQUIRY_WEBHOOK_URL`: (optional webhook endpoint)
5. Click **Deploy**.

### 2. Node.js Server / VPS / Docker
```bash
# 1. Install dependencies
npm ci

# 2. Build production assets
npm run build

# 3. Start production server
npm run start
```
By default, the server runs on port `3000` (customize with `PORT=8080 npm run start`).

### 3. Docker Container
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
```

---

## 📋 Environment Configuration

Copy `.env.example` to `.env.local` to configure environment-specific keys:

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for SEO, sitemaps, and OpenGraph images | `https://www.naatiorganics.com` |
| `CONTACT_WEBHOOK_URL` | Webhook URL for contact form submissions | (Logged to server console if unset) |
| `DEALER_ENQUIRY_WEBHOOK_URL` | Webhook URL for dealership partnership submissions | (Logged to server console if unset) |
| `CONTACT_NOTIFICATION_EMAIL` | Default contact notification inbox | `info@naatiorganics.com` |
| `DEALER_NOTIFICATION_EMAIL` | Dealership desk notification inbox | `partners@naatiorganics.com` |

---

## 🧪 Quality Assurance & Build Commands

- `npm run dev`: Launch local development server with Fast Refresh
- `npm run typecheck`: Verify TypeScript types (`tsc --noEmit`)
- `npm run lint`: Run ESLint code inspection
- `npm run build`: Compile and generate optimized static pages (21/21 static routes)
- `npm run start`: Launch production server locally for staging verification

---

## 📄 License & Ownership
Copyright © Naati Organics. All rights reserved.
