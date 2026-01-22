/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef6e7',
          100: '#fde9c0',
          200: '#fbdb97',
          300: '#f9cd6d',
          400: '#f7c24d',
          500: '#f5b72d',
          600: '#f4a828',
          700: '#f29622',
          800: '#f0851c',
          900: '#ed6611',
        },
        secondary: {
          50: '#e8f4fd',
          100: '#c5e3fa',
          200: '#9fd1f7',
          300: '#79bef3',
          400: '#5cb0f1',
          500: '#3fa2ee',
          600: '#399aec',
          700: '#3190e9',
          800: '#2986e7',
          900: '#1b75e2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
