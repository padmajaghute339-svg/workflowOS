/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        y2k: {
          bg: '#0a0817',
          card: '#13112a',
          surface: '#1a1738',
          pink: '#ff007f',
          magenta: '#ff2a85',
          cyan: '#00f0ff',
          purple: '#9d4edf',
          violet: '#7000ff',
          lime: '#39ff14',
          yellow: '#ffe600',
          silver: '#e2e8f0'
        },
        brand: {
          50: '#fff0f7',
          100: '#ffe0f0',
          500: '#ff007f',
          600: '#e00070',
          700: '#b8005c',
          900: '#7a003d',
        }
      },
      boxShadow: {
        'neon-pink': '0 0 20px rgba(255, 0, 127, 0.4)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(157, 78, 223, 0.4)',
        'neon-lime': '0 0 20px rgba(57, 255, 20, 0.4)'
      }
    },
  },
  plugins: [],
}
