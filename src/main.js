import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const fb = require('./firbase.config.js')

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
