import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import { prettyPrint } from 'recast';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      langs: [],
      wrap: true
    },
    remarkRehype: {
      footnoteLabel: "Footnotes",
      footnoteBackLabel: "Back to content"
    }
  },
  integrations: [tailwind(), vue(), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
  site: 'https://blog.bartick.me',
  compressHTML: true,
  vite: {
    build: {
      sourcemap: true
    },
    plugins: [
      {
        name: 'custom-plugin',
        enforce: true,
        transform(code, id) {
          if(!id.endsWith('.md')) return;
          const extraImports = [
            "import { Image } from '@astrojs/image/components';"
          ]
          let readingTime = -1;
          let frontmatterPos = -1;
          const ast = this.parse(code);
          for(let i = 0; i < ast.body.length; i++) {
            if(ast.body[i].type === 'ExportNamedDeclaration') {
              if(ast.body[i].declaration.declarations?.[0].id.name === 'frontmatter') {
                frontmatterPos = i;
              } else if(ast.body[i].declaration.id?.name === 'rawContent') {
                readingTime = Math.ceil(ast.body[i].declaration.body.body[0].argument.value.split(/\s/g).length/200);
              }
            }
          }

          if (frontmatterPos && readingTime) {
            ast.body[frontmatterPos].declaration.declarations[0].init.properties.push({
              type: 'Property',
              key: {
                type: 'Literal',
                value: 'readingTime',
                raw: '"readingTime"'
              },
              value: {
                type: 'Literal',
                value: readingTime,
                raw: readingTime.toString()
              },
              kind: 'init',
              computed: false,
              method: false,
              shorthand: false
            });
          }
          code = prettyPrint(ast, { tabWidth: 2 }).code;
          code = `${extraImports.join('\n')}\n${code}`
          return code;
        }
      }
    ]
  }
});