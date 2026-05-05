import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://zackdell.com',
  integrations: [sitemap(), mdx(), svelte()],
  output: 'static',
  build: {
    format: 'directory',
  },
  outDir: process.env.ASTRO_OUTDIR ?? './dist',
});
