import router from './router'
import { getToken } from '@/utils/auth'

const whiteList = ['/signup']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/signin') {
      next({
        path: '/'
      })
    } else {
      // next({ ...to, replace: true })
      next()
    }
  } else {
    if (to.path === '/signin' || whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/signin?redirect=${to.path}`)
    }
  }
})
