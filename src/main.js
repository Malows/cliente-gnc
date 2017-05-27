// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'admin-lte/dist/css/AdminLTE.css'
import 'admin-lte/dist/css/skins/skin-blue.css'
import '../static/css/my-style.css'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(VueRouter)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  if (to.meta.requireAuth) {
    let localUser = JSON.parse(window.localStorage.getItem('user')) || null
    let localToken = window.localStorage.getItem('token') || null
    if (localUser === null || localToken === null) {
      next({ path: '/login' })
    }
    if (to.meta.authorizationLevel < localUser.tipo_usuario_id) {
      next({ path: '/404' })
    }
  }
  next()
})

sync(store, router)

// Start out app!
// eslint-disable-next-line
var vm = new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView),
  mounted () {
    console.log('se montó el vm')
    this.$store.dispatch('CHECK_CREDENTIALS')
  }
})

// Check local storage to handle refreshes
