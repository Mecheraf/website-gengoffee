/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#E7EDF8',
        'light-red': '#F8E7E7',
      }
    },
  },
  plugins: [],
}
