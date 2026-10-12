import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export default function NotFound() {
  return (
    <main
      data-nav-theme="light"
      className="min-h-[100dvh] flex flex-col items-center justify-center bg-cream text-forest-deep px-6 py-16 text-center select-none"
    >
      <div className="max-w-lg w-full flex flex-col items-center">
        <Logo size="md" className="mb-8" />

        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-harvest mb-4">
          <span>404 / PATH NOT FOUND</span>
        </div>

        <h1 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12] mb-4 [text-wrap:balance]">
          Looks like this path <br />
          <span className="italic font-light text-forest-deep/80">doesn&apos;t grow here.</span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-forest-deep/75 leading-relaxed max-w-md mx-auto mb-8">
          The field, lesson, or article you are looking for has moved or does not exist in our agricultural registry.
        </p>

        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-forest-deep text-cream text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold hover:bg-forest-light hover:text-forest-deep transition-all duration-300 shadow-sm"
        >
          <span>BACK TO HOME</span>
          <ArrowUpRight className="w-4 h-4 text-harvest transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </main>
  );
}
