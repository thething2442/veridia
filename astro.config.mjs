// @ts-check
import { defineConfig } from 'astro/config';
// REMOVE: import node from '@astrojs/node'; // Make sure this line is removed if you're switching
import netlify from '@astrojs/netlify'; // ADD THIS LINE
import clerk from '@clerk/astro';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Keep allowedHosts for local dev/preview if needed, or remove if not.
      // Netlify deployment handles this differently.
      allowedHosts: ['frontend-veridia.onrender.com', 'your-netlify-domain.netlify.app'], // Add your Netlify domain here
    },
  },

  // Switch to the Netlify adapter. This adapter is specifically designed
  // to handle the serverless function output for Netlify, including ESM.
  adapter: netlify(), // <--- This now correctly refers to the imported 'netlify'

  output: 'server', // Keep this as 'server' for SSR

 
  integrations: [react(), clerk()],
});
