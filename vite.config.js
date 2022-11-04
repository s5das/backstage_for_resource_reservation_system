import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports:['vue'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://43.142.93.138:8080', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }

})
