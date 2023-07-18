import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-vue-markdown'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import hljs from 'highlight.js'

import hljsDefineVue from './src/language/vue'

hljs.registerLanguage('vue', hljsDefineVue);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        xhtmlOut: true,
        breaks: true,
        langPrefix: 'language-',
        linkify: true,
        typographer: true,
        quotes: '“”‘’',
        highlight: (str, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
          }
          return ''; // use external default escaping
        },
        maxNesting: 100,
      },
    }),
    ViteImageOptimizer({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "firebase/app$": "firebase/app/dist/index.esm.js",
    }
  },
  base: './'
})
