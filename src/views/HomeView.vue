<template>
  <div class="bg-white">
    <main>
      <header>
        <div class="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6 py-10 md:py-32 border-b border-gray-300">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">
            <a class="text-black">Bartick's Blog</a>
          </h1>
          <p class="text-gray-700 text-lg sm:text-3xl">Thoughts, stories, and ideas.</p>
        </div>
      </header>
      <section>
        <article v-for="pst in values.pageItems">
          <div class="mx-auto max-w-3xl px-6">
            <div class="py-8 sm:py-20 border-b border-gray-300">
              <header class="text-center mb-8">
                <time datetime="2019-03-01 14:43:24" class="text-gray-700 text-xs mb-2 uppercase">{{pst.date}}</time>
                <h2 class="text-3xl sm:text-4xl leading-tight font-sans mb-1 sm:mb-2">
                  <RouterLink :to=pst.url class="text-black font-bold">{{pst.title}}</RouterLink>
                </h2>
                <p class="text-gray-700 leading-normal text-sm sm:text-base">
                  <span>by 
                    <a class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-colors duration-300">{{pst.author}}</a>
                  </span>
                  <span> · </span>
                  <span>{{pst.readTime}} min read</span>
                </p>
              </header>
              <p class="leading-normal text-gray-700 text-lg px-2 sm:px-4 md:px-10 text-center">{{pst.description}}</p>
            </div>
          </div>
        </article>
      </section>
      <section class="border-b border-gray-300 mx-auto max-w-3xl px-6 md:px-8 py-16">
        <nav role="navigation" aria-label="pagination">
          <ul class="flex items-center justify-between sm:text-lg lg:text-xl">
            <li class="lg:w-1/5">
              <button @click="prevPage" aria-current="page" rel="prev" class="text-gray-700 hover:text-black px-4 py-2 transition-colors duration-300 active opacity-0" disabled>
          ← Previous
        </button>
      </li>
      <li class="hidden md:flex w-auto text-center text-gray-600 text-base">Page {{values.currentPage}} of {{values.totalPages}}</li>
      <li class="lg:w-1/5 text-right">
        <button @click="nextPage" rel="next" class="text-gray-700 hover:text-black px-4 py-2 transition-colors duration-300">
          Next →
        </button></li></ul></nav></section>
    </main>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import moment from 'moment'
import { useSeoMeta } from '@unhead/vue';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

const app = getCurrentInstance();

const values = reactive({
  posts: [],
  pageItems: [],
  currentPage: 1,
  totalPages: 1,
  author: 'bartick',
});

for (const post of app.appContext.config.globalProperties.$pathToUrl.pathToUrl) {
  const content = app.appContext.config.globalProperties.$pathToUrl.componentImages[`../posts/${post}.md`]
  values.posts.push({
    url: `/${post}`,
    title: content.title,
    description: content.description,
    date: moment(content.date).format('Do MMMM, YYYY'),
    readTime: app.appContext.config.globalProperties.$pathToUrl.readTime[post],
    author: content.author,
  });
}

const sortDates = (a, b) => moment(a.roomtypedate).format('YYYYMMDD') - moment(b.roomtypedate).format('YYYYMMDD')

Array.prototype.quickSort = function () {
  if (this.length <= 1) {
    return this
  }
  const pivotIndex = Math.floor(this.length / 2)
  const pivot = this.splice(pivotIndex, 1)[0]
  const left = []
  const right = []
  for (const item of this) {
    if (item < pivot) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return left.quickSort().concat([pivot], right.quickSort())
}

const sortedDates = values.posts.quickSort(sortDates)
values.posts = sortedDates

const itemsPerPage = 5

values.totalPages = Math.ceil(values.posts.length / itemsPerPage)

const setPagination = () => {
  const start = (values.currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  values.pageItems = values.posts.slice(start, end)
}

setPagination()

const changePage = (page) => {
  if (page < 1 || page > values.totalPages) {
    return
  }
  if (page === 1) {
    const prevButton = document.querySelector('[rel="prev"]')
    if (!prevButton.classList.contains('opacity-0')) {
      prevButton.classList.add('opacity-0')
    }
    if(!prevButton.disabled) {
      prevButton.disabled = true
    }
  }
  if (page === values.totalPages) {
    const nextButton = document.querySelector('[rel="next"]')
    if (!nextButton.classList.contains('opacity-0')) {
      nextButton.classList.add('opacity-0')
    }
    if(!nextButton.disabled) {
      nextButton.disabled = true
    }
  }
  if (page > 1) {
    const prevButton = document.querySelector('[rel="prev"]')
    if (prevButton.classList.contains('opacity-0')) {
      prevButton.classList.remove('opacity-0')
    }
    if(prevButton.disabled) {
      prevButton.disabled = false
    }
  }
  if(page < values.totalPages) {
    const nextButton = document.querySelector('[rel="next"]')
    if (nextButton.classList.contains('opacity-0')) {
      nextButton.classList.remove('opacity-0')
    }
    if(nextButton.disabled) {
      nextButton.disabled = false
    }
  }
  values.currentPage = page
  setPagination()
}

const prevPage = (_event) => {
  changePage(values.currentPage - 1)
}

const nextPage = (_event) => {
  changePage(values.currentPage + 1)
}


useSeoMeta({
  title: 'Bartick\'s Blog',
  description: 'A very basic blog website made with Vue.js and Vite.js',
  keywords: 'vue, vite, blog, bartick, tailwind',
  ogDescription: 'A very basic blog website for Bartick. Made this website to blog about different softwares and technologies I use.',
  ogTitle: 'Bartick\'s Blog',
  ogUrl: window.location.origin,
  ogImage: window.location.origin + '/images/Blog.png',
  ogSiteName: 'Bartick\'s Blog',
  ogType: 'website',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '@BartickM',
  twitterCreator: '@BartickM',
  twitterTitle: 'Bartick\'s Blog',
  twitterDescription: 'A very basic blog website for Bartick. Made this website to blog about different softwares and technologies I use.',
  twitterImage: window.location.origin + '/images/Blog.png',
  twitterUrl: window.location.origin,
  twitterDomain: window.location.origin,
  author: 'Bartick',
  contentType: 'blog',
})

logEvent(analytics, 'page_view', {
  page_location: window.location.href,
  page_path: window.location.pathname,
  page_title: 'Bartick\'s Blog'
})

</script>
