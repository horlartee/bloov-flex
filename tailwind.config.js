/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      'xxs': '360px',
      'xs': '385px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      Pinyon: ["Pinyon Script", "cursive"]
      },
    extend: {
      colors: {
        primary: {
          bold: "#296ff9",
          lighter:"#e8dffa",
        },
        secondary: {
          bold: "#6419cf",
          lighter: "#fff5eb",
        },
      },
    },
  },
  plugins: [],
}

