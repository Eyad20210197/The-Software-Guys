import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F8FAFC',
          surface: '#EAEAEA',
          primary: '#003EC7',      // Electric Blue (Tailwind Spec)
          primaryAlt: '#005CFF',   // Brand Override
          secondary: '#F3E576',    // Soft Sulphur (Tailwind Spec)
          secondaryAlt: '#FEFFB0', // Brand Override
          dark: '#1A1C1C',         // High-Contrast Dark
          darkAlt: '#050B1A',      // Deep Midnight
          success: {
            bg: '#D1FAD7',
            text: '#00682A',
          },
          error: {
            bg: '#FFDAD6',
            text: '#93000A',
            border: '#BA1A1A',
          },
        },
      },
      boxShadow: {
        brutal: '6px 6px 0px 0px #1A1C1C',
        'brutal-sm': '4px 4px 0px 0px #1A1C1C',
        'brutal-lg': '8px 8px 0px 0px #1A1C1C',
        'brutal-primary': '8px 8px 0px 0px #003EC7',
        'brutal-secondary': '8px 8px 0px 0px #F3E576',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Work Sans', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
