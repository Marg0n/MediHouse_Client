/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["emerald", "luxury", "light", "dark", "wireframe", "cupcake", "dim", "aqua", "night", "winter"],
  },
}


