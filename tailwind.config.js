/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0097a7', // Teal from Copy Paper box
          dark: '#006064',
          light: '#4dd0e1',
        },
        secondary: {
          DEFAULT: '#cddc39', // Lime Green from Copy Paper box
          dark: '#9e9d24',
          light: '#f0f4c3',
        },
        dark: '#1a1a1a',
        light: '#f5f5f5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
