import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import Tasks from '@/views/Tasks.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requireAuth && !currentUser) {
    next('/auth')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
