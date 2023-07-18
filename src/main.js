import './assets/main.css'
// import 'highlight.js/styles/googlecode.css'

import { createApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { createHead } from '@unhead/vue'

import router from './router'
const componentImages = import.meta.globEager('./../posts/*.md')

const readingTime = async (path) => {
    const domText = await renderToString(h(componentImages[path].default))
    const wordsPerMinute = 200
    const dom = new DOMParser().parseFromString(domText, 'text/html')
    const numberOfWords = dom.querySelector('.markdown-body').innerText.split(/\s/g).length
    const minutes = numberOfWords / wordsPerMinute
    const readTime = Math.ceil(minutes)
    return readTime
}
const pathToUrl = Object.keys(componentImages).map(key => key.split('/').pop().slice(0, -3))

const readTime = {};

pathToUrl.forEach(async (element) => {
    readTime[element] = await readingTime('../posts/' + element + '.md')
})

const app = createApp(App)
app.config.globalProperties.$pathToUrl = {
    pathToUrl,
    componentImages,
    readTime
}

app.use(router)
app.use(createHead())

app.mount('#app')
