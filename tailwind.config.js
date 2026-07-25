/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
          800: '#0c4a6e',
          900: '#0a3654',
          DEFAULT: '#0284c7',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#64748b',
        },
        background: {
          light: '#f8fafc',
          dark: '#0f172a',
          DEFAULT: '#f8fafc',
        },
        card: {
          light: '#ffffff',
          dark: '#1e293b',
          DEFAULT: '#ffffff',
        },
        text: {
          light: '#0f172a',
          dark: '#f8fafc',
          muted: '#64748b',
        },
        border: {
          light: '#e2e8f0',
          dark: '#334155',
          DEFAULT: '#e2e8f0',
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
};
