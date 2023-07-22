---
title: Getting Started
description: This is a demo blog to keep a small not on how this website works. Use it as a reference to start writing your own blogs.
tags: [gettings-started,bartick,blog,markdown]
image: /images/Blog.png
date: 2023-07-18T12:04:30.472Z
author: bartick
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
      content: '@@BartickM'
    - name: twitter:creator
      content: '@@BartickM'
    - name: twitter:title
      content: Getting Started
    - name: twitter:description
      content: This is a demo blog to keep a small not on how this website works. USe it as a reference to start writing your own blogs.
---

This is my minimal blog started, inspired by the design of the [Attila](https://github.com/zutrinken/attila) Ghost theme, and styled with [Tailwind CSS](https://tailwindcss.com).

**Blog posts here are written using Markdown. However, you are free to use HTML inside Markdown, for any elements not covered by the spec.**

Markdown is intended to be as easy-to-read and easy-to-write as is feasible. Readability, however, is emphasized above all else. A Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.

### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Heading 1 is the title of this page. You should only use it once in a document.

## Links

When you paste in a URL like so: https://bartick.me, it will be automatically converted to a link. Otherwise, you can use the standard `[link text](https://...)` markdown to create a link.

## Style

Bold: **Bold** or __Bold__
Italic: *Italic* or _Italic_
Strike Through: ~~Strike~~
Bold and Italic: ***BoldItalic*** or __*BoldItalic*__

## Ordered list

1. python
2. root
3. public
4. bypass

## Unordered list

- boolean
- stack
- foad
- tarball

## A definition list

This list is created using `<dl>`, `<dt>`, and `<dd>` HTML tags.

<dl>
  <dt>First Term</dt>
  <dd>This is the definition of the first term.</dd>
  <dt>Second Term</dt>
  <dd>This is one definition of the second term. </dd>
  <dd>This is another definition of the second term.</dd>
</dl>

## Blockquotes

> Trojan horse protected afk finally irc ip new kilo fork boolean. Int ack long less lib crack emacs gnu foo *.* segfault suitably small values ascii rsa throw void I'm sorry Dave

## Code

### Fenced codeblocks

This website uses uses [highlight.js](https://github.com/EldoranDev/gridsome-plugin-remark-shiki) to add syntax highlighting to code blocks.

```vue
<template>
  <div>
    <h1>My Todo App!</h1>
    <TodoList/>
  </div>
</template>

<script setup>
import TodoList from './components/TodoList.vue'
</script>

<style lang="postcss">
h1 {
  font-size: 50px;
}
</style>
```

Of course, it also styles `inline code blocks`.

## Images

Here's a local image:

![Code on a laptop screen](/images/posts/luca-bravo-XJXWbfSo2f0-unsplash.jpg)

Here's an external [image](https://unsplash.com/photos/vhpD1Ikatwo), hotlinked from Unsplash and linked to its page there: 

![Laptop photo by Kirill Martynov on Unsplash](https://images.unsplash.com/photo-1581013793663-dedd7e462266?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80)

