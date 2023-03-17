/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/assets/hero-bg.jpg')",
        labels: "url('/assets/labels-bg.jpg')",
      },
    },
    colors: {
      transparent: "transparent",
      black: "black",
      dark: "#212227",
      light: "#f3eff5",
      "light-green": "#72b01d",
      "dark-green": "#3f7d20",
      bittersweet: "#ee6055",
    },
  },
  plugins: [],
};

module.exports = config;
