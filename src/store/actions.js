import MD5 from 'crypto-js/md5'

export default {
  LOGOUT_USER ({ commit }) {
    window.localStorage.clear()
    commit('LOGOUT_USER')
  },
  SET_USER ({ commit }, user) {
    console.log('paso por el action')
    user.avatar = (user.email)
      ? `https://www.gravatar.com/avatar/${MD5(user.email.trim().toLowerCase())}.jpg`
      : '#'
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
