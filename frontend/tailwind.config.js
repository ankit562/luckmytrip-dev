/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'berlin': ['Berlin Sans FB Demi', 'Berlin Sans FB', 'sans-serif'],
      },
    },
  },
  plugins: [],
}