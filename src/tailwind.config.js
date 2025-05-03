/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite/plugin');
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('flowbite/plugin'),
    ],
  }
  