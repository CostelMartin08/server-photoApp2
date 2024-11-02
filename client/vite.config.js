import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      manifest: {
        name: 'Ursu Ioan Fotograf"',
        short_name: 'Portofoliu',
        description: 'Cele mai interesante colecții sunt aici!',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/fav/icon1.png' ,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/fav/android-chrome-384x384.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
          urlPattern: /\/sitemap\.xml|\/site\.webmanifest$/,
          handler: 'NetworkOnly', 
          },
          {
            urlPattern: ({ request }) => 
              request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style' ||
              request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'my-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, 
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('pages')) {
            return 'pages';
          }
        },
      },
    },
  },
});
