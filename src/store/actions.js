import MD5 from 'crypto-js/md5'
import moment from 'moment'

export default {
  LOGOUT_USER ({ commit }) {
    window.localStorage.clear()
    commit('LOGOUT_USER')
  },
  SET_USER ({ commit }, user) {
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
    console.log(user.fecha_de_vencimiento)
    commit('SET_USER', user)
  },
  CHECK_CREDENTIALS ({ commit, state }) {
    // Check local storage to handle refreshes
    if (window.localStorage) {
      var localUserString = window.localStorage.getItem('user') || 'null'
      var localUser = JSON.parse(localUserString)
      localUser.avatar = (localUser.email)
        ? `https://www.gravatar.com/avatar/${MD5(localUser.email.trim().toLowerCase())}.jpg`
        : '#'
      if (localUser && state.user !== localUser) {
        commit('SET_USER', localUser)
        commit('SET_TOKEN', window.localStorage.getItem('token'))
      }
    }
  }
}
