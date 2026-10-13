import { Fraunces, DM_Sans, IBM_Plex_Mono, Noto_Sans_Kannada } from 'next/font/google';

/**
 * Font 01 — Display: FRAUNCES
 * Expressive serif for major editorial hero headlines, large storytelling statements,
 * selected oversized section titles, and brand philosophy messaging.
 */
export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  style: ['normal', 'italic'],
});

/**
 * Font 02 — Headings & Body: DM SANS
 * Clean, humanist sans-serif for section subheadings, navigation, product titles,
 * body paragraphs, educational explanations, and interface controls.
 */
export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
});

/**
 * Font 03 — Technical Accents: IBM PLEX MONO
 * Scientific monospaced font for section indexes, small agricultural labels,
 * figure references, and technical annotations.
 */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
});

/**
 * Regional Localization — Noto Sans Kannada
 */
export const notoSansKannada = Noto_Sans_Kannada({
  subsets: ['kannada', 'latin'],
  display: 'swap',
  variable: '--font-noto-kannada',
  weight: ['400', '500', '600', '700'],
});
