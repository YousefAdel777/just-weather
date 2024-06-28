/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "md": "768px",
      "lg": "992px",
      "xl": "1200px",
    },
    fontFamily: {
      "nunito": ["Nunito", "sans-serif"],
    },
    extend: {
      colors: {
        gray: {
          200: "#eef1fa",
          300: "#f5f5f5",
          400: "#e8eaf6",
        },
        violet: {
          700: "#5d65ad",
        }
      }
    },
  },
  plugins: [],
}

