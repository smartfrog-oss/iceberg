import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', redirect: '/endpoints' },
      {
        path: '/endpoints',
        name: 'Endpoints',
        component: () => import(/* webpackChunkName: "endpoints-page" */ '@/pages/endpoints.page')
      },
      {
        path: '/details/:id',
        name: 'Details',
        component: () => import(/* webpackChunkName: "endpoints-page" */ '@/pages/details.page')
      }
    ]
  })
}
