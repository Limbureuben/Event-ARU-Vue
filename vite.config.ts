// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import graphql from '@rollup/plugin-graphql'

// export default defineConfig({
//   plugins: [
//     vue(),
//     graphql(),
//   ],
// })

// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'
import path from 'path'

export default defineConfig({
  plugins: [vue(), graphql()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})



