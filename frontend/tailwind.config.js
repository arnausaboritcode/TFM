/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#fd7014',
          600: '#ee5408',
        },
      },
    },
  },
  plugins: [
    require('tailwind-animatecss')
  ],
}

