/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Add all file extensions you use
  ],
  theme: {
    extend: {},
  },
  plugins: [
  ('@tailwindcss/forms'),
  ('@tailwindcss/typography'),
],
}

