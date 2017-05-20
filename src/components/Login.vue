<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
            </form>

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import api from '../api'
import { AUTH_URL, URL, clientId, clientSecret } from '@/env'
import axios from 'axios'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  methods: {
    checkCreds () {
      this.toggleLoading()
      this.resetResponse()
      this.$store.commit('TOGGLE_LOADING')

      /* Making API call to authenticate a user */
      const postData = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username: this.username,
        password: this.password,
        scope: ''
      }

      const data = {}

      axios.post(AUTH_URL, postData)
      .then(response => {
        this.toggleLoading()
        data.tokens = response.data
        /* Checking if error object was returned from the server */
        if (data.tokens.error) {
          var errorName = data.tokens.error.name
          if (errorName) {
            this.response = errorName === 'InvalidCredentialsError'
            ? 'Usuario/Contraseña incorrectos. Por favor intente de nuevo.'
            : errorName
          } else {
            this.response = data.tokens.error
          }
          return
        }

        var header = {
          'Accept': 'application/json',
          'Authorization': `${data.tokens.token_type} ${data.tokens.access_token}`
        }

        axios.get(URL + '/api/user', {headers: header})
        .then(response => {
          data.user = response.data
          console.log(data.user)
          /* Setting user in the state and caching record to the localStorage */
          if (data.user) {
            // Chequeo si esta habilitada la cuenta
            if (!data.user.habilitado) {
              this.response = 'Su cuenta se encuentra actualmente deshabilitada, consulte con un administrador.'
              this.$store.commit('SET_USER', null)
              this.$store.commit('SET_TOKEN', null)
              window.localStorage.removeItem('user')
              window.localStorage.removeItem('token')
              window.localStorage.removeItem('authTokens')
              return
            }
            var token = `${data.tokens.token_type} ${data.tokens.access_token}`

            this.$store.commit('SET_USER', data.user)
            this.$store.commit('SET_TOKEN', token)

            if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(data.user))
              window.localStorage.setItem('token', token)
              window.localStorage.setItem('authTokens', JSON.stringify(data.tokens))
            }

            this.$router.push({name: 'Dashboard'})
          }
        })
      })
      .catch(error => {
        this.$store.commit('TOGGLE_LOADING')
        console.log(error)

        this.response = 'El servidor parece estar fuera de línea'
        this.toggleLoading()
      })
    },
    toggleLoading () {
      this.loading = (this.loading === '') ? 'loading' : ''
    },
    resetResponse () {
      this.response = ''
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
