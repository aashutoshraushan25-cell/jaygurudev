/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FDF2F3',
          100: '#FBE4E6',
          200: '#F7CBD0',
          300: '#F0A3AC',
          400: '#E4717E',
          500: '#D24353',
          600: '#B82839',
          700: '#9B1D2C',
          800: '#82121E', // Primary Dark Maroon in screenshot
          900: '#780016', // Deep Maroon
          950: '#48000C',
        },
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        spiritual: {
          bg: '#FBF9F5',
          cream: '#FAF7F2',
          peach: '#F5EBE6',
          peachLight: '#FDF6F2',
          sand: '#F3EDE6',
          card: '#FFFFFF',
          border: '#EBE3DA',
          borderLight: '#F0E9E1',
          textDark: '#1F2937',
          textMuted: '#5F6B7A',
          maroon: '#82121E',
          maroonDark: '#780016',
          maroonLight: '#9E1B28',
          gold: '#C27803',
          goldLight: '#FEF3C7',
        },
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', '"Mukta"', 'sans-serif'],
        serifDev: ['"Rozha One"', '"Martel"', '"Noto Serif Devanagari"', 'serif'],
        sans: ['"Noto Sans Devanagari"', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px -2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 12px 28px -4px rgba(130, 18, 30, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        maroon: '0 4px 14px 0 rgba(120, 0, 22, 0.28)',
        'maroon-lg': '0 8px 24px -2px rgba(120, 0, 22, 0.35)',
        heroSearch: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

