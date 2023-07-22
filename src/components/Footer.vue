<template>
    <footer class="text-gray-700 text-sm leading-normal flex flex-wrap justify-between mx-auto max-w-3xl px-6 sm:px-12 py-8 sm:py-16">
        <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
            <p>
                <a href="https://github.com/bartick/blog" target="_blank" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                    Blogs
                </a> by 
                <a href="https://twitter.com/bartickM" target="_blank" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                    @BartickM
                </a>
            </p>
            <p>Built with 
                <a href="https://gridsome.org" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                    Vite
                </a> &amp; 
                <a href="https://tailwindcss.com/" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                    Tailwind CSS
                </a>.
            </p>
        </div>
        <div class="w-full sm:w-1/2">
            <nav>
                <ul class="flex sm:justify-end -mx-2">
                    <li class="px-2">
                        <RouterLink to="/" aria-current="page" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300 active--exact active">
                            Home
                        </RouterLink>
                    </li>
                    <li class="px-2">
                        <a href="/sitemap.xml" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                            Sitemap
                        </a>
                    </li>
                    <li class="px-2">
                        <a href="/feed.xml" class="border-b border-transparent hover:border-gray-400 transition-colors duration-300">
                            RSS Feed
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>