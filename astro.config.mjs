import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      wrap: true
    },
    remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to content"}
  },
  integrations: [tailwind(), vue(), sitemap()],
  site: 'https://blog.bartick.me',
  compressHTML: true,
  vite: {
    build: {
      sourcemap: true,
    }
  }
});