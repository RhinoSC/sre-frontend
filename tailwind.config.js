/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // 'sans': ['Lato', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'lato': ['Lato', 'ui-sans-serif']
      },
      colors: {
        'violet-600': '#7C3AED',
        'gray-dark': {
          100: '#A1A1AA',
          200: '#3F3F46',
          300: '#2E2E3E',
          400: '#1E1E2E',
        },
        'gray-light': {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D1D5DB',
          400: '#4B5563',
        },
        'white-smoke': '#F4F4F5',
      },
    }
  },
  plugins: []
}
