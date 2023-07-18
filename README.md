# Blog Project

This is my very own blog project. It is built with [Vue 3](https://v3.vuejs.org/) and [Vite](https://vitejs.dev/).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

Before running the project please make sure to create a `.env` file in the root directory and add the following environment variables:

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

#### If you don't want to use google analytics then remove this code from all the vue files under src/views

```js
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

logEvent(analytics, 'page_view', {
  page_location: window.location.href,
  page_path: window.location.pathname,
  page_title: 'Bartick\'s Blog'
})
```
