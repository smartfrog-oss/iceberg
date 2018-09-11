import('vuetify/dist/vuetify.min.css')

import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

Vue.config.productionTip = false

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  /* eslint-disable no-new */
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
