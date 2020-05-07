import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './icons'
import 'normalize.css/normalize.css'
import './styles/index.scss'
import * as filters from './filters'
// import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:8090')
})
)

Vue.config.productionTip = false
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
