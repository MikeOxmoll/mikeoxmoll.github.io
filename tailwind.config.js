/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        primary: '#1a94ff',
        primGrey: '#1B1B1B',
        secGrey: '#262626',
        secWhite: '#F5F5F5',
      },
    },
  },
  plugins: [],
}