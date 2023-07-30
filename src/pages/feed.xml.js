import rss from '@astrojs/rss';


export async function get(context) {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('./*.md')).map(async ([_filePath, getInfo]) => {
      const { url, frontmatter, compiledContent } = await getInfo();
      return {
        link: url,
        title: frontmatter.title,
        description: frontmatter.description,
        pubDate: frontmatter.date,
        catagories: frontmatter.tags,
        author: frontmatter.author,
        content: compiledContent()
      }
    })
  );
  
  return rss({
    title: 'Bartick\'s Blog',
    description: 'Bartick\'s personal blogging website made with Astro and VueJs with Vite.',
    site: context.site,
    items: posts,
    customData: `<language>en-us</language>`,
  });
}