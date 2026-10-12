import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '430px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        forest: {
          DEFAULT: '#203817',
          deep: '#14240E',
          surface: '#1A2E13',
          light: '#2D4E21',
          hover: '#29481E',
        },
        olive: {
          DEFAULT: '#637B43',
          light: '#7B9656',
          dark: '#4B5E32',
          surface: '#EAEFD8',
          hover: '#566B3A',
        },
        cream: {
          DEFAULT: '#F5F1E7',
          light: '#FAF8F3',
          muted: '#EBE5D6',
          deep: '#DFD7C2',
          border: '#E2DACE',
        },
        earth: {
          DEFAULT: '#654A32',
          dark: '#4A3421',
          light: '#7F5E40',
          surface: '#EFEAE4',
          hover: '#563E29',
        },
        harvest: {
          DEFAULT: '#DDCE9A',
          light: '#E8DCB3',
          dark: '#C8B575',
          surface: '#FBF8EE',
          hover: '#CFBE85',
        },
        text: {
          primary: '#1B2E14',
          secondary: '#48563F',
          muted: '#73806B',
          inverse: '#FAF8F3',
          'inverse-muted': '#D3DACB',
        },
        border: {
          DEFAULT: '#E2DACE',
          light: '#EFEAE0',
          dark: '#2D4321',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
        kannada: ['var(--font-noto-kannada)', 'sans-serif'],
      },
      fontSize: {
        'display-hero': [
          'clamp(2.75rem, 1.85rem + 4.5vw, 5.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '800' },
        ],
        'editorial-lg': [
          'clamp(2.25rem, 1.6rem + 3.25vw, 4.25rem)',
          { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' },
        ],
        'heading-section': [
          'clamp(1.75rem, 1.35rem + 2vw, 3rem)',
          { lineHeight: '1.18', letterSpacing: '-0.025em', fontWeight: '700' },
        ],
        'heading-sub': [
          'clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)',
          { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' },
        ],
        'body-lg': [
          'clamp(1.125rem, 1.05rem + 0.35vw, 1.375rem)',
          { lineHeight: '1.55', letterSpacing: '-0.01em', fontWeight: '400' },
        ],
        'body-base': [
          'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
          { lineHeight: '1.6', letterSpacing: 'normal', fontWeight: '400' },
        ],
        'body-sm': [
          'clamp(0.875rem, 0.825rem + 0.2vw, 0.9375rem)',
          { lineHeight: '1.5', letterSpacing: 'normal', fontWeight: '400' },
        ],
        caption: [
          'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',
          { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '600' },
        ],
        nav: [
          'clamp(0.875rem, 0.825rem + 0.2vw, 0.9375rem)',
          { lineHeight: '1.2', letterSpacing: '0.02em', fontWeight: '500' },
        ],
      },
      borderRadius: {
        sharp: '2px',
        subtle: '4px',
        card: '12px',
        panel: '18px',
        pill: '9999px',
      },
      boxShadow: {
        'warm-sm': '0 2px 6px -1px rgba(32, 56, 23, 0.06)',
        'warm-md': '0 8px 24px -4px rgba(32, 56, 23, 0.09)',
        'warm-lg': '0 16px 40px -8px rgba(32, 56, 23, 0.12)',
        'warm-inner': 'inset 0 2px 4px 0 rgba(32, 56, 23, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
