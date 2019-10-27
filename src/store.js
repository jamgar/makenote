import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebase.config.js')

Vue.use(Vuex)

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data())
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    notes: [
      { id: 1, title: 'first note', content: 'first note content' },
      { id: 2, title: 'seconnd note', content: 'second note content' }
    ],
    note: {},
    tasks: []
  },
  mutations: {
    resetState(state) {
      state.currentUser = null
      state.userProfile = {}
      state.notes = []
      state.note = {}
      state.tasks = []
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setNote(state, payload) {
      state.note = payload
    },
    setTasks(state, payload) {
      state.tasks = payload
    },
    addTask(state, payload) {
      state.tasks.push(payload)
    },
    updateTask(state, payload) {
      const idx = state.tasks.findIndex(task => task.id === payload.id)
      state.tasks[idx] = payload
    },
    deleteTask(state, payload) {
      const idx = state.tasks.findIndex(task => task.id === payload.id)
      state.tasks.splice(idx, 1)
    }
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit('setUserProfile', res.data())
        })
        .catch(err => {
          console.log('User Profile Error:', err)
        })
    },
    logout({ commit }) {
      fb.auth
        .signOut()
        .then(() => {
          commit('resetState')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTasks({ commit, state }) {
      const tasks = []
      fb.tasksCollection
        .where('userId', '==', state.currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            tasks.push({
              id: doc.id,
              ...doc.data()
            })
          })
          commit('setTasks', tasks)
        })
        .catch(err => {
          console.log('Tasks Error:', err)
        })
    },
    addTask({ commit, state }, payload) {
      const task = {
        createdOn: new Date(),
        content: payload,
        userId: state.currentUser.uid,
        completed: false
      }
      fb.tasksCollection
        .add(task)
        .then(ref => {
          commit('addTask', { id: ref.id, ...task })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateTask({ commit }, payload) {
      fb.tasksCollection
        .doc(payload.id)
        .update({
          content: payload.content,
          completed: payload.completed
        })
        .then(ref => {
          commit('updateTask', payload)
        })
        .catch(err => {
          console.log('Error updateing task:', err)
        })
    },
    deleteTask({ commit }, payload) {
      fb.tasksCollection
        .doc(payload.id)
        .delete()
        .then(() => {
          commit('deleteTask', payload)
        })
        .catch(err => {
          console.log('Error deleting task', err)
        })
    }
  }
})
