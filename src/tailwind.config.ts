import type { Config } from 'tailwindcss'
import flowbitePlugin from 'flowbite/plugin'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
}

export default config
