/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,css,js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'morph-gray': '#d9e3f1'
      },
      boxShadow:{
        'morph-shadow': 'inset -1px 1px 2px rgba(0, 0, 0, 0.2)'
      },

    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

