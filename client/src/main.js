import 'vuetify/dist/vuetify.min.css'
import './style.styl'

import Vue from 'vue'
import App from '@/App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

Vue.config.productionTip = true

const router = createRouter()
const store = createStore()
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
