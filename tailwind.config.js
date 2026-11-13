/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        ink: '#0b0b0d',
        panel: '#121215',
        line: '#252529',
        muted: '#88888f',
        violet: '#8b5cf6',
        pink: '#ec4899',
      },
      boxShadow: {
        glow: '0 0 32px rgba(139, 92, 246, 0.28)',
      },
    },
  },
  plugins: [],
}
