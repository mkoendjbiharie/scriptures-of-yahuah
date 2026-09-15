import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — parchment + deep gold
        parchment: {
          50:  '#fdf8ed',
          100: '#f9eecf',
          200: '#f2d99a',
        },
        gold: {
          500: '#b8860b',
          600: '#9a6f09',
          700: '#7d5a07',
        },
        ink: {
          900: '#1a1209',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
