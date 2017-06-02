import MD5 from 'crypto-js/md5'
import moment from 'moment'
import axios from 'axios'
import { URL } from '@/env'

function fillUser (user) {
  user.avatar = (user.email)
    ? `https://www.gravatar.com/avatar/${MD5(user.email.trim().toLowerCase())}.jpg`
    : '#'
  user.fecha_de_licencia = moment(user.fecha_de_licencia.substring(0, 10), 'YYYY-MM-DD')
  if (user.tipo_usuario_id === 1) {
    // Maxima fecha en JS
    user.fecha_de_vencimiento = moment(new Date(8640000000000000))
  } else {
    user.fecha_de_vencimiento = moment(user.fecha_de_licencia)
    user.fecha_de_vencimiento.add(user.duracion_de_licencia, 'd')
  }
  return user
}

export default {
  LOGOUT_USER ({ commit }) {
    window.localStorage.clear()
    commit('LOGOUT_USER')
  },
  SET_USER ({ commit }, user) {
    var aux = fillUser(user)
    commit('SET_USER', aux)
  },
  CHECK_CREDENTIALS ({ commit, state }) {
    // Check local storage to handle refreshes
    if (window.localStorage) {
      let token = window.localStorage.getItem('token')
      let header = {
        'Accept': 'application/json',
        'Authorization': token
      }
      axios.get(URL + '/api/user', {headers: header})
      .then(response => {
        var user = fillUser(response.data)
        window.localStorage.setItem('user', JSON.stringify(user))
        if (user && state.user !== user) {
          commit('SET_USER', user)
          commit('SET_TOKEN', token)
        }
      })
    }
  }
}
