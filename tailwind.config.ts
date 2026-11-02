import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#0B4F4A',
          light: '#0E5E58',
        },
        sand: {
          DEFAULT: '#F4EEE2',
        },
        deep: '#072B27',
        'green-brand': '#3FA34D',
        wheat: '#E8C872',
        'amber-brand': '#AF7708',
        ink: '#1C1C1C',
        muted: '#5B6460',
        line: '#D5D0C4',
      },
      fontFamily: {
        kufam: ['var(--font-kufam)', 'Kufam', 'system-ui', 'sans-serif'],
        kreon: ['var(--font-kreon)', 'Kreon', 'Georgia', 'serif'],
        naskh: ['var(--font-naskh)', 'Noto Naskh Arabic', 'Tahoma', 'sans-serif'],
        latin: ['var(--font-latin)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-kreon)', 'Kreon', 'Georgia', 'serif'],
        sans: ['var(--font-latin)', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-naskh)', 'Noto Naskh Arabic', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 16px 40px -10px rgba(11, 79, 74, 0.08)',
        card: '0 4px 20px -2px rgba(11, 79, 74, 0.06)',
        elevated: '0 20px 48px -12px rgba(7, 43, 39, 0.22)',
      },
      borderRadius: {
        card: '18px',
        hero: '220px',
      },
    },
  },
  plugins: [],
};

export default config;
