import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://re-el-branding.rf.gd',
  base: '/website/',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    fallback: { fr: 'en' },
    routing: { prefixDefaultLocale: false },
  },
  image: {
    domains: ['images.unsplash.com'],
  },
  prefetch: true,
  integrations: [sitemap()],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
