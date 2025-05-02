/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stores/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#111827',
        'dark-surface': '#1F2937',
        'dark-border': '#374151',
        'dark-text': '#E5E7EB',
        'dark-text-secondary': '#9CA3AF',
        'dark-accent': '#3B82F6',
        'dark-accent-hover': '#2563EB',
      },
    },
  },
  plugins: [],
};