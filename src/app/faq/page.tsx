import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { createSiteMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createSiteMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find answers about soil health, Naati Plus, Naati Pro, crop nutrition, application guidance and dealer enquiries.',
  path: '/faqs',
});

/**
 * Backward compatibility route: Redirect /faq to canonical /faqs
 */
export default function FaqRedirectPage() {
  redirect('/faqs');
}
