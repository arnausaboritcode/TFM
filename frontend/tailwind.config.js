/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    //Custom tailwind styles
    extend: {
      colors: {
        darkBlue: {
          300: 'rgb(156 163 175)',
          400: '#1e1e32',
          500: 'rgba(5, 8, 22, 1)',
        },
        salmon: '#ff903c',
      },
      backgroundImage: {
        'tech-banner': "url('assets/images/bg.png')",
        'tech2-banner': "url('assets/images/bg5.png')",
        'tech3-banner': "url('assets/images/bg-6.png')",
      },
      animation: {
        'text-slide': 'text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
      },
      keyframes: {
        'text-slide': {
            '0%, 16%': {
                transform: 'translateY(0%)',
            },
            '20%, 36%': {
                transform: 'translateY(-16.66%)',
            },
            '40%, 56%': {
                transform: 'translateY(-33.33%)',
            },
            '60%, 76%': {
                transform: 'translateY(-50%)',
            },
            '80%, 96%': {
                transform: 'translateY(-66.66%)',
            },
            '100%': {
                transform: 'translateY(-83.33%)',
            },
        },
      },
  },
},
  plugins: [
    require('tailwind-animatecss')
  ],
}

