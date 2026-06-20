/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        slate: '#64748b',
        gold: '#b8860b',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
