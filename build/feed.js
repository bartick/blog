// create a feed.xml file

const fs = require('fs');
const path = require('path');

const sourceXML = path.join(__dirname, '../public/feed.xml');

const renderXML = (data) => {
    const url = 'https://blog.bartick.me';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>Bartick's Blog</title>
            <link>${url}</link>
            <description>Bartick's personal blog</description>
            ${data
                .map(
                    (post) => `
                <item>
                    <title>${post.title}</title>
                    <link>${url}/${post.url}</link>
                    <description>${post.description}</description>
                    <pubDate>${post.date}</pubDate>
                </item>
            `)
                .join('')}
        </channel>
    </rss>`;
    return xml;
}

const generateFeed = (posts) => {
    const xml = renderXML(posts);
    fs.writeFileSync(sourceXML, xml, 'utf8');
}

const getPosts = () => {
    const posts = fs.readdirSync(path.join(__dirname, '../posts')).filter(file => path.extname(file) === '.md');
    const readData = posts.map((post) => {
        const data = fs.readFileSync(path.join(__dirname, `../posts/${post}`), 'utf8').split('---')[1].split('\n');
        const title = data.filter(line => line.startsWith('title'))[0].slice(6).trim();
        const description = data.filter(line => line.startsWith('description'))[0].slice(12).trim();
        const date = data.filter(line => line.startsWith('date'))[0].slice(6).trim();
        const url = post.slice(0, -3);
        return {
            title,
            description,
            date,
            url
        }
    });
    return readData;
}

const createFeed = () => {
    const posts = getPosts();
    generateFeed(posts);
}

createFeed();