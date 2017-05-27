export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    console.log('paso por el mutator', JSON.stringify(user))
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  LOGOUT_USER (state) {
    state.token = null
    state.user = null
  }
}
