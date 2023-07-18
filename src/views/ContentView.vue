<template>
  <header>
    <div class="pt-24">
      <div class="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6">
        <p class="text-gray-700 text-xs mb-2 uppercase">{{readTime}} min read</p>
        <h1 class="text-3xl sm:text-5xl leading-tight font-sans font-bold mb-2 text-black">{{Content.components.title}}</h1>
        <p class="text-gray-700">
          <span>
            <a class="text-gray-700 capitalize border-b border-transparent transition-colors duration-300">Bartick</a> •
          </span>
          <time datetime="2019-02-27 17:54:43" class="capitalize">{{postDate}}</time>
        </p>
      </div>
    </div>
    <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
      <router-link to="/" class="text-sm border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity duration-300 active text-gray-900 border-gray-400">← Home</router-link>
    </nav>
  </header>
  
  <div class="content max-w-xl md:max-w-2xl xl:max-w-4xl mx-auto px-6 sm:px-12 pt-16" id="content">
    <Content.components.default />
  </div>
</template>

<script setup>
import { getCurrentInstance, markRaw, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'
import mediumZoom from 'medium-zoom'
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

const route = useRoute()
const router = useRouter()

onMounted(() => {
  mediumZoom(document.querySelectorAll('img'))
})

const app = getCurrentInstance()

const Content = markRaw({
  components: app.appContext.config.globalProperties.$pathToUrl.componentImages[`../posts/${app.appContext.config.globalProperties.$pathToUrl.pathToUrl[0]}.md`],
})

const readTime = app.appContext.config.globalProperties.$pathToUrl.readTime[route.params.id]

const postDate = moment(Content.components.date).format('Do MMMM, YYYY')

if (app.appContext.config.globalProperties.$pathToUrl.pathToUrl.includes(route.params.id)) {
  Content.components = app.appContext.config.globalProperties.$pathToUrl.componentImages[`../posts/${route.params.id}.md`]
} else {
  router.push('/404')
}

logEvent(analytics, 'page_view', {
  page_location: window.location.href,
  page_path: window.location.pathname,
  page_title: Content.components.title
})

</script>
