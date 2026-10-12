import type { Metadata, Viewport } from 'next';
import { fraunces, dmSans, ibmPlexMono, notoSansKannada } from '@/lib/fonts';
import { createSiteMetadata } from '@/lib/seo/metadata';
import { SiteFooter } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = createSiteMetadata();

export const viewport: Viewport = {
  themeColor: '#F5F1E7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${ibmPlexMono.variable} ${notoSansKannada.variable}`}
    >
      <body className="font-sans bg-cream text-text-primary antialiased min-h-[100dvh] flex flex-col selection:bg-harvest selection:text-forest-deep overflow-x-hidden">
        <div className="flex-1 flex flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
