const fs = require('fs');
const path = require('path');
const {
    createInterface,
} = require('readline');

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const readLineAsync = (msg, defaultAnswer) => {
    return new Promise(resolve => {
        readline.question(msg, userRes => {
            resolve(userRes);
        });
        if (defaultAnswer) {
            readline.write(defaultAnswer);
        }
    });
}

function slugify(str) {
    return String(str)
      .normalize('NFKD') // split accented characters into their base characters and diacritical marks
      .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
      .trim() // trim leading or trailing whitespace
      .toLowerCase() // convert to lowercase
      .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
}

const createYAMLFrontMatter = (post) => {
    const tags = post.tags.split(/\s+/).map(tag => tag.trim())
    return `---
title: ${post.title}
description: ${post.description}
tags: [${tags??''}]
image: ${post.image??''}
date: ${new Date().toISOString()}
author: ${post.author??'bartick'}
meta:
    - name: og:type
      content: website
    - name: og:site_name
      content: Bartick's Blog
    - name: og:locale
      content: en_US
    - name: og:locale:alternate
      content: es_ES
    - name: twitter:card
      content: summary_large_image
    - name: twitter:site
      content: '@${post.twitterUsername??''}'
    - name: twitter:creator
      content: '@${post.twitterUsername??''}'
    - name: twitter:title
      content: ${post.title}
    - name: twitter:description
      content: ${post.description}
---
`;
}

const createPost = async () => {
    const title = await readLineAsync('Title: ');
    if (!title) {
        console.log('Title is required.');
        return readline.close();
    }
    const description = await readLineAsync('Description: ');
    if (!description) {
        console.log('Description is required.');
        return readline.close();
    }
    const author = await readLineAsync('Author: ', 'bartick');
    const twitterUsername = await readLineAsync('Twitter Username: ', '@BartickM');
    const image = await readLineAsync('Image: ', '/images/Blog.png');
    const tags = await readLineAsync('Tags: ');

    const fileName = await readLineAsync('Path Name: ', slugify(title))

    const regexExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

    if (!regexExp.test(fileName)) {
        console.log('File name '+fileName+' is not a valid slug.');
        return readline.close()
    }

    const post = {
        title,
        description,
        author,
        twitterUsername,
        image,
        tags,
    };

    const frontMatter = createYAMLFrontMatter(post);

    fs.writeFileSync(path.join(__dirname, `./${fileName}.md`), frontMatter + '\n');

    readline.close();
}

createPost();