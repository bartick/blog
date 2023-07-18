import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView
},{
  path: '/404',
  name: '404',
  component: () => import('../views/404View.vue'),
},{
  path: '/:id',
  name: 'markdown',
  component: () => import('../views/ContentView.vue'),
}];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 }
  }
})

export default router
