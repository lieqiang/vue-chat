import Vue from 'vue'
import { Toast } from 'vant'
import router from './router'
import { getToken } from '@/utils/auth'
import store from './store'
Vue.use(Toast)

const whiteList = ['/signup']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/signin') {
      next({
        path: '/'
      })
    } else {
      if (store.getters.conversationsList.length === 0) {
        store.dispatch('getUserInfo').then((res) => {
          store.dispatch('getVchatInfo').then(res => {
            next()
          }).catch(err => {
            Toast(err)
          })
        }).catch(err => {
          Toast(err)
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/signin' || whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/signin?redirect=${to.path}`)
    }
  }
})
