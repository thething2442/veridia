// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import clerk from '@clerk/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // === FIX START ===
  // Add 'server.allowedHosts' to the vite configuration.
  // This tells Vite (used by Astro) to allow requests from the deployed host,
  // preventing "Blocked request" errors when running in production/server environments.
  vite: {
    plugins: [tailwindcss()],
    server: {
      
      // Add your deployed frontend host here.
      // Render typically uses a hostname like 'your-service-name.onrender.com'
      allowedHosts: ['frontend-veridia.onrender.com'], // <--- ADD THIS LINE
    },
  },
  // === FIX END ===

  adapter: node({
    mode: 'standalone',
  }),
  output: 'server', // Keep this as 'server' for SSR

  server: {
    host: '0.0.0.0', // This is correct for binding to all interfaces on Render
    port: 4321, // You can specify a port, or it will default to 4321 in dev, and use process.env.PORT in production.
  },

  integrations: [react(), clerk()],
});
