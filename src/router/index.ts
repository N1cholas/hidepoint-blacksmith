import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import HidepointPlace from '@/pages/HidepointPlace.vue'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage, meta: { titleKey: 'nav.home' } },
  {
    path: '/hidepoint-place',
    name: 'hidepointPlace',
    component: HidepointPlace,
    meta: { titleKey: 'nav.hidepointPlace' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
