<template>
  <div>
    <section>
      <article v-for="blog in blogs">
        <div class="mx-auto max-w-3xl px-6">
          <div class="py-8 sm:py-20 border-b border-gray-300">
            <header class="text-center mb-8">
              <time datetime="2019-03-01 14:43:24" class="text-gray-700 text-xs mb-2 uppercase">{{ new Date(blog.frontmatter.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </time>
              <h2 class="text-3xl sm:text-4xl leading-tight font-sans mb-1 sm:mb-2">
                <a :href=blog.url class="text-black font-bold">{{ blog.frontmatter.title }}</a>
              </h2>
              <p class="text-gray-700 leading-normal text-sm sm:text-base">
                <span>by
                  <a
                    class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-colors duration-300">{{
                      blog.frontmatter.author }}</a>
                </span>
                <span> · </span>
                <span>{{ blog.frontmatter.readingTime || '3' }} min read</span>
              </p>
            </header>
            <p class="leading-normal text-gray-700 text-lg px-2 sm:px-4 md:px-10 text-center">
              {{ blog.frontmatter.description }}</p>
          </div>
        </div>
      </article>
    </section>
    <section class="border-b border-gray-300 mx-auto max-w-3xl px-6 md:px-8 py-16">
      <nav role="navigation" aria-label="pagination">
        <ul class="flex items-center justify-between sm:text-lg lg:text-xl">
          <li class="lg:w-1/5">
            <button @click="prevPage" aria-current="page" rel="prev"
              class="text-gray-700 hover:text-black px-4 py-2 transition-colors duration-300 active">
              ← Previous
            </button>
          </li>
          <li class="hidden md:flex w-auto text-center text-gray-600 text-base">Page {{ currentPage }} of {{ totalPages }}
          </li>
          <li class="lg:w-1/5 text-right">
            <button @click="nextPage" rel="next"
              class="text-gray-700 hover:text-black px-4 py-2 transition-colors duration-300">
              Next →
            </button>
          </li>
        </ul>
      </nav>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['allblogs'],
  setup(props) {
    const allblogs = props.allblogs
    const itemsPerPage = 7
    const currentPage = ref(1)
    const totalPages = Math.ceil(allblogs.length / itemsPerPage)

    const start = ref((currentPage.value - 1) * itemsPerPage)
    const end = ref(start.value + itemsPerPage)

    const blogs = ref(allblogs.slice(start.value, end.value))

    return {
      blogs,
      currentPage,
      totalPages,
      itemsPerPage,
      allblogs
    }
  },
  methods: {
    prevPage: function () {
      if (this.currentPage <= 1) {
        return
      }
      this.currentPage--
      this.start = (this.currentPage - 1) * this.itemsPerPage
      this.end = this.start + this.itemsPerPage
      this.blogs = this.allblogs.slice(this.start, this.end)
    },
    nextPage: function () {
      if (this.currentPage >= this.totalPages) {
        return
      }
      this.currentPage++
      this.start = (this.currentPage - 1) * this.itemsPerPage
      this.end = this.start + this.itemsPerPage
      this.blogs = this.allblogs.slice(this.start, this.end)
    }
  }
}
</script>