'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import { VERIFIED_CONTACT_INFO } from '@/data/contact';
import { cn } from '@/lib/utils/cn';

export interface WaysToConnectProps {
  className?: string;
}

/**
 * CONTACT & ENQUIRY — SECTION 02: WAYS TO CONNECT
 *
 * Eyebrow: 01 / REACH US
 * Headline: "Choose how you'd like to connect."
 *
 * Typography-led Editorial Contact Directory:
 * - Left: Editorial heading and advisory summary
 * - Right: Clean, vertically separated contact rows with verified client channels
 * - Clickable actions (mailto:, tel:, WhatsApp wa.me), copy-to-clipboard triggers with visual feedback
 * - No fake cards or unverified social placeholders
 */
export function WaysToConnect({ className }: WaysToConnectProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Naati Organics, I would like to inquire about your soil health and crop nutrition solutions.'
  );
  const cleanPhoneDigits = VERIFIED_CONTACT_INFO.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhoneDigits}?text=${whatsappMessage}`;

  return (
    <section
      id="ways-to-connect"
      data-nav-theme="light"
      aria-labelledby="ways-to-connect-heading"
      className={cn(
        'relative w-full bg-cream text-text-primary py-16 sm:py-24 lg:py-28 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-b border-forest-deep/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Context (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-forest-deep">
                  01 / REACH US
                </span>
                <span className="h-px w-8 bg-forest-deep/20" aria-hidden="true" />
              </div>

              <h2
                id="ways-to-connect-heading"
                className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl tracking-tight text-forest-deep leading-[1.12]"
              >
                Choose how you&apos;d <br />
                <span className="italic font-light">like to connect.</span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-forest-deep/75 mt-5 leading-relaxed max-w-md">
                Our agronomy advisory and commercial desks assist growers, distributors, and agricultural partners across South India.
              </p>
            </div>

            {/* Availability Notice */}
            <div className="mt-8 pt-6 border-t border-forest-deep/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-deep font-semibold">
                <Clock className="w-3.5 h-3.5 text-harvest" />
                <span>Advisory Hours</span>
              </div>
              <p className="text-xs sm:text-sm font-sans text-forest-deep/70">
                {VERIFIED_CONTACT_INFO.hours}
              </p>
              <p className="text-[11px] font-mono text-forest-deep/55 italic">
                {VERIFIED_CONTACT_INFO.notes}
              </p>
            </div>
          </div>

          {/* Right Column: Clean Vertically Separated Contact Rows (7 Cols) */}
          <div className="lg:col-span-7 divide-y divide-forest-deep/15 border-t border-b border-forest-deep/15">
            {/* 01. Contact Email */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-deep/60 mb-1.5">
                  <Mail className="w-3.5 h-3.5 text-harvest" />
                  <span>Official Email Address</span>
                </div>
                <a
                  href={`mailto:${VERIFIED_CONTACT_INFO.email}`}
                  className="font-display font-medium text-xl sm:text-2xl text-forest-deep hover:text-harvest transition-colors underline underline-offset-4 decoration-forest-deep/30 hover:decoration-harvest"
                >
                  {VERIFIED_CONTACT_INFO.email}
                </a>
                <p className="text-xs font-sans text-forest-deep/65 mt-1">
                  For general inquiries, dealership proposals, and advisory requests
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => copyToClipboard(VERIFIED_CONTACT_INFO.email, 'email')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-forest-deep/20 text-xs font-mono text-forest-deep hover:bg-forest-deep hover:text-cream transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copiedKey === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-harvest" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${VERIFIED_CONTACT_INFO.email}`}
                  className="p-1.5 border border-forest-deep/20 text-forest-deep hover:bg-forest-deep hover:text-cream transition-colors"
                  aria-label="Send email"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 02. Telephone Hotline */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-deep/60 mb-1.5">
                  <Phone className="w-3.5 h-3.5 text-harvest" />
                  <span>Advisory & Inquiries Line</span>
                </div>
                <a
                  href={`tel:${cleanPhoneDigits}`}
                  className="font-display font-medium text-xl sm:text-2xl text-forest-deep hover:text-harvest transition-colors"
                >
                  {VERIFIED_CONTACT_INFO.phone}
                </a>
                <p className="text-xs font-sans text-forest-deep/65 mt-1">
                  Direct phone access to regional agronomists and support
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => copyToClipboard(VERIFIED_CONTACT_INFO.phone, 'phone')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-forest-deep/20 text-xs font-mono text-forest-deep hover:bg-forest-deep hover:text-cream transition-colors cursor-pointer"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number to clipboard"
                >
                  {copiedKey === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-harvest" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={`tel:${cleanPhoneDigits}`}
                  className="p-1.5 border border-forest-deep/20 text-forest-deep hover:bg-forest-deep hover:text-cream transition-colors"
                  aria-label="Call telephone"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 03. WhatsApp Quick Chat */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-deep/60 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-harvest" />
                  <span>Instant Messaging</span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-medium text-xl sm:text-2xl text-forest-deep hover:text-harvest transition-colors"
                >
                  WhatsApp Advisory Chat
                </a>
                <p className="text-xs font-sans text-forest-deep/65 mt-1">
                  Share field questions, photos of crop symptoms, and dosage inquiries
                </p>
              </div>

              <div className="shrink-0 pt-2 sm:pt-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-forest-deep text-cream text-xs font-mono uppercase tracking-[0.14em] hover:bg-forest-light hover:text-forest-deep transition-colors"
                >
                  <span>Open WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 04. Regional Headquarters */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-deep/60 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-harvest" />
                  <span>Headquarters Presence</span>
                </div>
                <div className="font-display font-medium text-xl sm:text-2xl text-forest-deep">
                  {VERIFIED_CONTACT_INFO.headquarters}
                </div>
                <p className="text-xs font-sans text-forest-deep/65 mt-1">
                  Distribution network spanning Karnataka, Tamil Nadu, Andhra Pradesh & South India
                </p>
              </div>

              <div className="shrink-0 text-xs font-mono text-forest-deep/60 uppercase tracking-wider pt-2 sm:pt-0">
                Regional Hub
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
