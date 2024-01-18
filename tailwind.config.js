/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangejuice: '#F4694C',
        bluebg: '#0d1324',
        bluefill: '#1D2432',
        secondarycolor:'#0f172a',
        bordercolor: '#1c2739',
        textColor: '#A6B9D0'
      },
    },
  },
  plugins: [
    '@tailwindcss/forms'
  ],
}

