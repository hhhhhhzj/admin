import { createRouter, createWebHashHistory } from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/News.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/Product.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done() 
})

export default router
