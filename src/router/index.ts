import HidepointPlace from '@/pages/HidepointPlace.vue'
import HomePage from '@/pages/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  // i18n
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/hidepoint-place', component: HidepointPlace, name: 'HidepointPlace' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
