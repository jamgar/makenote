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
    notes: [],
    note: {
      id: '',
      title: '',
      content: ''
    },
    isEditingNote: false,
    tasks: []
  },
  getters: {
    getNote(state) {
      return id => {
        return state.notes.find(note => note.id === id)
      }
    }
  },
  mutations: {
    resetState(state) {
      state.currentUser = null
      state.userProfile = {}
      state.notes = []
      state.note = {
        id: '',
        title: '',
        content: ''
      }
      state.isEditingNote = false
      state.tasks = []
    },
    resetNote(state) {
      state.note = {
        id: '',
        title: '',
        content: ''
      }
      state.isEditingNote = false
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setNotes(state, payload) {
      state.notes = payload
    },
    setNote(state, payload) {
      state.note = payload
    },
    addNote(state, payload) {
      state.notes.push(payload)
    },
    updateNote(state, payload) {
      const idx = state.notes.findIndex(note => note.id === payload.id)
      state.notes[idx] = payload
    },
    deleteNote(state, payload) {
      const idx = state.notes.findIndex(note => note.id === payload.id)
      state.notes.splice(idx, 1)
    },
    updateNoteContent(state, content) {
      state.note = Object.assign({}, state.note, content)
    },
    updateNoteTitle(state, title) {
      state.note = Object.assign({}, state.note, title)
    },
    updateIsEditingNote(state, edit) {
      state.isEditingNote = edit
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
    fetchNotes({ commit, state }) {
      const notes = []
      fb.notesCollection
        .where('userId', '==', state.currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            notes.push({
              id: doc.id,
              ...doc.data()
            })
          })
          commit('setNotes', notes)
        })
        .catch(err => {
          console.log('Notes Error:', err)
        })
    },
    addNote({ commit, state }) {
      const note = {
        createdOn: new Date(),
        title: state.note.title,
        content: state.note.content,
        userId: state.currentUser.uid
      }
      fb.notesCollection
        .add(note)
        .then(ref => {
          const newNote = { id: ref.id, ...note }
          commit('addNote', newNote)
          commit('setNote', newNote)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateNote({ commit, state }) {
      const note = {
        id: state.note.id,
        title: state.note.title,
        content: state.note.content,
        userId: state.currentUser.uid
      }
      fb.notesCollection
        .doc(note.id)
        .update(note)
        .then(ref => {
          commit('updateNote', note)
        })
        .catch(err => {
          console.log('Error updating note:', err)
        })
    },
    deleteNote({ commit }, payload) {
      fb.notesCollection
        .doc(payload.id)
        .delete()
        .then(() => {
          commit('deleteNote', payload)
          commit('resetNote')
        })
        .catch(err => {
          console.log('Error deleting note', err)
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
          console.log('Error updating task:', err)
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
