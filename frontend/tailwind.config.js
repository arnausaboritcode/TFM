/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    //Custom tailwind styles
    extend: {
      fontFamily: {
        strange: "Permanent Marker",
      },
      colors: {
        darkBlue: {
          300: "#9CA3AF",
          400: "#1e1e32",
          500: "#00020f",
        },
        salmon: "#ff903c",
      },
      backgroundImage: {
        "tech-banner-1": "url('assets/images/tech-banner-1.webp')",
        "tech-banner-2": "url('assets/images/tech-banner-2.webp')",
        "tech-banner-3": "url('assets/images/tech-banner-3.webp')",
      },
      animation: {
        "text-slide":
          "text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite",
      },
      keyframes: {
        "text-slide": {
          "0%, 16%": {
            transform: "translateY(0%)",
          },
          "20%, 36%": {
            transform: "translateY(-16.66%)",
          },
          "40%, 56%": {
            transform: "translateY(-33.33%)",
          },
          "60%, 76%": {
            transform: "translateY(-50%)",
          },
          "80%, 96%": {
            transform: "translateY(-66.66%)",
          },
          "100%": {
            transform: "translateY(-83.33%)",
          },
        },
      },
    },
  },
  plugins: [require("tailwind-animatecss"), require("tailwindcss-patterns")],
};
