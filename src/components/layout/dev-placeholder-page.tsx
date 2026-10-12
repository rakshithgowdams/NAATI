import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';

interface DevPlaceholderPageProps {
  title: string;
  route: string;
  phase: string | number;
  description: string;
}

export function DevPlaceholderPage({
  title,
  route,
  phase,
  description,
}: DevPlaceholderPageProps) {
  return (
    <div
      data-nav-theme="light"
      className="min-h-[calc(100dvh-200px)] flex-1 flex flex-col bg-cream text-text-primary selection:bg-harvest selection:text-forest-deep"
    >
      {/* Global Transparent Navbar (Theme: light) */}
      <SiteHeader initialTheme="light" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        <Container size="narrow" className="flex flex-col items-center">
          {/* Phase Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-cream-muted border border-cream-border text-xs font-mono text-text-secondary uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span>Phase {phase} · In Development</span>
          </div>

          {/* Page Heading */}
          <Heading level={1} size="editorial" className="text-forest mb-4">
            {title}
          </Heading>

          {/* Description */}
          <p className="text-body-lg text-text-secondary max-w-xl mb-4 font-sans [text-wrap:pretty]">
            {description}
          </p>

          <p className="text-xs text-text-muted font-display tracking-wider uppercase mb-8">
            Planned Route: <code className="text-forest font-semibold">{route}</code>
          </p>

          {/* Navigation Action */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary" size="md">
              Return to Home
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Agronomy Contact
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
}
