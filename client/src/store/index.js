import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import endpoints from './endpoints'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export function createStore () {
  return new Vuex.Store({
    modules: {
      state,
      endpoints
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
}
