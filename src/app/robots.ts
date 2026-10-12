import type { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/constants/brand';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BRAND_CONFIG.baseUrl}/sitemap.xml`,
  };
}
