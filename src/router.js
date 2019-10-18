import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Auth from '@/views/Auth.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import Tasks from '@/views/Tasks.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/tasks',
      name: 'Tasks',
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

  if (requiresAuth && !currentUser) {
    next('/auth')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
