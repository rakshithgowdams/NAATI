import type { Metadata } from 'next';
import { BRAND_CONFIG } from '@/lib/constants/brand';

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function createSiteMetadata({
  title,
  description = BRAND_CONFIG.description,
  path = '',
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const canonicalUrl = `${BRAND_CONFIG.baseUrl}${path}`;

  // Clean any redundant brand suffix from the passed title
  const cleanTitle = title
    ? title.replace(new RegExp(`\\s*[|—–-]\\s*${BRAND_CONFIG.name}.*$`, 'i'), '').trim()
    : null;

  const fullTitle = cleanTitle
    ? `${cleanTitle} | ${BRAND_CONFIG.name}`
    : `${BRAND_CONFIG.name} | ${BRAND_CONFIG.tagline}`;

  return {
    metadataBase: new URL(BRAND_CONFIG.baseUrl),
    title: cleanTitle
      ? {
          absolute: fullTitle,
        }
      : {
          default: fullTitle,
          template: `%s | ${BRAND_CONFIG.name}`,
        },
    description,
    applicationName: BRAND_CONFIG.name,
    authors: [{ name: BRAND_CONFIG.name, url: BRAND_CONFIG.baseUrl }],
    creator: BRAND_CONFIG.name,
    publisher: BRAND_CONFIG.name,
    keywords: [
      'Naati Organics',
      'Fix the Soil Feed the Plant',
      'Naati Plus',
      'Naati Pro',
      'Vermicompost',
      'Soil Nutrition',
      'Plant Nutrition',
      'Biological Crop Nutrition',
      'Organic Agriculture India',
      'Soil Health Platform',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: '/assets/brand/naati-organics-logo.png',
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: BRAND_CONFIG.name,
      images: [
        {
          url: '/assets/brand/naati-organics-logo.png',
          width: 1024,
          height: 1024,
          alt: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/assets/brand/naati-organics-logo.png'],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
