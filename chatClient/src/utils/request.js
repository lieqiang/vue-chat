import Vue from 'vue'
import axios from 'axios'
// import Cookies from 'js-cookie'
import { Toast } from 'vant'
// import config from '@/config'
Vue.use(Toast)

const service = axios.create({
  // baseURL: '', // config.api_base_url
  timeout: 15000
})
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    // const res = response.data
    // if (res.result === -1) {
    //   Toast('会话已过期,请重新登录')
    //   Cookies.remove('_sid')
    //   setTimeout(() => {
    //     location.reload()
    //   }, 1000)
    // } else {
    //   return response
    // }
    return response
  },
  error => {
    console.log('err' + error)
    Toast(error.message)
    return Promise.reject(error)
  }
)

export default service
