export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#0097a7', // Teal from Copy Paper box background
          600: '#00838f',
          700: '#006064',
          800: '#004d40',
          900: '#00332c',
        },
        secondary: {
          50: '#f9fbe7',
          100: '#f0f4c3',
          200: '#e6ee9c',
          300: '#dce775',
          400: '#d4e157',
          500: '#cddc39', // Lime Green from 'Paper' text
          600: '#c0ca33',
          700: '#afb42b',
          800: '#9e9d24',
          900: '#827717',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
