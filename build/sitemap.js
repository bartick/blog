// create a sitemap.xml file

const fs = require('fs');
const path = require('path');

const sourceXML = path.join(__dirname, '../public/sitemap.xml');

const renderXML = (data) => {
    const url = 'https://blog.bartick.me';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${data
            .map(
                (post) => `
            <url>
                <loc>${url}/${post.url}</loc>
                <lastmod>${post.date}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>
        `)
            .join('')}
    </urlset>`;
    return xml;
};

const generateSitemap = (posts) => {
    const xml = renderXML(posts);
    fs.writeFileSync(sourceXML, xml, 'utf8');
}

const getPosts = () => {
    const posts = fs.readdirSync(path.join(__dirname, '../posts')).filter(file => path.extname(file) === '.md')
    const readData = posts.map((post) => {
        const data = fs.readFileSync(path.join(__dirname, `../posts/${post}`), 'utf8').split('---')[1].split('\n').filter(line => line.startsWith('date'))[0].slice(6).trim();
        return {
            date: data,
            url: post.slice(0, -3)
        }
    });
    return [
        {
            date: new Date().toISOString(),
            url: ''
        },
        ...readData
    ]
}

const createSitemap = () => {
    const posts = getPosts();
    generateSitemap(posts);
}

createSitemap();