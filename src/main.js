import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
const fb = require('./firebase.config.js')
import './assets/scss/app.scss'

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  // if (user) {
  //   store.commit('setCurrentUser', user)
  //   store.dispatch('fetchUserProfile')

  //   fb.usersCollection.doc(user.uid).onSnapshot(doc => {
  //     store.commit('setUserProfile', doc.data())
  //   })
  // }
})
