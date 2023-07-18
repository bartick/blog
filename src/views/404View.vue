<template>
    <div class="bg-teal-400">
        <main class="flex items-center h-screen">
            <div class="w-full sm:w-3/4 md:w-3/5 lg:w-2/5 max-w-xs mx-auto px-6 md:px-0 relative">
                <span class="absolute -mt-10 text-5xl inset-x-0 text-center pointer-events-none">🧐</span>
                <section class="bg-gray-100 mx-auto px-8 py-6 rounded shadow-xl relative">
                    <h1 class="text-2xl font-sans font-bold mb-4">Page Not Found</h1>
                    <p class="font-serif mb-4 leading-normal text-gray-700">Looks like you've followed a broken link or
                        entered a URL that doesn't exist on this site.</p>
                    <RouterLink to="/"
                        class="text-sm text-teal-400 hover:text-teal-600 font-sans transition-color duration-300">&larr;
                        Back to our site</RouterLink>
                </section>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue';
import { RouterLink } from 'vue-router';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

useSeoMeta({
    title: 'Page Not Found',
    description: 'Looks like you\'ve followed a broken link or entered a URL that doesn\'t exist on this site.',
    robots: 'noindex',
    ogDescription: 'Looks like you\'ve followed a broken link or entered a URL that doesn\'t exist on this site.',
    ogTitle: 'Page Not Found',
    ogType: 'website',
    ogUrl: window.location.href,
    ogImage: window.location.origin + '/images/404Image.avif',
})

logEvent(analytics, 'page_view', {
  page_location: window.location.href,
  page_path: window.location.pathname,
  page_title: 'Page Not Found'
})
</script>
  
  