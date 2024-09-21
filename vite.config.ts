import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = loadEnv('', process.cwd());
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      VITE_BE_URL: env.VITE_BACKEND_URL,
    },
    server: {
      host: env.VITE_HOST,
      port: 3000,
      watch: {
        usePolling: true
      }
    }
  }
});
