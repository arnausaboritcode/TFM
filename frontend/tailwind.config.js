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
    },
  },
  plugins: [require("tailwind-animatecss")],
};
