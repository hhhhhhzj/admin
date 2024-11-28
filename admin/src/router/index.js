import { createRouter, createWebHashHistory } from 'vue-router'
import RoutesConfig from './config'
import store from '../store/index.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: () => import('@/views/MainBox.vue'),
  },
  {
    path: '/',
    redirect: '/login'
  }
  //mianbox的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由守卫，没有登陆不能访问
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    //如果授权（已经登陆过）next()
    //如果没有授权（没有登陆过）跳转到登录页面
    if (!localStorage.getItem('token')) {
      next({ name: 'login' })
    } else {
      if (!store.state.isGetterRouter) {
        //删除mainbox
        router.removeRoute('mainbox')
        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }
  }
})

const ConfigRouter = () => {

  if(!router.hasRoute('mainbox')){
    router.addRoute('mainbox', {
      path: '/mainbox',
      name: 'mainbox',
      component: () => import('@/views/MainBox.vue'),
    })
  }

  RoutesConfig.forEach(item => {
    checkPermission(item) && router.addRoute('mainbox', item)
  })

  //改变isGetterRouter的状态
  store.commit('changeGetterRouter', true)
}

const checkPermission = (item) => {
  if(item.requireAdmin){
    return store.state.userInfo.role===1
  }
  return true
}

export default router
