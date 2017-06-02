// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
import moment from 'moment'

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
    let user = store.state.user
    let now = moment()
    if (user) {
      if (now.isAfter(user.expire) || !user.habilitado || now.isAfter(user.fecha_de_vencimineto)) {
        store.dispatch('LOGOUT_USER')
        next({ path: '/login' })
      } else if (to.meta.authorizationLevel < user.tipo_usuario_id) {
        next({ path: '/404' })
      } else {
        next()
      }
    } else {
      console.log('USER ES NULL')
      let localUser = JSON.parse(window.localStorage.getItem('user')) || null
      let localToken = window.localStorage.getItem('token') || null
      // Si no existen las credenciales, lo mando a login
      if (localUser === null || localToken === null) {
        next({ path: '/login' })
      } else {
        // promesa, se va a resolver y refrescar los datos de usuario
        store.dispatch('CHECK_CREDENTIALS')
        // si no esta habilitado, carga una primera pantalla, a manera de "cache"
        // pero luego te va a dar login a cualquier otra ruta
        if (now.isAfter(localUser.expire) || !localUser.habilitado || now.isAfter(localUser.fecha_de_vencimineto)) {
          store.dispatch('LOGOUT_USER')
          next({ path: '/login' })
        } else if (to.meta.authorizationLevel < localUser.tipo_usuario_id) {
          next({ path: '/404' })
        } else {
          next()
        }
      }
    }
  } else {
    next()
  }
})

sync(store, router)

// Start out app!
// eslint-disable-next-line
var vm = new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

// Check local storage to handle refreshes
