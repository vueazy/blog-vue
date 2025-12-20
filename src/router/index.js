import { authRoutes } from './parts/authRoutes'
import { adminRoutes } from './parts/adminRoutes'
import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...adminRoutes],
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    nProgress.start()
  }
  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
