import firebase from 'firebase'
import 'firebase/firestore'

// firebase init
const config = {
  apiKey: 'AIzaSyDjo1rNl_nUpCvahSf043_H7tgQ-A3WDRQ',
  authDomain: 'vuegram-43372.firebaseapp.com',
  databaseURL: 'https://vuegram-43372.firebaseio.com',
  projectId: 'vuegram-43372',
  storageBucket: 'vuegram-43372.appspot.com',
  messagingSenderId: '984018126273',
  appId: '1:984018126273:web:5eb96c59aff9de1e1fdb40',
  measurementId: 'G-8DF6BE6E59'
}

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
const notesCollection = db.collection('notes')
const tasksCollection = db.collection('tasks')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  notesCollection,
  tasksCollection
}
