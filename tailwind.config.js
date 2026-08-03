/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.tsx',
    './components/**/*.ts',
    './pages/**/*.tsx',
    './pages/**/*.ts',
    './content/**/*.md',
    './content/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        pathmaker: {
          dark: '#050505',
          primary: '#121212',
          accent: '#a38a6a',
          gold: '#a38a6a',
          light: '#1c1c1c',
          text: '#e5e5e5',
          body: '#A1A1AA',
        }
      },
      backgroundImage: {
        'titan-gradient': 'linear-gradient(to bottom, #050505, #121212)',
      }
    }
  },
  plugins: [],
}
